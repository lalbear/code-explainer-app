import React, { useEffect, useState } from "react";
import { DownloadIcon, TrashIcon } from "@radix-ui/react-icons";
import { marked } from "marked";
import DOMPurify from "dompurify";

// Lazy load Prism to avoid initialization issues
let Prism = null;

const loadPrism = async () => {
  if (Prism) return Prism;

  try {
    const prismModule = await import("prismjs");

    // Import language components
    await import("prismjs/components/prism-clike");
    await import("prismjs/components/prism-markup");
    await import("prismjs/components/prism-javascript");
    await import("prismjs/components/prism-cpp");
    await import("prismjs/components/prism-python");

    // Import theme
    await import("prismjs/themes/prism-tomorrow.css");

    Prism = prismModule.default;
    return Prism;
  } catch (error) {
    console.warn("Failed to load Prism:", error);
    return null;
  }
};

export default function ExplanationBubble({ explanation, clearExplanation }) {
  const [displayedHtml, setDisplayedHtml] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    if (!explanation) return;

    setDisplayedHtml("");
    setTypingDone(false);

    try {
      const rawHtml = marked.parse(explanation);
      const cleanHtml = DOMPurify.sanitize(rawHtml);

      let i = 0;
      const interval = setInterval(() => {
        setDisplayedHtml(cleanHtml.slice(0, i));
        i += 6;
        if (i >= cleanHtml.length) {
          clearInterval(interval);
          setDisplayedHtml(cleanHtml);
          setTypingDone(true);

          // Safely highlight code after typing is done
          setTimeout(async () => {
            try {
              const PrismInstance = await loadPrism();
              if (PrismInstance) {
                PrismInstance.highlightAll();
              }
            } catch (error) {
              console.warn("Prism highlighting failed:", error);
            }
          }, 100);
        }
      }, 5);

      return () => clearInterval(interval);
    } catch (error) {
      console.error("Error processing markdown:", error);
      setDisplayedHtml(`<p>Error processing explanation: ${error.message}</p>`);
      setTypingDone(true);
    }
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
        className="prose dark:prose-invert max-w-none prose-pre:bg-transparent prose-headings:text-blue-700 dark:prose-headings:text-blue-300"
        dangerouslySetInnerHTML={{ __html: displayedHtml }}
      />
      {!typingDone && <span className="animate-pulse text-pink-500 ml-1">|</span>}

      <div className="flex justify-end gap-3">
  <button
    onClick={handleExport}
    className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg 
      bg-blue-600 hover:bg-blue-700 text-white 
      dark:bg-blue-700 dark:hover:bg-blue-600 
      border border-blue-700 dark:border-blue-600 
      transition-all duration-200 font-medium"
  >
    <DownloadIcon className="w-4 h-4" /> Export
  </button>
  <button
    onClick={clearExplanation}
    className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg 
      bg-red-600 hover:bg-red-700 text-white 
      dark:bg-red-700 dark:hover:bg-red-600 
      border border-red-700 dark:border-red-600 
      transition-all duration-200 font-medium"
  >
    <TrashIcon className="w-4 h-4" /> Clear
  </button>
</div>

    </div>
  );
}
