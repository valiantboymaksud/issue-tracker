"use client";

import { useState, useMemo } from 'react';
import { Plus, StickyNote } from 'lucide-react';
import { Issue } from '@/types/issue';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import IssueList from '@/components/IssueList';
import IssueDetails from '@/components/IssueDetails';
import ThemeToggle from '@/components/ThemeToggle';
import PersonalNotes from '@/components/PersonalNotes'; // Import new component

const STORAGE_KEY_ISSUES = 'daily_tracker_issues_v3';
const STORAGE_KEY_ASSIGNEES = 'daily_tracker_assignees_v1';
const STORAGE_KEY_NOTES = 'daily_tracker_personal_notes_v1'; // Key for notes

export default function Home() {
  const [issues, setIssues] = useLocalStorage<Issue[]>(STORAGE_KEY_ISSUES, []);
  const [assignees, setAssignees] = useLocalStorage<string[]>(STORAGE_KEY_ASSIGNEES, ['Dev Team']);
  const [personalNotes, setPersonalNotes] = useLocalStorage<string>(STORAGE_KEY_NOTES, ""); // New state
  
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNotesOpen, setIsNotesOpen] = useState(false); // Toggle state for modal

  const handleSelect = (id: string) => setSelectedId(id);
  const handleBack = () => setSelectedId(null);

  const handleAddAssignee = (name: string) => {
    if (!assignees.includes(name)) {
      setAssignees([...assignees, name]);
    }
  };

  const filteredIssues = useMemo(() => {
    if (!searchQuery) return issues;
    const lowerQuery = searchQuery.toLowerCase();
    return issues.filter(
      (issue) =>
        issue.title.toLowerCase().includes(lowerQuery) ||
        issue.description.toLowerCase().includes(lowerQuery) ||
        issue.assignee.toLowerCase().includes(lowerQuery) ||
        issue.status.toLowerCase().includes(lowerQuery)
    );
  }, [issues, searchQuery]);

  const createNewIssue = () => {
    const newIssue: Issue = {
      id: crypto.randomUUID(),
      title: '',
      status: 'open',
      assignee: '',
      reporter: '',
      description: '',
      query: '',
      commandOrCron: '',
      prBaseUrl: '',
      issueUrl: '',
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    setIssues([newIssue, ...issues]);
    setSelectedId(newIssue.id);
  };

  const updateIssue = (updatedIssue: Issue) => {
    setIssues(issues.map(issue => issue.id === updatedIssue.id ? updatedIssue : issue));
  };

  const deleteIssue = (id: string) => {
    if (!confirm('Are you sure you want to delete this issue?')) return;
    const remaining = issues.filter(issue => issue.id !== id);
    setIssues(remaining);
    if (selectedId === id) setSelectedId(null);
  };

  const selectedIssue = issues.find(i => i.id === selectedId) || null;

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-20 w-full md:w-80 md:static transition-transform duration-300 ease-in-out
        ${selectedId ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}
        bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full flex-shrink-0 shadow-xl md:shadow-none
      `}>
        
        {/* Header with Notes Trigger */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-10">
          <div className="flex items-center gap-2">
             <h1 className="font-bold text-lg tracking-tight text-slate-800 dark:text-slate-100">Tracker</h1>
             <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-950 px-2 py-1 rounded border border-slate-200 dark:border-slate-800 hidden md:inline-block">
                {issues.length}
            </span>
          </div>
          
          <div className="flex items-center gap-1">
             {/* Personal Notes Button */}
             <button 
                onClick={() => setIsNotesOpen(true)}
                className="p-2 rounded-md text-slate-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                title="Personal Scratchpad"
             >
                <StickyNote className="w-5 h-5" />
             </button>
             
             <ThemeToggle />
          </div>
        </div>
        
        <div className="p-3 bg-slate-50 dark:bg-slate-900/50">
          <button 
            onClick={createNewIssue}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md text-sm font-medium transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> New Issue
          </button>
        </div>

        <div className="flex-1 overflow-hidden relative">
            <IssueList 
              issues={filteredIssues} 
              selectedId={selectedId} 
              onSelect={handleSelect}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className={`
        flex-1 h-full relative flex flex-col min-w-0 bg-white dark:bg-slate-950 transition-all duration-300
        ${selectedId ? 'translate-x-0 opacity-100' : 'translate-x-full md:translate-x-0 opacity-0 md:opacity-100'}
      `}>
        <IssueDetails 
          issue={selectedIssue} 
          onUpdate={updateIssue}
          onDelete={deleteIssue}
          onBack={handleBack}
          assignees={assignees}
          onAddAssignee={handleAddAssignee}
        />
      </main>

      {/* Personal Notes Drawer Overlay */}
      <PersonalNotes 
        isOpen={isNotesOpen} 
        onClose={() => setIsNotesOpen(false)} 
        initialContent={personalNotes}
        onSave={setPersonalNotes}
      />

    </div>
  );
}