// Load environment variables from .env
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
app.set("trust proxy", 1); // Trust first proxy (Vercel)

// Optional: Import rate limiter middleware
const rateLimiter = require("./middleware/rateLimiter");

// === MIDDLEWARE ===
app.use(cors({
  origin: "*", // Use wildcard for all origins in production, or specify your URLs
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());
app.use(rateLimiter); // Uncomment if you want rate limiting

// === HEALTH CHECK ===
app.get("/health", (req, res) => {
  res.json({
    status: "✅ Backend is running",
    timestamp: new Date().toISOString(),
  });
});

// === ROUTES ===
const explainRoutes = require("./routes/explainCode");
app.use("/api", explainRoutes);

// ✅ If running locally, start the server
if (require.main === module) {
  const PORT = process.env.PORT || 5050;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

// ✅ For Vercel deployment
module.exports = app;
