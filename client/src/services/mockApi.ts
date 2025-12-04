import { Credential, Institution, Verification } from "@/types";
import { MOCK_CREDENTIALS } from "@/data/credentials";
import { MOCK_INSTITUTIONS } from "@/data/institutions";
import { MOCK_VERIFICATIONS } from "@/data/verifications";

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  credentials: {
    list: async (): Promise<Credential[]> => {
      await delay(800);
      return [...MOCK_CREDENTIALS];
    },
    getById: async (id: string): Promise<Credential | undefined> => {
      await delay(600);
      return MOCK_CREDENTIALS.find(c => c.id === id);
    },
    search: async (query: string): Promise<Credential[]> => {
      await delay(1000);
      const q = query.toLowerCase();
      return MOCK_CREDENTIALS.filter(c => 
        c.id.toLowerCase().includes(q) || 
        c.holderName.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q)
      );
    },
    create: async (data: Partial<Credential>): Promise<Credential> => {
      await delay(1500);
      const newCred: Credential = {
        id: `VFY-2025-${Math.floor(1000 + Math.random() * 9000)}`,
        holderName: data.holderName || "Unknown",
        title: data.title || "New Certification",
        institutionId: data.institutionId || "inst-001",
        issuedAt: new Date().toISOString(),
        status: "valid",
        country: "Global",
        onChain: true,
        ...data
      } as Credential;
      // In a real app, we'd push to mock array, but for immutable mock data feeling we can just return it
      return newCred;
    }
  },
  institutions: {
    list: async (): Promise<Institution[]> => {
      await delay(500);
      return [...MOCK_INSTITUTIONS];
    },
    getById: async (id: string): Promise<Institution | undefined> => {
      await delay(300);
      return MOCK_INSTITUTIONS.find(i => i.id === id);
    }
  },
  verifications: {
    list: async (): Promise<Verification[]> => {
      await delay(700);
      return [...MOCK_VERIFICATIONS];
    }
  }
};
