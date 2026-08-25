import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import CostEstimator from "@/components/CostEstimator";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const metadata = {
  title: "Kalkulator Estimasi Biaya · Andal Las",
  description:
    "Hitung perkiraan kasar biaya pengerjaan las: kanopi, teralis, gerbang, rak besi, custom motor, dan las panggilan.",
};

export default function KalkulatorPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans selection:bg-zinc-900 selection:text-white">
      <Navbar />
      <main className="flex-1">
        {/* Back button */}
        <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-12 pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
        </div>

        <CostEstimator />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
