import {
  AdminPanel,
  AdminShell,
  EmptyState,
} from "@/modules/admin/components/AdminShell";
import { getAdminMediaData } from "@/modules/admin/data";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const { media, counts } = await getAdminMediaData();
  type MediaAssetRow = (typeof media)[number];
  type MediaCountRow = (typeof counts)[number];

  return (
    <AdminShell
      activeHref="/admin/media"
      title="Media"
      description="Track custom icons, hero images, thumbnails, and other assets that will replace hardcoded visuals."
    >
      <section className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
        <AdminPanel title="Media Breakdown" eyebrow="Kinds">
          {counts.length === 0 ? (
            <EmptyState
              title="No media stored"
              description="Once uploads or seeded asset records exist, the kind totals will show here."
            />
          ) : (
            <div className="space-y-2">
              {counts.map((entry: MediaCountRow) => (
                <div
                  key={entry.kind}
                  className="flex items-center justify-between rounded border border-[#c9c4b2] bg-white px-3 py-2 text-sm"
                >
                  <span className="font-bold text-slate-900">{entry.kind}</span>
                  <span className="text-slate-600">{entry._count._all}</span>
                </div>
              ))}
            </div>
          )}
        </AdminPanel>

        <AdminPanel title="Recent Assets" eyebrow="Library">
          {media.length === 0 ? (
            <EmptyState
              title="No assets yet"
              description="You can start with URL-based assets first, then add uploads later."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0 text-sm">
                <thead>
                  <tr className="text-left text-[#5d5546]">
                    <th className="border-b border-[#bcb7a8] px-3 py-2 font-bold">Name</th>
                    <th className="border-b border-[#bcb7a8] px-3 py-2 font-bold">Kind</th>
                    <th className="border-b border-[#bcb7a8] px-3 py-2 font-bold">URL</th>
                    <th className="border-b border-[#bcb7a8] px-3 py-2 font-bold">Size</th>
                  </tr>
                </thead>
                <tbody>
                  {media.map((asset: MediaAssetRow) => (
                    <tr key={asset.id} className="bg-white even:bg-[#f8f5ea]">
                      <td className="border-b border-[#d8d2c2] px-3 py-2 font-medium">
                        {asset.name}
                      </td>
                      <td className="border-b border-[#d8d2c2] px-3 py-2">{asset.kind}</td>
                      <td className="border-b border-[#d8d2c2] px-3 py-2 text-slate-600">
                        {asset.url}
                      </td>
                      <td className="border-b border-[#d8d2c2] px-3 py-2 text-slate-600">
                        {asset.width && asset.height
                          ? `${asset.width} × ${asset.height}`
                          : "Unknown"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </AdminPanel>
      </section>
    </AdminShell>
  );
}
