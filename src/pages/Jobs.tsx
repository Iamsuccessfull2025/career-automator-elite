
import { useState } from "react";
import Layout from "@/components/Layout";
import { JobCard } from "@/components/jobs/JobCard";
import { JobDetails } from "@/components/jobs/JobDetails";
import { Button } from "@/components/ui/button";
import { 
  Input 
} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  Search, 
  Filter, 
  RefreshCcw,
  ChevronDown,
  Clock,
  Briefcase
} from "lucide-react";
import { JobListing } from "@/types";
import { getMockJobs } from "@/services/mockData";

const Jobs = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [jobDetailsOpen, setJobDetailsOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");

  const jobs = getMockJobs();

  // Get unique categories and sources from the job data
  const categories = Array.from(new Set(jobs.map(job => job.category)));
  const sources = Array.from(new Set(jobs.map(job => job.source)));

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

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleSource = (source: string) => {
    setSelectedSources(prev => 
      prev.includes(source)
        ? prev.filter(s => s !== source)
        : [...prev, source]
    );
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchTerm === "" || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(job.category);
      
    const matchesSource = selectedSources.length === 0 || 
      selectedSources.includes(job.source);
      
    return matchesSearch && matchesCategory && matchesSource;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === "relevance") {
      return b.matchScore - a.matchScore;
    } else if (sortBy === "date") {
      return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
    } else if (sortBy === "company") {
      return a.company.localeCompare(b.company);
    }
    return 0;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Job Listings</h1>
          <Button 
            onClick={handleRefreshJobs}
            disabled={isRefreshing}
          >
            <RefreshCcw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh Jobs"}
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search jobs by title, company, or keywords..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </Button>
          <Select
            value={sortBy}
            onValueChange={setSortBy}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Sort by Relevance</SelectItem>
              <SelectItem value="date">Sort by Date</SelectItem>
              <SelectItem value="company">Sort by Company</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {showFilters && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-sm mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`category-${category}`} 
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <label
                          htmlFor={`category-${category}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-3">Sources</h3>
                  <div className="space-y-2">
                    {sources.map((source) => (
                      <div key={source} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`source-${source}`} 
                          checked={selectedSources.includes(source)}
                          onCheckedChange={() => toggleSource(source)}
                        />
                        <label
                          htmlFor={`source-${source}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {source}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Briefcase className="mr-2 h-5 w-5 text-muted-foreground" />
              <span className="font-medium">{sortedJobs.length} jobs found</span>
              {(selectedCategories.length > 0 || selectedSources.length > 0 || searchTerm) && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-2 h-8 text-xs"
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedSources([]);
                    setSearchTerm("");
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              <span>Updated 32 minutes ago</span>
            </div>
          </div>

          {sortedJobs.length > 0 ? (
            <div className="space-y-4">
              {sortedJobs.map((job) => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  onViewDetails={handleViewJobDetails} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border rounded-lg bg-muted/20">
              <Briefcase className="h-12 w-12 mx-auto text-muted-foreground/60 mb-3" />
              <h3 className="text-lg font-semibold mb-1">No jobs found</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-4">
                We couldn't find any jobs matching your search criteria. Try adjusting your filters or search term.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedSources([]);
                  setSearchTerm("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
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

export default Jobs;
