import { AdminShell } from "@/modules/admin/components/AdminShell";
import { DesktopWallpaperEditor } from "@/modules/admin/components/DesktopWallpaperEditor";
import { getDesktopWallpaperData } from "@/modules/desktop/server/wallpaperCms";

export default async function AdminDesktopWallpapersPage() {
  const data = await getDesktopWallpaperData();

  return (
    <AdminShell
      activeHref="/admin/desktop"
      title="Desktop Wallpapers"
      description="Manage the desktop wallpaper slider, add or remove wallpapers, and control the auto-rotation behavior."
    >
      <DesktopWallpaperEditor initialData={data} />
    </AdminShell>
  );
}
