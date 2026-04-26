import { db } from "@/lib/db";
import { ensureServicesSeeded } from "@/modules/content/server/servicesCms";
import { PageType, SectionType } from "@prisma/client";
import type { PageCrudInitialData } from "@/modules/admin/components/PageCrudEditor";

export async function getAdminOverviewData() {
  await ensureServicesSeeded();

  const [
    pageCount,
    publishedPageCount,
    sectionCount,
    mediaCount,
    desktopFolderCount,
    desktopItemCount,
    settingsCount,
    bookingCount,
    contactCount,
    recentPages,
    recentDesktopItems,
    recentMedia,
  ] = await Promise.all([
    db.sitePage.count(),
    db.sitePage.count({ where: { isPublished: true } }),
    db.pageSection.count(),
    db.mediaAsset.count(),
    db.desktopFolder.count(),
    db.desktopItem.count(),
    db.siteSetting.count(),
    db.booking.count(),
    db.contact.count(),
    db.sitePage.findMany({
      orderBy: [{ updatedAt: "desc" }],
      take: 5,
      include: {
        _count: {
          select: {
            children: true,
            sections: true,
          },
        },
      },
    }),
    db.desktopItem.findMany({
      orderBy: [{ updatedAt: "desc" }],
      take: 5,
      include: {
        folder: true,
        targetPage: true,
      },
    }),
    db.mediaAsset.findMany({
      orderBy: [{ updatedAt: "desc" }],
      take: 5,
    }),
  ]);

  return {
    pageCount,
    publishedPageCount,
    sectionCount,
    mediaCount,
    desktopFolderCount,
    desktopItemCount,
    settingsCount,
    bookingCount,
    contactCount,
    recentPages,
    recentDesktopItems,
    recentMedia,
  };
}

export async function getAdminPagesData() {
  await ensureServicesSeeded();

  const pages = await db.sitePage.findMany({
    orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
    include: {
      parent: true,
      _count: {
        select: {
          children: true,
          sections: true,
          desktopItems: true,
        },
      },
    },
  });

  return { pages };
}

export async function getAdminPageEditorData(
  pageId?: string,
): Promise<PageCrudInitialData> {
  await ensureServicesSeeded();

  const [parents, page] = await Promise.all([
    db.sitePage.findMany({
      orderBy: [{ title: "asc" }],
      select: {
        id: true,
        title: true,
        slug: true,
      },
    }),
    pageId
      ? db.sitePage.findUnique({
          where: { id: pageId },
          include: {
            sections: {
              orderBy: [{ sortOrder: "asc" }],
            },
          },
        })
      : Promise.resolve(null),
  ]);

  return {
    page,
    parents: pageId ? parents.filter((parent) => parent.id !== pageId) : parents,
    pageTypes: Object.values(PageType),
    sectionTypes: Object.values(SectionType),
  };
}

export async function getAdminDesktopData() {
  const [folders, items] = await Promise.all([
    db.desktopFolder.findMany({
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      include: {
        parent: true,
        _count: {
          select: {
            children: true,
            items: true,
          },
        },
      },
    }),
    db.desktopItem.findMany({
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      include: {
        folder: true,
        targetPage: true,
      },
    }),
  ]);

  return { folders, items };
}

export async function getAdminMediaData() {
  const [media, counts] = await Promise.all([
    db.mediaAsset.findMany({
      orderBy: [{ updatedAt: "desc" }],
      take: 50,
    }),
    db.mediaAsset.groupBy({
      by: ["kind"],
      _count: {
        _all: true,
      },
    }),
  ]);

  return { media, counts };
}

export async function getAdminSettingsData() {
  const settings = await db.siteSetting.findMany({
    orderBy: [{ key: "asc" }],
  });

  return { settings };
}

export async function getAdminSubmissionsData() {
  const [bookings, contacts] = await Promise.all([
    db.booking.findMany({
      orderBy: [{ createdAt: "desc" }],
      take: 20,
    }),
    db.contact.findMany({
      orderBy: [{ createdAt: "desc" }],
      take: 20,
    }),
  ]);

  return { bookings, contacts };
}
