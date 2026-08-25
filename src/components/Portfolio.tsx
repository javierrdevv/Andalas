"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { PROJECTS_LIST, ProjectItem, PROFILE } from "@/data/welderData";

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

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

  return (
    <section id="karya" className="py-20 md:py-28 bg-zinc-950">
      {/* Header */}
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-12 mb-12 md:mb-16 text-center">
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tighter text-white leading-[1.02]">
          Portofolio<span className="text-[#ff4a16]">.</span>
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-zinc-400 leading-relaxed">
          Dari kanopi rumah tinggal sampai custom motor.
          Setiap proyek ditangani langsung oleh Mas Danang, dari survei lokasi,
          pengelasan, sampai finishing.
        </p>
      </div>

      {/* Full-bleed project wall */}
      <div className="grid grid-cols-2 lg:grid-cols-3">
        {PROJECTS_LIST.map((item, idx) => {
          const wide = idx % 3 === 0;
          return (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedProject(item)}
            aria-label={`Lihat detail ${item.title}`}
            className={`group relative block overflow-hidden bg-zinc-900 cursor-pointer focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-[#ff4a16] ${
              wide
                ? "col-span-2 h-[210px] sm:h-[320px] lg:col-span-1 lg:h-[240px]"
                : "h-[160px] sm:h-[250px] lg:h-[240px]"
            }`}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.06]"
              sizes="(max-width: 1024px) 50vw, 25vw"
            />

            {/* Info strip */}
            <span className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-zinc-950/95 via-zinc-950/60 to-transparent px-4 pb-3.5 pt-12 text-left">
              <span className="block text-[10px] font-mono uppercase tracking-[0.18em] text-[#ff4a16]">
                {item.categoryLabel} · {item.location}
              </span>
              <span
                className={`mt-1 block text-white font-extrabold leading-tight tracking-tight ${
                  wide ? "text-base sm:text-xl" : "text-sm"
                }`}
              >
                {item.title}
              </span>
            </span>
          </button>
          );
        })}
      </div>

      {/* Lightbox Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-zinc-950 border border-white/15 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
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
                className="absolute top-4 right-4 p-1.5 bg-white/10 text-zinc-300 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-5 right-5 sm:left-7 sm:right-7">
                <span className="text-xs font-mono font-medium px-2 py-0.5 bg-[#ff4a16] text-white">
                  {selectedProject.categoryLabel} • Tahun {selectedProject.year}
                </span>
                <h3 className="text-xl sm:text-3xl font-bold text-white mt-3 tracking-tight">
                  {selectedProject.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-7 space-y-5">
              <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider">
                Lokasi Pengerjaan:{" "}
                <span className="text-zinc-300">{selectedProject.location}</span>
              </p>

              <div className="space-y-3 text-sm text-zinc-300">
                <p className="leading-relaxed">{selectedProject.description}</p>
                <div className="p-4 bg-white/5 border-l-2 border-[#ff4a16] text-xs font-mono space-y-1.5">
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

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
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
