
import { useState } from "react";
import Layout from "@/components/Layout";
import { JobListing } from "@/types";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Building, 
  Calendar, 
  CheckCircle2,
  Clock,
  X,
  ExternalLink
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { getMockJobs } from "@/services/mockData";

const Applications = () => {
  const [selectedTab, setSelectedTab] = useState("applied");
  
  // Get only applications that have a status beyond "new" or "viewed"
  const jobs = getMockJobs().filter(job => 
    ["applied", "interview", "offer", "rejected", "accepted"].includes(job.status)
  );
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied": return "bg-blue-100 text-blue-800";
      case "interview": return "bg-purple-100 text-purple-800";
      case "rejected": return "bg-red-100 text-red-800";
      case "offer": return "bg-green-100 text-green-800";
      case "accepted": return "bg-green-600 text-white";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "applied": return "Applied";
      case "interview": return "Interview";
      case "rejected": return "Rejected";
      case "offer": return "Offer Received";
      case "accepted": return "Accepted";
      default: return status;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">My Applications</h1>
        </div>

        <Tabs 
          value={selectedTab} 
          onValueChange={setSelectedTab}
        >
          <TabsList className="mb-6">
            <TabsTrigger value="applied">Applied</TabsTrigger>
            <TabsTrigger value="interview">Interviews</TabsTrigger>
            <TabsTrigger value="offer">Offers</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          
          {["applied", "interview", "offer", "rejected"].map((status) => (
            <TabsContent key={status} value={status}>
              <div className="space-y-4">
                {jobs.filter(job => 
                  status === "applied" ? job.status === "applied" : 
                  status === "interview" ? job.status === "interview" : 
                  status === "offer" ? ["offer", "accepted"].includes(job.status) : 
                  job.status === "rejected"
                ).map((job) => (
                  <Card key={job.id}>
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h3 className="font-semibold text-lg leading-tight">{job.title}</h3>
                          <div className="flex items-center text-muted-foreground text-sm">
                            <Building className="h-3.5 w-3.5 mr-1" />
                            <span>{job.company}</span>
                          </div>
                        </div>
                        <Badge 
                          className={getStatusColor(job.status)}
                        >
                          {getStatusLabel(job.status)}
                        </Badge>
                      </div>
                      
                      <div className="mt-4 flex items-center gap-3 text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                          <span>Applied {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}</span>
                        </div>
                        
                        {job.status === "interview" && (
                          <Badge variant="outline" className="ml-auto">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            Interview on April 25, 2023
                          </Badge>
                        )}
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="text-xs">
                          <FileText className="h-3.5 w-3.5 mr-1" />
                          View Resume
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          <FileText className="h-3.5 w-3.5 mr-1" />
                          View Cover Letter
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs ml-auto" asChild>
                          <a href={job.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3.5 w-3.5 mr-1" />
                            View Original Listing
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {jobs.filter(job => 
                  status === "applied" ? job.status === "applied" : 
                  status === "interview" ? job.status === "interview" : 
                  status === "offer" ? ["offer", "accepted"].includes(job.status) : 
                  job.status === "rejected"
                ).length === 0 && (
                  <div className="text-center py-12">
                    <div className="bg-muted w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      {status === "rejected" ? (
                        <X className="h-6 w-6 text-muted-foreground" />
                      ) : (
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mb-1">No {getStatusLabel(status).toLowerCase()} applications</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      {status === "applied" 
                        ? "You haven't applied to any jobs yet. Browse job listings to start applying." 
                        : status === "interview"
                        ? "You don't have any interviews scheduled yet. Keep applying to increase your chances!"
                        : status === "offer"
                        ? "You haven't received any job offers yet. Keep going with your applications!"
                        : "Good news! You haven't been rejected from any jobs you've applied to."
                      }
                    </p>
                    {status === "applied" && (
                      <Button className="mt-4" asChild>
                        <a href="/jobs">Browse Jobs</a>
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default Applications;
