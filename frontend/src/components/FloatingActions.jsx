// File: src/components/FloatingActions.jsx

import React from "react";
import { Trash2, Download } from "lucide-react";
import { Button } from "./ui/button";

const FloatingActions = ({ onClear, onExport, isDisabled }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex gap-3">
      <Button
        variant="outline"
        className="bg-white dark:bg-slate-800 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 border border-red-300"
        onClick={onClear}
        disabled={isDisabled}
      >
        <Trash2 className="w-4 h-4 mr-2" />
        Clear
      </Button>
      <Button
        variant="default"
        className="bg-indigo-600 text-white hover:bg-indigo-700"
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
