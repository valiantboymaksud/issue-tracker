export type EntryType = 'issue' | 'note';

export type IssueStatus = 'to-do' | 'in-progress' | 'in-code-review' | 'in-review' | 'cancel' | 'dependency';

export interface Issue {
  id: string;
  type: EntryType;
  title: string;
  status: IssueStatus;
  assignee: string;
  reporter: string;
  description: string;
  query: string;
  commandOrCron: string;
  prBaseUrl: string;
  issueUrl: string;
  isPinned: boolean;
  order: number; // NEW: For Drag and Drop ordering
  createdAt: number;
  updatedAt: number;
}