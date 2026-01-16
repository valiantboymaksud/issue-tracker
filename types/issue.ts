export type IssueStatus = 'open' | 'in-progress' | 'blocked' | 'done';

export interface Issue {
  id: string;
  title: string;
  status: IssueStatus;
  assignee: string; // Now selected from a list
  reporter: string;
  description: string;
  query: string;
  commandOrCron: string;
  prBaseUrl: string;
  issueUrl: string; // New field for direct issue link
  createdAt: number;
  updatedAt: number;
}