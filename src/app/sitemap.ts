import { fetchAllProjects } from "@/lib/projects";

export default async function sitemap() {
  const base = "https://your-domain.com";

  const projects = await fetchAllProjects();

  const projectUrls = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: p.updatedAt,
  }));

  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/projects`, lastModified: new Date() },
    { url: `${base}/contact`, lastModified: new Date() },
    ...projectUrls,
  ];
}
