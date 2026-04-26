import {
  AdminPanel,
  AdminShell,
  EmptyState,
} from "@/modules/admin/components/AdminShell";
import { getAdminSettingsData } from "@/modules/admin/data";

export default async function AdminSettingsPage() {
  const { settings } = await getAdminSettingsData();

  return (
    <AdminShell
      activeHref="/admin/settings"
      title="Settings"
      description="Global settings are the right place for phone numbers, emails, addresses, footer text, and company-wide labels."
    >
      <AdminPanel title="Site Settings" eyebrow="Global Content">
        {settings.length === 0 ? (
          <EmptyState
            title="No settings stored"
            description="Add global records like `company.phone`, `company.email`, and `office.address` next."
          />
        ) : (
          <div className="space-y-3">
            {settings.map((setting) => (
              <div
                key={setting.id}
                className="rounded border border-[#c9c4b2] bg-white px-4 py-3"
              >
                <p className="font-bold text-slate-900">{setting.key}</p>
                <pre className="mt-2 overflow-x-auto whitespace-pre-wrap text-xs text-slate-600">
                  {JSON.stringify(setting.value, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        )}
      </AdminPanel>
    </AdminShell>
  );
}
