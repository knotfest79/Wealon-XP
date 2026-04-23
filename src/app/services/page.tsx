import Link from "next/link";
import { WebPageLayout } from "@/modules/content/components/WebPageLayout";
import { buildMetadata } from "@/modules/content/data/metadata";
import { folders } from "@/modules/content/data/folders";
import { getRoutePathForPageId, getSeoRoute } from "@/modules/content/data/routes";

const route = getSeoRoute("/services")!;

export const metadata = buildMetadata(route);

export default function ServicesPage() {
  return (
    <WebPageLayout>
      <header className="border-b border-slate-200 bg-white px-6 py-12 max-md:px-5 max-md:py-9">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#7f2e77]">
            Services
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-950 max-md:text-3xl">
            Accounting services for individuals and small businesses
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-700">
            Tax, bookkeeping, BAS, advisory, SMSF, audit, structuring, and cloud
            accounting support from one Adelaide-based team.
          </p>
        </div>
      </header>
      <section className="mx-auto grid max-w-5xl gap-4 px-6 py-10 sm:grid-cols-2 lg:grid-cols-3 max-md:px-5">
        {folders.services.tiles.map((tile) => {
          const href = getRoutePathForPageId(tile.id);
          if (!href) return null;

          return (
            <Link
              key={tile.id}
              href={href}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#7f2e77] hover:shadow-md"
            >
              <h2 className="text-lg font-bold text-slate-950">{tile.name}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{tile.desc}</p>
            </Link>
          );
        })}
      </section>
    </WebPageLayout>
  );
}
