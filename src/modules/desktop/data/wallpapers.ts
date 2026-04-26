import { WallpaperConfig } from "@/lib/types";
import { defaultWallpapers } from "./wallpaperDefaults";

export const wallpapers: WallpaperConfig[] = defaultWallpapers.map(
  ({ id, src, alt }) => ({ id, src, alt }),
);
