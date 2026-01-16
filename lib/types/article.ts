export interface Article {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  author: {
    id: number;
    name: string;
    avatar: string;
    bio: string;
  };
  tags: string[];
  readingTime: number;
  likes: number;
  comments: number;
  views: number;
  createdAt: string;
}