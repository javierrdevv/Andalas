"use client";

import React from "react";

const STEPS = [
  {
    step: "01",
    title: "Konsultasi & Survey Lokasi",
    desc: "Diskusi kebutuhan spesifik, pengukuran lokasi, pemilihan material yang sesuai, dan estimasi biaya transparan.",
  },
  {
    step: "02",
    title: "Pemotongan & Beveling Presisi",
    desc: "Material dipotong dengan cold saw dan diberi sudut kemiringan (bevel) agar sambungan las tembus sempurna ke inti logam.",
  },
  {
    step: "03",
    title: "Pengelasan di Meja Jig",
    desc: "Pengelasan presisi bertahap dengan kontrol suhu optimal agar struktur tidak melintir dan tetap simetris.",
  },
  {
    step: "04",
    title: "Finishing & Pemasangan",
    desc: "Penghalusan sambungan, aplikasi primer epoxy anti karat, finishing cat/powder coat, dan pemasangan di lokasi Anda.",
  },
];

export default function ProcessTimeline() {
  return (
    <section className="py-20 md:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-12">
        <div className="max-w-2xl mb-14">
          <p className="flex items-center gap-3 text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-5">
            <span className="inline-block w-8 h-px bg-[#ff4a16]" />
            Alur Pengerjaan
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Tahapan pengerjaan dari sketsa hingga terpasang
          </h2>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden relative pl-10">
          {/* Garis vertikal kiri */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-slate-300" />

          <div className="space-y-8">
            {STEPS.map((st) => (
              <div key={st.step} className="relative">
                {/* Dot */}
                <span className="absolute -left-10 top-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-[#ff4a16] text-white text-[9px] font-black font-mono">
                  {st.step}
                </span>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {st.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: 4-col grid — unchanged */}
        <div className="hidden lg:grid grid-cols-4 gap-6">
          {STEPS.map((st) => (
            <div
              key={st.step}
              className="p-6 rounded-lg bg-white border border-slate-200 shadow-2xs flex flex-col justify-between hover:border-orange-300 transition-colors"
            >
              <div>
                <span className="text-3xl font-black font-mono text-orange-600 mb-3 block">
                  {st.step}
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                  {st.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
