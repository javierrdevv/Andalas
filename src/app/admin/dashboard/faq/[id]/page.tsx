"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Check } from "lucide-react";

type Faq = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
};

export default function FaqEditPage() {
  const { id } = useParams();
  const [item, setItem] = useState<Faq | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase.from("faqs").select("*").eq("id", id).single().then(({ data }) => {
      if (data) setItem(data);
    });
  }, [id]);

  const handleSave = async () => {
    if (!item) return;
    setSaving(true);
    await supabase.from("faqs").update(item).eq("id", item.id);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!item) return <div className="text-sm text-slate-500 py-8">Memuat...</div>;

  return (
    <div className="max-w-lg">
      <Link href="/admin/dashboard/faq" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 mb-4 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        Kembali
      </Link>

      <h1 className="text-xl font-bold text-slate-900 mb-6">Edit FAQ</h1>

      <div className="space-y-4 bg-white border border-slate-200 p-5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Pertanyaan</label>
          <input value={item.question} onChange={(e) => setItem({ ...item, question: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-[#ff4a16] focus:ring-1 focus:ring-[#ff4a16] transition-colors" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Jawaban</label>
          <textarea rows={6} value={item.answer} onChange={(e) => setItem({ ...item, answer: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-[#ff4a16] focus:ring-1 focus:ring-[#ff4a16] transition-colors resize-none" />
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
