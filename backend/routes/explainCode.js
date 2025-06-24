// backend/routes/explainCode.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Validation middleware
const validateCodeRequest = (req, res, next) => {
  const { code, language } = req.body;

  if (!code || typeof code !== 'string' || code.trim().length === 0) {
    return res.status(400).json({ error: 'Code must be a non-empty string' });
  }

  if (code.length > 50000) {
    return res.status(400).json({ error: 'Code too long' });
  }

  next();
};

// Explain code route using OpenRouter
router.post('/explain', validateCodeRequest, async (req, res) => {
  try {
    const { code, language = 'cpp' } = req.body;
    const prompt = `Explain this ${language} code step-by-step:\n\n\`\`\`${language}\n${code}\n\`\`\``;

    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: "meta-llama/llama-3.3-8b-instruct:free",
      messages: [{ role: 'user', content: prompt }]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': process.env.FRONTEND_URL,
        'X-Title': 'Code Explainer App',
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });

    const explanation = response.data.choices[0].message.content;
    res.json({ success: true, explanation });

  } catch (error) {
    console.error('❌ Error in /explain:', error?.response?.data || error.message);

    if (error.response) {
      return res.status(500).json({
        error: 'AI error',
        message: error.response.data || 'Unknown error from OpenRouter'
      });
    } else {
      return res.status(500).json({
        error: 'Internal error',
        message: error.message
      });
    }
  }
});

module.exports = router;
