
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
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
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { 
  Bell,
  Save,
  RefreshCw,
  Clock,
  Mail,
  Shield,
  FileText,
  Database,
  Upload,
  ExternalLink,
  AlarmClock,
  PanelLeftOpen,
  PanelLeftClose,
  Sliders,
  X,
  Info,
  Check,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GoogleIntegration } from "@/types";

const Settings = () => {
  const { toast } = useToast();
  const [scrapeInterval, setScrapeInterval] = useState<number>(6);
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);
  const [newJobsNotification, setNewJobsNotification] = useState<boolean>(true);
  const [applicationUpdatesNotification, setApplicationUpdatesNotification] = useState<boolean>(true);
  const [interviewRemindersNotification, setInterviewRemindersNotification] = useState<boolean>(true);
  const [googleIntegration, setGoogleIntegration] = useState<GoogleIntegration>({
    docsTemplateId: "1XYZ_AbCdEfGhIjKlMnOpQrStUvWxYz123456789",
    sheetsId: "1AbC_DeFgHiJkLmNoPqRsTuVwXyZ987654321",
    email: "user@example.com",
    accessToken: "ya29.a0AfB_byC..."
  });
  const [isTestingCredentials, setIsTestingCredentials] = useState<boolean>(false);
  const [isReconnecting, setIsReconnecting] = useState<boolean>(false);
  const [isUpdatingSettings, setIsUpdatingSettings] = useState<boolean>(false);
  const [isIntegrationValid, setIsIntegrationValid] = useState<boolean>(true);

  const handleSaveSettings = () => {
    setIsUpdatingSettings(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings Updated",
        description: "Your settings have been successfully saved.",
        duration: 3000,
      });
      setIsUpdatingSettings(false);
    }, 1000);
  };

  const handleTestCredentials = () => {
    setIsTestingCredentials(true);
    // Simulate API call
    setTimeout(() => {
      setIsTestingCredentials(false);
      setIsIntegrationValid(true);
      toast({
        title: "Integration Verified",
        description: "Your Google integration is working correctly.",
        duration: 3000,
      });
    }, 1500);
  };

  const handleReconnectGoogle = () => {
    setIsReconnecting(true);
    // Simulate API call
    setTimeout(() => {
      setIsReconnecting(false);
      toast({
        title: "Google Reconnected",
        description: "Your Google account has been reconnected successfully.",
        duration: 3000,
      });
    }, 1500);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <Button 
            onClick={handleSaveSettings}
            disabled={isUpdatingSettings}
          >
            <Save className={`h-4 w-4 mr-2 ${isUpdatingSettings ? "animate-spin" : ""}`} />
            {isUpdatingSettings ? "Saving..." : "Save Settings"}
          </Button>
        </div>

        <Tabs defaultValue="automation">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="automation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Job Scraping Schedule
                </CardTitle>
                <CardDescription>
                  Configure how often the system should check for new job listings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <FormLabel>Scrape Interval (Hours)</FormLabel>
                  <div className="flex items-center gap-4">
                    <Input 
                      type="number" 
                      min={1}
                      max={24}
                      value={scrapeInterval}
                      onChange={(e) => setScrapeInterval(parseInt(e.target.value) || 6)}
                      className="w-24"
                    />
                    <span className="text-sm text-muted-foreground">hours</span>
                  </div>
                  <FormDescription>
                    How frequently to check LinkedIn and Naukrigulf for new job listings. 
                    Recommended: 6 hours.
                  </FormDescription>
                </div>
                
                <Alert>
                  <AlarmClock className="h-4 w-4" />
                  <AlertTitle>Next Run</AlertTitle>
                  <AlertDescription>
                    Next job scraping scheduled for: <span className="font-medium">April 20, 2023, 14:30</span>
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Run Job Scraping Now
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sliders className="h-5 w-5 mr-2" />
                  Profile Matching Settings
                </CardTitle>
                <CardDescription>
                  Configure how jobs are matched to your profile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Skill Matching</FormLabel>
                      <FormDescription>
                        Match jobs based on required skills
                      </FormDescription>
                    </div>
                    <Switch checked={true} />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Experience Level Matching</FormLabel>
                      <FormDescription>
                        Match jobs based on your experience level
                      </FormDescription>
                    </div>
                    <Switch checked={true} />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Location Matching</FormLabel>
                      <FormDescription>
                        Match jobs based on preferred locations
                      </FormDescription>
                    </div>
                    <Switch checked={true} />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Salary Filtering</FormLabel>
                      <FormDescription>
                        Filter jobs below your minimum salary preference
                      </FormDescription>
                    </div>
                    <Switch checked={true} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Document Generation
                </CardTitle>
                <CardDescription>
                  Configure how the system generates application documents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Automatic Resume Customization</FormLabel>
                      <FormDescription>
                        Customize resume for each job application
                      </FormDescription>
                    </div>
                    <Switch checked={true} />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Cover Letter Generation</FormLabel>
                      <FormDescription>
                        Automatically generate cover letters for applications
                      </FormDescription>
                    </div>
                    <Switch checked={true} />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Skills Highlighting</FormLabel>
                      <FormDescription>
                        Highlight relevant skills in your resume
                      </FormDescription>
                    </div>
                    <Switch checked={true} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <img src="https://www.gstatic.com/images/branding/product/2x/googleg_48dp.png" alt="Google" className="h-5 w-5 mr-2" />
                  Google Integration
                </CardTitle>
                <CardDescription>
                  Connect to Google services for document generation and storage
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center p-3 rounded-md bg-muted">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm">Connected as {googleIntegration.email}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-auto"
                    onClick={handleReconnectGoogle}
                    disabled={isReconnecting}
                  >
                    <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${isReconnecting ? "animate-spin" : ""}`} />
                    {isReconnecting ? "Reconnecting..." : "Reconnect"}
                  </Button>
                </div>
                
                <div className="space-y-4 mt-2">
                  <div className="space-y-2">
                    <FormLabel>Google Docs Template ID</FormLabel>
                    <div className="flex gap-2">
                      <Input 
                        value={googleIntegration.docsTemplateId}
                        onChange={(e) => setGoogleIntegration({...googleIntegration, docsTemplateId: e.target.value})}
                      />
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="shrink-0">
                          <Info className="h-4 w-4" />
                        </Button>
                      </SheetTrigger>
                    </div>
                    <FormDescription>
                      The template used for generating resumes and cover letters
                    </FormDescription>
                  </div>
                  
                  <div className="space-y-2">
                    <FormLabel>Google Sheets ID</FormLabel>
                    <div className="flex gap-2">
                      <Input 
                        value={googleIntegration.sheetsId}
                        onChange={(e) => setGoogleIntegration({...googleIntegration, sheetsId: e.target.value})}
                      />
                      <Button variant="ghost" size="icon" className="shrink-0" asChild>
                        <a href="https://docs.google.com/spreadsheets/" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                    <FormDescription>
                      The spreadsheet used to track your job applications
                    </FormDescription>
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button 
                      variant="outline" 
                      onClick={handleTestCredentials}
                      disabled={isTestingCredentials}
                    >
                      <Shield className={`h-4 w-4 mr-2 ${isTestingCredentials ? "animate-spin" : ""}`} />
                      {isTestingCredentials ? "Testing..." : "Test Connection"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <img src="https://www.linkedin.com/favicon.ico" alt="LinkedIn" className="h-5 w-5 mr-2" />
                  LinkedIn Integration
                </CardTitle>
                <CardDescription>
                  Connect to LinkedIn for job scraping and networking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Connection Required</AlertTitle>
                  <AlertDescription className="space-y-3">
                    <p>You need to connect your LinkedIn account to enable job scraping and networking features.</p>
                    <Button>
                      Connect LinkedIn Account
                    </Button>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  Data Management
                </CardTitle>
                <CardDescription>
                  Manage your application data and exports
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Auto-Backup to Google Drive</FormLabel>
                      <FormDescription>
                        Keep a backup of your application data
                      </FormDescription>
                    </div>
                    <Switch checked={true} />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Save Application History</FormLabel>
                      <FormDescription>
                        Save your application history for future reference
                      </FormDescription>
                    </div>
                    <Switch checked={true} />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Export All Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Email Notifications
                </CardTitle>
                <CardDescription>
                  Configure when and how you receive email notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Enable Email Notifications</FormLabel>
                    <FormDescription>
                      Receive notifications via email
                    </FormDescription>
                  </div>
                  <Switch 
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                
                {emailNotifications && (
                  <>
                    <Separator />
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel>New Job Matches</FormLabel>
                          <FormDescription>
                            Get notified when new matching jobs are found
                          </FormDescription>
                        </div>
                        <Switch 
                          checked={newJobsNotification}
                          onCheckedChange={setNewJobsNotification}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel>Application Updates</FormLabel>
                          <FormDescription>
                            Get notified when application documents are generated
                          </FormDescription>
                        </div>
                        <Switch 
                          checked={applicationUpdatesNotification}
                          onCheckedChange={setApplicationUpdatesNotification}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel>Interview Reminders</FormLabel>
                          <FormDescription>
                            Get reminders about upcoming interviews
                          </FormDescription>
                        </div>
                        <Switch 
                          checked={interviewRemindersNotification}
                          onCheckedChange={setInterviewRemindersNotification}
                        />
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <Input 
                        type="email"
                        placeholder="Email address for notifications"
                        value="alex.johnson@example.com"
                      />
                      <FormDescription className="mt-1">
                        Email address where notifications will be sent
                      </FormDescription>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  In-App Notifications
                </CardTitle>
                <CardDescription>
                  Configure notifications within the application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel>Show Notifications</FormLabel>
                      <FormDescription>
                        Display notifications in the application
                      </FormDescription>
                    </div>
                    <Switch checked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel>Sound Alerts</FormLabel>
                      <FormDescription>
                        Play sound when new notifications arrive
                      </FormDescription>
                    </div>
                    <Switch checked={false} />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    <X className="h-4 w-4 mr-2" />
                    Clear All Notifications
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Help information sheet */}
      <Sheet>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>How to Find Your Google Doc Template ID</SheetTitle>
            <SheetDescription>
              Follow these steps to locate your Google Docs template ID
            </SheetDescription>
          </SheetHeader>
          <div className="py-4 space-y-4">
            <ol className="list-decimal pl-5 space-y-3">
              <li className="text-sm">
                Create a Google Docs template with placeholders for your resume or cover letter.
              </li>
              <li className="text-sm">
                Open the document in your browser.
              </li>
              <li className="text-sm">
                Look at the URL in your browser's address bar:
                <code className="block mt-1 p-2 bg-muted rounded-md text-xs break-all">
                  https://docs.google.com/document/d/<strong>1XYZ_AbCdEfGhIjKlMnOpQrStUvWxYz123456789</strong>/edit
                </code>
              </li>
              <li className="text-sm">
                The highlighted part is your Google Doc Template ID.
              </li>
              <li className="text-sm">
                Copy this ID and paste it in the field above.
              </li>
            </ol>
            <div className="bg-muted rounded-md p-3 mt-4">
              <h4 className="font-medium text-sm mb-1">Recommended Placeholders</h4>
              <ul className="list-disc pl-5 text-xs space-y-1">
                <li><code>{"{{full_name}}"}</code> - Your full name</li>
                <li><code>{"{{job_title}}"}</code> - The job title</li>
                <li><code>{"{{company_name}}"}</code> - The company name</li>
                <li><code>{"{{skills}}"}</code> - Your relevant skills</li>
                <li><code>{"{{experience}}"}</code> - Your relevant experience</li>
              </ul>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </Layout>
  );
};

export default Settings;
