import MediaCarousel from "./MediaCarousel";

export default function AppProject({ project }: any) {
  return (
    <main className="min-h-screen bg-black text-white py-24 px-6">
      <div className="max-w-5xl mx-auto text-center">

        {/* HEADER */}
        <div className="border-b border-white/10 pb-12">
          <h1 className="text-5xl font-bold tracking-tight">
            {project.title}
          </h1>

          <p className="mt-6 text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* INFO SECTION */}
        <section className="mt-16 space-y-8">

          <InfoField label="Project Title" value={project.title} />
          <InfoField label="Project Slug" value={project.slug} />
          <InfoField label="Project Type" value={project.type} />

          {project.githubUrl && (
            <InfoField
              label="GitHub Repository"
              value={
                <a
                  href={
                    project.githubUrl.startsWith("http")
                      ? project.githubUrl
                      : `https://${project.githubUrl}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {project.githubUrl}
                </a>
              }
            />
          )}

          {project.liveUrl && (
            <InfoField
              label="Live URL"
              value={
                <a
                  href={
                    project.liveUrl.startsWith("http")
                      ? project.liveUrl
                      : `https://${project.liveUrl}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:underline"
                >
                  {project.liveUrl}
                </a>
              }
            />
          )}
        </section>

        {/* TECH STACK */}
        {project.techStack?.length > 0 && (
          <section className="mt-16">
            <h3 className="text-sm uppercase tracking-widest text-white/40 mb-6">
              Tech Stack
            </h3>

            <div className="flex justify-center flex-wrap gap-3">
              {project.techStack.map((tech: string) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* MEDIA */}
        <section className="mt-20 space-y-12">

          {project.demoVideo && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                Demo Video
              </h2>
              <div className="max-w-4xl mx-auto">
                <video
                  src={project.demoVideo}
                  controls
                  className="w-full rounded-2xl border border-white/10"
                />
              </div>
            </div>
          )}

          {project.screenshots?.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                Screenshots
              </h2>
              <div className="max-w-4xl mx-auto">
                <MediaCarousel
                  screenshots={project.screenshots}
                  video={project.demoVideo}
                />
              </div>
            </div>
          )}
        </section>

        {/* CONTENT */}
        {project.content && (
          <section className="mt-20 border-t border-white/10 pt-12">
            <h2 className="text-2xl font-semibold mb-6">
              Project Details
            </h2>

            <div className="text-white/70 leading-relaxed whitespace-pre-line max-w-3xl mx-auto">
              {project.content}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}

function InfoField({
  label,
  value,
}: {
  label: string;
  value: any;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-white/40 mb-2">
        {label}
      </p>
      <div className="text-white/80 break-words">
        {value}
      </div>
    </div>
  );
}