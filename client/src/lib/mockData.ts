import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Certificate = {
  id: string;
  studentName: string;
  course: string;
  issueDate: string;
  issuerName: string;
  issuerLogo?: string;
  hash: string;
  status: "verified" | "revoked" | "pending";
  description: string;
};

export const MOCK_CERTIFICATES: Certificate[] = [
  {
    id: "VFY-2025-8842",
    studentName: "Arjun Kumar",
    course: "Advanced Full Stack Development",
    issueDate: "2025-03-15",
    issuerName: "TechOne Academy",
    hash: "0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
    status: "verified",
    description: "Successfully completed the 12-week intensive bootcamp covering React, Node.js, and System Design."
  },
  {
    id: "VFY-2025-9912",
    studentName: "Priya Sharma",
    course: "Data Science & AI Fundamentals",
    issueDate: "2025-02-20",
    issuerName: "Future Skills Institute",
    hash: "0x3a1d65dfc2d4b1fa3d677284addd200126d90697f83b1657ff1fc53b92dc18",
    status: "verified",
    description: "Awarded for outstanding performance in the Winter 2025 cohort."
  },
  {
    id: "VFY-2025-1001",
    studentName: "Rahul Verma",
    course: "Blockchain Architecture 101",
    issueDate: "2025-01-10",
    issuerName: "CryptoUniversity",
    hash: "0x92dc18148a1d65dfc2d4b1fa3d677284addd200126d90697f83b1657ff1fc5",
    status: "verified",
    description: "Certified Blockchain Associate level 1."
  }
];

export const MOCK_ISSUER = {
  name: "TechOne Academy",
  email: "admin@techone.edu",
  totalIssued: 1245,
  verificationCount: 8502
};
