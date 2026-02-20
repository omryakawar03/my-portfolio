"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

type ProjectForm = {
  title: string;
  slug: string;
  type: "app" | "devops";
  description: string;
  techStack: string;
  githubUrl: string;
  liveUrl: string;

  // App
  content: string;
  screenshots: string;
  demoVideo: string;

  // DevOps
  readme: string;
  architectureImage: string;
  pipelineImage: string;
  monitoringImages: string;
  deploymentFlow: string;
  costNotes: string;
  securityNotes: string;
};

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [form, setForm] = useState<ProjectForm>({
    title: "",
    slug: "",
    type: "app",
    description: "",
    techStack: "",
    githubUrl: "",
    liveUrl: "",
    content: "",
    screenshots: "",
    demoVideo: "",
    readme: "",
    architectureImage: "",
    pipelineImage: "",
    monitoringImages: "",
    deploymentFlow: "",
    costNotes: "",
    securityNotes: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    if (!id) return;

    async function loadProject() {
      try {
        const token = localStorage.getItem("admin_token");
        if (!token) {
          router.replace("/admin/login");
          return;
        }

        const res = await fetch(`/api/admin/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        setForm({
          title: data.project.title || "",
          slug: data.project.slug || "",
          type: data.project.type || "app",
          description: data.project.description || "",
          techStack: (data.project.techStack || []).join(", "),
          githubUrl: data.project.githubUrl || "",
          liveUrl: data.project.liveUrl || "",
          content: data.project.content || "",
          screenshots: (data.project.screenshots || []).join(", "),
          demoVideo: data.project.demoVideo || "",
          readme: data.project.readme || "",
          architectureImage: data.project.architectureImage || "",
          pipelineImage: data.project.pipelineImage || "",
          monitoringImages:
            (data.project.monitoringImages || []).join(", "),
          deploymentFlow: data.project.deploymentFlow || "",
          costNotes: data.project.costNotes || "",
          securityNotes: data.project.securityNotes || "",
        });
      } catch (err: any) {
        setError(err.message || "Failed to load project");
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [id, router]);

  async function updateProject() {
    try {
      const token = localStorage.getItem("admin_token");
      if (!token) return;

      setSaving(true);

      const payload = {
        ...form,
        techStack: form.techStack.split(",").map((t) => t.trim()),
        screenshots: form.screenshots.split(",").map((s) => s.trim()),
        monitoringImages: form.monitoringImages
          .split(",")
          .map((m) => m.trim()),
      };

      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      router.push("/admin/projects");
    } catch (err: any) {
      alert(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading)
    return <p className="text-center mt-20 text-gray-400">Loading...</p>;

  if (error)
    return <p className="text-center mt-20 text-red-400">{error}</p>;

  return (
    <main className="min-h-screen bg-black text-white py-16 px-6">
      <div className="max-w-4xl mx-auto bg-zinc-900 p-8 rounded-2xl border border-white/10 shadow-xl">
        <h1 className="text-3xl font-bold mb-8">Edit Project</h1>

        <div className="space-y-6">

          {/* BASIC INFO */}
          <div className="grid md:grid-cols-2 gap-6">
            <Input label="Title" name="title" form={form} onChange={handleChange} />
            <Input label="Slug" name="slug" form={form} onChange={handleChange} />
          </div>

          <SelectField
            label="Project Type"
            name="type"
            value={form.type}
            onChange={handleChange}
          />

          <Textarea
            label="Description"
            name="description"
            form={form}
            onChange={handleChange}
          />

          <Input label="Tech Stack (comma separated)" name="techStack" form={form} onChange={handleChange} />

          <div className="grid md:grid-cols-2 gap-6">
            <Input label="GitHub URL" name="githubUrl" form={form} onChange={handleChange} />
            <Input label="Live URL" name="liveUrl" form={form} onChange={handleChange} />
          </div>

          {/* APP SECTION */}
          {form.type === "app" && (
            <>
              <Textarea label="Content" name="content" form={form} onChange={handleChange} />
              <Input label="Screenshots (comma separated URLs)" name="screenshots" form={form} onChange={handleChange} />
              <Input label="Demo Video URL" name="demoVideo" form={form} onChange={handleChange} />
            </>
          )}

          {/* DEVOPS SECTION */}
          {form.type === "devops" && (
            <>
              <hr className="border-white/10 my-6" />
              <h2 className="text-xl font-semibold">DevOps Configuration</h2>

              <Input label="Architecture Diagram URL" name="architectureImage" form={form} onChange={handleChange} />
              <Input label="CI/CD Pipeline Screenshot URL" name="pipelineImage" form={form} onChange={handleChange} />
              <Input label="Monitoring Screenshots (comma separated URLs)" name="monitoringImages" form={form} onChange={handleChange} />

              <Textarea label="Deployment Flow (Markdown)" name="deploymentFlow" form={form} onChange={handleChange} />
              <Textarea label="Cost Optimization Notes (Markdown)" name="costNotes" form={form} onChange={handleChange} />
              <Textarea label="Security Considerations (Markdown)" name="securityNotes" form={form} onChange={handleChange} />
              <Textarea label="Full README (Markdown)" name="readme" form={form} onChange={handleChange} rows={6} />
            </>
          )}

          <button
            onClick={updateProject}
            disabled={saving}
            className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition"
          >
            {saving ? "Updating..." : "Update Project"}
          </button>

        </div>
      </div>
    </main>
  );
}

/* 🔥 Reusable Input Components */

function Input({ label, name, form, onChange }: any) {
  return (
    <div>
      <label className="block text-sm mb-2 text-white/70">{label}</label>
      <input
        name={name}
        value={form[name]}
        onChange={onChange}
        className="w-full bg-black border border-white/20 rounded-lg px-4 py-3"
      />
    </div>
  );
}

function Textarea({ label, name, form, onChange, rows = 4 }: any) {
  return (
    <div>
      <label className="block text-sm mb-2 text-white/70">{label}</label>
      <textarea
        name={name}
        value={form[name]}
        onChange={onChange}
        rows={rows}
        className="w-full bg-black border border-white/20 rounded-lg px-4 py-3"
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange }: any) {
  return (
    <div>
      <label className="block text-sm mb-2 text-white/70">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-black border border-white/20 rounded-lg px-4 py-3"
      >
        <option value="app">App</option>
        <option value="devops">DevOps</option>
      </select>
    </div>
  );
}