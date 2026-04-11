"use client";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWindowStore } from "@/modules/windows/store/useWindowStore";
import { useBreakpoint } from "@/lib/useBreakpoint";
import { folders } from "@/modules/content/data/folders";
import { WealonLogo, FolderSvg } from "@/modules/ui/Icons";

export function StartMenu() {
  const { startMenuOpen, closeStartMenu, openFolder } = useWindowStore();
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        startMenuOpen &&
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        !(e.target as Element)?.closest("#start-btn-zone")
      ) {
        closeStartMenu();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [startMenuOpen, closeStartMenu]);

  const handleOpen = (id: string) => {
    closeStartMenu();
    setTimeout(() => openFolder(id), 100);
  };

  return (
    <AnimatePresence>
      {startMenuOpen && (
        <motion.div
          ref={ref}
          className={`fixed z-[10000] flex flex-col overflow-hidden ${isMobile ? "inset-x-0 bottom-11 border-t-2 border-[#2a5dcc]" : "bottom-9 left-0 w-[340px] border-2 border-[#2a5dcc] border-b-0 rounded-t-lg"}`}
          style={{
            background:
              "linear-gradient(180deg, #2a5dcc 0%, #2352b8 2%, #fff 2%, #fff 100%)",
            boxShadow: "3px -3px 12px rgba(0,0,0,.35)",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.18 }}
        >
          {/* Header */}
          <div
            className="relative isolate px-3.5 py-3 flex items-center gap-2.5 rounded-t-md"
            style={{ background: "linear-gradient(180deg, #2a5dcc, #1a45a8)" }}
          >
            <WealonLogo
              size={isMobile ? 96 : 120}
              className="w-[120px] max-md:w-24 shrink-0"
            />
            <div className="relative z-10">
              <div
                className="text-[13px] font-bold text-white tracking-wide"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Wealon Tax & Accounting
              </div>
              <div className="text-[9px] text-white/75 uppercase tracking-[1.5px]">
                for tailored financial solutions
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-1 min-h-0">
            {/* Left column */}
            <div className="flex-1 bg-white py-1.5 border-r border-[#d6d2c2] max-md:border-r-0">
              {Object.values(folders).map((f, i) => (
                <div key={f.id}>
                  <div
                    onClick={() => handleOpen(f.id)}
                    className="flex items-center gap-2 px-3.5 max-md:px-4 py-1.5 max-md:py-2.5 cursor-pointer text-[11px] max-md:text-[13px] text-black hover:bg-[#2a5dcc] hover:text-white transition-colors"
                  >
                    <FolderSvg size={isMobile ? 28 : 24} />
                    <div>
                      <div className="font-bold">{f.title}</div>
                      <div className="text-[9px] max-md:text-[11px] text-[#888] group-hover:text-white/70 mt-px">
                        {f.tiles.length} item{f.tiles.length !== 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>
                  {i === 3 && <div className="h-px bg-[#e0dcd0] mx-2.5 my-1" />}
                </div>
              ))}
            </div>

            {/* Right column — desktop/tablet only */}
            {!isMobile && (
              <div
                className="w-[130px] py-2"
                style={{
                  background: "linear-gradient(180deg, #4f8ad8, #2a5dcc)",
                }}
              >
                {Object.values(folders).map((f) => (
                  <div
                    key={f.id}
                    onClick={() => handleOpen(f.id)}
                    className="flex items-center gap-1.5 px-3 py-1 cursor-pointer text-[11px] text-white/90 hover:bg-white/15 transition-colors"
                  >
                    📂 {f.title}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            className="px-3.5 py-1.5 flex justify-end border-t border-[#1a45a8]"
            style={{ background: "linear-gradient(180deg, #3a7bdb, #2352b8)" }}
          >
            <button
              onClick={closeStartMenu}
              className="text-[11px] text-white px-2 py-0.5 rounded-sm hover:bg-white/15 cursor-pointer bg-transparent border-none"
              style={{ fontFamily: "var(--font-xp)" }}
            >
              Close ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
