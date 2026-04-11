"use client";
import Image from "next/image";
import { useWindowStore } from "@/modules/windows/store/useWindowStore";

export function DesktopLogo() {
  const openClientPortal = useWindowStore((s) => s.openClientPortal);

  return (
    <button
      type="button"
      onClick={openClientPortal}
      aria-label="Open client portal login"
      className="group absolute bottom-14 right-0 max-md:bottom-[52px] max-md:right-0 z-[15] flex flex-col items-end gap-0 opacity-95 max-md:opacity-85 text-right cursor-pointer bg-transparent border-0 p-0"
      style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,.4))" }}
    >
      <span className="pointer-events-none absolute -top-8 right-8 rounded bg-[#1a2744] px-2.5 py-1 text-[11px] font-bold text-white opacity-0 shadow-[0_3px_10px_rgba(0,0,0,.35)] transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
        Open to log in to client portal
      </span>
      <Image
        src="/logo/Wealon-logo1.png"
        alt="Wealon Tax & Accounting Logo"
        width={300}
        height={300}
        className="w-80 h-auto max-md:w-56 drop-shadow-md transition-transform duration-300 group-hover:animate-bounce group-focus-visible:animate-bounce"
      />
      <span
        className="pr-10 max-md:pr-3 text-white text-lg max-md:text-[25px] font-bold tracking-wider"
        style={{
          fontFamily: "Georgia, serif",
          textShadow: "0 1px 4px rgba(0,0,0,.7), 0 0 21px rgba(0,0,0,.4)",
        }}
      >
        Wealon Tax & Accounting
      </span>
      <span
        className="text-white/95 text-[10px] max-md:text-[8px] uppercase tracking-[2px] max-md:tracking-[1.5px]"
        style={{
          textShadow: "0 1px 3px rgba(0,0,0,.7), 0 0 12px rgba(0,0,0,.3)",
        }}
      >
        Your trusted partner for tailored financial solutions.
      </span>
    </button>
  );
}
