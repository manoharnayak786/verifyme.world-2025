'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Shield, ArrowRight, User, GraduationCap, Building, Search } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'learner' as 'learner' | 'issuer' | 'verifier',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const roles = [
    { value: 'learner', label: 'Learner / Student', icon: User, description: 'Receive and manage your credentials' },
    { value: 'issuer', label: 'Institution / Issuer', icon: Building, description: 'Issue certificates to students' },
    { value: 'verifier', label: 'Recruiter / Verifier', icon: Search, description: 'Verify candidate credentials' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Registration failed');
      }

      // Auto login after signup
      const loginResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      if (loginResponse.ok) {
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-[#F9FAFB] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Shield className="h-10 w-10 text-[#3B82F6]" />
            <span className="text-2xl font-bold">VerifyMe<span className="text-[#3B82F6]">.world</span></span>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Create your account</h1>
          <p className="text-[#9CA3AF]">Join thousands using tamper-proof credentials</p>
        </div>

        <Card className="border-[#1F2937] bg-[#0B1120]/60 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription className="text-[#9CA3AF]">Choose your role and create an account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selection */}
              <div>
                <label className="text-sm font-medium mb-3 block">I am a...</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {roles.map((role) => {
                    const Icon = role.icon;
                    return (
                      <button
                        key={role.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, role: role.value as any })}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          formData.role === role.value
                            ? 'border-[#3B82F6] bg-[#3B82F6]/10'
                            : 'border-[#1F2937] hover:border-[#3B82F6]/50'
                        }`}
                        data-testid={`role-${role.value}`}
                      >
                        <Icon className="h-6 w-6 mb-2 text-[#3B82F6]" />
                        <div className="font-semibold text-sm mb-1">{role.label}</div>
                        <div className="text-xs text-[#9CA3AF]">{role.description}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Username</label>
                  <Input
                    type="text"
                    placeholder="johndoe"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                    className="bg-[#030712] border-[#1F2937]"
                    data-testid="signup-username"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-[#030712] border-[#1F2937]"
                    data-testid="signup-email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Password</label>
                  <Input
                    type="password"
                    placeholder="Min. 6 characters"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    minLength={6}
                    className="bg-[#030712] border-[#1F2937]"
                    data-testid="signup-password"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Confirm Password</label>
                  <Input
                    type="password"
                    placeholder="Re-enter password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    className="bg-[#030712] border-[#1F2937]"
                    data-testid="signup-confirm-password"
                  />
                </div>
              </div>

              {error && (
                <div className="text-sm text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-md p-3">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#3B82F6] hover:bg-[#2563EB]"
                data-testid="signup-submit"
              >
                {loading ? 'Creating account...' : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-[#9CA3AF]">Already have an account? </span>
              <Link href="/auth/signin" className="text-[#3B82F6] hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
