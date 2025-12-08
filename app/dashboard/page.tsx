'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, CheckCircle2, XCircle, Clock } from 'lucide-react';

export default function DashboardPage() {
  // Mock data - in production, fetch from API
  const stats = [
    { label: 'Total Credentials', value: '24', icon: FileText, color: 'text-[#3B82F6]' },
    { label: 'Verified', value: '18', icon: CheckCircle2, color: 'text-[#22C55E]' },
    { label: 'Pending', value: '4', icon: Clock, color: 'text-[#F97316]' },
    { label: 'Revoked', value: '2', icon: XCircle, color: 'text-[#EF4444]' },
  ];

  const recentActivity = [
    { id: 'VFY-2025-1001', holder: 'John Doe', title: 'Web Development', date: '2025-02-01', status: 'valid' },
    { id: 'VFY-2025-1002', holder: 'Jane Smith', title: 'Data Science', date: '2025-02-02', status: 'valid' },
    { id: 'VFY-2025-1003', holder: 'Bob Johnson', title: 'Cloud Architecture', date: '2025-02-03', status: 'pending' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-[#9CA3AF]">Welcome back! Here's your credential summary.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="border-[#1F2937] bg-[#0B1120]" data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, '-')}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#9CA3AF]">{stat.label}</span>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card className="border-[#1F2937] bg-[#0B1120]">
        <CardHeader>
          <CardTitle>Recent Credentials</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-[#030712] rounded-lg">
                <div>
                  <div className="font-semibold mb-1">{item.holder}</div>
                  <div className="text-sm text-[#9CA3AF]">{item.title}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-[#9CA3AF]">{item.date}</span>
                  <Badge className={item.status === 'valid' ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-[#F97316]/10 text-[#F97316]'}>
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
