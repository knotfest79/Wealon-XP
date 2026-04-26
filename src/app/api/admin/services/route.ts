import { NextResponse } from "next/server";
import {
  getAdminServicesEditorData,
  updateServicesContent,
  updateServicesIndexContent,
} from "@/modules/content/server/servicesCms";

type ServicePayload = {
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  cardDescription: string;
  items: string[];
  isPublished: boolean;
};

type RequestPayload = {
  index: {
    eyebrow: string;
    heading: string;
    body: string;
  };
  services: ServicePayload[];
};

export async function GET() {
  const data = await getAdminServicesEditorData();
  return NextResponse.json(data);
}

export async function PUT(req: Request) {
  try {
    const body = (await req.json()) as RequestPayload;

    if (!body?.index || !Array.isArray(body.services)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    if (!body.index.heading?.trim() || !body.index.body?.trim()) {
      return NextResponse.json(
        { error: "Services index heading and body are required" },
        { status: 400 },
      );
    }

    for (const service of body.services) {
      if (!service.slug || !service.title?.trim()) {
        return NextResponse.json(
          { error: "Each service requires a slug and title" },
          { status: 400 },
        );
      }
    }

    await Promise.all([
      updateServicesIndexContent(body.index),
      updateServicesContent(
        body.services.map((service) => ({
          slug: service.slug,
          title: service.title,
          subtitle: service.subtitle,
          icon: service.icon,
          cardDescription: service.cardDescription,
          items: service.items,
          isPublished: service.isPublished,
        })),
      ),
    ]);

    const data = await getAdminServicesEditorData();
    return NextResponse.json({ ok: true, data });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to update services",
      },
      { status: 500 },
    );
  }
}
