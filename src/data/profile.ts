
import { UserProfile } from "@/types";

// Vishnu's profile data for use across the app
export const vishnuProfile: UserProfile = {
  name: "Vishnu Madhusudhan",
  email: "vishnu.madhusudhan@example.com",
  skills: [
    "Project Scheduling", 
    "Stakeholder Engagement", 
    "Team Leadership", 
    "ESG Operations", 
    "Process Improvement", 
    "Client Support", 
    "Power BI (Beginner)", 
    "Jira", 
    "Advanced Excel", 
    "MS Projects", 
    "Qualtrics", 
    "Microsoft Office", 
    "Carbon Accounting"
  ],
  experience: [
    {
      title: "Project Coordinator",
      company: "Greenwich Students' Union",
      location: "London, UK",
      startDate: "2022-06",
      endDate: "2023-05",
      description: "Led student retention projects with a budget of £450k. Coordinated with multiple stakeholders to improve student experience and retention rates.",
      skills: ["Project Scheduling", "Stakeholder Engagement", "Team Leadership"]
    },
    {
      title: "Student Ambassador",
      company: "University of Greenwich",
      location: "London, UK",
      startDate: "2022-01",
      endDate: "2022-06",
      description: "Provided mentoring and conducted outreach activities to prospective students. Represented the university at various events.",
      skills: ["Client Support", "Stakeholder Engagement"]
    },
    {
      title: "Trainee",
      company: "Financial Crime & Banking Ops - Deloitte UK Academy",
      location: "London, UK",
      startDate: "2021-08",
      endDate: "2021-12",
      description: "Trained in financial crime prevention and banking operations. Gained understanding of compliance and regulatory requirements.",
      skills: ["Process Improvement", "Advanced Excel"]
    },
    {
      title: "Process Engineer",
      company: "Bio Petro Clean",
      location: "India",
      startDate: "2020-05",
      endDate: "2021-06",
      description: "Focused on ESG-oriented process coordination. Implemented efficiency improvements and environmental compliance measures.",
      skills: ["ESG Operations", "Process Improvement", "Carbon Accounting"]
    }
  ],
  education: [
    {
      degree: "MSc Engineering Management",
      institution: "University of Greenwich",
      location: "London, UK",
      graduationDate: "2022-06",
      description: "Specialized in project management methodologies and engineering business principles."
    },
    {
      degree: "BEng Chemical Engineering",
      institution: "Mahatma Gandhi University",
      location: "Kerala, India",
      graduationDate: "2019-05",
      description: "Focused on process engineering and sustainable design concepts."
    }
  ],
  jobPreferences: {
    roles: [
      "Project Manager", 
      "Project Coordinator", 
      "ESG Consultant", 
      "Sustainability Specialist", 
      "Operations Analyst", 
      "Client Success Manager", 
      "Process Improvement Specialist"
    ],
    locations: ["UAE", "UK", "EU", "India", "Remote"],
    remotePreference: "remote",
    minSalary: 60000
  },
  resumeUrl: "https://example.com/vishnu-resume.pdf",
  linkedInProfile: "https://linkedin.com/in/vishnu-madhusudhan"
};
