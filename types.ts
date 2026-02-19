export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  link?: string;
  thumbnail?: string;
  abstract: string;
}

export interface BlogPost {
  id: string;
  date: string;
  title: string;
  preview: string;
  readTime: string;
}

export interface ProjectDetails {
  subtitle: string;
  challenge: string;
  solution: string;
  results: string;
  additionalImages: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string; // Optional image for mixed layouts
  details?: ProjectDetails; // Optional rich content for inner pages
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}