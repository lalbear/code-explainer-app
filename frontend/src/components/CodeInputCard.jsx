// src/components/CodeInputCard.jsx

import React from "react";
import { motion } from "framer-motion";
import { Code2, Zap, Layers, Cpu, Terminal } from "lucide-react";

export default function CodeInputCard({ onSubmit, onVisualize, isLoading, language, setLanguage, input, setInput }) {
  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "cpp", label: "C++" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-premium p-8 rounded-[40px] border-slate-200 dark:border-white/10 shadow-glow overflow-hidden relative group"
    >
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 dark:bg-brand/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-brand/10 dark:group-hover:bg-brand/20 transition-colors duration-700" />
      
      <div className="flex flex-col gap-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold font-display flex items-center gap-3 text-slate-900 dark:text-white">
              <Terminal className="text-brand w-6 h-6" />
              Source Architect
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Design and analyze your algorithms with AI</p>
          </div>
          
          <div className="flex items-center bg-slate-100/50 dark:bg-slate-900/50 p-1.5 rounded-2xl border border-slate-200 dark:border-white/5 backdrop-blur-md">
            {languages.map((lang) => (
              <button
                key={lang.value}
                onClick={() => setLanguage(lang.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  language === lang.value 
                    ? "bg-brand text-white shadow-lg shadow-brand/20 scale-105" 
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative group/textarea">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="// Paste your complex code here for deep architectural analysis..."
            disabled={isLoading}
            className="w-full h-80 bg-white/40 dark:bg-black/40 border border-slate-300 dark:border-white/10 rounded-3xl p-6 text-slate-800 dark:text-slate-300 font-mono text-sm focus:ring-2 focus:ring-brand/40 focus:border-brand/40 transition-all resize-none outline-none group-hover/textarea:border-slate-400 dark:group-hover/textarea:border-white/20 custom-scrollbar"
          />
          <div className="absolute bottom-4 right-4 flex items-center gap-2 pointer-events-none opacity-0 group-focus-within/textarea:opacity-100 transition-opacity">
            <span className="text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-500 font-bold bg-slate-100/80 dark:bg-slate-800/80 px-2 py-1 rounded">
              Input Mode: {language}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => onSubmit(input)}
            disabled={isLoading || !input}
            className="flex-1 premium-button-primary py-4 rounded-2xl text-base font-bold flex items-center justify-center gap-3 group/btn"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Zap className="w-5 h-5 group-hover/btn:animate-pulse" />
                Analyze Architecture
              </>
            )}
          </button>
          
          <button
            onClick={() => onVisualize(input)}
            disabled={isLoading || !input}
            className="flex-1 premium-button-secondary py-4 rounded-2xl text-base font-bold flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-brand/30 border-t-brand rounded-full animate-spin" />
            ) : (
              <>
                <Layers className="w-5 h-5" />
                Visualize Logic
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
