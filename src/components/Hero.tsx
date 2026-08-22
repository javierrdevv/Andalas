import { site } from "@/content";

export default function Hero() {
  return (
    <section
      id="beranda"
      className="relative scroll-mt-20 overflow-hidden border-b border-zinc-800"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(249,115,22,0.25),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:repeating-linear-gradient(45deg,#fff_0_1px,transparent_1px_16px)]"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-28 md:py-40">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
          {site.welcome} {site.name}
        </p>
        <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
          {site.heroHeadline}
        </h1>
        <p className="mt-5 max-w-xl text-lg text-zinc-300">{site.tagline}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#kontak"
            className="rounded-full bg-orange-500 px-6 py-3 font-bold text-zinc-950 transition hover:bg-orange-400"
          >
            Minta Penawaran
          </a>
          <a
            href="#layanan"
            className="rounded-full border border-zinc-700 px-6 py-3 font-bold text-zinc-100 transition hover:border-orange-500 hover:text-orange-400"
          >
            Lihat Layanan
          </a>
        </div>
      </div>
    </section>
  );
}
