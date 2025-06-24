// File: src/components/ui/textarea.jsx

import React from "react";

const Textarea = ({ className = "", ...props }) => {
  return (
    <textarea
      className={`w-full h-40 p-4 rounded-xl border border-slate-300 bg-white text-slate-800 shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
      {...props}
    />
  );
};

export { Textarea };
