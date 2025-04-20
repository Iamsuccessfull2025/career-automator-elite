
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Settings, 
  UserCircle, 
  Menu, 
  X,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5 mr-3" /> },
    { path: "/jobs", label: "Job Listings", icon: <Briefcase className="h-5 w-5 mr-3" /> },
    { path: "/applications", label: "Applications", icon: <FileText className="h-5 w-5 mr-3" /> },
    { path: "/profile", label: "My Profile", icon: <UserCircle className="h-5 w-5 mr-3" /> },
    { path: "/settings", label: "Settings", icon: <Settings className="h-5 w-5 mr-3" /> },
  ];

  const NavLink = ({ path, label, icon }: { path: string; label: string; icon: React.ReactNode }) => {
    const isActive = location.pathname === path;
    
    return (
      <Link 
        to={path} 
        onClick={() => setOpen(false)}
        className={`flex items-center px-3 py-2 rounded-md mb-1 transition-colors ${
          isActive 
            ? "bg-primary text-primary-foreground" 
            : "hover:bg-secondary text-muted-foreground hover:text-foreground"
        }`}
      >
        {icon}
        <span>{label}</span>
        {label === "Job Listings" && (
          <Badge variant="secondary" className="ml-auto bg-primary/20 text-primary">12</Badge>
        )}
      </Link>
    );
  };

  const SideNav = () => (
    <div className="py-6 px-4 space-y-6">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-primary mb-1">CareerElite</h1>
        <p className="text-sm text-muted-foreground">Job Application Automator</p>
      </div>
      <nav>
        {navItems.map((item) => (
          <NavLink key={item.path} {...item} />
        ))}
      </nav>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {!isMobile && (
        <motion.aside 
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          className="fixed left-0 top-0 z-30 h-full w-64 border-r bg-card"
        >
          <SideNav />
        </motion.aside>
      )}
      
      <div className={`flex-1 ${!isMobile ? "ml-64" : ""}`}>
        <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
          <div className="flex h-16 items-center px-4 sm:px-6">
            {isMobile && (
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="mr-4">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 sm:max-w-xs p-0">
                  <SideNav />
                </SheetContent>
              </Sheet>
            )}
            <div className="flex justify-between w-full">
              {isMobile && (
                <h1 className="text-xl font-bold">CareerElite</h1>
              )}
              <div className="ml-auto flex items-center">
                <Button variant="ghost" size="icon" className="relative mr-2">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
                </Button>
                <Button variant="secondary" size="sm" className="ml-2">
                  <UserCircle className="h-4 w-4 mr-1" />
                  Profile
                </Button>
              </div>
            </div>
          </div>
        </header>
        <main className="p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
