"use client";

import React from "react";
import { Settings } from "lucide-react";

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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-orange-50 border border-orange-200 text-xs text-orange-700 font-bold uppercase tracking-wider mb-2">
            <Settings className="w-3.5 h-3.5 text-orange-600" />
            ALUR KERJA
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Tahapan pengerjaan dari sketsa hingga terpasang
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6">
          {STEPS.map((st) => (
            <div
              key={st.step}
              className="p-3 sm:p-6 rounded-lg bg-white border border-slate-200 shadow-2xs flex flex-col justify-between hover:border-orange-300 transition-colors"
            >
              <div>
                <span className="text-lg sm:text-3xl font-black font-mono text-orange-600 mb-1.5 sm:mb-3 block">
                  {st.step}
                </span>
                <h3 className="text-xs sm:text-base font-bold text-slate-900 mb-1 sm:mb-2 leading-snug">
                  {st.title}
                </h3>
                <p className="text-[10px] sm:text-sm text-slate-600 leading-relaxed line-clamp-5 sm:line-clamp-none">
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
