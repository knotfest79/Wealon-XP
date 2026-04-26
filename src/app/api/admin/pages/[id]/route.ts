import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  normalizePageSections,
  type PagePayload,
  validatePagePayload,
} from "@/modules/admin/server/pagePayload";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = (await req.json()) as PagePayload;
    validatePagePayload(body);

    await db.$transaction([
      db.sitePage.update({
        where: { id },
        data: {
          title: body.title.trim(),
          slug: body.slug.trim(),
          parentId: body.parentId || null,
          pageType: body.pageType,
          isPublished: body.isPublished,
          sortOrder: body.sortOrder,
          seoTitle: body.seoTitle?.trim() || null,
          seoDesc: body.seoDesc?.trim() || null,
        },
      }),
      db.pageSection.deleteMany({
        where: { pageId: id },
      }),
      db.pageSection.createMany({
        data: normalizePageSections(body.sections).map((section) => ({
          ...section,
          pageId: id,
        })),
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update page" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    await db.sitePage.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete page" },
      { status: 500 },
    );
  }
}
