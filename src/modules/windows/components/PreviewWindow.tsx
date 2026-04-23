"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useWindowStore } from "@/modules/windows/store/useWindowStore";
import { useBreakpoint } from "@/lib/useBreakpoint";
import { Titlebar } from "./Titlebar";
import {
  PageRouter,
  getPageTitle,
} from "@/modules/content/components/PageRouter";
import {
  getFolderIdForPageId,
  getRoutePathForFolderId,
} from "@/modules/content/data/routes";
import { pushXpPath } from "@/modules/content/utils/xpRouting";
import clsx from "clsx";

export function PreviewWindow() {
  const { activePreview, closePreview, openFolders, togglePreviewMax } =
    useWindowStore();
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isSmall = bp !== "desktop";

  // On tablet/mobile, always show maximized (white) mode
  const isMax = activePreview ? isSmall || activePreview.maximized : false;
  const barH = isMobile ? 44 : 36;

  const handleClose = () => {
    if (activePreview) {
      const folderId = getFolderIdForPageId(activePreview.id);
      const nextPath =
        folderId && openFolders[folderId]
          ? getRoutePathForFolderId(folderId) || "/"
          : "/";

      pushXpPath(nextPath, folderId ? { folderId } : {});
    }

    closePreview();
  };

  return (
    <AnimatePresence>
      {activePreview && (
        <motion.div
          className={clsx(
            "fixed flex flex-col overflow-hidden z-[500]",
            isMax
              ? "bg-white"
              : "bg-[#1e1e1e] border-2 border-[#444] shadow-[4px_6px_24px_rgba(0,0,0,.5)]",
            isSmall ? "inset-0" : isMax ? "" : "",
          )}
          style={
            isSmall
              ? {
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `calc(100% - ${barH}px)`,
                  borderRadius: 0,
                }
              : isMax
                ? {
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "calc(100% - 36px)",
                    borderRadius: 0,
                  }
                : {
                    top: "calc(50% - 220px)",
                    left: "calc(50% - 300px)",
                    width: 600,
                    height: 440,
                    borderRadius: "8px 8px 0 0",
                  }
          }
          initial={
            isMobile ? { y: "100%", opacity: 0.5 } : { scale: 0.3, opacity: 0 }
          }
          animate={isMobile ? { y: 0, opacity: 1 } : { scale: 1, opacity: 1 }}
          exit={
            isMobile ? { y: "100%", opacity: 0 } : { scale: 0.2, opacity: 0 }
          }
          transition={{ duration: 0.28, ease: [0.22, 0.9, 0.36, 1] }}
          layout
        >
          <Titlebar
            title={`${getPageTitle(activePreview.id)} — Wealon Tax & Accounting`}
            variant={isMax ? "folder" : "dark"}
            isMaximized={isMax}
            onMaximize={!isMobile ? togglePreviewMax : undefined}
            onClose={handleClose}
          />

          <div
            className={clsx(
              "flex-1 overflow-y-auto",
              isMax ? "bg-white" : "bg-white dark-scroll",
            )}
          >
            <PageRouter pageId={activePreview.id} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
