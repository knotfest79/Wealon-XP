import Link from "next/link";
import {
  AdminPanel,
  AdminShell,
  EmptyState,
} from "@/modules/admin/components/AdminShell";
import { getAdminPagesData } from "@/modules/admin/data";

export default async function AdminPagesPage() {
  const { pages } = await getAdminPagesData();

  return (
    <AdminShell
      activeHref="/admin/pages"
      title="Pages"
      description="Manage site pages, subpages, visibility, SEO fields, and the content structure each page will render."
    >
      <div className="flex justify-end">
        <div className="flex gap-3">
          <Link
            href="/admin/pages/new"
            className="rounded border border-[#0b4aa8] bg-[#316ac5] px-4 py-2 text-sm font-bold text-white"
          >
            Create Page
          </Link>
          <Link
            href="/admin/pages/services"
            className="rounded border border-[#0b4aa8] bg-[#316ac5] px-4 py-2 text-sm font-bold text-white"
          >
            Edit Services Content
          </Link>
        </div>
      </div>

      <AdminPanel title="All Pages" eyebrow="Content Model">
        {pages.length === 0 ? (
          <EmptyState
            title="No pages exist yet"
            description="Create your first page records next, starting with About, Services, Contact, and Booking."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0 text-sm">
              <thead>
                <tr className="text-left text-[#5d5546]">
                  <th className="border-b border-[#bcb7a8] px-3 py-2 font-bold">Title</th>
                  <th className="border-b border-[#bcb7a8] px-3 py-2 font-bold">Slug</th>
                  <th className="border-b border-[#bcb7a8] px-3 py-2 font-bold">Type</th>
                  <th className="border-b border-[#bcb7a8] px-3 py-2 font-bold">Parent</th>
                  <th className="border-b border-[#bcb7a8] px-3 py-2 font-bold">Sections</th>
                  <th className="border-b border-[#bcb7a8] px-3 py-2 font-bold">Children</th>
                  <th className="border-b border-[#bcb7a8] px-3 py-2 font-bold">Desktop Links</th>
                  <th className="border-b border-[#bcb7a8] px-3 py-2 font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((page) => (
                  <tr key={page.id} className="bg-white even:bg-[#f8f5ea]">
                    <td className="border-b border-[#d8d2c2] px-3 py-2 font-medium">
                      <div className="flex items-center justify-between gap-3">
                        <span>{page.title}</span>
                        <div className="flex gap-3">
                          <Link
                            href={`/admin/pages/${page.id}`}
                            className="text-xs font-bold text-[#215dc6] hover:underline"
                          >
                            Edit
                          </Link>
                          {(page.slug === "services" || page.parent?.slug === "services") ? (
                            <Link
                              href="/admin/pages/services"
                              className="text-xs font-bold text-[#215dc6] hover:underline"
                            >
                              Service Editor
                            </Link>
                          ) : null}
                        </div>
                      </div>
                    </td>
                    <td className="border-b border-[#d8d2c2] px-3 py-2 text-slate-600">
                      /{page.slug}
                    </td>
                    <td className="border-b border-[#d8d2c2] px-3 py-2">{page.pageType}</td>
                    <td className="border-b border-[#d8d2c2] px-3 py-2">
                      {page.parent?.title ?? "Root"}
                    </td>
                    <td className="border-b border-[#d8d2c2] px-3 py-2">
                      {page._count.sections}
                    </td>
                    <td className="border-b border-[#d8d2c2] px-3 py-2">
                      {page._count.children}
                    </td>
                    <td className="border-b border-[#d8d2c2] px-3 py-2">
                      {page._count.desktopItems}
                    </td>
                    <td className="border-b border-[#d8d2c2] px-3 py-2">
                      {page.isPublished ? "Published" : "Draft"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminPanel>
    </AdminShell>
  );
}
