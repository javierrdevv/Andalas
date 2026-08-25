import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import WeldInspector from "@/components/WeldInspector";
import WorkshopSpecs from "@/components/WorkshopSpecs";
import CostEstimator from "@/components/CostEstimator";
import ProcessTimeline from "@/components/ProcessTimeline";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

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
        <CostEstimator />
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
