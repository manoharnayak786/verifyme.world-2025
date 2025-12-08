import Link from 'next/link';
import { Shield } from 'lucide-react';
import { Button } from '@/client/src/components/ui/button';

export default function PrivacyPolicyPage() {
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

      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-[#9CA3AF] mb-8">Last updated: February 2025</p>

        <div className="space-y-8 text-[#9CA3AF] leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-[#F9FAFB] mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              VerifyMe.world collects information necessary to provide credential verification services:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Account Information:</strong> Username, email address, role selection</li>
              <li><strong>Credential Data:</strong> Names, titles, institution information, issue dates</li>
              <li><strong>Blockchain Hashes:</strong> Cryptographic hashes for verification (no personal data)</li>
              <li><strong>Usage Data:</strong> Access times, verification requests, IP addresses</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#F9FAFB] mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use collected information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Issue and verify credentials</li>
              <li>Maintain blockchain records for authenticity</li>
              <li>Provide customer support</li>
              <li>Improve our services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#F9FAFB] mb-4">3. Data Security</h2>
            <p>
              We implement industry-standard security measures including encryption, secure servers, and regular security audits. 
              Blockchain hashes provide tamper-proof verification without exposing personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#F9FAFB] mb-4">4. Data Sharing</h2>
            <p className="mb-4">
              We do not sell personal information. We may share data with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Issuing institutions (for credential validation)</li>
              <li>Authorized verifiers (with user consent)</li>
              <li>Legal authorities (when required by law)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#F9FAFB] mb-4">5. Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Request data corrections</li>
              <li>Delete your account</li>
              <li>Export your credentials</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#F9FAFB] mb-4">6. Contact Us</h2>
            <p>
              For privacy concerns or requests, contact us at: <a href="mailto:privacy@verifyme.world" className="text-[#3B82F6] hover:underline">privacy@verifyme.world</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
