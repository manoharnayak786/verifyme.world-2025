import { ShieldCheck, Lock, Globe, Award } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t py-12 mt-auto">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <span className="font-heading text-lg font-bold">VerifyMe.world</span>
          </div>
          <p className="text-sm text-muted-foreground">
            The global trust layer for academic and professional credentials. Secure, tamperproof, and instant.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Platform</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>For Institutions</li>
            <li>For Students</li>
            <li>For Recruiters</li>
            <li>Pricing</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Resources</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Documentation</li>
            <li>API Reference</li>
            <li>Case Studies</li>
            <li>Help Center</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Compliance</li>
          </ul>
        </div>
      </div>
      <div className="container mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
        © 2025 VerifyMe.world. All rights reserved. Built on Replit.
      </div>
    </footer>
  );
}
