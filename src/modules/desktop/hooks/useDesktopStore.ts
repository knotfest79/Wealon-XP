'use client';
import { create } from 'zustand';

interface DesktopStore {
  currentWallpaper: number;
  bootPhase: 'booting' | 'welcome' | 'ready';
  setWallpaper: (idx: number) => void;
  nextWallpaper: () => void;
  setBootPhase: (phase: 'booting' | 'welcome' | 'ready') => void;
}

export const useDesktopStore = create<DesktopStore>((set, get) => ({
  currentWallpaper: 0,
  bootPhase: 'booting',

  setWallpaper: (idx) => set({ currentWallpaper: idx }),
  nextWallpaper: () => {
    const total = 5;
    set({ currentWallpaper: (get().currentWallpaper + 1) % total });
  },
  setBootPhase: (phase) => set({ bootPhase: phase }),
}));
