"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const res = await fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  
    const data = await res.json();
  
    if (res.ok) {
      localStorage.setItem("isAdminLoggedIn", "true");
      router.push("/admin/dashboard");
    } else {
      alert(data.message);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#243B55] to-[#141E30]">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl px-10 py-12">
        <h1 className="text-3xl font-semibold text-gray-900 text-center mb-2">
          Admin Login
        </h1>
        <p className="text-sm text-gray-500 text-center mb-10">
          Craftopia Management System
        </p>

        <form onSubmit={handleLogin} className="space-y-7">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
              focus:outline-none focus:border-[#243B55] transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
              focus:outline-none focus:border-[#243B55] transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#243B55] text-white py-3 rounded-lg
            font-medium hover:bg-[#1c2f45] transition"
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="w-full py-3 rounded-lg border border-gray-300
            text-gray-700 hover:bg-gray-50 transition font-medium"
          >
            Kembali ke Beranda
          </button>
        </form>
      </div>
    </div>
  );
}