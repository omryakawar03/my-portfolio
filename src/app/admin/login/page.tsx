"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Metadata } from "next";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.get("email"),
        password: data.get("password"),
      }),
    });

    const json = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError("Invalid credentials");
      return;
    }

    // 🔐 TOKEN IN LOCALSTORAGE (STABLE)
    localStorage.setItem("admin_token", json.token);
    router.replace("/admin/messages");
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-white/10 rounded-xl p-8"
      >
        <h1 className="text-2xl font-bold mb-6">Admin Login</h1>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <input
          name="email"
          type="email"
          required
          placeholder="Admin email"
          className="w-full mb-4 px-4 py-2 bg-black border border-white/10 rounded"
        />

        <input
          name="password"
          type="password"
          required
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 bg-black border border-white/10 rounded"
        />

        <button
          disabled={loading}
          className="w-full py-3 bg-white text-black rounded disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </main>
  );
}
