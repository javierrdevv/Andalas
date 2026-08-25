"use client";

import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { PROFILE } from "@/data/welderData";

interface ProjectOption {
  id: string;
  name: string;
  shortName: string;
  unit: string;
  defaultQty: number;
  basePrice: number;
}

const PROJECTS: ProjectOption[] = [
  { id: "kanopi", name: "Kanopi / Atap Besi Custom", shortName: "Kanopi", unit: "m²", defaultQty: 15, basePrice: 950000 },
  { id: "teralis", name: "Teralis / Pagar / Railing", shortName: "Teralis", unit: "meter", defaultQty: 8, basePrice: 650000 },
  { id: "gerbang", name: "Gerbang / Pintu Lipat Besi", shortName: "Gerbang", unit: "unit", defaultQty: 1, basePrice: 3500000 },
  { id: "rak", name: "Rak Besi / Furniture Besi", shortName: "Rak Besi", unit: "unit", defaultQty: 1, basePrice: 1500000 },
  { id: "custom", name: "Custom Motor / Kendaraan", shortName: "Custom Motor", unit: "unit", defaultQty: 1, basePrice: 2800000 },
  { id: "onsite", name: "Jasa Las Panggilan (Ke Lokasi)", shortName: "Las Panggilan", unit: "hari", defaultQty: 1, basePrice: 600000 },
];

const MATERIALS = [
  { id: "hitam", label: "Besi Hitam", fullLabel: "Besi Hitam / Hollow Biasa", mult: 0.9 },
  { id: "galvanis", label: "Galvanis", fullLabel: "Besi Hollow Galvanis SNI", mult: 1.0 },
  { id: "wf", label: "Baja WF", fullLabel: "Baja WF / H-Beam SNI", mult: 1.25 },
  { id: "sus304", label: "Stainless", fullLabel: "Stainless Steel SUS304", mult: 1.6 },
];

export default function CostEstimator() {
  const [selectedProject, setSelectedProject] = useState("kanopi");
  const [qty, setQty] = useState(15);
  const [material, setMaterial] = useState("galvanis");
  const [withInstall, setWithInstall] = useState(true);

  const curProject = PROJECTS.find((p) => p.id === selectedProject) || PROJECTS[0];
  const curMaterial = MATERIALS.find((m) => m.id === material) || MATERIALS[0];

  const baseCost = curProject.basePrice * qty * curMaterial.mult;
  const installCost = withInstall ? Math.max(500000, baseCost * 0.1) : 0;
  const total = Math.round(baseCost + installCost);
  const low = Math.round(total * 0.9);
  const high = Math.round(total * 1.15);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const getWaLink = () => {
    const text = `Halo Mas Danang, saya ingin konsultasi perkiraan biaya:

• Jenis Pekerjaan: ${curProject.name}
• Estimasi Ukuran: ${qty} ${curProject.unit}
• Pilihan Material: ${curMaterial.fullLabel}
• Pemasangan di Lokasi: ${withInstall ? "Ya" : "Tidak"}

Perkiraan Range Biaya: ${formatRupiah(low)} - ${formatRupiah(high)}

Boleh info jadwal survey atau konsultasi lebih lanjut? Terima kasih.`;

    return `https://wa.me/${PROFILE.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="estimasi" className="py-14 md:py-20 bg-white border-b border-slate-200">
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-12">
        <div className="max-w-2xl mb-10">
          <p className="flex items-center gap-3 text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-5">
            <span className="inline-block w-8 h-px bg-[#ff4a16]" />
            Simulasi Biaya
          </p>
          <h2 className="text-2xl sm:text-3xl xl:text-4xl font-extrabold tracking-tighter text-zinc-900 leading-[1.1]">
            Kalkulator estimasi anggaran pengerjaan
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 mt-4 leading-relaxed">
            Dapatkan perkiraan kasar biaya untuk perencanaan awal Anda. Survey lokasi dan konsultasi selalu gratis.
          </p>
        </div>

        {/* ── Mobile: inline single-column ── */}
        <div className="lg:hidden space-y-5">
          {/* Project chips */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-2.5">
              Jenis Pekerjaan
            </label>
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 snap-x snap-mandatory">
              {PROJECTS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedProject(item.id);
                    setQty(item.defaultQty);
                  }}
                  className={`snap-start shrink-0 px-3.5 py-2 text-xs font-semibold border transition-colors cursor-pointer ${
                    selectedProject === item.id
                      ? "bg-zinc-900 text-white border-zinc-900"
                      : "bg-white border-zinc-200 text-zinc-600"
                  }`}
                >
                  {item.shortName}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500">
                Ukuran / Kuantitas
              </label>
              <span className="text-sm font-extrabold tracking-tighter text-zinc-900 tabular-nums">
                {qty} {curProject.unit}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max={curProject.unit === "m²" || curProject.unit === "meter" ? 50 : 10}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-full h-1 bg-zinc-200 appearance-none cursor-pointer accent-[#ff4a16]"
            />
          </div>

          {/* Material chips */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-2.5">
              Material
            </label>
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 snap-x snap-mandatory">
              {MATERIALS.map((mat) => (
                <button
                  key={mat.id}
                  type="button"
                  onClick={() => setMaterial(mat.id)}
                  className={`snap-start shrink-0 px-3.5 py-2 text-xs font-semibold border transition-colors cursor-pointer ${
                    material === mat.id
                      ? "bg-zinc-900 text-white border-zinc-900"
                      : "bg-white border-zinc-200 text-zinc-600"
                  }`}
                >
                  {mat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Install toggle */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-2.5">
              Pemasangan
            </label>
            <button
              type="button"
              onClick={() => setWithInstall(!withInstall)}
              aria-pressed={withInstall}
              className={`w-full px-4 py-3 border text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                withInstall
                  ? "bg-white border-zinc-900 text-zinc-900"
                  : "bg-white border-zinc-200 text-zinc-400"
              }`}
            >
              <span>{withInstall ? "Termasuk Pasang di Lokasi" : "Hanya Fabrikasi Workshop"}</span>
              {withInstall && <Check className="w-4 h-4 stroke-[3]" />}
            </button>
          </div>

          {/* Result */}
          <div className="bg-zinc-950 text-white p-5 space-y-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-400">
                Estimasi Range Anggaran
              </span>
              <p className="text-[1.75rem] font-extrabold tracking-tighter text-white mt-1.5 leading-none tabular-nums">
                {formatRupiah(low)}
              </p>
              <p className="text-xs font-mono text-zinc-500 mt-1.5">
                hingga {formatRupiah(high)}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-zinc-800 text-xs font-mono text-zinc-400">
              <div className="flex justify-between gap-4">
                <span>Pekerjaan:</span>
                <span className="text-zinc-100 text-right">{curProject.name}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Volume:</span>
                <span className="text-zinc-100">{qty} {curProject.unit}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Material:</span>
                <span className="text-zinc-100 text-right">{curMaterial.fullLabel}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Pemasangan:</span>
                <span className={withInstall ? "text-zinc-100" : "text-zinc-500"}>
                  {withInstall ? "Termasuk Pasang" : "Workshop Only"}
                </span>
              </div>
            </div>

            <a
              href={getWaLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#ff4a16] text-white px-5 py-3.5 text-sm font-bold hover:bg-[#ff6030] transition-colors cursor-pointer"
            >
              <span>Kirim Rincian ke WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <p className="text-[11px] text-zinc-500 font-mono text-center leading-relaxed">
              *Harga final ditentukan setelah survey lokasi. Konsultasi &amp; survey 100% gratis.
            </p>
          </div>
        </div>

        {/* ── Desktop: inline two-column ── */}
        <div className="hidden lg:grid grid-cols-12 gap-6 items-start">
          {/* Form */}
          <div className="col-span-7 border border-zinc-200 p-5 sm:p-6 space-y-6">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-3">
                1. Kategori Pekerjaan
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PROJECTS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedProject(item.id);
                      setQty(item.defaultQty);
                    }}
                    className={`text-left px-4 py-3.5 border text-sm leading-snug font-semibold transition-colors cursor-pointer ${
                      selectedProject === item.id
                        ? "bg-zinc-900 text-white border-zinc-900"
                        : "bg-white border-zinc-200 text-zinc-700 hover:border-zinc-900"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500">
                  2. Estimasi Ukuran / Kuantitas
                </label>
                <span className="text-sm font-extrabold tracking-tighter text-zinc-900 tabular-nums">
                  {qty} {curProject.unit}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max={curProject.unit === "m²" || curProject.unit === "meter" ? 50 : 10}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="w-full h-1 bg-zinc-200 appearance-none cursor-pointer accent-[#ff4a16]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-3">
                3. Pilihan Material
              </label>
              <div className="grid grid-cols-2 gap-2">
                {MATERIALS.map((mat) => (
                  <button
                    key={mat.id}
                    type="button"
                    onClick={() => setMaterial(mat.id)}
                    className={`text-left px-4 py-3.5 border text-xs leading-snug font-semibold transition-colors cursor-pointer ${
                      material === mat.id
                        ? "bg-zinc-900 text-white border-zinc-900"
                        : "bg-white border-zinc-200 text-zinc-700 hover:border-zinc-900"
                    }`}
                  >
                    {mat.fullLabel}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-3">
                4. Jasa Pasang di Lokasi
              </label>
              <button
                type="button"
                onClick={() => setWithInstall(!withInstall)}
                aria-pressed={withInstall}
                className={`w-full px-4 py-3.5 border text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  withInstall
                    ? "bg-white border-zinc-900 text-zinc-900"
                    : "bg-white border-zinc-200 text-zinc-400 hover:border-zinc-900"
                }`}
              >
                <span>{withInstall ? "Termasuk Pasang di Lokasi Proyek" : "Hanya Fabrikasi Workshop"}</span>
                {withInstall && <Check className="w-4 h-4 stroke-[3]" />}
              </button>
            </div>
          </div>

          {/* Result */}
          <div className="col-span-5 bg-zinc-950 text-white p-8 space-y-7">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-400 block">
                Estimasi Range Anggaran
              </span>
              <p className="text-[2.5rem] font-extrabold tracking-tighter text-white mt-2 leading-none tabular-nums">
                {formatRupiah(low)}
              </p>
              <p className="text-xs font-mono text-zinc-500 mt-2">
                hingga {formatRupiah(high)}
              </p>
            </div>

            <div className="space-y-2.5 pt-5 border-t border-zinc-800 text-xs font-mono text-zinc-400">
              <div className="flex justify-between gap-4">
                <span>Pekerjaan:</span>
                <span className="text-zinc-100 text-right">{curProject.name}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Volume:</span>
                <span className="text-zinc-100">{qty} {curProject.unit}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Material:</span>
                <span className="text-zinc-100 text-right">{curMaterial.fullLabel}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Pemasangan:</span>
                <span className={withInstall ? "text-zinc-100" : "text-zinc-500"}>
                  {withInstall ? "Termasuk Pasang" : "Workshop Only"}
                </span>
              </div>
            </div>

            <a
              href={getWaLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#ff4a16] text-white px-5 py-3.5 text-sm font-bold hover:bg-[#ff6030] transition-colors cursor-pointer"
            >
              <span>Kirim Rincian ke WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <p className="text-[11px] text-zinc-500 font-mono text-center leading-relaxed">
              *Harga final ditentukan setelah survey lokasi. Konsultasi &amp; survey 100% gratis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
