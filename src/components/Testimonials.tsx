"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { TESTIMONIALS_LIST } from "@/data/welderData";

export default function Testimonials() {
  const [items, setItems] = useState<typeof TESTIMONIALS_LIST>([]);

  useEffect(() => {
    supabase.from("testimonials").select("*").order("sort_order").then(({ data }) => {
      if (data && data.length > 0) {
        setItems(data.map((t) => ({
          id: t.id,
          name: t.name,
          role: t.role,
          location: t.location,
          comment: t.comment,
          project: t.project,
        })));
      }
    });
  }, []);

  const displayItems = items.length > 0 ? items : TESTIMONIALS_LIST;

  return (
    <section className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-12">
        <div className="max-w-2xl mb-14">
          <p className="flex items-center gap-3 text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-5">
            <span className="inline-block w-8 h-px bg-[#ff4a16]" />
            Testimoni Klien
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Yang kata mereka soal hasil kerja kami
          </h2>
        </div>

        {/* Mobile: swipe per kartu */}
        <div className="lg:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory [overscroll-behavior-x:contain] -mx-4 px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {displayItems.map((item) => (
            <div
              key={item.id}
              className="shrink-0 snap-center w-[85vw] max-w-[340px] border border-slate-200 bg-white flex flex-col"
            >
              <div className="px-5 pt-5 pb-4 h-40 flex items-start">
                <p className="text-sm text-slate-700 leading-relaxed italic line-clamp-5">
                  &ldquo;{item.comment}&rdquo;
                </p>
              </div>
              <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 mt-auto">
                <div>
                  <p className="text-sm font-bold text-slate-900">{item.name}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {item.role} · {item.location}
                  </p>
                </div>
                <span className="shrink-0 text-[10px] font-mono font-semibold text-[#ff4a16] bg-[#ff4a16]/[0.06] px-2.5 py-1 border border-[#ff4a16]/15">
                  {item.project}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: 3-col */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {displayItems.map((item) => (
            <div key={item.id} className="flex flex-col justify-between border border-slate-200 bg-white hover:border-orange-300 transition-colors">
              <div className="px-6 pt-6 pb-4">
                <p className="text-[15px] text-slate-700 leading-relaxed italic">
                  &ldquo;{item.comment}&rdquo;
                </p>
              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 mt-auto">
                <p className="text-sm font-bold text-slate-900">{item.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {item.role} · {item.location}
                </p>
                <span className="inline-block mt-2.5 text-[10px] font-mono font-semibold text-[#ff4a16] bg-[#ff4a16]/[0.06] px-2.5 py-1 border border-[#ff4a16]/15">
                  {item.project}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
