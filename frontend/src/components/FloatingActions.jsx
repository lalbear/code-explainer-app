// File: src/components/FloatingActions.jsx

import React from "react";
import { Trash2, Download } from "lucide-react";
import { Button } from "./ui/button";

const FloatingActions = ({ onClear, onExport, isDisabled }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex gap-3">
      <Button
        className="bg-white dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-600 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onClear}
        disabled={isDisabled}
      >
        <Trash2 className="w-4 h-4 mr-2" />
        Clear
      </Button>
      <Button
        className="bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onExport}
        disabled={isDisabled}
      >
        <Download className="w-4 h-4 mr-2" />
        Export
      </Button>
    </div>
  );
};

export default FloatingActions;