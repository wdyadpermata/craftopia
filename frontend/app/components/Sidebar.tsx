"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [showLogout, setShowLogout] = useState(false);

  const menu = [
    {
      title: "Produk",
      desc: "Kelola data produk",
      path: "/admin/dashboard",
    },
    {
      title: "Akun",
      desc: "Pengaturan admin",
      path: "/admin/akun",
    },
  ];

  const confirmLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    router.push("/");
  };

  return (
    <>
      <aside className="fixed left-0 top-0 w-64 h-screen bg-[#243B55] text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6">Craftopia</h2>
          <hr className="border-white/20 mb-6" />

          <nav className="space-y-3">
            {menu.map((item) => (
              <div
                key={item.path}
                onClick={() => router.push(item.path)}
                className={`px-4 py-4 rounded-xl cursor-pointer transition
                  ${
                    pathname === item.path
                      ? "bg-[#1c2f45]"
                      : "hover:bg-[#1c2f45]"
                  }`}
              >
                <p className="font-semibold">{item.title}</p>
                <p className="text-xs text-gray-300 mt-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </nav>
        </div>

        <button
          onClick={() => setShowLogout(true)}
          className="w-full bg-red-600/30 hover:bg-red-600/50
          text-red-100 hover:text-white py-3 rounded-xl font-semibold transition"
        >
          Logout
        </button>
      </aside>

      {showLogout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowLogout(false)}
          />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-2">
              Konfirmasi Logout
            </h2>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin logout?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogout(false)}
                className="px-4 py-2 rounded-lg border"
              >
                Batal
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white"
              >
                Ya, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
