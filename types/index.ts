export interface Project {
  id: string;
  title: string;
  description: string;
  fullDetails: string;
  tech: string[];
  image: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  details: string[];
}

export interface Skill {
  category: string;
  icon: string;
  technologies: string[];
}