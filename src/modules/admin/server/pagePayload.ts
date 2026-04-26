import { PageType, SectionType } from "@prisma/client";

export type SectionPayload = {
  id?: string;
  key: string;
  type: SectionType;
  heading?: string;
  subheading?: string;
  body?: string;
  sortOrder: number;
  isVisible: boolean;
  jsonDataText?: string;
};

export type PagePayload = {
  title: string;
  slug: string;
  parentId?: string | null;
  pageType: PageType;
  isPublished: boolean;
  sortOrder: number;
  seoTitle?: string;
  seoDesc?: string;
  sections: SectionPayload[];
};

function parseJson(jsonDataText?: string) {
  if (!jsonDataText?.trim()) return undefined;
  return JSON.parse(jsonDataText);
}

export function normalizePageSections(sections: SectionPayload[]) {
  return sections.map((section, index) => ({
    key: section.key.trim(),
    type: section.type,
    heading: section.heading?.trim() || null,
    subheading: section.subheading?.trim() || null,
    body: section.body?.trim() || null,
    sortOrder: section.sortOrder ?? index,
    isVisible: section.isVisible,
    jsonData: parseJson(section.jsonDataText),
  }));
}

export function validatePagePayload(payload: PagePayload) {
  if (!payload.title?.trim()) {
    throw new Error("Page title is required");
  }

  if (!payload.slug?.trim()) {
    throw new Error("Page slug is required");
  }

  if (!Array.isArray(payload.sections)) {
    throw new Error("Page sections must be an array");
  }

  const keys = payload.sections.map((section) => section.key.trim()).filter(Boolean);
  if (new Set(keys).size !== keys.length) {
    throw new Error("Section keys must be unique");
  }

  for (const section of payload.sections) {
    if (!section.key?.trim()) {
      throw new Error("Each section requires a key");
    }
  }
}
