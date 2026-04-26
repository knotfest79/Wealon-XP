import { PageType, SectionType } from "@prisma/client";
import { db } from "@/lib/db";
import {
  serviceSeeds,
  servicesIndexSeed,
} from "@/modules/content/data/serviceDefaults";

function parseJsonData<T>(value: unknown, fallback: T): T {
  if (!value || typeof value !== "object") return fallback;
  return value as T;
}

async function ensurePageSection(params: {
  pageId: string;
  key: string;
  type: SectionType;
  heading?: string;
  subheading?: string;
  body?: string;
  sortOrder: number;
  jsonData?: object;
}) {
  const existing = await db.pageSection.findUnique({
    where: {
      pageId_key: {
        pageId: params.pageId,
        key: params.key,
      },
    },
  });

  if (existing) return existing;

  return db.pageSection.create({
    data: {
      pageId: params.pageId,
      key: params.key,
      type: params.type,
      heading: params.heading,
      subheading: params.subheading,
      body: params.body,
      sortOrder: params.sortOrder,
      jsonData: params.jsonData,
    },
  });
}

async function getPageSection(pageId: string, key: string) {
  return db.pageSection.findUnique({
    where: {
      pageId_key: {
        pageId,
        key,
      },
    },
  });
}

async function isServicesSeedComplete() {
  const servicesIndex = await db.sitePage.findUnique({
    where: { slug: servicesIndexSeed.slug },
    include: {
      sections: {
        select: { key: true },
      },
      children: {
        select: {
          slug: true,
          sections: {
            select: { key: true },
          },
        },
      },
    },
  });

  if (!servicesIndex) return false;

  const childSlugs = new Set(servicesIndex.children.map((child) => child.slug));
  const requiredSlugs = new Set(serviceSeeds.map((service) => service.slug));

  if (servicesIndex.sections.every((section) => section.key !== "hero")) return false;
  if (servicesIndex.children.length < serviceSeeds.length) return false;

  for (const slug of requiredSlugs) {
    if (!childSlugs.has(slug)) return false;
  }

  for (const child of servicesIndex.children) {
    const keys = new Set(child.sections.map((section) => section.key));
    if (!keys.has("hero") || !keys.has("service-items") || !keys.has("service-card")) {
      return false;
    }
  }

  return true;
}

export async function ensureServicesSeeded() {
  if (await isServicesSeedComplete()) {
    return;
  }

  let servicesIndex = await db.sitePage.findUnique({
    where: { slug: servicesIndexSeed.slug },
  });

  if (!servicesIndex) {
    servicesIndex = await db.sitePage.create({
      data: {
        title: servicesIndexSeed.title,
        slug: servicesIndexSeed.slug,
        pageType: PageType.CONTENT,
        isPublished: true,
        sortOrder: 0,
        seoTitle: "Accounting Services | Wealon Tax & Accounting",
        seoDesc:
          "Explore tax, bookkeeping, BAS, SMSF, audit, business advisory, structuring, and cloud accounting services from Wealon.",
      },
    });
  }

  await ensurePageSection({
    pageId: servicesIndex.id,
    key: "hero",
    type: SectionType.HERO,
    heading: servicesIndexSeed.heroHeading,
    body: servicesIndexSeed.heroBody,
    sortOrder: 1,
    jsonData: { eyebrow: servicesIndexSeed.eyebrow },
  });

  for (const seed of serviceSeeds) {
    let page = await db.sitePage.findUnique({
      where: { slug: seed.slug },
    });

    if (!page) {
      page = await db.sitePage.create({
        data: {
          title: seed.title,
          slug: seed.slug,
          parentId: servicesIndex.id,
          pageType: PageType.SERVICE,
          isPublished: true,
          sortOrder: seed.sortOrder,
          seoTitle: `${seed.title} | Wealon Tax & Accounting`,
        },
      });
    }

    await ensurePageSection({
      pageId: page.id,
      key: "hero",
      type: SectionType.HERO,
      heading: seed.title,
      subheading: seed.subtitle,
      sortOrder: 1,
      jsonData: { icon: seed.icon },
    });

    await ensurePageSection({
      pageId: page.id,
      key: "service-items",
      type: SectionType.SERVICE_LIST,
      sortOrder: 2,
      jsonData: { items: seed.items },
    });

    await ensurePageSection({
      pageId: page.id,
      key: "service-card",
      type: SectionType.CUSTOM,
      body: seed.cardDescription,
      sortOrder: 3,
    });
  }
}

export async function getServicesIndexContent() {
  await ensureServicesSeeded();

  const page = await db.sitePage.findUnique({
    where: { slug: "services" },
    include: {
      sections: {
        orderBy: [{ sortOrder: "asc" }],
      },
      children: {
        where: {
          isPublished: true,
        },
        orderBy: [{ sortOrder: "asc" }],
        include: {
          sections: {
            orderBy: [{ sortOrder: "asc" }],
          },
        },
      },
    },
  });

  if (!page) {
    throw new Error("Services index page not found");
  }

  const hero = page.sections.find((section) => section.key === "hero");
  const heroData = parseJsonData<{ eyebrow?: string }>(hero?.jsonData, {});

  return {
    hero: {
      eyebrow: heroData.eyebrow ?? "Services",
      heading: hero?.heading ?? servicesIndexSeed.heroHeading,
      body: hero?.body ?? servicesIndexSeed.heroBody,
    },
    cards: page.children.map((child) => {
      const cardSection = child.sections.find((section) => section.key === "service-card");
      return {
        id: child.slug,
        name: child.title,
        desc: cardSection?.body ?? "",
        icon: "folder" as const,
      };
    }),
  };
}

export async function getServicePageContent(pageId: string) {
  await ensureServicesSeeded();

  const page = await db.sitePage.findFirst({
    where: {
      slug: pageId,
      isPublished: true,
    },
    include: {
      sections: {
        orderBy: [{ sortOrder: "asc" }],
      },
    },
  });

  if (!page) return null;

  const hero = page.sections.find((section) => section.key === "hero");
  const itemsSection = page.sections.find(
    (section) => section.key === "service-items",
  );
  const heroData = parseJsonData<{ icon?: string }>(hero?.jsonData, {});
  const itemsData = parseJsonData<{ items?: string[] }>(itemsSection?.jsonData, {});

  return {
    pageId,
    title: hero?.heading ?? page.title,
    subtitle: hero?.subheading ?? "",
    icon: heroData.icon ?? "",
    items: itemsData.items ?? [],
  };
}

export type AdminServiceEditorRecord = {
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  cardDescription: string;
  items: string[];
  isPublished: boolean;
};

export type AdminServicesEditorData = {
  index: {
    eyebrow: string;
    heading: string;
    body: string;
  };
  services: AdminServiceEditorRecord[];
};

export async function getAdminServicesEditorData(): Promise<AdminServicesEditorData> {
  const content = await getServicesIndexContent();
  const pages = await db.sitePage.findMany({
    where: {
      parent: {
        slug: "services",
      },
    },
    orderBy: [{ sortOrder: "asc" }],
    include: {
      sections: {
        orderBy: [{ sortOrder: "asc" }],
      },
    },
  });

  const services = pages.map((page) => {
    const hero = page.sections.find((section) => section.key === "hero");
    const heroData = parseJsonData<{ icon?: string }>(hero?.jsonData, {});
    const itemsSection = page.sections.find(
      (section) => section.key === "service-items",
    );
    const itemsData = parseJsonData<{ items?: string[] }>(
      itemsSection?.jsonData,
      {},
    );
    const cardSection = page.sections.find((section) => section.key === "service-card");

    return {
      slug: page.slug,
      title: hero?.heading ?? page.title,
      subtitle: hero?.subheading ?? "",
      icon: heroData.icon ?? "",
      cardDescription: cardSection?.body ?? "",
      items: itemsData.items ?? [],
      isPublished: page.isPublished,
    };
  });

  return {
    index: content.hero,
    services,
  };
}

export async function updateServicesIndexContent(input: {
  eyebrow: string;
  heading: string;
  body: string;
}) {
  await ensureServicesSeeded();

  const page = await db.sitePage.findUnique({
    where: { slug: "services" },
  });

  if (!page) {
    throw new Error("Services index page not found");
  }

  const hero = await getPageSection(page.id, "hero");

  if (!hero) {
    throw new Error("Services hero section not found");
  }

  await db.pageSection.update({
    where: { id: hero.id },
    data: {
      heading: input.heading.trim(),
      body: input.body.trim(),
      jsonData: { eyebrow: input.eyebrow.trim() },
    },
  });
}

export type ServiceUpdateInput = {
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  cardDescription: string;
  items: string[];
  isPublished: boolean;
};

export async function updateServicesContent(inputs: ServiceUpdateInput[]) {
  await ensureServicesSeeded();

  const slugs = inputs.map((input) => input.slug);
  const pages = await db.sitePage.findMany({
    where: {
      slug: {
        in: slugs,
      },
    },
    include: {
      sections: true,
    },
  });

  const pageMap = new Map(pages.map((page) => [page.slug, page]));
  const operations = [];

  for (const input of inputs) {
    const page = pageMap.get(input.slug);
    if (!page) {
      throw new Error(`Service page not found for slug "${input.slug}"`);
    }

    const hero = page.sections.find((section) => section.key === "hero");
    const itemsSection = page.sections.find(
      (section) => section.key === "service-items",
    );
    const cardSection = page.sections.find(
      (section) => section.key === "service-card",
    );

    if (!hero || !itemsSection || !cardSection) {
      throw new Error(`Service page sections are incomplete for "${input.slug}"`);
    }

    operations.push(
      db.sitePage.update({
        where: { id: page.id },
        data: {
          title: input.title.trim(),
          isPublished: input.isPublished,
          seoTitle: `${input.title.trim()} | Wealon Tax & Accounting`,
        },
      }),
      db.pageSection.update({
        where: { id: hero.id },
        data: {
          heading: input.title.trim(),
          subheading: input.subtitle.trim(),
          jsonData: { icon: input.icon.trim() },
        },
      }),
      db.pageSection.update({
        where: { id: itemsSection.id },
        data: {
          jsonData: {
            items: input.items.map((item) => item.trim()).filter(Boolean),
          },
        },
      }),
      db.pageSection.update({
        where: { id: cardSection.id },
        data: {
          body: input.cardDescription.trim(),
        },
      }),
    );
  }

  await db.$transaction(operations);
}
