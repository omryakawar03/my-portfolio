"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/* 🔥 Safe URL Formatter */
function formatUrl(url?: string) {
  if (!url) return "#";

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `https://${url}`;
}

export default function DevOpsProject({ project }: any) {
  return (
    <main className="min-h-screen bg-black text-white py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">

        {/* HEADER */}
        <div className="border-b border-white/10 pb-12">
          <h1 className="text-5xl font-bold tracking-tight">
            {project.title}
          </h1>

          <p className="mt-6 text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
            {project.description}
          </p>

          {project.techStack?.length > 0 && (
            <div className="mt-8 flex justify-center flex-wrap gap-3">
              {project.techStack.map((t: string) => (
                <span
                  key={t}
                  className="px-4 py-1.5 text-sm bg-white/5 border border-white/10 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ARCHITECTURE */}
        {project.architectureImage && (
          <Section title="Architecture Overview">
            <div className="max-w-3xl mx-auto">
              <img
                src={project.architectureImage}
                alt="Architecture Diagram"
                className="rounded-2xl border border-white/10 mx-auto"
              />
            </div>
          </Section>
        )}

        {/* CI/CD */}
        {project.pipelineImage && (
          <Section title="CI/CD Pipeline">
            <div className="max-w-3xl mx-auto">
              <img
                src={project.pipelineImage}
                alt="Pipeline Screenshot"
                className="rounded-2xl border border-white/10 mx-auto"
              />
            </div>
          </Section>
        )}

        {/* MONITORING */}
        {project.monitoringImages?.length > 0 && (
          <Section title="Monitoring & Observability">
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {project.monitoringImages.map((img: string, i: number) => (
                <img
                  key={i}
                  src={img}
                  alt="Monitoring Screenshot"
                  className="rounded-2xl border border-white/10"
                />
              ))}
            </div>
          </Section>
        )}

        {/* DEPLOYMENT FLOW */}
        {project.deploymentFlow && (
          <Section title="Deployment Flow">
            <MarkdownBlock content={project.deploymentFlow} />
          </Section>
        )}

        {/* COST */}
        {project.costNotes && (
          <Section title="Cost Optimization Strategy">
            <MarkdownBlock content={project.costNotes} />
          </Section>
        )}

        {/* SECURITY */}
        {project.securityNotes && (
          <Section title="Security Considerations">
            <MarkdownBlock content={project.securityNotes} />
          </Section>
        )}

        {/* README */}
        {project.readme && (
          <Section title="Full Technical Documentation" borderTop>
            <MarkdownBlock content={project.readme} />
          </Section>
        )}

        {/* LINKS SECTION */}
        {(project.githubUrl || project.liveUrl) && (
          <div className="mt-20 flex flex-col sm:flex-row justify-center gap-6">
            
            {project.githubUrl && (
              <a
                href={formatUrl(project.githubUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-white text-black font-semibold hover:bg-gray-200 transition"
              >
                View GitHub Repository →
              </a>
            )}

            {project.liveUrl && (
              <a
                href={formatUrl(project.liveUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-green-500 text-black font-semibold hover:bg-green-400 transition"
              >
                View Live Deployment →
              </a>
            )}

          </div>
        )}

      </div>
    </main>
  );
}

/* 🔥 Reusable Section */
function Section({
  title,
  children,
  borderTop = false,
}: {
  title: string;
  children: React.ReactNode;
  borderTop?: boolean;
}) {
  return (
    <section
      className={`mt-20 ${
        borderTop ? "border-t border-white/10 pt-14" : ""
      }`}
    >
      <h2 className="text-3xl font-semibold mb-8">
        {title}
      </h2>
      {children}
    </section>
  );
}

/* 🔥 Markdown Block */
function MarkdownBlock({ content }: { content: string }) {
  return (
    <article className="prose prose-invert max-w-3xl mx-auto text-left">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </article>
  );
}