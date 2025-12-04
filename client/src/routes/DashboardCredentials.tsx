import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_CREDENTIALS } from "@/data/credentials";
import { MOCK_INSTITUTIONS } from "@/data/institutions";
import { formatDate, getStatusColor, getStatusLabel } from "@/lib/formatters";
import { Search, Filter, FileText, Download, ExternalLink } from "lucide-react";
import { useUserRole } from "@/context/UserRoleContext";

export default function DashboardCredentials() {
  const { userRole } = useUserRole();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredCredentials = MOCK_CREDENTIALS.filter(cert => {
    const matchesSearch = 
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      cert.holderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || cert.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getInstitutionName = (id: string) => {
    return MOCK_INSTITUTIONS.find(inst => inst.id === id)?.name || "Unknown Institution";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-main">
              {userRole === "learner" ? "My Credentials" : "Issued Credentials"}
            </h1>
            <p className="text-text-muted">
              {userRole === "learner" 
                ? "Manage and share your verified achievements." 
                : "Track and manage certificates issued by your organization."}
            </p>
          </div>
          {userRole === "issuer" && (
            <Button className="bg-primary hover:bg-primary-hover text-white">
              Issue New Credential
            </Button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 bg-surface p-4 rounded-xl border border-border">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted h-4 w-4" />
            <Input 
              placeholder="Search by title, name, or ID..." 
              className="pl-10 bg-background border-border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {["all", "valid", "revoked", "pending"].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  filterStatus === status 
                    ? "bg-primary text-white" 
                    : "bg-background border border-border text-text-muted hover:text-text-main"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Learner View: Grid */}
        {userRole === "learner" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCredentials.map(cert => (
              <div key={cert.id} className="group relative bg-surface border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all hover:border-primary/50">
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xl font-bold text-text-main">
                      {getInstitutionName(cert.institutionId).charAt(0)}
                    </div>
                    <Badge variant="secondary" className={`border ${getStatusColor(cert.status)}`}>
                      {getStatusLabel(cert.status)}
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-text-main mb-1 group-hover:text-primary transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-text-muted">{getInstitutionName(cert.institutionId)}</p>
                  </div>

                  <div className="pt-4 border-t border-border space-y-2 text-sm">
                    <div className="flex justify-between text-text-muted">
                      <span>Issued</span>
                      <span>{formatDate(cert.issuedAt)}</span>
                    </div>
                    <div className="flex justify-between text-text-muted">
                      <span>Expires</span>
                      <span>{cert.expiresAt ? formatDate(cert.expiresAt) : "Never"}</span>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4 bg-black/20 flex gap-2">
                   <Button size="sm" variant="outline" className="flex-1 border-border hover:bg-white/5">
                     <Download className="mr-2 h-4 w-4" /> PDF
                   </Button>
                   <Button size="sm" className="flex-1 bg-primary hover:bg-primary-hover text-white">
                     Share
                   </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Issuer View: Table */}
        {userRole === "issuer" && (
          <div className="bg-surface rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-black/20 text-text-muted border-b border-border">
                  <tr>
                    <th className="p-4 font-medium">ID</th>
                    <th className="p-4 font-medium">Holder Name</th>
                    <th className="p-4 font-medium">Credential Title</th>
                    <th className="p-4 font-medium">Issued Date</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredCredentials.map((cert) => (
                    <tr key={cert.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-mono text-xs text-text-muted">{cert.id}</td>
                      <td className="p-4 font-medium text-text-main">{cert.holderName}</td>
                      <td className="p-4 text-text-muted">{cert.title}</td>
                      <td className="p-4 text-text-muted">{formatDate(cert.issuedAt)}</td>
                      <td className="p-4">
                        <Badge variant="secondary" className={`border ${getStatusColor(cert.status)}`}>
                          {getStatusLabel(cert.status)}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
