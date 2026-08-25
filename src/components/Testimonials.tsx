"use client";

import React from "react";
import { Star, MessageSquareQuote } from "lucide-react";
import { TESTIMONIALS_LIST } from "@/data/welderData";

export default function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-12">
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-orange-50 border border-orange-200 text-xs text-orange-700 font-bold uppercase tracking-wider mb-2">
            <MessageSquareQuote className="w-3.5 h-3.5 text-orange-600" />
            TESTIMONI KLIEN
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Pengalaman klien yang telah mempercayakan proyeknya
          </h2>
        </div>

        <div className="flex gap-4 overflow-x-auto snap-x snap-proximity [overscroll-behavior-x:contain] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:pb-0">
          {TESTIMONIALS_LIST.map((item) => (
            <div
              key={item.id}
              className="shrink-0 snap-start w-[76vw] max-w-[330px] p-4 sm:p-7 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-orange-300 transition-colors lg:w-auto lg:max-w-none"
            >
              <div>
                <div className="flex items-center gap-1 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4 sm:mb-6">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-slate-200">
                <p className="text-sm font-bold text-slate-900">{item.name}</p>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">{item.role} • {item.location}</p>
                <div className="mt-2 sm:mt-2.5">
                  <span className="inline-block text-[10px] sm:text-[11px] font-semibold text-orange-800 bg-orange-100 border border-orange-200 px-2 py-0.5 rounded font-mono">
                    Proyek: {item.project}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
