export interface Experience {
  id: string;
  company: string;
  location: string;
  role: string;
  period: string;
  bullets: string[];
}

export interface Project {
  title: string;
  date: string;
  description: string[];
  tags: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Certification {
  name: string;
}
