"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { WELD_COMPARISON } from "@/data/welderData";

export default function WeldInspector() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  return (
    <section id="standar" className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <p className="flex items-center gap-3 text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-5">
          <span className="inline-block w-8 h-px bg-[#ff4a16]" />
          {WELD_COMPARISON.kicker}
        </p>
        <div className="max-w-3xl mb-14">
          <h2 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tighter text-zinc-900 leading-[1.02]">
            {WELD_COMPARISON.heading[0]}
            <br />
            {WELD_COMPARISON.heading[1].replace(".", "")}
            <span className="text-[#ff4a16]">.</span>
          </h2>
          <p className="mt-5 text-sm sm:text-base text-zinc-600 leading-relaxed">
            {WELD_COMPARISON.subtext}
          </p>
        </div>

        {/* Versus panels */}
        <div className="border-y-2 border-zinc-900 grid grid-cols-2">
          {/* Bad panel */}
          <div className="px-3 sm:px-10 py-5 sm:py-10 lg:py-12 border-r border-zinc-200">
            <p className="text-[9px] sm:text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-400">
              {WELD_COMPARISON.badTitle} · {WELD_COMPARISON.badBadge}
            </p>
            <p className="mt-2 sm:mt-4 text-2xl sm:text-6xl xl:text-7xl font-extrabold tracking-tighter leading-none text-zinc-300 select-none">
              {WELD_COMPARISON.badBig}
            </p>
            <ul className="hidden sm:block mt-9 space-y-5">
              {WELD_COMPARISON.rows.map((row) => (
                <li key={row.criterion}>
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-400">
                    {row.criterion}
                  </p>
                  <p className="mt-1 text-sm text-zinc-500 leading-relaxed">
                    {row.bad}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Good panel */}
          <div className="px-3 sm:px-10 py-5 sm:py-10 lg:py-12 bg-[#ff4a16]/[0.04]">
            <p className="text-[9px] sm:text-[11px] font-mono uppercase tracking-[0.18em] text-[#ff4a16]">
              {WELD_COMPARISON.goodTitle} · {WELD_COMPARISON.goodBadge}
            </p>
            <p className="mt-2 sm:mt-4 text-2xl sm:text-6xl xl:text-7xl font-extrabold tracking-tighter leading-none text-zinc-900 select-none">
              {WELD_COMPARISON.goodBig.replace(".", "")}
              <span className="text-[#ff4a16]">.</span>
            </p>
            <ul className="hidden sm:block mt-9 space-y-5">
              {WELD_COMPARISON.rows.map((row) => (
                <li key={row.criterion}>
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">
                    {row.criterion}
                  </p>
                  <p className="mt-1 text-sm font-medium text-zinc-900 leading-relaxed">
                    {row.good}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Verdict bar */}
        <div className="grid grid-cols-2">
          <div className="px-3 sm:px-10 py-4 sm:py-6 bg-zinc-100 text-[11px] sm:text-sm text-zinc-500 flex items-center gap-2 sm:gap-3">
            <span className="w-2 h-2 shrink-0 bg-zinc-400" />
            {WELD_COMPARISON.badVerdict}
          </div>
          <div className="px-3 sm:px-10 py-4 sm:py-6 bg-zinc-900 text-[11px] sm:text-sm font-semibold text-white flex items-center gap-2 sm:gap-3">
            <span className="w-2 h-2 shrink-0 bg-[#ff4a16]" />
            {WELD_COMPARISON.goodVerdict}
          </div>
        </div>

        {/* Mobile: tappable criteria → popup */}
        <ul className="mt-8 sm:hidden space-y-3">
          {WELD_COMPARISON.rows.map((row, i) => (
            <li key={row.criterion}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className="w-full text-left px-4 py-3.5 bg-slate-50 border border-slate-200 flex items-center justify-between hover:border-orange-300 transition-colors cursor-pointer"
              >
                <span className="text-xs font-bold text-slate-900">{row.criterion}</span>
                <span className="text-[10px] font-mono text-zinc-400">→</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Popup modal */}
        {active !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-6"
            onClick={() => setActive(null)}
          >
            <div
              className="bg-white w-full sm:max-w-lg sm:rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
                <h3 className="text-sm font-bold text-slate-900">
                  {WELD_COMPARISON.rows[active].criterion}
                </h3>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="p-1 text-zinc-400 hover:text-slate-900 transition-colors cursor-pointer"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="px-5 py-5 space-y-4">
                <div className="p-4 bg-red-50 border border-red-100">
                  <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-red-400 mb-1.5">
                    Las Asal-Asalan
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {WELD_COMPARISON.rows[active].bad}
                  </p>
                </div>
                <div className="p-4 bg-[#ff4a16]/[0.05] border border-[#ff4a16]/20">
                  <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#ff4a16] mb-1.5">
                    Standar Danang
                  </p>
                  <p className="text-sm font-medium text-slate-900 leading-relaxed">
                    {WELD_COMPARISON.rows[active].good}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
