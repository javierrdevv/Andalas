"use client";

import React from "react";
import Image from "next/image";
import { useProfile, useSettings } from "@/lib/useSupabaseData";
import { PLACEHOLDER_IMAGES } from "@/lib/placeholders";

const SCREW =
  "absolute z-10 w-2 h-2 rounded-full border-[1.5px] border-zinc-500 bg-zinc-300";

export default function WorkshopSpecs() {
  const profile = useProfile();
  const settings = useSettings();

  return (
    <section
      id="tentang"
      className="py-14 md:py-20 bg-slate-50 border-b border-slate-200"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="relative border-2 border-zinc-900 bg-white shadow-[6px_6px_0_0_#18181b]">
          <span aria-hidden="true" className={`${SCREW} top-1.5 left-1.5`} />
          <span aria-hidden="true" className={`${SCREW} top-1.5 right-1.5`} />
          <span aria-hidden="true" className={`${SCREW} bottom-1.5 left-1.5`} />
          <span aria-hidden="true" className={`${SCREW} bottom-1.5 right-1.5`} />

          <header className="border-b-2 border-zinc-900 bg-zinc-950 pl-7 pr-5 sm:pl-10 sm:pr-8 py-2.5 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.18em]">
            <span className="text-zinc-400 truncate sm:hidden">
              {profile.brand}
            </span>
            <span className="text-zinc-400 truncate hidden sm:inline">
              {profile.brand} · Bengkel Las &amp; Fabrikasi Besi
            </span>
            <span className="text-zinc-600 hidden md:block">
              Kaliwungu · Kab. Semarang
            </span>
            <span className="text-[#ff4a16] shrink-0">
              No. Plat AL-{profile.completed_projects}
            </span>
          </header>

          <div className="grid lg:grid-cols-12">
            <figure className="lg:col-span-5 border-b-2 lg:border-b-0 lg:border-r-2 border-zinc-900 flex flex-col">
              <div className="relative aspect-[16/10] lg:aspect-auto lg:flex-1 lg:min-h-[420px] overflow-hidden bg-zinc-200">
                <Image
                  src={settings.about_image || PLACEHOLDER_IMAGES.about}
                  alt={`${profile.name}, pemilik bengkel las ${profile.brand}, sedang mengelas di workshop`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <figcaption className="px-5 py-3 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500 border-t-2 border-zinc-900">
                <span>{profile.name} · Pemilik &amp; Tukang Las</span>
                <span
                  aria-hidden="true"
                  className="inline-block w-6 h-px bg-[#ff4a16]"
                />
              </figcaption>
            </figure>

            <div className="lg:col-span-7 p-5 sm:p-8 xl:p-10 flex flex-col">
              <p className="flex items-center gap-3 text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-5">
                <span className="inline-block w-8 h-px bg-[#ff4a16]" />
                Tentang Kami
              </p>
              <h2 className="text-2xl sm:text-3xl xl:text-4xl font-extrabold tracking-tighter text-zinc-900 leading-[1.1] max-w-xl">
                Kerja las itu soal ukuran yang pas dan sambungan yang kuat.
                Sisanya kerapian.
              </h2>

              <div className="mt-6 space-y-4 max-w-2xl text-sm sm:text-base text-zinc-600 leading-relaxed">
                <p>
                  Saya memulai pekerjaan las sejak tahun 2012 dari bengkel
                  kecil di Kaliwungu. Dari kanopi rumah tetangga sampai rak
                  gudang yang harus presisi milimeter, prinsipnya sama: ukur
                  dua kali, las sekali, dan pastikan hasilnya siap pasang tanpa
                  perlu dibetulkan lagi.
                </p>
                <p>
                  Semua dikerjakan sendiri dengan alat standar industri seperti
                  mesin
                  las inverter, gerinda potong &amp; bor duduk, plus pengecatan
                  yang rapi agar besi tidak cepat berkarat di cuaca Semarang.
                </p>
              </div>

              <dl className="mt-8 lg:mt-auto lg:pt-8 grid grid-cols-2 border-t-2 border-zinc-900">
                <div className="pt-4 pr-6">
                  <dt className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-zinc-900 leading-none">
                    {profile.completed_projects}+
                  </dt>
                  <dd className="mt-2 text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">
                    Proyek selesai
                  </dd>
                </div>
                <div className="pt-4 pl-6 border-l-2 border-zinc-900">
                  <dt className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-[#ff4a16] leading-none">
                    {profile.experience_years}+
                  </dt>
                  <dd className="mt-2 text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">
                    Tahun pengalaman
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <footer className="border-t-2 border-zinc-900 grid sm:grid-cols-3 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-zinc-900">
            <div className="px-5 py-4">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-400">
                Layanan
              </p>
              <p className="mt-1.5 text-sm text-zinc-800">
                <span className="font-bold">{profile.brand}</span>:
                kanopi, teralis, gerbang, rak, custom kendaraan &amp;
                pengecatan
              </p>
            </div>
            <div className="px-5 py-4">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-400">
                Jam Operasional
              </p>
              <p className="mt-1.5 text-sm text-zinc-800 font-bold">
                {profile.hours}
              </p>
            </div>
            <div className="px-5 py-4">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-400">
                Lokasi Workshop
              </p>
              <p className="mt-1.5 text-sm text-zinc-800">{profile.address}</p>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}
