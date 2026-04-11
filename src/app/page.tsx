'use client';
import { AnimatePresence } from 'framer-motion';
import { BootScreen } from '@/modules/desktop/components/BootScreen';
import { Wallpaper } from '@/modules/desktop/components/Wallpaper';
import { DesktopIcons } from '@/modules/desktop/components/DesktopIcons';
import { DesktopLogo } from '@/modules/desktop/components/DesktopLogo';
import { FolderWindow } from '@/modules/windows/components/FolderWindow';
import { PreviewWindow } from '@/modules/windows/components/PreviewWindow';
import { ClientPortalWindow } from '@/modules/windows/components/ClientPortalWindow';
import { Taskbar } from '@/modules/taskbar/components/Taskbar';
import { StartMenu } from '@/modules/taskbar/components/StartMenu';
import { useWindowStore } from '@/modules/windows/store/useWindowStore';
import { useDesktopStore } from '@/modules/desktop/hooks/useDesktopStore';
import { folders } from '@/modules/content/data/folders';

export default function HomePage() {
  const { openFolders, activePreview } = useWindowStore();
  const { bootPhase } = useDesktopStore();

  // Determine which folder is frontmost
  const folderKeys = Object.keys(openFolders);
  const maxZ = folderKeys.length > 0
    ? Math.max(...folderKeys.map((k) => openFolders[k].zIndex))
    : 0;

  return (
    <>
      <BootScreen />

      {bootPhase === 'ready' && (
        <div id="desktop" className="relative w-full h-full overflow-hidden">
          <Wallpaper />
          <DesktopIcons />
          <DesktopLogo />

          {/* Folder windows */}
          <AnimatePresence>
            {folderKeys.map((key) => {
              const state = openFolders[key];
              if (state.minimized) return null;
              const folder = folders[key];
              if (!folder) return null;
              return (
                <FolderWindow
                  key={key}
                  folder={folder}
                  zIndex={state.zIndex}
                  isActive={state.zIndex === maxZ && !activePreview}
                />
              );
            })}
          </AnimatePresence>

          {/* Preview window */}
          <PreviewWindow />

          {/* Client portal login */}
          <ClientPortalWindow />

          {/* Start menu */}
          <StartMenu />

          {/* Taskbar */}
          <Taskbar />
        </div>
      )}
    </>
  );
}
