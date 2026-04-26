-- Bring the migration history up to the current Prisma CMS schema.
-- This migration is intentionally non-destructive so it can be applied after
-- earlier local `prisma db push` usage without failing on existing objects.

DO $$
BEGIN
  CREATE TYPE "MediaKind" AS ENUM ('ICON', 'IMAGE', 'THUMBNAIL', 'HERO', 'FILE');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE TYPE "PageType" AS ENUM ('CONTENT', 'SERVICE', 'CONTACT', 'BOOKING', 'DOWNLOAD', 'CUSTOM');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE TYPE "SectionType" AS ENUM ('HERO', 'RICH_TEXT', 'IMAGE', 'GALLERY', 'STATS', 'TEAM', 'TESTIMONIALS', 'TIMELINE', 'SERVICE_LIST', 'CTA', 'CUSTOM');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE TYPE "DesktopItemType" AS ENUM ('PAGE', 'FOLDER', 'DOWNLOAD', 'FORM', 'LINK');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE "Booking"
  ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE "Contact"
  ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE "User"
  ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

CREATE TABLE IF NOT EXISTS "MediaAsset" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "kind" "MediaKind" NOT NULL,
  "altText" TEXT,
  "mimeType" TEXT,
  "width" INTEGER,
  "height" INTEGER,
  "sizeBytes" INTEGER,
  "folder" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "MediaAsset_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "SitePage" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "parentId" TEXT,
  "pageType" "PageType" NOT NULL DEFAULT 'CONTENT',
  "isPublished" BOOLEAN NOT NULL DEFAULT true,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "seoTitle" TEXT,
  "seoDesc" TEXT,
  "iconId" TEXT,
  "heroImageId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "SitePage_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "PageSection" (
  "id" TEXT NOT NULL,
  "pageId" TEXT NOT NULL,
  "key" TEXT NOT NULL,
  "type" "SectionType" NOT NULL,
  "heading" TEXT,
  "subheading" TEXT,
  "body" TEXT,
  "imageId" TEXT,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "isVisible" BOOLEAN NOT NULL DEFAULT true,
  "jsonData" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PageSection_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "DesktopFolder" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "parentId" TEXT,
  "iconId" TEXT,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "isVisible" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "DesktopFolder_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "DesktopItem" (
  "id" TEXT NOT NULL,
  "folderId" TEXT,
  "name" TEXT NOT NULL,
  "itemType" "DesktopItemType" NOT NULL,
  "targetPageId" TEXT,
  "targetUrl" TEXT,
  "iconId" TEXT,
  "thumbnailId" TEXT,
  "description" TEXT,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "isVisible" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "DesktopItem_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "SiteSetting" (
  "id" TEXT NOT NULL,
  "key" TEXT NOT NULL,
  "value" JSONB NOT NULL,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "DesktopWallpaper" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "mediaAssetId" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "isDefault" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "DesktopWallpaper_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "DesktopSetting" (
  "id" TEXT NOT NULL,
  "rotationEnabled" BOOLEAN NOT NULL DEFAULT true,
  "rotationSeconds" INTEGER NOT NULL DEFAULT 30,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "DesktopSetting_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "SitePage_slug_key" ON "SitePage"("slug");
CREATE INDEX IF NOT EXISTS "SitePage_parentId_idx" ON "SitePage"("parentId");
CREATE INDEX IF NOT EXISTS "SitePage_slug_idx" ON "SitePage"("slug");

CREATE UNIQUE INDEX IF NOT EXISTS "PageSection_pageId_key_key" ON "PageSection"("pageId", "key");
CREATE INDEX IF NOT EXISTS "PageSection_pageId_sortOrder_idx" ON "PageSection"("pageId", "sortOrder");

CREATE UNIQUE INDEX IF NOT EXISTS "DesktopFolder_slug_key" ON "DesktopFolder"("slug");
CREATE INDEX IF NOT EXISTS "DesktopFolder_parentId_sortOrder_idx" ON "DesktopFolder"("parentId", "sortOrder");

CREATE INDEX IF NOT EXISTS "DesktopItem_folderId_sortOrder_idx" ON "DesktopItem"("folderId", "sortOrder");
CREATE INDEX IF NOT EXISTS "DesktopItem_targetPageId_idx" ON "DesktopItem"("targetPageId");

CREATE UNIQUE INDEX IF NOT EXISTS "SiteSetting_key_key" ON "SiteSetting"("key");

CREATE INDEX IF NOT EXISTS "DesktopWallpaper_sortOrder_idx" ON "DesktopWallpaper"("sortOrder");
CREATE INDEX IF NOT EXISTS "DesktopWallpaper_isActive_sortOrder_idx" ON "DesktopWallpaper"("isActive", "sortOrder");

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'SitePage_parentId_fkey') THEN
    ALTER TABLE "SitePage" ADD CONSTRAINT "SitePage_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "SitePage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'SitePage_iconId_fkey') THEN
    ALTER TABLE "SitePage" ADD CONSTRAINT "SitePage_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "MediaAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'SitePage_heroImageId_fkey') THEN
    ALTER TABLE "SitePage" ADD CONSTRAINT "SitePage_heroImageId_fkey" FOREIGN KEY ("heroImageId") REFERENCES "MediaAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'PageSection_pageId_fkey') THEN
    ALTER TABLE "PageSection" ADD CONSTRAINT "PageSection_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "SitePage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'PageSection_imageId_fkey') THEN
    ALTER TABLE "PageSection" ADD CONSTRAINT "PageSection_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "MediaAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'DesktopFolder_parentId_fkey') THEN
    ALTER TABLE "DesktopFolder" ADD CONSTRAINT "DesktopFolder_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "DesktopFolder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'DesktopFolder_iconId_fkey') THEN
    ALTER TABLE "DesktopFolder" ADD CONSTRAINT "DesktopFolder_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "MediaAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'DesktopItem_folderId_fkey') THEN
    ALTER TABLE "DesktopItem" ADD CONSTRAINT "DesktopItem_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "DesktopFolder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'DesktopItem_targetPageId_fkey') THEN
    ALTER TABLE "DesktopItem" ADD CONSTRAINT "DesktopItem_targetPageId_fkey" FOREIGN KEY ("targetPageId") REFERENCES "SitePage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'DesktopItem_iconId_fkey') THEN
    ALTER TABLE "DesktopItem" ADD CONSTRAINT "DesktopItem_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "MediaAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'DesktopItem_thumbnailId_fkey') THEN
    ALTER TABLE "DesktopItem" ADD CONSTRAINT "DesktopItem_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "MediaAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'DesktopWallpaper_mediaAssetId_fkey') THEN
    ALTER TABLE "DesktopWallpaper" ADD CONSTRAINT "DesktopWallpaper_mediaAssetId_fkey" FOREIGN KEY ("mediaAssetId") REFERENCES "MediaAsset"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;
