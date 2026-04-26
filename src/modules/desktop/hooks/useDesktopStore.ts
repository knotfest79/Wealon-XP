'use client';
import { create } from 'zustand';

interface DesktopStore {
  currentWallpaper: number;
  wallpaperCount: number;
  bootPhase: 'booting' | 'welcome' | 'ready';
  setWallpaper: (idx: number) => void;
  setWallpaperCount: (count: number) => void;
  nextWallpaper: () => void;
  setBootPhase: (phase: 'booting' | 'welcome' | 'ready') => void;
}

export const useDesktopStore = create<DesktopStore>((set, get) => ({
  currentWallpaper: 0,
  wallpaperCount: 5,
  bootPhase: 'booting',

  setWallpaper: (idx) => set({ currentWallpaper: idx }),
  setWallpaperCount: (count) =>
    set((state) => ({
      wallpaperCount: Math.max(1, count),
      currentWallpaper:
        state.currentWallpaper >= Math.max(1, count) ? 0 : state.currentWallpaper,
    })),
  nextWallpaper: () => {
    const total = Math.max(1, get().wallpaperCount);
    set({ currentWallpaper: (get().currentWallpaper + 1) % total });
  },
  setBootPhase: (phase) => set({ bootPhase: phase }),
}));
