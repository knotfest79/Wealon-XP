import { Folder } from "@/lib/types";

export const folders: Record<string, Folder> = {
  about: {
    id: "about",
    title: "About Us",
    address: "C:\\Wealon tax & accounting\\About Us",
    tiles: [
      {
        id: "overview",
        name: "Overview",
        desc: "Company overview & key stats",
        icon: "folder",
      },
      {
        id: "team",
        name: "Our Team",
        desc: "15 certified professionals",
        icon: "folder",
      },
      {
        id: "story",
        name: "Our Story",
        desc: "Since 1998 — 25 years",
        icon: "folder",
      },
      {
        id: "testimonials",
        name: "Testimonials",
        desc: "What clients say",
        icon: "folder",
      },
      {
        id: "contact",
        name: "Contact Us",
        desc: "Adelaide CBD & Mt Barker",
        icon: "folder",
      },
      {
        id: "whyus",
        name: "Why Choose Us",
        desc: "CPA certified, fixed fees",
        icon: "folder",
      },
    ],
  },
  services: {
    id: "services",
    title: "Services",
    address: "C:\\Wealon tax & accounting\\Services",
    tiles: [
      {
        id: "tax",
        name: "Tax Preparation",
        desc: "Individual & business returns",
        icon: "folder",
      },
      {
        id: "bookkeeping",
        name: "Bookkeeping & BAS",
        desc: "Cloud-based, Xero/MYOB",
        icon: "folder",
      },
      {
        id: "advisory",
        name: "Business Advisory",
        desc: "Growth & strategy consulting",
        icon: "folder",
      },
      {
        id: "audit",
        name: "Audit & Assurance",
        desc: "Statutory & SMSF audits",
        icon: "folder",
      },
      {
        id: "smsf",
        name: "SMSF Administration",
        desc: "Setup, compliance, returns",
        icon: "folder",
      },
      {
        id: "structure",
        name: "Company Structuring",
        desc: "Trusts, companies, succession",
        icon: "folder",
      },
      {
        id: "intltax",
        name: "International Tax",
        desc: "Cross-border, expat tax",
        icon: "folder",
      },
      {
        id: "cloud",
        name: "Cloud Accounting",
        desc: "Xero, MYOB migration",
        icon: "folder",
      },
    ],
  },
  downloads: {
    id: "downloads",
    title: "Downloads",
    address: "C:\\Wealon tax & accounting\\Downloads",
    tiles: [
      {
        id: "dl-checklist",
        name: "Tax Return Checklist",
        desc: "PDF — 240KB",
        icon: "pdf",
      },
      {
        id: "dl-expense",
        name: "Expense Tracker",
        desc: "XLSX — 85KB",
        icon: "xlsx",
      },
      {
        id: "dl-newclient",
        name: "New Client Pack",
        desc: "PDF — 1.2MB",
        icon: "pdf",
      },
      {
        id: "dl-smsf",
        name: "SMSF Setup Guide",
        desc: "DOC — 320KB",
        icon: "doc",
      },
      {
        id: "dl-bas",
        name: "BAS Lodgement Guide",
        desc: "PDF — 180KB",
        icon: "pdf",
      },
      {
        id: "dl-mileage",
        name: "Mileage Log Template",
        desc: "XLSX — 45KB",
        icon: "xlsx",
      },
      {
        id: "dl-privacy",
        name: "Privacy Policy",
        desc: "PDF — 95KB",
        icon: "pdf",
      },
      {
        id: "dl-engage",
        name: "Engagement Letter",
        desc: "DOC — 110KB",
        icon: "doc",
      },
    ],
  },
  booking: {
    id: "booking",
    title: "Booking Form",
    address: "C:\\Wealon tax & accounting\\Booking",
    tiles: [
      {
        id: "bookform",
        name: "Book Consultation",
        desc: "Free 30-minute meeting",
        icon: "form",
      },
    ],
  },
  pages: {
    id: "pages",
    title: "Pages",
    address: "C:\\Wealon tax & accounting\\Pages",
    tiles: [
      {
        id: "p-about",
        name: "About Us",
        desc: "6 pages inside",
        icon: "folder",
        openFolder: "about",
      },
      {
        id: "p-services",
        name: "Services",
        desc: "8 services listed",
        icon: "folder",
        openFolder: "services",
      },
      {
        id: "p-downloads",
        name: "Downloads",
        desc: "8 client resources",
        icon: "folder",
        openFolder: "downloads",
      },
      {
        id: "p-booking",
        name: "Booking Form",
        desc: "Free consultation",
        icon: "form",
        openFolder: "booking",
      },
    ],
  },
};
