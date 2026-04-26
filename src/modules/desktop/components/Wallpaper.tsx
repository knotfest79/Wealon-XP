'use client';
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDesktopStore } from '../hooks/useDesktopStore';
import { wallpapers } from '../data/wallpapers';

type WallpaperPayload = {
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

export function Wallpaper() {
  const { currentWallpaper, setWallpaper, setWallpaperCount, nextWallpaper } =
    useDesktopStore();
  const [remoteWallpapers, setRemoteWallpapers] = useState<
    WallpaperPayload["wallpapers"] | null
  >(null);
  const [rotationSeconds, setRotationSeconds] = useState(30);
  const [rotationEnabled, setRotationEnabled] = useState(true);

  const activeWallpapers = useMemo(() => {
    const source = remoteWallpapers
      ? remoteWallpapers.filter((wallpaper) => wallpaper.isActive)
      : wallpapers.map((wallpaper, index) => ({
          ...wallpaper,
          sortOrder: index,
          isActive: true,
          isDefault: index === 0,
        }));

    const sorted = [...source].sort((a, b) => {
      if (a.isDefault && !b.isDefault) return -1;
      if (!a.isDefault && b.isDefault) return 1;
      return a.sortOrder - b.sortOrder;
    });

    return sorted.length > 0
      ? sorted
      : wallpapers.map((wallpaper, index) => ({
          ...wallpaper,
          sortOrder: index,
          isActive: true,
          isDefault: index === 0,
        }));
  }, [remoteWallpapers]);

  useEffect(() => {
    let cancelled = false;

    async function loadWallpapers() {
      try {
        const response = await fetch("/api/desktop/wallpapers", {
          cache: "no-store",
        });

        if (!response.ok) return;

        const payload = (await response.json()) as WallpaperPayload;
        if (!cancelled) {
          setRemoteWallpapers(payload.wallpapers);
          setRotationEnabled(payload.settings.rotationEnabled);
          setRotationSeconds(payload.settings.rotationSeconds);
        }
      } catch {
        // Keep static fallback wallpapers.
      }
    }

    loadWallpapers();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setWallpaperCount(activeWallpapers.length);
  }, [activeWallpapers.length, setWallpaperCount]);

  useEffect(() => {
    if (!rotationEnabled) return;

    const interval = setInterval(nextWallpaper, rotationSeconds * 1000);
    return () => clearInterval(interval);
  }, [nextWallpaper, rotationEnabled, rotationSeconds]);

  return (
    <>
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={activeWallpapers[currentWallpaper].id}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${activeWallpapers[currentWallpaper].src})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          />
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="absolute bottom-[46px] max-md:bottom-[50px] left-1/2 -translate-x-1/2 z-[6] flex gap-1.5 max-md:gap-2">
        {activeWallpapers.map((_, i) => (
          <button
            key={i}
            onClick={() => setWallpaper(i)}
            className={`w-2 h-2 max-md:w-2.5 max-md:h-2.5 rounded-full border border-white/50 transition-all duration-300 cursor-pointer ${
              i === currentWallpaper
                ? 'bg-white/90 shadow-[0_0_6px_rgba(255,255,255,.5)]'
                : 'bg-white/35 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </>
  );
}
