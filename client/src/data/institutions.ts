export type InstitutionType = "university" | "bootcamp" | "mooc" | "certification-body";

export interface Institution {
  id: string;
  name: string;
  slug: string;
  country: string;
  logoInitials: string;
  type: InstitutionType;
}

export const MOCK_INSTITUTIONS: Institution[] = [
  {
    id: "inst-001",
    name: "Global University of Tech",
    slug: "global-tech",
    country: "India",
    logoInitials: "GT",
    type: "university",
  },
  {
    id: "inst-002",
    name: "Future Skills Institute",
    slug: "future-skills",
    country: "USA",
    logoInitials: "FS",
    type: "certification-body",
  },
  {
    id: "inst-003",
    name: "National Singapore Business School",
    slug: "nsbs",
    country: "Singapore",
    logoInitials: "NS",
    type: "university",
  },
  {
    id: "inst-004",
    name: "IronHack Madrid",
    slug: "ironhack-madrid",
    country: "Spain",
    logoInitials: "IH",
    type: "bootcamp",
  },
  {
    id: "inst-005",
    name: "Cloud Native Foundation",
    slug: "cnf",
    country: "Canada",
    logoInitials: "CN",
    type: "certification-body",
  },
];
