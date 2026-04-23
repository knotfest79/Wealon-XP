"use client";
import { createContext, useContext } from "react";

export type PageRenderVariant = "window" | "web";

const PageRenderContext = createContext<PageRenderVariant>("window");

export function PageRenderProvider({
  children,
  variant = "window",
}: {
  children: React.ReactNode;
  variant?: PageRenderVariant;
}) {
  return (
    <PageRenderContext.Provider value={variant}>
      {children}
    </PageRenderContext.Provider>
  );
}

export function usePageVariant() {
  return useContext(PageRenderContext);
}
