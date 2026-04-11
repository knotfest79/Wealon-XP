"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBreakpoint } from "@/lib/useBreakpoint";
import { useWindowStore } from "@/modules/windows/store/useWindowStore";
import { Titlebar } from "./Titlebar";

const CLIENT_PORTAL_URL = "https://wealon.taxdome.com/login";

export function ClientPortalWindow() {
  const { clientPortal, closeClientPortal, toggleClientPortalMax } = useWindowStore();
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isMax = clientPortal.maximized;
  const taskbarHeight = isMobile ? 44 : 36;
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<{
    x: number;
    y: number;
    ox: number;
    oy: number;
  } | null>(null);

  const handleDragStart = useCallback(
    (e: React.MouseEvent) => {
      if (isMax || (e.target as HTMLElement).closest("button")) return;

      e.preventDefault();
      setDragStart({ x: e.clientX, y: e.clientY, ox: pos.x, oy: pos.y });
    },
    [isMax, pos],
  );

  useEffect(() => {
    if (!dragStart) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({
        x: dragStart.ox + e.clientX - dragStart.x,
        y: dragStart.oy + e.clientY - dragStart.y,
      });
    };

    const handleMouseUp = () => setDragStart(null);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragStart]);

  return (
    <AnimatePresence>
      {clientPortal.open && (
        <motion.div
          className="fixed z-[750] flex flex-col overflow-hidden bg-white border-2 border-[#0054e3] shadow-[4px_6px_24px_rgba(0,0,0,.45)] max-lg:border-0"
          style={
            isMax
              ? {
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `calc(100% - ${taskbarHeight}px)`,
                  borderRadius: 0,
                }
              : {
                  top: "50%",
                  left: "50%",
                  width: "min(720px, calc(100vw - 24px))",
                  height: `min(520px, calc(100vh - ${taskbarHeight + 24}px))`,
                  borderRadius: "8px 8px 0 0",
                  marginLeft: `calc(-1 * min(360px, calc((100vw - 24px) / 2)) + ${pos.x}px)`,
                  marginTop: `calc(-1 * min(260px, calc((100vh - ${taskbarHeight + 24}px) / 2)) + ${pos.y}px)`,
                }
          }
          initial={isMobile ? { y: "100%", opacity: 0.5 } : { scale: 0.25, opacity: 0 }}
          animate={isMobile ? { y: 0, opacity: 1 } : { scale: 1, opacity: 1 }}
          exit={isMobile ? { y: "100%", opacity: 0 } : { scale: 0.2, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 0.9, 0.36, 1] }}
        >
          <Titlebar
            title="Client Portal — Wealon Tax & Accounting"
            isMaximized={isMax}
            onMaximize={toggleClientPortalMax}
            onClose={closeClientPortal}
            onMouseDown={handleDragStart}
          />

          <div className="flex items-center justify-between gap-3 border-b border-[#aca899] bg-[#ece9d8] px-2 py-1.5 text-[11px] text-[#333]">
            <span className="truncate">Client portal login: {CLIENT_PORTAL_URL}</span>
            <a
              href={CLIENT_PORTAL_URL}
              className="shrink-0 rounded border border-[#7f9db9] bg-white px-2 py-0.5 text-[#0054e3] hover:underline"
            >
              Continue login
            </a>
          </div>

          <iframe
            src={CLIENT_PORTAL_URL}
            title="Wealon client portal login"
            className="flex-1 border-0 bg-white"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
