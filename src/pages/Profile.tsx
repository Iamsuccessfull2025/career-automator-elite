
import { useState } from "react";
import Layout from "@/components/Layout";
import { UserProfile } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronDown,
  ChevronUp,
  User,
  Briefcase,
  GraduationCap,
  PlusCircle,
  X,
  Save,
  Download,
  Upload,
  FileText,
  Pencil,
  Trash2
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock user profile data
const mockUserProfile: UserProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  skills: [
    "React", 
    "TypeScript", 
    "JavaScript", 
    "HTML", 
    "CSS", 
    "Node.js", 
    "Express", 
    "MongoDB", 
    "GraphQL", 
    "Redux",
    "Next.js",
    "TailwindCSS",
    "UI/UX Design"
  ],
  experience: [
    {
      title: "Senior Frontend Developer",
      company: "TechSolutions Inc",
      location: "Dubai, UAE",
      startDate: "2021-01",
      endDate: null,
      description: "Developing and maintaining web applications using React and TypeScript. Leading frontend architecture decisions and mentoring junior developers.",
      skills: ["React", "TypeScript", "Redux", "TailwindCSS"]
    },
    {
      title: "Frontend Developer",
      company: "Web Innovators LLC",
      location: "Abu Dhabi, UAE",
      startDate: "2018-06",
      endDate: "2020-12",
      description: "Worked on multiple client projects building responsive web applications and implementing UI components based on design specifications.",
      skills: ["React", "JavaScript", "HTML", "CSS", "SASS"]
    },
    {
      title: "Web Developer",
      company: "Digital Agency Co",
      location: "Mumbai, India",
      startDate: "2016-03",
      endDate: "2018-05",
      description: "Developed and maintained client websites and web applications. Collaborated with designers and backend developers to implement features.",
      skills: ["JavaScript", "jQuery", "HTML", "CSS", "PHP"]
    }
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Mumbai",
      location: "Mumbai, India",
      graduationDate: "2016-05",
      description: "Focus on web technologies and software development principles."
    }
  ],
  jobPreferences: {
    roles: ["Frontend Developer", "Full Stack Developer", "React Developer"],
    locations: ["Dubai", "Abu Dhabi", "Remote"],
    remotePreference: "remote",
    minSalary: 120000
  },
  resumeUrl: "https://example.com/resume.pdf",
  linkedInProfile: "https://linkedin.com/in/alex-johnson"
};

const Profile = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile>(mockUserProfile);
  const [editMode, setEditMode] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill.trim()]
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter(s => s !== skill)
    });
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
      duration: 3000,
    });
    setEditMode(false);
  };

  const handleDownloadResume = () => {
    toast({
      title: "Resume Downloaded",
      description: "Your resume has been downloaded to your device.",
      duration: 3000,
    });
  };

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "Present";
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short' }).format(date);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <div className="flex gap-2">
            {editMode ? (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveProfile}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => setEditMode(true)}
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="details">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="details">Profile Details</TabsTrigger>
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="preferences">Job Preferences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editMode ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <FormLabel>Full Name</FormLabel>
                        <Input 
                          value={profile.name}
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <FormLabel>Email</FormLabel>
                        <Input 
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <FormLabel>LinkedIn Profile</FormLabel>
                      <Input 
                        value={profile.linkedInProfile}
                        onChange={(e) => setProfile({...profile, linkedInProfile: e.target.value})}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Full Name</h3>
                        <p>{profile.name}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                        <p>{profile.email}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">LinkedIn Profile</h3>
                      <a 
                        href={profile.linkedInProfile} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {profile.linkedInProfile}
                      </a>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.experience.map((exp, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{exp.title}</h3>
                        <p className="text-muted-foreground">
                          {exp.company} • {exp.location}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                        </p>
                      </div>
                      {editMode && (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="mt-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs p-0 h-auto"
                        onClick={() => toggleSection(`exp-${index}`)}
                      >
                        {expandedSection === `exp-${index}` ? (
                          <>
                            <ChevronUp className="h-3.5 w-3.5 mr-1" />
                            Hide Details
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3.5 w-3.5 mr-1" />
                            Show Details
                          </>
                        )}
                      </Button>
                    </div>
                    
                    {expandedSection === `exp-${index}` && (
                      <div className="mt-3">
                        {editMode ? (
                          <div className="space-y-3">
                            <Textarea 
                              value={exp.description}
                              onChange={(e) => {
                                const newExperience = [...profile.experience];
                                newExperience[index].description = e.target.value;
                                setProfile({...profile, experience: newExperience});
                              }}
                              className="min-h-[100px]"
                            />
                            <div>
                              <FormLabel className="text-sm">Skills Used</FormLabel>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {exp.skills.map((skill, skillIndex) => (
                                  <Badge 
                                    key={skillIndex} 
                                    variant="secondary"
                                    className="flex items-center gap-1"
                                  >
                                    {skill}
                                    <button 
                                      onClick={() => {
                                        const newExperience = [...profile.experience];
                                        newExperience[index].skills = newExperience[index].skills.filter(
                                          (s) => s !== skill
                                        );
                                        setProfile({...profile, experience: newExperience});
                                      }}
                                      className="text-muted-foreground hover:text-foreground ml-1"
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                  </Badge>
                                ))}
                                <div className="relative">
                                  <select 
                                    className="w-32 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    onChange={(e) => {
                                      const skill = e.target.value;
                                      if (skill && !exp.skills.includes(skill)) {
                                        const newExperience = [...profile.experience];
                                        newExperience[index].skills = [...newExperience[index].skills, skill];
                                        setProfile({...profile, experience: newExperience});
                                      }
                                      e.target.value = "";
                                    }}
                                  >
                                    <option value="">Add skill</option>
                                    {profile.skills
                                      .filter(skill => !exp.skills.includes(skill))
                                      .map((skill, i) => (
                                        <option key={i} value={skill}>{skill}</option>
                                      ))
                                    }
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <p className="text-sm whitespace-pre-line">{exp.description}</p>
                            {exp.skills.length > 0 && (
                              <div>
                                <h4 className="text-xs font-medium text-muted-foreground mb-1">Skills Used</h4>
                                <div className="flex flex-wrap gap-1">
                                  {exp.skills.map((skill, skillIndex) => (
                                    <Badge key={skillIndex} variant="secondary">{skill}</Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                
                {editMode && (
                  <Button 
                    variant="outline" 
                    className="w-full mt-2"
                    onClick={() => {
                      setProfile({
                        ...profile,
                        experience: [
                          ...profile.experience,
                          {
                            title: "New Position",
                            company: "Company Name",
                            location: "Location",
                            startDate: new Date().toISOString().slice(0, 7),
                            endDate: null,
                            description: "Describe your responsibilities and achievements...",
                            skills: []
                          }
                        ]
                      });
                    }}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Experience
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.education.map((edu, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{edu.degree}</h3>
                        <p className="text-muted-foreground">
                          {edu.institution} • {edu.location}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Graduated: {formatDate(edu.graduationDate)}
                        </p>
                      </div>
                      {editMode && (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="mt-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs p-0 h-auto"
                        onClick={() => toggleSection(`edu-${index}`)}
                      >
                        {expandedSection === `edu-${index}` ? (
                          <>
                            <ChevronUp className="h-3.5 w-3.5 mr-1" />
                            Hide Details
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3.5 w-3.5 mr-1" />
                            Show Details
                          </>
                        )}
                      </Button>
                    </div>
                    
                    {expandedSection === `edu-${index}` && (
                      <div className="mt-3">
                        {editMode ? (
                          <Textarea 
                            value={edu.description}
                            onChange={(e) => {
                              const newEducation = [...profile.education];
                              newEducation[index].description = e.target.value;
                              setProfile({...profile, education: newEducation});
                            }}
                            className="min-h-[100px]"
                          />
                        ) : (
                          <p className="text-sm whitespace-pre-line">{edu.description}</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                
                {editMode && (
                  <Button 
                    variant="outline" 
                    className="w-full mt-2"
                    onClick={() => {
                      setProfile({
                        ...profile,
                        education: [
                          ...profile.education,
                          {
                            degree: "Degree Name",
                            institution: "Institution Name",
                            location: "Location",
                            graduationDate: new Date().toISOString().slice(0, 7),
                            description: "Describe your education..."
                          }
                        ]
                      });
                    }}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Education
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Skills</CardTitle>
                <CardDescription>
                  These skills will be used to match you with relevant job opportunities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {profile.skills.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary"
                      className={editMode ? "pr-1.5" : ""}
                    >
                      {skill}
                      {editMode && (
                        <button 
                          onClick={() => removeSkill(skill)}
                          className="ml-1.5 text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                  
                  {editMode && (
                    <div className="flex items-center gap-2">
                      <Input 
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill"
                        className="w-40 h-8 text-sm"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addSkill();
                          }
                        }}
                      />
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8"
                        onClick={addSkill}
                      >
                        Add
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resume" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resume Management</CardTitle>
                <CardDescription>
                  Your resume will be used to generate customized applications for job listings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border rounded-lg p-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-primary mr-4" />
                    <div>
                      <h3 className="font-medium">Current Resume</h3>
                      <p className="text-sm text-muted-foreground">
                        Last updated: April 14, 2023
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleDownloadResume}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Update
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Resume Templates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-1">Professional Template</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Clean, traditional layout suitable for most industries.
                      </p>
                      <Button variant="outline" size="sm">
                        Use This Template
                      </Button>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-1">Modern Template</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Contemporary design with visual elements, great for creative fields.
                      </p>
                      <Badge className="mb-3">Currently Used</Badge>
                      <Button variant="outline" size="sm">
                        Preview
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Preferences</CardTitle>
                <CardDescription>
                  These preferences will be used to find and filter job opportunities.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {editMode ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <FormLabel>Preferred Job Roles</FormLabel>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {profile.jobPreferences.roles.map((role, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary"
                            className="pr-1.5"
                          >
                            {role}
                            <button 
                              onClick={() => {
                                const newRoles = [...profile.jobPreferences.roles];
                                newRoles.splice(index, 1);
                                setProfile({
                                  ...profile,
                                  jobPreferences: {
                                    ...profile.jobPreferences,
                                    roles: newRoles
                                  }
                                });
                              }}
                              className="ml-1.5 text-muted-foreground hover:text-foreground"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Add a job role"
                          className="w-full"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                              e.preventDefault();
                              const newRole = e.currentTarget.value.trim();
                              if (!profile.jobPreferences.roles.includes(newRole)) {
                                setProfile({
                                  ...profile,
                                  jobPreferences: {
                                    ...profile.jobPreferences,
                                    roles: [...profile.jobPreferences.roles, newRole]
                                  }
                                });
                              }
                              e.currentTarget.value = '';
                            }
                          }}
                        />
                        <Button variant="outline">Add</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <FormLabel>Preferred Locations</FormLabel>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {profile.jobPreferences.locations.map((location, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary"
                            className="pr-1.5"
                          >
                            {location}
                            <button 
                              onClick={() => {
                                const newLocations = [...profile.jobPreferences.locations];
                                newLocations.splice(index, 1);
                                setProfile({
                                  ...profile,
                                  jobPreferences: {
                                    ...profile.jobPreferences,
                                    locations: newLocations
                                  }
                                });
                              }}
                              className="ml-1.5 text-muted-foreground hover:text-foreground"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Add a location"
                          className="w-full"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                              e.preventDefault();
                              const newLocation = e.currentTarget.value.trim();
                              if (!profile.jobPreferences.locations.includes(newLocation)) {
                                setProfile({
                                  ...profile,
                                  jobPreferences: {
                                    ...profile.jobPreferences,
                                    locations: [...profile.jobPreferences.locations, newLocation]
                                  }
                                });
                              }
                              e.currentTarget.value = '';
                            }
                          }}
                        />
                        <Button variant="outline">Add</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <FormLabel>Remote Work Preference</FormLabel>
                      <select 
                        value={profile.jobPreferences.remotePreference}
                        onChange={(e) => {
                          setProfile({
                            ...profile,
                            jobPreferences: {
                              ...profile.jobPreferences,
                              remotePreference: e.target.value as "remote" | "hybrid" | "onsite" | "any"
                            }
                          });
                        }}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        <option value="remote">Remote Only</option>
                        <option value="hybrid">Hybrid (Remote & Onsite)</option>
                        <option value="onsite">Onsite Only</option>
                        <option value="any">Any (No Preference)</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <FormLabel>Minimum Salary (Annual)</FormLabel>
                      <Input 
                        type="number"
                        value={profile.jobPreferences.minSalary}
                        onChange={(e) => {
                          setProfile({
                            ...profile,
                            jobPreferences: {
                              ...profile.jobPreferences,
                              minSalary: parseInt(e.target.value) || 0
                            }
                          });
                        }}
                      />
                      <FormDescription>
                        This will be used to filter job listings but won't be shared with employers.
                      </FormDescription>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Preferred Job Roles</h3>
                      <div className="flex flex-wrap gap-1">
                        {profile.jobPreferences.roles.map((role, index) => (
                          <Badge key={index} variant="secondary">{role}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Preferred Locations</h3>
                      <div className="flex flex-wrap gap-1">
                        {profile.jobPreferences.locations.map((location, index) => (
                          <Badge key={index} variant="secondary">{location}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Remote Work Preference</h3>
                      <Badge>
                        {profile.jobPreferences.remotePreference === "remote" && "Remote Only"}
                        {profile.jobPreferences.remotePreference === "hybrid" && "Hybrid (Remote & Onsite)"}
                        {profile.jobPreferences.remotePreference === "onsite" && "Onsite Only"}
                        {profile.jobPreferences.remotePreference === "any" && "Any (No Preference)"}
                      </Badge>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Minimum Salary (Annual)</h3>
                      <p>${profile.jobPreferences.minSalary.toLocaleString()}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
