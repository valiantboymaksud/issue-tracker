"use client";

import { useState, useEffect } from 'react';
import { X, Save, StickyNote, Copy, Check } from 'lucide-react'; // Added Copy and Check

interface PersonalNotesProps {
  isOpen: boolean;
  onClose: () => void;
  initialContent: string;
  onSave: (content: string) => void;
}

export default function PersonalNotes({ isOpen, onClose, initialContent, onSave }: PersonalNotesProps) {
  const [content, setContent] = useState(initialContent);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [copied, setCopied] = useState(false); // State for copy feedback

  // Sync with initial prop when opening
  useEffect(() => {
    setContent(initialContent);
    setSaveStatus('saved');
  }, [initialContent, isOpen]);

  // Auto-save logic (Debounced)
  useEffect(() => {
    if (content === initialContent) return;

    setSaveStatus('unsaved');
    
    const timer = setTimeout(() => {
      setSaveStatus('saving');
      onSave(content);
      setSaveStatus('saved');
    }, 1000);

    return () => clearTimeout(timer);
  }, [content, initialContent, onSave]);

  // Copy to Clipboard Handler
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset icon after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full md:w-[600px] h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 ease-out">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-2">
            <StickyNote className="w-5 h-5 text-blue-500" />
            <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100">Personal Scratchpad</h2>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Save Status */}
            <div className="flex items-center gap-1 text-xs text-slate-500">
              {saveStatus === 'saved' && <><Save className="w-3 h-3 text-green-500" /> Saved</>}
              {saveStatus === 'saving' && <span className="animate-pulse">Saving...</span>}
              {saveStatus === 'unsaved' && <span>Unsaved</span>}
            </div>

            {/* Copy Button */}
            <button 
              onClick={handleCopy}
              className="p-1.5 rounded-md text-slate-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              title={copied ? "Copied!" : "Copy to Clipboard"}
            >
              {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>

            {/* Close Button */}
            <button 
              onClick={onClose}
              className="p-1.5 rounded-md text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-0 overflow-hidden relative">
          <textarea
            className="w-full h-full p-6 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 resize-none focus:outline-none font-mono text-sm leading-relaxed custom-scrollbar"
            placeholder="Write your personal thoughts, meeting notes, or snippets here... (Auto-saved)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}