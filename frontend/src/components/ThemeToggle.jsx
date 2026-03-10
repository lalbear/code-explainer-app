// src/components/ThemeToggle.jsx
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext"; // ✅ correct import

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-xl transition-all duration-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 shadow-sm border border-slate-200 dark:border-slate-700 group overflow-hidden"
      aria-label="Toggle theme"
    >
      <div className="relative z-10 flex items-center justify-center">
        {darkMode ? (
          <Moon className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
        ) : (
          <Sun className="w-5 h-5 text-amber-500 group-hover:text-amber-600 transition-colors" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
