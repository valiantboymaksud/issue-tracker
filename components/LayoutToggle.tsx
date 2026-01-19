"use client";

import { FileText, LayoutTemplate } from 'lucide-react';

export default function LayoutToggle({ 
  isFull, 
  onToggle 
}: { 
  isFull: boolean; 
  onToggle: () => void; 
}) {
  return (
    <button
      onClick={onToggle}
      className={`
        p-2 rounded-md transition-colors border
        ${isFull 
          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800' 
          : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 border-transparent'
        }
      `}
      title={isFull ? "Switch to Simple View" : "Switch to Full View"}
    >
      {isFull ? <FileText className="w-5 h-5" /> : <LayoutTemplate className="w-5 h-5" />}
    </button>
  );
}