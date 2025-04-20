
export interface UserProfile {
  name: string;
  email: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  jobPreferences: JobPreferences;
  resumeUrl: string;
  linkedInProfile: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  description: string;
}

export interface JobPreferences {
  roles: string[];
  locations: string[];
  remotePreference: 'remote' | 'hybrid' | 'onsite' | 'any';
  minSalary: number;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  url: string;
  source: 'LinkedIn' | 'Naukrigulf';
  postedDate: string;
  matchScore: number;
  category: string;
  contacts: Contact[];
  status: ApplicationStatus;
  scraped: boolean;
}

export interface Contact {
  name: string;
  position: string;
  company: string;
  profileUrl: string;
}

export type ApplicationStatus = 
  | 'new' 
  | 'viewed' 
  | 'applied' 
  | 'rejected' 
  | 'interview' 
  | 'offer' 
  | 'accepted';

export interface GoogleIntegration {
  docsTemplateId: string;
  sheetsId: string;
  email: string;
  accessToken: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
  color: string;
}

export interface DashboardStats {
  totalJobs: number;
  newJobs: number;
  appliedJobs: number;
  interviews: number;
  offers: number;
  jobsBySource: {
    LinkedIn: number;
    Naukrigulf: number;
  };
  jobsByCategory: {
    [key: string]: number;
  };
}
