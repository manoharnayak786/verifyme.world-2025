import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Check } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for individuals and small institutions',
      features: [
        'Up to 50 credentials/month',
        'Basic certificate templates',
        'QR code verification',
        'Community support',
        'Simulated blockchain',
      ],
      cta: 'Get Started Free',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$49',
      description: 'For growing institutions and organizations',
      features: [
        'Unlimited credentials',
        'Custom branding & templates',
        'AI-powered content suggestions',
        'Priority support',
        'Real blockchain integration',
        'Analytics dashboard',
        'API access',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For universities and large organizations',
      features: [
        'Everything in Pro',
        'Dedicated account manager',
        'SLA guarantees',
        'Custom integrations',
        'On-premise deployment option',
        'Advanced security features',
        'White-label solution',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

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
            <Button size="sm" className="bg-[#3B82F6] hover:bg-[#2563EB]">Sign In</Button>
          </Link>
        </div>
      </nav>

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-[#9CA3AF]">Choose the plan that's right for your institution</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`border-2 bg-[#0B1120] relative ${
                plan.popular ? 'border-[#3B82F6]' : 'border-[#1F2937]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <Badge className="bg-[#3B82F6] text-white">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <div className="mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-[#9CA3AF]">/month</span>}
                </div>
                <p className="text-sm text-[#9CA3AF]">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/auth/signup">
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'bg-[#3B82F6] hover:bg-[#2563EB]'
                        : 'bg-[#1F2937] hover:bg-[#374151]'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
