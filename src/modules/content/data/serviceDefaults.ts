import type { Tile } from "@/lib/types";

export type ServiceSeed = {
  slug: string;
  title: string;
  cardDescription: string;
  icon: string;
  subtitle: string;
  items: string[];
  sortOrder: number;
};

export const servicesIndexSeed = {
  slug: "services",
  title: "Services",
  heroHeading: "Accounting services for individuals and small businesses",
  heroBody:
    "Tax, bookkeeping, BAS, advisory, SMSF, audit, structuring, and cloud accounting support from one Adelaide-based team.",
  eyebrow: "Services",
};

export const serviceSeeds: ServiceSeed[] = [
  {
    slug: "tax",
    title: "Tax Preparation",
    cardDescription: "Individual & business returns",
    icon: "📊",
    subtitle: "Returns & Planning",
    sortOrder: 1,
    items: [
      "Individual tax returns",
      "Company & trust returns",
      "Capital gains calculations",
      "BAS/IAS preparation",
      "Proactive tax planning",
      "ATO audit representation",
    ],
  },
  {
    slug: "bookkeeping",
    title: "Bookkeeping & BAS",
    cardDescription: "Cloud-based, Xero/MYOB",
    icon: "📒",
    subtitle: "Cloud-Based",
    sortOrder: 2,
    items: [
      "Monthly bookkeeping via Xero/MYOB",
      "BAS & IAS preparation",
      "Bank reconciliation",
      "STP-compliant payroll",
      "AP/AR management",
    ],
  },
  {
    slug: "advisory",
    title: "Business Advisory",
    cardDescription: "Growth & strategy consulting",
    icon: "🏢",
    subtitle: "Strategic Consulting",
    sortOrder: 3,
    items: [
      "Cashflow forecasting & budgets",
      "KPI dashboards",
      "Business plan development",
      "Pricing & margin analysis",
      "Exit & succession planning",
    ],
  },
  {
    slug: "audit",
    title: "Audit & Assurance",
    cardDescription: "Statutory & SMSF audits",
    icon: "🔍",
    subtitle: "Compliance",
    sortOrder: 4,
    items: [
      "Statutory financial audits",
      "SMSF compliance audits",
      "Internal control reviews",
      "Due diligence",
      "Not-for-profit audits",
    ],
  },
  {
    slug: "smsf",
    title: "SMSF Administration",
    cardDescription: "Setup, compliance, returns",
    icon: "🏠",
    subtitle: "Self-Managed Super",
    sortOrder: 5,
    items: [
      "SMSF establishment",
      "Annual returns & statements",
      "Investment strategy review",
      "Pension management",
      "ATO compliance",
    ],
  },
  {
    slug: "structure",
    title: "Company Structuring",
    cardDescription: "Trusts, companies, succession",
    icon: "📑",
    subtitle: "Entity & Asset Protection",
    sortOrder: 6,
    items: [
      "Company/trust/partnership formation",
      "Business restructures",
      "Asset protection",
      "Family trust planning",
      "Succession & estate",
    ],
  },
  {
    slug: "intltax",
    title: "International Tax",
    cardDescription: "Cross-border, expat tax",
    icon: "🌏",
    subtitle: "Cross-Border",
    sortOrder: 7,
    items: [
      "Foreign income reporting",
      "Transfer pricing",
      "Expat taxation",
      "Double tax agreements",
      "CFC/FIF compliance",
    ],
  },
  {
    slug: "cloud",
    title: "Cloud Accounting",
    cardDescription: "Xero, MYOB migration",
    icon: "☁️",
    subtitle: "Digital Transformation",
    sortOrder: 8,
    items: [
      "Migration to Xero/MYOB/QBO",
      "App integrations",
      "Workflow automation",
      "Staff training",
      "Multi-entity config",
    ],
  },
];

export const serviceTiles: Tile[] = serviceSeeds.map((service) => ({
  id: service.slug,
  name: service.title,
  desc: service.cardDescription,
  icon: "folder",
}));
