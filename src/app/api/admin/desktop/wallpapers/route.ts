import { NextResponse } from "next/server";
import {
  createDesktopWallpaper,
  getDesktopWallpaperData,
  updateDesktopWallpaper,
  updateDesktopWallpaperSettings,
} from "@/modules/desktop/server/wallpaperCms";

export async function GET() {
  const data = await getDesktopWallpaperData();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      name: string;
      src: string;
      alt: string;
      isActive: boolean;
      isDefault: boolean;
    };

    if (!body.name?.trim() || !body.src?.trim()) {
      return NextResponse.json(
        { error: "Wallpaper name and source are required" },
        { status: 400 },
      );
    }

    await createDesktopWallpaper(body);
    const data = await getDesktopWallpaperData();
    return NextResponse.json({ ok: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create wallpaper" },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = (await req.json()) as {
      wallpapers: Array<{
        id: string;
        name: string;
        src: string;
        alt: string;
        isActive: boolean;
        isDefault: boolean;
        sortOrder: number;
      }>;
      settings: {
        rotationEnabled: boolean;
        rotationSeconds: number;
      };
    };

    if (!Array.isArray(body.wallpapers) || !body.settings) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    await Promise.all([
      ...body.wallpapers.map((wallpaper) => updateDesktopWallpaper(wallpaper)),
      updateDesktopWallpaperSettings({
        rotationEnabled: body.settings.rotationEnabled,
        rotationSeconds: Math.max(5, body.settings.rotationSeconds),
      }),
    ]);

    const data = await getDesktopWallpaperData();
    return NextResponse.json({ ok: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update wallpapers" },
      { status: 500 },
    );
  }
}
