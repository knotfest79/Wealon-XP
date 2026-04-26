"use client";
import { useEffect, useState } from "react";
import { Tile } from "@/lib/types";
import { TileIcon } from "@/modules/ui/Icons";
import {
  getRoutePathForFolderId,
  getRoutePathForPageId,
} from "@/modules/content/data/routes";
import { pushXpPath } from "@/modules/content/utils/xpRouting";
import { useWindowStore } from "@/modules/windows/store/useWindowStore";

interface TileGridProps {
  tiles: Tile[];
  folderId: string;
  folderTitle: string;
}

export function TileGrid({ tiles, folderId, folderTitle }: TileGridProps) {
  const openFolder = useWindowStore((s) => s.openFolder);
  const openPreview = useWindowStore((s) => s.openPreview);
  const [runtimeTiles, setRuntimeTiles] = useState<Tile[]>(tiles);

  useEffect(() => {
    setRuntimeTiles(tiles);
  }, [tiles]);

  useEffect(() => {
    let cancelled = false;

    async function loadServiceTiles() {
      if (folderId !== "services") return;

      try {
        const response = await fetch("/api/cms/services/tiles", {
          cache: "no-store",
        });

        if (!response.ok) return;

        const payload = (await response.json()) as { tiles: Tile[] };
        if (!cancelled && payload.tiles.length > 0) {
          setRuntimeTiles(payload.tiles);
        }
      } catch {
        // Keep static tiles as fallback.
      }
    }

    loadServiceTiles();

    return () => {
      cancelled = true;
    };
  }, [folderId]);

  const handleClick = (tile: Tile) => {
    const routePath = tile.openFolder
      ? getRoutePathForFolderId(tile.openFolder)
      : getRoutePathForPageId(tile.id);

    if (routePath && window.location.pathname !== routePath) {
      pushXpPath(routePath, { folderId, tileId: tile.id });
    }

    if (tile.openFolder) {
      openFolder(tile.openFolder);
    } else {
      openPreview(tile.id);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 max-lg:p-4 min-h-0">
      <div className="text-xs font-bold text-[#333] mb-2.5 border-b border-[#e0dcd0] pb-1 max-lg:text-[13px]">
        📁 {folderTitle} — {runtimeTiles.length} items
      </div>
      <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-5 max-lg:gap-6">
        {runtimeTiles.map((tile) => (
          <div
            key={tile.id}
            onClick={() => handleClick(tile)}
            className="flex w-full min-h-[58px] max-lg:min-h-[74px] items-center gap-2.5 max-lg:gap-3 overflow-hidden p-2.5 max-lg:p-4 bg-[#fbfaf4] border border-[#d8d1bd] rounded-md shadow-[0_2px_8px_rgba(0,0,0,.12)] cursor-pointer transition-all duration-150 hover:bg-[#eef3fb] hover:border-[#a0b8d8] hover:shadow-md active:scale-[0.99] active:bg-[#edf4ff]"
          >
            <TileIcon type={tile.icon} size={36} />
            <div className="flex-1 min-w-0">
              <div className="text-[11px] max-lg:text-[13px] font-bold text-[#1a2744] mb-px truncate">
                {tile.name}
              </div>
              <div className="text-[10px] max-lg:text-[11px] text-[#888] truncate">
                {tile.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
