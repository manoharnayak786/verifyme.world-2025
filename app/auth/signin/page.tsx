'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/client/src/components/ui/button';
import { Input } from '@/client/src/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/client/src/components/ui/card';
import { Shield, ArrowRight } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Login failed');
      }

      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-[#F9FAFB] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Shield className="h-10 w-10 text-[#3B82F6]" />
            <span className="text-2xl font-bold">VerifyMe<span className="text-[#3B82F6]">.world</span></span>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-[#9CA3AF]">Sign in to your account to continue</p>
        </div>

        <Card className="border-[#1F2937] bg-[#0B1120]/60 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription className="text-[#9CA3AF]">Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Username</label>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  className="bg-[#030712] border-[#1F2937]"
                  data-testid="signin-username"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Password</label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="bg-[#030712] border-[#1F2937]"
                  data-testid="signin-password"
                />
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
                data-testid="signin-submit"
              >
                {loading ? 'Signing in...' : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-[#9CA3AF]">Don't have an account? </span>
              <Link href="/auth/signup" className="text-[#3B82F6] hover:underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
