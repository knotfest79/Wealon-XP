export type SeoRoute = {
  path: string;
  pageId: string;
  title: string;
  description: string;
  section: "about" | "services" | "contact" | "booking";
};

const siteName = "Wealon Tax & Accounting";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://wealon.com.au";

export const seoRoutes: SeoRoute[] = [
  {
    path: "/about",
    pageId: "overview",
    title: `About Us | ${siteName}`,
    description:
      "Learn about Wealon Tax & Accounting, Adelaide accountants supporting individuals and small businesses with tax, bookkeeping, and advisory services.",
    section: "about",
  },
  {
    path: "/about/team",
    pageId: "team",
    title: `Our Team | ${siteName}`,
    description:
      "Meet the Wealon Tax & Accounting team of qualified accountants, tax specialists, bookkeepers, and business advisors.",
    section: "about",
  },
  {
    path: "/about/story",
    pageId: "story",
    title: `Our Story | ${siteName}`,
    description:
      "Read the story of Wealon Tax & Accounting and our history serving clients across Adelaide and South Australia.",
    section: "about",
  },
  {
    path: "/about/testimonials",
    pageId: "testimonials",
    title: `Client Testimonials | ${siteName}`,
    description:
      "See what clients say about working with Wealon Tax & Accounting for tax, bookkeeping, advisory, and compliance support.",
    section: "about",
  },
  {
    path: "/about/whyus",
    pageId: "whyus",
    title: `Why Choose Us | ${siteName}`,
    description:
      "Find out why clients choose Wealon Tax & Accounting for fixed-fee accounting, local support, and practical financial advice.",
    section: "about",
  },
  {
    path: "/services",
    pageId: "services-index",
    title: `Accounting Services | ${siteName}`,
    description:
      "Explore tax, bookkeeping, BAS, SMSF, audit, business advisory, structuring, and cloud accounting services from Wealon.",
    section: "services",
  },
  {
    path: "/services/tax",
    pageId: "tax",
    title: `Tax Preparation | ${siteName}`,
    description:
      "Individual and business tax return preparation, BAS and IAS support, tax planning, and ATO audit representation.",
    section: "services",
  },
  {
    path: "/services/bookkeeping",
    pageId: "bookkeeping",
    title: `Bookkeeping & BAS | ${siteName}`,
    description:
      "Cloud bookkeeping, BAS and IAS preparation, bank reconciliation, payroll, and accounts support for small businesses.",
    section: "services",
  },
  {
    path: "/services/advisory",
    pageId: "advisory",
    title: `Business Advisory | ${siteName}`,
    description:
      "Business advisory services covering cashflow forecasts, budgets, KPI dashboards, pricing, growth, and succession planning.",
    section: "services",
  },
  {
    path: "/services/audit",
    pageId: "audit",
    title: `Audit & Assurance | ${siteName}`,
    description:
      "Audit and assurance services for statutory reporting, SMSF compliance, internal controls, and not-for-profit audits.",
    section: "services",
  },
  {
    path: "/services/smsf",
    pageId: "smsf",
    title: `SMSF Administration | ${siteName}`,
    description:
      "SMSF setup, annual returns, compliance, pension management, and investment strategy review services.",
    section: "services",
  },
  {
    path: "/services/structure",
    pageId: "structure",
    title: `Company Structuring | ${siteName}`,
    description:
      "Company, trust, partnership, restructuring, asset protection, family trust, succession, and estate planning support.",
    section: "services",
  },
  {
    path: "/services/intltax",
    pageId: "intltax",
    title: `International Tax | ${siteName}`,
    description:
      "Cross-border tax support for foreign income, expat taxation, double tax agreements, and international compliance.",
    section: "services",
  },
  {
    path: "/services/cloud",
    pageId: "cloud",
    title: `Cloud Accounting | ${siteName}`,
    description:
      "Cloud accounting migration, app integrations, workflow automation, staff training, and multi-entity configuration.",
    section: "services",
  },
  {
    path: "/contact",
    pageId: "contact",
    title: `Contact | ${siteName}`,
    description:
      "Contact Wealon Tax & Accounting for accounting, tax, bookkeeping, and advisory support in Adelaide and Unley.",
    section: "contact",
  },
  {
    path: "/book",
    pageId: "bookform",
    title: `Book a Consultation | ${siteName}`,
    description:
      "Book a free 30-minute consultation with Wealon Tax & Accounting for tax, bookkeeping, BAS, or business advisory help.",
    section: "booking",
  },
];

export const seoRouteByPath = new Map(seoRoutes.map((route) => [route.path, route]));
export const seoRouteByPageId = new Map(
  seoRoutes.map((route) => [route.pageId, route]),
);

export function getSeoRoute(path: string) {
  return seoRouteByPath.get(path);
}

export function getRoutePathForPageId(pageId: string) {
  return seoRouteByPageId.get(pageId)?.path;
}

export function getFolderIdForPageId(pageId: string) {
  if (
    [
      "overview",
      "team",
      "story",
      "testimonials",
      "contact",
      "whyus",
    ].includes(pageId)
  ) {
    return "about";
  }

  if (
    [
      "tax",
      "bookkeeping",
      "advisory",
      "audit",
      "smsf",
      "structure",
      "intltax",
      "cloud",
    ].includes(pageId)
  ) {
    return "services";
  }

  if (pageId === "bookform") return "booking";
  return undefined;
}

export function getRoutePathForFolderId(folderId: string) {
  if (folderId === "about") return "/about";
  if (folderId === "services") return "/services";
  if (folderId === "booking") return "/book";
  return undefined;
}

export function getOpenGraphImage() {
  return `${siteUrl}/logo/Wealon-logo1.png`;
}
