"use client";
import { WealonLogo } from "@/modules/ui/Icons";

interface PageHeroProps {
  title: string;
  subtitle: string;
  showLogo?: boolean;
}

export function PageHero({ title, subtitle, showLogo = false }: PageHeroProps) {
  return (
    <div className="relative isolate bg-gradient-to-br from-[#5f1f5c] via-[#7f2e77] to-[#a43d98] px-7 max-md:px-4 py-7 max-md:py-5 flex items-center gap-4 max-md:gap-3 flex-wrap border-b-[3px] border-[#d7a3cf]">
      {showLogo && <WealonLogo size={110} className="max-md:w-24" />}
      <div className="relative z-10">
        <h1
          className="text-xl max-md:text-lg text-white font-bold tracking-wide"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {title}
        </h1>
        <div className="text-[11px] max-md:text-[10px] text-[#f0d6eb] uppercase tracking-[2.5px]">
          {subtitle}
        </div>
      </div>
    </div>
  );
}
