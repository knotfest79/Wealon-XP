import {
  AdminPanel,
  AdminShell,
  AdminStat,
  EmptyState,
} from "@/modules/admin/components/AdminShell";
import { getAdminOverviewData } from "@/modules/admin/data";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function AdminPage() {
  const data = await getAdminOverviewData();

  return (
    <AdminShell
      activeHref="/admin"
      title="CMS Overview"
      description="This is the first backend UI pass. The database is live, the admin is reading from Prisma, and the next step is wiring create and edit flows."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminStat
          label="Pages"
          value={data.pageCount}
          helper={`${data.publishedPageCount} published`}
        />
        <AdminStat
          label="Sections"
          value={data.sectionCount}
          helper="Structured content blocks"
        />
        <AdminStat
          label="Desktop Items"
          value={data.desktopItemCount}
          helper={`${data.desktopFolderCount} folders configured`}
        />
        <AdminStat
          label="Media"
          value={data.mediaCount}
          helper={`${data.settingsCount} global settings stored`}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <AdminPanel title="Recent Pages" eyebrow="Content">
          {data.recentPages.length === 0 ? (
            <EmptyState
              title="No pages yet"
              description="Seed your first pages next so the CMS has content to manage."
            />
          ) : (
            <div className="space-y-3">
              {data.recentPages.map((page) => (
                <div
                  key={page.id}
                  className="rounded border border-[#c9c4b2] bg-white px-4 py-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold text-slate-900">{page.title}</p>
                      <p className="text-sm text-slate-600">/{page.slug}</p>
                    </div>
                    <span
                      className={
                        page.isPublished
                          ? "rounded border border-[#0f7d31] bg-[#dcf7e5] px-2 py-1 text-[11px] font-bold text-[#0f7d31]"
                          : "rounded border border-[#9a7c12] bg-[#fff5c6] px-2 py-1 text-[11px] font-bold text-[#8a6d09]"
                      }
                    >
                      {page.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    {page._count.sections} sections, {page._count.children} subpages
                  </p>
                </div>
              ))}
            </div>
          )}
        </AdminPanel>

        <AdminPanel title="Recent Desktop Items" eyebrow="XP Desktop">
          {data.recentDesktopItems.length === 0 ? (
            <EmptyState
              title="No desktop items yet"
              description="Desktop icons and folder records will show here once seeded."
            />
          ) : (
            <div className="space-y-3">
              {data.recentDesktopItems.map((item) => (
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
                      ? `Linked to page: ${item.targetPage.title}`
                      : item.targetUrl || "No target connected yet"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </AdminPanel>

        <AdminPanel title="Recent Media" eyebrow="Assets">
          {data.recentMedia.length === 0 ? (
            <EmptyState
              title="No media yet"
              description="Icons, hero images, and thumbnails will appear here."
            />
          ) : (
            <div className="space-y-3">
              {data.recentMedia.map((asset) => (
                <div
                  key={asset.id}
                  className="rounded border border-[#c9c4b2] bg-white px-4 py-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold text-slate-900">{asset.name}</p>
                      <p className="text-sm text-slate-600">{asset.url}</p>
                    </div>
                    <span className="rounded border border-[#8f8a79] bg-[#ece9d8] px-2 py-1 text-[11px] font-bold text-slate-700">
                      {asset.kind}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </AdminPanel>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <AdminPanel title="Submissions" eyebrow="Leads">
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminStat label="Bookings" value={data.bookingCount} />
            <AdminStat label="Contacts" value={data.contactCount} />
          </div>
        </AdminPanel>

        <AdminPanel title="Next Build Steps" eyebrow="Roadmap">
          <div className="space-y-3 text-sm text-slate-700">
            <p>1. Seed the first `SitePage`, `DesktopItem`, and `SiteSetting` records.</p>
            <p>2. Add create/edit forms for pages and page sections.</p>
            <p>3. Connect desktop icons to live `DesktopItem` records.</p>
            <p>4. Add media upload and asset selection.</p>
            <p>5. Replace hardcoded content in the public site with DB reads.</p>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Dashboard rendered on {formatDate(new Date())}
          </p>
        </AdminPanel>
      </section>
    </AdminShell>
  );
}
