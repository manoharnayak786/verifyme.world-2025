import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck, FileCheck, Users, Lock, Zap, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import heroBg from "@assets/generated_images/abstract_network_nodes_and_connections_blue_background.png";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Background" 
            className="w-full h-full object-cover opacity-10 dark:opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center rounded-full border bg-background/50 px-3 py-1 text-sm font-medium backdrop-blur-sm text-primary border-primary/20">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              VerifyMe.world V1.0 Live
            </div>
            
            <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              The Global Trust Layer <br /> for Certificates
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
              Issue tamperproof, blockchain-verified credentials instantly. 
              The "Aadhaar" for student achievements and professional qualifications.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/dashboard">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/20">
                  Start Issuing Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/verify">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80">
                  Verify a Certificate
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Why VerifyMe?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We solve the problem of fake credentials with a 3-layered verification system designed for speed, security, and scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<FileCheck className="h-10 w-10 text-blue-500" />}
              title="Instant Issuance"
              description="Create thousands of certificates in minutes using our bulk upload tools or API. No coding required."
            />
            <FeatureCard 
              icon={<Lock className="h-10 w-10 text-emerald-500" />}
              title="Tamperproof Security"
              description="Every certificate is hashed and stored on the blockchain. Mathematically impossible to fake."
            />
            <FeatureCard 
              icon={<Zap className="h-10 w-10 text-amber-500" />}
              title="Universal Verification"
              description="Verifiers can check authenticity instantly via QR code or ID. No more email trails."
            />
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-20 border-y bg-white dark:bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <Stat number="10k+" label="Certificates Issued" />
            <Stat number="50+" label="Partner Institutions" />
            <Stat number="100%" label="Uptime Reliability" />
            <Stat number="<1s" label="Verification Time" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover' }}></div>
        <div className="container px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Ready to secure your credentials?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join the network of forward-thinking institutions building the future of digital trust.
          </p>
          <Link href="/dashboard">
            <Button size="lg" variant="secondary" className="h-14 px-8 text-lg rounded-full shadow-xl">
              Create Institution Account
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <div className="mb-4 p-3 bg-background rounded-2xl w-fit shadow-sm border">
          {icon}
        </div>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

function Stat({ number, label }: { number: string, label: string }) {
  return (
    <div className="space-y-2">
      <div className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">{number}</div>
      <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{label}</div>
    </div>
  );
}
