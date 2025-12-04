import { Globe, Twitter, Linkedin, Github } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-1 md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-6 h-6 rounded bg-primary/10">
                <Globe className="w-4 h-4 text-primary" />
              </div>
              <span className="font-heading font-bold text-lg text-text-main">
                VerifyMe.world
              </span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              The global standard for tamper-proof credentials. Secure, instant, and borderless verification for everyone.
            </p>
            <div className="flex space-x-4 pt-2">
              <SocialIcon icon={Twitter} />
              <SocialIcon icon={Linkedin} />
              <SocialIcon icon={Github} />
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-text-main mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="hover:text-primary cursor-pointer transition-colors">How it works</li>
              <li className="hover:text-primary cursor-pointer transition-colors">For Institutions</li>
              <li className="hover:text-primary cursor-pointer transition-colors">For Students</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Pricing</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text-main mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="hover:text-primary cursor-pointer transition-colors">Documentation</li>
              <li className="hover:text-primary cursor-pointer transition-colors">API Reference</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Community</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Help Center</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text-main mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Terms of Service</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Cookie Policy</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Compliance</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted">
            © 2025 VerifyMe.world Inc. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-xs text-text-muted">
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-accent mr-2"></span> Systems Operational</span>
            <span>v1.0.0 (Demo)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon: Icon }: { icon: any }) {
  return (
    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white text-text-muted transition-all cursor-pointer">
      <Icon size={16} />
    </div>
  );
}
