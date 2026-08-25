"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import ImageUpload from "@/components/admin/ImageUpload";

type Settings = {
  id: string;
  hero_image: string;
  about_image: string;
  hero_brightness: number;
  hero_gradient: number;
  hero_brightness_mobile: number;
  hero_gradient_mobile: number;
};

export default function HeroPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase.from("settings").select("*").single().then(({ data }) => {
      if (data) setSettings(data);
    });
  }, []);

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    await supabase.from("settings").update(settings).eq("id", settings.id);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!settings) {
    return <div className="text-sm text-slate-500 py-8">Memuat...</div>;
  }

  return (
    <div className="max-w-lg">
      <Link href="/admin/dashboard" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 mb-4 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        Kembali
      </Link>

      <h1 className="text-xl font-bold text-slate-900 mb-6">Gambar Hero</h1>

      <div className="space-y-6">
        <div className="bg-white border border-slate-200 p-5">
          <p className="text-xs font-semibold text-slate-700 mb-3">Gambar Utama Homepage</p>
          <ImageUpload
            value={settings.hero_image}
            onChange={(url) => setSettings({ ...settings, hero_image: url })}
            placeholder="hero"
          />
        </div>

        <div className="bg-white border border-slate-200 p-5">
          <p className="text-xs font-semibold text-slate-700 mb-3">Gambar Tentang / Workshop</p>
          <ImageUpload
            value={settings.about_image}
            onChange={(url) => setSettings({ ...settings, about_image: url })}
            placeholder="about"
          />
        </div>

        <div className="bg-white border border-slate-200 p-5 space-y-5">
          <p className="text-xs font-semibold text-slate-700">Pengaturan Hero — Desktop</p>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-slate-600">Kecerahan Gambar</label>
              <span className="text-xs font-mono text-slate-400">{settings.hero_brightness}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              value={settings.hero_brightness}
              onChange={(e) => setSettings({ ...settings, hero_brightness: Number(e.target.value) })}
              className="w-full accent-[#ff4a16]"
            />
            <p className="text-[10px] text-slate-400 mt-1">Semakin kecil = semakin gelap</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-slate-600">Opacity Gradient</label>
              <span className="text-xs font-mono text-slate-400">{settings.hero_gradient}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={settings.hero_gradient}
              onChange={(e) => setSettings({ ...settings, hero_gradient: Number(e.target.value) })}
              className="w-full accent-[#ff4a16]"
            />
            <p className="text-[10px] text-slate-400 mt-1">Semakin kecil = gradient lebih transparan, gambar lebih keliatan</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-5 space-y-5">
          <p className="text-xs font-semibold text-slate-700">Pengaturan Hero — Mobile</p>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-slate-600">Kecerahan Gambar</label>
              <span className="text-xs font-mono text-slate-400">{settings.hero_brightness_mobile}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              value={settings.hero_brightness_mobile}
              onChange={(e) => setSettings({ ...settings, hero_brightness_mobile: Number(e.target.value) })}
              className="w-full accent-[#ff4a16]"
            />
            <p className="text-[10px] text-slate-400 mt-1">Semakin kecil = semakin gelap</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-slate-600">Opacity Gradient</label>
              <span className="text-xs font-mono text-slate-400">{settings.hero_gradient_mobile}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={settings.hero_gradient_mobile}
              onChange={(e) => setSettings({ ...settings, hero_gradient_mobile: Number(e.target.value) })}
              className="w-full accent-[#ff4a16]"
            />
            <p className="text-[10px] text-slate-400 mt-1">Semakin kecil = gradient lebih transparan, gambar lebih keliatan</p>
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
