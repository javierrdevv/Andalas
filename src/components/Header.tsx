import { site } from "@/content";

const links = [
  { href: "#layanan", label: "Layanan" },
  { href: "#tentang", label: "Tentang" },
  { href: "#testimoni", label: "Testimoni" },
  { href: "#kontak", label: "Kontak" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a href="#beranda" className="flex shrink-0 items-center gap-2 font-black tracking-tight">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-orange-500"
            aria-hidden
          >
            <path d="M13 2L4 14h6l-1 8 9-12h-6z" />
          </svg>
          {site.name}
        </a>
        <nav aria-label="Navigasi utama" className="min-w-0 overflow-x-auto">
          <ul className="flex items-center gap-4 text-sm font-semibold text-zinc-300 md:gap-6">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="whitespace-nowrap hover:text-orange-400">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={`https://wa.me/${site.waNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden shrink-0 rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-zinc-950 transition hover:bg-orange-400 sm:block"
        >
          WhatsApp
        </a>
      </div>
    </header>
  );
}
