import Link from "next/link";

export default function ProjectsCTA() {
  return (
    <section className="px-6 py-20 text-center">
      <h2 className="text-3xl font-bold mb-4">
        Real projects. Real systems.
      </h2>
      <p className="text-gray-400 mb-8 max-w-xl mx-auto">
        I don’t showcase demos. I build production-ready applications
        with proper architecture, security, and deployment.
      </p>

      <Link
        href="/projects"
        className="inline-block px-6 py-3 border border-white/20 rounded hover:bg-white hover:text-black transition"
      >
        View Projects →
      </Link>
    </section>
  );
}