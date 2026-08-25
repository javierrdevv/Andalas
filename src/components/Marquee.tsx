const PHRASE = "Bengkel Las & Fabrikasi Presisi";

export default function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden bg-[#ff4a16] py-4 md:py-5 select-none"
    >
      <div className="flex w-max animate-marquee">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} className="flex items-center whitespace-nowrap">
                <span className="px-5 md:px-7 text-xl md:text-3xl font-extrabold uppercase tracking-tight text-white">
                  {PHRASE}
                </span>
                <span className="text-lg md:text-xl text-zinc-950">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
