import { MediaKind } from "@prisma/client";
import { unlink } from "fs/promises";
import path from "path";
import { db } from "@/lib/db";

export type WallpaperRecord = {
  id: string;
  name: string;
  src: string;
  alt: string;
  isActive: boolean;
  isDefault: boolean;
  sortOrder: number;
  mediaAssetId: string;
};

export async function ensureDesktopWallpaperSettings() {
  const existingSettings = await db.desktopSetting.count();

  if (existingSettings > 0) {
    return;
  }

  await db.desktopSetting.create({
    data: {
      rotationEnabled: true,
      rotationSeconds: 30,
    },
  });
}

export async function getDesktopWallpaperData() {
  await ensureDesktopWallpaperSettings();

  const [wallpapers, settings] = await Promise.all([
    db.desktopWallpaper.findMany({
      orderBy: [{ sortOrder: "asc" }],
      include: {
        mediaAsset: true,
      },
    }),
    db.desktopSetting.findFirst(),
  ]);

  return {
    wallpapers: wallpapers.map((wallpaper) => ({
      id: wallpaper.id,
      name: wallpaper.name,
      src: wallpaper.mediaAsset.url,
      alt: wallpaper.mediaAsset.altText ?? wallpaper.name,
      isActive: wallpaper.isActive,
      isDefault: wallpaper.isDefault,
      sortOrder: wallpaper.sortOrder,
      mediaAssetId: wallpaper.mediaAssetId,
    })),
    settings: settings ?? {
      rotationEnabled: true,
      rotationSeconds: 30,
    },
  };
}

export async function createDesktopWallpaper(input: {
  name: string;
  src: string;
  alt: string;
  isActive: boolean;
  isDefault: boolean;
}) {
  const sortOrder = await db.desktopWallpaper.count();

  const media = await db.mediaAsset.create({
    data: {
      name: input.name.trim(),
      url: input.src.trim(),
      kind: MediaKind.IMAGE,
      altText: input.alt.trim(),
      folder: "wallpapers",
    },
  });

  if (input.isDefault) {
    await db.desktopWallpaper.updateMany({
      data: {
        isDefault: false,
      },
    });
  }

  return db.desktopWallpaper.create({
    data: {
      name: input.name.trim(),
      mediaAssetId: media.id,
      sortOrder,
      isActive: input.isActive,
      isDefault: input.isDefault,
    },
    include: {
      mediaAsset: true,
    },
  });
}

export async function updateDesktopWallpaper(input: {
  id: string;
  name: string;
  src: string;
  alt: string;
  isActive: boolean;
  isDefault: boolean;
  sortOrder: number;
}) {
  const wallpaper = await db.desktopWallpaper.findUnique({
    where: { id: input.id },
    include: {
      mediaAsset: true,
    },
  });

  if (!wallpaper) {
    throw new Error("Wallpaper not found");
  }

  if (input.isDefault) {
    await db.desktopWallpaper.updateMany({
      where: {
        NOT: {
          id: input.id,
        },
      },
      data: {
        isDefault: false,
      },
    });
  }

  await db.mediaAsset.update({
    where: { id: wallpaper.mediaAssetId },
    data: {
      name: input.name.trim(),
      url: input.src.trim(),
      altText: input.alt.trim(),
      folder: "wallpapers",
    },
  });

  return db.desktopWallpaper.update({
    where: { id: input.id },
    data: {
      name: input.name.trim(),
      sortOrder: input.sortOrder,
      isActive: input.isActive,
      isDefault: input.isDefault,
    },
    include: {
      mediaAsset: true,
    },
  });
}

export async function deleteDesktopWallpaper(id: string) {
  const wallpaper = await db.desktopWallpaper.findUnique({
    where: { id },
    include: {
      mediaAsset: true,
    },
  });

  if (!wallpaper) {
    throw new Error("Wallpaper not found");
  }

  const mediaAssetId = wallpaper.mediaAssetId;

  await db.$transaction([
    db.desktopWallpaper.delete({
      where: { id },
    }),
  ]);

  const mediaUsageCount = await db.desktopWallpaper.count({
    where: { mediaAssetId },
  });

  if (mediaUsageCount === 0) {
    const deletedMedia = await db.mediaAsset
      .delete({
        where: { id: mediaAssetId },
      })
      .catch(() => null);

    if (deletedMedia?.url.startsWith("/uploads/media/")) {
      const uploadPath = path.join(
        process.cwd(),
        "public",
        deletedMedia.url.replace(/^\//, ""),
      );
      await unlink(uploadPath).catch(() => undefined);
    }
  }

  const stillDefault = await db.desktopWallpaper.findFirst({
    where: {
      isDefault: true,
    },
  });

  if (!stillDefault) {
    const fallback = await db.desktopWallpaper.findFirst({
      orderBy: [{ sortOrder: "asc" }],
    });

    if (fallback) {
      await db.desktopWallpaper.update({
        where: { id: fallback.id },
        data: {
          isDefault: true,
        },
      });
    }
  }
}

export async function updateDesktopWallpaperSettings(input: {
  rotationEnabled: boolean;
  rotationSeconds: number;
}) {
  await ensureDesktopWallpaperSettings();

  const existing = await db.desktopSetting.findFirst();
  if (!existing) {
    return db.desktopSetting.create({
      data: {
        rotationEnabled: input.rotationEnabled,
        rotationSeconds: input.rotationSeconds,
      },
    });
  }

  return db.desktopSetting.update({
    where: { id: existing.id },
    data: {
      rotationEnabled: input.rotationEnabled,
      rotationSeconds: input.rotationSeconds,
    },
  });
}
