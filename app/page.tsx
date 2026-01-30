"use client";

import { useState, useMemo } from 'react';
import { Plus, StickyNote, Loader2, FileText, LayoutList } from 'lucide-react';
import { User } from 'firebase/auth';
import { Issue, EntryType } from '@/types/issue';
import { useDataStore } from '@/hooks/useDataStore';
import IssueList from '@/components/IssueList';
import IssueDetails from '@/components/IssueDetails';
import ThemeToggle from '@/components/ThemeToggle';
import PersonalNotes from '@/components/PersonalNotes';
import AuthButton from '@/components/AuthButton';
import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable'; // FIXED: Added missing import

export default function Home() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [issues, setIssues, loadingIssues] = useDataStore<Issue[]>(
    'issues', 'all', currentUser, 'daily_tracker_issues_v3', []
  );
  const [assignees, setAssignees, loadingAssignees] = useDataStore<string[]>(
    'settings', 'assignees', currentUser, 'daily_tracker_assignees_v1', ['John Doe', 'Jane Smith', 'Dev Team']
  );
  const [personalNotes, setPersonalNotes, loadingNotes] = useDataStore<string>(
    'settings', 'notes', currentUser, 'daily_tracker_personal_notes_v1', ""
  );

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<'all' | 'issue' | 'note'>('all');

  const handleSelect = (id: string) => setSelectedId(id);
  const handleBack = () => setSelectedId(null);

  const handleAddAssignee = (name: string) => {
    if (!assignees.includes(name)) {
      setAssignees([...assignees, name]);
    }
  };

  const handleTogglePin = (id: string) => {
    const target = issues.find(i => i.id === id);
    if (target) {
      updateIssue({ ...target, isPinned: !target.isPinned, updatedAt: Date.now() });
    }
  };

  // DRAG AND DROP HANDLER
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // SAFETY CHECK: Disable Drag/Drop while filtering or searching
    // This prevents logic errors where you move one item and lose the hidden ones
    if (searchQuery || currentTab !== 'all') {
      return;
    }

    const oldIndex = issues.findIndex((item) => item.id === active.id);
    const newIndex = issues.findIndex((item) => item.id === over.id);

    if (oldIndex === undefined || newIndex === undefined) return;

    // Reorder the main list
    const reorderedList = arrayMove(issues, oldIndex, newIndex);

    // Update orders sequentially (0, 1, 2...)
    const updatedIssues = reorderedList.map((issue, index) => ({
        ...issue,
        order: index
    }));

    setIssues(updatedIssues);
  };

  const filteredIssues = useMemo(() => {
    let result = issues;
    
    // 1. Filter by Tab
    if (currentTab !== 'all') {
      result = result.filter(issue => issue.type === currentTab);
    }

    // 2. Filter by Search
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (issue) =>
          issue.title.toLowerCase().includes(lowerQuery) ||
          issue.description.toLowerCase().includes(lowerQuery) ||
          issue.assignee.toLowerCase().includes(lowerQuery) ||
          issue.status.toLowerCase().includes(lowerQuery)
      );
    }

    // 3. Sort: Pinned > Manual Order > Updated Time
    return result.sort((a, b) => {
        // Pinned items first
        if (a.isPinned !== b.isPinned) {
            return (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0);
        }
        // Respect manual order
        if (a.order !== undefined && b.order !== undefined) {
            return a.order - b.order;
        }
        // Fallback to date
        return b.updatedAt - a.updatedAt;
    });

  }, [issues, currentTab, searchQuery]);

  const createNewItem = (type: EntryType) => {
    // Calculate next order number (max existing + 1)
    const maxOrder = issues.reduce((max, issue) => Math.max(max, issue.order || 0), 0);

    const newIssue: Issue = {
      id: crypto.randomUUID(),
      type: type,
      title: '',
      status: 'to-do',
      assignee: '',
      reporter: '',
      description: '',
      query: '',
      commandOrCron: '',
      prBaseUrl: '',
      issueUrl: '',
      isPinned: false,
      order: maxOrder + 1, // Initialize order
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
    if (!confirm('Are you sure you want to delete this item?')) return;
    const remaining = issues.filter(issue => issue.id !== id);
    setIssues(remaining);
    if (selectedId === id) setSelectedId(null);
  };

  const selectedIssue = issues.find(i => i.id === selectedId) || null;
  const isDataLoading = loadingIssues || loadingAssignees || loadingNotes;

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-20 w-full md:w-80 md:static transition-transform duration-300 ease-in-out
        ${selectedId ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}
        bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full flex-shrink-0 shadow-xl md:shadow-none
      `}>
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-10">
          <div className="flex items-center gap-2">
             <h1 className="font-bold text-lg tracking-tight text-slate-800 dark:text-slate-100">Tracker</h1>
             <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-950 px-2 py-1 rounded border border-slate-200 dark:border-slate-800 hidden md:inline-block">
                {issues.length}
            </span>
          </div>
          
          <div className="flex items-center gap-1">
             <AuthButton onUserChange={setCurrentUser} />
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
        
        {/* Cloud Status */}
        {currentUser && (
            <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-900/50 text-[10px] text-blue-600 dark:text-blue-300 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                Syncing with Cloud
            </div>
        )}

        {/* TABS */}
        <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
            <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                {(['all', 'issue', 'note'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setCurrentTab(tab)}
                        className={`
                            flex-1 py-1.5 text-xs font-semibold rounded-md transition-all capitalize
                            ${currentTab === tab 
                                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                                : 'text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }
                        `}
                    >
                        {tab === 'issue' ? 'Issues' : tab}
                    </button>
                ))}
            </div>
        </div>
        
        {/* SMART CREATE BUTTONS */}
        <div className="px-4 pb-3 bg-slate-50 dark:bg-slate-900/50 flex gap-2">
            {currentTab === 'all' ? (
                <>
                    <button 
                        onClick={() => createNewItem('issue')}
                        disabled={isDataLoading}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
                    >
                        {isDataLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LayoutList className="w-4 h-4" />} 
                        Issue
                    </button>
                    <button 
                        onClick={() => createNewItem('note')}
                        disabled={isDataLoading}
                        className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                        {isDataLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />} 
                        Note
                    </button>
                </>
            ) : currentTab === 'issue' ? (
                <button 
                    onClick={() => createNewItem('issue')}
                    disabled={isDataLoading}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
                >
                    {isDataLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} 
                    New Issue
                </button>
            ) : (
                <button 
                    onClick={() => createNewItem('note')}
                    disabled={isDataLoading}
                    className="w-full flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 py-2 rounded-md text-sm font-medium transition-colors"
                >
                    {isDataLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} 
                    New Note
                </button>
            )}
        </div>

        {/* SEARCH & LIST */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-slate-900">
          
            <div className="flex-1 overflow-y-auto custom-scrollbar">
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
                    onTogglePin={handleTogglePin}
                    onDragEnd={handleDragEnd} 
                    />
                )}
            </div>
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

      <PersonalNotes 
        isOpen={isNotesOpen} 
        onClose={() => setIsNotesOpen(false)} 
        initialContent={personalNotes}
        onSave={setPersonalNotes}
      />
    </div>
  );
}