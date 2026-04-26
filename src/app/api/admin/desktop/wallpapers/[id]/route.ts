import { NextResponse } from "next/server";
import {
  deleteDesktopWallpaper,
  getDesktopWallpaperData,
} from "@/modules/desktop/server/wallpaperCms";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await deleteDesktopWallpaper(id);
    const data = await getDesktopWallpaperData();
    return NextResponse.json({ ok: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete wallpaper" },
      { status: 500 },
    );
  }
}
