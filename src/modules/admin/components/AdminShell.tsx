import Link from "next/link";
import { AdminLogoutButton } from "./AdminLogoutButton";

const navItems = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/pages", label: "Pages" },
  { href: "/admin/desktop", label: "Desktop" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/submissions", label: "Submissions" },
];

export function AdminShell({
  title,
  description,
  activeHref,
  children,
}: {
  title: string;
  description: string;
  activeHref: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#f3f0e4] text-slate-950">
      <div className="border-b border-[#8f8a79] bg-gradient-to-b from-[#2c63c6] to-[#0d2f84] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 max-md:flex-col max-md:items-start max-md:px-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">
              Wealon XP CMS
            </p>
            <h1
              className="mt-1 text-2xl font-bold"
              style={{ fontFamily: "Tahoma, Segoe UI, sans-serif" }}
            >
              {title}
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-white/85">{description}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded border border-white/25 bg-white/10 px-3 py-2 text-xs text-white/85">
              Backend UI first, content wiring next.
            </div>
            <AdminLogoutButton />
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-6 lg:grid-cols-[220px_minmax(0,1fr)] max-md:px-4">
        <aside className="h-fit rounded border border-[#8f8a79] bg-[#ece9d8] p-2 shadow-[inset_1px_1px_0_#fff,inset_-1px_-1px_0_#b7b3a2,2px_2px_0_rgba(0,0,0,0.08)]">
          <nav aria-label="Admin navigation" className="space-y-1">
            {navItems.map((item) => {
              const active = item.href === activeHref;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    active
                      ? "block rounded border border-[#0b4aa8] bg-[#316ac5] px-3 py-2 text-sm font-bold text-white"
                      : "block rounded border border-transparent px-3 py-2 text-sm text-slate-700 hover:border-[#8f8a79] hover:bg-white"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <section className="space-y-6">{children}</section>
      </div>
    </main>
  );
}

export function AdminPanel({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded border border-[#8f8a79] bg-[#ece9d8] p-0 shadow-[inset_1px_1px_0_#fff,inset_-1px_-1px_0_#b7b3a2,3px_3px_0_rgba(0,0,0,0.08)]">
      <div className="border-b border-[#8f8a79] bg-gradient-to-b from-[#f8f3e4] to-[#d6d1bf] px-4 py-3">
        {eyebrow ? (
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#7b7260]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-lg font-bold text-slate-950">{title}</h2>
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}

export function AdminStat({
  label,
  value,
  helper,
}: {
  label: string;
  value: string | number;
  helper?: string;
}) {
  return (
    <div className="rounded border border-[#8f8a79] bg-white px-4 py-4 shadow-[inset_1px_1px_0_#fff,inset_-1px_-1px_0_#d3cfbe]">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#7b7260]">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold text-[#0d2f84]">{value}</p>
      {helper ? <p className="mt-1 text-sm text-slate-600">{helper}</p> : null}
    </div>
  );
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded border border-dashed border-[#a49f8c] bg-white px-4 py-6 text-sm text-slate-600">
      <p className="font-bold text-slate-900">{title}</p>
      <p className="mt-1">{description}</p>
    </div>
  );
}
