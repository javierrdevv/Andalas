import { site } from "@/content";

export default function Footer() {
  return (
    <footer className="py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-sm text-zinc-400 sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. Semua hak dilindungi.
        </p>
        <ul className="flex gap-5">
          {site.socials.map((s) => (
            <li key={s.name}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:text-orange-400"
              >
                {s.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
