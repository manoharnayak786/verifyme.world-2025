import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Globe, Users, CheckCircle, Building2, GraduationCap, FileCheck, Search } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import heroBg from "@assets/generated_images/abstract_network_nodes_and_connections_blue_background.png";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background z-10"></div>
           <img 
             src={heroBg} 
             alt="Background" 
             className="w-full h-full object-cover opacity-20 animate-pulse-slow"
           />
        </div>

        <div className="container relative z-20 mx-auto px-4 md:px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm mb-4">
              <span className="flex h-2 w-2 rounded-full bg-accent mr-2 animate-pulse"></span>
              Live: Global Blockchain Verification
            </div>
            
            <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400">
              The global standard for <br className="hidden md:block" /> tamper-proof credentials.
            </h1>
            
            <p className="text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
              Issue, share, and verify degrees, certificates, and achievements instantly. 
              Powered by blockchain for unforgeable trust.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link href="/auth">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary-hover shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] transition-all">
                  Launch live demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/verify">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-white/5 text-text-main">
                  Verify a credential
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Demo Card Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-20 mx-auto max-w-3xl"
          >
            <div className="glass-panel rounded-2xl p-1 border border-white/10 shadow-2xl relative">
               <div className="absolute -top-4 -right-4 bg-accent text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
                 Live Demo
               </div>
               <div className="bg-surface/80 rounded-xl p-6 md:p-8 text-left backdrop-blur-sm">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-lg bg-white flex items-center justify-center text-black font-bold text-2xl">GU</div>
                      <div>
                        <h3 className="text-xl font-bold text-text-main">Jane Doe</h3>
                        <p className="text-primary">B.Sc Computer Science</p>
                        <p className="text-sm text-text-muted">Global University • Issued 2024-06-01</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
                      <CheckCircle size={16} className="text-accent" />
                      <span className="text-sm font-medium text-accent">Verified On-Chain</span>
                    </div>
                  </div>
                  <div className="mt-6 h-2 bg-border rounded-full overflow-hidden">
                    <div className="h-full w-full bg-primary/50 rounded-full animate-pulse"></div>
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-text-muted font-mono">
                    <span>Hash: 0x7f83...9069</span>
                    <span>Block: #1829402</span>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-surface border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Simple, Secure, Standardized</h2>
            <p className="text-text-muted text-lg">A unified verification layer that works for everyone in the ecosystem.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Building2 className="text-blue-400" size={32} />}
              title="Issue"
              description="Institutions issue tamper-proof digital credentials linked to a student's identity on the blockchain."
            />
            <FeatureCard 
              icon={<GraduationCap className="text-purple-400" size={32} />}
              title="Share"
              description="Students build a verified portfolio and share credentials instantly with a simple link or QR code."
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-green-400" size={32} />}
              title="Verify"
              description="Employers and universities verify authenticity in seconds. No emails, no phone calls, no fraud."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Credentials Issued" value="12,450+" icon={<FileCheck size={20}/>} className="bg-surface/50" />
            <StatCard title="Global Partners" value="80+" icon={<Globe size={20}/>} className="bg-surface/50" />
            <StatCard title="Verification Time" value="< 3 sec" icon={<Search size={20}/>} className="bg-surface/50" trend="Industry Leading" trendUp={true} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-background border border-border hover:border-primary/50 transition-colors group">
      <div className="mb-6 p-4 rounded-xl bg-surface w-fit group-hover:scale-110 transition-transform duration-300 border border-border">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-text-main">{title}</h3>
      <p className="text-text-muted leading-relaxed">
        {description}
      </p>
    </div>
  );
}
