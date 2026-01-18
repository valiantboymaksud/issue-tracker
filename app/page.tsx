"use client";

import { useState, useMemo } from 'react';
import { Plus, StickyNote, Loader2 } from 'lucide-react';
import { User } from 'firebase/auth'; // Import User type
import { Issue } from '@/types/issue';
import { useDataStore } from '@/hooks/useDataStore'; // New Smart Hook
import IssueList from '@/components/IssueList';
import IssueDetails from '@/components/IssueDetails';
import ThemeToggle from '@/components/ThemeToggle';
import PersonalNotes from '@/components/PersonalNotes';
import AuthButton from '@/components/AuthButton'; // New Auth UI

export default function Home() {
  // User State to drive Cloud vs Local logic
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // --- DATA HOOKS (Switch automatically based on currentUser) ---
  
  const [issues, setIssues, loadingIssues] = useDataStore<Issue[]>(
    'issues', 
    'all', 
    currentUser, 
    'daily_tracker_issues_v3', 
    []
  );

  const [assignees, setAssignees, loadingAssignees] = useDataStore<string[]>(
    'settings', 
    'assignees', 
    currentUser, 
    'daily_tracker_assignees_v1', 
    ['John Doe', 'Jane Smith', 'Dev Team']
  );

  const [personalNotes, setPersonalNotes, loadingNotes] = useDataStore<string>(
    'settings', 
    'notes', 
    currentUser, 
    'daily_tracker_personal_notes_v1', 
    ""
  );

  // --- APP STATE ---

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNotesOpen, setIsNotesOpen] = useState(false);

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

  // Global Loading State (Cloud fetching)
  const isDataLoading = loadingIssues || loadingAssignees || loadingNotes;

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-20 w-full md:w-80 md:static transition-transform duration-300 ease-in-out
        ${selectedId ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}
        bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full flex-shrink-0 shadow-xl md:shadow-none
      `}>
        
        {/* Header with Auth & Notes */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-10">
          <div className="flex items-center gap-2">
             <h1 className="font-bold text-lg tracking-tight text-slate-800 dark:text-slate-100">Tracker</h1>
             <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-950 px-2 py-1 rounded border border-slate-200 dark:border-slate-800 hidden md:inline-block">
                {issues.length}
            </span>
          </div>
          
          <div className="flex items-center gap-1">
             <AuthButton onUserChange={setCurrentUser} /> {/* New Auth Component */}
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
        
        {/* Cloud Status Indicator */}
        {/* {currentUser && (
            <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-900/50 text-[10px] text-blue-600 dark:text-blue-300 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                Syncing with Cloud
            </div>
        )} */}

        <div className="p-3 bg-slate-50 dark:bg-slate-900/50">
          <button 
            onClick={createNewIssue}
            disabled={isDataLoading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2.5 rounded-md text-sm font-medium transition-colors shadow-sm"
          >
            {isDataLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} 
            New Issue
          </button>
        </div>

        <div className="flex-1 overflow-hidden relative">
            {isDataLoading ? (
                <div className="flex items-center justify-center h-full text-slate-400 text-sm gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Loading Data...
                </div>
            ) : (
                <IssueList 
                issues={filteredIssues} 
                selectedId={selectedId} 
                onSelect={handleSelect}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                />
            )}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className={`
        flex-1 h-full relative flex flex-col min-w-0 bg-white dark:bg-slate-950 transition-all duration-300
        ${selectedId ? 'translate-x-0 opacity-100' : 'translate-x-full md:translate-x-0 opacity-0 md:opacity-100'}
      `}>
        {isDataLoading ? (
             <div className="flex flex-col items-center justify-center h-full text-slate-500">
                <Loader2 className="w-8 h-8 animate-spin mb-4" />
                <p>Syncing data...</p>
            </div>
        ) : (
            <IssueDetails 
            issue={selectedIssue} 
            onUpdate={updateIssue}
            onDelete={deleteIssue}
            onBack={handleBack}
            assignees={assignees}
            onAddAssignee={handleAddAssignee}
            />
        )}
      </main>

      {/* Personal Notes Drawer */}
      <PersonalNotes 
        isOpen={isNotesOpen} 
        onClose={() => setIsNotesOpen(false)} 
        initialContent={personalNotes}
        onSave={setPersonalNotes}
      />
    </div>
  );
}