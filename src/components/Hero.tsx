"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useProfile, useSettings } from "@/lib/useSupabaseData";
import { PLACEHOLDER_IMAGES } from "@/lib/placeholders";

export default function Hero() {
  const profile = useProfile();
  const settings = useSettings();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 639px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const brightness = isMobile ? (settings.hero_brightness_mobile ?? 25) : (settings.hero_brightness ?? 35);
  const gradient = isMobile ? (settings.hero_gradient_mobile ?? 80) : (settings.hero_gradient ?? 70);

  return (
    <section className="relative bg-zinc-950 overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={settings.hero_image || PLACEHOLDER_IMAGES.hero}
          alt=""
          fill
          priority
          className="object-cover object-center"
          style={{ filter: `brightness(${brightness / 100})` }}
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950 to-zinc-950/20"
          style={{ opacity: gradient / 100 }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent" />
      </div>

      <div className="relative max-w-[1400px] w-full mx-auto px-5 sm:px-10 lg:px-14 xl:px-20 py-16 sm:py-24 lg:min-h-[85vh] flex flex-col justify-center">
        <p className="flex items-center gap-3 text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-6">
          <span className="inline-block w-8 h-px bg-[#ff4a16]" />
          Bengkel Las &amp; Fabrikasi Logam · Kaliwungu, Semarang
        </p>

        <h1 className="uppercase font-extrabold tracking-tighter text-white leading-[0.95] text-[13vw] sm:text-7xl xl:text-[84px]">
          Bengkel Las
          <br />
          <span className="text-transparent [-webkit-text-stroke:2px_#d4d4d8]">
            &amp; Fabrikasi
          </span>
          <br />
          Presisi<span className="text-[#ff4a16]">.</span>
        </h1>

        <p className="mt-7 max-w-xl text-sm sm:text-base text-zinc-300 leading-relaxed">
          Kanopi, teralis, gerbang, rak besi, custom motor, sampai pengecatan.
          Semua pekerjaan las dikerjakan langsung oleh Mas Danang.
          Rapi, kokoh, harga transparan. Bisa datang ke workshop atau dipanggil
          ke lokasi Anda.
        </p>

        <div className="mt-8 sm:mt-16 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
          <a
            href={`https://wa.me/${profile.whatsapp}?text=Halo%20Mas%20Danang,%20saya%20mau%20konsultasi%20pembuatan%20las%20besi%20/%20stainless.`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-[#ff4a16] text-white px-6 py-3.5 text-sm font-bold hover:bg-[#ff6030] transition-colors cursor-pointer"
          >
            Konsultasi WhatsApp
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#karya"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 border border-white/25 text-white px-6 py-3.5 text-sm font-semibold hover:border-white hover:bg-white/5 transition-colors"
          >
            Lihat Portofolio
          </a>
        </div>

        <p className="mt-12 text-xs font-mono uppercase tracking-wider text-zinc-400">
          Workshop &amp; Las Panggilan ·{" "}
          <span className="text-white">{profile.location}</span>
        </p>
      </div>
    </section>
  );
}
