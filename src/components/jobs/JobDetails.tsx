
import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Building,
  MapPin,
  Calendar,
  Globe,
  FileText,
  Users,
  Check,
  MessageSquare,
  Link,
  Linkedin,
  Clock,
  AlertCircle
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { JobListing } from "@/types";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "framer-motion";

interface JobDetailsProps {
  job: JobListing | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (job: JobListing, generateCover: boolean) => void;
}

export function JobDetails({ job, open, onOpenChange, onApply }: JobDetailsProps) {
  const [activeTab, setActiveTab] = useState("details");
  const [generateCoverLetter, setGenerateCoverLetter] = useState(true);
  
  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle>{job.title}</DialogTitle>
            <Badge 
              className={`text-xs font-semibold ${
                job.matchScore >= 85
                  ? "bg-green-100 text-green-800"
                  : job.matchScore >= 70
                  ? "bg-amber-100 text-amber-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {job.matchScore}% Match
            </Badge>
          </div>
          <DialogDescription className="flex flex-wrap items-center gap-2 mt-1">
            <span className="flex items-center text-sm">
              <Building className="h-3.5 w-3.5 mr-1" />
              {job.company}
            </span>
            <span className="flex items-center text-sm">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              {job.location}
            </span>
            <span className="flex items-center text-sm">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}
            </span>
            <span className="flex items-center text-sm">
              <Globe className="h-3.5 w-3.5 mr-1" />
              {job.source}
            </span>
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="network">Network ({job.contacts.length})</TabsTrigger>
            <TabsTrigger value="apply">Apply</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4">
            <div>
              <h3 className="font-semibold text-sm mb-2">Job Description</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {job.description}
              </p>
            </div>
            
            {job.requirements.length > 0 && (
              <div>
                <h3 className="font-semibold text-sm mb-2">Requirements</h3>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <Badge variant="outline">{job.category}</Badge>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => window.open(job.url, '_blank')}
              >
                <Link className="h-3.5 w-3.5 mr-1" />
                View Original Listing
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="network">
            {job.contacts.length > 0 ? (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  We've found {job.contacts.length} professionals at {job.company} or in similar roles who could help with your application:
                </p>
                
                {job.contacts.map((contact, index) => (
                  <div key={index} className="border rounded-md p-3">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-sm">{contact.name}</h3>
                      <a
                        href={contact.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-xs flex items-center"
                      >
                        <Linkedin className="h-3.5 w-3.5 mr-1" />
                        View Profile
                      </a>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {contact.position} at {contact.company}
                    </p>
                    <div className="flex mt-2 gap-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        <MessageSquare className="h-3.5 w-3.5 mr-1" />
                        Request Connection
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto text-muted-foreground/60 mb-3" />
                <h3 className="font-semibold text-base mb-1">No contacts found</h3>
                <p className="text-sm text-muted-foreground">
                  We couldn't find any relevant contacts at this company yet.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="apply" className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Automated Application</AlertTitle>
              <AlertDescription>
                CareerElite will automatically customize your resume and generate application materials based on your profile and this job listing.
              </AlertDescription>
            </Alert>
            
            <div>
              <h3 className="font-semibold text-sm mb-3">Application Documents</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Custom Resume</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    <Check className="h-3 w-3 mr-1" /> Ready to generate
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Cover Letter</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-6 px-2 ml-2"
                      onClick={() => setGenerateCoverLetter(!generateCoverLetter)}
                    >
                      <span className="text-xs">
                        {generateCoverLetter ? "Don't generate" : "Generate"}
                      </span>
                    </Button>
                  </div>
                  {generateCoverLetter ? (
                    <Badge variant="outline" className="text-xs">
                      <Check className="h-3 w-3 mr-1" /> Ready to generate
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground text-xs">
                      Skipped
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            <Alert className="bg-yellow-50 text-yellow-800 border-yellow-200">
              <Clock className="h-4 w-4" />
              <AlertTitle>Scheduled For Processing</AlertTitle>
              <AlertDescription>
                Application documents will be generated and saved to your Google Drive. You'll receive an email notification when ready.
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
        
        <Separator className="my-2" />
        
        <DialogFooter>
          {activeTab === "apply" ? (
            <motion.div 
              className="w-full flex justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button 
                variant="outline" 
                onClick={() => setActiveTab("details")}
              >
                Back to Details
              </Button>
              <Button 
                onClick={() => onApply(job, generateCoverLetter)}
              >
                Process Application
              </Button>
            </motion.div>
          ) : (
            <motion.div
              className="w-full flex justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button 
                onClick={() => setActiveTab("apply")}
              >
                Continue to Apply
              </Button>
            </motion.div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
