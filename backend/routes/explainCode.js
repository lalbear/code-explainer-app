const express = require("express");
const axios = require("axios");
const router = express.Router();

// Validation middleware
const validateCodeRequest = (req, res, next) => {
  const { code } = req.body;

  if (!code || typeof code !== "string" || code.trim().length === 0) {
    return res.status(400).json({ error: "Code must be a non-empty string" });
  }

  if (code.length > 50000) {
    return res.status(400).json({ error: "Code too long" });
  }

  next();
};

// helper to call OpenRouter with fallback models + simple retry
async function callOpenRouter(payload, { models = [], timeout = 30000, retries = 1 } = {}) {
  const baseUrl = "https://openrouter.ai/api/v1/chat/completions";

  for (const model of models) {
    const body = { ...payload, model };
    let attempt = 0;
    while (attempt <= retries) {
      try {
        const resp = await axios.post(baseUrl, body, {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout,
        });
        return { resp, modelUsed: model };
      } catch (err) {
        attempt += 1;
        const status = err?.response?.status;
        const data = err?.response?.data;
        console.error(`OpenRouter error (model=${model}) attempt ${attempt}:`, status, data || err.message);

        // If this is a 4xx that indicates model not available (e.g. 404 / "No endpoints found"), break model loop early
        if (status && (status === 404 || status === 403 || (data && typeof data === "object" && JSON.stringify(data).includes("No endpoints found")))) {
          // do not retry this model, try next model
          break;
        }

        // on other errors we may retry once (transient network)
        if (attempt > retries) break;
        // short backoff
        await new Promise(r => setTimeout(r, 500 * attempt));
      }
    }
  }
  // if we get here no model succeeded
  throw new Error("No available OpenRouter endpoints succeeded for configured models.");
}

// === Explain code route ===
router.post("/explain", validateCodeRequest, async (req, res) => {
  try {
    const { code, language = "cpp" } = req.body;

    const prompt = `
Explain the following ${language} code with this structure:

1. Provide a **clear, concise algorithm-style summary** of what the code does.
   - Use step-by-step bullets.
   - Highlight key terms like loops, functions, conditions, or important values in **bold**.

2. Add a section header: **CODE EXPLANATION**
   - Then explain the code line-by-line or block-by-block in simple language.

Here is the code:
\`\`\`${language}
${code}
\`\`\`
`;

    // try fast, low-latency models first, then fall back
    const preferredModels = [
      "mistralai/mistral-small-3.1-24b-instruct:free",
      "meta-llama/llama-3.3-70b-instruct:free",
      "meta-llama/llama-3.1-8b-instruct:free"
    ];

    const { resp, modelUsed } = await callOpenRouter(
      { messages: [{ role: "user", content: prompt }] },
      { models: preferredModels, timeout: 45000, retries: 1 }
    );

    const explanation = resp?.data?.choices?.[0]?.message?.content || resp?.data?.choices?.[0]?.text || null;
    if (!explanation) {
      console.error("No explanation found in OpenRouter response:", resp?.data);
      return res.status(502).json({ error: "AI error", message: "Model returned no text." });
    }

    res.json({ success: true, explanation, model: modelUsed });
  } catch (error) {
    console.error("❌ Error in /explain:", error?.response?.data || error.message);
    const body = error?.response?.data || {};
    if (JSON.stringify(body).includes("No endpoints found")) {
      return res.status(502).json({
        error: "NoEndpoints",
        message: "Requested model is not available for your API key or current provider. Check OpenRouter dashboard or use a different model."
      });
    }
    return res.status(500).json({
      error: "AI error",
      message: error?.response?.data || error.message,
    });
  }
});

// --- Visualize route (image) ---
router.post("/visualize", validateCodeRequest, async (req, res) => {
  try {
    const { code, language = "cpp" } = req.body;

    const system = `You are a code visualization assistant.
Generate a single, self-contained diagram that helps a developer understand the structure and flow of the code.
Prefer high-level diagrams (flowchart, sequence diagram, call graph).`;

    const user = `Generate a concise visual diagram for the following ${language} code:

\`\`\`${language}
${code}
\`\`\``;

    // image models (note: keep the quotes and string valid)
    const imageModels = [
      "google/gemini-2.5-flash-image-preview:free"
    ];

    const payload = {
      messages: [
        { role: "system", content: system },
        { role: "user", content: user }
      ],
      modalities: ["image"]
    };

    const { resp, modelUsed } = await callOpenRouter(payload, { models: imageModels, timeout: 90000, retries: 1 });

    console.log("Image model response:", JSON.stringify(resp.data, null, 2));

    const choice = resp?.data?.choices?.[0];
    // try a few common places where image url / data may be returned
    const imageUrl =
      choice?.message?.images?.[0]?.image_url?.url ||
      choice?.message?.images?.[0]?.url ||
      choice?.message?.images?.[0]?.b64_json || // sometimes base64 JSON field
      null;

    if (!imageUrl) {
      console.error("No image returned:", resp.data);
      return res.status(502).json({
        success: false,
        error: "NoImage",
        message: "Model did not return an image."
      });
    }

    return res.json({
      success: true,
      image: imageUrl,
      meta: { model: modelUsed }
    });
  } catch (error) {
    console.error("❌ Error in /visualize:", error?.response?.data || error.message);
    const body = error?.response?.data || {};
    if (JSON.stringify(body).includes("No endpoints found")) {
      return res.status(502).json({
        error: "NoEndpoints",
        message: "Requested image model is not available for your API key or current provider. Check OpenRouter dashboard or use a different model."
      });
    }
    return res.status(500).json({
      success: false,
      error: "Visualization failed",
      message: error?.response?.data || error.message
    });
  }
});

module.exports = router;
