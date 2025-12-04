import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/StatCard";
import { BarChart3, Map, Globe, MousePointerClick } from "lucide-react";

export default function DashboardAnalytics() {
  // Mock chart bars
  const monthlyData = [40, 55, 45, 70, 60, 85, 95, 110, 105, 130, 125, 150];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-text-main">Analytics</h1>
          <p className="text-text-muted">Insights into your credential issuance and verification performance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Verifications" value="24.5K" icon={<MousePointerClick />} trend="+15%" trendUp={true} />
          <StatCard title="Unique Verifiers" value="3,200" icon={<Globe />} trend="+8%" trendUp={true} />
          <StatCard title="Credential Acceptance Rate" value="98.2%" icon={<BarChart3 />} />
        </div>

        {/* Fake Chart */}
        <div className="p-6 rounded-xl bg-surface border border-border">
          <h3 className="font-bold text-lg mb-6">Issuance Trends (Last 12 Months)</h3>
          <div className="flex items-end justify-between h-64 gap-2">
            {monthlyData.map((h, i) => (
              <div key={i} className="w-full flex flex-col justify-end group">
                <div 
                  className="w-full bg-primary/20 rounded-t-md group-hover:bg-primary transition-all relative"
                  style={{ height: `${(h / 150) * 100}%` }}
                >
                   <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface border border-border px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                     {h * 10}
                   </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-text-muted uppercase">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-surface border border-border">
            <h3 className="font-bold text-lg mb-4">Top Geographies</h3>
            <div className="space-y-4">
              <GeoRow country="United States" count={4500} percent={45} />
              <GeoRow country="India" count={3200} percent={32} />
              <GeoRow country="United Kingdom" count={1500} percent={15} />
              <GeoRow country="Germany" count={800} percent={8} />
            </div>
          </div>

          <div className="p-6 rounded-xl bg-surface border border-border">
             <h3 className="font-bold text-lg mb-4">Most Verified Programs</h3>
             <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="font-medium">B.Sc Computer Science</span>
                  <span className="text-primary font-bold">12.5k hits</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="font-medium">Data Science Certification</span>
                  <span className="text-primary font-bold">8.2k hits</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="font-medium">MBA</span>
                  <span className="text-primary font-bold">6.1k hits</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function GeoRow({ country, count, percent }: { country: string, count: number, percent: number }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>{country}</span>
        <span className="text-text-muted">{count} ({percent}%)</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-accent rounded-full" style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}
