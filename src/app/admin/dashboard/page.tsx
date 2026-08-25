"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  User,
  Image,
  Briefcase,
  FolderOpen,
  MessageSquare,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

const CARDS = [
  { href: "/admin/dashboard/profile", label: "Profil Bisnis", icon: User, desc: "Nama, telepon, alamat" },
  { href: "/admin/dashboard/hero", label: "Gambar Hero", icon: Image, desc: "Gambar utama homepage" },
  { href: "/admin/dashboard/services", label: "Layanan", icon: Briefcase, desc: "Kelola daftar layanan" },
  { href: "/admin/dashboard/projects", label: "Portofolio", icon: FolderOpen, desc: "Kelola proyek" },
  { href: "/admin/dashboard/testimonials", label: "Testimoni", icon: MessageSquare, desc: "Ulasan klien" },
  { href: "/admin/dashboard/faq", label: "FAQ", icon: HelpCircle, desc: "Tanya jawab" },
];

export default function DashboardHome() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetch = async () => {
      const [services, projects, testimonials, faqs] = await Promise.all([
        supabase.from("services").select("id", { count: "exact", head: true }),
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("testimonials").select("id", { count: "exact", head: true }),
        supabase.from("faqs").select("id", { count: "exact", head: true }),
      ]);
      setCounts({
        services: services.count ?? 0,
        projects: projects.count ?? 0,
        testimonials: testimonials.count ?? 0,
        faqs: faqs.count ?? 0,
      });
    };
    fetch();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900 mb-1">Kelola Website</h1>
      <p className="text-sm text-slate-500 mb-6">Pilih bagian yang ingin diedit</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CARDS.map((card) => {
          const countKey = card.href.split("/").pop() as string;
          const count = counts[countKey];
          return (
            <Link
              key={card.href}
              href={card.href}
              className="flex items-center gap-4 p-4 bg-white border border-slate-200 hover:border-orange-300 transition-colors group"
            >
              <div className="w-10 h-10 bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-[#ff4a16]/[0.08] transition-colors">
                <card.icon className="w-5 h-5 text-slate-600 group-hover:text-[#ff4a16] transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900">{card.label}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {count !== undefined ? `${count} item` : card.desc}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#ff4a16] transition-colors shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
