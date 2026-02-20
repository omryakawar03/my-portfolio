import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import Link from "next/link";

export default async function ProjectsGrid() {
  await connectDB();

  const projects = await Project.find()
    .sort({ createdAt: -1 })
    .lean();

 return (
  <section className="relative px-6 py-28 bg-black">
    <div className="max-w-7xl mx-auto">

      {/* HEADER */}
      <header className="mb-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Projects
        </h1>
        <p className="mt-6 text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
          A curated collection of applications and infrastructure systems
          designed, engineered, deployed, and optimized for production-scale environments.
        </p>
      </header>

      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((p: any) => (
          <Link
            key={p._id}
            href={`/projects/${p.slug}`}
            className="group relative rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur-md p-8 transition duration-300 hover:-translate-y-2 hover:border-white/30 hover:shadow-2xl"
          >
            {/* TYPE BADGE */}
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-white/50">
                {p.type}
              </span>
            </div>

            {/* TITLE */}
            <h2 className="text-2xl font-semibold group-hover:text-white transition">
              {p.title}
            </h2>

            {/* DESCRIPTION */}
            <p className="mt-4 text-white/60 leading-relaxed line-clamp-3">
              {p.description}
            </p>

            {/* TECH STACK */}
            {p.techStack?.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {p.techStack.slice(0, 4).map((tech: string) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-white/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* HOVER INDICATOR */}
            <div className="absolute bottom-6 right-6 text-white/40 group-hover:text-white transition">
              →
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);
}
