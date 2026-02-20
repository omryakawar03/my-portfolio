"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed");
      }

      toast.success("Message sent successfully");
      form.reset();
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
     <Toaster
  position="top-center"
  toastOptions={{
    duration: 3000,
    style: {
      background: "#111",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.1)",
    },
    success: {
      iconTheme: {
        primary: "#22c55e",
        secondary: "#fff",
      },
    },
    error: {
      iconTheme: {
        primary: "#ef4444",
        secondary: "#fff",
      },
    },
  }}
/>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border border-white/10 p-8 rounded-xl"
      >
        <h1 className="text-2xl font-bold mb-6">Contact</h1>

        <input
          name="name"
          placeholder="Your name"
          required
          className="mb-4 w-full px-4 py-2 bg-black border border-white/10 rounded"
        />

        <input
          name="email"
          type="email"
          placeholder="Your email"
          required
          className="mb-4 w-full px-4 py-2 bg-black border border-white/10 rounded"
        />

        <textarea
          name="message"
          placeholder="Your message"
          required
          className="mb-6 w-full px-4 py-2 bg-black border border-white/10 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-white text-black rounded font-medium disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </main>
  );
}
