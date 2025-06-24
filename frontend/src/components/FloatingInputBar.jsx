import React, { useState, useRef } from 'react';
import { PaperPlaneIcon } from '@radix-ui/react-icons';

export default function FloatingInputBar({ onSubmit, loading }) {
  const [input, setInput] = useState('');
  const textareaRef = useRef();

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    onSubmit(trimmed);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 backdrop-blur shadow-xl">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-end space-x-3">
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Paste your code here..."
          className="flex-grow resize-none rounded-lg px-4 py-2 text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          style={{ minHeight: '40px', maxHeight: '160px', lineHeight: '1.4' }}
        />

        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className={`p-2 rounded-full transition ${
            !input.trim() || loading
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          <PaperPlaneIcon className="w-5 h-5 rotate-45" />
        </button>
      </div>
    </div>
  );
}
