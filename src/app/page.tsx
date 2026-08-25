import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import WeldInspector from "@/components/WeldInspector";
import WorkshopSpecs from "@/components/WorkshopSpecs";
import ProcessTimeline from "@/components/ProcessTimeline";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans selection:bg-zinc-900 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Portfolio />
        <Marquee />
        <Services />
        <WeldInspector />
        <WorkshopSpecs />
        <section id="estimasi" className="py-14 md:py-20 bg-white border-b border-slate-200">
          <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-12 text-center space-y-5">
            <p className="flex items-center justify-center gap-3 text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-[0.2em] text-zinc-500">
              <span className="inline-block w-8 h-px bg-[#ff4a16]" />
              Simulasi Biaya
              <span className="inline-block w-8 h-px bg-[#ff4a16]" />
            </p>
            <h2 className="text-2xl sm:text-3xl xl:text-4xl font-extrabold tracking-tighter text-zinc-900 leading-[1.1]">
              Kalkulator estimasi anggaran pengerjaan
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-xl mx-auto">
              Dapatkan perkiraan kasar biaya untuk perencanaan awal Anda.
              Survey lokasi dan konsultasi selalu gratis.
            </p>
            <Link
              href="/kalkulator"
              className="inline-flex items-center gap-2.5 bg-[#ff4a16] text-white px-6 py-3.5 text-sm font-bold hover:bg-[#ff6030] transition-colors"
            >
              <Calculator className="w-4 h-4" />
              Hitung Estimasi Sekarang
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
        <ProcessTimeline />
        <Testimonials />
        <FAQ />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
