import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/content";

export const metadata: Metadata = {
  title: `${site.name} — Jasa Las & Konstruksi Besi`,
  description: site.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="bg-zinc-950 text-zinc-100 antialiased">{children}</body>
    </html>
  );
}
