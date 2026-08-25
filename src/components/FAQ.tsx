"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { FAQS_LIST } from "@/data/welderData";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [items, setItems] = useState<typeof FAQS_LIST>([]);

  useEffect(() => {
    supabase.from("faqs").select("*").order("sort_order").then(({ data }) => {
      if (data && data.length > 0) {
        setItems(data.map((f) => ({ question: f.question, answer: f.answer })));
      }
    });
  }, []);

  const displayItems = items.length > 0 ? items : FAQS_LIST;

  const toggle = (i: number) => {
    setOpenIdx(openIdx === i ? null : i);
  };

  return (
    <section id="faq" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=80"
          alt=""
          fill
          className="object-cover object-center brightness-[.2]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/70 to-zinc-950/90" />
      </div>

      <div className="relative max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-12">
        <div className="max-w-4xl">
          <div className="mb-14">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Pertanyaan yang sering ditanyakan
            </h2>
          </div>

          <div className="space-y-3">
            {displayItems.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-lg bg-white/[0.07] backdrop-blur-sm border transition-colors ${
                    isOpen
                      ? "border-[#ff4a16]/50 bg-white/[0.12]"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#ff4a16] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 sm:px-6 sm:pb-6 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-white/10">
                      <p className="pt-3">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
