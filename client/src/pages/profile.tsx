import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_CERTIFICATES } from "@/lib/mockData";
import { Share2, Download, Award, MapPin, Link as LinkIcon } from "lucide-react";
import { CertificateRender } from "@/components/verification/CertificateRender";

export default function Profile() {
  // Mock Student
  const student = {
    name: "Arjun Kumar",
    role: "Full Stack Developer",
    location: "Bangalore, India",
    bio: "Passionate developer with a focus on React, Node.js and Web3 technologies. Lifelong learner.",
    initials: "AK"
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container py-12">
        
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-12 items-start">
          <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="text-4xl bg-primary/10 text-primary">{student.initials}</AvatarFallback>
          </Avatar>
          
          <div className="space-y-4 flex-1">
            <div>
              <h1 className="text-4xl font-heading font-bold">{student.name}</h1>
              <p className="text-xl text-muted-foreground">{student.role}</p>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" /> {student.location}
              </div>
              <div className="flex items-center">
                <LinkIcon className="mr-1 h-4 w-4" /> verify.me/{student.name.toLowerCase().replace(' ', '')}
              </div>
            </div>
            
            <p className="max-w-2xl">{student.bio}</p>

            <div className="flex gap-3 pt-2">
              <Button>
                <Share2 className="mr-2 h-4 w-4" /> Share Profile
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Download Resume
              </Button>
            </div>
          </div>
        </div>

        {/* Credentials Grid */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold border-b pb-4">Verified Credentials ({MOCK_CERTIFICATES.length})</h2>
          
          <div className="grid grid-cols-1 gap-8">
            {MOCK_CERTIFICATES.map((cert) => (
              <Card key={cert.id} className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row">
                  {/* Preview Image */}
                  <div className="md:w-1/3 bg-slate-100 p-4 flex items-center justify-center border-b md:border-b-0 md:border-r">
                     <div className="scale-50 origin-center w-[200%] h-[200%] md:w-full md:h-full md:scale-100 md:origin-top-left flex items-center justify-center">
                       {/* Simplified preview or reuse render component scaled down */}
                        <div className="w-full">
                           <CertificateRender certificate={cert} variant="preview" />
                        </div>
                     </div>
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1 p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold">{cert.course}</h3>
                        <p className="text-muted-foreground">{cert.issuerName}</p>
                      </div>
                      <Badge className="bg-emerald-500 hover:bg-emerald-600">Verified</Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{cert.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold block">Issued:</span>
                        {new Date(cert.issueDate).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-semibold block">Credential ID:</span>
                        <span className="font-mono text-xs bg-muted p-1 rounded">{cert.id}</span>
                      </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                      <Button variant="secondary" size="sm" asChild>
                        <a href={`/verify/${cert.id}`}>Verify Now</a>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="mr-2 h-4 w-4" /> PDF
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
