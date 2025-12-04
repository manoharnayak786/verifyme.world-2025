import { useLocation, Link } from "wouter";
import { 
  LayoutDashboard, 
  FileCheck, 
  Search, 
  BarChart3, 
  Settings, 
  LogOut, 
  Globe,
  User,
  Building2,
  ShieldCheck
} from "lucide-react";
import { useUserRole } from "@/context/UserRoleContext";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const [location] = useLocation();
  const { userRole, setUserRole } = useUserRole();

  const handleLogout = () => {
    setUserRole(null);
    window.location.href = "/auth";
  };

  const roleLabel = {
    learner: "Learner",
    issuer: "Issuer",
    verifier: "Verifier"
  }[userRole || "learner"];

  const roleIcon = {
    learner: User,
    issuer: Building2,
    verifier: ShieldCheck
  }[userRole || "learner"];

  const RoleIcon = roleIcon;

  const menuItems = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard, roles: ["learner", "issuer", "verifier"] },
    { href: "/dashboard/credentials", label: "Credentials", icon: FileCheck, roles: ["learner", "issuer"] },
    { href: "/dashboard/verify", label: "Verify", icon: Search, roles: ["verifier", "issuer"] },
    { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3, roles: ["issuer"] },
    { href: "/dashboard/settings", label: "Settings", icon: Settings, roles: ["learner", "issuer", "verifier"] },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(userRole || ""));

  return (
    <aside className="w-64 bg-surface border-r border-border hidden md:flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center space-x-2 cursor-pointer">
          <Globe className="w-6 h-6 text-primary" />
          <span className="font-heading font-bold text-lg text-text-main">
            VerifyMe
          </span>
        </Link>
      </div>

      <div className="flex-1 py-6 px-4 space-y-1">
        <div className="mb-6 px-2">
           <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-center space-x-3">
             <div className="p-1.5 bg-primary/20 rounded text-primary">
               <RoleIcon size={16} />
             </div>
             <div>
               <p className="text-xs text-text-muted uppercase font-semibold tracking-wider">Role</p>
               <p className="text-sm font-medium text-text-main">{roleLabel}</p>
             </div>
           </div>
        </div>

        {filteredItems.map((item) => {
          const isActive = location === item.href; // Exact match for simplicity, or generic check
          return (
            <Link key={item.href} href={item.href}>
              <div className={cn(
                "flex items-center space-x-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors group",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-text-muted hover:bg-white/5 hover:text-text-main"
              )}>
                <item.icon size={18} className={cn(isActive ? "text-primary" : "text-text-muted group-hover:text-text-main")} />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-3 mb-4 px-2">
          <Avatar className="h-8 w-8 border border-border">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">Demo User</p>
            <p className="text-xs text-text-muted truncate">demo@verifyme.world</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-text-muted hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut size={16} className="mr-2" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}
