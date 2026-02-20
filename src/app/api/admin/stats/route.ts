export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/adminAuth";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import Project from "@/models/Project";

export async function GET() {
  try {
    await verifyAdmin();
    await connectDB();

    const [messages, unread, projects] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ isRead: false }),
      Project.countDocuments(),
    ]);

    return NextResponse.json({
      messages,
      unread,
      projects,
    });
  } catch {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}
