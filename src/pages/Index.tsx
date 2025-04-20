
import { useState } from "react";
import Layout from "@/components/Layout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { JobsBySourceChart } from "@/components/dashboard/JobsBySourceChart";
import { JobCard } from "@/components/jobs/JobCard";
import { JobDetails } from "@/components/jobs/JobDetails";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Users, 
  Clock,
  ArrowRight,
  Filter,
  RefreshCcw,
  CheckCircle2,
  PieChart
} from "lucide-react";
import { JobListing, DashboardStats } from "@/types";
import { motion } from "framer-motion";

// Mock data for the dashboard
const mockStats: DashboardStats = {
  totalJobs: 128,
  newJobs: 12,
  appliedJobs: 45,
  interviews: 8,
  offers: 3,
  jobsBySource: {
    LinkedIn: 98,
    Naukrigulf: 30
  },
  jobsByCategory: {
    "Software Development": 42,
    "Product Management": 25,
    "Data Science": 18,
    "UX/UI Design": 16,
    "Marketing": 12,
    "Other": 15
  }
};

// Mock recent jobs
const mockRecentJobs: JobListing[] = [
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
  }
];

// Chart data
const sourceChartData = [
  { name: "LinkedIn", value: 98, color: "#0a66c2" },
  { name: "Naukrigulf", value: 30, color: "#ff5a00" }
];

const Index = () => {
  const { toast } = useToast();
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [jobDetailsOpen, setJobDetailsOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleViewJobDetails = (job: JobListing) => {
    setSelectedJob(job);
    setJobDetailsOpen(true);
  };

  const handleApplyToJob = (job: JobListing, generateCover: boolean) => {
    toast({
      title: "Application Scheduled",
      description: `Your application for ${job.title} at ${job.company} has been scheduled for processing.`,
      duration: 5000,
    });
    setJobDetailsOpen(false);
  };

  const handleRefreshJobs = () => {
    setIsRefreshing(true);
    // Simulate refresh process
    setTimeout(() => {
      toast({
        title: "Jobs Refreshed",
        description: "Job listings have been updated with the latest data.",
        duration: 3000,
      });
      setIsRefreshing(false);
    }, 2000);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <Button 
            onClick={handleRefreshJobs}
            disabled={isRefreshing}
          >
            <RefreshCcw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh Jobs"}
          </Button>
        </div>

        <motion.div 
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <StatsCard
            title="Total Jobs"
            value={mockStats.totalJobs}
            icon={<LayoutDashboard className="h-4 w-4" />}
            description="Jobs matching your profile"
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="New Jobs"
            value={mockStats.newJobs}
            icon={<Briefcase className="h-4 w-4" />}
            description="Unread job listings"
            className="bg-primary text-primary-foreground"
          />
          <StatsCard
            title="Applied"
            value={mockStats.appliedJobs}
            icon={<FileText className="h-4 w-4" />}
            description="Applications submitted"
          />
          <StatsCard
            title="Interviews"
            value={mockStats.interviews}
            icon={<Users className="h-4 w-4" />}
            description="Interview invitations"
            trend={{ value: 25, isPositive: true }}
          />
        </motion.div>

        <div className="grid gap-4 md:grid-cols-7">
          <Card className="md:col-span-5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Latest Job Matches</h2>
                <Button variant="outline" size="sm" asChild>
                  <a href="/jobs">
                    View All 
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
              
              <Tabs defaultValue="all" className="mb-6">
                <div className="flex items-center justify-between">
                  <TabsList>
                    <TabsTrigger value="all">All Jobs</TabsTrigger>
                    <TabsTrigger value="new">
                      New 
                      <Badge className="ml-1 bg-primary text-primary-foreground">{mockStats.newJobs}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="matched">Best Matches</TabsTrigger>
                  </TabsList>
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Filter className="h-3.5 w-3.5 mr-1" />
                    Filters
                  </Button>
                </div>
                
                <TabsContent value="all" className="mt-4">
                  <div className="space-y-4">
                    {mockRecentJobs.map((job) => (
                      <JobCard 
                        key={job.id} 
                        job={job} 
                        onViewDetails={handleViewJobDetails} 
                      />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="new" className="mt-4">
                  <div className="space-y-4">
                    {mockRecentJobs.filter(job => job.status === "new").map((job) => (
                      <JobCard 
                        key={job.id} 
                        job={job} 
                        onViewDetails={handleViewJobDetails} 
                      />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="matched" className="mt-4">
                  <div className="space-y-4">
                    {mockRecentJobs
                      .filter(job => job.matchScore >= 85)
                      .map((job) => (
                        <JobCard 
                          key={job.id} 
                          job={job} 
                          onViewDetails={handleViewJobDetails} 
                        />
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="space-y-4 md:col-span-2">
            <JobsBySourceChart data={sourceChartData} />
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-4">
                  Automation Status
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      <span>Job Scraping</span>
                    </div>
                    <Badge variant="outline" className="text-xs">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      <span>Profile Matching</span>
                    </div>
                    <Badge variant="outline" className="text-xs">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      <span>Resume Generation</span>
                    </div>
                    <Badge variant="outline" className="text-xs">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-amber-500 mr-2" />
                      <span>Next Refresh</span>
                    </div>
                    <Badge variant="outline" className="text-xs">5h 32m</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <JobDetails 
        job={selectedJob} 
        open={jobDetailsOpen} 
        onOpenChange={setJobDetailsOpen}
        onApply={handleApplyToJob}
      />
    </Layout>
  );
};

export default Index;
