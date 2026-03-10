// src/App.jsx

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Header from "./components/Header";
import CodeInputCard from "./components/CodeInputCard";
import ExplanationBubble from "./components/ExplanationBubble";
import FloatingActions from "./components/FloatingActions";
import { Sparkles, ArrowDown, Shield, Zap, Globe } from "lucide-react";

const API_BASE_URL = "http://localhost:5001";

function App() {
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [explanation, setExplanation] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [history, setHistory] = useState([]);

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("code_analysis_history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem("code_analysis_history", JSON.stringify(history));
  }, [history]);

  const addToHistory = (code, type) => {
    const newItem = {
      code: code.substring(0, 50) + (code.length > 50 ? "..." : ""),
      fullCode: code,
      type,
      timestamp: new Date().toISOString(),
    };
    setHistory((prev) => [newItem, ...prev].slice(0, 10)); // Keep last 10
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("code_analysis_history");
  };

  const explainCode = async (codeInput) => {
    setIsLoading(true);
    setIsError(false);
    setExplanation("");
    setImage("");
    try {
      const response = await axios.post(`${API_BASE_URL}/api/explain`, {
        code: codeInput,
        language,
      });
      setExplanation(response.data.explanation);
      addToHistory(codeInput, "explanation");
    } catch (error) {
      console.error("Explanation Error:", error);
      setIsError(true);
      setExplanation(error.response?.data?.error || "Neural link failed. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const visualizeCode = async (codeInput) => {
    setIsLoading(true);
    setIsError(false);
    setImage("");
    setExplanation("");
    try {
      const response = await axios.post(`${API_BASE_URL}/api/visualize`, {
        code: codeInput,
        language,
      });
      setImage(response.data.image_url);
      addToHistory(codeInput, "visualization");
    } catch (error) {
      console.error("Visualization Error:", error);
      setIsError(true);
      setExplanation(error.response?.data?.error || "Visualization core offline. Retry recommended.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-brand/30 selection:text-white overflow-x-hidden">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <Header />

      <main className="relative z-10 pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-bold tracking-[0.2em] uppercase"
          >
            <Sparkles className="w-4 h-4" />
            Next-Gen Neural Diagnostics
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-white leading-[0.9]"
          >
            Decipher <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-indigo-400">Chaos</span>.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Advanced AI engine that transforms complex source code into human-readable logic and architectural blueprints.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-12 pt-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
          >
            <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
              <Shield className="w-4 h-4" /> Secure
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
              <Zap className="w-4 h-4" /> Real-time
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
              <Globe className="w-4 h-4" /> Universal
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="flex items-center gap-3 px-4 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-brand animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-widest text-brand">Interface Active</span>
            </div>
            <CodeInputCard 
              onSubmit={explainCode} 
              onVisualize={visualizeCode} 
              isLoading={isLoading} 
              language={language}
              setLanguage={setLanguage}
              input={input}
              setInput={setInput}
            />
          </div>

          <div className="space-y-6 lg:sticky lg:top-32">
            <AnimatePresence mode="wait">
              {(explanation || image || isLoading) ? (
                <ExplanationBubble 
                  key={explanation || image || 'loading'}
                  explanation={explanation} 
                  image={image} 
                  isError={isError}
                  onClear={() => {
                    setExplanation("");
                    setImage("");
                    setIsError(false);
                  }}
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-[500px] rounded-[40px] border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-slate-600 space-y-4 group"
                >
                  <div className="p-6 rounded-full bg-slate-900 shadow-inner group-hover:scale-110 transition-transform duration-500">
                    <ArrowDown className="w-8 h-8 opacity-20" />
                  </div>
                  <p className="text-sm font-medium tracking-wide">Analysis results will appear here</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <FloatingActions 
        history={history} 
        onSelect={(code) => setInput(code)} 
        onClearHistory={handleClearHistory}
      />

      <footer className="relative z-10 border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
              <span className="text-white font-black text-sm">AE</span>
            </div>
            <span className="text-white font-bold tracking-tight">Antigravity Engine</span>
          </div>
          <p className="text-slate-500 text-sm">© 2024 Advanced Neural Systems. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
