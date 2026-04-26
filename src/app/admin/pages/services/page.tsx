import { AdminShell } from "@/modules/admin/components/AdminShell";
import { ServicesEditor } from "@/modules/admin/components/ServicesEditor";
import { getAdminServicesEditorData } from "@/modules/content/server/servicesCms";

export const dynamic = "force-dynamic";

export default async function AdminServicesEditorPage() {
  const data = await getAdminServicesEditorData();

  return (
    <AdminShell
      activeHref="/admin/pages"
      title="Edit Services"
      description="This editor controls both the Services landing page and each individual service detail page."
    >
      <ServicesEditor initialData={data} />
    </AdminShell>
  );
}
