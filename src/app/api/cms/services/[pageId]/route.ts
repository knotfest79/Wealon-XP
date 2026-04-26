import { NextResponse } from "next/server";
import { getServicePageContent } from "@/modules/content/server/servicesCms";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ pageId: string }> },
) {
  const { pageId } = await params;
  const content = await getServicePageContent(pageId);

  if (!content) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(content);
}
