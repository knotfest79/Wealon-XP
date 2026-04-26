import {
  AdminPanel,
  AdminShell,
  EmptyState,
} from "@/modules/admin/components/AdminShell";
import { getAdminSubmissionsData } from "@/modules/admin/data";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function AdminSubmissionsPage() {
  const { bookings, contacts } = await getAdminSubmissionsData();
  type BookingRow = (typeof bookings)[number];
  type ContactRow = (typeof contacts)[number];

  return (
    <AdminShell
      activeHref="/admin/submissions"
      title="Submissions"
      description="Booking and contact tables are live already, so this screen gives you the first backend operations view."
    >
      <section className="grid gap-6 xl:grid-cols-2">
        <AdminPanel title="Bookings" eyebrow="Consultation Requests">
          {bookings.length === 0 ? (
            <EmptyState
              title="No bookings yet"
              description="New consultation requests will appear here as soon as the form is used."
            />
          ) : (
            <div className="space-y-3">
              {bookings.map((booking: BookingRow) => (
                <div
                  key={booking.id}
                  className="rounded border border-[#c9c4b2] bg-white px-4 py-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold text-slate-900">{booking.name}</p>
                      <p className="text-sm text-slate-600">{booking.email}</p>
                    </div>
                    <span className="rounded border border-[#8f8a79] bg-[#ece9d8] px-2 py-1 text-[11px] font-bold text-slate-700">
                      {booking.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    {booking.phone || "No phone provided"}
                  </p>
                  {booking.message ? (
                    <p className="mt-2 text-sm text-slate-700">{booking.message}</p>
                  ) : null}
                  <p className="mt-2 text-xs text-slate-500">
                    {formatDate(booking.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </AdminPanel>

        <AdminPanel title="Contacts" eyebrow="General Enquiries">
          {contacts.length === 0 ? (
            <EmptyState
              title="No contacts yet"
              description="General enquiries will appear here once the public contact form is connected."
            />
          ) : (
            <div className="space-y-3">
              {contacts.map((contact: ContactRow) => (
                <div
                  key={contact.id}
                  className="rounded border border-[#c9c4b2] bg-white px-4 py-3"
                >
                  <p className="font-bold text-slate-900">{contact.name}</p>
                  <p className="text-sm text-slate-600">{contact.email}</p>
                  <p className="mt-2 text-sm text-slate-700">{contact.message}</p>
                  <p className="mt-2 text-xs text-slate-500">
                    {formatDate(contact.createdAt)}
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
