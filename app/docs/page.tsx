import Link from 'next/link';
import { Shield, Code, Key, CheckCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-[#F9FAFB]">
      <nav className="border-b border-[#1F2937] bg-[#0B1120]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-[#3B82F6]" />
            <span className="text-xl font-bold">VerifyMe<span className="text-[#3B82F6]">.world</span></span>
          </Link>
          <Link href="/"><Button variant="outline" size="sm">Back to Home</Button></Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Documentation</h1>
          <p className="text-xl text-[#9CA3AF]">Everything you need to get started with VerifyMe.world</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card className="border-[#1F2937] bg-[#0B1120] hover:border-[#3B82F6] transition-colors">
            <CardContent className="p-6">
              <FileText className="h-10 w-10 text-[#3B82F6] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quick Start</h3>
              <p className="text-[#9CA3AF] mb-4">Get up and running in 5 minutes</p>
              <Link href="#quick-start" className="text-[#3B82F6] hover:underline text-sm">Read guide →</Link>
            </CardContent>
          </Card>

          <Card className="border-[#1F2937] bg-[#0B1120] hover:border-[#3B82F6] transition-colors">
            <CardContent className="p-6">
              <Code className="h-10 w-10 text-[#3B82F6] mb-4" />
              <h3 className="text-xl font-semibold mb-2">API Reference</h3>
              <p className="text-[#9CA3AF] mb-4">Complete API documentation</p>
              <Link href="/api-reference" className="text-[#3B82F6] hover:underline text-sm">View API docs →</Link>
            </CardContent>
          </Card>

          <Card className="border-[#1F2937] bg-[#0B1120] hover:border-[#3B82F6] transition-colors">
            <CardContent className="p-6">
              <CheckCircle className="h-10 w-10 text-[#3B82F6] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Best Practices</h3>
              <p className="text-[#9CA3AF] mb-4">Tips for credential management</p>
              <Link href="#best-practices" className="text-[#3B82F6] hover:underline text-sm">Learn more →</Link>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          <section id="quick-start">
            <h2 className="text-3xl font-bold mb-6">Quick Start Guide</h2>
            <div className="space-y-6 text-[#9CA3AF]">
              <div>
                <h3 className="text-xl font-semibold text-[#F9FAFB] mb-3">1. Create an Account</h3>
                <p className="mb-2">Sign up at VerifyMe.world and choose your role:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Learner:</strong> Receive and manage credentials</li>
                  <li><strong>Issuer:</strong> Create and issue certificates</li>
                  <li><strong>Verifier:</strong> Verify credential authenticity</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#F9FAFB] mb-3">2. Set Up Your Institution (Issuers)</h3>
                <p>Navigate to Settings → Institution and provide:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Institution name and country</li>
                  <li>Logo/initials for branding</li>
                  <li>Institution type</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#F9FAFB] mb-3">3. Issue Your First Credential</h3>
                <div className="bg-[#0B1120] p-4 rounded-lg font-mono text-sm mt-3">
                  <p className="text-[#22C55E]">// Navigate to Dashboard → Credentials → Issue</p>
                  <p className="mt-2">1. Enter holder name and certificate title</p>
                  <p>2. Use AI suggestion for professional descriptions</p>
                  <p>3. Set issue date and country</p>
                  <p>4. Click "Issue Credential"</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#F9FAFB] mb-3">4. Verify Credentials</h3>
                <p>Anyone can verify credentials by:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Entering credential ID at /verify</li>
                  <li>Scanning the QR code on the certificate PDF</li>
                  <li>Using our API (see API Reference)</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="best-practices">
            <h2 className="text-3xl font-bold mb-6">Best Practices</h2>
            <div className="space-y-4 text-[#9CA3AF]">
              <Card className="border-[#1F2937] bg-[#0B1120]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-[#F9FAFB] mb-2">✓ Always verify holder identity before issuing</h3>
                  <p>Ensure recipients have completed required coursework or achievements</p>
                </CardContent>
              </Card>

              <Card className="border-[#1F2937] bg-[#0B1120]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-[#F9FAFB] mb-2">✓ Use clear, professional certificate titles</h3>
                  <p>Avoid abbreviations or informal language in credential titles</p>
                </CardContent>
              </Card>

              <Card className="border-[#1F2937] bg-[#0B1120]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-[#F9FAFB] mb-2">✓ Set expiration dates when appropriate</h3>
                  <p>For time-sensitive certifications, always include expiry dates</p>
                </CardContent>
              </Card>

              <Card className="border-[#1F2937] bg-[#0B1120]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-[#F9FAFB] mb-2">✓ Revoke credentials promptly when needed</h3>
                  <p>If a credential becomes invalid, update its status immediately</p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
