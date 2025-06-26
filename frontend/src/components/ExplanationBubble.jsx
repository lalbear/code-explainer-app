import React, { useEffect, useState } from "react";
import { DownloadIcon, TrashIcon } from "@radix-ui/react-icons";

// 📌 Markdown to HTML & sanitization
import { marked } from "marked";
import DOMPurify from "dompurify";

// 📌 PrismJS core + languages + theme
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-cpp"; // Add more if needed
import "prismjs/themes/prism-tomorrow.css"; // Theme (you can change to another)


// Custom renderer for better heading and code styling
const renderer = new marked.Renderer();
renderer.heading = (text, level) => {
  if (level === 3 && text.toLowerCase().includes("code explanation")) {
    return `<h2 class="text-2xl font-bold underline mb-4">${text}</h2>`;
  }
  return `<h${level} class="text-xl font-semibold mb-2">${text}</h${level}>`;
};

export default function ExplanationBubble({ explanation, clearExplanation }) {
  const [displayedHtml, setDisplayedHtml] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    if (!explanation) return;

    setDisplayedHtml("");
    setTypingDone(false);

    const rawHtml = marked.parse(explanation, { renderer });
    const cleanHtml = DOMPurify.sanitize(rawHtml);

    let i = 0;
    const interval = setInterval(() => {
      setDisplayedHtml(cleanHtml.slice(0, i));
      i += 8;
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
