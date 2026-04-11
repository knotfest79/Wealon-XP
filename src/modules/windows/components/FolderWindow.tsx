"use client";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useWindowStore } from "@/modules/windows/store/useWindowStore";
import { useBreakpoint } from "@/lib/useBreakpoint";
import { Titlebar } from "./Titlebar";
import { Sidebar } from "./Sidebar";
import { TileGrid } from "./TileGrid";
import { Folder } from "@/lib/types";

interface FolderWindowProps {
  folder: Folder;
  zIndex: number;
  isActive: boolean;
}

export function FolderWindow({ folder, zIndex, isActive }: FolderWindowProps) {
  const { closeFolder, minimizeFolder, bringToFront } = useWindowStore();
  const [isMaximized, setIsMaximized] = useState(false);
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isSmall = bp !== "desktop";

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<{
    x: number;
    y: number;
    ox: number;
    oy: number;
  } | null>(null);

  const handleDragStart = useCallback(
    (e: React.MouseEvent) => {
      if (isSmall || isMaximized) return;
      bringToFront(folder.id);
      setDragStart({ x: e.clientX, y: e.clientY, ox: pos.x, oy: pos.y });
    },
    [isSmall, isMaximized, pos, bringToFront, folder.id],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragStart) return;
      setPos({
        x: dragStart.ox + e.clientX - dragStart.x,
        y: dragStart.oy + e.clientY - dragStart.y,
      });
    },
    [dragStart],
  );

  const handleMouseUp = useCallback(() => setDragStart(null), []);

  // On tablet/mobile, always fullscreen
  const style = isSmall
    ? {
        top: 0,
        left: 0,
        width: "100%",
        height: `calc(100% - ${isMobile ? 44 : 36}px)`,
        zIndex,
      }
    : isMaximized
      ? { top: 0, left: 0, width: "100%", height: "calc(100% - 36px)", zIndex }
      : {
          top: `calc(50% - 240px + ${pos.y}px)`,
          left: `calc(50% - 340px + ${pos.x}px)`,
          width: 680,
          height: 480,
          zIndex,
        };

  return (
    <motion.div
      className="fixed flex flex-col overflow-hidden bg-[#ece9d8] border-2 border-[#0054e3] shadow-[2px_4px_16px_rgba(0,0,0,.4)] max-lg:border-0"
      style={{
        ...style,
        borderRadius: isSmall || isMaximized ? 0 : "8px 8px 0 0",
      }}
      initial={
        isMobile ? { y: "100%", opacity: 0.5 } : { scale: 0.12, opacity: 0 }
      }
      animate={isMobile ? { y: 0, opacity: 1 } : { scale: 1, opacity: 1 }}
      exit={isMobile ? { y: "100%", opacity: 0 } : { scale: 0.12, opacity: 0 }}
      transition={{
        duration: isMobile ? 0.3 : 0.32,
        ease: [0.22, 0.9, 0.36, 1],
      }}
      onMouseDown={() => bringToFront(folder.id)}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <Titlebar
        title={`${folder.title} — Wealon tax & accounting`}
        isActive={isActive}
        isMaximized={isMaximized}
        onMinimize={!isSmall ? () => minimizeFolder(folder.id) : undefined}
        onMaximize={!isMobile ? () => setIsMaximized(!isMaximized) : undefined}
        onClose={() => closeFolder(folder.id)}
        onMouseDown={handleDragStart}
      />

      {/* Menu bar — hidden on mobile */}
      {!isMobile && (
        <div className="h-[22px] min-h-[22px] bg-[#ece9d8] border-b border-[#aca899] flex items-center px-1 gap-0.5">
          {["File", "Edit", "View", "Tools", "Help"].map((m) => (
            <span
              key={m}
              className="text-[11px] text-black px-1.5 py-0.5 cursor-default hover:bg-[rgba(49,106,197,.35)]"
            >
              {m}
            </span>
          ))}
        </div>
      )}

      {/* Toolbar — hidden on mobile/tablet */}
      {bp === "desktop" && (
        <>
          <div
            className="h-7 min-h-7 border-b border-[#aca899] flex items-center px-1.5 gap-1"
            style={{ background: "linear-gradient(180deg, #faf8f4, #ece9d8)" }}
          >
            <button className="text-[11px] text-[#444] px-1.5 py-0.5 hover:text-black bg-transparent border-none cursor-default">
              ← Back
            </button>
            <button className="text-[11px] text-[#444] px-1.5 py-0.5 hover:text-black bg-transparent border-none cursor-default">
              →
            </button>
            <div className="w-px h-[18px] bg-[#c4c0b0] mx-0.5" />
            <button className="text-[11px] text-[#444] px-1.5 py-0.5 hover:text-black bg-transparent border-none cursor-default">
              🔍 Search
            </button>
            <button className="text-[11px] text-[#444] px-1.5 py-0.5 hover:text-black bg-transparent border-none cursor-default">
              📁 Folders
            </button>
          </div>
          <div className="h-6 min-h-6 bg-[#ece9d8] border-b border-[#aca899] flex items-center px-1.5 gap-1">
            <span className="text-[11px] text-black shrink-0">Address</span>
            <input
              className="flex-1 h-[18px] text-[11px] border border-[#7f9db9] bg-white px-1 text-black outline-none"
              style={{ borderTopColor: "#515e6e", borderLeftColor: "#515e6e" }}
              value={folder.address}
              readOnly
            />
          </div>
        </>
      )}

      {/* Content area */}
      <div className="flex-1 flex overflow-hidden bg-white min-h-0">
        <Sidebar />
        <TileGrid tiles={folder.tiles} folderTitle={folder.title} />
      </div>

      {/* Status bar */}
      <div className="h-[22px] max-md:h-7 min-h-[22px] bg-[#ece9d8] border-t border-white flex items-center px-1.5">
        <span className="text-[11px] max-md:text-xs text-[#444]">
          {folder.tiles.length} objects
        </span>
      </div>
    </motion.div>
  );
}
