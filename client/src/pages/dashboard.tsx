import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MOCK_CERTIFICATES, MOCK_ISSUER } from "@/lib/mockData";
import { Plus, Download, Search, Filter, ExternalLink, Loader2 } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { QRCodeSVG } from "qrcode.react";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isIssuing, setIsIssuing] = useState(false);
  const { toast } = useToast();

  // Simple filter logic
  const filteredCerts = MOCK_CERTIFICATES.filter(cert => 
    cert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIssue = () => {
    setIsIssuing(true);
    // Simulate API call
    setTimeout(() => {
      setIsIssuing(false);
      toast({
        title: "Certificate Issued Successfully",
        description: "The certificate has been hashed and stored on the blockchain.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar />
      
      <main className="flex-1 container py-8 space-y-8">
        
        {/* Header Stats */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Issuer Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {MOCK_ISSUER.name}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export Data
            </Button>
            <IssueModal onIssue={handleIssue} isIssuing={isIssuing} />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Issued</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{MOCK_ISSUER.totalIssued}</div>
              <p className="text-xs text-muted-foreground">+12 this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Verifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{MOCK_ISSUER.verificationCount}</div>
              <p className="text-xs text-muted-foreground">+542 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Remaining Credits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">Unlimited</div>
              <p className="text-xs text-muted-foreground">Pro Plan</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content: Certificate List */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <CardTitle>Recent Certificates</CardTitle>
                <CardDescription>Manage and track issued credentials.</CardDescription>
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by name or ID..." 
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Certificate ID</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCerts.map((cert) => (
                  <TableRow key={cert.id}>
                    <TableCell className="font-mono text-xs text-muted-foreground">{cert.id}</TableCell>
                    <TableCell className="font-medium">{cert.studentName}</TableCell>
                    <TableCell>{cert.course}</TableCell>
                    <TableCell>{new Date(cert.issueDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none">
                        {cert.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`/verify/${cert.id}`} target="_blank">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

      </main>
      <Footer />
    </div>
  );
}

function IssueModal({ onIssue, isIssuing }: { onIssue: () => void, isIssuing: boolean }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground">
          <Plus className="mr-2 h-4 w-4" /> Issue New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Issue New Certificate</DialogTitle>
          <DialogDescription>
            Enter the recipient details. The certificate will be hashed and permanently stored on the blockchain.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" placeholder="Student Name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="course" className="text-right">
              Course
            </Label>
            <Input id="course" placeholder="Course Name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" placeholder="student@example.com" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onIssue} disabled={isIssuing}>
            {isIssuing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Hashing...
              </>
            ) : (
              "Issue Certificate"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
