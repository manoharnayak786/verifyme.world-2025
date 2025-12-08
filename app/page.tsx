import Link from 'next/link';
import { Button } from '@/client/src/components/ui/button';
import { Card, CardContent } from '@/client/src/components/ui/card';
import { Badge } from '@/client/src/components/ui/badge';
import { CheckCircle2, Shield, Zap, Globe, Users, FileCheck } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-[#F9FAFB]">
      {/* Navbar */}
      <nav className="border-b border-[#1F2937] bg-[#0B1120]/80 backdrop-blur-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-[#3B82F6]" />
            <span className="text-xl font-bold">VerifyMe<span className="text-[#3B82F6]">.world</span></span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="#how-it-works" className="text-sm hover:text-[#3B82F6] transition">
              How it Works
            </Link>
            <Link href="#pricing" className="text-sm hover:text-[#3B82F6] transition">
              Pricing
            </Link>
            <Link href="/verify" className="text-sm hover:text-[#3B82F6] transition">
              Verify
            </Link>
            <Link href="/docs" className="text-sm hover:text-[#3B82F6] transition">
              Docs
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/verify">
              <Button variant="outline" size="sm">Verify Credential</Button>
            </Link>
            <Link href="/auth/signin">
              <Button size="sm" className="bg-[#3B82F6] hover:bg-[#2563EB]">Launch Demo</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 md:pt-48 pb-20 md:pb-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[conic-gradient(at_50%_10%,_rgba(59,130,246,0.15),_rgba(34,197,94,0.08),_rgba(3,7,18,0.6))] opacity-50" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20">
              Trusted by 10,000+ institutions globally
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              The global standard for
              <span className="text-[#3B82F6]"> tamper-proof credentials</span>
            </h1>
            <p className="text-lg md:text-xl text-[#9CA3AF] mb-10 max-w-2xl mx-auto">
              Issue, share, and verify certificates instantly with blockchain-backed authentication.
              Build trust at scale with VerifyMe.world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-[#3B82F6] hover:bg-[#2563EB] w-full sm:w-auto" data-testid="primary-cta-button">
                  <Zap className="mr-2 h-5 w-5" />
                  Start Issuing Free
                </Button>
              </Link>
              <Link href="/verify">
                <Button size="lg" variant="outline" className="w-full sm:w-auto" data-testid="secondary-cta-button">
                  <Shield className="mr-2 h-5 w-5" />
                  Verify a Credential
                </Button>
              </Link>
            </div>
          </div>

          {/* Demo Card */}
          <div className="mt-16 max-w-3xl mx-auto">
            <Card className="border-[#1F2937] bg-[#0B1120]/60 backdrop-blur-md">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-[#22C55E]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">Jane Doe</span>
                      <Badge className="bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20">Verified</Badge>
                    </div>
                    <p className="text-sm text-[#9CA3AF] mb-2">B.Sc Computer Science • Global University</p>
                    <div className="flex items-center gap-4 text-xs text-[#9CA3AF]">
                      <span>Issued: 2024-06-01</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        On-chain verified
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-[#0B1120] border-y border-[#1F2937] px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How VerifyMe.world Works</h2>
            <p className="text-[#9CA3AF] max-w-2xl mx-auto">
              Three simple steps to issue tamper-proof, globally verifiable credentials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FileCheck,
                title: 'Issue',
                description: 'Create and customize certificates with our intuitive dashboard. AI helps generate professional content.',
                testid: 'how-it-works-issue',
              },
              {
                icon: Users,
                title: 'Share',
                description: 'Recipients get QR-enabled PDFs with blockchain hashes. Shareable links for instant verification.',
                testid: 'how-it-works-share',
              },
              {
                icon: Shield,
                title: 'Verify',
                description: 'Anyone can verify authenticity instantly. Scan QR or enter ID - results in under 3 seconds.',
                testid: 'how-it-works-verify',
              },
            ].map((step, idx) => (
              <Card
                key={idx}
                className="border-[#1F2937] bg-[#030712] hover:border-[#3B82F6]/40 transition-all duration-300"
                data-testid={step.testid}
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center mb-6">
                    <step.icon className="h-7 w-7 text-[#3B82F6]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-[#9CA3AF] leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-20 bg-[#030712] px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Credentials Issued', value: '1.2M+', testid: 'stat-issued' },
              { label: 'Partner Institutions', value: '10K+', testid: 'stat-partners' },
              { label: 'Verification Speed', value: '<3s', testid: 'stat-speed' },
            ].map((stat, idx) => (
              <Card
                key={idx}
                className="border-[#1F2937] bg-[rgba(11,17,32,0.6)] backdrop-blur-md text-center p-8"
                data-testid={stat.testid}
              >
                <div className="text-4xl font-bold text-[#3B82F6] mb-2">{stat.value}</div>
                <div className="text-[#9CA3AF]">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* For Institutions */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20">
                For Institutions
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Issue credentials that build trust globally</h2>
              <p className="text-[#9CA3AF] mb-6">
                Universities, bootcamps, certification bodies - give your students and professionals 
                credentials that are instantly verifiable anywhere in the world.
              </p>
              <ul className="space-y-3">
                {[
                  'Bulk certificate issuance via CSV',
                  'Custom branding and templates',
                  'API integration for your LMS',
                  'Real-time analytics dashboard',
                  'Blockchain-backed authenticity',
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#22C55E] flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl border border-[#1F2937] bg-gradient-to-br from-[#0B1120] to-[#030712] flex items-center justify-center">
                <Shield className="h-32 w-32 text-[#3B82F6]/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-16 px-4" data-testid="cta-band">
        <div className="max-w-5xl mx-auto">
          <Card className="border-[#1F2937] bg-[rgba(11,17,32,0.7)] backdrop-blur-xl">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">Ready to issue tamper-proof credentials?</h3>
                  <p className="text-[#9CA3AF]">Join 10,000+ institutions building trust with VerifyMe.world</p>
                </div>
                <Link href="/auth/signup">
                  <Button size="lg" className="bg-[#3B82F6] hover:bg-[#2563EB] whitespace-nowrap">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1F2937] py-12 px-4 bg-[#0B1120]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-[#9CA3AF]">
              <li><Link href="/verify" className="hover:text-[#3B82F6]">Verify</Link></li>
              <li><Link href="#pricing" className="hover:text-[#3B82F6]">Pricing</Link></li>
              <li><Link href="/docs" className="hover:text-[#3B82F6]">Documentation</Link></li>
              <li><Link href="/api-reference" className="hover:text-[#3B82F6]">API Reference</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-[#9CA3AF]">
              <li><Link href="/community" className="hover:text-[#3B82F6]">Community</Link></li>
              <li><Link href="/help-center" className="hover:text-[#3B82F6]">Help Center</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-[#9CA3AF]">
              <li><Link href="/legal/privacy" className="hover:text-[#3B82F6]">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-[#3B82F6]">Terms of Service</Link></li>
              <li><Link href="/legal/cookies" className="hover:text-[#3B82F6]">Cookie Policy</Link></li>
              <li><Link href="/legal/compliance" className="hover:text-[#3B82F6]">Compliance</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <p className="text-sm text-[#9CA3AF]">Building the future of credential verification.</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#1F2937] text-center text-sm text-[#9CA3AF]">
          <p>© 2025 VerifyMe.world. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
