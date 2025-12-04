import { User, Building2, ShieldCheck, LucideIcon } from "lucide-react";
import { UserRole } from "@/types";

interface RoleConfig {
  label: string;
  description: string;
  icon: LucideIcon;
  routes: string[];
  homeRoute: string;
}

export const ROLE_CONFIG: Record<NonNullable<UserRole>, RoleConfig> = {
  learner: {
    label: "Learner / Candidate",
    description: "View and share your verified credentials.",
    icon: User,
    routes: ["/dashboard", "/dashboard/credentials", "/dashboard/settings"],
    homeRoute: "/dashboard",
  },
  issuer: {
    label: "Institution / Issuer",
    description: "Issue and manage tamper-proof certificates.",
    icon: Building2,
    routes: ["/dashboard", "/dashboard/credentials", "/dashboard/analytics", "/dashboard/settings", "/dashboard/verify"],
    homeRoute: "/dashboard",
  },
  verifier: {
    label: "Recruiter / Verifier",
    description: "Verify candidates' claims instantly.",
    icon: ShieldCheck,
    routes: ["/dashboard", "/dashboard/verify", "/dashboard/settings"],
    homeRoute: "/dashboard",
  },
};
