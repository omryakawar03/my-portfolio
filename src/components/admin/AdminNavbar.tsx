"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

const links = [
  { name: "Inbox", href: "/admin/messages" },
  { name: "Projects", href: "/admin/projects" },
];

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 h-14 border-b border-white/10 bg-black/80 backdrop-blur z-50">
      <div className="max-w-6xl mx-auto px-6 h-full flex justify-between items-center">
        {/* LOGO */}
        <Link href="/admin/messages" className="font-bold tracking-wide">
          Admin Panel
        </Link>

        {/* LINKS */}
        <div className="flex gap-6 items-center text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${
                pathname.startsWith(link.href)
                  ? "text-white underline"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* LOGOUT */}
          <button
            onClick={() => {
              localStorage.removeItem("admin_token");
              router.replace("/admin/login");
            }}
            title="Logout"
            className="text-gray-400 hover:text-white"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
}