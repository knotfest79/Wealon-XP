"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type ParentOption = {
  id: string;
  title: string;
  slug: string;
};

type SectionDraft = {
  localId: string;
  key: string;
  type: string;
  heading: string;
  subheading: string;
  body: string;
  sortOrder: number;
  isVisible: boolean;
  jsonDataText: string;
};

export type PageCrudInitialData = {
  page: {
    id: string;
    title: string;
    slug: string;
    parentId: string | null;
    pageType: string;
    isPublished: boolean;
    sortOrder: number;
    seoTitle: string | null;
    seoDesc: string | null;
    sections: Array<{
      id: string;
      key: string;
      type: string;
      heading: string | null;
      subheading: string | null;
      body: string | null;
      sortOrder: number;
      isVisible: boolean;
      jsonData: unknown;
    }>;
  } | null;
  parents: ParentOption[];
  pageTypes: string[];
  sectionTypes: string[];
};

function makeEmptySection(sectionTypes: string[]): SectionDraft {
  return {
    localId: crypto.randomUUID(),
    key: "",
    type: sectionTypes[0] ?? "RICH_TEXT",
    heading: "",
    subheading: "",
    body: "",
    sortOrder: 0,
    isVisible: true,
    jsonDataText: "",
  };
}

function toDraft(initialData: PageCrudInitialData) {
  return {
    title: initialData.page?.title ?? "",
    slug: initialData.page?.slug ?? "",
    parentId: initialData.page?.parentId ?? "",
    pageType: initialData.page?.pageType ?? initialData.pageTypes[0] ?? "CONTENT",
    isPublished: initialData.page?.isPublished ?? true,
    sortOrder: initialData.page?.sortOrder ?? 0,
    seoTitle: initialData.page?.seoTitle ?? "",
    seoDesc: initialData.page?.seoDesc ?? "",
    sections:
      initialData.page?.sections.map((section) => ({
        localId: section.id,
        key: section.key,
        type: section.type,
        heading: section.heading ?? "",
        subheading: section.subheading ?? "",
        body: section.body ?? "",
        sortOrder: section.sortOrder,
        isVisible: section.isVisible,
        jsonDataText: section.jsonData ? JSON.stringify(section.jsonData, null, 2) : "",
      })) ?? [],
  };
}

export function PageCrudEditor({ initialData }: { initialData: PageCrudInitialData }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [draft, setDraft] = useState(() => toDraft(initialData));
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isEditing = Boolean(initialData.page?.id);
  const pageTypes = useMemo(() => initialData.pageTypes, [initialData.pageTypes]);
  const sectionTypes = useMemo(
    () => initialData.sectionTypes,
    [initialData.sectionTypes],
  );

  const handleSave = () => {
    setMessage(null);
    setError(null);

    const payload = {
      title: draft.title,
      slug: draft.slug,
      parentId: draft.parentId || null,
      pageType: draft.pageType,
      isPublished: draft.isPublished,
      sortOrder: draft.sortOrder,
      seoTitle: draft.seoTitle,
      seoDesc: draft.seoDesc,
      sections: draft.sections.map((section, index) => ({
        key: section.key,
        type: section.type,
        heading: section.heading,
        subheading: section.subheading,
        body: section.body,
        sortOrder: section.sortOrder || index,
        isVisible: section.isVisible,
        jsonDataText: section.jsonDataText,
      })),
    };

    startTransition(async () => {
      try {
        const response = await fetch(
          isEditing ? `/api/admin/pages/${initialData.page!.id}` : "/api/admin/pages",
          {
            method: isEditing ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          },
        );

        const result = (await response.json()) as
          | { ok: true; id?: string }
          | { error: string };

        if (!response.ok || !("ok" in result)) {
          throw new Error("error" in result ? result.error : "Save failed");
        }

        if (!isEditing && result.id) {
          router.push(`/admin/pages/${result.id}`);
          return;
        }

        setMessage("Page saved.");
        router.refresh();
      } catch (saveError) {
        setError(saveError instanceof Error ? saveError.message : "Failed to save page");
      }
    });
  };

  const handleDelete = () => {
    if (!isEditing) return;
    if (!window.confirm("Delete this page? This will remove its sections too.")) {
      return;
    }

    setMessage(null);
    setError(null);

    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/pages/${initialData.page!.id}`, {
          method: "DELETE",
        });
        const result = (await response.json()) as { ok: true } | { error: string };

        if (!response.ok || !("ok" in result)) {
          throw new Error("error" in result ? result.error : "Delete failed");
        }

        router.push("/admin/pages");
      } catch (deleteError) {
        setError(
          deleteError instanceof Error ? deleteError.message : "Failed to delete page",
        );
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded border border-[#8f8a79] bg-[#dfe7f6] px-4 py-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#38508c]">
            Generic Page CRUD
          </p>
          <p className="text-sm text-slate-700">
            {isEditing
              ? "Editing a SitePage and all of its PageSection rows."
              : "Create a new SitePage with structured sections."}
          </p>
        </div>
        <div className="flex gap-3">
          {isEditing ? (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isPending}
              className="rounded border border-[#a52323] bg-[#c73f3f] px-4 py-2 text-sm font-bold text-white disabled:opacity-70"
            >
              Delete
            </button>
          ) : null}
          <button
            type="button"
            onClick={handleSave}
            disabled={isPending}
            className="rounded border border-[#0b4aa8] bg-[#316ac5] px-4 py-2 text-sm font-bold text-white disabled:opacity-70"
          >
            {isPending ? "Saving..." : isEditing ? "Save Page" : "Create Page"}
          </button>
        </div>
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
        <h2 className="text-lg font-bold text-slate-950">Page Details</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="grid gap-1 text-sm">
            <span className="font-bold text-slate-700">Title</span>
            <input
              value={draft.title}
              onChange={(e) => setDraft((current) => ({ ...current, title: e.target.value }))}
              className="rounded border border-[#a49f8c] px-3 py-2"
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-bold text-slate-700">Slug</span>
            <input
              value={draft.slug}
              onChange={(e) => setDraft((current) => ({ ...current, slug: e.target.value }))}
              className="rounded border border-[#a49f8c] px-3 py-2"
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-bold text-slate-700">Page Type</span>
            <select
              value={draft.pageType}
              onChange={(e) =>
                setDraft((current) => ({ ...current, pageType: e.target.value }))
              }
              className="rounded border border-[#a49f8c] px-3 py-2"
            >
              {pageTypes.map((pageType) => (
                <option key={pageType} value={pageType}>
                  {pageType}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-bold text-slate-700">Parent Page</span>
            <select
              value={draft.parentId}
              onChange={(e) =>
                setDraft((current) => ({ ...current, parentId: e.target.value }))
              }
              className="rounded border border-[#a49f8c] px-3 py-2"
            >
              <option value="">No parent</option>
              {initialData.parents.map((parent) => (
                <option key={parent.id} value={parent.id}>
                  {parent.title} (/{parent.slug})
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-bold text-slate-700">Sort Order</span>
            <input
              type="number"
              value={draft.sortOrder}
              onChange={(e) =>
                setDraft((current) => ({
                  ...current,
                  sortOrder: Number(e.target.value) || 0,
                }))
              }
              className="rounded border border-[#a49f8c] px-3 py-2"
            />
          </label>
          <label className="flex items-center gap-2 self-end text-sm text-slate-700">
            <input
              type="checkbox"
              checked={draft.isPublished}
              onChange={(e) =>
                setDraft((current) => ({
                  ...current,
                  isPublished: e.target.checked,
                }))
              }
            />
            Published
          </label>
          <label className="grid gap-1 text-sm md:col-span-2">
            <span className="font-bold text-slate-700">SEO Title</span>
            <input
              value={draft.seoTitle}
              onChange={(e) =>
                setDraft((current) => ({ ...current, seoTitle: e.target.value }))
              }
              className="rounded border border-[#a49f8c] px-3 py-2"
            />
          </label>
          <label className="grid gap-1 text-sm md:col-span-2">
            <span className="font-bold text-slate-700">SEO Description</span>
            <textarea
              rows={3}
              value={draft.seoDesc}
              onChange={(e) =>
                setDraft((current) => ({ ...current, seoDesc: e.target.value }))
              }
              className="rounded border border-[#a49f8c] px-3 py-2"
            />
          </label>
        </div>
      </section>

      <section className="rounded border border-[#8f8a79] bg-white p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-950">Sections</h2>
            <p className="text-sm text-slate-600">
              Add, remove, and reorder `PageSection` rows for this page.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              setDraft((current) => ({
                ...current,
                sections: [
                  ...current.sections,
                  {
                    ...makeEmptySection(sectionTypes),
                    sortOrder: current.sections.length,
                  },
                ],
              }))
            }
            className="rounded border border-[#0b4aa8] bg-[#316ac5] px-3 py-2 text-sm font-bold text-white"
          >
            Add Section
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {draft.sections.map((section, index) => (
            <div key={section.localId} className="rounded border border-[#d7d2c2] bg-[#f8f5ea] p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7b7260]">
                    Section {index + 1}
                  </p>
                  <p className="text-sm text-slate-700">{section.key || "Untitled section"}</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setDraft((current) => ({
                      ...current,
                      sections: current.sections.filter(
                        (entry) => entry.localId !== section.localId,
                      ),
                    }))
                  }
                  className="rounded border border-[#a52323] bg-white px-3 py-2 text-sm font-bold text-[#a52323]"
                >
                  Remove
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-1 text-sm">
                  <span className="font-bold text-slate-700">Key</span>
                  <input
                    value={section.key}
                    onChange={(e) =>
                      setDraft((current) => ({
                        ...current,
                        sections: current.sections.map((entry) =>
                          entry.localId === section.localId
                            ? { ...entry, key: e.target.value }
                            : entry,
                        ),
                      }))
                    }
                    className="rounded border border-[#a49f8c] px-3 py-2"
                  />
                </label>
                <label className="grid gap-1 text-sm">
                  <span className="font-bold text-slate-700">Type</span>
                  <select
                    value={section.type}
                    onChange={(e) =>
                      setDraft((current) => ({
                        ...current,
                        sections: current.sections.map((entry) =>
                          entry.localId === section.localId
                            ? { ...entry, type: e.target.value }
                            : entry,
                        ),
                      }))
                    }
                    className="rounded border border-[#a49f8c] px-3 py-2"
                  >
                    {sectionTypes.map((sectionType) => (
                      <option key={sectionType} value={sectionType}>
                        {sectionType}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-1 text-sm">
                  <span className="font-bold text-slate-700">Heading</span>
                  <input
                    value={section.heading}
                    onChange={(e) =>
                      setDraft((current) => ({
                        ...current,
                        sections: current.sections.map((entry) =>
                          entry.localId === section.localId
                            ? { ...entry, heading: e.target.value }
                            : entry,
                        ),
                      }))
                    }
                    className="rounded border border-[#a49f8c] px-3 py-2"
                  />
                </label>
                <label className="grid gap-1 text-sm">
                  <span className="font-bold text-slate-700">Subheading</span>
                  <input
                    value={section.subheading}
                    onChange={(e) =>
                      setDraft((current) => ({
                        ...current,
                        sections: current.sections.map((entry) =>
                          entry.localId === section.localId
                            ? { ...entry, subheading: e.target.value }
                            : entry,
                        ),
                      }))
                    }
                    className="rounded border border-[#a49f8c] px-3 py-2"
                  />
                </label>
                <label className="grid gap-1 text-sm md:col-span-2">
                  <span className="font-bold text-slate-700">Body</span>
                  <textarea
                    rows={4}
                    value={section.body}
                    onChange={(e) =>
                      setDraft((current) => ({
                        ...current,
                        sections: current.sections.map((entry) =>
                          entry.localId === section.localId
                            ? { ...entry, body: e.target.value }
                            : entry,
                        ),
                      }))
                    }
                    className="rounded border border-[#a49f8c] px-3 py-2"
                  />
                </label>
                <label className="grid gap-1 text-sm">
                  <span className="font-bold text-slate-700">Sort Order</span>
                  <input
                    type="number"
                    value={section.sortOrder}
                    onChange={(e) =>
                      setDraft((current) => ({
                        ...current,
                        sections: current.sections.map((entry) =>
                          entry.localId === section.localId
                            ? { ...entry, sortOrder: Number(e.target.value) || 0 }
                            : entry,
                        ),
                      }))
                    }
                    className="rounded border border-[#a49f8c] px-3 py-2"
                  />
                </label>
                <label className="flex items-center gap-2 self-end text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={section.isVisible}
                    onChange={(e) =>
                      setDraft((current) => ({
                        ...current,
                        sections: current.sections.map((entry) =>
                          entry.localId === section.localId
                            ? { ...entry, isVisible: e.target.checked }
                            : entry,
                        ),
                      }))
                    }
                  />
                  Visible
                </label>
                <label className="grid gap-1 text-sm md:col-span-2">
                  <span className="font-bold text-slate-700">JSON Data</span>
                  <textarea
                    rows={5}
                    value={section.jsonDataText}
                    onChange={(e) =>
                      setDraft((current) => ({
                        ...current,
                        sections: current.sections.map((entry) =>
                          entry.localId === section.localId
                            ? { ...entry, jsonDataText: e.target.value }
                            : entry,
                        ),
                      }))
                    }
                    className="rounded border border-[#a49f8c] px-3 py-2 font-mono text-xs"
                    placeholder='{"items":["One","Two"]}'
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
