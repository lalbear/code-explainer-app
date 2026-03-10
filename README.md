# 🚀 Code Explainer App

**Unlock Code Clarity. Accelerate Learning Instantly.**

An AI-powered application that deconstructs complex code snippets and delivers intuitive, human-readable explanations. Whether you're a student tackling a new language or a senior developer auditing a legacy codebase, CodeExplainer.ai de-mystifies the syntax.

---

## ✨ Key Features

### 🛠️ Advanced Code Input
- **Multi-Language Support**: Switch between **JavaScript**, **Python**, **C++**, **Go**, and **Rust**.
- **Typewriter Effect**: AI responses animate in with a streaming typewriter feel.

### 🤖 AI-Driven Insights
- **In-Depth Analysis**: Uses LLMs via OpenRouter (Gemini 2.0 Flash, Llama 3.1, Mistral with automatic fallback) to explain logic, algorithms, and data structures.
- **Code Visualization**: Generates architectural flow diagrams from your code.

### 📤 Export & Utility
- **Copy to Clipboard**: One-click copying of the full AI explanation.
- **Session History**: Last 10 snippets persisted in `localStorage` with fast restore.
- **Dark / Light Mode**: System-aware theme toggle.

---

## 🛠️ Tech Stack

### Frontend
- **React.js**: Modern component-based UI with hooks.
- **Vite**: Ultra-fast build tool and dev server (port `3000`).
- **Tailwind CSS**: Utility-first styling with glassmorphism design.
- **Framer Motion**: Smooth animations and transitions.
- **Lucide React**: Icon set.
- **React Markdown**: Renders AI responses as formatted markdown.

### Backend
- **Node.js & Express**: High-performance API server (port `5050`).
- **Axios**: HTTP client for OpenRouter API calls.
- **Dotenv**: Secure environment variable management.
- **CORS & Rate Limiting**: Production-grade security and abuse protection.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or higher)
- npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/lalbear/code-explainer-app.git
   cd code-explainer-app
   ```

2. **Install Dependencies:**
   ```bash
   # Frontend
   cd frontend && npm install

   # Backend
   cd ../backend && npm install
   ```

### Configuration

Create a `.env` file in the `backend/` directory:
```env
PORT=5050
OPENROUTER_API_KEY=your_key_here
```

Get a free API key at [openrouter.ai](https://openrouter.ai).

---

## ▶️ Running the App

### Development Mode

1. **Start the Backend:**
   ```bash
   cd backend
   npm start
   ```

2. **Start the Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗺️ Project Structure

```text
code-explainer-app/
├── backend/                  # Express API Server
│   ├── server.js             # Main entry point
│   ├── middleware/           # Rate limiter & request validation
│   └── routes/
│       └── explainCode.js    # /api/explain & /api/visualize endpoints
├── frontend/                 # React App (Vite)
│   ├── src/
│   │   ├── components/       # Header, CodeInputCard, ExplanationBubble, FloatingActions, ThemeToggle
│   │   ├── context/
│   │   │   └── ThemeContext.jsx  # Dark/light mode state
│   │   ├── services/         # API helpers
│   │   ├── App.jsx           # Main application logic
│   │   └── index.css         # Global Tailwind styles
│   └── vite.config.js        # Vite + proxy config
├── README.md
└── package.json
```

---

## 🤝 Contributing
Contributions are welcome! If you'd like to add language support, improve visualizations, or enhance the UI, please open a PR.

## 📝 License
This project is licensed under the [MIT License](LICENSE).
