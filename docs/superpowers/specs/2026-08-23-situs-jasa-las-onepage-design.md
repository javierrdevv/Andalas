# Desain: Situs Jasa Las — One-Page

Tanggal: 2026-08-23 · Status: disetujui user (chat)

## Tujuan
Situs company profile satu halaman untuk usaha jasa las, terinspirasi struktur template Wix "Mekanik/Bengkel Om Ali" (nav anchor, hero CTA, daftar layanan, testimoni, footer kontak) dengan konten dan visual orisinal — bukan salinan aset Wix.

## Stack
- Next.js (App Router, TypeScript) + Tailwind CSS v4
- Tanpa backend, tanpa database, tanpa CMS
- Semua konten statis terpusat di `src/content.ts`

## Struktur Halaman (`/`)
| Section | id | Isi |
|---|---|---|
| Header sticky | — | Nama usaha, nav anchor (Layanan, Tentang, Testimoni, Kontak), tombol WhatsApp |
| Hero | #beranda | "Selamat datang di …" + headline + tagline + CTA "Minta Penawaran" |
| Layanan | #layanan | Grid kartu layanan (pagar besi, kanopi, railing, baja konstruksi, stainless/aluminium, reparasi) |
| Tentang | #tentang | Deskripsi singkat usaha + strip keunggulan/material |
| Testimoni | #testimoni | 3 kutipan pelanggan |
| Kontak | #kontak | Jam buka, telepon/WA, email, alamat + form penawaran |
| Footer | — | Copyright, sosmed |

## Komponen
`Header`, `Hero`, `Services`, `About`, `Testimonials`, `Contact` (client component — satu-satunya yang butuh `"use client"` karena state form), `Footer`. Semua lainnya server components.

## Form Penawaran
- Field: nama, nomor WA/telp, deskripsi kebutuhan (semua HTML5 required)
- Submit client-side: tampilkan pesan sukses inline; belum ada pengiriman email/backend
- Upgrade path: API route + service email (Resend/SMTP) saat dibutuhkan

## Gaya Visual
Industrial gelap dengan aksen oranye "percikan las", tipografi tebal, ikon SVG inline, tanpa gambar eksternal (hindari link mati); foto asli bisa menggantikan gradient hero nanti.

## Data (`src/content.ts`)
Nama usaha, tagline, telepon/WA, email, alamat, jam buka, daftar layanan {judul, deskripsi, ikon}, testimoni {kutipan, nama}, URL sosmed, teks footer. Nilai saat ini adalah placeholder — user mengganti dengan data asli di satu tempat.

## Verifikasi
- `npm run build` lulus (mencakup typecheck)
- Halaman render semua section, anchor nav berfungsi, form menampilkan sukses
- Tidak ada framework testing (situs statis sederhana)

## Di Luar Cakupan (YAGNI untuk v1)
Multi-halaman/routing, blog, galeri dinamis, booking online, kirim email, SEO lanjutan (hanya metadata dasar), analytics.
