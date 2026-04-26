import Link from "next/link";
import {
  AdminPanel,
  AdminShell,
  EmptyState,
} from "@/modules/admin/components/AdminShell";
import { getAdminDesktopData } from "@/modules/admin/data";

export default async function AdminDesktopPage() {
  const { folders, items } = await getAdminDesktopData();

  return (
    <AdminShell
      activeHref="/admin/desktop"
      title="Desktop"
      description="Manage XP folders, desktop icons, linked pages, downloads, and icon assignments."
    >
      <div className="flex justify-end">
        <Link
          href="/admin/desktop/wallpapers"
          className="rounded border border-[#0b4aa8] bg-[#316ac5] px-4 py-2 text-sm font-bold text-white"
        >
          Manage Wallpapers
        </Link>
      </div>

      <section className="grid gap-6 xl:grid-cols-2">
        <AdminPanel title="Folders" eyebrow="XP Structure">
          {folders.length === 0 ? (
            <EmptyState
              title="No desktop folders yet"
              description="Seed top-level folders like About, Services, Downloads, and Pages."
            />
          ) : (
            <div className="space-y-3">
              {folders.map((folder) => (
                <div
                  key={folder.id}
                  className="rounded border border-[#c9c4b2] bg-white px-4 py-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold text-slate-900">{folder.name}</p>
                      <p className="text-sm text-slate-600">
                        {folder.parent?.name ? `Parent: ${folder.parent.name}` : "Root folder"}
                      </p>
                    </div>
                    <span className="rounded border border-[#8f8a79] bg-[#ece9d8] px-2 py-1 text-[11px] font-bold text-slate-700">
                      {folder.isVisible ? "Visible" : "Hidden"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    {folder._count.items} items, {folder._count.children} children
                  </p>
                </div>
              ))}
            </div>
          )}
        </AdminPanel>

        <AdminPanel title="Desktop Items" eyebrow="Icons">
          {items.length === 0 ? (
            <EmptyState
              title="No desktop items yet"
              description="Each desktop icon row will appear here once records are seeded."
            />
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded border border-[#c9c4b2] bg-white px-4 py-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold text-slate-900">{item.name}</p>
                      <p className="text-sm text-slate-600">
                        {item.folder?.name ?? "Desktop root"}
                      </p>
                    </div>
                    <span className="rounded border border-[#8f8a79] bg-[#ece9d8] px-2 py-1 text-[11px] font-bold text-slate-700">
                      {item.itemType}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    {item.targetPage?.title
                      ? `Target page: ${item.targetPage.title}`
                      : item.targetUrl || "No target connected"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </AdminPanel>
      </section>
    </AdminShell>
  );
}
