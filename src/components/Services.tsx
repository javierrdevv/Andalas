import { services, type ServiceIcon } from "@/content";

function Icon({ name }: { name: ServiceIcon }) {
  const paths: Record<ServiceIcon, React.ReactNode> = {
    fence: (
      <>
        <path d="M3 21V9l2-4 2 4v12M17 21V9l2-4 2 4v12M7 12h10M7 16h10" />
        <path d="M3 21h18" />
      </>
    ),
    canopy: (
      <>
        <path d="M3 11L12 4l9 7M5 11v8m14-8v8M3 19h18" />
      </>
    ),
    railing: (
      <>
        <path d="M4 20V8l8-4 8 4v12M4 14h16M8 20v-6m4 6v-6m4 6v-6" />
      </>
    ),
    beam: (
      <>
        <path d="M4 4h4v16H4zM16 4h4v16h-4zM8 9h8M8 15h8" />
      </>
    ),
    stainless: (
      <>
        <path d="M6 3v6a6 6 0 0012 0V3M9 21l1-4h4l1 4" />
      </>
    ),
    repair: (
      <>
        <path d="M14.7 6.3a4 4 0 00-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 005.4-5.4L15 12l-3-3z" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8 text-orange-500"
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}

export default function Services() {
  return (
    <section id="layanan" className="scroll-mt-20 border-b border-zinc-800">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
          Layanan
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
          Apa yang Bisa Kami Kerjakan
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition hover:border-orange-500/60"
            >
              <Icon name={s.icon} />
              <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
