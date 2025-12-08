import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { hash } from 'bcryptjs';
import { z } from 'zod';

const signupSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(6),
  email: z.string().email().optional(),
  role: z.enum(['learner', 'issuer', 'verifier']).default('learner'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = signupSchema.parse(body);

    // Check if user exists
    const existing = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.username, data.username),
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hash(data.password, 10);

    // Create user
    const [user] = await db.insert(users).values({
      username: data.username,
      password: hashedPassword,
      email: data.email,
      role: data.role,
    }).returning();

    return NextResponse.json({
      id: user.id,
      username: user.username,
      role: user.role,
    }, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
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
