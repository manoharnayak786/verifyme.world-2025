import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { institutions } from '@/lib/schema';
import { z } from 'zod';

const createInstitutionSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  country: z.string(),
  logoInitials: z.string().max(5),
  type: z.enum(['university', 'bootcamp', 'mooc', 'certification-body']),
});

export async function GET() {
  try {
    const results = await db.query.institutions.findMany({
      orderBy: (inst, { asc }) => [asc(inst.name)],
    });
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching institutions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createInstitutionSchema.parse(body);

    const [institution] = await db.insert(institutions).values(data).returning();

    return NextResponse.json(institution, { status: 201 });
  } catch (error) {
    console.error('Error creating institution:', error);
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
