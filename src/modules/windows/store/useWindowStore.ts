'use client';
import { create } from 'zustand';

interface WindowState {
  minimized: boolean;
  zIndex: number;
}

interface WindowStore {
  openFolders: Record<string, WindowState>;
  activePreview: { id: string; maximized: boolean } | null;
  clientPortal: { open: boolean; maximized: boolean };
  startMenuOpen: boolean;
  zCounter: number;

  openFolder: (id: string) => void;
  closeFolder: (id: string) => void;
  minimizeFolder: (id: string) => void;
  maximizeFolder: (id: string) => void;
  bringToFront: (id: string) => void;
  restoreFolder: (id: string) => void;

  openPreview: (id: string) => void;
  closePreview: () => void;
  togglePreviewMax: () => void;

  openClientPortal: () => void;
  closeClientPortal: () => void;
  toggleClientPortalMax: () => void;

  toggleStartMenu: () => void;
  closeStartMenu: () => void;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  openFolders: {},
  activePreview: null,
  clientPortal: { open: false, maximized: false },
  startMenuOpen: false,
  zCounter: 100,

  openFolder: (id) => {
    const { openFolders, zCounter } = get();
    if (openFolders[id]) {
      // Already open — bring to front or restore if minimized
      if (openFolders[id].minimized) {
        set({
          openFolders: { ...openFolders, [id]: { minimized: false, zIndex: zCounter + 1 } },
          zCounter: zCounter + 1,
          startMenuOpen: false,
        });
      } else {
        set({
          openFolders: { ...openFolders, [id]: { ...openFolders[id], zIndex: zCounter + 1 } },
          zCounter: zCounter + 1,
        });
      }
      return;
    }
    set({
      openFolders: { ...openFolders, [id]: { minimized: false, zIndex: zCounter + 1 } },
      zCounter: zCounter + 1,
      startMenuOpen: false,
    });
  },

  closeFolder: (id) => {
    const { openFolders } = get();
    const next = { ...openFolders };
    delete next[id];
    set({ openFolders: next });
  },

  minimizeFolder: (id) => {
    const { openFolders } = get();
    if (openFolders[id]) {
      set({ openFolders: { ...openFolders, [id]: { ...openFolders[id], minimized: true } } });
    }
  },

  maximizeFolder: (_id) => {
    // Handled via local component state for max/restore toggle
  },

  bringToFront: (id) => {
    const { openFolders, zCounter } = get();
    if (openFolders[id]) {
      set({
        openFolders: { ...openFolders, [id]: { ...openFolders[id], zIndex: zCounter + 1 } },
        zCounter: zCounter + 1,
      });
    }
  },

  restoreFolder: (id) => {
    const { openFolders, zCounter } = get();
    if (openFolders[id]) {
      set({
        openFolders: { ...openFolders, [id]: { minimized: false, zIndex: zCounter + 1 } },
        zCounter: zCounter + 1,
      });
    }
  },

  openPreview: (id) => set({ activePreview: { id, maximized: false } }),
  closePreview: () => set({ activePreview: null }),
  togglePreviewMax: () => {
    const { activePreview } = get();
    if (activePreview) {
      set({ activePreview: { ...activePreview, maximized: !activePreview.maximized } });
    }
  },

  openClientPortal: () => set({ clientPortal: { open: true, maximized: false }, startMenuOpen: false }),
  closeClientPortal: () => set({ clientPortal: { open: false, maximized: false } }),
  toggleClientPortalMax: () => {
    const { clientPortal } = get();
    set({ clientPortal: { ...clientPortal, maximized: !clientPortal.maximized } });
  },

  toggleStartMenu: () => set((s) => ({ startMenuOpen: !s.startMenuOpen })),
  closeStartMenu: () => set({ startMenuOpen: false }),
}));
