
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building, 
  MapPin, 
  Calendar, 
  FileText, 
  Globe, 
  Users, 
  Star, 
  ChevronDown, 
  ChevronUp,
  ExternalLink 
} from "lucide-react";
import { JobListing } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface JobCardProps {
  job: JobListing;
  onViewDetails: (job: JobListing) => void;
}

export function JobCard({ job, onViewDetails }: JobCardProps) {
  const [expanded, setExpanded] = useState(false);

  const getMatchScoreColor = (score: number) => {
    if (score >= 85) return "bg-green-100 text-green-800";
    if (score >= 70) return "bg-amber-100 text-amber-800";
    return "bg-blue-100 text-blue-800";
  };

  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-md",
      job.status === "new" ? "border-l-4 border-l-primary" : ""
    )}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg leading-tight">{job.title}</h3>
            <div className="flex items-center text-muted-foreground text-sm mt-1">
              <Building className="h-3.5 w-3.5 mr-1" />
              <span>{job.company}</span>
              <span className="mx-1.5">•</span>
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span>{job.location}</span>
            </div>
          </div>
          <Badge 
            className={cn(
              "text-xs font-semibold",
              getMatchScoreColor(job.matchScore)
            )}
          >
            {job.matchScore}% Match
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="outline" className="text-xs">
            <Calendar className="h-3 w-3 mr-1" />
            {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}
          </Badge>
          <Badge variant="outline" className="text-xs">
            <Globe className="h-3 w-3 mr-1" />
            {job.source}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {job.category}
          </Badge>
        </div>
        
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 overflow-hidden"
            >
              <p className="text-sm text-muted-foreground mb-3 line-clamp-5">
                {job.description}
              </p>
              
              {job.requirements.length > 0 && (
                <div className="mb-3">
                  <h4 className="text-sm font-semibold mb-1">Requirements:</h4>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground">
                    {job.requirements.slice(0, 3).map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                    {job.requirements.length > 3 && (
                      <li className="text-primary text-xs mt-1">
                        +{job.requirements.length - 3} more requirements
                      </li>
                    )}
                  </ul>
                </div>
              )}
              
              {job.contacts.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-1">Network Contacts:</h4>
                  <div className="space-y-2">
                    {job.contacts.map((contact, index) => (
                      <div key={index} className="flex items-center text-sm gap-2">
                        <Users className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{contact.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {contact.position} at {contact.company}
                        </span>
                        <a 
                          href={contact.profileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary ml-auto text-xs flex items-center"
                        >
                          View <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setExpanded(!expanded)}
          className="text-xs"
        >
          {expanded ? (
            <>
              <ChevronUp className="h-3.5 w-3.5 mr-1" /> 
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="h-3.5 w-3.5 mr-1" /> 
              Show More
            </>
          )}
        </Button>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs"
            onClick={() => window.open(job.url, '_blank')}
          >
            <ExternalLink className="h-3.5 w-3.5 mr-1" />
            View Original
          </Button>
          <Button 
            size="sm" 
            className="text-xs"
            onClick={() => onViewDetails(job)}
          >
            <FileText className="h-3.5 w-3.5 mr-1" />
            Apply
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
