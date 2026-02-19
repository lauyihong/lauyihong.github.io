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
  content?: string;
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
  collaborators?: string[];
  affiliation?: string;
  links?: { label: string; url: string }[];
  image?: string;
  details?: ProjectDetails;
}

export interface IndustryExperience {
  id: string;
  date: string;
  role: string;
  company: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}
