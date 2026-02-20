export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { requireRole } from "@/lib/auth";
import mongoose from "mongoose";

// ✅ MARK AS READ
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // 🔥 FIX

    requireRole(req, ["admin"]);
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const updated = await Contact.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PATCH ERROR:", err);
    return NextResponse.json({ error: "Patch failed" }, { status: 500 });
  }
}

// 🔥 DELETE MESSAGE (FINAL FIX)
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // 🔥 THIS WAS THE BUG

    console.log("DELETE ROUTE HIT");
    console.log("PARAM ID:", id);

    requireRole(req, ["admin"]);
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid message ID" },
        { status: 400 }
      );
    }

    const deleted = await Contact.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(id),
    });

    console.log("DELETED DOC:", deleted);

    if (!deleted) {
      return NextResponse.json(
        { error: "Message not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}
