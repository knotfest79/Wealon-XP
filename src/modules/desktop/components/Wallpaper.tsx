'use client';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDesktopStore } from '../hooks/useDesktopStore';
import { wallpapers } from '../data/wallpapers';

export function Wallpaper() {
  const { currentWallpaper, setWallpaper, nextWallpaper } = useDesktopStore();

  useEffect(() => {
    const interval = setInterval(nextWallpaper, 30000);
    return () => clearInterval(interval);
  }, [nextWallpaper]);

  return (
    <>
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={wallpapers[currentWallpaper].id}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${wallpapers[currentWallpaper].src})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          />
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="absolute bottom-[46px] max-md:bottom-[50px] left-1/2 -translate-x-1/2 z-[6] flex gap-1.5 max-md:gap-2">
        {wallpapers.map((_, i) => (
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
