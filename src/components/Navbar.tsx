"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { PROFILE } from "@/data/welderData";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Portofolio", href: "#karya" },
    { label: "Layanan", href: "#layanan" },
    { label: "Standar Kualitas", href: "#standar" },
    { label: "Tentang", href: "#tentang" },
    { label: "Estimasi Biaya", href: "#estimasi" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-150 ${
        scrolled
          ? "bg-white border-b border-slate-200 py-3.5 shadow-xs"
          : "bg-white border-b border-slate-200 py-4"
      }`}
    >
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Name */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-slate-900 rounded-md flex items-center justify-center font-bold text-white text-xs">
            AL
          </div>
          <div>
            <span className="font-bold tracking-tight text-slate-900 text-base">
              AndalLas
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

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${PROFILE.whatsapp}?text=Halo%20Mas%20Danang,%20saya%20tertarik%20konsultasi%20jasa%20las%20fabrikasi.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 transition-colors"
          >
            <span>Konsultasi WA</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 bg-slate-100 border border-slate-200"
            aria-label="Toggle Navigation"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden border-b border-slate-200 bg-white px-6 py-5 mt-2 space-y-3 shadow-md">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-slate-700 hover:text-slate-900 py-1.5"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 font-mono">
            {PROFILE.location}
          </div>
        </div>
      )}
    </header>
  );
}
