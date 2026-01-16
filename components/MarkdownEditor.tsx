"use client";

import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Edit2, Maximize2 } from 'lucide-react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string; // Optional label
}

export default function MarkdownEditor({ value, onChange, placeholder = "Type markdown here...", label }: MarkdownEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleSave = () => {
    onChange(editValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape') {
      setEditValue(value);
      setIsEditing(false);
    } else if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      handleSave();
    }
  };

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(textareaRef.current.value.length, textareaRef.current.value.length);
    }
  }, [isEditing]);

  if (isEditing) {
    return (
      <div className="relative group animate-in fade-in duration-200">
        {label && <label className="block text-xs font-semibold text-slate-500 mb-1">{label}</label>}
        <textarea
          ref={textareaRef}
          className="w-full min-h-[200px] bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md p-4 text-slate-800 dark:text-slate-200 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y shadow-sm"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
        <div className="absolute bottom-2 right-2 text-xs text-slate-400 bg-white dark:bg-slate-950 px-2 py-1 rounded border border-slate-200 dark:border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
          ESC to cancel • CMD+Enter to save
        </div>
      </div>
    );
  }

  return (
    <div className="relative group bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors overflow-hidden">
      {/* Fixed Height Container with Scroll for Long Text */}
      <div 
        className="prose prose-slate dark:prose-invert max-w-none cursor-text p-4 h-64 overflow-y-auto custom-scrollbar hover:bg-slate-50 dark:hover:bg-slate-900/50"
        onClick={() => setIsEditing(true)}
        title="Click to edit"
      >
        {value ? (
          <ReactMarkdown>{value}</ReactMarkdown>
        ) : (
          <span className="text-slate-400 dark:text-slate-600 italic block h-full flex items-center">{placeholder}</span>
        )}
      </div>
      
      {/* Header / Toolbar */}
      <div className="flex justify-between items-center px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        {label && <span className="text-xs font-semibold text-slate-500">{label}</span>}
        <button 
            onClick={() => setIsEditing(true)}
            className="text-xs flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium hover:underline"
        >
            <Edit2 className="w-3 h-3" /> Edit
        </button>
      </div>
    </div>
  );
}