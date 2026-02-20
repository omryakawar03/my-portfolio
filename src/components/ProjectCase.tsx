import Link from "next/link";

type ProjectCaseProps = {
  slug: string;
  title: string;
  problem: string;
  decision: string;
  outcome: string;
  stack: string[];
};

export function ProjectCaseCard({
  slug,
  title,
  problem,
  decision,
  outcome,
  stack,
}: ProjectCaseProps) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="block border border-white/10 rounded-2xl p-6 bg-white/5 hover:border-white/30 transition"
    >
      <h3 className="text-lg font-semibold">{title}</h3>

      <div className="mt-4 space-y-3 text-sm text-gray-300">
        <p><strong className="text-white">Problem:</strong> {problem}</p>
        <p><strong className="text-white">Decision:</strong> {decision}</p>
        <p><strong className="text-white">Outcome:</strong> {outcome}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {stack.map((tech) => (
          <span
            key={tech}
            className="text-xs px-2 py-1 bg-black border border-white/10 rounded"
          >
            {tech}
          </span>
        ))}
      </div>
    </Link>
  );
}
