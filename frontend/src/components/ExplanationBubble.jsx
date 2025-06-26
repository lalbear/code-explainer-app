import React, { useEffect, useState } from "react";
import { DownloadIcon, TrashIcon } from "@radix-ui/react-icons";
import { marked } from "marked";
import DOMPurify from "dompurify";
import Prism from "prismjs";
import "prismjs/components/prism-javascript"; // add more languages if needed
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-python";
import "prismjs/themes/prism-tomorrow.css"; // or your preferred theme

export default function ExplanationBubble({ explanation, clearExplanation }) {
  const [displayedHtml, setDisplayedHtml] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    if (!explanation) return;

    // Reset
    setDisplayedHtml("");
    setTypingDone(false);

    // Convert Markdown to HTML, sanitize, and add typing animation
    const cleanHtml = DOMPurify.sanitize(marked.parse(explanation));

    let i = 0;
    const interval = setInterval(() => {
      setDisplayedHtml(cleanHtml.slice(0, i));
      i += 8; // You can slow down typing here
      if (i >= cleanHtml.length) {
        clearInterval(interval);
        setDisplayedHtml(cleanHtml);
        setTypingDone(true);
        Prism.highlightAll();
      }
    }, 5);

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
      <div
        className="prose dark:prose-invert max-w-none prose-pre:bg-slate-900 prose-pre:text-white prose-code:text-pink-500 prose-headings:text-blue-700 dark:prose-headings:text-blue-300"
        dangerouslySetInnerHTML={{ __html: displayedHtml }}
      />
      {!typingDone && <span className="animate-pulse text-pink-500 ml-1">|</span>}

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
