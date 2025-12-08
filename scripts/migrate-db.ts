/**
 * Database Migration Script
 * Run: npx tsx scripts/migrate-db.ts
 */

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { sql } from 'drizzle-orm';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

async function migrate() {
  console.log('Starting database migration...');
  
  const client = postgres(DATABASE_URL, { max: 1 });
  const db = drizzle(client);

  try {
    // Create users table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        email TEXT,
        role TEXT NOT NULL DEFAULT 'learner',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    console.log('✓ Created users table');

    // Create institutions table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS institutions (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        country TEXT NOT NULL,
        logo_initials TEXT NOT NULL,
        type TEXT NOT NULL,
        created_by VARCHAR REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    console.log('✓ Created institutions table');

    // Create credentials table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS credentials (
        id VARCHAR PRIMARY KEY,
        holder_name TEXT NOT NULL,
        title TEXT NOT NULL,
        institution_id VARCHAR REFERENCES institutions(id) NOT NULL,
        issued_at TIMESTAMP NOT NULL,
        expires_at TIMESTAMP,
        status TEXT NOT NULL DEFAULT 'valid',
        country TEXT NOT NULL,
        on_chain BOOLEAN NOT NULL DEFAULT false,
        pdf_base64 TEXT,
        content_hash VARCHAR(64),
        qr_code_data TEXT,
        image_url TEXT,
        issued_by VARCHAR REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    console.log('✓ Created credentials table');

    // Create verifications table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS verifications (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        credential_id VARCHAR REFERENCES credentials(id) NOT NULL,
        verified_by TEXT NOT NULL,
        verified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        result TEXT NOT NULL,
        location TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    console.log('✓ Created verifications table');

    // Create blockchain_events table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS blockchain_events (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        credential_id VARCHAR REFERENCES credentials(id) NOT NULL,
        content_hash VARCHAR(64) NOT NULL,
        tx_id VARCHAR NOT NULL,
        block_number INTEGER,
        status TEXT NOT NULL DEFAULT 'confirmed',
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    console.log('✓ Created blockchain_events table');

    console.log('\n✅ Migration completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Run seed script: npx tsx scripts/seed-db.ts');
    console.log('2. Start development: npm run dev');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

migrate();
