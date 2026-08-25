"use client";

import React from "react";
import { MessageSquare } from "lucide-react";
import { useProfile } from "@/lib/useSupabaseData";

export default function FloatingWhatsApp() {
  const profile = useProfile();

  return (
    <aside aria-label="Kontak Cepat WhatsApp" className="fixed bottom-6 right-6 z-40">
      <a
        href={`https://wa.me/${profile.whatsapp}?text=Halo%20Mas%20Danang,%20saya%20tertarik%20konsultasi%20jasa%20las%20fabrikasi.`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-3 rounded-lg shadow-lg shadow-emerald-900/10 transition-colors border border-emerald-500"
        aria-label="Chat WhatsApp Mas Danang"
      >
        <MessageSquare className="w-4 h-4 fill-white" />
        <span>Chat WhatsApp</span>
      </a>
    </aside>
  );
}
