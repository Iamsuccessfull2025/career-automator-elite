
import { JobListing, UserProfile } from "@/types";
import { GoogleSheetSyncService } from "./googleSheetSync";

export class JobScraperService {
  private static instance: JobScraperService;
  private intervalId: number | null = null;
  private isRunning = false;
  private lastRunTime: Date | null = null;
  private scrapeInterval = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
  
  private constructor() {
    // Private constructor to enforce singleton
  }

  /**
   * Get the singleton instance
   */
  public static getInstance(): JobScraperService {
    if (!JobScraperService.instance) {
      JobScraperService.instance = new JobScraperService();
    }
    return JobScraperService.instance;
  }

  /**
   * Start the job scraper with the given profile
   * @param profile User profile for job matching
   */
  public startScraper(profile: UserProfile): void {
    if (this.isRunning) {
      console.log("Job scraper is already running");
      return;
    }

    console.log("Starting job scraper");
    this.isRunning = true;
    
    // Run immediately on start
    this.scrapeJobs(profile);
    
    // Then set interval for future runs
    this.intervalId = window.setInterval(() => {
      this.scrapeJobs(profile);
    }, this.scrapeInterval);
  }

  /**
   * Stop the job scraper
   */
  public stopScraper(): void {
    if (!this.isRunning || this.intervalId === null) {
      console.log("Job scraper is not running");
      return;
    }

    console.log("Stopping job scraper");
    window.clearInterval(this.intervalId);
    this.intervalId = null;
    this.isRunning = false;
  }

  /**
   * Manually trigger a job scrape
   * @param profile User profile for job matching
   */
  public async manualScrape(profile: UserProfile): Promise<JobListing[]> {
    return this.scrapeJobs(profile);
  }

  /**
   * Get the status of the scraper
   */
  public getStatus(): { isRunning: boolean; lastRunTime: Date | null; nextRunTime: Date | null } {
    let nextRunTime: Date | null = null;
    
    if (this.isRunning && this.lastRunTime) {
      nextRunTime = new Date(this.lastRunTime.getTime() + this.scrapeInterval);
    }
    
    return {
      isRunning: this.isRunning,
      lastRunTime: this.lastRunTime,
      nextRunTime
    };
  }

  /**
   * The main job scraping function
   * @param profile User profile for job matching
   * @private
   */
  private async scrapeJobs(profile: UserProfile): Promise<JobListing[]> {
    console.log("Scraping jobs for profile:", profile.name);
    this.lastRunTime = new Date();
    
    try {
      // Extract keywords from profile for search
      const searchKeywords = this.extractSearchKeywords(profile);
      console.log("Using search keywords:", searchKeywords);
      
      // In a real implementation, this would call the LinkedIn and NaukriGulf APIs
      // For now, we'll simulate the API calls
      const linkedInJobs = await this.scrapeLinkedIn(searchKeywords);
      const naukriGulfJobs = await this.scrapeNaukriGulf(searchKeywords);
      
      const allJobs = [...linkedInJobs, ...naukriGulfJobs];
      
      // Calculate match score for each job
      const matchedJobs = this.calculateJobMatches(allJobs, profile);
      
      // Sync the matched jobs to Google Sheets
      await GoogleSheetSyncService.syncJobMatches(matchedJobs);
      
      console.log(`Found ${matchedJobs.length} matching jobs`);
      return matchedJobs;
    } catch (error) {
      console.error("Error scraping jobs:", error);
      return [];
    }
  }

  /**
   * Extract search keywords from user profile
   * @param profile User profile
   * @private
   */
  private extractSearchKeywords(profile: UserProfile): string[] {
    const keywords: string[] = [];
    
    // Add job roles
    keywords.push(...profile.jobPreferences.roles);
    
    // Add skills (top 10 only to avoid too many keywords)
    keywords.push(...profile.skills.slice(0, 10));
    
    // Add experience keywords from job titles
    profile.experience.forEach(exp => {
      keywords.push(exp.title);
    });
    
    // Remove duplicates and filter out empty strings
    return [...new Set(keywords.filter(k => k.trim() !== ""))];
  }

  /**
   * Simulate LinkedIn job scraping
   * @param keywords Search keywords
   * @private
   */
  private async scrapeLinkedIn(keywords: string[]): Promise<JobListing[]> {
    console.log("Scraping LinkedIn for keywords:", keywords);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, return mock data
    return [
      {
        id: "li-1",
        title: "Project Manager - ESG Initiatives",
        company: "Global Sustainability Corp",
        location: "Remote, India",
        description: "Looking for a Project Manager to lead our ESG compliance initiatives...",
        requirements: ["Project management", "ESG knowledge", "Stakeholder engagement"],
        url: "https://linkedin.com/jobs/view/li-1",
        source: "LinkedIn",
        postedDate: new Date().toISOString(),
        matchScore: 0, // Will be calculated later
        category: "ESG/Climate",
        contacts: [],
        status: "new",
        scraped: true
      },
      {
        id: "li-2",
        title: "Operations Analyst",
        company: "International Banking Group",
        location: "Mumbai, India",
        description: "Seeking an Operations Analyst to support our banking operations...",
        requirements: ["Banking operations", "Data analysis", "Excel"],
        url: "https://linkedin.com/jobs/view/li-2",
        source: "LinkedIn",
        postedDate: new Date().toISOString(),
        matchScore: 0, // Will be calculated later
        category: "Operations",
        contacts: [],
        status: "new",
        scraped: true
      }
    ];
  }

  /**
   * Simulate NaukriGulf job scraping
   * @param keywords Search keywords
   * @private
   */
  private async scrapeNaukriGulf(keywords: string[]): Promise<JobListing[]> {
    console.log("Scraping NaukriGulf for keywords:", keywords);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // For demo purposes, return mock data
    return [
      {
        id: "ng-1",
        title: "Process Design Engineer",
        company: "Engineering Solutions UAE",
        location: "Dubai, UAE",
        description: "Seeking a Process Design Engineer with chemical engineering background...",
        requirements: ["Chemical engineering", "Process design", "Engineering"],
        url: "https://naukrigulf.com/jobs/view/ng-1",
        source: "Naukrigulf",
        postedDate: new Date().toISOString(),
        matchScore: 0, // Will be calculated later
        category: "Engineering",
        contacts: [],
        status: "new",
        scraped: true
      },
      {
        id: "ng-2",
        title: "ESG Consultant",
        company: "Global Consulting Firm",
        location: "Remote",
        description: "Looking for an ESG Consultant to help clients with sustainability initiatives...",
        requirements: ["ESG", "Consulting", "Sustainability"],
        url: "https://naukrigulf.com/jobs/view/ng-2",
        source: "Naukrigulf",
        postedDate: new Date().toISOString(),
        matchScore: 0, // Will be calculated later
        category: "ESG/Climate",
        contacts: [],
        status: "new",
        scraped: true
      }
    ];
  }

  /**
   * Calculate match scores for jobs based on profile
   * @param jobs List of jobs
   * @param profile User profile
   * @private
   */
  private calculateJobMatches(jobs: JobListing[], profile: UserProfile): JobListing[] {
    return jobs.map(job => {
      const matchScore = this.calculateMatchScore(job, profile);
      
      return {
        ...job,
        matchScore
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  }

  /**
   * Calculate match score for a single job
   * @param job The job listing
   * @param profile User profile
   * @private
   */
  private calculateMatchScore(job: JobListing, profile: UserProfile): number {
    let score = 0;
    
    // Check job title matches
    profile.jobPreferences.roles.forEach(role => {
      if (job.title.toLowerCase().includes(role.toLowerCase())) {
        score += 20;
      }
    });
    
    // Check requirements matches with skills
    profile.skills.forEach(skill => {
      if (job.requirements.some(req => req.toLowerCase().includes(skill.toLowerCase()))) {
        score += 5;
      }
      // Also check if skill is mentioned in description
      if (job.description.toLowerCase().includes(skill.toLowerCase())) {
        score += 3;
      }
    });
    
    // Location preference match
    if (profile.jobPreferences.locations.some(loc => 
        job.location.toLowerCase().includes(loc.toLowerCase())
    )) {
      score += 15;
    }
    
    // Remote preference match
    if (profile.jobPreferences.remotePreference === 'remote' && 
        job.location.toLowerCase().includes('remote')) {
      score += 15;
    }
    
    // Cap the score at 100
    return Math.min(100, score);
  }
}
