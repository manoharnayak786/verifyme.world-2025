import { db } from '../db';
import { blockchainEvents } from '../schema';
import { randomUUID } from 'crypto';

interface BlockchainSimulation {
  credentialId: string;
  contentHash: string;
}

export async function simulateBlockchainTransaction(data: BlockchainSimulation) {
  // Simulate a blockchain transaction
  const txId = `0x${randomUUID().replace(/-/g, '')}`;
  const blockNumber = Math.floor(Math.random() * 1000000) + 1000000;

  // Store in database
  const event = await db.insert(blockchainEvents).values({
    credentialId: data.credentialId,
    contentHash: data.contentHash,
    txId,
    blockNumber,
    status: 'confirmed',
  }).returning();

  return {
    txId,
    blockNumber,
    status: 'confirmed',
    timestamp: event[0]?.timestamp || new Date(),
  };
}

export async function getBlockchainEvents(credentialId: string) {
  return db.query.blockchainEvents.findMany({
    where: (events, { eq }) => eq(events.credentialId, credentialId),
    orderBy: (events, { desc }) => [desc(events.timestamp)],
  });
}
