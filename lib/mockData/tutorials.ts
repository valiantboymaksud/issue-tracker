import { Tutorial } from '@/lib/types/tutorial';

export const mockTutorials: Tutorial[] = [
  {
    id: 1,
    slug: 'full-stack-ecommerce',
    title: 'Build a Full Stack E-commerce App',
    description: 'Learn to build a complete e-commerce platform with Next.js, Node.js, and PostgreSQL',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=400&fit=crop',
    price: 49.99,
    isPaid: true,
    rating: 4.8,
    students: 1234,
    lessons: 45,
    duration: '12 hours',
    instructor: {
      name: 'John Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    }
  },
  {
    id: 2,
    slug: 'react-zero-to-hero',
    title: 'React from Zero to Hero',
    description: 'Master React with hands-on projects and real-world examples. Perfect for beginners!',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
    price: 0,
    isPaid: false,
    rating: 4.9,
    students: 5678,
    lessons: 32,
    duration: '8 hours',
    instructor: {
      name: 'Sarah Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    }
  },
  {
    id: 3,
    slug: 'nodejs-api-development',
    title: 'Node.js API Development Masterclass',
    description: 'Build scalable REST APIs with Node.js, Express, and MongoDB',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop',
    price: 39.99,
    isPaid: true,
    rating: 4.7,
    students: 892,
    lessons: 38,
    duration: '10 hours',
    instructor: {
      name: 'Mike Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike'
    }
  },
];