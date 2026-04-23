"use client";
import { WealonLogo } from "@/modules/ui/Icons";

interface PageHeroProps {
  title: string;
  subtitle: string;
  showLogo?: boolean;
  variant?: "window" | "web";
}

export function PageHero({
  title,
  subtitle,
  showLogo = false,
  variant = "window",
}: PageHeroProps) {
  if (variant === "web") {
    const cleanTitle = title.replace(/^[^\p{L}\p{N}]+/u, "").trim();

    return (
      <header className="border-b border-slate-200 bg-white px-6 py-12 max-md:px-5 max-md:py-9">
        <div className="mx-auto flex max-w-5xl items-center gap-6 max-sm:flex-col max-sm:items-start">
          {showLogo && <WealonLogo size={132} className="w-32 shrink-0" />}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#7f2e77]">
              {subtitle}
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-950 max-md:text-3xl">
              {cleanTitle || title}
            </h1>
          </div>
        </div>
      </header>
    );
  }

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
