"use client";

import { Issue, IssueStatus } from '@/types/issue';
import { User, CheckCircle, Search, AlertCircle, Clock } from 'lucide-react';

const STATUS_STYLES: Record<IssueStatus, { dark: string; light: string }> = {
  'open': { 
    dark: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    light: 'bg-blue-100 text-blue-700 border-blue-200' 
  },
  'in-progress': { 
    dark: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    light: 'bg-yellow-100 text-yellow-700 border-yellow-200' 
  },
  'blocked': { 
    dark: 'bg-red-500/10 text-red-400 border-red-500/20',
    light: 'bg-red-100 text-red-700 border-red-200' 
  },
  'done': { 
    dark: 'bg-green-500/10 text-green-400 border-green-500/20',
    light: 'bg-green-100 text-green-700 border-green-200' 
  },
};

// Simple formatter: "2d ago" or "Jan 1"
const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
};

interface IssueListProps {
  issues: Issue[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function IssueList({ issues, selectedId, onSelect, searchQuery, onSearchChange }: IssueListProps) {
  
  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 w-full">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-10 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search issues..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-950 border-none rounded-lg text-sm text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {issues.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-500 dark:text-slate-500 p-6 text-center">
            <AlertCircle className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-sm font-medium">No issues found.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-800/50">
            {issues.map((issue) => {
              const styles = STATUS_STYLES[issue.status] || STATUS_STYLES['open'];
              return (
                <div
                  key={issue.id}
                  onClick={() => onSelect(issue.id)}
                  className={`
                    group flex flex-col p-4 cursor-pointer transition-all duration-200 border-l-4
                    ${selectedId === issue.id 
                      ? 'bg-blue-50 dark:bg-slate-800 border-blue-500' 
                      : 'bg-white dark:bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-slate-900/50'
                    }
                  `}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${styles.dark} dark:${styles.dark.split(' ').map(c => c.startsWith('bg') ? c : `dark:${c}`).join(' ')} ${styles.light}`}>
                      {issue.status.replace('-', ' ')}
                    </span>
                    {selectedId === issue.id && <CheckCircle className="w-4 h-4 text-blue-500" />}
                  </div>
                  
                  <h3 className="font-medium text-slate-800 dark:text-slate-200 text-sm line-clamp-2 leading-relaxed mb-2">
                    {issue.title || 'Untitled Issue'}
                  </h3>
                  
                  <div className="flex items-center justify-between mt-auto gap-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500 overflow-hidden">
                      <User className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{issue.assignee || 'Unassigned'}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-600 font-mono" title={`Updated: ${new Date(issue.updatedAt).toLocaleString()}`}>
                        <Clock className="w-3 h-3" />
                        <span>{formatTime(issue.updatedAt)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}