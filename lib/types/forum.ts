export interface Question {
  id: number;
  slug: string;
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
    avatar: string;
    reputation: number;
  };
  tags: string[];
  votes: number;
  answers: number;
  views: number;
  hasAcceptedAnswer: boolean;
  createdAt: string;
}

export interface Answer {
  id: number;
  content: string;
  author: {
    name: string;
    avatar: string;
    reputation: number;
  };
  votes: number;
  isAccepted: boolean;
  createdAt: string;
}