import { NextRequest, NextResponse } from 'next/server';
import { generateCertificateTemplate } from '@/lib/services/ai-service';
import { z } from 'zod';

const templateSchema = z.object({
  title: z.string(),
  context: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = templateSchema.parse(body);

    const template = await generateCertificateTemplate(data);

    return NextResponse.json({ template });
  } catch (error) {
    console.error('AI template error:', error);
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
