"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Check } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

type Service = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  materials: string[];
  applications: string[];
  sort_order: number;
};

export default function ServiceEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [item, setItem] = useState<Service | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase.from("services").select("*").eq("id", id).single().then(({ data }) => {
      if (data) setItem(data);
    });
  }, [id]);

  const handleSave = async () => {
    if (!item) return;
    setSaving(true);
    const { materials, applications, ...rest } = item;
    await supabase.from("services").update({
      ...rest,
      materials: materials || [],
      applications: applications || [],
    }).eq("id", item.id);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!item) return <div className="text-sm text-slate-500 py-8">Memuat...</div>;

  return (
    <div className="max-w-lg">
      <Link href="/admin/dashboard/services" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 mb-4 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        Kembali
      </Link>

      <h1 className="text-xl font-bold text-slate-900 mb-6">Edit Layanan</h1>

      <div className="space-y-4 bg-white border border-slate-200 p-5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Gambar</label>
          <ImageUpload
            value={item.image}
            onChange={(url) => setItem({ ...item, image: url })}
            placeholder="service"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Judul</label>
          <input value={item.title} onChange={(e) => setItem({ ...item, title: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-[#ff4a16] focus:ring-1 focus:ring-[#ff4a16] transition-colors" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Tagline</label>
          <input value={item.tagline} onChange={(e) => setItem({ ...item, tagline: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-[#ff4a16] focus:ring-1 focus:ring-[#ff4a16] transition-colors" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Deskripsi</label>
          <textarea rows={4} value={item.description} onChange={(e) => setItem({ ...item, description: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-[#ff4a16] focus:ring-1 focus:ring-[#ff4a16] transition-colors resize-none" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Material (satu per baris)</label>
          <textarea rows={3} value={(item.materials || []).join("\n")} onChange={(e) => setItem({ ...item, materials: e.target.value.split("\n").filter(Boolean) })}
            className="w-full px-3 py-2 text-sm border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-[#ff4a16] focus:ring-1 focus:ring-[#ff4a16] transition-colors resize-none" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Aplikasi (satu per baris)</label>
          <textarea rows={3} value={(item.applications || []).join("\n")} onChange={(e) => setItem({ ...item, applications: e.target.value.split("\n").filter(Boolean) })}
            className="w-full px-3 py-2 text-sm border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-[#ff4a16] focus:ring-1 focus:ring-[#ff4a16] transition-colors resize-none" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Urutan</label>
          <input type="number" value={item.sort_order} onChange={(e) => setItem({ ...item, sort_order: Number(e.target.value) })}
            className="w-full px-3 py-2 text-sm border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-[#ff4a16] focus:ring-1 focus:ring-[#ff4a16] transition-colors" />
        </div>
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
