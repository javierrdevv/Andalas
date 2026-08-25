"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { PROJECTS_LIST, ProjectItem, PROFILE } from "@/data/welderData";

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (!selectedProject) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const pause = useCallback(() => {
    pausedRef.current = true;
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      pausedRef.current = false;
    }, 2500);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const SPEED = 0.35;
    let raf: number;

    const tick = () => {
      if (!pausedRef.current && !selectedProject) {
        el.scrollLeft += SPEED;
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 1) {
          el.scrollLeft = 0;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onInteract = () => pause();
    el.addEventListener("touchstart", onInteract, { passive: true });
    el.addEventListener("mousedown", onInteract);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("touchstart", onInteract);
      el.removeEventListener("mousedown", onInteract);
      clearTimeout(resumeTimer.current);
    };
  }, [pause, selectedProject]);

  return (
    <section id="karya" className="py-14 md:py-28 bg-zinc-950">
      {/* Header */}
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-12 mb-8 md:mb-16 text-center">
        <h2 className="text-3xl sm:text-6xl font-bold tracking-tighter text-white leading-[1.02]">
          Portofolio<span className="text-[#ff4a16]">.</span>
        </h2>
        <p className="mt-3 sm:mt-4 max-w-xl mx-auto text-sm sm:text-base text-zinc-400 leading-relaxed">
          Dari kanopi rumah tinggal sampai custom motor.
          Setiap proyek ditangani langsung oleh Mas Danang, dari survei lokasi,
          pengelasan, sampai finishing.
        </p>
      </div>

      {/* ── Mobile: auto-scroll carousel ── */}
      <div className="lg:hidden">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto px-4 pb-4 -mx-4"
          style={{ scrollbarWidth: "none" }}
        >
          {PROJECTS_LIST.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedProject(item)}
              aria-label={`Lihat detail ${item.title}`}
              className="group shrink-0 w-[75vw] relative block overflow-hidden bg-zinc-900 cursor-pointer focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-[#ff4a16]"
              style={{ height: 240 }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.06]"
                sizes="75vw"
              />

              {/* Info strip */}
              <span className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-zinc-950/95 via-zinc-950/60 to-transparent px-4 pb-3.5 pt-12 text-left">
                <span className="block text-[10px] font-mono uppercase tracking-[0.18em] text-[#ff4a16]">
                  {item.categoryLabel} · {item.location}
                </span>
                <span className="mt-1 block text-sm text-white font-extrabold leading-tight tracking-tight">
                  {item.title}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Desktop: grid wall ── */}
      <div className="hidden lg:grid grid-cols-3">
        {PROJECTS_LIST.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedProject(item)}
            aria-label={`Lihat detail ${item.title}`}
            className="group relative block overflow-hidden bg-zinc-900 cursor-pointer h-[240px] focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-[#ff4a16]"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.06]"
              sizes="25vw"
            />

            {/* Info strip */}
            <span className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-zinc-950/95 via-zinc-950/60 to-transparent px-4 pb-3.5 pt-12 text-left">
              <span className="block text-[10px] font-mono uppercase tracking-[0.18em] text-[#ff4a16]">
                {item.categoryLabel} · {item.location}
              </span>
              <span className="mt-1 block text-white font-extrabold leading-tight tracking-tight text-xl">
                {item.title}
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-6"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-zinc-950 border border-white/15 sm:max-w-3xl w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto relative shadow-2xl sm:rounded-none"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={selectedProject.title}
          >
            <div className="relative aspect-[16/9] w-full bg-zinc-900">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent" />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 bg-white/10 text-zinc-300 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 right-4 sm:left-7 sm:right-7">
                <span className="text-[10px] sm:text-xs font-mono font-medium px-2 py-0.5 bg-[#ff4a16] text-white">
                  {selectedProject.categoryLabel} • Tahun {selectedProject.year}
                </span>
                <h3 className="text-lg sm:text-3xl font-bold text-white mt-2 sm:mt-3 tracking-tight">
                  {selectedProject.title}
                </h3>
              </div>
            </div>

            <div className="p-4 sm:p-7 space-y-4 sm:space-y-5">
              <p className="text-[11px] sm:text-xs text-zinc-500 font-mono uppercase tracking-wider">
                Lokasi Pengerjaan:{" "}
                <span className="text-zinc-300">{selectedProject.location}</span>
              </p>

              <div className="space-y-3 text-sm text-zinc-300">
                <p className="leading-relaxed">{selectedProject.description}</p>
                <div className="p-3 sm:p-4 bg-white/5 border-l-2 border-[#ff4a16] text-xs font-mono space-y-1.5">
                  <p>
                    <strong className="text-white">Material:</strong>{" "}
                    {selectedProject.material}
                  </p>
                  <p>
                    <strong className="text-white">Keunggulan:</strong>{" "}
                    {selectedProject.highlight}
                  </p>
                </div>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-zinc-500">
                  Tertarik membuat proyek serupa?
                </span>
                <a
                  href={`https://wa.me/${PROFILE.whatsapp}?text=Halo%20Mas%20Danang,%20saya%20tertarik%20dengan%20proyek%20${encodeURIComponent(
                    selectedProject.title
                  )}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#ff4a16] text-white px-5 py-2.5 hover:bg-[#ff6030] transition-colors"
                >
                  <span>Konsultasi Proyek Ini</span>
                  <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
