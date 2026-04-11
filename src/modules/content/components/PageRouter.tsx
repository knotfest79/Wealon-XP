"use client";
import {
  OverviewPage,
  TeamPage,
  StoryPage,
  TestimonialsPage,
  ContactPage,
  WhyUsPage,
  TaxPage,
  BookkeepingPage,
  AdvisoryPage,
  AuditPage,
  SmsfPage,
  StructurePage,
  IntlTaxPage,
  CloudPage,
  DownloadPreview,
} from "./Pages";
import { BookingForm } from "@/modules/booking/components/BookingForm";

const pageMap: Record<string, React.FC> = {
  overview: OverviewPage,
  team: TeamPage,
  story: StoryPage,
  testimonials: TestimonialsPage,
  contact: ContactPage,
  whyus: WhyUsPage,
  tax: TaxPage,
  bookkeeping: BookkeepingPage,
  advisory: AdvisoryPage,
  audit: AuditPage,
  smsf: SmsfPage,
  structure: StructurePage,
  intltax: IntlTaxPage,
  cloud: CloudPage,
  bookform: BookingForm,
};

const downloadInfo: Record<string, { title: string; desc: string }> = {
  "dl-checklist": {
    title: "Tax Return Checklist",
    desc: "Comprehensive FY2025 individual tax return checklist. Includes all deduction categories, required documents, and ATO deadlines.",
  },
  "dl-expense": {
    title: "Expense Tracker",
    desc: "Monthly expense log with GST calculation. Compatible with Xero import format.",
  },
  "dl-newclient": {
    title: "New Client Pack",
    desc: "Welcome pack including engagement letter, tax agent authority form, client questionnaire, and privacy notice.",
  },
  "dl-smsf": {
    title: "SMSF Setup Guide",
    desc: "Step-by-step guide to establishing a Self-Managed Superannuation Fund.",
  },
  "dl-bas": {
    title: "BAS Lodgement Guide",
    desc: "Instructions for preparing and lodging your Business Activity Statement.",
  },
  "dl-mileage": {
    title: "Mileage Log Template",
    desc: "ATO-compliant vehicle logbook template for work-related travel deductions.",
  },
  "dl-privacy": {
    title: "Privacy Policy",
    desc: "Wealon tax & accounting client data handling and privacy policy.",
  },
  "dl-engage": {
    title: "Engagement Letter",
    desc: "Standard engagement letter template for new client relationships.",
  },
};

const titleMap: Record<string, string> = {
  overview: "Overview",
  team: "Our Team",
  story: "Our Story",
  testimonials: "Testimonials",
  contact: "Contact Us",
  whyus: "Why Choose Us",
  tax: "Tax Preparation",
  bookkeeping: "Bookkeeping & BAS",
  advisory: "Business Advisory",
  audit: "Audit & Assurance",
  smsf: "SMSF Administration",
  structure: "Company Structuring",
  intltax: "International Tax",
  cloud: "Cloud Accounting",
  bookform: "Book Consultation",
};

export function getPageTitle(id: string): string {
  if (titleMap[id]) return titleMap[id];
  if (downloadInfo[id]) return downloadInfo[id].title;
  return id;
}

export function PageRouter({ pageId }: { pageId: string }) {
  const Comp = pageMap[pageId];
  if (Comp) return <Comp />;

  const dl = downloadInfo[pageId];
  if (dl) return <DownloadPreview title={dl.title} desc={dl.desc} />;

  return (
    <div className="p-6">
      <h2
        className="text-sm font-bold text-[#7f2e77] mb-2"
        style={{ fontFamily: "Georgia, serif" }}
      >
        {pageId}
      </h2>
      <p className="text-[11px] text-[#333]">
        Coming soon. Contact us at (08) 8232 4500.
      </p>
    </div>
  );
}
