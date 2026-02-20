"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminSessionGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      router.replace("/admin/login");
      return;
    }

    let timeout: NodeJS.Timeout;

    const logout = () => {
      localStorage.removeItem("admin_token");
      router.replace("/admin/login");
    };

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(logout, 15 * 60 * 1000); // 15 minutes
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, [router]);

  return <>{children}</>;
}