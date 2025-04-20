
import { JobListing } from "@/types";

// Mock job data
export const getMockJobs = (): JobListing[] => [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    location: "Dubai, UAE",
    description: "We are looking for a Senior Frontend Developer to join our dynamic team. The ideal candidate will have strong experience with React, TypeScript, and modern frontend frameworks.",
    requirements: [
      "5+ years of experience with React and TypeScript",
      "Experience with state management libraries (Redux, Zustand)",
      "Strong knowledge of modern CSS and design systems",
      "Experience with responsive design and cross-browser compatibility",
      "Familiarity with testing frameworks"
    ],
    url: "https://www.linkedin.com/jobs/view/12345",
    source: "LinkedIn",
    postedDate: "2023-04-18T10:00:00Z",
    matchScore: 92,
    category: "Software Development",
    contacts: [
      {
        name: "Sarah Johnson",
        position: "Engineering Manager",
        company: "TechCorp Solutions",
        profileUrl: "https://linkedin.com/in/sarah-johnson"
      },
      {
        name: "Ahmed Hassan",
        position: "Senior Developer",
        company: "TechCorp Solutions",
        profileUrl: "https://linkedin.com/in/ahmed-hassan"
      }
    ],
    status: "new",
    scraped: true
  },
  {
    id: "2",
    title: "Product Manager - FinTech",
    company: "Financial Innovations Ltd",
    location: "Remote (MENA Region)",
    description: "Financial Innovations is seeking a Product Manager to lead our FinTech solutions. You'll work closely with engineering, design, and business teams to deliver innovative financial products.",
    requirements: [
      "3+ years of product management experience in FinTech",
      "Strong understanding of financial services industry",
      "Experience with Agile methodologies",
      "Excellent communication and stakeholder management"
    ],
    url: "https://www.naukrigulf.com/jobs/12346",
    source: "Naukrigulf",
    postedDate: "2023-04-17T14:30:00Z",
    matchScore: 85,
    category: "Product Management",
    contacts: [
      {
        name: "Michael Roberts",
        position: "Head of Product",
        company: "Financial Innovations Ltd",
        profileUrl: "https://linkedin.com/in/michael-roberts"
      }
    ],
    status: "new",
    scraped: true
  },
  {
    id: "3",
    title: "Data Scientist",
    company: "Analytics Pro",
    location: "Abu Dhabi, UAE",
    description: "Join our data science team to develop advanced analytics solutions for enterprise clients. You'll work on machine learning models and big data processing.",
    requirements: [
      "MS or PhD in Computer Science, Statistics, or related field",
      "Experience with Python, R, and data processing libraries",
      "Knowledge of machine learning algorithms and statistical modeling",
      "Experience with big data technologies (Hadoop, Spark)"
    ],
    url: "https://www.linkedin.com/jobs/view/12347",
    source: "LinkedIn",
    postedDate: "2023-04-16T09:15:00Z",
    matchScore: 78,
    category: "Data Science",
    contacts: [],
    status: "new",
    scraped: true
  },
  {
    id: "4",
    title: "UX/UI Designer",
    company: "Creative Digital Agency",
    location: "Dubai, UAE",
    description: "We're looking for a talented UX/UI Designer to create visually appealing and user-friendly digital experiences for our clients in various industries.",
    requirements: [
      "Portfolio showcasing web and mobile app designs",
      "Proficiency with design tools (Figma, Adobe XD)",
      "Experience with user research and usability testing",
      "Understanding of design systems and component libraries"
    ],
    url: "https://www.linkedin.com/jobs/view/12348",
    source: "LinkedIn",
    postedDate: "2023-04-15T11:45:00Z",
    matchScore: 82,
    category: "UX/UI Design",
    contacts: [
      {
        name: "Jessica Chen",
        position: "Design Director",
        company: "Creative Digital Agency",
        profileUrl: "https://linkedin.com/in/jessica-chen"
      }
    ],
    status: "new",
    scraped: true
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: "Cloud Solutions Inc",
    location: "Remote",
    description: "Join our DevOps team to build and maintain cloud infrastructure, implement CI/CD pipelines, and ensure system reliability for our enterprise clients.",
    requirements: [
      "Experience with AWS, Azure, or GCP",
      "Knowledge of containerization (Docker, Kubernetes)",
      "Experience with Infrastructure as Code (Terraform, CloudFormation)",
      "Understanding of CI/CD principles and tools"
    ],
    url: "https://www.naukrigulf.com/jobs/12349",
    source: "Naukrigulf",
    postedDate: "2023-04-14T15:20:00Z",
    matchScore: 75,
    category: "Software Development",
    contacts: [],
    status: "viewed",
    scraped: true
  },
  {
    id: "6",
    title: "Digital Marketing Manager",
    company: "EcomGrowth",
    location: "Riyadh, Saudi Arabia",
    description: "EcomGrowth is seeking a Digital Marketing Manager to lead our marketing strategies and drive customer acquisition across digital channels.",
    requirements: [
      "5+ years of digital marketing experience",
      "Experience with SEO, SEM, and social media marketing",
      "Strong analytical skills and experience with marketing analytics tools",
      "Understanding of conversion optimization and funnel management"
    ],
    url: "https://www.linkedin.com/jobs/view/12350",
    source: "LinkedIn",
    postedDate: "2023-04-13T08:15:00Z",
    matchScore: 70,
    category: "Marketing",
    contacts: [
      {
        name: "Omar Al-Jabri",
        position: "Head of Growth",
        company: "EcomGrowth",
        profileUrl: "https://linkedin.com/in/omar-aljabri"
      }
    ],
    status: "viewed",
    scraped: true
  },
  {
    id: "7",
    title: "Mobile App Developer (React Native)",
    company: "TechMobile Solutions",
    location: "Dubai, UAE",
    description: "We're looking for a React Native developer to build cross-platform mobile applications for our clients in various industries.",
    requirements: [
      "3+ years of experience with React Native",
      "Experience with state management in React Native apps",
      "Knowledge of native modules integration",
      "Experience with app deployment to App Store and Google Play"
    ],
    url: "https://www.naukrigulf.com/jobs/12351",
    source: "Naukrigulf",
    postedDate: "2023-04-12T14:30:00Z",
    matchScore: 88,
    category: "Software Development",
    contacts: [],
    status: "applied",
    scraped: true
  },
  {
    id: "8",
    title: "Data Analyst",
    company: "DataInsights LLC",
    location: "Remote",
    description: "Join our team as a Data Analyst to help extract, analyze, and visualize data to drive business decisions for our clients.",
    requirements: [
      "Experience with SQL and data querying",
      "Proficiency with data visualization tools (Tableau, Power BI)",
      "Strong Excel skills",
      "Experience with statistical analysis"
    ],
    url: "https://www.linkedin.com/jobs/view/12352",
    source: "LinkedIn",
    postedDate: "2023-04-11T09:45:00Z",
    matchScore: 80,
    category: "Data Science",
    contacts: [
      {
        name: "Priya Sharma",
        position: "Analytics Lead",
        company: "DataInsights LLC",
        profileUrl: "https://linkedin.com/in/priya-sharma"
      }
    ],
    status: "interview",
    scraped: true
  },
  {
    id: "9",
    title: "Product Designer",
    company: "InnovateTech",
    location: "Abu Dhabi, UAE",
    description: "InnovateTech is looking for a Product Designer to create intuitive and beautiful digital products that solve real user problems.",
    requirements: [
      "Portfolio showcasing end-to-end product design work",
      "Experience with design systems and component libraries",
      "User research and testing experience",
      "Understanding of accessibility standards"
    ],
    url: "https://www.naukrigulf.com/jobs/12353",
    source: "Naukrigulf",
    postedDate: "2023-04-10T11:20:00Z",
    matchScore: 85,
    category: "UX/UI Design",
    contacts: [],
    status: "new",
    scraped: true
  },
  {
    id: "10",
    title: "Technical Product Manager",
    company: "SaaS Platform Inc",
    location: "Remote",
    description: "Join our product team to lead the development of our SaaS platform, working closely with engineering, design, and business stakeholders.",
    requirements: [
      "3+ years of product management experience for technical products",
      "Strong understanding of software development lifecycle",
      "Experience with Agile methodologies",
      "Technical background or understanding of software engineering principles"
    ],
    url: "https://www.linkedin.com/jobs/view/12354",
    source: "LinkedIn",
    postedDate: "2023-04-09T10:15:00Z",
    matchScore: 90,
    category: "Product Management",
    contacts: [
      {
        name: "David Miller",
        position: "VP of Product",
        company: "SaaS Platform Inc",
        profileUrl: "https://linkedin.com/in/david-miller"
      },
      {
        name: "Sophia Wang",
        position: "Senior Product Manager",
        company: "SaaS Platform Inc",
        profileUrl: "https://linkedin.com/in/sophia-wang"
      }
    ],
    status: "offer",
    scraped: true
  }
];
