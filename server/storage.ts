import { 
  type User, 
  type InsertUser,
  type Institution,
  type Credential,
  type Verification 
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Institution methods
  getAllInstitutions(): Promise<Institution[]>;
  getInstitution(id: string): Promise<Institution | undefined>;
  createInstitution(institution: Omit<Institution, 'id' | 'createdAt'>): Promise<Institution>;
  
  // Credential methods
  getAllCredentials(): Promise<Credential[]>;
  getCredential(id: string): Promise<Credential | undefined>;
  createCredential(credential: Omit<Credential, 'createdAt'>): Promise<Credential>;
  updateCredentialStatus(id: string, status: string): Promise<Credential | undefined>;
  deleteCredential(id: string): Promise<boolean>;
  searchCredentials(query: string): Promise<Credential[]>;
  
  // Verification methods
  getAllVerifications(): Promise<Verification[]>;
  getVerificationsByCredential(credentialId: string): Promise<Verification[]>;
  createVerification(verification: Omit<Verification, 'id' | 'verifiedAt' | 'createdAt'>): Promise<Verification>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private institutions: Map<string, Institution>;
  private credentials: Map<string, Credential>;
  private verifications: Map<string, Verification>;

  constructor() {
    this.users = new Map();
    this.institutions = new Map();
    this.credentials = new Map();
    this.verifications = new Map();
    // Start with empty storage - no seed data
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      role: insertUser.role || "learner",
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  // Institution methods
  async getAllInstitutions(): Promise<Institution[]> {
    return Array.from(this.institutions.values());
  }

  async getInstitution(id: string): Promise<Institution | undefined> {
    return this.institutions.get(id);
  }

  async createInstitution(institution: Omit<Institution, 'id' | 'createdAt'>): Promise<Institution> {
    const id = randomUUID();
    const newInstitution: Institution = {
      ...institution,
      id,
      createdAt: new Date(),
    };
    this.institutions.set(id, newInstitution);
    return newInstitution;
  }

  // Credential methods
  async getAllCredentials(): Promise<Credential[]> {
    return Array.from(this.credentials.values());
  }

  async getCredential(id: string): Promise<Credential | undefined> {
    return this.credentials.get(id);
  }

  async createCredential(credential: Omit<Credential, 'createdAt'>): Promise<Credential> {
    const newCredential: Credential = {
      ...credential,
      createdAt: new Date(),
    };
    this.credentials.set(credential.id, newCredential);
    return newCredential;
  }

  async updateCredentialStatus(id: string, status: string): Promise<Credential | undefined> {
    const credential = this.credentials.get(id);
    if (!credential) return undefined;
    
    const updated: Credential = { ...credential, status };
    this.credentials.set(id, updated);
    return updated;
  }

  async deleteCredential(id: string): Promise<boolean> {
    return this.credentials.delete(id);
  }

  async searchCredentials(query: string): Promise<Credential[]> {
    const q = query.toLowerCase();
    return Array.from(this.credentials.values()).filter(c =>
      c.id.toLowerCase().includes(q) ||
      c.holderName.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q)
    );
  }

  // Verification methods
  async getAllVerifications(): Promise<Verification[]> {
    return Array.from(this.verifications.values());
  }

  async getVerificationsByCredential(credentialId: string): Promise<Verification[]> {
    return Array.from(this.verifications.values()).filter(
      v => v.credentialId === credentialId
    );
  }

  async createVerification(verification: Omit<Verification, 'id' | 'verifiedAt' | 'createdAt'>): Promise<Verification> {
    const id = randomUUID();
    const newVerification: Verification = {
      ...verification,
      id,
      verifiedAt: new Date(),
      createdAt: new Date(),
    };
    this.verifications.set(id, newVerification);
    return newVerification;
  }
}

export const storage = new MemStorage();
