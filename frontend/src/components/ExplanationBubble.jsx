// src/components/ExplanationBubble.jsx

import React, { useEffect, useState } from "react";
import { DownloadIcon, TrashIcon } from "@radix-ui/react-icons";

export default function ExplanationBubble({ explanation, clearExplanation }) {
  const [displayedText, setDisplayedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    if (!explanation) return;

    setDisplayedText("");
    setTypingDone(false);

    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + explanation.charAt(i));
      i++;
      if (i >= explanation.length) {
        clearInterval(interval);
        setTypingDone(true);
      }
    }, 5); // You can slow this down by increasing delay

    return () => clearInterval(interval);
  }, [explanation]);

  const handleExport = () => {
    const blob = new Blob([explanation], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "code_explanation.txt";
    link.href = url;
    link.click();
  };

  return (
    <div className="rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-6 space-y-4 shadow-sm transition">
      <div className="whitespace-pre-wrap font-mono text-sm text-slate-800 dark:text-slate-100">
        {displayedText}
        {!typingDone && <span className="animate-pulse text-pink-500">|</span>}
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={handleExport}
          className="flex items-center gap-1 text-sm px-3 py-1.5 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 transition"
        >
          <DownloadIcon /> Export
        </button>
        <button
          onClick={clearExplanation}
          className="flex items-center gap-1 text-sm px-3 py-1.5 rounded bg-red-200 dark:bg-red-700 hover:bg-red-300 dark:hover:bg-red-600 text-red-900 dark:text-red-100 transition"
        >
          <TrashIcon /> Clear
        </button>
      </div>
    </div>
  );
}
