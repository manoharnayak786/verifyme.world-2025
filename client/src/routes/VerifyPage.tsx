import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ShieldCheck, CheckCircle, XCircle, Loader2, Clock } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { MOCK_CREDENTIALS } from "@/data/credentials";
import { MOCK_INSTITUTIONS } from "@/data/institutions";
import { getStatusColor, getStatusLabel, formatDate } from "@/lib/formatters";
import { motion, AnimatePresence } from "framer-motion";

export default function VerifyPage() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setIsSearching(true);
    setHasSearched(true);
    setResult(null);

    // Simulate network delay
    setTimeout(() => {
      const credential = MOCK_CREDENTIALS.find(c => 
        c.id.toLowerCase() === query.toLowerCase() || 
        c.holderName.toLowerCase().includes(query.toLowerCase())
      );
      
      if (credential) {
        const institution = MOCK_INSTITUTIONS.find(i => i.id === credential.institutionId);
        setResult({ ...credential, institution });
      }
      
      setIsSearching(false);
    }, 1200);
  };

  const exampleIds = ["VFY-2024-8842", "VFY-2024-0055", "VFY-2025-0101"];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-6">Verify a Credential</h1>
          <p className="text-text-muted text-lg mb-8">
            Instantly verify the authenticity of any document issued on the VerifyMe network.
          </p>
          
          <form onSubmit={handleVerify} className="relative max-w-xl mx-auto">
             <div className="relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
               <Input 
                 className="pl-12 pr-4 h-14 text-lg bg-surface border-border rounded-full focus:ring-2 focus:ring-primary/50"
                 placeholder="Enter Credential ID, Hash, or URL..."
                 value={query}
                 onChange={(e) => setQuery(e.target.value)}
               />
             </div>
             <Button 
               type="submit" 
               className="absolute right-2 top-2 bottom-2 rounded-full px-6 bg-primary hover:bg-primary-hover text-white"
               disabled={isSearching}
             >
               {isSearching ? <Loader2 className="animate-spin" /> : "Verify"}
             </Button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-text-muted">
            <span>Try example:</span>
            {exampleIds.map(id => (
              <button 
                key={id}
                onClick={() => { setQuery(id); }}
                className="px-3 py-1 rounded-full bg-surface border border-border hover:border-primary hover:text-primary transition-colors"
              >
                {id}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto min-h-[400px]">
          <AnimatePresence mode="wait">
            {isSearching ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 space-y-4"
              >
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
                <p className="text-text-muted">Querying blockchain ledger...</p>
              </motion.div>
            ) : hasSearched && result ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl"
              >
                {/* Result Header */}
                <div className={`p-6 border-b border-border flex items-center justify-between ${
                  result.status === "valid" ? "bg-accent/5" : "bg-destructive/5"
                }`}>
                  <div className="flex items-center space-x-3">
                    {result.status === "valid" ? (
                      <CheckCircle className="text-accent h-6 w-6" />
                    ) : (
                      <XCircle className="text-destructive h-6 w-6" />
                    )}
                    <span className={`font-bold text-lg ${
                      result.status === "valid" ? "text-accent" : "text-destructive"
                    }`}>
                      {getStatusLabel(result.status)} Credential
                    </span>
                  </div>
                  <span className="font-mono text-xs text-text-muted">{result.id}</span>
                </div>

                {/* Result Body */}
                <div className="p-8 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-text-main">{result.title}</h3>
                    <p className="text-primary font-medium text-lg mt-1">{result.holderName}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-xs text-text-muted uppercase tracking-wider">Issued By</p>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-white text-black rounded flex items-center justify-center font-bold text-xs">
                          {result.institution?.logoInitials || "UN"}
                        </div>
                        <span className="font-medium">{result.institution?.name || "Unknown Institution"}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-text-muted uppercase tracking-wider">Issue Date</p>
                      <p className="font-medium">{formatDate(result.issuedAt)}</p>
                    </div>
                  </div>
                  
                  {/* Timeline / Events Mock */}
                  <div className="pt-6 border-t border-border">
                     <p className="text-sm font-bold mb-4">Verification History</p>
                     <div className="space-y-4">
                       <div className="flex gap-3">
                         <div className="mt-1">
                           <div className="w-2 h-2 rounded-full bg-primary"></div>
                           <div className="w-0.5 h-full bg-border mx-auto mt-1"></div>
                         </div>
                         <div className="text-sm pb-4">
                           <p className="text-text-main font-medium">Verified on-chain</p>
                           <p className="text-text-muted text-xs">{formatDate(result.issuedAt)} • Blockchain Timestamp</p>
                         </div>
                       </div>
                       <div className="flex gap-3">
                         <div className="mt-1">
                           <div className="w-2 h-2 rounded-full bg-text-muted"></div>
                         </div>
                         <div className="text-sm">
                           <p className="text-text-main font-medium">Issued by {result.institution?.name}</p>
                           <p className="text-text-muted text-xs">{formatDate(result.issuedAt)}</p>
                         </div>
                       </div>
                     </div>
                  </div>
                </div>
              </motion.div>
            ) : hasSearched && !result ? (
              <EmptyState 
                title="Credential Not Found" 
                description={`We could not find any credential with ID "${query}". Please check the ID and try again.`}
                action={<Button variant="outline" onClick={() => setQuery("")}>Clear Search</Button>}
              />
            ) : (
              <EmptyState 
                title="Ready to Verify" 
                description="Enter a credential ID to view its live status on the blockchain."
                icon={<ShieldCheck className="h-8 w-8 text-primary" />}
              />
            )}
          </AnimatePresence>
        </div>

      </main>
      <Footer />
    </div>
  );
}
