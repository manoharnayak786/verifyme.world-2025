'use client';

import { useState } from 'react';
import { Button } from '@/client/src/components/ui/button';
import { Input } from '@/client/src/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/client/src/components/ui/card';
import { Badge } from '@/client/src/components/ui/badge';
import { Search, CheckCircle2, XCircle, AlertCircle, Shield } from 'lucide-react';
import Link from 'next/link';

export default function VerifyPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(`/api/credentials/${searchQuery}`);
      
      if (response.status === 404) {
        setError('Credential not found. Please check the ID and try again.');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to verify credential');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('An error occurred while verifying. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid':
        return <CheckCircle2 className="h-5 w-5 text-[#22C55E]" />;
      case 'revoked':
        return <XCircle className="h-5 w-5 text-[#EF4444]" />;
      case 'expired':
        return <AlertCircle className="h-5 w-5 text-[#F97316]" />;
      default:
        return <AlertCircle className="h-5 w-5 text-[#9CA3AF]" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      valid: 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20',
      revoked: 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20',
      expired: 'bg-[#F97316]/10 text-[#F97316] border-[#F97316]/20',
      pending: 'bg-[#9CA3AF]/10 text-[#9CA3AF] border-[#9CA3AF]/20',
    };

    return (
      <Badge className={variants[status] || variants.pending}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-[#030712] text-[#F9FAFB]">
      {/* Navbar */}
      <nav className="border-b border-[#1F2937] bg-[#0B1120]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-[#3B82F6]" />
            <span className="text-xl font-bold">VerifyMe<span className="text-[#3B82F6]">.world</span></span>
          </Link>
          <Link href="/auth/signin">
            <Button size="sm" className="bg-[#3B82F6] hover:bg-[#2563EB]">Dashboard</Button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Verify a Credential</h1>
          <p className="text-[#9CA3AF] text-lg">Enter a credential ID to verify its authenticity instantly</p>
        </div>

        {/* Search Box */}
        <div className="flex gap-3 mb-8" data-testid="verification-search-input">
          <Input
            placeholder="Enter credential ID (e.g., VFY-2025-1001)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="bg-[#0B1120] border-[#1F2937] text-[#F9FAFB] placeholder:text-[#9CA3AF]"
          />
          <Button
            onClick={handleSearch}
            disabled={loading}
            className="bg-[#3B82F6] hover:bg-[#2563EB]"
            data-testid="verification-search-button"
          >
            {loading ? 'Verifying...' : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Verify
              </>
            )}
          </Button>
        </div>

        {/* Example IDs */}
        {!result && !error && (
          <div className="text-center mb-8">
            <p className="text-sm text-[#9CA3AF] mb-3">Try these example IDs:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['VFY-2025-1001', 'VFY-2024-5678'].map((id) => (
                <button
                  key={id}
                  onClick={() => setSearchQuery(id)}
                  className="px-3 py-1 text-sm bg-[#0B1120] border border-[#1F2937] rounded-md hover:border-[#3B82F6] transition"
                >
                  {id}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card className="border-[#EF4444]/20 bg-[#EF4444]/5">
            <CardContent className="p-6 flex items-center gap-3">
              <XCircle className="h-5 w-5 text-[#EF4444] flex-shrink-0" />
              <p className="text-[#EF4444]">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Result Card */}
        {result && (
          <Card className="border-[#1F2937] bg-[#0B1120]/60 backdrop-blur-md" data-testid="verification-result-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Verification Result</CardTitle>
                {getStatusBadge(result.credential.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#9CA3AF] mb-1">Holder Name</p>
                  <p className="font-semibold">{result.credential.holderName}</p>
                </div>
                <div>
                  <p className="text-sm text-[#9CA3AF] mb-1">Certificate Title</p>
                  <p className="font-semibold">{result.credential.title}</p>
                </div>
                <div>
                  <p className="text-sm text-[#9CA3AF] mb-1">Issued By</p>
                  <p className="font-semibold">{result.credential.institution?.name || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-sm text-[#9CA3AF] mb-1">Issue Date</p>
                  <p className="font-semibold">{new Date(result.credential.issuedAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-[#9CA3AF] mb-1">Country</p>
                  <p className="font-semibold">{result.credential.country}</p>
                </div>
                <div>
                  <p className="text-sm text-[#9CA3AF] mb-1">On-Chain Status</p>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(result.credential.status)}
                    <span className="font-semibold">
                      {result.credential.onChain ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>

              {result.blockchainEvents && result.blockchainEvents.length > 0 && (
                <div className="pt-4 border-t border-[#1F2937]">
                  <p className="text-sm text-[#9CA3AF] mb-3">Blockchain Events</p>
                  <div className="space-y-2">
                    {result.blockchainEvents.slice(0, 3).map((event: any) => (
                      <div key={event.id} className="text-sm bg-[#0B1120] p-3 rounded-md">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs text-[#9CA3AF]">
                            TxID: {event.txId.substring(0, 16)}...
                          </span>
                          <Badge className="bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20">
                            {event.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {result.credential.pdfBase64 && (
                <div className="pt-4">
                  <a
                    href={`data:application/pdf;base64,${result.credential.pdfBase64}`}
                    download={`${result.credential.id}.pdf`}
                    className="inline-block"
                  >
                    <Button className="bg-[#3B82F6] hover:bg-[#2563EB]">
                      Download Certificate PDF
                    </Button>
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
