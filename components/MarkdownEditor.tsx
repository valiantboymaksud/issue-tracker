"use client";

import { useState, useEffect, useRef } from 'react';
import { Copy, Check, CheckCircle2 } from 'lucide-react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export default function MarkdownEditor({ value, onChange, placeholder = "Type markdown here...", label }: MarkdownEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-save logic
  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  // Reset cursor when switching items
  useEffect(() => {
    if (textareaRef.current) {
        // Only focus if explicitly editing, otherwise blur to show 'View' state
        if (!isEditing) {
            textareaRef.current.blur();
        }
    }
  }, []);

  // UNIFIED STYLING: 
  // Read-only and Edit modes look EXACTLY the same.
  const baseClasses = "w-full min-h-[250px] p-4 text-sm leading-relaxed transition-all rounded-md border shadow-sm focus:outline-none resize-y";
  const themeClasses = "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700";

  return (
    <div className="relative group animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-1">
        {label && <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">{label}</label>}
        
        {/* Copy Button */}
        <button 
            onClick={handleCopy}
            className="flex items-center gap-1 text-[10px] font-medium text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            title={copied ? "Copied!" : "Copy text"}
        >
            {copied ? <><CheckCircle2 className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
        </button>
      </div>

      {/* ALWAYS VISIBLE TEXTAREA */}
      {/* readOnly={!isEditing} ensures clicking doesn't activate edit mode unless focused, 
          but visual context remains identical. */}
      <textarea
        ref={textareaRef}
        readOnly={!isEditing}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`${baseClasses} ${themeClasses} font-sans ${
          !isEditing 
            ? 'cursor-default focus:ring-0 disabled:opacity-100' // View Mode styling
            : 'cursor-text' // Edit Mode styling
        }`}
      />

      {/* Visual Indicator for Read-Only Mode (Bottom Right) */}
      {!isEditing && (
        <div className="absolute bottom-6 right-4 text-[10px] text-slate-400 bg-white/90 dark:bg-slate-900/90 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Read-Only (Click to edit)
        </div>
      )}
    </div>
  );
}