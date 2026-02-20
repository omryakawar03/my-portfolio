"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
  const router = useRouter();

  const [type, setType] = useState<"app" | "devops" | "">("");
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    const title = data.get("title") as string;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // 🔹 BASE PAYLOAD
    const payload: any = {
      title,
      slug,
      type,
      description: data.get("description"),
      techStack: (data.get("techStack") as string)
        ?.split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      githubUrl: data.get("githubUrl"),
      liveUrl: data.get("liveUrl"),
      content: data.get("content"),
    };

    // 🔥 APPLICATION PROJECT FILE UPLOAD
    if (type === "app" && images.length > 0) {
      const uploadForm = new FormData();
      uploadForm.append("slug", slug);

      images.forEach((img) => uploadForm.append("files", img));
      if (video) uploadForm.append("files", video);

      const uploadRes = await fetch("/api/admin/upload", {
        method: "POST",
        body: uploadForm,
      });

      if (!uploadRes.ok) {
        alert("Image upload failed");
        setLoading(false);
        return;
      }

      const uploadData = await uploadRes.json();

      // 🔥 FIX: screenshots ARRAY PROPERLY SET
      payload.screenshots = uploadData.files.filter(
        (f: string) =>
          f.endsWith(".png") ||
          f.endsWith(".jpg") ||
          f.endsWith(".jpeg") ||
          f.endsWith(".webp")
      );

      payload.demoVideo =
        uploadData.files.find((f: string) => f.endsWith(".mp4")) || "";
    }

    // 🔹 SAVE PROJECT
    const res = await fetch("/api/admin/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Failed to save project");
      return;
    }

    router.push("/admin/projects");
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Add Project</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* TITLE */}
        <input
          name="title"
          required
          placeholder="Project title"
          className="w-full px-4 py-2 bg-black border border-white/10 rounded"
        />

        {/* TYPE */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value as any)}
          required
          className="w-full px-4 py-2 bg-black border border-white/10 rounded"
        >
          <option value="">Select project type</option>
          <option value="app">Application Project</option>
          <option value="devops">DevOps Project</option>
        </select>

        {/* COMMON */}
        <textarea
          name="description"
          placeholder="Short description"
          className="w-full px-4 py-2 bg-black border border-white/10 rounded"
        />

        <input
          name="techStack"
          placeholder="Tech stack (comma separated)"
          className="w-full px-4 py-2 bg-black border border-white/10 rounded"
        />

        <input
          name="githubUrl"
          placeholder="GitHub URL"
          className="w-full px-4 py-2 bg-black border border-white/10 rounded"
        />

        {/* 🔥 APPLICATION PROJECT FIELDS */}
        {type === "app" && (
          <>
            <textarea
              name="content"
              placeholder="Application details / features"
              className="w-full px-4 py-2 bg-black border border-white/10 rounded"
            />

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) =>
                setImages(Array.from(e.target.files || []))
              }
              className="w-full"
            />

            <input
              type="file"
              accept="video/*"
              onChange={(e) =>
                setVideo(e.target.files?.[0] || null)
              }
              className="w-full"
            />

            <input
              name="liveUrl"
              placeholder="Live demo URL"
              className="w-full px-4 py-2 bg-black border border-white/10 rounded"
            />
          </>
        )}

        {/* 🔥 DEVOPS PROJECT FIELDS */}
        {type === "devops" && (
          <textarea
            name="readme"
            rows={14}
            placeholder={`# Project Title

## Problem Statement

## Solution Overview

## Architecture
![Architecture](https://raw.githubusercontent.com/username/repo/main/docs/arch.png)

## CI/CD Pipeline

## Security

## Outcome`}
            className="w-full px-4 py-2 font-mono text-sm bg-black border border-white/10 rounded"
          />
        )}

        {/* SUBMIT */}
        <button
          disabled={loading || !type}
          className="px-6 py-3 bg-white text-black rounded disabled:opacity-50"
        >
          {loading ? "Saving…" : "Save Project"}
        </button>
      </form>
    </main>
  );
}
