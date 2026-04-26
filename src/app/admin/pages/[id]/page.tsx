import { notFound } from "next/navigation";
import { AdminShell } from "@/modules/admin/components/AdminShell";
import { PageCrudEditor } from "@/modules/admin/components/PageCrudEditor";
import { getAdminPageEditorData } from "@/modules/admin/data";

export const dynamic = "force-dynamic";

export default async function AdminEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getAdminPageEditorData(id);

  if (!data.page) {
    notFound();
  }

  return (
    <AdminShell
      activeHref="/admin/pages"
      title={`Edit Page: ${data.page.title}`}
      description="Update page metadata and the structured sections this page renders."
    >
      <PageCrudEditor initialData={data} />
    </AdminShell>
  );
}
