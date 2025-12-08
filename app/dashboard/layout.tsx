'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield, LayoutDashboard, FileText, Search, BarChart3, Settings, LogOut } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const navigation = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Credentials', href: '/dashboard/credentials', icon: FileText },
    { name: 'Verify', href: '/dashboard/verify', icon: Search },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const handleLogout = () => {
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/auth/signin');
  };

  return (
    <div className="min-h-screen bg-[#030712] text-[#F9FAFB]">
      {/* Top Nav */}
      <nav className="border-b border-[#1F2937] bg-[#0B1120] sticky top-0 z-50">
        <div className="px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-[#3B82F6]" />
            <span className="text-xl font-bold">VerifyMe<span className="text-[#3B82F6]">.world</span></span>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-[#1F2937] bg-[#0B1120] min-h-[calc(100vh-4rem)] p-4">
          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#3B82F6] text-white'
                      : 'text-[#9CA3AF] hover:bg-[#1F2937] hover:text-white'
                  }`}
                  data-testid={`nav-${item.name.toLowerCase()}`}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
