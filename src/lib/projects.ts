import Project from "@/models/Project";
import {connectDB} from "./mongodb";

export async function fetchAllProjects() {
  await connectDB();
  const projects = await Project.find().sort({ updatedAt: -1 }).lean();
  return projects.map((p) => ({
    slug: p.slug,
    updatedAt: p.updatedAt,
  }));
}

export async function fetchProjectBySlug(slug: string) {
  await connectDB();
  const project = await Project.findOne({ slug }).lean();
  return project;
}
