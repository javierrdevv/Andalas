import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "AndalLas · Bengkel Las Danang | Tukang Las Kaliwungu, Semarang",
  description:
    "Bengkel las universal di Kaliwungu, Kab. Semarang. Melayani pembuatan kanopi, teralis, pagar, gerbang, pintu lipat, rak besi, custom motor/kendaraan, pengecatan, dan las panggilan ke lokasi.",
  keywords: [
    "tukang las semarang",
    "bengkel las kaliwungu",
    "jasa las kanopi",
    "teralis jendela besi",
    "gerbang besi custom",
    "rak besi custom",
    "las panggilan semarang",
    "custom motor semarang",
    "pengecatan besi",
  ],
  authors: [{ name: "Danang" }],
  openGraph: {
    title: "AndalLas · Bengkel Las Danang | Tukang Las Universal Semarang",
    description:
      "Kanopi, teralis, gerbang, rak besi, custom kendaraan, dan pengecatan. Rapi, kokoh, harga transparan. Melayani panggilan se-Kabupaten Semarang.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="light">
      <body className="min-h-screen bg-white text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
