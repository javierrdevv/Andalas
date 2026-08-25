"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

type Project = {
  id: string;
  title: string;
  category_label: string;
  image: string;
  sort_order: number;
};

export default function ProjectsListPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const router = useRouter();

  const fetchItems = async () => {
    const { data } = await supabase.from("projects").select("*").order("sort_order");
    if (data) setItems(data);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleAdd = async () => {
    const { data } = await supabase
      .from("projects")
      .insert({ title: "Proyek Baru", category: "architectural", category_label: "", image: "", location: "", year: "", material: "", description: "", highlight: "", sort_order: items.length })
      .select()
      .single();
    if (data) router.push(`/admin/dashboard/projects/${data.id}`);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await supabase.from("projects").delete().eq("id", deleteId);
    setDeleteId(null);
    fetchItems();
  };

  return (
    <div className="max-w-lg">
      <Link href="/admin/dashboard" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 mb-4 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        Kembali
      </Link>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-slate-900">Portofolio</h1>
        <button onClick={handleAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer">
          <Plus className="w-3.5 h-3.5" />
          Tambah
        </button>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 bg-white border border-slate-200 p-3 group">
            <div className="w-12 h-12 bg-slate-100 overflow-hidden shrink-0">
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image} alt="" className="w-full h-full object-cover" />
              ) : null}
            </div>
            <Link href={`/admin/dashboard/projects/${item.id}`} className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">{item.title}</p>
              <p className="text-[11px] text-slate-500 truncate">{item.category_label}</p>
            </Link>
            <button onClick={() => setDeleteId(item.id)}
              className="p-2 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <ConfirmDialog open={!!deleteId} title="Hapus Proyek?" message="Data yang dihapus tidak bisa dikembalikan."
        onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  );
}
