import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Menu, X, Globe } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <Sidebar />

      {/* Mobile Header & Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden h-16 border-b border-border bg-surface flex items-center justify-between px-4 sticky top-0 z-40">
          <Link href="/" className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-primary" />
            <span className="font-heading font-bold text-lg">VerifyMe</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </header>

        {/* Mobile Menu Overlay - simplified reuse of Sidebar logic could go here but for speed just a placeholder if needed */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-30 bg-background/95 backdrop-blur-sm pt-16">
            {/* Re-implement simple mobile nav list if strictly needed, 
                but for this mockup assuming desktop-first responsive behavior 
                where the Sidebar component might be made responsive later. 
                For now, let's just suggest using Desktop for dashboard. */}
             <div className="p-6 text-center">
                <p className="text-text-muted">Mobile dashboard navigation is simplified for this demo.</p>
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="mt-4 w-full">Overview</Button>
                </Link>
                <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="mt-4 w-full">Switch Role / Logout</Button>
                </Link>
             </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
