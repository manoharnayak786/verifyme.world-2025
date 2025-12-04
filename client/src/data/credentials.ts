export type CredentialStatus = "valid" | "revoked" | "expired" | "pending";

export interface Credential {
  id: string;
  holderName: string;
  title: string;
  institutionId: string;
  issuedAt: string;
  expiresAt?: string;
  status: CredentialStatus;
  country: string;
  onChain: boolean;
  imageUrl?: string;
}

export const MOCK_CREDENTIALS: Credential[] = [
  {
    id: "VFY-2024-8842",
    holderName: "Arjun Kumar",
    title: "B.Sc Computer Science",
    institutionId: "inst-001",
    issuedAt: "2024-06-01",
    status: "valid",
    country: "India",
    onChain: true,
  },
  {
    id: "VFY-2023-9912",
    holderName: "Sarah Jenkins",
    title: "Data Science Professional Certificate",
    institutionId: "inst-002",
    issuedAt: "2023-11-15",
    status: "valid",
    country: "USA",
    onChain: true,
  },
  {
    id: "VFY-2022-1001",
    holderName: "Wei Chen",
    title: "Master of Business Administration",
    institutionId: "inst-003",
    issuedAt: "2022-05-20",
    status: "valid",
    country: "Singapore",
    onChain: true,
  },
  {
    id: "VFY-2024-0055",
    holderName: "Elena Rodriguez",
    title: "Full Stack Web Development Bootcamp",
    institutionId: "inst-004",
    issuedAt: "2024-01-10",
    status: "revoked",
    country: "Spain",
    onChain: true,
  },
  {
    id: "VFY-2025-0101",
    holderName: "Michael Chang",
    title: "Cloud Architecture Certification",
    institutionId: "inst-005",
    issuedAt: "2025-02-28",
    expiresAt: "2028-02-28",
    status: "pending",
    country: "Canada",
    onChain: false,
  },
];
