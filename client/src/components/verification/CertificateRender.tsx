import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QRCodeSVG } from "qrcode.react";
import watermarkPattern from "@assets/generated_images/certificate_watermark_pattern.png";
import logoSymbol from "@assets/generated_images/verifyme_logo_symbol.png";
import { type Certificate } from "@/lib/mockData";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

interface CertificateRenderProps {
  certificate: Certificate;
  variant?: "full" | "preview";
}

export function CertificateRender({ certificate, variant = "full" }: CertificateRenderProps) {
  const verificationUrl = `${window.location.origin}/verify/${certificate.id}`;

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-white text-slate-900 p-1 md:p-2 shadow-2xl border border-slate-200 overflow-hidden" 
         style={{ aspectRatio: "1.414 / 1" }}> {/* A4 Landscape Ratio */}
      
      {/* Inner Border Frame */}
      <div className="relative h-full w-full border-[3px] border-double border-slate-300 p-6 md:p-12 flex flex-col justify-between bg-white/90 backdrop-blur-sm">
        
        {/* Watermark Background */}
        <div 
          className="absolute inset-0 opacity-[0.08] pointer-events-none z-0"
          style={{ 
            backgroundImage: `url(${watermarkPattern})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />

        {/* Header */}
        <div className="relative z-10 text-center space-y-4">
          <div className="flex justify-center mb-6">
            <img src={logoSymbol} alt="Issuer Logo" className="h-16 w-16 md:h-20 md:w-20 opacity-90" />
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-slate-900 uppercase tracking-wider">
            Certificate of Completion
          </h1>
          <p className="text-slate-500 font-serif italic text-lg md:text-xl">
            This is to certify that
          </p>
        </div>

        {/* Student Name */}
        <div className="relative z-10 text-center py-4 md:py-8">
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-primary border-b-2 border-slate-200 inline-block pb-2 px-8">
            {certificate.studentName}
          </h2>
        </div>

        {/* Body */}
        <div className="relative z-10 text-center space-y-2 md:space-y-4">
          <p className="text-slate-600 text-lg md:text-xl">
            has successfully completed the course
          </p>
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-slate-800">
            {certificate.course}
          </h3>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            {certificate.description}
          </p>
        </div>

        {/* Footer: Date, Signatures, QR */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between mt-8 md:mt-16 gap-8">
          
          {/* Date & Issuer */}
          <div className="text-center md:text-left space-y-1">
            <p className="text-sm text-slate-400 uppercase tracking-widest">Date of Issue</p>
            <p className="font-semibold text-lg">{new Date(certificate.issueDate).toLocaleDateString()}</p>
            <div className="h-px w-32 bg-slate-300 my-2 mx-auto md:mx-0" />
            <p className="font-bold text-slate-700">{certificate.issuerName}</p>
          </div>

          {/* Verification Badge */}
          <div className="flex flex-col items-center space-y-2">
            <div className="bg-white p-2 border border-slate-200 rounded shadow-sm">
              <QRCodeSVG value={verificationUrl} size={100} level="H" />
            </div>
            <div className="text-[10px] text-slate-400 font-mono text-center">
              ID: {certificate.id}
            </div>
          </div>

          {/* Signature (Mock) */}
          <div className="text-center md:text-right space-y-1">
            <p className="text-sm text-slate-400 uppercase tracking-widest">Director</p>
            <div className="font-serif italic text-2xl text-slate-600 h-8">John Doe</div>
             <div className="h-px w-32 bg-slate-300 my-2 mx-auto md:mx-0 ml-auto" />
            <p className="font-bold text-slate-700">Academic Director</p>
          </div>
        </div>

        {/* Blockchain Hash Footer */}
        <div className="absolute bottom-2 left-0 right-0 text-center">
          <div className="inline-flex items-center gap-1.5 text-[10px] text-slate-400 font-mono bg-slate-50 px-2 py-1 rounded-full border border-slate-100">
            <ShieldCheck size={10} className="text-emerald-500" />
            Blockchain Hash: {certificate.hash.substring(0, 20)}...{certificate.hash.substring(certificate.hash.length - 8)}
          </div>
        </div>
      </div>
    </div>
  );
}
