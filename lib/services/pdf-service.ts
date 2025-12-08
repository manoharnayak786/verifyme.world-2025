import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import QRCode from 'qrcode';
import { createHash } from 'crypto';

interface CertificateData {
  id: string;
  holderName: string;
  title: string;
  institution: string;
  issueDate: string;
  expirationDate?: string;
  country: string;
}

export async function generateCertificatePDF(data: CertificateData) {
  // Generate QR code
  const qrData = JSON.stringify({
    id: data.id,
    holder: data.holderName,
    title: data.title,
    institution: data.institution,
    issueDate: data.issueDate,
  });

  const qrCodeDataURL = await QRCode.toDataURL(qrData, {
    width: 200,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#FFFFFF',
    },
  });

  // Create PDF
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([850, 600]);
  const { width, height } = page.getSize();

  // Load fonts
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Background
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: rgb(1, 1, 1),
  });

  // Border
  page.drawRectangle({
    x: 30,
    y: 30,
    width: width - 60,
    height: height - 60,
    borderColor: rgb(0.2, 0.4, 0.8),
    borderWidth: 2,
  });

  // Title
  page.drawText('CERTIFICATE OF ACHIEVEMENT', {
    x: 50,
    y: height - 100,
    size: 32,
    font: boldFont,
    color: rgb(0.2, 0.4, 0.8),
  });

  // Subtitle
  page.drawText('This is to certify that', {
    x: 50,
    y: height - 160,
    size: 16,
    font: regularFont,
    color: rgb(0, 0, 0),
  });

  // Holder name
  page.drawText(data.holderName, {
    x: 50,
    y: height - 210,
    size: 28,
    font: boldFont,
    color: rgb(0, 0, 0),
  });

  // Achievement text
  page.drawText('has successfully completed', {
    x: 50,
    y: height - 260,
    size: 14,
    font: regularFont,
    color: rgb(0, 0, 0),
  });

  // Certificate title
  page.drawText(data.title, {
    x: 50,
    y: height - 300,
    size: 20,
    font: boldFont,
    color: rgb(0, 0, 0),
  });

  // Institution
  page.drawText(`Issued by: ${data.institution}`, {
    x: 50,
    y: height - 350,
    size: 14,
    font: regularFont,
    color: rgb(0.3, 0.3, 0.3),
  });

  // Date
  page.drawText(`Date: ${data.issueDate}`, {
    x: 50,
    y: height - 380,
    size: 12,
    font: regularFont,
    color: rgb(0.3, 0.3, 0.3),
  });

  if (data.expirationDate) {
    page.drawText(`Valid Until: ${data.expirationDate}`, {
      x: 50,
      y: height - 405,
      size: 12,
      font: regularFont,
      color: rgb(0.3, 0.3, 0.3),
    });
  }

  // Certificate ID
  page.drawText(`Certificate ID: ${data.id}`, {
    x: 50,
    y: height - 450,
    size: 10,
    font: regularFont,
    color: rgb(0.5, 0.5, 0.5),
  });

  // Embed QR code
  const qrImageBytes = Buffer.from(
    qrCodeDataURL.replace(/^data:image\/png;base64,/, ''),
    'base64'
  );
  const qrImage = await pdfDoc.embedPng(qrImageBytes);
  page.drawImage(qrImage, {
    x: width - 200,
    y: height - 280,
    width: 150,
    height: 150,
  });

  // Scan instruction
  page.drawText('Scan to verify', {
    x: width - 185,
    y: height - 300,
    size: 10,
    font: regularFont,
    color: rgb(0.5, 0.5, 0.5),
  });

  // Save PDF
  const pdfBytes = await pdfDoc.save();
  
  // Calculate hash
  const contentHash = createHash('sha256').update(pdfBytes).digest('hex');
  
  // Convert to base64
  const pdfBase64 = Buffer.from(pdfBytes).toString('base64');

  return {
    pdfBytes,
    pdfBase64,
    contentHash,
    qrCodeData: qrData,
  };
}
