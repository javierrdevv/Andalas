"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, ArrowLeft } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.ok) {
      router.push("/admin/dashboard");
    } else {
      setError(data.error || "Password salah");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mx-auto mb-4 overflow-hidden">
            <Image src="/favicon.png" alt="Andal Las" width={40} height={40} className="object-contain" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">Admin Panel</h1>
          <p className="text-sm text-slate-500 mt-1">Andal Las · Masukkan password untuk masuk</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              autoFocus
              className="w-full px-3 py-2.5 text-sm border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#ff4a16] focus:ring-1 focus:ring-[#ff4a16] transition-colors"
            />
          </div>

          {error && (
            <p className="text-xs font-medium text-red-600 bg-red-50 border border-red-200 px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-2.5 bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 disabled:opacity-40 transition-colors cursor-pointer"
          >
            {loading ? "Masuk..." : "Masuk"}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
