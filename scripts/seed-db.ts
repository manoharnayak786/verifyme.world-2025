/**
 * Database Seed Script - Creates demo data
 * Run: npx tsx scripts/seed-db.ts
 */

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { users, institutions, credentials } from '../lib/schema';
import { hash } from 'bcryptjs';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

async function seed() {
  console.log('Seeding database with demo data...');
  
  const client = postgres(DATABASE_URL, { max: 1 });
  const db = drizzle(client);

  try {
    // Create demo users
    const hashedPassword = await hash('demo123', 10);
    
    const [issuerUser] = await db.insert(users).values({
      username: 'demo_issuer',
      password: hashedPassword,
      email: 'issuer@demo.com',
      role: 'issuer',
    }).returning().catch(() => [null]);

    const [learnerUser] = await db.insert(users).values({
      username: 'demo_learner',
      password: hashedPassword,
      email: 'learner@demo.com',
      role: 'learner',
    }).returning().catch(() => [null]);

    console.log('✓ Created demo users (demo_issuer / demo_learner, password: demo123)');

    // Create demo institutions
    if (issuerUser) {
      const [techAcademy] = await db.insert(institutions).values({
        name: 'Tech Academy Global',
        slug: 'tech-academy',
        country: 'USA',
        logoInitials: 'TAG',
        type: 'bootcamp',
        createdBy: issuerUser.id,
      }).returning().catch(() => [null]);

      await db.insert(institutions).values({
        name: 'Global University',
        slug: 'global-university',
        country: 'UK',
        logoInitials: 'GU',
        type: 'university',
        createdBy: issuerUser.id,
      }).catch(() => {});

      console.log('✓ Created demo institutions');

      // Create demo credentials
      if (techAcademy) {
        await db.insert(credentials).values([
          {
            id: 'VFY-2025-DEMO1',
            holderName: 'John Doe',
            title: 'Advanced Web Development',
            institutionId: techAcademy.id,
            issuedAt: new Date('2025-01-15'),
            status: 'valid',
            country: 'USA',
            onChain: true,
            contentHash: '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
            issuedBy: issuerUser.id,
          },
          {
            id: 'VFY-2025-DEMO2',
            holderName: 'Jane Smith',
            title: 'Full Stack Development Bootcamp',
            institutionId: techAcademy.id,
            issuedAt: new Date('2025-01-20'),
            status: 'valid',
            country: 'Canada',
            onChain: true,
            contentHash: 'abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
            issuedBy: issuerUser.id,
          },
        ]).catch(() => {});

        console.log('✓ Created demo credentials (VFY-2025-DEMO1, VFY-2025-DEMO2)');
      }
    }

    console.log('\n✅ Seeding completed successfully!');
    console.log('\nDemo accounts:');
    console.log('- Issuer: demo_issuer / demo123');
    console.log('- Learner: demo_learner / demo123');
    console.log('\nYou can now start the development server: npm run dev');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await client.end();
  }
}

seed();
