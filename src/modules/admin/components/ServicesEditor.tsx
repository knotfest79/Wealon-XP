"use client";

import { useMemo, useState, useTransition } from "react";

type ServiceRecord = {
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  cardDescription: string;
  items: string[];
  isPublished: boolean;
};

type ServicesEditorData = {
  index: {
    eyebrow: string;
    heading: string;
    body: string;
  };
  services: ServiceRecord[];
};

type ServiceDraft = ServiceRecord & {
  itemsText: string;
};

function toDraft(data: ServicesEditorData) {
  return {
    index: { ...data.index },
    services: data.services.map((service) => ({
      ...service,
      itemsText: service.items.join("\n"),
    })),
  };
}

export function ServicesEditor({
  initialData,
}: {
  initialData: ServicesEditorData;
}) {
  const [isPending, startTransition] = useTransition();
  const [draft, setDraft] = useState(() => toDraft(initialData));
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const serviceCount = useMemo(() => draft.services.length, [draft.services.length]);

  const handleSave = () => {
    setMessage(null);
    setError(null);

    const payload = {
      index: draft.index,
      services: draft.services.map((service) => ({
        slug: service.slug,
        title: service.title,
        subtitle: service.subtitle,
        icon: service.icon,
        cardDescription: service.cardDescription,
        items: service.itemsText
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        isPublished: service.isPublished,
      })),
    };

    startTransition(async () => {
      try {
        const response = await fetch("/api/admin/services", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const result = (await response.json()) as
          | { ok: true; data: ServicesEditorData }
          | { error: string };

        if (!response.ok || !("ok" in result)) {
          throw new Error("error" in result ? result.error : "Save failed");
        }

        setDraft(toDraft(result.data));
        setMessage("Services content saved.");
      } catch (saveError) {
        setError(
          saveError instanceof Error ? saveError.message : "Failed to save content",
        );
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded border border-[#8f8a79] bg-[#dfe7f6] px-4 py-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#38508c]">
            Services CMS
          </p>
          <p className="text-sm text-slate-700">
            Editing {serviceCount} service pages and the `/services` landing page.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={isPending}
          className="rounded border border-[#0b4aa8] bg-[#316ac5] px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? "Saving..." : "Save Services"}
        </button>
      </div>

      {message ? (
        <div className="rounded border border-[#0f7d31] bg-[#dcf7e5] px-4 py-3 text-sm text-[#0f7d31]">
          {message}
        </div>
      ) : null}
      {error ? (
        <div className="rounded border border-[#a52323] bg-[#fde7e7] px-4 py-3 text-sm text-[#a52323]">
          {error}
        </div>
      ) : null}

      <section className="rounded border border-[#8f8a79] bg-white p-4">
        <h2 className="text-lg font-bold text-slate-950">Services Landing Page</h2>
        <div className="mt-4 grid gap-4">
          <label className="grid gap-1 text-sm">
            <span className="font-bold text-slate-700">Eyebrow</span>
            <input
              value={draft.index.eyebrow}
              onChange={(e) =>
                setDraft((current) => ({
                  ...current,
                  index: { ...current.index, eyebrow: e.target.value },
                }))
              }
              className="rounded border border-[#a49f8c] px-3 py-2"
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-bold text-slate-700">Heading</span>
            <input
              value={draft.index.heading}
              onChange={(e) =>
                setDraft((current) => ({
                  ...current,
                  index: { ...current.index, heading: e.target.value },
                }))
              }
              className="rounded border border-[#a49f8c] px-3 py-2"
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-bold text-slate-700">Body</span>
            <textarea
              rows={4}
              value={draft.index.body}
              onChange={(e) =>
                setDraft((current) => ({
                  ...current,
                  index: { ...current.index, body: e.target.value },
                }))
              }
              className="rounded border border-[#a49f8c] px-3 py-2"
            />
          </label>
        </div>
      </section>

      <div className="space-y-5">
        {draft.services.map((service, index) => (
          <section
            key={service.slug}
            className="rounded border border-[#8f8a79] bg-white p-4"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7b7260]">
                  Service {index + 1}
                </p>
                <h3 className="text-lg font-bold text-slate-950">{service.slug}</h3>
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={service.isPublished}
                  onChange={(e) =>
                    setDraft((current) => ({
                      ...current,
                      services: current.services.map((entry) =>
                        entry.slug === service.slug
                          ? { ...entry, isPublished: e.target.checked }
                          : entry,
                      ),
                    }))
                  }
                />
                Published
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-1 text-sm">
                <span className="font-bold text-slate-700">Title</span>
                <input
                  value={service.title}
                  onChange={(e) =>
                    setDraft((current) => ({
                      ...current,
                      services: current.services.map((entry) =>
                        entry.slug === service.slug
                          ? { ...entry, title: e.target.value }
                          : entry,
                      ),
                    }))
                  }
                  className="rounded border border-[#a49f8c] px-3 py-2"
                />
              </label>

              <label className="grid gap-1 text-sm">
                <span className="font-bold text-slate-700">Subtitle</span>
                <input
                  value={service.subtitle}
                  onChange={(e) =>
                    setDraft((current) => ({
                      ...current,
                      services: current.services.map((entry) =>
                        entry.slug === service.slug
                          ? { ...entry, subtitle: e.target.value }
                          : entry,
                      ),
                    }))
                  }
                  className="rounded border border-[#a49f8c] px-3 py-2"
                />
              </label>

              <label className="grid gap-1 text-sm md:col-span-2">
                <span className="font-bold text-slate-700">Card Description</span>
                <input
                  value={service.cardDescription}
                  onChange={(e) =>
                    setDraft((current) => ({
                      ...current,
                      services: current.services.map((entry) =>
                        entry.slug === service.slug
                          ? { ...entry, cardDescription: e.target.value }
                          : entry,
                      ),
                    }))
                  }
                  className="rounded border border-[#a49f8c] px-3 py-2"
                />
              </label>

              <label className="grid gap-1 text-sm">
                <span className="font-bold text-slate-700">Icon</span>
                <input
                  value={service.icon}
                  onChange={(e) =>
                    setDraft((current) => ({
                      ...current,
                      services: current.services.map((entry) =>
                        entry.slug === service.slug
                          ? { ...entry, icon: e.target.value }
                          : entry,
                      ),
                    }))
                  }
                  className="rounded border border-[#a49f8c] px-3 py-2"
                />
              </label>

              <div className="grid gap-1 text-sm">
                <span className="font-bold text-slate-700">Slug</span>
                <div className="rounded border border-[#d7d2c2] bg-[#f4f1e7] px-3 py-2 text-slate-600">
                  {service.slug}
                </div>
              </div>

              <label className="grid gap-1 text-sm md:col-span-2">
                <span className="font-bold text-slate-700">
                  Bullet Items
                  <span className="ml-2 font-normal text-slate-500">
                    one per line
                  </span>
                </span>
                <textarea
                  rows={7}
                  value={service.itemsText}
                  onChange={(e) =>
                    setDraft((current) => ({
                      ...current,
                      services: current.services.map((entry) =>
                        entry.slug === service.slug
                          ? { ...entry, itemsText: e.target.value }
                          : entry,
                      ),
                    }))
                  }
                  className="rounded border border-[#a49f8c] px-3 py-2"
                />
              </label>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
