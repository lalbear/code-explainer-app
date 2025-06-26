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
      setDisplayedText(explanation.slice(0, i));
      i += 6;
      if (i >= explanation.length) {
        clearInterval(interval);
        setDisplayedText(explanation);
        setTypingDone(true);
      }
    }, 50);

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

  // Simple test to make sure component renders
  if (!explanation) {
    return <div>No explanation provided</div>;
  }

  return (
    <div className="rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-6 space-y-4 shadow-sm">
      <div className="whitespace-pre-wrap">
        {displayedText}
      </div>
      {!typingDone && <span className="animate-pulse text-pink-500 ml-1">|</span>}

      <div className="flex justify-end gap-3">
        <button
          onClick={handleExport}
          className="flex items-center gap-1 text-sm px-3 py-1.5 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100"
        >
          <DownloadIcon /> Export
        </button>
        <button
          onClick={clearExplanation}
          className="flex items-center gap-1 text-sm px-3 py-1.5 rounded bg-red-200 dark:bg-red-700 hover:bg-red-300 dark:hover:bg-red-600 text-red-900 dark:text-red-100"
        >
          <TrashIcon /> Clear
        </button>
      </div>
    </div>
  );
}