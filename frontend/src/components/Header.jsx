// src/components/Header.jsx

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-8 py-5 sticky top-0 z-50 glass border-b border-white/10">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3 font-bold text-2xl tracking-tight"
      >
        <div className="p-2 rounded-xl bg-brand/10 text-brand outline outline-1 outline-brand/20">
          <Sparkles className="w-6 h-6" />
        </div>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand to-brand-light font-display">
          CodeExplainer.ai
        </span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <ThemeToggle />
      </motion.div>
    </header>
  );
};

export default Header;
