import React, { useEffect, useState } from "react";
import { DownloadIcon, TrashIcon } from "@radix-ui/react-icons";
import { marked } from "marked";
import DOMPurify from "dompurify";
import ImageViewerModal from "./ImageViewerModal"; // ✅ import your modal

// Prism loader (keep your existing code if already there)
let Prism = null;
const loadPrism = async () => {
  if (Prism) return Prism;
  try {
    const prismModule = await import("prismjs");
    await import("prismjs/components/prism-clike");
    await import("prismjs/components/prism-markup");
    await import("prismjs/components/prism-javascript");
    await import("prismjs/components/prism-cpp");
    await import("prismjs/components/prism-python");
    await import("prismjs/themes/prism-tomorrow.css");
    Prism = prismModule.default;
    return Prism;
  } catch (error) {
    console.warn("Failed to load Prism:", error);
    return null;
  }
};

export default function ExplanationBubble({ explanation, image, clearExplanation }) {
  const [modalOpen, setModalOpen] = useState(false); // ✅ track modal state

  // --- IMAGE MODE ---
  if (image) {
    return (
      <div className="rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-6 space-y-4 shadow-sm transition">
        <div className="flex justify-center">
          <img
  src={image}
  alt="Code visualization"
  onClick={() => setModalOpen(true)}
  className="cursor-zoom-in max-h-[520px] w-auto rounded-lg border border-slate-200 dark:border-slate-700 relative group"
/>
<span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
  Click to expand
</span>

        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              const link = document.createElement("a");
              link.href = image;
              link.download = "code_visualization.png";
              link.click();
            }}
            className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
          >
            <DownloadIcon className="w-4 h-4" /> Download
          </button>
          <button
            onClick={clearExplanation}
            className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg font-medium text-white bg-red-500 hover:bg-red-600 transition"
          >
            <TrashIcon className="w-4 h-4" /> Clear
          </button>
        </div>

        {/* ✅ Fullscreen Modal */}
        {modalOpen && (
          <ImageViewerModal
            src={image}
            alt="Code visualization"
            onClose={() => setModalOpen(false)}
          />
        )}
      </div>
    );
  }

  // --- TEXT MODE (unchanged) ---
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

          setTimeout(async () => {
            try {
              const PrismInstance = await loadPrism();
              if (PrismInstance) PrismInstance.highlightAll();
            } catch (err) {
              console.warn("Prism highlighting failed:", err);
            }
          }, 100);
        }
      }, 5);

      return () => clearInterval(interval);
    } catch (error) {
      console.error("Error processing markdown:", error);
      setDisplayedHtml(`<p>Error: ${error.message}</p>`);
      setTypingDone(true);
    }
  }, [explanation]);

  const handleExport = () => {
    const blob = new Blob([explanation || ""], { type: "text/plain" });
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
          className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
        >
          <DownloadIcon className="w-4 h-4" /> Export
        </button>
        <button
          onClick={clearExplanation}
          className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg font-medium text-white bg-red-500 hover:bg-red-600 transition"
        >
          <TrashIcon className="w-4 h-4" /> Clear
        </button>
      </div>
    </div>
  );
}
