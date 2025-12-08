import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { credentials } from '@/lib/schema';
import { getBlockchainEvents } from '@/lib/services/blockchain-service';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const credential = await db.query.credentials.findFirst({
      where: eq(credentials.id, id),
      with: {
        institution: true,
      },
    });

    if (!credential) {
      return NextResponse.json(
        { error: 'Credential not found' },
        { status: 404 }
      );
    }

    // Get blockchain events
    const blockchainEvents = await getBlockchainEvents(id);

    return NextResponse.json({
      credential,
      blockchainEvents,
    });
  } catch (error) {
    console.error('Error fetching credential:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!['valid', 'revoked', 'expired', 'pending'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const [updated] = await db
      .update(credentials)
      .set({ status })
      .where(eq(credentials.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json(
        { error: 'Credential not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating credential:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
