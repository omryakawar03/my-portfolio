export const runtime = "nodejs";

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";

function verify(req: Request) {
  const auth = req.headers.get("authorization");

  if (!auth || !auth.startsWith("Bearer ")) {
    throw new Error("No token provided");
  }

  const token = auth.replace("Bearer ", "");

  jwt.verify(token, process.env.ADMIN_JWT_SECRET!);
}

// ✅ GET
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    verify(req);
    await connectDB();

    const { id } = await params; // 🔥 FIX HERE

    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ project });
  } catch (error: any) {
    console.error("GET error:", error.message);

    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 401 }
    );
  }
}

// ✅ PUT
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    verify(req);
    await connectDB();

    const { id } = await params; // 🔥 FIX HERE
    const body = await req.json();

    const project = await Project.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ project });
  } catch (error: any) {
    console.error("PUT error:", error.message);

    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 401 }
    );
  }
}