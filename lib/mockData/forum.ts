import { Question, Answer } from '@/lib/types/forum';

export const mockQuestions: Question[] = [
  {
    id: 1,
    slug: 'how-to-handle-authentication-nextjs-15',
    title: 'How to handle authentication in Next.js 15?',
    content: 'I need to implement JWT authentication in my Next.js 15 app. What is the best approach? Should I use NextAuth.js or implement a custom solution?',
    author: {
      id: 1,
      name: 'John Doe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      reputation: 350
    },
    tags: ['Next.js', 'Authentication', 'JWT', 'Security'],
    votes: 23,
    answers: 5,
    views: 456,
    hasAcceptedAnswer: true,
    createdAt: '2024-10-30'
  },
  {
    id: 2,
    slug: 'react-state-management-best-practices',
    title: 'Best practices for React state management in 2024?',
    content: 'I\'m starting a new large-scale React project. Should I use Redux, Zustand, Context API, or something else? What are the pros and cons of each?',
    author: {
      id: 2,
      name: 'Jane Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      reputation: 780
    },
    tags: ['React', 'State Management', 'Redux', 'Zustand'],
    votes: 45,
    answers: 12,
    views: 890,
    hasAcceptedAnswer: false,
    createdAt: '2024-10-29'
  },
  {
    id: 3,
    slug: 'typescript-generic-types-explained',
    title: 'Can someone explain TypeScript generic types with examples?',
    content: 'I\'m struggling to understand how generic types work in TypeScript. Can someone provide practical examples?',
    author: {
      id: 3,
      name: 'Alex Martinez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      reputation: 520
    },
    tags: ['TypeScript', 'Generics', 'Types'],
    votes: 18,
    answers: 7,
    views: 342,
    hasAcceptedAnswer: true,
    createdAt: '2024-10-28'
  },
];

export const mockAnswers: Answer[] = [
  {
    id: 1,
    content: `You can use NextAuth.js for authentication in Next.js 15. Here's a simple setup:

\`\`\`typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Add your authentication logic here
        const user = await verifyCredentials(credentials)
        if (user) {
          return user
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
\`\`\`

This approach works well and is well-documented!`,
    author: {
      name: 'Sarah Developer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      reputation: 1250
    },
    votes: 35,
    isAccepted: true,
    createdAt: '2024-10-30'
  },
  {
    id: 2,
    content: 'Another option is to use middleware with JWT tokens. Here\'s how...',
    author: {
      name: 'Mike Coder',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      reputation: 890
    },
    votes: 12,
    isAccepted: false,
    createdAt: '2024-10-30'
  },
];