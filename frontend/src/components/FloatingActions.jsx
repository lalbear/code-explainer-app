// src/components/FloatingActions.jsx

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, Trash2, Clock, Terminal } from "lucide-react";

export default function FloatingActions({ history, onSelect, onClearHistory }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-80 glass-premium rounded-[32px] border-white/10 shadow-3xl overflow-hidden mb-4"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
              <h4 className="font-bold flex items-center gap-2">
                <History className="w-4 h-4 text-brand" />
                Session History
              </h4>
              <button 
                onClick={onClearHistory}
                className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all"
                title="Clear History"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="max-h-96 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {history.length === 0 ? (
                <div className="py-12 text-center space-y-2">
                  <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-2 opacity-50">
                    <Terminal className="w-6 h-6 text-slate-500" />
                  </div>
                  <p className="text-slate-500 text-sm">No recent analysis</p>
                </div>
              ) : (
                history.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      onSelect(item.fullCode);
                      setIsOpen(false);
                    }}
                    className="w-full text-left p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                        item.type === 'image' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-brand/10 text-brand'
                      }`}>
                        {item.type === 'image' ? 'Visualization' : 'Architectural'}
                      </span>
                      <div className="flex items-center gap-1 text-slate-500 text-[10px]">
                        <Clock className="w-3 h-3" />
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <p className="text-slate-300 text-sm font-mono truncate bg-black/30 p-2 rounded-lg border border-white/5 group-hover:border-white/10">
                      {item.code}
                    </p>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`p-5 rounded-full shadow-2xl transition-all duration-300 ${
          isOpen ? 'bg-slate-800 text-white shadow-brand/20' : 'bg-brand text-white shadow-brand/40'
        }`}
      >
        <History className={`w-6 h-6 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>
    </div>
  );
}