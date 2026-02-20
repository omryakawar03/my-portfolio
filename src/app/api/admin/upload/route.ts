export const runtime = "nodejs";

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const slug = formData.get("slug") as string;
    const files = formData.getAll("files") as File[];

    if (!slug || files.length === 0) {
      return NextResponse.json(
        { error: "Missing slug or files" },
        { status: 400 }
      );
    }

    const uploadDir = path.join(
      process.cwd(),
      "public/uploads/projects",
      slug
    );

    fs.mkdirSync(uploadDir, { recursive: true });

    const savedPaths: string[] = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filePath = path.join(uploadDir, file.name);

      fs.writeFileSync(filePath, buffer);

      savedPaths.push(`/uploads/projects/${slug}/${file.name}`);
    }

    return NextResponse.json({ files: savedPaths });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
