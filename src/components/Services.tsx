"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useServices, useProfile } from "@/lib/useSupabaseData";
import { PLACEHOLDER_IMAGES } from "@/lib/placeholders";

export default function Services() {
  const railRef = useRef<HTMLDivElement>(null);
  const services = useServices();
  const profile = useProfile();

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    let down = false;
    let startX = 0;
    let startLeft = 0;
    let moved = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      down = true;
      moved = 0;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      el.scrollLeft = startLeft - dx;
    };
    const onUp = () => {
      down = false;
    };
    const onClickCapture = (e: MouseEvent) => {
      if (moved > 8) {
        e.preventDefault();
        e.stopPropagation();
        moved = 0;
      }
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("click", onClickCapture, true);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  if (services.length === 0) return null;

  return (
    <section id="layanan" className="py-20 md:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tighter text-zinc-900 leading-[1.02]">
            Layanan &amp;
            <br />
            Spesialisasi<span className="text-[#ff4a16]">.</span>
          </h2>
          <p className="mt-5 text-sm sm:text-base text-zinc-600 leading-relaxed">
            Mulai dari konstruksi baja penahan beban hingga karya estetis
            stainless steel berpresisi tinggi. Semua dikerjakan in-house di
            workshop kami.
          </p>
        </div>

        <p className="lg:hidden mb-4 text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-400">
          Geser ke samping untuk melihat semua layanan →
        </p>

        {/* Alternating case-study rows (desktop) / swipe carousel (mobile) */}
        <div
          ref={railRef}
          className="flex cursor-grab active:cursor-grabbing gap-5 overflow-x-auto snap-x snap-proximity [overscroll-behavior-x:contain] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:block lg:space-y-24 lg:overflow-visible lg:pb-0 lg:cursor-auto"
        >
          {services.map((service, idx) => {
            const flipped = idx % 2 === 1;
            const img = service.image || PLACEHOLDER_IMAGES.service;
            return (
              <article
                key={service.id}
                className="relative shrink-0 snap-start w-[66vw] max-w-[270px] h-[320px] overflow-hidden border border-zinc-200 lg:static lg:w-auto lg:max-w-none lg:h-auto lg:overflow-visible lg:border-0 lg:grid lg:gap-14 lg:grid-cols-2 lg:items-center"
              >
                {/* Photo */}
                <div
                  className={`absolute inset-0 overflow-hidden bg-zinc-200 group lg:relative lg:aspect-[4/3] ${
                    flipped ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={img}
                    alt={service.title}
                    fill
                    draggable={false}
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04] select-none"
                    sizes="(max-width: 1024px) 66vw, 50vw"
                  />
                  <span className="absolute top-0 left-0 bg-[#ff4a16] text-white font-mono text-sm font-bold px-3 py-1.5">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Copy */}
                <div
                  className={`absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-zinc-950/95 via-zinc-950/60 to-transparent px-4 pb-4 pt-16 text-left lg:static lg:bg-none lg:p-0 ${
                    flipped ? "lg:order-1" : ""
                  }`}
                >
                  <h3 className="text-base font-extrabold tracking-tight text-white leading-tight lg:text-zinc-900 sm:text-3xl xl:text-4xl">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-[12px] text-zinc-300 font-medium lg:text-[#ff4a16] sm:mt-2 sm:text-base">
                    {service.tagline}
                  </p>
                  <p className="hidden lg:block mt-4 text-sm sm:text-[15px] text-zinc-600 leading-relaxed max-w-xl">
                    {service.description}
                  </p>

                  <div className="hidden lg:block mt-6 space-y-1.5">
                    <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-400">
                      Material
                    </p>
                    <p className="text-sm font-medium text-zinc-800 leading-relaxed">
                      {(service.materials || []).join(" / ")}
                    </p>
                  </div>

                  <p className="hidden lg:block mt-4 text-xs text-zinc-500">
                    Aplikasi:{" "}
                    <span className="font-medium text-zinc-900">
                      {(service.applications || [])[0]}
                    </span>
                  </p>

                  <a
                    href={`https://wa.me/${profile.whatsapp}?text=Halo%20Mas%20Danang,%20saya%20tertarik%20dengan%20layanan%20${encodeURIComponent(
                      service.title
                    )}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link mt-3 lg:mt-7 inline-flex items-center gap-2 sm:gap-3 cursor-pointer"
                  >
                    <span className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-[0.18em] text-[#ff4a16] border-b-2 border-[#ff4a16] pb-0.5 group-hover/link:text-zinc-900 lg:group-hover/link:text-[#ff4a16] transition-colors">
                      Tanya Layanan
                    </span>
                    <span className="w-6 h-6 sm:w-9 sm:h-9 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-900 group-hover/link:bg-[#ff4a16] group-hover/link:border-[#ff4a16] group-hover/link:text-white transition-colors">
                      <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
