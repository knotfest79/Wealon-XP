"use client";
import { PageHero } from "./PageHero";
import {
  leadership,
  specialists,
  timeline,
  testimonials,
} from "../data/content";

function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-6 max-md:px-4 py-4 max-md:py-3 border-b border-[#e8e4d8] last:border-b-0">
      {children}
    </div>
  );
}
function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-sm font-bold text-[#7f2e77] mb-2"
      style={{ fontFamily: "Georgia, serif" }}
    >
      {children}
    </h2>
  );
}
function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] max-md:text-xs text-[#333] leading-relaxed mb-1.5">
      {children}
    </p>
  );
}

function TeamCard({
  initials,
  name,
  role,
}: {
  initials: string;
  name: string;
  role: string;
}) {
  return (
    <div className="w-[130px] max-md:w-[calc(50%-4px)] bg-[#fbf5fa] border border-[#ead3e5] rounded p-2.5 text-center">
      <div
        className="w-11 h-11 mx-auto mb-1.5 rounded-full border-2 border-[#a43d98] bg-[#a43d98] flex items-center justify-center text-lg text-white"
        style={{ fontFamily: "Georgia, serif" }}
      >
        {initials}
      </div>
      <div className="text-[11px] font-bold text-[#7f2e77]">{name}</div>
      <div className="text-[10px] text-[#666] mt-px">{role}</div>
    </div>
  );
}

export function OverviewPage() {
  return (
    <>
      <PageHero
        title="Wealon tax & accounting"
        subtitle="Certified Public Accountants & Advisors"
        showLogo
      />
      <Section>
        <H2>📋 Who We Are</H2>
        <P>
          At Wealon Accounting, we specialize in delivering professional
          bookkeeping and tax return services for individuals and small
          businesses across Modbury, Adelaide CBD, and Unley. Backed by over 5
          years of experience in South Australia and supported by qualified
          accountants with 10+ years of industry expertise, we’re committed to
          making your finances stress-free and accurate. Whether you need help
          with quarterly BAS, annual tax filing, or ongoing business bookkeeping
          — Wealon Accounting is here to support you every step of the way.
        </P>
        <div className="flex gap-3 flex-wrap my-3">
          {[
            { n: "25+", l: "Years" },
            { n: "1,200+", l: "Clients" },
            { n: "98%", l: "Retention" },
            { n: "15", l: "Team" },
          ].map((s) => (
            <div
              key={s.l}
              className="bg-gradient-to-br from-[#5f1f5c] to-[#a43d98] rounded-md px-4 max-md:px-3 py-3 max-md:py-2 text-center min-w-[100px] max-md:min-w-[70px] border border-[rgba(215,163,207,.45)]"
            >
              <div
                className="text-xl max-md:text-lg font-bold text-[#ffe3fb]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {s.n}
              </div>
              <div className="text-[10px] max-md:text-[9px] text-white/80 uppercase tracking-wider mt-0.5">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <H2>🎯 Our Mission</H2>
        <P>
          To empower our clients with clarity, confidence, and control over
          their financial future through exceptional accounting, advisory, and
          compliance services.
        </P>
      </Section>
      <div className="bg-[#6f2968] px-6 py-3.5 flex gap-6 flex-wrap max-md:flex-col max-md:gap-3 max-md:px-4">
        <span className="text-[11px] max-md:text-xs text-white/90 flex items-center gap-1">
          <strong className="text-[#f4c7ec]">📍</strong> Level 4, 120 King
          William St, Adelaide
        </span>
        <span className="text-[11px] max-md:text-xs text-white/90 flex items-center gap-1">
          <strong className="text-[#f4c7ec]">📞</strong> (08) 8232 4500
        </span>
      </div>
    </>
  );
}

export function TeamPage() {
  return (
    <>
      <PageHero title="👥 Our Team" subtitle="The People Behind Your Numbers" />
      <Section>
        <H2>Leadership</H2>
        <div className="flex gap-3 flex-wrap mt-2">
          {leadership.map((m) => (
            <TeamCard key={m.initials} {...m} />
          ))}
        </div>
      </Section>
      <Section>
        <H2>Specialists</H2>
        <div className="flex gap-3 flex-wrap mt-2">
          {specialists.map((m) => (
            <TeamCard key={m.initials} {...m} />
          ))}
        </div>
      </Section>
      <Section>
        <P>
          Our team holds qualifications from CPA Australia, Chartered
          Accountants ANZ, and the Tax Practitioners Board. Xero Gold Partner
          certified.
        </P>
      </Section>
    </>
  );
}

export function StoryPage() {
  return (
    <>
      <PageHero title="📖 Our Story" subtitle="25 Years of Trusted Service" />
      <Section>
        <H2>Company Timeline</H2>
        <div className="ml-5 border-l-2 border-[#d7a3cf] pl-5 my-3">
          {timeline.map((e) => (
            <div key={e.year} className="mb-3 relative">
              <div className="absolute -left-[29px] top-1 w-2.5 h-2.5 rounded-full bg-[#a43d98] border-2 border-white" />
              <div className="text-xs font-bold text-[#7f2e77]">{e.year}</div>
              <div className="text-[11px] max-md:text-xs text-[#555] leading-relaxed">
                {e.description}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

export function TestimonialsPage() {
  return (
    <>
      <PageHero
        title="⭐ Client Testimonials"
        subtitle="What Our Clients Say"
      />
      <Section>
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-[#fbf5fa] border-l-[3px] border-[#a43d98] rounded-r-md px-4 py-3.5 mb-2.5"
          >
            <q className="text-[11px] max-md:text-xs text-[#333] italic leading-relaxed block mb-1.5">
              {t.quote}
            </q>
            <div className="text-[10px] max-md:text-[11px] text-[#888]">
              — {t.attribution}
            </div>
          </div>
        ))}
      </Section>
    </>
  );
}

export function ContactPage() {
  return (
    <>
      <PageHero title="📞 Contact Us" subtitle="Get in Touch With Our Team" />
      <Section>
        <H2>Office Details</H2>
        <P>
          <strong>Wealon tax & accounting </strong>
          <br />
          Level 4C, 102 Greenhill Road
          <br />
          Unley, South Australia 5061
        </P>
        <P>
          <strong>Phone:</strong> (04) 1400 2008 &nbsp;|&nbsp; <br />
          <strong>Email:</strong> anup@wealon.com.au
        </P>
        <h3 className="text-xs font-bold text-[#7f2e77] mt-2.5 mb-1">
          Office Hours
        </h3>
        <P>
          Mon–Fri: 8:30 AM – 5:30 PM &nbsp;|&nbsp; Sat: 9 AM – 12 PM (by
          appointment)
        </P>
        <h3 className="text-xs font-bold text-[#7f2e77] mt-2.5 mb-1">
          Second Location
        </h3>
        <P>
          Level 24/91 King Wiliams St Adelaide SA 5000 Tue & Thu by appointment.
        </P>
      </Section>
      <div className="bg-[#6f2968] px-6 py-3.5 flex gap-6 flex-wrap max-md:flex-col max-md:gap-2 max-md:px-4">
        <span className="text-[11px] text-white/90">
          <strong className="text-[#f4c7ec]">ABN:</strong> 12 345 678 901
        </span>
        <span className="text-[11px] text-white/90">
          <strong className="text-[#f4c7ec]">CPA:</strong> #4521
        </span>
        <span className="text-[11px] text-white/90">
          <strong className="text-[#f4c7ec]">Tax Agent:</strong> 25678432
        </span>
      </div>
    </>
  );
}

export function WhyUsPage() {
  return (
    <>
      <PageHero title="🏆 Why Choose Us" subtitle="What Sets  Apart" />
      <Section>
        <H2>Our Advantages</H2>
        <ul className="text-[11px] max-md:text-xs text-[#333] leading-loose ml-4 list-disc">
          <li>
            <strong>CPA Certified</strong> — all seniors hold current CPA
            accreditation
          </li>
          <li>
            <strong>Industry Specialists</strong> in construction, hospitality,
            healthcare & tech
          </li>
          <li>
            <strong>Cloud-First</strong> — Xero, MYOB, QuickBooks certified
          </li>
          <li>
            <strong>Fixed-Fee Pricing</strong> — no surprises
          </li>
          <li>
            <strong>Dedicated Account Managers</strong>
          </li>
          <li>
            <strong>Same-Day Responses</strong> — 4hr callback guarantee
          </li>
          <li>
            <strong>Fast Turnaround</strong> — most returns within 5 business
            days
          </li>
          <li>
            <strong>Local Presence</strong> — Adelaide CBD + Mount Barker
          </li>
        </ul>
      </Section>
    </>
  );
}

// Service pages
function ServicePage({
  icon,
  title,
  sub,
  items,
}: {
  icon: string;
  title: string;
  sub: string;
  items: string[];
}) {
  return (
    <>
      <PageHero title={`${icon} ${title}`} subtitle={sub} />
      <Section>
        <ul className="text-[11px] max-md:text-xs text-[#333] leading-loose ml-4 list-disc">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </Section>
    </>
  );
}

export function TaxPage() {
  return (
    <ServicePage
      icon="📊"
      title="Tax Preparation"
      sub="Returns & Planning"
      items={[
        "Individual tax returns",
        "Company & trust returns",
        "Capital gains calculations",
        "BAS/IAS preparation",
        "Proactive tax planning",
        "ATO audit representation",
      ]}
    />
  );
}
export function BookkeepingPage() {
  return (
    <ServicePage
      icon="📒"
      title="Bookkeeping & BAS"
      sub="Cloud-Based"
      items={[
        "Monthly bookkeeping via Xero/MYOB",
        "BAS & IAS preparation",
        "Bank reconciliation",
        "STP-compliant payroll",
        "AP/AR management",
      ]}
    />
  );
}
export function AdvisoryPage() {
  return (
    <ServicePage
      icon="🏢"
      title="Business Advisory"
      sub="Strategic Consulting"
      items={[
        "Cashflow forecasting & budgets",
        "KPI dashboards",
        "Business plan development",
        "Pricing & margin analysis",
        "Exit & succession planning",
      ]}
    />
  );
}
export function AuditPage() {
  return (
    <ServicePage
      icon="🔍"
      title="Audit & Assurance"
      sub="Compliance"
      items={[
        "Statutory financial audits",
        "SMSF compliance audits",
        "Internal control reviews",
        "Due diligence",
        "Not-for-profit audits",
      ]}
    />
  );
}
export function SmsfPage() {
  return (
    <ServicePage
      icon="🏠"
      title="SMSF Administration"
      sub="Self-Managed Super"
      items={[
        "SMSF establishment",
        "Annual returns & statements",
        "Investment strategy review",
        "Pension management",
        "ATO compliance",
      ]}
    />
  );
}
export function StructurePage() {
  return (
    <ServicePage
      icon="📑"
      title="Company Structuring"
      sub="Entity & Asset Protection"
      items={[
        "Company/trust/partnership formation",
        "Business restructures",
        "Asset protection",
        "Family trust planning",
        "Succession & estate",
      ]}
    />
  );
}
export function IntlTaxPage() {
  return (
    <ServicePage
      icon="🌏"
      title="International Tax"
      sub="Cross-Border"
      items={[
        "Foreign income reporting",
        "Transfer pricing",
        "Expat taxation",
        "Double tax agreements",
        "CFC/FIF compliance",
      ]}
    />
  );
}
export function CloudPage() {
  return (
    <ServicePage
      icon="☁️"
      title="Cloud Accounting"
      sub="Digital Transformation"
      items={[
        "Migration to Xero/MYOB/QBO",
        "App integrations",
        "Workflow automation",
        "Staff training",
        "Multi-entity config",
      ]}
    />
  );
}

// Downloads pages
export function DownloadPreview({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <>
      <PageHero title={`📄 ${title}`} subtitle="Wealon Tax & Accounting" />
      <Section>
        <P>{desc}</P>
      </Section>
    </>
  );
}
