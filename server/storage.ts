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
    this.seedData();
  }

  // Seed initial data
  private seedData() {
    // Seed institutions
    const institutionsData = [
      {
        id: "inst-001",
        name: "Global University of Tech",
        slug: "global-tech",
        country: "India",
        logoInitials: "GT",
        type: "university",
        createdBy: null,
        createdAt: new Date(),
      },
      {
        id: "inst-002",
        name: "Future Skills Institute",
        slug: "future-skills",
        country: "USA",
        logoInitials: "FS",
        type: "certification-body",
        createdBy: null,
        createdAt: new Date(),
      },
      {
        id: "inst-003",
        name: "National Singapore Business School",
        slug: "nsbs",
        country: "Singapore",
        logoInitials: "NS",
        type: "university",
        createdBy: null,
        createdAt: new Date(),
      },
      {
        id: "inst-004",
        name: "IronHack Madrid",
        slug: "ironhack-madrid",
        country: "Spain",
        logoInitials: "IH",
        type: "bootcamp",
        createdBy: null,
        createdAt: new Date(),
      },
      {
        id: "inst-005",
        name: "Cloud Native Foundation",
        slug: "cnf",
        country: "Canada",
        logoInitials: "CN",
        type: "certification-body",
        createdBy: null,
        createdAt: new Date(),
      },
    ];

    institutionsData.forEach(inst => this.institutions.set(inst.id, inst as Institution));

    // Seed credentials
    const credentialsData = [
      {
        id: "VFY-2024-8842",
        holderName: "Arjun Kumar",
        title: "B.Sc Computer Science",
        institutionId: "inst-001",
        issuedAt: new Date("2024-06-01"),
        expiresAt: null,
        status: "valid",
        country: "India",
        onChain: true,
        imageUrl: null,
        issuedBy: null,
        createdAt: new Date(),
      },
      {
        id: "VFY-2023-9912",
        holderName: "Sarah Jenkins",
        title: "Data Science Professional Certificate",
        institutionId: "inst-002",
        issuedAt: new Date("2023-11-15"),
        expiresAt: null,
        status: "valid",
        country: "USA",
        onChain: true,
        imageUrl: null,
        issuedBy: null,
        createdAt: new Date(),
      },
      {
        id: "VFY-2022-1001",
        holderName: "Wei Chen",
        title: "Master of Business Administration",
        institutionId: "inst-003",
        issuedAt: new Date("2022-05-20"),
        expiresAt: null,
        status: "valid",
        country: "Singapore",
        onChain: true,
        imageUrl: null,
        issuedBy: null,
        createdAt: new Date(),
      },
      {
        id: "VFY-2024-0055",
        holderName: "Elena Rodriguez",
        title: "Full Stack Web Development Bootcamp",
        institutionId: "inst-004",
        issuedAt: new Date("2024-01-10"),
        expiresAt: null,
        status: "revoked",
        country: "Spain",
        onChain: true,
        imageUrl: null,
        issuedBy: null,
        createdAt: new Date(),
      },
      {
        id: "VFY-2025-0101",
        holderName: "Michael Chang",
        title: "Cloud Architecture Certification",
        institutionId: "inst-005",
        issuedAt: new Date("2025-02-28"),
        expiresAt: new Date("2028-02-28"),
        status: "pending",
        country: "Canada",
        onChain: false,
        imageUrl: null,
        issuedBy: null,
        createdAt: new Date(),
      },
    ];

    credentialsData.forEach(cred => this.credentials.set(cred.id, cred as Credential));

    // Seed verifications
    const verificationsData = [
      {
        id: "ver-001",
        credentialId: "VFY-2024-8842",
        verifiedBy: "TechRecruit Inc.",
        verifiedAt: new Date("2024-08-10T14:30:00Z"),
        result: "success",
        location: "Bangalore, India",
        createdAt: new Date("2024-08-10T14:30:00Z"),
      },
      {
        id: "ver-002",
        credentialId: "VFY-2024-8842",
        verifiedBy: "Global Systems Corp",
        verifiedAt: new Date("2024-09-12T09:15:00Z"),
        result: "success",
        location: "London, UK",
        createdAt: new Date("2024-09-12T09:15:00Z"),
      },
      {
        id: "ver-003",
        credentialId: "VFY-2024-0055",
        verifiedBy: "StartUp Hire",
        verifiedAt: new Date("2024-02-20T11:45:00Z"),
        result: "failed",
        location: "Madrid, Spain",
        createdAt: new Date("2024-02-20T11:45:00Z"),
      },
      {
        id: "ver-004",
        credentialId: "VFY-2023-9912",
        verifiedBy: "Data Analytics Partners",
        verifiedAt: new Date("2025-01-05T16:20:00Z"),
        result: "success",
        location: "New York, USA",
        createdAt: new Date("2025-01-05T16:20:00Z"),
      },
    ];

    verificationsData.forEach(ver => this.verifications.set(ver.id, ver as Verification));
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
