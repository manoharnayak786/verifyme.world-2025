'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Download, Sparkles } from 'lucide-react';

export default function CredentialsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [formData, setFormData] = useState({
    holderName: '',
    title: '',
    institutionId: '',
    issueDate: new Date().toISOString().split('T')[0],
    expirationDate: '',
    country: 'USA',
  });

  const handleAISuggest = async () => {
    if (!formData.title) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/ai/suggest-template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: formData.title }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setAiSuggestion(data.template);
      }
    } catch (error) {
      console.error('AI suggestion failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Credential created successfully!');
        setIsDialogOpen(false);
        window.location.reload();
      }
    } catch (error) {
      alert('Failed to create credential');
    } finally {
      setLoading(false);
    }
  };

  // Mock credentials
  const credentials = [
    { id: 'VFY-2025-1001', holderName: 'John Doe', title: 'Advanced Web Development', status: 'valid', date: '2025-02-01' },
    { id: 'VFY-2025-1002', holderName: 'Jane Smith', title: 'Data Science Bootcamp', status: 'valid', date: '2025-02-02' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Credentials</h1>
          <p className="text-[#9CA3AF]">Issue and manage your certificates</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#3B82F6] hover:bg-[#2563EB]" data-testid="issue-credential-button">
              <Plus className="mr-2 h-4 w-4" />
              Issue Credential
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0B1120] border-[#1F2937] text-[#F9FAFB] max-w-2xl">
            <DialogHeader>
              <DialogTitle>Issue New Credential</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Holder Name</label>
                  <Input
                    placeholder="John Doe"
                    value={formData.holderName}
                    onChange={(e) => setFormData({ ...formData, holderName: e.target.value })}
                    required
                    className="bg-[#030712] border-[#1F2937]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Title</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Certificate Title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="bg-[#030712] border-[#1F2937]"
                    />
                    <Button type="button" size="sm" variant="outline" onClick={handleAISuggest} disabled={loading}>
                      <Sparkles className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {aiSuggestion && (
                <div className="p-3 bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-md text-sm">
                  <strong className="text-[#3B82F6]">AI Suggestion:</strong>
                  <p className="mt-1 text-[#9CA3AF]">{aiSuggestion}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Issue Date</label>
                  <Input
                    type="date"
                    value={formData.issueDate}
                    onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                    required
                    className="bg-[#030712] border-[#1F2937]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Country</label>
                  <Input
                    placeholder="USA"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    required
                    className="bg-[#030712] border-[#1F2937]"
                  />
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full bg-[#3B82F6] hover:bg-[#2563EB]">
                {loading ? 'Creating...' : 'Issue Credential'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {credentials.map((cred) => (
          <Card key={cred.id} className="border-[#1F2937] bg-[#0B1120]" data-testid="credential-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{cred.holderName}</CardTitle>
                  <p className="text-sm text-[#9CA3AF] mt-1">{cred.title}</p>
                </div>
                <Badge className="bg-[#22C55E]/10 text-[#22C55E]">{cred.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#9CA3AF]">ID: {cred.id}</span>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
