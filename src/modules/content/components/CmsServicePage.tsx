"use client";

import { useEffect, useState } from "react";
import { PageHero } from "./PageHero";
import { usePageVariant } from "./PageRenderContext";

type ServicePageContent = {
  pageId: string;
  title: string;
  subtitle: string;
  icon: string;
  items: string[];
};

function Section({ children }: { children: React.ReactNode }) {
  const variant = usePageVariant();

  if (variant === "web") {
    return (
      <section className="mx-auto max-w-5xl border-b border-slate-200 px-6 py-8 last:border-b-0 max-md:px-5 max-md:py-6">
        {children}
      </section>
    );
  }

  return (
    <div className="border-b border-[#e8e4d8] px-6 py-4 last:border-b-0 max-md:px-4 max-md:py-3">
      {children}
    </div>
  );
}

function ServicePageView({ content }: { content: ServicePageContent }) {
  const variant = usePageVariant();

  return (
    <>
      <PageHero
        variant={variant}
        title={`${content.icon} ${content.title}`.trim()}
        subtitle={content.subtitle}
      />
      <Section>
        <ul
          className={
            variant === "web"
              ? "ml-5 max-w-3xl list-disc space-y-3 text-base leading-7 text-slate-700"
              : "ml-4 list-disc text-[11px] leading-loose text-[#333] max-md:text-xs"
          }
        >
          {content.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>
    </>
  );
}

export function CmsServicePage({ pageId }: { pageId: string }) {
  const variant = usePageVariant();
  const [content, setContent] = useState<ServicePageContent | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setError(false);
        const response = await fetch(`/api/cms/services/${pageId}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load service page");
        }

        const payload = (await response.json()) as ServicePageContent;
        if (!cancelled) {
          setContent(payload);
        }
      } catch {
        if (!cancelled) {
          setError(true);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [pageId]);

  if (error) {
    return (
      <div className={variant === "web" ? "mx-auto max-w-5xl px-6 py-10" : "p-6"}>
        <h2 className="mb-2 text-lg font-bold text-slate-950">Service unavailable</h2>
        <p className={variant === "web" ? "text-base text-slate-700" : "text-[11px] text-[#333]"}>
          The CMS record for this service could not be loaded.
        </p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className={variant === "web" ? "mx-auto max-w-5xl px-6 py-10" : "p-6"}>
        <p className={variant === "web" ? "text-base text-slate-700" : "text-[11px] text-[#333]"}>
          Loading service content...
        </p>
      </div>
    );
  }

  return <ServicePageView content={content} />;
}
