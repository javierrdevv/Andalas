"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, MapPin } from "lucide-react";
import { useProfile } from "@/lib/useSupabaseData";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const profile = useProfile();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { label: "Portofolio", href: "#karya" },
    { label: "Layanan", href: "#layanan" },
    { label: "Standar Kualitas", href: "#standar" },
    { label: "Estimasi Biaya", href: "/kalkulator" },
    { label: "FAQ", href: "#faq" },
    { label: "Kontak", href: "#kontak" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-xs"
            : "bg-white border-b border-slate-200 py-3.5"
        }`}
      >
        <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-slate-900 rounded-md flex items-center justify-center font-bold text-white text-xs">
              AL
            </div>
            <div>
              <span className="font-bold tracking-tight text-slate-900 text-base">
                Andal Las
              </span>
              <span className="hidden sm:inline text-xs text-slate-500 ml-2 font-mono">
                / Fabrikasi Logam
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7 text-sm text-slate-600 font-medium">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-slate-900 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`https://wa.me/${profile.whatsapp}?text=Halo%20Mas%20Danang,%20saya%20tertarik%20konsultasi%20jasa%20las%20fabrikasi.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 transition-colors"
            >
              <span>Konsultasi WA</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile: hamburger only */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 -mr-1 text-slate-700 hover:text-slate-900 transition-colors"
            aria-label="Toggle Navigation"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-[60]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div className="absolute top-0 inset-x-0 bg-white shadow-2xl">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2"
              >
                <div className="w-7 h-7 bg-slate-900 rounded-md flex items-center justify-center font-bold text-white text-[10px]">
                  AL
                </div>
                <span className="font-bold tracking-tight text-slate-900 text-sm">
                Andal Las
                </span>
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="p-2 -mr-2 text-slate-400 hover:text-slate-900 transition-colors"
                aria-label="Tutup menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links */}
            <nav className="px-5 py-4">
              {links.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 py-3 text-sm font-medium text-slate-700 hover:text-slate-900 border-b border-slate-100 last:border-0 transition-colors"
                >
                  <span className="text-[11px] font-mono text-slate-300 w-4">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Bottom CTA */}
            <div className="px-5 pb-5 pt-1 space-y-3">
              <a
                href={`https://wa.me/${profile.whatsapp}?text=Halo%20Mas%20Danang,%20saya%20tertarik%20konsultasi%20jasa%20las%20fabrikasi.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#ff4a16] text-white px-5 py-3 text-sm font-bold hover:bg-[#ff6030] transition-colors"
              >
                <span>Konsultasi via WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-mono">
                <MapPin className="w-3 h-3" />
                {profile.location}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
