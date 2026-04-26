import { NextResponse } from "next/server";
import { getServicesIndexContent } from "@/modules/content/server/servicesCms";

export async function GET() {
  const content = await getServicesIndexContent();
  return NextResponse.json({ tiles: content.cards });
}
