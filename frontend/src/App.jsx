import React, { useEffect, useRef, useState } from "react";
import { CodeIcon, Heart, Mail, Github } from "lucide-react";

import { ThemeProvider } from "./context/ThemeContext";
import { explainCode } from "./services/api";

import CodeInputCard from "./components/CodeInputCard";
import ExplanationBubble from "./components/ExplanationBubble";
import FloatingActions from "./components/FloatingActions";
import ThemeToggle from "./components/ThemeToggle";

function AppContent() {
  const [input, setInput] = useState("");
  const [explanations, setExplanations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("cpp");
  const explanationRef = useRef(null);

  const handleExplain = async (code) => {
    if (!code.trim()) return;

    setIsLoading(true);
    try {
      const response = await explainCode(code, language);
      const data = response?.explanation || "Explanation unavailable.";
      setExplanations((prev) => [
        ...prev,
        { text: data, timestamp: Date.now() },
      ]);
    } catch (error) {
      setExplanations((prev) => [
        ...prev,
        { text: "Error: " + error.message },
      ]);
    } finally {
      setIsLoading(false);
      setInput(""); // clear input
    }
  };

  const handleClear = () => setExplanations([]);

  const handleExport = () => {
    const blob = new Blob([explanations.map((e) => e.text).join("\n\n")], {
      type: "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "explanation.txt";
    link.click();
  };

  useEffect(() => {
    if (explanationRef.current) {
      explanationRef.current.scrollTop = explanationRef.current.scrollHeight;
    }
  }, [explanations]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f172a] transition-colors duration-300 text-black dark:text-white relative">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 shadow-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur">
        <div className="flex items-center gap-2 font-bold text-xl">
          <CodeIcon className="w-6 h-6 text-indigo-500" />
          CodeExplainer
        </div>
        <ThemeToggle />
      </header>

      {/* Explanations List */}
      <main
        ref={explanationRef}
        className="flex flex-col gap-4 p-4 pb-32 max-w-3xl mx-auto"
      >
        {explanations.length === 0 ? (
          <p className="text-center text-slate-500 mt-16">
            No explanations yet
          </p>
        ) : (
          explanations.map((exp, idx) => (
            <ExplanationBubble
              key={exp.timestamp + idx}
              explanation={exp.text}
              clearExplanation={() =>
                setExplanations((prev) =>
                  prev.filter((_, i) => i !== idx)
                )
              }
            />
          ))
        )}
      </main>

      {/* Code Input Section */}
      <CodeInputCard
        input={input}
        setInput={setInput}
        onSubmit={handleExplain}
        isLoading={isLoading}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Bottom Action Buttons */}
      <FloatingActions 
        onClear={handleClear} 
        onExport={handleExport} 
        isDisabled={explanations.length === 0}
      />

      {/* Contact Footer */}
      <footer className="bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 px-6 py-4 mt-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Developer Info */}
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <span>Developed with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>by</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                Pranjal Upadhyay
              </span>
            </div>
            
            {/* Contact Links */}
            <div className="flex items-center gap-4">
              <a
                href="mailto:pranjalup25@gmail.com"
                className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">pranjalup25@gmail.com</span>
                <span className="sm:hidden">Email</span>
              </a>
              
              <a
                href="https://github.com/lalbear"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">lalbear</span>
                <span className="sm:hidden">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}