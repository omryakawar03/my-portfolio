import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-8 md:items-center md:justify-between">
        
        {/* LEFT */}
        <div>
          <p className="text-sm text-gray-400">
            © {year} Omkar Ryakawar
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Full Stack & DevOps Engineer
          </p>
        </div>

        {/* CENTER NAV */}
        <nav aria-label="Footer navigation">
          <ul className="flex gap-6 text-sm">
            <li>
              <Link
                href="/about"
                className="text-gray-400 hover:text-white transition"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="text-gray-400 hover:text-white transition"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-gray-400 hover:text-white transition"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* RIGHT SOCIAL */}
        <div className="flex gap-4 text-sm">
          <Link
            href="https://github.com/omryakawar03"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
          >
            GitHub
          </Link>

          <Link
            href="https://www.linkedin.com/in/omkar-ryakawar-18368b387/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
          >
            LinkedIn
          </Link>

          <Link
            href="mailto:ryakawarom@gmail.com"
            className="text-gray-400 hover:text-white transition"
          >
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}
