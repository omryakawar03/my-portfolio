"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Pencil } from "lucide-react";

type Project = {
  _id: string;
  title: string;
};

export default function AdminProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function loadProjects() {
    try {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        router.replace("/admin/login");
        return;
      }

      setLoading(true);
      setError(null);

      const res = await fetch("/api/admin/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        router.replace("/admin/login");
        return;
      }

      const data = await res.json();
      setProjects(data.projects || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteProject(id: string) {
    const confirmed = confirm("Are you sure you want to delete this project?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("admin_token");
      if (!token) return;

      setDeletingId(id);

      const res = await fetch("/api/admin/projects", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      // Optimistic update instead of reload
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete project.");
    } finally {
      setDeletingId(null);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>

        <button
          onClick={() => router.push("/admin/projects/new")}
          className="p-2 border border-white/20 rounded hover:bg-white hover:text-black transition"
          title="Add Project"
        >
          <Plus size={18} />
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading projects…</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-400">No projects found.</p>
      ) : (
        <div className="space-y-4">
          {projects.map((p) => (
            <div
              key={p._id}
              className="border border-white/10 p-4 rounded flex justify-between items-center hover:border-white/30 transition"
            >
              <span className="font-medium">{p.title}</span>

              <div className="flex items-center gap-4">
                {/* EDIT */}
                <button
                  onClick={() =>
                    router.push(`/admin/projects/${p._id}/edit`)
                  }
                  className="text-blue-400 hover:text-blue-300 transition"
                  title="Edit"
                >
                  <Pencil size={16} />
                </button>

                {/* DELETE */}
                <button
                  onClick={() => deleteProject(p._id)}
                  disabled={deletingId === p._id}
                  className="text-red-400 hover:text-red-300 transition disabled:opacity-50"
                  title="Delete"
                >
                  {deletingId === p._id ? "..." : <Trash2 size={16} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}