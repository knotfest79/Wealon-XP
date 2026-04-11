import { TeamMember, TimelineEntry, Testimonial } from "@/lib/types";

export const leadership: TeamMember[] = [
  { initials: "RS", name: "Anup K Shrestha", role: "Managing Partner, CPA" },
  { initials: "KM", name: "Karen Mitchell", role: "Senior Tax Partner" },
  { initials: "DL", name: "David Liao", role: "Business Advisory Director" },
  { initials: "SP", name: "Sarah Patel", role: "Compliance Manager" },
];

export const specialists: TeamMember[] = [
  { initials: "JW", name: "James Wong", role: "SMSF Specialist" },
  { initials: "AK", name: "Aisha Khan", role: "International Tax" },
  { initials: "TM", name: "Tom Murray", role: "Cloud Accounting Lead" },
  { initials: "LR", name: "Lisa Romano", role: "Senior Bookkeeper" },
];

export const timeline: TimelineEntry[] = [
  {
    year: "1998",
    description:
      "Anup K Shrestha founds the firm on Flinders Street, Adelaide with two staff.",
  },
  {
    year: "2003",
    description:
      "Grows to 6 staff. Karen Mitchell joins. First corporate clients in construction.",
  },
  {
    year: "2008",
    description:
      "Relocates to King William St. Business Advisory division launched. Helps 200+ clients through GFC.",
  },
  {
    year: "2012",
    description:
      "Achieves Xero Gold Partner status. First paperless firm in Adelaide CBD. SMSF practice launched.",
  },
  {
    year: "2016",
    description:
      "Expands to 12 team members. Opens Mt Barker satellite office.",
  },
  {
    year: "2020",
    description:
      "Fully remote during COVID. 350+ clients assisted with JobKeeper applications.",
  },
  {
    year: "2023",
    description:
      "25th anniversary. International tax division launched. 1,200+ active clients.",
  },
  {
    year: "2025",
    description:
      "Investing in AI-powered analytics and client portal for real-time financial insights.",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Wealon tax & Accounting saved our business during COVID. Their proactive cashflow forecasting kept us afloat.",
    attribution: "Michael Torres, Torres Hospitality Group",
  },
  {
    quote:
      "Been with S&A for 12 years. They handle everything — tax, SMSF, rentals. Like having a CFO on call.",
    attribution: "Jennifer Liu, Property Investor",
  },
  {
    quote:
      "Karen found $38,000 in deductions I didn't know I could claim. Worth every cent.",
    attribution: "Dr. Priya Sharma, General Practitioner",
  },
  {
    quote:
      "The Xero migration was seamless. We save 15 hours a week on bookkeeping now.",
    attribution: "Daniel & Rebecca Marsh, Marsh Electrical",
  },
  {
    quote:
      "Professional, responsive, and genuinely invested in our growth. We're saving significantly on tax.",
    attribution: "Chris & Sam Nguyen, Nguyen Construction Pty Ltd",
  },
];
