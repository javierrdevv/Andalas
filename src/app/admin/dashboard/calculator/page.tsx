"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Check, Plus, Trash2 } from "lucide-react";
import type { CalculatorProject, CalculatorMaterial } from "@/lib/useSupabaseData";

type Calculator = {
  id: string;
  projects: CalculatorProject[];
  materials: CalculatorMaterial[];
  install_pct: number;
  min_install: number;
  range_low: number;
  range_high: number;
};

const emptyProject = (): CalculatorProject => ({ id: "", name: "", shortName: "", unit: "m²", defaultQty: 1, basePrice: 0 });
const emptyMaterial = (): CalculatorMaterial => ({ id: "", label: "", fullLabel: "", mult: 1 });

function CurrencyInput({ value, onChange, className }: { value: number; onChange: (n: number) => void; className?: string }) {
  const [text, setText] = useState(() => (value ? value.toLocaleString("id-ID") : ""));
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    setText(digits ? Number(digits).toLocaleString("id-ID") : "");
    onChange(digits ? parseInt(digits, 10) : 0);
  };
  return <input inputMode="numeric" value={text} onChange={handle} placeholder="0" className={className} />;
}

function DecimalInput({ value, onChange, className }: { value: number; onChange: (n: number) => void; className?: string }) {
  const [text, setText] = useState(() => String(value).replace(".", ","));
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = e.target.value.replace(/[^\d,]/g, "").replace(",", ".");
    setText(t);
    onChange(t ? Number(t) : 0);
  };
  return <input inputMode="decimal" value={text} onChange={handle} placeholder="0" className={className} />;
}

export default function CalculatorPage() {
  const [calc, setCalc] = useState<Calculator | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase.from("calculator").select("*").single().then(({ data }) => {
      if (data) {
        setCalc({
          ...data,
          install_pct: Number(data.install_pct),
          min_install: Number(data.min_install),
          range_low: Number(data.range_low),
          range_high: Number(data.range_high),
        });
      }
    });
  }, []);

  const handleSave = async () => {
    if (!calc) return;
    setSaving(true);
    const { projects, materials, install_pct, min_install, range_low, range_high } = calc;
    await supabase.from("calculator").update({
      projects, materials, install_pct, min_install, range_low, range_high,
    }).eq("id", calc.id);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const setProject = (i: number, patch: Partial<CalculatorProject>) => {
    if (!calc) return;
    const projects = calc.projects.map((p, idx) => (idx === i ? { ...p, ...patch } : p));
    setCalc({ ...calc, projects });
  };
  const setMaterial = (i: number, patch: Partial<CalculatorMaterial>) => {
    if (!calc) return;
    const materials = calc.materials.map((m, idx) => (idx === i ? { ...m, ...patch } : m));
    setCalc({ ...calc, materials });
  };

  if (!calc) return <div className="text-sm text-slate-500 py-8">Memuat...</div>;

  const inputCls = "w-full px-3 py-2 text-sm border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-[#ff4a16] focus:ring-1 focus:ring-[#ff4a16] transition-colors";
  const labelCls = "block text-xs font-semibold text-slate-700 mb-1";

  return (
    <div className="max-w-2xl">
      <Link href="/admin/dashboard" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 mb-4 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        Kembali
      </Link>

      <h1 className="text-xl font-bold text-slate-900 mb-2">Kalkulator Harga</h1>
      <p className="text-xs text-slate-500 mb-6">Atur kategori pekerjaan, material, dan rumus estimasi biaya yang tampil di halaman kalkulator.</p>

      {/* Projects */}
      <div className="bg-white border border-slate-200 p-5 mb-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-slate-700">Kategori Pekerjaan</p>
          <button
            onClick={() => calc && setCalc({ ...calc, projects: [...calc.projects, emptyProject()] })}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-900 text-white text-[11px] font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Plus className="w-3 h-3" />
            Tambah
          </button>
        </div>
        <div className="space-y-4">
          {calc.projects.map((p, i) => (
            <div key={i} className="border border-slate-200 p-3 space-y-3 relative">
              <button
                onClick={() => calc && setCalc({ ...calc, projects: calc.projects.filter((_, idx) => idx !== i) })}
                className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                aria-label="Hapus"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Nama Lengkap</label>
                  <input value={p.name} onChange={(e) => setProject(i, { name: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Nama Pendek (chip)</label>
                  <input value={p.shortName} onChange={(e) => setProject(i, { shortName: e.target.value })} className={inputCls} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className={labelCls}>Unit</label>
                  <input value={p.unit} onChange={(e) => setProject(i, { unit: e.target.value })} className={inputCls} placeholder="m², meter, unit, hari" />
                </div>
                <div>
                  <label className={labelCls}>Qty Default</label>
                  <input type="number" value={p.defaultQty} onChange={(e) => setProject(i, { defaultQty: Number(e.target.value) })} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Harga per Unit (Rp)</label>
                  <CurrencyInput value={p.basePrice} onChange={(n) => setProject(i, { basePrice: n })} className={inputCls} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Materials */}
      <div className="bg-white border border-slate-200 p-5 mb-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-slate-700">Material</p>
          <button
            onClick={() => calc && setCalc({ ...calc, materials: [...calc.materials, emptyMaterial()] })}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-900 text-white text-[11px] font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Plus className="w-3 h-3" />
            Tambah
          </button>
        </div>
        <div className="space-y-4">
          {calc.materials.map((m, i) => (
            <div key={i} className="border border-slate-200 p-3 space-y-3 relative">
              <button
                onClick={() => calc && setCalc({ ...calc, materials: calc.materials.filter((_, idx) => idx !== i) })}
                className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                aria-label="Hapus"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Label</label>
                  <input value={m.label} onChange={(e) => setMaterial(i, { label: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Label Lengkap</label>
                  <input value={m.fullLabel} onChange={(e) => setMaterial(i, { fullLabel: e.target.value })} className={inputCls} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Pengali Harga ({m.mult})</label>
                <DecimalInput value={m.mult} onChange={(n) => setMaterial(i, { mult: n })} className={inputCls} />
                <p className="text-[10px] text-slate-400 mt-1">1 = harga dasar (tulis 0,9 lebih murah, 1,25 lebih mahal). Pakai koma.</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Formula */}
      <div className="bg-white border border-slate-200 p-5 space-y-4">
        <p className="text-xs font-semibold text-slate-700">Rumus Estimasi</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Biaya Pasang (% dari harga, format 0,10 = 10%)</label>
            <DecimalInput value={calc.install_pct} onChange={(n) => setCalc({ ...calc, install_pct: n })} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Minimal Biaya Pasang (Rp)</label>
            <CurrencyInput value={calc.min_install} onChange={(n) => setCalc({ ...calc, min_install: n })} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Batas Bawah Range (pengali harga, format 0,9)</label>
            <DecimalInput value={calc.range_low} onChange={(n) => setCalc({ ...calc, range_low: n })} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Batas Atas Range (pengali harga, format 1,15)</label>
            <DecimalInput value={calc.range_high} onChange={(n) => setCalc({ ...calc, range_high: n })} className={inputCls} />
          </div>
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
