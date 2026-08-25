"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Check } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

type Project = {
  id: string;
  title: string;
  category: string;
  category_label: string;
  image: string;
  location: string;
  year: string;
  material: string;
  description: string;
  highlight: string;
  sort_order: number;
};

const CATEGORIES = [
  { value: "architectural", label: "Architectural" },
  { value: "structural", label: "Structural" },
  { value: "automotive", label: "Automotive" },
  { value: "stainless", label: "Stainless" },
];

export default function ProjectEditPage() {
  const { id } = useParams();
  const [item, setItem] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase.from("projects").select("*").eq("id", id).single().then(({ data }) => {
      if (data) setItem(data);
    });
  }, [id]);

  const handleSave = async () => {
    if (!item) return;
    setSaving(true);
    await supabase.from("projects").update(item).eq("id", item.id);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!item) return <div className="text-sm text-slate-500 py-8">Memuat...</div>;

  return (
    <div className="max-w-lg">
      <Link href="/admin/dashboard/projects" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 mb-4 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        Kembali
      </Link>

      <h1 className="text-xl font-bold text-slate-900 mb-6">Edit Proyek</h1>

      <div className="space-y-4 bg-white border border-slate-200 p-5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Gambar</label>
          <ImageUpload value={item.image} onChange={(url) => setItem({ ...item, image: url })} placeholder="project" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Judul</label>
          <input value={item.title} onChange={(e) => setItem({ ...item, title: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-[#ff4a16] focus:ring-1 focus:ring-[#ff4a16] transition-colors" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Kategori</label>
          <select value={item.category} onChange={(e) => {
            const cat = CATEGORIES.find(c => c.value === e.target.value);
            setItem({ ...item, category: e.target.value, category_label: cat?.label || "" });
          }}
            className="w-full px-3 py-2 text-sm border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-[#ff4a16] focus:ring-1 focus:ring-[#ff4a16] transition-colors">
            {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Lokasi</label>
          <input value={item.location} onChange={(e) => setItem({ ...item, location: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-[#ff4a16] focus:ring-1 focus:ring-[#ff4a16] transition-colors" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Tahun</label>
            <input value={item.year} onChange={(e) => setItem({ ...item, year: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-[#ff4a16] focus:ring-1 focus:ring-[#ff4a16] transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Material</label>
            <input value={item.material} onChange={(e) => setItem({ ...item, material: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-[#ff4a16] focus:ring-1 focus:ring-[#ff4a16] transition-colors" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Deskripsi</label>
          <textarea rows={3} value={item.description} onChange={(e) => setItem({ ...item, description: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-[#ff4a16] focus:ring-1 focus:ring-[#ff4a16] transition-colors resize-none" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Highlight</label>
          <input value={item.highlight} onChange={(e) => setItem({ ...item, highlight: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-[#ff4a16] focus:ring-1 focus:ring-[#ff4a16] transition-colors" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Urutan</label>
          <input type="number" value={item.sort_order} onChange={(e) => setItem({ ...item, sort_order: Number(e.target.value) })}
            className="w-full px-3 py-2 text-sm border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-[#ff4a16] focus:ring-1 focus:ring-[#ff4a16] transition-colors" />
        </div>
      </div>

      <button onClick={handleSave} disabled={saving}
        className="mt-4 px-6 py-2.5 bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 disabled:opacity-40 transition-colors flex items-center gap-2 cursor-pointer">
        {saved ? <Check className="w-4 h-4" /> : null}
        {saving ? "Menyimpan..." : saved ? "Tersimpan!" : "Simpan"}
      </button>
    </div>
  );
}
