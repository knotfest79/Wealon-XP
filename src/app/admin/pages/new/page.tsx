import { AdminShell } from "@/modules/admin/components/AdminShell";
import { PageCrudEditor } from "@/modules/admin/components/PageCrudEditor";
import { getAdminPageEditorData } from "@/modules/admin/data";

export default async function AdminNewPagePage() {
  const data = await getAdminPageEditorData();

  return (
    <AdminShell
      activeHref="/admin/pages"
      title="Create Page"
      description="Create a new page and define the sections it will render."
    >
      <PageCrudEditor initialData={data} />
    </AdminShell>
  );
}
