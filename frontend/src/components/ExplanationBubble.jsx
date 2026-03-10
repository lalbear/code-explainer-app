import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, Code2, AlertTriangle, Copy, Check, Terminal, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function ExplanationBubble({ explanation, image, isError, isLoading, onClear }) {
  const [copied, setCopied] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingSpeed = 15; // ms per chunk
  const timerRef = useRef(null);

  // Typewriter effect
  useEffect(() => {
    if (!isLoading && explanation && !image && !isError) {
      setDisplayedText("");
      setIsTyping(true);
      let index = 0;
      
      const typeNextChar = () => {
        if (index < explanation.length) {
          // Type in chunks for better performance and "streaming" feel
          const chunkSize = Math.ceil(explanation.length / 100) || 5; 
          setDisplayedText(explanation.substring(0, Math.min(index + chunkSize, explanation.length)));
          index += chunkSize;
          timerRef.current = setTimeout(typeNextChar, typingSpeed);
        } else {
          setIsTyping(false);
        }
      };

      typeNextChar();
    } else if (isLoading) {
      setDisplayedText("Initializing deep neural scan...");
      setIsTyping(false);
    } else {
      setDisplayedText(explanation);
      setIsTyping(false);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [explanation, image, isError, isLoading]);

  const handleCopy = () => {
    navigator.clipboard.writeText(explanation || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!explanation && !image && !isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`glass-premium rounded-[40px] border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl relative ${
        isError ? "border-red-500/30 ring-1 ring-red-500/20" : ""
      }`}
    >
      {/* Decorative Glow */}
      {!isError && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand to-transparent opacity-50" />
      )}

      <div className="p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-2.5 rounded-2xl ${isError ? "bg-red-500/10 text-red-400" : "bg-brand/10 text-brand"}`}>
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : isError ? (
                <AlertTriangle className="w-6 h-6" />
              ) : (
                <Sparkles className="w-6 h-6" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                {isLoading ? "Analyzing Logic..." : isError ? "System Diagnostics" : "Architectural Insight"}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs tracking-wider uppercase font-bold">
                {isLoading ? "Connecting to compute cluster..." : "Neural Core v4.2 Stable"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {!isError && explanation && (
              <button 
                onClick={handleCopy}
                className="p-2.5 rounded-xl hover:bg-slate-200/50 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all flex items-center gap-2 text-sm border border-transparent hover:border-slate-300 dark:hover:border-white/10"
              >
                {copied ? <Check className="w-4 h-4 text-green-500 dark:text-green-400" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy Insight"}
              </button>
            )}
            <button 
              onClick={onClear}
              className="p-2.5 rounded-xl hover:bg-red-100 dark:hover:bg-red-500/10 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-all border border-transparent hover:border-red-200 dark:hover:border-red-500/20"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="relative">
          {isLoading ? (
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center py-12 space-y-6">
                <div className="relative">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-brand/20 blur-3xl rounded-full"
                  />
                  <div className="relative glass p-6 rounded-full border-brand/20">
                    <Terminal className="w-10 h-10 text-brand" />
                  </div>
                </div>
                <div className="space-y-2 text-center">
                  <h4 className="text-slate-900 dark:text-white font-bold tracking-tight">Processing Code Vectors</h4>
                  <div className="flex gap-1 justify-center">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        className="w-1.5 h-1.5 bg-brand rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-1 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
                      className="w-full h-full bg-brand/40"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : image ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-black/20 p-2"
            >
              <img src={image} alt="Code Logic Visualization" className="w-full h-auto rounded-2xl shadow-glow shadow-brand/10" />
              <div className="p-4 bg-brand/5 border-t border-slate-200 dark:border-white/5 flex items-center gap-3">
                <Code2 className="w-4 h-4 text-brand" />
                <span className="text-slate-600 dark:text-slate-400 text-sm">Flow diagram generated successfully</span>
              </div>
            </motion.div>
          ) : (
            <div className={`prose prose-slate dark:prose-invert max-w-none prose-p:text-slate-700 dark:prose-p:text-slate-400 prose-p:text-sm prose-p:leading-relaxed prose-headings:text-slate-900 dark:prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight prose-strong:text-brand prose-strong:font-bold prose-code:text-indigo-600 dark:prose-code:text-indigo-300 prose-pre:bg-slate-100 dark:prose-pre:bg-slate-900/50 prose-pre:border prose-pre:border-slate-200 dark:prose-pre:border-white/5 ${isError ? "text-red-600 dark:text-red-300/80 prose-p:text-red-600/80 dark:prose-p:text-red-200/60" : ""}`}>
              <ReactMarkdown
                components={{
                  h1: ({node, ...props}) => <h1 className="text-2xl mt-8 mb-4 border-b border-slate-200 dark:border-white/5 pb-2" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-xl mt-6 mb-3 text-brand" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-lg mt-4 mb-2 opacity-90" {...props} />,
                  p: ({node, ...props}) => <p className="mb-4 last:mb-0" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-2" {...props} />,
                  li: ({node, ...props}) => <li className="text-slate-700 dark:text-slate-400 text-sm" {...props} />,
                  code: ({node, inline, ...props}) => 
                    inline 
                      ? <code className="bg-slate-200 dark:bg-white/5 px-1.5 py-0.5 rounded text-indigo-700 dark:text-indigo-300 text-[13px] font-mono" {...props} />
                      : <code className="block p-4 overflow-x-auto text-sm" {...props} />
                }}
              >
                {displayedText}
              </ReactMarkdown>
              {isTyping && (
                <motion.span 
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-1.5 h-4 bg-brand ml-1 align-middle"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

