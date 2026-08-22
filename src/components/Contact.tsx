"use client";

import { useState } from "react";
import { site } from "@/content";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="kontak" className="scroll-mt-20 border-b border-zinc-800">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
          Kontak
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
          Diskusikan Proyek Anda
        </h2>
        <div className="mt-10 grid gap-12 md:grid-cols-2">
          <div className="space-y-8 text-sm leading-relaxed">
            <div>
              <h3 className="font-bold uppercase tracking-wider text-orange-500">
                Jam Buka
              </h3>
              <dl className="mt-2 space-y-1 text-zinc-300">
                {site.hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-4 sm:max-w-xs">
                    <dt>{h.day}</dt>
                    <dd className="font-semibold text-zinc-100">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className="font-bold uppercase tracking-wider text-orange-500">
                Hubungi
              </h3>
              <p className="mt-2 text-zinc-300">
                Telepon/WA:{" "}
                <a href={`https://wa.me/${site.waNumber}`} className="font-semibold text-zinc-100 hover:text-orange-400">
                  {site.phone}
                </a>
              </p>
              <p className="text-zinc-300">
                Email:{" "}
                <a href={`mailto:${site.email}`} className="font-semibold text-zinc-100 hover:text-orange-400">
                  {site.email}
                </a>
              </p>
            </div>
            <div>
              <h3 className="font-bold uppercase tracking-wider text-orange-500">
                Lokasi
              </h3>
              <p className="mt-2 text-zinc-300">{site.address}</p>
            </div>
          </div>

          {submitted ? (
            <div
              role="status"
              className="flex h-fit flex-col items-start gap-4 rounded-xl border border-orange-500/40 bg-orange-500/10 p-6"
            >
              <p className="text-lg font-bold">Terima kasih!</p>
              <p className="text-sm leading-relaxed text-zinc-300">
                Permintaan penawaran Anda sudah tercatat di perangkat ini.
                Untuk respons lebih cepat, hubungi kami langsung via WhatsApp.
              </p>
              <a
                href={`https://wa.me/${site.waNumber}`}
                className="rounded-full bg-orange-500 px-5 py-2.5 font-bold text-zinc-950 transition hover:bg-orange-400"
              >
                Chat WhatsApp
              </a>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="nama" className="mb-1 block text-sm font-semibold">
                  Nama
                </label>
                <input
                  id="nama"
                  name="nama"
                  required
                  autoComplete="name"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label htmlFor="wa" className="mb-1 block text-sm font-semibold">
                  Nomor WhatsApp/Telepon
                </label>
                <input
                  id="wa"
                  name="wa"
                  type="tel"
                  required
                  autoComplete="tel"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label htmlFor="kebutuhan" className="mb-1 block text-sm font-semibold">
                  Kebutuhan Anda
                </label>
                <textarea
                  id="kebutuhan"
                  name="kebutuhan"
                  required
                  rows={4}
                  placeholder="Contoh: pagar besi depan rumah, lebar 4 meter…"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 outline-none focus:border-orange-500"
                />
              </div>
              <button
                type="submit"
                className="rounded-full bg-orange-500 px-6 py-3 font-bold text-zinc-950 transition hover:bg-orange-400"
              >
                Kirim Permintaan Penawaran
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
