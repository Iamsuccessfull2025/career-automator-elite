
import { UserProfile } from "@/types";

// Vishnu's profile data for use across the app
export const vishnuProfile: UserProfile = {
  name: "Vishnu Madhusudhan",
  email: "vishnu.madhusudhan@example.com",
  skills: [
    "Project Coordination", 
    "Stakeholder Engagement", 
    "ESG", 
    "Compliance", 
    "Student Success", 
    "Banking Operations", 
    "Engineering", 
    "Process Design", 
    "Client Support", 
    "Data Analysis", 
    "Risk Tracking", 
    "Jira", 
    "Power BI", 
    "Excel", 
    "Qualtrics", 
    "Microsoft Projects"
  ],
  experience: [
    {
      title: "Project Coordinator",
      company: "Global Sustainability Initiative",
      location: "Remote, India",
      startDate: "2023-01",
      endDate: null,
      description: "Coordinated ESG compliance projects, tracked risks, and engaged with stakeholders using Jira and Power BI for reporting.",
      skills: ["Project Coordination", "ESG", "Risk Tracking", "Jira", "Power BI"]
    },
    {
      title: "Operations Analyst",
      company: "National Banking Corporation",
      location: "Mumbai, India",
      startDate: "2021-06",
      endDate: "2022-12",
      description: "Supported banking operations and client success initiatives. Analyzed operational data to improve processes and customer satisfaction.",
      skills: ["Banking Operations", "Client Support", "Data Analysis", "Excel"]
    },
    {
      title: "Process Design Engineer",
      company: "Engineering Solutions Ltd",
      location: "Kerala, India",
      startDate: "2019-03",
      endDate: "2021-05",
      description: "Designed chemical engineering processes and supported client projects. Implemented process improvements and documentation.",
      skills: ["Engineering", "Process Design", "Client Support"]
    }
  ],
  education: [
    {
      degree: "MSc Engineering Management",
      institution: "University of Greenwich",
      location: "London, UK",
      graduationDate: "2018-12",
      description: "Focus on project management and engineering business principles."
    },
    {
      degree: "BEng Chemical Engineering",
      institution: "Mahatma Gandhi University",
      location: "Kerala, India",
      graduationDate: "2016-05",
      description: "Specialized in process engineering and design fundamentals."
    }
  ],
  jobPreferences: {
    roles: ["Project Manager", "ESG Consultant", "Operations Analyst", "Process Engineer", "Sustainability Specialist"],
    locations: ["India", "Remote", "Dubai", "UK", "Singapore"],
    remotePreference: "remote",
    minSalary: 75000
  },
  resumeUrl: "https://example.com/vishnu-resume.pdf",
  linkedInProfile: "https://linkedin.com/in/vishnu-madhusudhan"
};
