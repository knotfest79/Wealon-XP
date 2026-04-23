import Link from "next/link";
import { PageRouter } from "./PageRouter";
import { seoRoutes } from "../data/routes";

export function WebPageLayout({
  pageId,
  children,
}: {
  pageId?: string;
  children?: React.ReactNode;
}) {
  return (
    <main className="web-page-shell">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 max-md:flex-col max-md:items-start max-md:px-5">
          <Link href="/" className="text-lg font-bold text-slate-950">
            Wealon Tax & Accounting
          </Link>
          <nav
            aria-label="Primary navigation"
            className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-slate-600"
          >
            <Link className="hover:text-[#7f2e77]" href="/about">
              About
            </Link>
            <Link className="hover:text-[#7f2e77]" href="/services">
              Services
            </Link>
            <Link className="hover:text-[#7f2e77]" href="/contact">
              Contact
            </Link>
            <Link className="hover:text-[#7f2e77]" href="/book">
              Book
            </Link>
          </nav>
        </div>
      </header>

      {pageId ? <PageRouter pageId={pageId} variant="web" /> : children}

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-6 px-6 py-8 text-sm text-slate-600 max-md:px-5">
          <p>Wealon Tax & Accounting, Unley, South Australia</p>
          <nav aria-label="Sitemap links" className="flex flex-wrap gap-4">
            {seoRoutes.map((route) => (
              <Link key={route.path} href={route.path} className="hover:text-[#7f2e77]">
                {route.title.replace(" | Wealon Tax & Accounting", "")}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </main>
  );
}
