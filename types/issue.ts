export type EntryType = 'issue' | 'note';

export type IssueStatus = 'to-do' | 'in-progress' | 'in-code-review' | 'in-review' | 'cancel' | 'dependency';

export interface Issue {
  id: string;
  type: EntryType; // NEW: 'issue' or 'note'
  title: string;
  status: IssueStatus;
  assignee: string;
  reporter: string;
  description: string;
  query: string;
  commandOrCron: string;
  prBaseUrl: string;
  issueUrl: string;
  createdAt: number;
  updatedAt: number;
}