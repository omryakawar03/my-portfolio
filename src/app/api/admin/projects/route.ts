export const runtime = "nodejs";

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";

function verify(req: Request) {
  const auth = req.headers.get("authorization");
  if (!auth || !auth.startsWith("Bearer ")) {
    throw new Error("NO_AUTH");
  }
  jwt.verify(
    auth.replace("Bearer ", ""),
    process.env.ADMIN_JWT_SECRET as string
  );
}

export async function GET(req: Request) {
  try {
    verify(req);
    await connectDB();

    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ projects });
  } catch (err) {
    console.error("ADMIN PROJECT GET ERROR:", err);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    verify(req);
    await connectDB();

    const body = await req.json();
    const project = await Project.create(body);

    return NextResponse.json({ project });
  } catch (err) {
    console.error("ADMIN PROJECT POST ERROR:", err);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(req: Request) {
  try {
    verify(req);
    await connectDB();

    const { id } = await req.json();
    await Project.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("ADMIN PROJECT DELETE ERROR:", err);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
