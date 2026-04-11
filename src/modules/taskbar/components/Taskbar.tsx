'use client';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useWindowStore } from '@/modules/windows/store/useWindowStore';
import { WindowsLogo, FolderSvg } from '@/modules/ui/Icons';

function Clock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      let h = now.getHours();
      const m = String(now.getMinutes()).padStart(2, '0');
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
      setTime(`${h}:${m} ${ampm}`);
    };
    update();
    const i = setInterval(update, 10000);
    return () => clearInterval(i);
  }, []);
  return <span className="text-[11px] max-md:text-[10px] text-white" style={{ textShadow: '0 1px 0 rgba(0,0,0,.3)' }}>{time}</span>;
}

export function Taskbar() {
  const { openFolders, toggleStartMenu, minimizeFolder, restoreFolder, bringToFront } = useWindowStore();
  const folderKeys = Object.keys(openFolders);

  const handleTaskbarClick = (id: string) => {
    const f = openFolders[id];
    if (f.minimized) {
      restoreFolder(id);
    } else {
      // Check if frontmost
      const maxZ = Math.max(...Object.values(openFolders).map((v) => v.zIndex));
      if (f.zIndex === maxZ) {
        minimizeFolder(id);
      } else {
        bringToFront(id);
      }
    }
  };

  const folderTitles: Record<string, string> = {
    about: 'About Us', services: 'Services', downloads: 'Downloads', booking: 'Booking', pages: 'Pages',
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-9 max-md:h-11 z-[9999] flex items-center border-t-2 border-[#1c6afe]"
      style={{ background: 'linear-gradient(180deg, #2d6cdb, #1d58c0 8%, #1a59c2 50%, #1048a8)' }}>

      {/* Start button */}
      <button
        onClick={toggleStartMenu}
        className="h-[30px] max-md:h-9 flex items-center gap-1 px-3 max-md:px-2.5 ml-0.5 text-[13px] max-md:text-xs font-bold text-white cursor-pointer border-none outline-none relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #3fac3b, #2d8f29 40%, #1e731b)',
          borderRadius: '0 8px 8px 0',
          textShadow: '0 1px 1px rgba(0,0,0,.4)',
          letterSpacing: '0.3px',
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />
        <WindowsLogo size={18} />
        start
      </button>

      {/* Taskbar items */}
      <div className="flex-1 flex items-center px-2 gap-0.5 overflow-hidden">
        {folderKeys.map((id) => (
          <button
            key={id}
            onClick={() => handleTaskbarClick(id)}
            className={clsx(
              'h-[26px] max-md:h-7 min-w-[100px] max-md:min-w-[60px] max-w-[190px] max-md:max-w-[100px] flex items-center gap-1 px-2 border border-[#1848a0] rounded-sm cursor-pointer text-[11px] max-md:text-[10px] text-white overflow-hidden whitespace-nowrap text-ellipsis',
              openFolders[id].minimized
                ? 'bg-gradient-to-b from-[#3c8de4] via-[#2268c2] to-[#1a56a8]'
                : 'bg-gradient-to-b from-[#1a56a8] via-[#1848a0] to-[#123c8a] shadow-[1px_1px_1px_rgba(0,0,0,.2)_inset]'
            )}
            style={{ textShadow: '0 1px 0 rgba(0,0,0,.3)' }}
          >
            <FolderSvg size={16} />
            {folderTitles[id] || id}
          </button>
        ))}
      </div>

      {/* System tray */}
      <div className="h-full flex items-center px-2.5 max-md:px-2 min-w-[80px] max-md:min-w-[60px] justify-end border-l border-[#0f3c88]"
        style={{ background: 'linear-gradient(180deg, #1a59c2, #1048a8)' }}>
        <Clock />
      </div>
    </div>
  );
}
