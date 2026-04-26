import { NextResponse } from "next/server";
import { getDesktopWallpaperData } from "@/modules/desktop/server/wallpaperCms";

export async function GET() {
  const data = await getDesktopWallpaperData();
  return NextResponse.json(data);
}
