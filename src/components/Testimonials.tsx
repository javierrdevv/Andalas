import { testimonials } from "@/content";

export default function Testimonials() {
  return (
    <section id="testimoni" className="scroll-mt-20 border-b border-zinc-800">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
          Testimoni
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
          Kata Pelanggan
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
            >
              <blockquote className="leading-relaxed text-zinc-200">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6">
                <p className="font-bold">{t.name}</p>
                <p className="text-sm text-zinc-400">{t.origin}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
