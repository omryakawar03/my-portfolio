"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/slugify";

export default function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    fetch(`/api/admin/projects`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) =>
        setProject(data.find((p: any) => p._id === params.id))
      );
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const title = fd.get("title") as string;

    const payload = {
      title,
      slug: slugify(title),
      description: fd.get("description"),
      content: fd.get("content"),
      techStack: (fd.get("techStack") as string)
        .split(",")
        .map((t) => t.trim()),
      githubUrl: fd.get("githubUrl"),
      liveUrl: fd.get("liveUrl"),
      featured: fd.get("featured") === "on",
    };

    await fetch(`/api/admin/projects/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
      },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    router.push("/admin/projects");
  }

  if (!project) return <p className="p-6">Loading…</p>;

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Project</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" defaultValue={project.title} className="input" />
        <textarea
          name="description"
          defaultValue={project.description}
          className="input"
        />
        <textarea
          name="content"
          defaultValue={project.content}
          className="input"
        />
        <input
          name="techStack"
          defaultValue={project.techStack?.join(", ")}
          className="input"
        />
        <input
          name="githubUrl"
          defaultValue={project.githubUrl}
          className="input"
        />
        <input
          name="liveUrl"
          defaultValue={project.liveUrl}
          className="input"
        />

        <label className="flex gap-2 items-center text-sm">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={project.featured}
          />
          Featured
        </label>

        <button
          disabled={loading}
          className="bg-white text-black px-6 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Project"}
        </button>
      </form>
    </main>
  );
}
