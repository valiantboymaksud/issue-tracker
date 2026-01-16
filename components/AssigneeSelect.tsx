"use client";

import { useState } from 'react';
import { UserPlus, X } from 'lucide-react';

interface AssigneeSelectProps {
  value: string;
  onChange: (value: string) => void;
  assignees: string[];
  onAddAssignee: (name: string) => void;
}

export default function AssigneeSelect({ value, onChange, assignees, onAddAssignee }: AssigneeSelectProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "__ADD_NEW__") {
      setIsAdding(true);
      setNewName("");
    } else {
      onChange(val);
      setIsAdding(false);
    }
  };

  const handleAddNew = () => {
    if (newName.trim()) {
      onAddAssignee(newName.trim());
      onChange(newName.trim());
      setIsAdding(false);
      setNewName("");
    }
  };

  const handleClear = () => {
    onChange("");
  };

  if (isAdding) {
    return (
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 p-2"
          placeholder="Enter name..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddNew()}
          autoFocus
        />
        <button
          onClick={handleAddNew}
          className="px-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
        >
          Save
        </button>
        <button
          onClick={() => setIsAdding(false)}
          className="px-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-300 text-sm"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex gap-2">
        <select
          className="flex-1 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 p-2 appearance-none cursor-pointer"
          value={value}
          onChange={handleSelectChange}
        >
          <option value="">Unassigned</option>
          {assignees.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
          <option value="__ADD_NEW__" className="font-semibold text-blue-600 dark:text-blue-400">+ Add New Assignee...</option>
        </select>
        
        {value && (
            <button 
                onClick={handleClear}
                className="px-2 text-slate-400 hover:text-red-500 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-950"
                title="Clear Assignee"
            >
                <X className="w-4 h-4" />
            </button>
        )}
      </div>
    </div>
  );
}