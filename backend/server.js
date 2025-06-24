// Load environment variables from .env
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

// Optional: Import rate limiter middleware
// const rateLimiter = require("./middleware/rateLimiter");

// === MIDDLEWARE ===
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());
// app.use(rateLimiter); // Uncomment if you want rate limiting

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

// ✅ Export app instead of listening here
module.exports = app;
