// src/components/CodeInputCard.jsx

import React from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { CodeIcon, Sparkles } from "lucide-react";

const CodeInputCard = ({
  input,
  setInput,
  onSubmit,
  onVisualize,   // NEW: callback for visualize
  isLoading,
  language,
  setLanguage,
}) => {
  const lineCount = input ? input.split("\n").length : 1;

  const handleSubmit = () => {
    if (isLoading) return;
    if (!onSubmit) {
      console.warn("onSubmit prop is not provided");
      return;
    }

    if (input.trim()) {
      onSubmit(input);
    }
  };

  const handleVisualize = () => {
    if (isLoading) return;
    if (!onVisualize) {
      console.warn("onVisualize prop is not provided");
      return;
    }

    if (input.trim()) {
      onVisualize(input);
    }
  };

  return (
    <div className="bg-muted dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-sm p-4 space-y-4 max-w-3xl mx-auto mt-6">
      {/* Header with title and language selector */}
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-pink-500" />
          Code Input
        </div>

        <select
          className="text-sm px-2 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200"
          value={language}
          onChange={(e) => setLanguage && setLanguage(e.target.value)}
        >
          <option value="python">Python</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="js">JavaScript</option>
        </select>
      </div>

      {/* Text area for code input */}
      <Textarea
        placeholder="Paste your code here..."
        rows={12}
        className="w-full font-mono resize-none"
        value={input}
        onChange={(e) => setInput && setInput(e.target.value)}
        disabled={isLoading}
      />

      {/* Footer with line count and buttons */}
      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>Lines: {lineCount}</span>
        <div className="flex gap-2">
          {/* NEW Visualize button */}
          <Button
            className="bg-pink-600 hover:bg-pink-700 text-white flex gap-2 items-center disabled:opacity-50"
            onClick={handleVisualize}
            disabled={isLoading}
          >
            <CodeIcon className="w-4 h-4" />
            {isLoading ? "Processing..." : "Visualize"}
          </Button>

          {/* Existing Analyze button */}
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white flex gap-2 items-center disabled:opacity-50"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            <CodeIcon className="w-4 h-4" />
            {isLoading ? "Analyzing..." : "Analyze Code"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CodeInputCard;
