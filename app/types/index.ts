export interface Project {
  title: string;
  description: string;
  tags: string[];
  icon: string;
  image?: string;
  actions: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
}

export interface SkillGroup {
  title: string;
  tags: string[];
  icon?: string;
  proficiency?: number;
}

export interface TimelineEntry {
  title: string;
  organization: string;
  period: string;
  description: string;
  icon?: string;
  tags?: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface NavLink {
  href: string;
  label: string;
}
