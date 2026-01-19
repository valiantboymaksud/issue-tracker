"use client";

import { Issue, EntryType, IssueStatus } from '@/types/issue';
import { Trash2, ExternalLink, Database, Terminal, ArrowLeft, Link2, FileText, LayoutList, ChevronDown, Pin, PinOff } from 'lucide-react';
import MarkdownEditor from './MarkdownEditor';
import AssigneeSelect from './AssigneeSelect';
import { useState } from 'react';

interface IssueDetailsProps {
  issue: Issue | null;
  onUpdate: (issue: Issue) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
  assignees: string[];
  onAddAssignee: (name: string) => void;
}

export default function IssueDetails({ issue, onUpdate, onDelete, onBack, assignees, onAddAssignee }: IssueDetailsProps) {
  const [showTypeMenu, setShowTypeMenu] = useState(false);

  if (!issue) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-slate-50 dark:bg-slate-950 text-slate-500">
        <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
          <ExternalLink className="w-8 h-8 text-slate-400" />
        </div>
        <p className="text-lg">Select an item to view details</p>
      </div>
    );
  }

  const handleFieldUpdate = <K extends keyof Issue>(field: K, value: Issue[K]) => {
    onUpdate({ ...issue, [field]: value, updatedAt: Date.now() });
  };

  const toggleType = (newType: EntryType) => {
    handleFieldUpdate('type', newType);
    setShowTypeMenu(false);
  };

  const isNote = issue.type === 'note';
  const prUrl = issue.prBaseUrl ? `${issue.prBaseUrl.replace(/\/$/, '')}?q=${issue.id}` : null;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950 overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-slate-200 dark:border-slate-800 p-4 md:p-6 bg-white dark:bg-slate-900/50 backdrop-blur shadow-sm z-10">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="md:hidden p-2 -ml-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex-1 relative">
            <input
              className="text-xl md:text-2xl font-bold bg-transparent border-none focus:ring-0 p-0 text-slate-900 dark:text-slate-100 w-full placeholder-slate-400"
              value={issue.title}
              onChange={(e) => handleFieldUpdate('title', e.target.value)}
              placeholder={isNote ? "Note Title" : "Issue Title"}
            />
          </div>

          <div className="relative">
             <button 
                onClick={() => setShowTypeMenu(!showTypeMenu)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm font-medium text-slate-700 dark:text-slate-200"
             >
                {isNote ? <FileText className="w-4 h-4 text-purple-500" /> : <LayoutList className="w-4 h-4 text-blue-500" />}
                {isNote ? "Note" : "Issue"}
                <ChevronDown className="w-3 h-3 text-slate-400" />
             </button>

             {showTypeMenu && (
                <div className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-slate-800 rounded-md shadow-xl border border-slate-200 dark:border-slate-700 z-20 overflow-hidden">
                    <button onClick={() => toggleType('issue')} className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 ${!isNote ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-600 dark:text-slate-400'}`}>
                        Issue
                    </button>
                    <button onClick={() => toggleType('note')} className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 ${isNote ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-bold' : 'text-slate-600 dark:text-slate-400'}`}>
                        Note
                    </button>
                </div>
             )}
          </div>

          <div className="flex gap-2 flex-shrink-0">
            {/* PIN BUTTON */}
            <button
                onClick={() => handleFieldUpdate('isPinned', !issue.isPinned)}
                className={`p-1.5 rounded-md transition-colors ${issue.isPinned ? 'text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                title={issue.isPinned ? "Unpin Item" : "Pin Item"}
            >
                {issue.isPinned ? <Pin className="w-5 h-5 fill-current" /> : <PinOff className="w-5 h-5" />}
            </button>

            {!isNote && (
                <>
                    {prUrl && (
                    <a href={prUrl} target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md transition-colors border border-slate-200 dark:border-slate-700">
                        <ExternalLink className="w-4 h-4" /> PR
                    </a>
                    )}
                    {issue.issueUrl && (
                    <a href={issue.issueUrl} target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md transition-colors border border-slate-200 dark:border-slate-700">
                        <Link2 className="w-4 h-4" /> Issue
                    </a>
                    )}
                </>
            )}
            <button onClick={() => onDelete(issue.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-400/10 rounded-md" title="Delete">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Metadata Grid - ONLY FOR ISSUES */}
        {!isNote && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm animate-in fade-in">
              <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Status</label>
              <select className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 p-2" value={issue.status} onChange={(e) => handleFieldUpdate('status', e.target.value as IssueStatus)}>
                  <option value="to-do">To do</option>
                  <option value="in-progress">In progress</option>
                  <option value="in-code-review">In code review</option>
                  <option value="in-review">In review</option>
                  <option value="cancel">Cancel</option>
                  <option value="dependency">Dependency</option>
              </select>
              </div>

              <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Assignee</label>
              <AssigneeSelect 
                  value={issue.assignee} 
                  onChange={(val) => handleFieldUpdate('assignee', val)}
                  assignees={assignees}
                  onAddAssignee={onAddAssignee}
              />
              </div>

              <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Reporter</label>
              <input className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" value={issue.reporter} onChange={(e) => handleFieldUpdate('reporter', e.target.value)} placeholder="Jane Smith" />
              </div>

              <div className="flex flex-col gap-1 sm:col-span-2">
              <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider">PR Base URL</label>
              <input className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-xs" value={issue.prBaseUrl} onChange={(e) => handleFieldUpdate('prBaseUrl', e.target.value)} placeholder="https://github.com/repo/pull" />
              </div>

              <div className="flex flex-col gap-1 sm:col-span-2 lg:col-span-1">
              <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Direct Issue Link</label>
              <input className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-xs" value={issue.issueUrl} onChange={(e) => handleFieldUpdate('issueUrl', e.target.value)} placeholder="https://linear.app/issue/..." />
              </div>
          </div>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-slate-50 dark:bg-slate-950">
        <section>
            <MarkdownEditor value={issue.description} onChange={(val) => handleFieldUpdate('description', val)} placeholder="Add a detailed description..." label={isNote ? "Note" : "Description"} />
        </section>

        {!isNote && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in">
            <section>
              <MarkdownEditor value={issue.query} onChange={(val) => handleFieldUpdate('query', val)} placeholder="SELECT * FROM issues..." label="Query / Technical Notes" />
            </section>
            <section>
              <MarkdownEditor value={issue.commandOrCron} onChange={(val) => handleFieldUpdate('commandOrCron', val)} placeholder="0 0 * * * /path/to/script.sh" label="Command / Cron" />
            </section>
          </div>
        )}

        {!isNote && (
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-600 font-mono flex justify-between">
              <span>ID: {issue.id}</span>
              <span>Created: {new Date(issue.createdAt).toLocaleString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}