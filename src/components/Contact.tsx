import Link from "next/link";

export function ContactBlock() {
  return (
    <section className="py-20 border-t border-white/10 text-center">
      <h2 className="text-xl font-semibold">Get in Touch</h2>
      <p className="mt-4 text-gray-400">
        For opportunities, collaboration, or technical discussions.
      </p>

      <Link
        href="/contact"
        className="inline-block mt-6 px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-gray-200"
      >
        Contact Me
      </Link>
    </section>
  );
}
