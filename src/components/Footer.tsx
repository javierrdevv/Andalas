"use client";

import React from "react";
import { useProfile } from "@/lib/useSupabaseData";

export default function Footer() {
  const profile = useProfile();

  return (
    <footer className="border-t border-white/10 bg-zinc-950 text-xs text-zinc-400 font-mono">
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-7 md:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-5">
            <p className="font-bold text-sm tracking-tight text-white">
              {profile.brand}
            </p>
            <p className="mt-1 leading-relaxed">
              {profile.role}
            </p>
          </div>

          {/* Address */}
          <div className="sm:col-span-1 md:col-span-3">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-2">
              Alamat Bengkel &amp; Workshop
            </p>
            <p className="leading-relaxed">{profile.address}</p>
          </div>

          {/* Phone / WA */}
          <div className="sm:col-span-1 md:col-span-2">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-2">
              Telepon / WhatsApp
            </p>
            <a
              href={`https://wa.me/${profile.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-0.5 font-semibold hover:text-[#ff4a16] transition-colors"
            >
              {profile.phone}
            </a>
            <p className="mt-0.5">              ({profile.name})</p>
          </div>

          {/* Hours */}
          <div className="sm:col-span-2 md:col-span-2">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-2">
              Jam Operasional
            </p>
            <p className="leading-relaxed">
              {profile.hours}
            </p>
          </div>
        </div>

        <div className="mt-8 md:mt-10 pt-5 md:pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 sm:gap-x-7 font-semibold">
            <a href="#karya" className="py-1.5 hover:text-[#ff4a16] transition-colors">Portofolio</a>
            <a href="#layanan" className="py-1.5 hover:text-[#ff4a16] transition-colors">Layanan</a>
            <a href="#standar" className="py-1.5 hover:text-[#ff4a16] transition-colors">Standar Las</a>
            <a href="/kalkulator" className="py-1.5 hover:text-[#ff4a16] transition-colors">Estimasi</a>
            <a href="#kontak" className="py-1.5 hover:text-[#ff4a16] transition-colors">Kontak</a>
          </div>
          <p className="text-center sm:text-right">© {new Date().getFullYear()} {profile.brand} · Bengkel Las Danang. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
