import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { credentials, institutions } from '@/lib/schema';
import { generateCertificatePDF } from '@/lib/services/pdf-service';
import { simulateBlockchainTransaction } from '@/lib/services/blockchain-service';
import { z } from 'zod';
import { eq, like, or } from 'drizzle-orm';

const createCredentialSchema = z.object({
  holderName: z.string().min(1),
  title: z.string().min(1),
  institutionId: z.string(),
  issueDate: z.string(),
  expirationDate: z.string().optional(),
  country: z.string(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');

    let results;
    if (search) {
      results = await db.query.credentials.findMany({
        where: (creds) =>
          or(
            like(creds.id, `%${search}%`),
            like(creds.holderName, `%${search}%`),
            like(creds.title, `%${search}%`)
          ),
        with: {
          institution: true,
        },
      });
    } else {
      results = await db.query.credentials.findMany({
        orderBy: (creds, { desc }) => [desc(creds.createdAt)],
        limit: 100,
      });
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching credentials:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createCredentialSchema.parse(body);

    // Verify institution exists
    const institution = await db.query.institutions.findFirst({
      where: eq(institutions.id, data.institutionId),
    });

    if (!institution) {
      return NextResponse.json(
        { error: 'Institution not found' },
        { status: 404 }
      );
    }

    // Generate credential ID
    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    const credentialId = `VFY-${year}-${random}`;

    // Generate PDF with QR code
    const pdfResult = await generateCertificatePDF({
      id: credentialId,
      holderName: data.holderName,
      title: data.title,
      institution: institution.name,
      issueDate: data.issueDate,
      expirationDate: data.expirationDate,
      country: data.country,
    });

    // Simulate blockchain transaction
    const blockchainTx = await simulateBlockchainTransaction({
      credentialId,
      contentHash: pdfResult.contentHash,
    });

    // Create credential
    const [credential] = await db.insert(credentials).values({
      id: credentialId,
      holderName: data.holderName,
      title: data.title,
      institutionId: data.institutionId,
      issueDate: new Date(data.issueDate),
      expiresAt: data.expirationDate ? new Date(data.expirationDate) : null,
      status: 'valid',
      country: data.country,
      onChain: true,
      pdfBase64: pdfResult.pdfBase64,
      contentHash: pdfResult.contentHash,
      qrCodeData: pdfResult.qrCodeData,
    }).returning();

    return NextResponse.json({
      credential,
      blockchainTx,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating credential:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
