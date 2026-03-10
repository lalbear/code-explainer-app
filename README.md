# 🚀 Code Explainer App

**Unlock Code Clarity. Accelerate Learning Instantly.**

An AI-powered application designed to deconstruct complex code snippets and provide intuitive, human-readable explanations. Whether you're a student learning a new language or a senior developer auditing a legacy codebase, Code Explainer de-mystifies the syntax.

---

## ✨ Key Features

### 🛠️ Advanced Code Editor
- **Line Numbers**: Reference specific lines easily with integrated numbering.
- **Multi-Language Support**: Full syntax highlighting for **JavaScript**, **TypeScript**, **Python**, **Go**, **Rust**, and **Shell**.
- **Real-time Sanitization**: Safe code rendering to prevent XSS.

### 🤖 AI-Driven Insights
- **In-Depth Analysis**: Uses advanced LLMs via OpenRouter to explain logic, time complexity, and edge cases.
- **Streaming UI**: Watch as the AI "thinks" and types the explanation in real-time.

### 📤 Export & Utility
- **Copy to Clipboard**: Instant copying of markdown explanations with one click.
- **Export as File**: Download individual explanations as `.txt` files.
- **Global Data Export**: Export your entire session history with timestamps and sequence numbers.
- **Session Persistence**: Keep track of multiple snippets in a clean, scrollable timeline.

---

## 🛠️ Tech Stack

### Frontend
- **React.js**: Modern component-based UI.
- **Vite**: Ultra-fast build tool and dev server.
- **Tailwind CSS**: Utility-first styling with high craft.
- **Prism.js**: Robust syntax highlighting engine.
- **Radix UI Icons**: Premium iconography for tool actions.

### Backend
- **Node.js & Express**: High-performance API server.
- **Axios**: Secure and efficient HTTP requests.
- **Dotenv**: Secure environment variable management.
- **CORS & Rate Limiting**: Production-grade security and abuse protection.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.x or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/lalbear/code-explainer-app.git
   cd code-explainer-app
   ```

2. **Install Root & Sub-project Dependencies:**
   ```bash
   # Root (if applicable)
   npm install
   
   # Frontend
   cd frontend && npm install
   
   # Backend
   cd ../backend && npm install
   ```

### Configuration

Create a `.env` file in the `backend/` directory:
```env
PORT=5000
OPENROUTER_API_KEY=your_key_here
```

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

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🗺️ Project Structure

```text
code-explainer-app/
├── backend/            # Express API Server
│   ├── index.js        # Main entry point
│   ├── controllers/    # API Logic
│   └── routes/         # Endpoint definitions
├── frontend/           # React App (Vite)
│   ├── src/
│   │   ├── components/ # UI Components (Editor, Bubbles)
│   │   ├── App.jsx     # Main Dashboard Logic
│   │   └── index.css   # Global Styles (Tailwind)
├── README.md           # Project Documentation
└── package.json        # Root workspace config
```

---

## 🤝 Contributing
Contributions are welcome! If you'd like to improve syntax highlighting or add support for more languages, please open a PR.

## 📝 License
This project is licensed under the [MIT License](LICENSE).
