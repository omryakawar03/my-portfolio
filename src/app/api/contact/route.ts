import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { Resend } from "resend";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    // 🔑 CREATE FINGERPRINT (IDEMPOTENCY)
    const fingerprint = crypto
      .createHash("sha256")
      .update(`${email}-${message}`)
      .digest("hex");

    // ✅ SAVE TO DB (SAFE)
    try {
      await Contact.create({
        name,
        email,
        message,
        fingerprint,
      });
    } catch (err: any) {
      // Duplicate submit → ignore safely
      if (err.code !== 11000) {
        throw err;
      }
    }

    // 🚀 RESPOND FAST (EMAIL IS NON-BLOCKING)
    const response = NextResponse.json({ success: true });

    // 🔔 EMAIL (BEST EFFORT)
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);

      resend.emails.send({
        from: "Portfolio_site@resend.dev",
        to: process.env.ADMIN_EMAIL!,
        subject: "New Contact Message",
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p>${message}</p>
        `,
      });
    } catch (err) {
      console.error("EMAIL FAILED (IGNORED):", err);
    }

    return response;
  } catch (error) {
    console.error("CONTACT API ERROR:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
