import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  normalizePageSections,
  type PagePayload,
  validatePagePayload,
} from "@/modules/admin/server/pagePayload";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as PagePayload;
    validatePagePayload(body);

    const page = await db.sitePage.create({
      data: {
        title: body.title.trim(),
        slug: body.slug.trim(),
        parentId: body.parentId || null,
        pageType: body.pageType,
        isPublished: body.isPublished,
        sortOrder: body.sortOrder,
        seoTitle: body.seoTitle?.trim() || null,
        seoDesc: body.seoDesc?.trim() || null,
        sections: {
          create: normalizePageSections(body.sections),
        },
      },
      select: { id: true },
    });

    return NextResponse.json({ ok: true, id: page.id });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create page" },
      { status: 500 },
    );
  }
}
