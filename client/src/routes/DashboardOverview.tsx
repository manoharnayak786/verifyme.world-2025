import { useUserRole } from "@/context/UserRoleContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/ui/StatCard";
import { Badge } from "@/components/ui/badge";
import { MOCK_CREDENTIALS } from "@/data/credentials";
import { MOCK_VERIFICATIONS } from "@/data/verifications";
import { formatDate } from "@/lib/formatters";
import { FileCheck, ShieldCheck, Clock, AlertTriangle, TrendingUp, Users } from "lucide-react";
import { Link } from "wouter";

export default function DashboardOverview() {
  const { userRole } = useUserRole();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
           <h1 className="text-3xl font-bold text-text-main">Overview</h1>
           <p className="text-text-muted">Welcome back to your dashboard.</p>
        </div>

        {userRole === "learner" && <LearnerOverview />}
        {userRole === "issuer" && <IssuerOverview />}
        {userRole === "verifier" && <VerifierOverview />}
      </div>
    </DashboardLayout>
  );
}

function LearnerOverview() {
  const myCredentials = MOCK_CREDENTIALS.slice(0, 3); // Just take first 3 for demo

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Credentials" value={MOCK_CREDENTIALS.length} icon={<FileCheck />} />
        <StatCard title="Verified Shares" value="12" icon={<ShieldCheck />} trend="+2 this week" trendUp={true} />
        <StatCard title="Pending Actions" value="0" icon={<Clock />} />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-text-main">Recent Credentials</h2>
          <Link href="/dashboard/credentials" className="text-sm text-primary hover:underline">View all</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {myCredentials.map(cert => (
            <div key={cert.id} className="p-6 rounded-xl bg-surface border border-border hover:border-primary/50 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-lg font-bold">
                   GU
                </div>
                <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">{cert.status}</Badge>
              </div>
              <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{cert.title}</h3>
              <p className="text-sm text-text-muted mb-4">Global University</p>
              <div className="text-xs text-text-muted pt-4 border-t border-border flex justify-between">
                <span>Issued {formatDate(cert.issuedAt)}</span>
                <span className="font-mono">{cert.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function IssuerOverview() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Issued" value="1,245" icon={<FileCheck />} trend="+12%" trendUp={true} />
        <StatCard title="Active Verifications" value="8,502" icon={<ShieldCheck />} trend="+5%" trendUp={true} />
        <StatCard title="Revoked" value="3" icon={<AlertTriangle />} trend="-1" trendUp={true} />
        <StatCard title="Partner Inst." value="5" icon={<Users />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 rounded-xl bg-surface border border-border">
          <h3 className="font-bold text-lg mb-4">Recent Issuance Activity</h3>
          <div className="space-y-4">
             {[1, 2, 3, 4, 5].map((i) => (
               <div key={i} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors">
                 <div className="flex items-center space-x-3">
                   <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                     S{i}
                   </div>
                   <div>
                     <p className="text-sm font-medium">Student #{1000+i}</p>
                     <p className="text-xs text-text-muted">B.Sc Computer Science</p>
                   </div>
                 </div>
                 <div className="text-right">
                   <p className="text-xs text-text-muted">Just now</p>
                   <p className="text-xs text-accent">On-chain</p>
                 </div>
               </div>
             ))}
          </div>
        </div>

        <div className="p-6 rounded-xl bg-surface border border-border">
          <h3 className="font-bold text-lg mb-4">Platform Health</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Blockchain Node Status</span>
                <span className="text-accent font-medium">Operational</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-full bg-accent rounded-full"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">API Latency</span>
                <span className="text-primary font-medium">45ms</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[95%] bg-primary rounded-full"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Daily Quota Usage</span>
                <span className="text-warning font-medium">65%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[65%] bg-warning rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VerifierOverview() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Credentials Verified" value="42" icon={<ShieldCheck />} />
        <StatCard title="Failed Checks" value="2" icon={<AlertTriangle />} className="border-destructive/20" />
        <StatCard title="Avg. Response Time" value="1.2s" icon={<Clock />} />
      </div>

      <div>
        <h2 className="text-xl font-bold text-text-main mb-4">Recent Verifications</h2>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface/50 text-text-muted border-b border-border">
              <tr>
                <th className="p-4 font-medium">Credential ID</th>
                <th className="p-4 font-medium">Holder</th>
                <th className="p-4 font-medium">Result</th>
                <th className="p-4 font-medium">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-surface">
              {MOCK_VERIFICATIONS.map((ver) => (
                <tr key={ver.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-mono text-xs text-text-muted">{ver.credentialId}</td>
                  <td className="p-4">Unknown (Privacy Preserved)</td>
                  <td className="p-4">
                    <Badge variant={ver.result === "success" ? "accent" : "destructive"} className={
                      ver.result === "success" ? "bg-accent/10 text-accent border-accent/20" : "bg-destructive/10 text-destructive border-destructive/20"
                    }>
                      {ver.result === "success" ? "Valid" : "Invalid"}
                    </Badge>
                  </td>
                  <td className="p-4 text-text-muted">{formatDate(ver.verifiedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
