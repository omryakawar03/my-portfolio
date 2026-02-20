import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { notFound } from "next/navigation";
import AppProject from "@/components/projects/AppProject";
import DevOpsProject from "@/components/projects/DevOpsProject";
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  await connectDB();
  const project = await Project.findOne({ slug }).lean();

  if (!project) notFound();

  // 🔥 SWITCH BY TYPE
  if (project.type === "devops") {
    return <DevOpsProject project={project} />;
  }

  return <AppProject project={project} />;
}
