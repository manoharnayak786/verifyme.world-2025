import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShieldCheck, CheckCircle, AlertTriangle, Loader2, ArrowRight, Award } from "lucide-react";
import { useLocation } from "wouter";
import { MOCK_CERTIFICATES } from "@/lib/mockData";
import { CertificateRender } from "@/components/verification/CertificateRender";
import { motion, AnimatePresence } from "framer-motion";

export default function Verify() {
  const [location, setLocation] = useLocation();
  
  // Extract ID from URL path if present (simple check, wouter usually handles this via route params but we can grab from search or manual logic)
  // Ideally this page is at /verify/:id? but for now let's assume /verify handles both input and result
  const pathParts = location.split('/');
  const urlId = pathParts[2]; // /verify/ID

  const [searchId, setSearchId] = useState(urlId || "");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [result, setResult] = useState<any>(null);

  // Effect to auto-verify if URL has ID
  // Skipping for simplicity in this mockup, user will hit enter

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId) return;

    setStatus("loading");
    
    // Simulate API/Blockchain Delay
    setTimeout(() => {
      const cert = MOCK_CERTIFICATES.find(c => c.id === searchId);
      if (cert) {
        setResult(cert);
        setStatus("success");
      } else {
        setResult(null);
        setStatus("error");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container py-12 md:py-20">
        
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4"
          >
            <ShieldCheck className="h-8 w-8 text-primary" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
            Verify Credential Authenticity
          </h1>
          <p className="text-lg text-muted-foreground">
            Enter the Certificate ID to instantly verify its validity on the blockchain.
          </p>

          <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mt-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="e.g. VFY-2025-8842" 
                className="pl-10 h-12 text-lg"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
            </div>
            <Button type="submit" size="lg" className="h-12 px-8 text-lg" disabled={status === "loading"}>
              {status === "loading" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Verify Now"}
            </Button>
          </form>
        </div>

        <AnimatePresence mode="wait">
          {status === "error" && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-md mx-auto bg-destructive/10 border border-destructive/20 p-6 rounded-lg text-center space-y-4"
            >
              <div className="bg-destructive/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle className="text-destructive h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-destructive">Verification Failed</h3>
                <p className="text-muted-foreground mt-2">
                  We could not find a certificate with ID <strong>{searchId}</strong>. It may be invalid or revoked.
                </p>
              </div>
              <Button variant="outline" onClick={() => setStatus("idle")}>Try Again</Button>
            </motion.div>
          )}

          {status === "success" && result && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Trust Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-lg flex items-center space-x-3">
                  <CheckCircle className="text-emerald-600 h-5 w-5" />
                  <div>
                    <p className="text-xs text-emerald-600/80 font-bold uppercase">Status</p>
                    <p className="font-semibold text-emerald-700">Valid & Active</p>
                  </div>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg flex items-center space-x-3">
                  <ShieldCheck className="text-blue-600 h-5 w-5" />
                  <div>
                    <p className="text-xs text-blue-600/80 font-bold uppercase">Blockchain Record</p>
                    <p className="font-semibold text-blue-700">Verified On-Chain</p>
                  </div>
                </div>
                <div className="bg-slate-100 border border-slate-200 p-4 rounded-lg flex items-center space-x-3">
                  <Award className="text-slate-600 h-5 w-5" />
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">Issuer</p>
                    <p className="font-semibold text-slate-700">{result.issuerName}</p>
                  </div>
                </div>
              </div>

              {/* The Certificate */}
              <div className="flex justify-center p-4 bg-slate-50 rounded-xl border shadow-inner">
                <CertificateRender certificate={result} />
              </div>

              <div className="text-center">
                 <Button variant="outline" size="lg" onClick={() => setStatus("idle")}>
                   Verify Another
                 </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
      <Footer />
    </div>
  );
}
