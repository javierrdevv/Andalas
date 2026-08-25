"use client";

import React, { useState } from "react";
import { ArrowRight, MapPin, MessageSquare } from "lucide-react";
import { PROFILE } from "@/data/welderData";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    type: "Kanopi & Atap Besi Custom",
    location: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo Mas Danang, saya ingin konsultasi proyek:

• Nama: ${formData.name}
• No. Kontak: ${formData.phone}
• Jenis Pekerjaan: ${formData.type}
• Lokasi: ${formData.location || "-"}
• Catatan: ${formData.notes || "-"}

Mohon informasi jadwal survey & estimasinya. Terima kasih.`;

    window.open(`https://wa.me/${PROFILE.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section id="kontak" className="py-14 md:py-28 bg-white">
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          {/* Left Info */}
          <div className="lg:col-span-5 space-y-5 md:space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-orange-50 border border-orange-200 text-xs text-orange-700 font-bold uppercase tracking-wider mb-2">
                <MessageSquare className="w-3.5 h-3.5 text-orange-600" />
                KONTAK & LOKASI
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Mulai konsultasikan proyek Anda hari ini
              </h2>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                Silakan kirimkan ukuran kasar, sketsa gambar, atau jadwalkan survey lokasi bersama kami. Respon cepat setiap hari.
              </p>
            </div>

            {/* Map */}
            <div className="pt-1 md:pt-2">
              <div className="border border-slate-200 overflow-hidden bg-zinc-100">
                <iframe
                  title="Lokasi Bengkel AndalLas di Google Maps"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    PROFILE.address
                  )}&z=16&output=embed&hl=id`}
                  className="w-full h-[200px] sm:h-[260px] lg:h-[320px] grayscale hover:grayscale-0 transition-[filter] duration-300"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href="https://share.google/GnnsYJVwgBzYcHEUw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-2.5 py-1.5 text-xs font-mono uppercase tracking-wider text-zinc-500 hover:text-[#ff4a16] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                Buka di Google Maps
              </a>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 lg:rounded-lg p-5 sm:p-6 lg:p-8 lg:shadow-2xs flex flex-col">
            <h3 className="text-base lg:text-lg font-bold text-slate-900 mb-1">
              Formulir Konsultasi Singkat
            </h3>
            <p className="text-xs text-slate-500 mb-5 lg:mb-6">
              Pesan akan langsung terformat rapi ke WhatsApp Mas Danang.
            </p>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-3.5 lg:gap-4 text-base sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 lg:gap-4">
                <div>
                  <label className="block text-slate-700 mb-1.5 font-mono text-xs font-bold">Nama Anda *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Lengkap"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-slate-300 lg:rounded-md p-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1.5 font-mono text-xs font-bold">No. WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0812-xxxx-xxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-slate-300 lg:rounded-md p-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 lg:gap-4">
                <div>
                  <label className="block text-slate-700 mb-1.5 font-mono text-xs font-bold">Jenis Pekerjaan</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-white border border-slate-300 lg:rounded-md p-3 text-slate-900 focus:outline-none focus:border-orange-600"
                  >
                    <option value="Kanopi & Atap Besi Custom">Kanopi & Atap Besi Custom</option>
                    <option value="Pagar, Teralis & Jendela Besi">Pagar, Teralis & Jendela Besi</option>
                    <option value="Gerbang & Pintu Lipat Besi">Gerbang & Pintu Lipat Besi</option>
                    <option value="Rak Besi & Furniture Besi Custom">Rak Besi & Furniture Besi Custom</option>
                    <option value="Custom Motor & Kendaraan">Custom Motor & Kendaraan</option>
                    <option value="Pengecatan & Finishing Besi">Pengecatan & Finishing Besi</option>
                    <option value="Las Panggilan ke Lokasi">Las Panggilan ke Lokasi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 mb-1.5 font-mono text-xs font-bold">Lokasi Proyek</label>
                  <input
                    type="text"
                    placeholder="Contoh: Kaliwungu / Kendal / Kota Semarang"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-white border border-slate-300 lg:rounded-md p-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1.5 font-mono text-xs font-bold">Keterangan Tambahan</label>
                <textarea
                  rows={3}
                  placeholder="Ceritakan detail ukuran, kebutuhan khusus, atau rencana jadwal..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-white border border-slate-300 lg:rounded-md p-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-600"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-5 py-3.5 lg:rounded-md font-bold hover:bg-orange-700 transition-colors cursor-pointer text-sm"
              >
                <span>Kirim Konsultasi ke WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
