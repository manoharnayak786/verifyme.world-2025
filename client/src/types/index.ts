export type UserRole = "learner" | "issuer" | "verifier" | null;

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
  institution?: Institution; // Optional for joined data
}

export type InstitutionType = "university" | "bootcamp" | "mooc" | "certification-body";

export interface Institution {
  id: string;
  name: string;
  slug: string;
  country: string;
  logoInitials: string;
  type: InstitutionType;
}

export interface Verification {
  id: string;
  credentialId: string;
  verifiedBy: string;
  verifiedAt: string;
  result: "success" | "failed";
  location: string;
}
