import Link from 'next/link';
import { Shield, Code } from 'lucide-react';
import { Button } from '@/client/src/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/client/src/components/ui/card';

export default function APIReferencePage() {
  const endpoints = [
    {
      method: 'POST',
      path: '/api/auth/signup',
      description: 'Register a new user',
      body: `{
  "username": "string",
  "password": "string",
  "email": "string (optional)",
  "role": "learner | issuer | verifier"
}`,
    },
    {
      method: 'POST',
      path: '/api/auth/login',
      description: 'Authenticate user',
      body: `{
  "username": "string",
  "password": "string"
}`,
    },
    {
      method: 'GET',
      path: '/api/credentials',
      description: 'List all credentials (supports ?search= parameter)',
      body: null,
    },
    {
      method: 'POST',
      path: '/api/credentials',
      description: 'Issue a new credential',
      body: `{
  "holderName": "string",
  "title": "string",
  "institutionId": "string",
  "issueDate": "string (YYYY-MM-DD)",
  "expirationDate": "string (optional)",
  "country": "string"
}`,
    },
    {
      method: 'GET',
      path: '/api/credentials/:id',
      description: 'Get credential details with blockchain events',
      body: null,
    },
    {
      method: 'PATCH',
      path: '/api/credentials/:id',
      description: 'Update credential status',
      body: `{
  "status": "valid | revoked | expired | pending"
}`,
    },
    {
      method: 'POST',
      path: '/api/ai/suggest-template',
      description: 'Get AI-generated certificate description',
      body: `{
  "title": "string",
  "context": "string (optional)"
}`,
    },
  ];

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

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Code className="h-10 w-10 text-[#3B82F6]" />
            <h1 className="text-4xl font-bold">API Reference</h1>
          </div>
          <p className="text-xl text-[#9CA3AF]">RESTful API for credential management and verification</p>
        </div>

        <div className="mb-12">
          <Card className="border-[#1F2937] bg-[#0B1120]">
            <CardHeader>
              <CardTitle>Base URL</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-[#030712] p-4 rounded-lg font-mono text-sm">
                <span className="text-[#22C55E]">https://verifyme.world</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {endpoints.map((endpoint, idx) => (
            <Card key={idx} className="border-[#1F2937] bg-[#0B1120]">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <span
                    className={`px-3 py-1 rounded text-xs font-semibold ${
                      endpoint.method === 'GET'
                        ? 'bg-[#22C55E]/10 text-[#22C55E]'
                        : endpoint.method === 'POST'
                        ? 'bg-[#3B82F6]/10 text-[#3B82F6]'
                        : 'bg-[#F97316]/10 text-[#F97316]'
                    }`}
                  >
                    {endpoint.method}
                  </span>
                  <div className="flex-1">
                    <code className="text-[#F9FAFB] font-mono">{endpoint.path}</code>
                    <p className="text-[#9CA3AF] text-sm mt-2">{endpoint.description}</p>
                  </div>
                </div>
              </CardHeader>
              {endpoint.body && (
                <CardContent>
                  <div className="bg-[#030712] p-4 rounded-lg">
                    <p className="text-xs text-[#9CA3AF] mb-2 font-semibold">Request Body</p>
                    <pre className="text-sm font-mono text-[#22C55E] overflow-x-auto">{endpoint.body}</pre>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <Card className="border-[#3B82F6]/20 bg-[#3B82F6]/5">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2 text-[#3B82F6]">Authentication</h3>
              <p className="text-[#9CA3AF] text-sm">
                Most endpoints require authentication via JWT token in cookies. Obtain token through /api/auth/login.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
