import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const allowedTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

const maxUploadBytes = 10 * 1024 * 1024;

function getExtension(file: File) {
  const originalExtension = path.extname(file.name).toLowerCase();
  if (originalExtension) return originalExtension;

  if (file.type === "image/jpeg") return ".jpg";
  if (file.type === "image/png") return ".png";
  if (file.type === "image/webp") return ".webp";
  if (file.type === "image/gif") return ".gif";
  if (file.type === "image/svg+xml") return ".svg";
  return "";
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Image file is required" }, { status: 400 });
    }

    if (!allowedTypes.has(file.type)) {
      return NextResponse.json({ error: "Unsupported image type" }, { status: 400 });
    }

    if (file.size > maxUploadBytes) {
      return NextResponse.json({ error: "Image must be 10MB or smaller" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads", "media");
    await mkdir(uploadDir, { recursive: true });

    const extension = getExtension(file);
    const filename = `${Date.now()}-${randomUUID()}${extension}`;
    const filepath = path.join(uploadDir, filename);
    const buffer = Buffer.from(await file.arrayBuffer());

    await writeFile(filepath, buffer);

    return NextResponse.json({
      ok: true,
      file: {
        url: `/uploads/media/${filename}`,
        name: path.basename(file.name, path.extname(file.name)),
        mimeType: file.type,
        sizeBytes: file.size,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to upload image" },
      { status: 500 },
    );
  }
}
