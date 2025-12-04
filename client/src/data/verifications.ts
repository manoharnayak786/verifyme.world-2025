export interface Verification {
  id: string;
  credentialId: string;
  verifiedBy: string;
  verifiedAt: string;
  result: "success" | "failed";
  location: string;
}

export const MOCK_VERIFICATIONS: Verification[] = [
  {
    id: "ver-001",
    credentialId: "VFY-2024-8842",
    verifiedBy: "TechRecruit Inc.",
    verifiedAt: "2024-08-10T14:30:00Z",
    result: "success",
    location: "Bangalore, India",
  },
  {
    id: "ver-002",
    credentialId: "VFY-2024-8842",
    verifiedBy: "Global Systems Corp",
    verifiedAt: "2024-09-12T09:15:00Z",
    result: "success",
    location: "London, UK",
  },
  {
    id: "ver-003",
    credentialId: "VFY-2024-0055",
    verifiedBy: "StartUp Hire",
    verifiedAt: "2024-02-20T11:45:00Z",
    result: "failed",
    location: "Madrid, Spain",
  },
  {
    id: "ver-004",
    credentialId: "VFY-2023-9912",
    verifiedBy: "Data Analytics Partners",
    verifiedAt: "2025-01-05T16:20:00Z",
    result: "success",
    location: "New York, USA",
  },
];
