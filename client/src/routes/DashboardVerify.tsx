import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, CheckCircle, XCircle } from "lucide-react";
import { MOCK_CREDENTIALS } from "@/data/credentials";
import { MOCK_INSTITUTIONS } from "@/data/institutions";
import { formatDate, getStatusLabel } from "@/lib/formatters";
import { EmptyState } from "@/components/ui/EmptyState";

export default function DashboardVerify() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [searched, setSearched] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setIsSearching(true);
    setSearched(true);
    setResult(null);

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
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-text-main">Internal Verification</h1>
          <p className="text-text-muted">Verify candidate credentials against the global ledger.</p>
        </div>

        <form onSubmit={handleVerify} className="flex gap-2">
           <Input 
             placeholder="Enter Credential ID or Candidate Name..." 
             className="h-12 text-lg bg-surface border-border"
             value={query}
             onChange={(e) => setQuery(e.target.value)}
           />
           <Button type="submit" className="h-12 px-8 bg-primary hover:bg-primary-hover text-white" disabled={isSearching}>
             {isSearching ? <Loader2 className="animate-spin" /> : <Search />}
           </Button>
        </form>

        <div className="bg-surface rounded-xl border border-border min-h-[300px] p-6">
           {searched ? (
             isSearching ? (
               <div className="h-full flex items-center justify-center">
                 <Loader2 className="h-8 w-8 text-primary animate-spin" />
               </div>
             ) : result ? (
               <div className="space-y-6 animate-fade-in">
                  <div className={`p-4 rounded-lg flex items-center gap-3 ${result.status === 'valid' ? 'bg-accent/10 text-accent' : 'bg-destructive/10 text-destructive'}`}>
                    {result.status === 'valid' ? <CheckCircle /> : <XCircle />}
                    <span className="font-bold text-lg">{getStatusLabel(result.status)} Credential</span>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold text-text-main">{result.title}</h2>
                    <p className="text-lg text-primary">{result.holderName}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                     <div className="p-3 bg-background rounded border border-border">
                       <p className="text-text-muted text-xs">Issued By</p>
                       <p className="font-medium">{result.institution?.name}</p>
                     </div>
                     <div className="p-3 bg-background rounded border border-border">
                       <p className="text-text-muted text-xs">Date</p>
                       <p className="font-medium">{formatDate(result.issuedAt)}</p>
                     </div>
                     <div className="p-3 bg-background rounded border border-border">
                       <p className="text-text-muted text-xs">ID</p>
                       <p className="font-mono">{result.id}</p>
                     </div>
                     <div className="p-3 bg-background rounded border border-border">
                       <p className="text-text-muted text-xs">Chain</p>
                       <p className="font-medium">Ethereum Mainnet</p>
                     </div>
                  </div>
               </div>
             ) : (
               <EmptyState title="No Results" description="Could not find a credential matching that query." />
             )
           ) : (
             <EmptyState title="Ready to Search" description="Enter an ID above to check verification status." />
           )}
        </div>
      </div>
    </DashboardLayout>
  );
}
