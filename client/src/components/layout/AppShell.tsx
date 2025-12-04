import { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

interface AppShellProps {
  children: ReactNode;
  hideNavbar?: boolean;
  hideFooter?: boolean;
  className?: string;
}

export function AppShell({ 
  children, 
  hideNavbar = false, 
  hideFooter = false,
  className = ""
}: AppShellProps) {
  return (
    <div className={`min-h-screen flex flex-col bg-background ${className}`}>
      {!hideNavbar && <Navbar />}
      
      <main className="flex-1 flex flex-col">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      
      {!hideFooter && <Footer />}
    </div>
  );
}
