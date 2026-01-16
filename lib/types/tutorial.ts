export interface Tutorial {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  price: number;
  isPaid: boolean;
  rating: number;
  students: number;
  lessons: number;
  duration: string;
  instructor: {
    name: string;
    avatar: string;
  };
}