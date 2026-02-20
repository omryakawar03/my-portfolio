import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSessionGuard from "@/components/admin/AdminSessionGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminSessionGuard>
      <div className="min-h-screen bg-black text-white">
        <AdminNavbar />
        <main className="pt-16">
          {children}
        </main>
      </div>
    </AdminSessionGuard>
  );
}