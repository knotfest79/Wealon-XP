"use client";
import { useWindowStore } from "@/modules/windows/store/useWindowStore";
import { folders } from "@/modules/content/data/folders";
import {
  AboutIconSvg,
  ServicesIconSvg,
  DownloadsIconSvg,
  BookingIconSvg,
  PagesIconSvg,
  FolderSvg,
} from "@/modules/ui/Icons";

const iconMap: Record<string, React.FC> = {
  about: AboutIconSvg,
  services: ServicesIconSvg,
  downloads: DownloadsIconSvg,
  booking: BookingIconSvg,
  pages: PagesIconSvg,
};

export function DesktopIcons() {
  const openFolder = useWindowStore((s) => s.openFolder);

  return (
    <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 max-md:static max-md:flex-row max-md:flex-wrap max-md:justify-center max-md:items-center max-md:gap-4 max-md:p-6 max-md:pt-6">
      {Object.keys(folders).map((key) => {
        const folder = folders[key];
        const IconComp = iconMap[key];
        return (
          <div
            key={key}
            className="group relative flex flex-col items-center w-[76px] max-md:w-[72px] p-1.5 rounded-sm cursor-default transition-transform duration-150 hover:scale-110 max-md:hover:scale-100"
            onClick={() => openFolder(key)}
          >
            {/* Selection overlay */}
            <div className="absolute inset-0 rounded-sm bg-[rgba(49,106,197,0.22)] border border-dotted border-[rgba(49,106,197,0.5)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none max-md:hidden" />

            {IconComp && <IconComp />}

            <span
              className="text-white text-[11px] max-md:text-[12px] text-center leading-tight max-w-[72px] px-0.5 mt-0.5"
              style={{ textShadow: "1px 1px 2px rgba(0,0,0,.8)" }}
            >
              {folder.title}
            </span>

            {/* Hover preview tooltip — desktop only */}
            <div className="hidden lg:group-hover:flex absolute left-[84px] top-[-4px] w-[240px] flex-col bg-white border-2 border-[#6f2968] rounded shadow-[3px_4px_14px_rgba(0,0,0,.45)] z-50 pointer-events-none animate-[prevIn_0.18s_ease_forwards]">
              <div className="bg-gradient-to-br from-[#5f1f5c] via-[#7f2e77] to-[#a43d98] px-3 py-2.5 flex items-center gap-2 rounded-t">
                <FolderSvg size={20} />
                <span
                  className="text-xs font-bold text-white"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {folder.title}
                </span>
              </div>
              <div className="text-[10px] text-[#f4d7ef] px-3 py-1 bg-gradient-to-r from-[#6f2968] to-[#8d3582] tracking-wide border-t border-[rgba(255,255,255,.15)]">
                {folder.tiles.length} item{folder.tiles.length !== 1 ? "s" : ""}
              </div>
              <div className="py-2 max-h-[170px] overflow-hidden">
                {folder.tiles.slice(0, 6).map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center gap-2 px-3 py-0.5 text-[11px] font-medium text-[#333]"
                  >
                    <FolderSvg size={16} />
                    <span className="truncate">{t.name}</span>
                  </div>
                ))}
                {folder.tiles.length > 6 && (
                  <div className="px-3 py-0.5 text-[11px] text-gray-400 italic">
                    +{folder.tiles.length - 6} more...
                  </div>
                )}
              </div>
              <div className="px-3 py-1.5 bg-[#fbf5fa] border-t border-[#ead3e5] text-[10px] text-[#7f2e77] italic rounded-b">
                Click to open folder
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
