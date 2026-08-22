import { about } from "@/content";

export default function About() {
  return (
    <section id="tentang" className="scroll-mt-20 border-b border-zinc-800">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
              {about.heading}
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
              Pengalaman yang Bisa Diandalkan
            </h2>
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="mt-4 leading-relaxed text-zinc-300">
                {p}
              </p>
            ))}
          </div>
          <div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {about.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm font-semibold"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 shrink-0 text-orange-500"
                    aria-hidden
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  {h}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-l-4 border-orange-500 pl-4 text-sm italic leading-relaxed text-zinc-400">
              {about.materialsNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
