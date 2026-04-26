"use client";

import { useState, useTransition } from "react";

type WallpaperRecord = {
  id: string;
  name: string;
  src: string;
  alt: string;
  isActive: boolean;
  isDefault: boolean;
  sortOrder: number;
  mediaAssetId: string;
};

type EditorData = {
  wallpapers: WallpaperRecord[];
  settings: {
    rotationEnabled: boolean;
    rotationSeconds: number;
  };
};

type DraftWallpaper = WallpaperRecord;

type UploadResponse =
  | {
      ok: true;
      file: {
        url: string;
        name: string;
      };
    }
  | { error: string };

export function DesktopWallpaperEditor({
  initialData,
}: {
  initialData: EditorData;
}) {
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const [wallpapers, setWallpapers] = useState<DraftWallpaper[]>(initialData.wallpapers);
  const [settings, setSettings] = useState(initialData.settings);
  const [newWallpaper, setNewWallpaper] = useState({
    name: "",
    src: "",
    alt: "",
    isActive: true,
    isDefault: false,
  });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const replaceData = (data: EditorData) => {
    setWallpapers(data.wallpapers);
    setSettings(data.settings);
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/media/uploads", {
      method: "POST",
      body: formData,
    });
    const result = (await response.json()) as UploadResponse;

    if (!response.ok || !("ok" in result)) {
      throw new Error("error" in result ? result.error : "Upload failed");
    }

    return result.file;
  };

  const uploadNewWallpaperImage = async (file: File | null) => {
    if (!file) return;
    setMessage(null);
    setError(null);
    setIsUploading(true);

    try {
      const uploaded = await uploadImage(file);
      setNewWallpaper((current) => ({
        ...current,
        name: current.name || uploaded.name,
        src: uploaded.url,
        alt: current.alt || uploaded.name,
      }));
      setMessage("Image uploaded. Add the wallpaper to save it.");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const uploadExistingWallpaperImage = async (id: string, file: File | null) => {
    if (!file) return;
    setMessage(null);
    setError(null);
    setIsUploading(true);

    try {
      const uploaded = await uploadImage(file);
      setWallpapers((current) =>
        current.map((entry) =>
          entry.id === id
            ? {
                ...entry,
                name: entry.name || uploaded.name,
                src: uploaded.url,
                alt: entry.alt || uploaded.name,
              }
            : entry,
        ),
      );
      setMessage("Image uploaded. Save wallpapers to publish the change.");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const saveAll = () => {
    setMessage(null);
    setError(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/admin/desktop/wallpapers", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ wallpapers, settings }),
        });
        const result = (await response.json()) as
          | { ok: true; data: EditorData }
          | { error: string };

        if (!response.ok || !("ok" in result)) {
          throw new Error("error" in result ? result.error : "Save failed");
        }

        replaceData(result.data);
        setMessage("Desktop wallpapers saved.");
      } catch (saveError) {
        setError(saveError instanceof Error ? saveError.message : "Failed to save wallpapers");
      }
    });
  };

  const createWallpaper = () => {
    setMessage(null);
    setError(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/admin/desktop/wallpapers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newWallpaper),
        });
        const result = (await response.json()) as
          | { ok: true; data: EditorData }
          | { error: string };

        if (!response.ok || !("ok" in result)) {
          throw new Error("error" in result ? result.error : "Create failed");
        }

        replaceData(result.data);
        setNewWallpaper({
          name: "",
          src: "",
          alt: "",
          isActive: true,
          isDefault: false,
        });
        setMessage("Wallpaper created.");
      } catch (createError) {
        setError(
          createError instanceof Error ? createError.message : "Failed to create wallpaper",
        );
      }
    });
  };

  const deleteWallpaper = (id: string) => {
    if (!window.confirm("Delete this wallpaper?")) {
      return;
    }

    setMessage(null);
    setError(null);

    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/desktop/wallpapers/${id}`, {
          method: "DELETE",
        });
        const result = (await response.json()) as
          | { ok: true; data: EditorData }
          | { error: string };

        if (!response.ok || !("ok" in result)) {
          throw new Error("error" in result ? result.error : "Delete failed");
        }

        replaceData(result.data);
        setMessage("Wallpaper deleted.");
      } catch (deleteError) {
        setError(
          deleteError instanceof Error ? deleteError.message : "Failed to delete wallpaper",
        );
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded border border-[#8f8a79] bg-[#dfe7f6] px-4 py-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#38508c]">
            Desktop Wallpaper CMS
          </p>
          <p className="text-sm text-slate-700">
            Create, upload, edit, delete, reorder, and rotate wallpapers from admin.
          </p>
        </div>
        <button
          type="button"
          onClick={saveAll}
          disabled={isPending}
          className="rounded border border-[#0b4aa8] bg-[#316ac5] px-4 py-2 text-sm font-bold text-white disabled:opacity-70"
        >
          {isPending ? "Saving..." : "Save Wallpapers"}
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
        <h2 className="text-lg font-bold text-slate-950">Slider Settings</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={settings.rotationEnabled}
              onChange={(e) =>
                setSettings((current) => ({
                  ...current,
                  rotationEnabled: e.target.checked,
                }))
              }
            />
            Rotation enabled
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-bold text-slate-700">Rotation Seconds</span>
            <input
              type="number"
              min={5}
              value={settings.rotationSeconds}
              onChange={(e) =>
                setSettings((current) => ({
                  ...current,
                  rotationSeconds: Number(e.target.value) || 30,
                }))
              }
              className="rounded border border-[#a49f8c] px-3 py-2"
            />
          </label>
        </div>
      </section>

      <section className="rounded border border-[#8f8a79] bg-white p-4">
        <h2 className="text-lg font-bold text-slate-950">Add Wallpaper</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="grid gap-1 text-sm">
            <span className="font-bold text-slate-700">Name</span>
            <input
              value={newWallpaper.name}
              onChange={(e) => setNewWallpaper((current) => ({ ...current, name: e.target.value }))}
              className="rounded border border-[#a49f8c] px-3 py-2"
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-bold text-slate-700">Image URL</span>
            <input
              value={newWallpaper.src}
              onChange={(e) => setNewWallpaper((current) => ({ ...current, src: e.target.value }))}
              className="rounded border border-[#a49f8c] px-3 py-2"
            />
          </label>
          <label className="grid gap-1 text-sm md:col-span-2">
            <span className="font-bold text-slate-700">Upload Image</span>
            <input
              type="file"
              accept="image/*"
              disabled={isPending || isUploading}
              onChange={(e) => uploadNewWallpaperImage(e.target.files?.[0] ?? null)}
              className="rounded border border-[#a49f8c] bg-white px-3 py-2"
            />
          </label>
          {newWallpaper.src ? (
            <div className="md:col-span-2">
              <div
                className="h-36 rounded border border-[#a49f8c] bg-cover bg-center"
                style={{ backgroundImage: `url(${newWallpaper.src})` }}
              />
            </div>
          ) : null}
          <label className="grid gap-1 text-sm md:col-span-2">
            <span className="font-bold text-slate-700">Alt Text</span>
            <input
              value={newWallpaper.alt}
              onChange={(e) => setNewWallpaper((current) => ({ ...current, alt: e.target.value }))}
              className="rounded border border-[#a49f8c] px-3 py-2"
            />
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={newWallpaper.isActive}
              onChange={(e) =>
                setNewWallpaper((current) => ({ ...current, isActive: e.target.checked }))
              }
            />
            Active
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={newWallpaper.isDefault}
              onChange={(e) =>
                setNewWallpaper((current) => ({ ...current, isDefault: e.target.checked }))
              }
            />
            Default wallpaper
          </label>
        </div>
        <button
          type="button"
          onClick={createWallpaper}
          disabled={isPending || isUploading}
          className="mt-4 rounded border border-[#0b4aa8] bg-[#316ac5] px-4 py-2 text-sm font-bold text-white disabled:opacity-70"
        >
          {isUploading ? "Uploading..." : "Add Wallpaper"}
        </button>
      </section>

      <div className="space-y-5">
        {wallpapers.map((wallpaper, index) => (
          <section key={wallpaper.id} className="rounded border border-[#8f8a79] bg-white p-4">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7b7260]">
                  Wallpaper {index + 1}
                </p>
                <h3 className="text-lg font-bold text-slate-950">{wallpaper.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => deleteWallpaper(wallpaper.id)}
                disabled={isPending}
                className="rounded border border-[#a52323] bg-[#c73f3f] px-3 py-2 text-sm font-bold text-white disabled:opacity-70"
              >
                Delete
              </button>
            </div>

            <div
              className="mb-4 h-40 rounded border border-[#a49f8c] bg-cover bg-center"
              style={{ backgroundImage: `url(${wallpaper.src})` }}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-1 text-sm">
                <span className="font-bold text-slate-700">Name</span>
                <input
                  value={wallpaper.name}
                  onChange={(e) =>
                    setWallpapers((current) =>
                      current.map((entry) =>
                        entry.id === wallpaper.id ? { ...entry, name: e.target.value } : entry,
                      ),
                    )
                  }
                  className="rounded border border-[#a49f8c] px-3 py-2"
                />
              </label>
              <label className="grid gap-1 text-sm">
                <span className="font-bold text-slate-700">Image URL</span>
                <input
                  value={wallpaper.src}
                  onChange={(e) =>
                    setWallpapers((current) =>
                      current.map((entry) =>
                        entry.id === wallpaper.id ? { ...entry, src: e.target.value } : entry,
                      ),
                    )
                  }
                  className="rounded border border-[#a49f8c] px-3 py-2"
                />
              </label>
              <label className="grid gap-1 text-sm md:col-span-2">
                <span className="font-bold text-slate-700">Replace with Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  disabled={isPending || isUploading}
                  onChange={(e) =>
                    uploadExistingWallpaperImage(wallpaper.id, e.target.files?.[0] ?? null)
                  }
                  className="rounded border border-[#a49f8c] bg-white px-3 py-2"
                />
              </label>
              <label className="grid gap-1 text-sm md:col-span-2">
                <span className="font-bold text-slate-700">Alt Text</span>
                <input
                  value={wallpaper.alt}
                  onChange={(e) =>
                    setWallpapers((current) =>
                      current.map((entry) =>
                        entry.id === wallpaper.id ? { ...entry, alt: e.target.value } : entry,
                      ),
                    )
                  }
                  className="rounded border border-[#a49f8c] px-3 py-2"
                />
              </label>
              <label className="grid gap-1 text-sm">
                <span className="font-bold text-slate-700">Sort Order</span>
                <input
                  type="number"
                  value={wallpaper.sortOrder}
                  onChange={(e) =>
                    setWallpapers((current) =>
                      current.map((entry) =>
                        entry.id === wallpaper.id
                          ? { ...entry, sortOrder: Number(e.target.value) || 0 }
                          : entry,
                      ),
                    )
                  }
                  className="rounded border border-[#a49f8c] px-3 py-2"
                />
              </label>
              <div className="grid gap-2 text-sm">
                <label className="flex items-center gap-2 text-slate-700">
                  <input
                    type="checkbox"
                    checked={wallpaper.isActive}
                    onChange={(e) =>
                      setWallpapers((current) =>
                        current.map((entry) =>
                          entry.id === wallpaper.id
                            ? { ...entry, isActive: e.target.checked }
                            : entry,
                        ),
                      )
                    }
                  />
                  Active
                </label>
                <label className="flex items-center gap-2 text-slate-700">
                  <input
                    type="radio"
                    name="default-wallpaper"
                    checked={wallpaper.isDefault}
                    onChange={() =>
                      setWallpapers((current) =>
                        current.map((entry) => ({
                          ...entry,
                          isDefault: entry.id === wallpaper.id,
                        })),
                      )
                    }
                  />
                  Default
                </label>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
