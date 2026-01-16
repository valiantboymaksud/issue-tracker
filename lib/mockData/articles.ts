import { Article } from '@/lib/types/article';

export const mockArticles: Article[] = [
  {
    id: 1,
    slug: 'react-hooks-complete-guide',
    title: 'Complete Guide to React Hooks in 2024',
    excerpt: 'Learn everything about React Hooks with practical examples and best practices for modern React development.',
    content: `# Complete Guide to React Hooks

React Hooks have revolutionized how we write React components. In this comprehensive guide, we'll explore all the essential hooks and when to use them.

## useState Hook

The useState hook is the most basic hook. It allows you to add state to functional components.

\`\`\`javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
\`\`\`

## useEffect Hook

The useEffect hook lets you perform side effects in functional components...`,
    featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    author: {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      bio: 'Frontend Developer & React Expert with 8+ years of experience'
    },
    tags: ['React', 'JavaScript', 'Hooks', 'Frontend'],
    readingTime: 8,
    likes: 234,
    comments: 45,
    views: 1200,
    createdAt: '2024-10-28'
  },
  {
    id: 2,
    slug: 'nextjs-15-performance-optimization',
    title: 'Next.js 15 Performance Optimization Techniques',
    excerpt: 'Boost your Next.js application performance with these proven optimization techniques and best practices.',
    content: '# Next.js 15 Performance Optimization\n\nPerformance is crucial for modern web applications...',
    featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop',
    author: {
      id: 2,
      name: 'Mike Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      bio: 'Full Stack Developer specializing in Next.js and Node.js'
    },
    tags: ['Next.js', 'Performance', 'React', 'Optimization'],
    readingTime: 12,
    likes: 189,
    comments: 32,
    views: 980,
    createdAt: '2024-10-25'
  },
  {
    id: 3,
    slug: 'typescript-advanced-patterns',
    title: 'Advanced TypeScript Patterns for Better Code',
    excerpt: 'Master advanced TypeScript patterns and techniques to write more maintainable and type-safe code.',
    content: '# Advanced TypeScript Patterns\n\nTypeScript offers powerful features...',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    author: {
      id: 3,
      name: 'Emily Davis',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      bio: 'TypeScript Advocate and Software Architect'
    },
    tags: ['TypeScript', 'JavaScript', 'Patterns', 'Best Practices'],
    readingTime: 15,
    likes: 312,
    comments: 56,
    views: 1450,
    createdAt: '2024-10-22'
  },
  {
    id: 4,
    slug: 'tailwind-css-tips-tricks',
    title: '10 Tailwind CSS Tips Every Developer Should Know',
    excerpt: 'Discover essential Tailwind CSS tips and tricks to speed up your development workflow.',
    content: '# Tailwind CSS Tips & Tricks\n\nTailwind CSS is amazing...',
    featuredImage: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=400&fit=crop',
    author: {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      bio: 'Frontend Developer & React Expert'
    },
    tags: ['Tailwind', 'CSS', 'Frontend', 'Tips'],
    readingTime: 6,
    likes: 156,
    comments: 23,
    views: 890,
    createdAt: '2024-10-20'
  },
];