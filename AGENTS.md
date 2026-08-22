# AGENTS.md

Situs company profile **satu halaman** untuk usaha jasa las. Next.js 15 (App Router) + TypeScript + Tailwind CSS v4, tanpa backend.

## Perintah

```powershell
npm run dev      # dev server di localhost:3000
npm run build    # production build; SEKALIGUS typecheck & prerender statis (verifikasi utama repo ini)
npm run start    # serve hasil build
```

Tidak ada linter terpisah — `npm run build` adalah satu-satunya gerbang verifikasi.

## Konvensi penting

- **Semua konten bisnis** (nama usaha, tagline, layanan, testimoni, jam buka, kontak/WA, sosmed) ada di `src/content.ts`. Edit konten = edit satu file itu; komponen tidak boleh hardcode teks bisnis.
- Situs one-page: satu route `/`, navigasi pakai anchor (`#layanan`, `#tentang`, `#testimoni`, `#kontak`). Section baru harus punya `id` + `scroll-mt-20`.
- Satu-satunya client component adalah `Contact.tsx` (form penawaran, submit hanya menampilkan pesan sukses — belum ada backend). Semua komponen lain wajib server component.
- Tanpa gambar eksternal: ikon = SVG inline, hero = CSS gradient. Foto asli menggantikan nanti.
- Desain lengkap: `docs/superpowers/specs/2026-08-23-situs-jasa-las-onepage-design.md`.

## Catatan

- Nilai di `content.ts` masih placeholder — user akan mengganti dengan data usaha asli.
- Form kirim email = upgrade path via API route + Resend/SMTP saat diminta.
