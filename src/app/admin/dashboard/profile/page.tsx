"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";

type Profile = {
  id: string;
  name: string;
  brand: string;
  role: string;
  location: string;
  address: string;
  phone: string;
  whatsapp: string;
  hours: string;
  experience_years: number;
  completed_projects: number;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase.from("profile").select("*").single().then(({ data }) => {
      if (data) setProfile(data);
    });
  }, []);

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    await supabase.from("profile").update(profile).eq("id", profile.id);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!profile) {
    return <div className="text-sm text-slate-500 py-8">Memuat...</div>;
  }

  const field = (label: string, key: keyof Profile, type = "text") => (
    <div>
      <label className="block text-xs font-semibold text-slate-700 mb-1">{label}</label>
      <input
        type={type}
        value={String(profile[key])}
        onChange={(e) => setProfile({ ...profile, [key]: type === "number" ? Number(e.target.value) : e.target.value })}
        className="w-full px-3 py-2 text-sm border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#ff4a16] focus:ring-1 focus:ring-[#ff4a16] transition-colors"
      />
    </div>
  );

  return (
    <div className="max-w-lg">
      <Link href="/admin/dashboard" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 mb-4 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        Kembali
      </Link>

      <h1 className="text-xl font-bold text-slate-900 mb-6">Profil Bisnis</h1>

      <div className="space-y-4 bg-white border border-slate-200 p-5">
        {field("Nama", "name")}
        {field("Brand", "brand")}
        {field("Deskripsi", "role")}
        {field("Lokasi", "location")}
        {field("Alamat Lengkap", "address")}
        {field("Telepon", "phone")}
        {field("WhatsApp", "whatsapp")}
        {field("Jam Operasional", "hours")}
        {field("Tahun Pengalaman", "experience_years", "number")}
        {field("Proyek Selesai", "completed_projects", "number")}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-4 px-6 py-2.5 bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 disabled:opacity-40 transition-colors flex items-center gap-2 cursor-pointer"
      >
        {saved ? <Check className="w-4 h-4" /> : null}
        {saving ? "Menyimpan..." : saved ? "Tersimpan!" : "Simpan"}
      </button>
    </div>
  );
}
