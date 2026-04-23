"use client";
import { PageHero } from "./PageHero";
import { usePageVariant } from "./PageRenderContext";
import {
  leadership,
  specialists,
  timeline,
  testimonials,
} from "../data/content";

function StyledPageHero(props: React.ComponentProps<typeof PageHero>) {
  const variant = usePageVariant();
  return <PageHero {...props} variant={variant} />;
}

function Section({ children }: { children: React.ReactNode }) {
  const variant = usePageVariant();
  if (variant === "web") {
    return (
      <section className="mx-auto max-w-5xl border-b border-slate-200 px-6 py-8 last:border-b-0 max-md:px-5 max-md:py-6">
        {children}
      </section>
    );
  }

  return (
    <div className="px-6 max-md:px-4 py-4 max-md:py-3 border-b border-[#e8e4d8] last:border-b-0">
      {children}
    </div>
  );
}
function H2({ children }: { children: React.ReactNode }) {
  const variant = usePageVariant();
  if (variant === "web") {
    return (
      <h2 className="mb-4 text-2xl font-bold leading-tight text-slate-950 max-md:text-xl">
        {children}
      </h2>
    );
  }

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
  const variant = usePageVariant();
  if (variant === "web") {
    return (
      <p className="mb-4 max-w-3xl text-base leading-7 text-slate-700">
        {children}
      </p>
    );
  }

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
  const variant = usePageVariant();
  if (variant === "web") {
    return (
      <article className="min-h-[148px] rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div
          className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#7f2e77] text-xl font-bold text-white"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {initials}
        </div>
        <h3 className="text-base font-bold text-slate-950">{name}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-600">{role}</p>
      </article>
    );
  }

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

function TeamGrid({ children }: { children: React.ReactNode }) {
  const variant = usePageVariant();
  if (variant === "web") {
    return (
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {children}
      </div>
    );
  }

  return <div className="flex gap-3 flex-wrap mt-2">{children}</div>;
}

export function OverviewPage() {
  const variant = usePageVariant();

  return (
    <>
      <StyledPageHero
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
        <div
          className={
            variant === "web"
              ? "my-8 grid grid-cols-2 gap-4 md:grid-cols-4"
              : "flex gap-3 flex-wrap my-3"
          }
        >
          {[
            { n: "25+", l: "Years" },
            { n: "1,200+", l: "Clients" },
            { n: "98%", l: "Retention" },
            { n: "15", l: "Team" },
          ].map((s) => (
            <div
              key={s.l}
              className={
                variant === "web"
                  ? "rounded-lg border border-slate-200 bg-white px-5 py-6 text-center shadow-sm"
                  : "bg-gradient-to-br from-[#5f1f5c] to-[#a43d98] rounded-md px-4 max-md:px-3 py-3 max-md:py-2 text-center min-w-[100px] max-md:min-w-[70px] border border-[rgba(215,163,207,.45)]"
              }
            >
              <div
                className={
                  variant === "web"
                    ? "text-3xl font-bold text-[#7f2e77]"
                    : "text-xl max-md:text-lg font-bold text-[#ffe3fb]"
                }
                style={{ fontFamily: "Georgia, serif" }}
              >
                {s.n}
              </div>
              <div
                className={
                  variant === "web"
                    ? "mt-2 text-sm font-semibold uppercase tracking-[0.1em] text-slate-500"
                    : "text-[10px] max-md:text-[9px] text-white/80 uppercase tracking-wider mt-0.5"
                }
              >
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
      <div
        className={
          variant === "web"
            ? "bg-[#7f2e77] px-6 py-5"
            : "bg-[#6f2968] px-6 py-3.5 flex gap-6 flex-wrap max-md:flex-col max-md:gap-3 max-md:px-4"
        }
      >
        <div
          className={
            variant === "web"
              ? "mx-auto flex max-w-5xl flex-wrap gap-6 text-sm text-white"
              : "contents"
          }
        >
        <span className="text-[11px] max-md:text-xs text-white/90 flex items-center gap-1">
          <strong className="text-[#f4c7ec]">📍</strong> Level 4, 120 King
          William St, Adelaide
        </span>
        <span className="text-[11px] max-md:text-xs text-white/90 flex items-center gap-1">
          <strong className="text-[#f4c7ec]">📞</strong> (08) 8232 4500
        </span>
        </div>
      </div>
    </>
  );
}

export function TeamPage() {
  return (
    <>
      <StyledPageHero title="👥 Our Team" subtitle="The People Behind Your Numbers" />
      <Section>
        <H2>Leadership</H2>
        <TeamGrid>
          {leadership.map((m) => (
            <TeamCard key={m.initials} {...m} />
          ))}
        </TeamGrid>
      </Section>
      <Section>
        <H2>Specialists</H2>
        <TeamGrid>
          {specialists.map((m) => (
            <TeamCard key={m.initials} {...m} />
          ))}
        </TeamGrid>
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
  const variant = usePageVariant();

  return (
    <>
      <StyledPageHero title="📖 Our Story" subtitle="25 Years of Trusted Service" />
      <Section>
        <H2>Company Timeline</H2>
        <div
          className={
            variant === "web"
              ? "my-6 border-l-2 border-[#d7a3cf] pl-6"
              : "ml-5 border-l-2 border-[#d7a3cf] pl-5 my-3"
          }
        >
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
  const variant = usePageVariant();

  return (
    <>
      <StyledPageHero
        title="⭐ Client Testimonials"
        subtitle="What Our Clients Say"
      />
      <Section>
        {testimonials.map((t, i) => (
          <div
            key={i}
            className={
              variant === "web"
                ? "mb-4 rounded-lg border border-slate-200 border-l-4 border-l-[#7f2e77] bg-white px-6 py-5 shadow-sm"
                : "bg-[#fbf5fa] border-l-[3px] border-[#a43d98] rounded-r-md px-4 py-3.5 mb-2.5"
            }
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
  const variant = usePageVariant();

  return (
    <>
      <StyledPageHero title="📞 Contact Us" subtitle="Get in Touch With Our Team" />
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
      <div
        className={
          variant === "web"
            ? "bg-[#7f2e77] px-6 py-5"
            : "bg-[#6f2968] px-6 py-3.5 flex gap-6 flex-wrap max-md:flex-col max-md:gap-2 max-md:px-4"
        }
      >
        <div
          className={
            variant === "web"
              ? "mx-auto flex max-w-5xl flex-wrap gap-6 text-sm text-white"
              : "contents"
          }
        >
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
      </div>
    </>
  );
}

export function WhyUsPage() {
  return (
    <>
      <StyledPageHero title="🏆 Why Choose Us" subtitle="What Sets  Apart" />
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
  const variant = usePageVariant();

  return (
    <>
      <StyledPageHero title={`${icon} ${title}`} subtitle={sub} />
      <Section>
        <ul
          className={
            variant === "web"
              ? "ml-5 max-w-3xl list-disc space-y-3 text-base leading-7 text-slate-700"
              : "text-[11px] max-md:text-xs text-[#333] leading-loose ml-4 list-disc"
          }
        >
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
      <StyledPageHero title={`📄 ${title}`} subtitle="Wealon Tax & Accounting" />
      <Section>
        <P>{desc}</P>
      </Section>
    </>
  );
}
