const express = require("express");
const axios = require("axios");
const router = express.Router();

// Validation middleware
const validateCodeRequest = (req, res, next) => {
  const { code, language } = req.body;

  if (!code || typeof code !== "string" || code.trim().length === 0) {
    return res.status(400).json({ error: "Code must be a non-empty string" });
  }

  if (code.length > 50000) {
    return res.status(400).json({ error: "Code too long" });
  }

  next();
};

// === Explain code route (DeepSeek for text) ===
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

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-small-3.1-24b-instruct:free", // ✅ FIXED MODEL
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": process.env.FRONTEND_URL,
          "X-Title": "Code Explainer App",
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    const explanation = response.data.choices[0].message.content;
    res.json({ success: true, explanation });
  } catch (error) {
    console.error("❌ Error in /explain:", error?.response?.data || error.message);

    return res.status(500).json({
      error: "AI error",
      message: error?.response?.data || error.message,
    });
  }
});

// --- NEW: Visualize route (Gemini 2.5 Flash Image Preview) ---
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

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemini-2.5-flash-image-preview:free,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user }
        ],
        modalities: ["image"]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": process.env.FRONTEND_URL,
          "X-Title": "Code Explainer App",
          "Content-Type": "application/json"
        },
        timeout: 60000
      }
    );

    console.log("Gemini response:", JSON.stringify(response.data, null, 2));

    const choice = response?.data?.choices?.[0];
    const imageDataUrl = choice?.message?.images?.[0]?.image_url?.url || null;

    if (!imageDataUrl) {
      return res.status(502).json({
        success: false,
        error: "NoImage",
        message: "Model did not return an image."
      });
    }

    return res.json({
      success: true,
      image: imageDataUrl,
      meta: { model: "google/gemini-2.5-flash-image-preview:free" }
    });
  } catch (error) {
    console.error("❌ Error in /visualize:", error?.response?.data || error.message);
    return res.status(500).json({
      success: false,
      error: "Visualization failed",
      message: error?.response?.data || error.message
    });
  }
});






module.exports = router;
