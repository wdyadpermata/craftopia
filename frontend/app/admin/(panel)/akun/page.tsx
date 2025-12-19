"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AkunPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    passwordLama: "",
    passwordBaru: "",
    konfirmasi: "",
  });

  useEffect(() => {
    const loggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!loggedIn) router.push("/admin/login");
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.passwordBaru !== form.konfirmasi) {
      alert("Konfirmasi password tidak cocok");
      return;
    }

    alert("Berhasil (UI saja)");
  };

  return (
    <>
      <div className="bg-white shadow px-8 py-4">
        <h1 className="text-lg font-semibold text-gray-700">
          Pengaturan Akun
        </h1>
      </div>

      <div className="p-8 max-w-xl">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username baru"
              className="w-full border p-2 rounded-lg"
            />
            <input
              type="password"
              placeholder="Password lama"
              className="w-full border p-2 rounded-lg"
            />
            <input
              type="password"
              placeholder="Password baru"
              className="w-full border p-2 rounded-lg"
            />
            <input
              type="password"
              placeholder="Konfirmasi password"
              className="w-full border p-2 rounded-lg"
            />
            <button className="bg-[#3D5C8A] text-white px-6 py-2 rounded-lg">
              Simpan Perubahan
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
