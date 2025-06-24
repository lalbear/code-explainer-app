// src/components/ThemeToggle.jsx
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext"; // ✅ correct import

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition"
    >
      {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-600" />}
    </button>
  );
};

export default ThemeToggle;
