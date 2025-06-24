// File: src/components/ui/button.jsx

import React from "react";

const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
