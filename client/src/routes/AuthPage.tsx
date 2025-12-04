import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Globe, User, Building2, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserRole, UserRole } from "@/context/UserRoleContext";
import { motion } from "framer-motion";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const { setUserRole } = useUserRole();
  const [location, setLocation] = useLocation();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      setUserRole(selectedRole);
      setLocation("/dashboard");
    }
  };

  const RoleCard = ({ role, icon: Icon, label, desc }: { role: UserRole, icon: any, label: string, desc: string }) => (
    <div 
      className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
        selectedRole === role 
          ? "bg-primary/10 border-primary ring-1 ring-primary" 
          : "bg-surface border-border hover:border-primary/50"
      }`}
      onClick={() => setSelectedRole(role)}
    >
      <div className="flex items-center space-x-3 mb-2">
        <div className={`p-2 rounded-lg ${selectedRole === role ? "bg-primary text-white" : "bg-white/5 text-text-muted"}`}>
          <Icon size={20} />
        </div>
        <span className="font-bold text-text-main">{label}</span>
      </div>
      <p className="text-xs text-text-muted">{desc}</p>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Left: Brand Panel */}
      <div className="hidden md:flex md:w-1/2 bg-surface border-r border-border flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        
        <Link href="/" className="relative z-10 flex items-center space-x-2">
          <Globe className="w-6 h-6 text-primary" />
          <span className="font-heading font-bold text-xl">VerifyMe.world</span>
        </Link>

        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-heading font-bold mb-6 leading-tight">
            Welcome to the Future of <br /> <span className="text-primary">Digital Trust</span>.
          </h1>
          <p className="text-text-muted text-lg leading-relaxed">
            Join thousands of institutions and learners building a verified professional world.
          </p>
        </div>

        <div className="relative z-10 text-sm text-text-muted">
          © 2025 VerifyMe.world
        </div>
      </div>

      {/* Right: Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-text-main">Get started with the demo</h2>
            <p className="text-text-muted mt-2">Select a persona to explore the platform.</p>
          </div>

          {/* Mock Tabs */}
          <div className="grid grid-cols-2 gap-1 bg-surface p-1 rounded-lg border border-border">
            <button 
              onClick={() => setActiveTab("login")}
              className={`py-2 text-sm font-medium rounded-md transition-all ${activeTab === "login" ? "bg-white/10 text-white shadow-sm" : "text-text-muted hover:text-white"}`}
            >
              Log in
            </button>
            <button 
              onClick={() => setActiveTab("signup")}
              className={`py-2 text-sm font-medium rounded-md transition-all ${activeTab === "signup" ? "bg-white/10 text-white shadow-sm" : "text-text-muted hover:text-white"}`}
            >
              Sign up
            </button>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            
            <div className="space-y-3">
              <label className="text-sm font-medium text-text-muted">Choose your Role</label>
              <div className="grid grid-cols-1 gap-3">
                <RoleCard 
                  role="learner" 
                  icon={User} 
                  label="Learner / Candidate" 
                  desc="I want to view and share my credentials." 
                />
                <RoleCard 
                  role="issuer" 
                  icon={Building2} 
                  label="Institution / Issuer" 
                  desc="I want to issue and manage certificates." 
                />
                <RoleCard 
                  role="verifier" 
                  icon={ShieldCheck} 
                  label="Recruiter / Verifier" 
                  desc="I want to verify candidates' claims." 
                />
              </div>
            </div>

            <div className="space-y-4">
               <div className="space-y-2">
                 <label className="text-sm font-medium text-text-muted">Email Address</label>
                 <Input placeholder="demo@example.com" className="bg-surface border-border" readOnly value="demo@example.com" />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-medium text-text-muted">Password</label>
                 <Input type="password" placeholder="••••••••" className="bg-surface border-border" readOnly value="password" />
               </div>
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full bg-primary hover:bg-primary-hover text-white h-12"
              disabled={!selectedRole}
            >
              Continue to Demo Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
