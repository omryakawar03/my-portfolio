"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, LogOut } from "lucide-react";

type Message = {
  _id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export default function AdminMessagesPage() {
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // 🔐 Basic guard
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) router.replace("/admin/login");
  }, []);

  // 🔥 SINGLE FETCH FUNCTION
  async function fetchMessages() {
    const token = localStorage.getItem("admin_token");
    if (!token) return;

    setLoading(true);

    const res = await fetch(
      `/api/admin/messages?page=${page}&limit=10&search=${search}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 401 || res.status === 403) {
      localStorage.removeItem("admin_token");
      router.replace("/admin/login");
      return;
    }

    const data = await res.json();

    // 🛡 hard dedupe (defensive)
    const unique = new Map<string, Message>();
    data.messages.forEach((m: Message) => unique.set(m._id, m));

    setMessages(Array.from(unique.values()));
    setTotalPages(data.totalPages);
    setLoading(false);
  }

  // auto fetch
  useEffect(() => {
    fetchMessages();
  }, [page, search]);

  async function markAsRead(id: string) {
    const token = localStorage.getItem("admin_token");
    if (!token) return;

    await fetch(`/api/admin/messages/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMessages((prev) =>
      prev.map((m) => (m._id === id ? { ...m, isRead: true } : m))
    );
  }

  // 🔥 FIXED DELETE (DB + UI CONSISTENT)
  async function deleteMessage(id: string) {
    const token = localStorage.getItem("admin_token");
    if (!token) return;

    const res = await fetch(`/api/admin/messages/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // 🔥 IMPORTANT
      },
    });

    if (!res.ok) {
      alert("Delete failed");
      return;
    }

    // ✅ DB delete confirmed → now update UI
    setMessages((prev) => prev.filter((m) => m._id !== id));
  }

  return (
    <main className="min-h-screen px-6 py-10 ml-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Inbox</h1>

        <div className="flex items-center gap-4">
          {/* REFRESH */}
          <button
            onClick={fetchMessages}
            disabled={loading}
            title="Refresh"
            className="p-2 rounded border border-white/10 hover:bg-white/10 disabled:opacity-40"
          >
            <RefreshCw
              size={18}
              className={loading ? "animate-spin" : ""}
            />
          </button>

          {/* LOGOUT */}
          <button
            onClick={() => {
              localStorage.removeItem("admin_token");
              router.replace("/admin/login");
            }}
            title="Logout"
            className="p-2 rounded border border-white/10 hover:bg-white/10"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <input
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
        placeholder="Search by name or email"
        className="mb-6 w-full max-w-sm px-4 py-2 bg-black border border-white/10 rounded"
      />

      {/* CONTENT */}
      {loading && messages.length === 0 ? (
        <p className="text-gray-400">Loading messages…</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-400">No messages found.</p>
      ) : (
        <div className="space-y-6">
          {messages.map((m) => (
            <div
              key={m._id}
              className={`border rounded-xl p-5 ${
                m.isRead ? "border-white/10" : "border-white"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="font-medium">{m.name}</p>
                  <p className="text-sm text-gray-400">{m.email}</p>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(m.createdAt).toLocaleString()}
                </span>
              </div>

              <p className="mt-4 text-sm text-gray-300">{m.message}</p>

              <div className="mt-4 flex gap-4 text-sm">
                {!m.isRead && (
                  <button
                    onClick={() => markAsRead(m._id)}
                    className="underline"
                  >
                    Mark as read
                  </button>
                )}
                <button
                  onClick={() => deleteMessage(m._id)}
                  className=" underline text-red-400"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      <div className="mt-10 flex gap-4 items-center">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border border-white/10 rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span className="text-sm text-gray-400">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border border-white/10 rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </main>
  );
}
