import Link from 'next/link';
import { Shield } from 'lucide-react';
import { Button } from '@/client/src/components/ui/button';

export default function TermsPage() {
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
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-[#9CA3AF] mb-8">Last updated: February 2025</p>

        <div className="space-y-8 text-[#9CA3AF] leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-[#F9FAFB] mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using VerifyMe.world, you agree to be bound by these Terms of Service. 
              If you disagree with any part of these terms, you may not access the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#F9FAFB] mb-4">2. Service Description</h2>
            <p className="mb-4">
              VerifyMe.world provides a platform for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Issuing digital credentials with blockchain verification</li>
              <li>Verifying credential authenticity</li>
              <li>Managing institutional credential workflows</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#F9FAFB] mb-4">3. User Responsibilities</h2>
            <p className="mb-4">As a user, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate information when issuing credentials</li>
              <li>Maintain the security of your account</li>
              <li>Not issue fraudulent or misleading credentials</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not attempt to compromise system security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#F9FAFB] mb-4">4. Issuer Obligations</h2>
            <p className="mb-4">If you issue credentials, you certify that:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You have authority to issue credentials on behalf of your institution</li>
              <li>Credential information is accurate and verifiable</li>
              <li>You will promptly revoke credentials if they become invalid</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#F9FAFB] mb-4">5. Intellectual Property</h2>
            <p>
              The VerifyMe.world platform, design, and technology are protected by intellectual property laws. 
              Users retain ownership of their credential content while granting us license to store and display it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#F9FAFB] mb-4">6. Limitation of Liability</h2>
            <p>
              VerifyMe.world provides services "as is" without warranties. We are not liable for credential accuracy, 
              system downtime, or consequential damages. Users rely on verification results at their own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#F9FAFB] mb-4">7. Termination</h2>
            <p>
              We reserve the right to suspend or terminate accounts for violations of these terms, 
              fraudulent activity, or legal requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#F9FAFB] mb-4">8. Changes to Terms</h2>
            <p>
              We may update these terms periodically. Continued use after changes constitutes acceptance of new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#F9FAFB] mb-4">9. Contact Information</h2>
            <p>
              For questions about these terms, contact: <a href="mailto:legal@verifyme.world" className="text-[#3B82F6] hover:underline">legal@verifyme.world</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
