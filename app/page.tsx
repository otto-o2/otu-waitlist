"use client";
// Deployment Trigger: Force refresh thematic updates - v1.0.2

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MeshGradient } from "@paper-design/shaders-react";
import { BentoGrid, BentoCard } from "./components/Bento";
import Clock from "./components/Clock";
import { 
  ShieldAlert, 
  Map, 
  Dna, 
  Music, 
  ShoppingBag, 
  Library
} from "lucide-react";
import Link from 'next/link';
import { WaitlistForm } from "@/app/components/WaitlistForm";
import { ContactForm } from "@/app/components/ContactForm";
import { BushGreenLogo } from "@/app/components/OtuIcons";

const features = [
  {
    id: "ward-mode",
    name: "Ward Mode: Health Hub",
    href: "/features#ward-mode",
    cta: "System scan",
    className: "md:col-span-2",
    Icon: ShieldAlert,
    color: "#0A1A14", // Deep Hospital Emerald
    background: <div className="absolute inset-0 bg-[#0A1A14]/40 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/10 to-transparent" />
    </div>,
  },
  {
    id: "wild-mode",
    name: "Wild Mode: Adventure is out there!",
    href: "/features#wild-mode",
    cta: "Explore the wild",
    className: "md:col-span-1",
    Icon: Map,
    color: "#061A0C", // Deep Green
    background: <div className="absolute inset-0 bg-[#092110]/50">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#4ADE80]/10 to-transparent" />
    </div>,
  },
  {
    id: "botanical-sonification",
    name: "The Chime: Living Data Compositions",
    href: "/features#botanical-sonification",
    cta: "Listen to the leaves",
    className: "md:col-span-1",
    Icon: Music,
    color: "#13141C", // Obsidian Indigo
    background: <div className="absolute inset-0 bg-[#13141C]/40" />,
  },
  {
    id: "marketplace",
    name: "The Farmer’s Market: Plants and Plant Stuff",
    href: "/features#marketplace",
    cta: "Enter market",
    className: "md:col-span-2",
    Icon: ShoppingBag,
    color: "#1A1A1A", // Deep Graphite
    background: <div className="absolute inset-0 bg-[#1A1A1A]/60 opacity-40">
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent" />
    </div>,
  },
  {
    id: "genesis-engine",
    name: "The Greenhouse: The Alive Archive",
    href: "/features#genesis-engine",
    cta: "Open vault",
    className: "md:col-span-2",
    Icon: Dna,
    color: "#1A0B2E", // Deep Purple
    background: <div className="absolute inset-0 bg-[#1A0B2E]/60 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#E040FB]/10 to-transparent" />
    </div>,
  },
  {
    id: "compendium",
    name: "Sprout and About: The Plant Encyclopedia",
    href: "/features#compendium",
    cta: "Start exploring",
    className: "md:col-span-1",
    Icon: Library,
    color: "#060B06", // Midnight Brass / Forest
    background: <div className="absolute inset-0 bg-[#1A1810]/40 opacity-40">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#9CA764]/10 to-transparent" />
    </div>,
  },
];

export default function Home() {
  const [speed] = useState(0.4);
  const [showContact, setShowContact] = useState(false);

  // Ensure the page always opens at the top (Hero section)
  useEffect(() => {
    const forceScrollTop = () => {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };

    // Immediate attempt
    forceScrollTop();

    // Multiple follow-up attempts to catch layout shifts
    const timers = [10, 50, 100, 500].map(ms => setTimeout(forceScrollTop, ms));
    
    // Also use requestAnimationFrame
    const rafId = requestAnimationFrame(forceScrollTop);

    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <main className="relative bg-[#FDFBF7]">
      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center p-6 md:p-12 lg:p-24">
        <div className="absolute top-8 left-12 font-mono text-[10px] tracking-[0.2em] uppercase text-[#1B261B]/60 hidden md:block z-20">002: NEURAL_MAPPING</div>
        <MeshGradient
          className="w-full h-full absolute inset-0"
          colors={["#FDFBF7", "#F1E8C7", "#EBE7DD", "#9CA764"]}
          speed={speed}
        />

        {/* Lighting overlay effects */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div
            className="absolute top-1/4 left-1/3 w-96 h-96 bg-white/40 rounded-full blur-[120px] animate-pulse"
            style={{ animationDuration: `${6 / speed}s` }}
          />
          <div
            className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-[#F1E8C7]/30 rounded-full blur-[100px] animate-pulse"
            style={{ animationDuration: `${4 / speed}s`, animationDelay: "2s" }}
          />
        </div>

        {/* Branding Title (The Majestic Format) */}
        <div className="relative z-10 text-center flex flex-col items-center gap-6 w-full max-w-[1400px]">
          <p className="text-xl md:text-2xl font-sans font-bold tracking-[0.6em] text-[#1B261B]/80 ml-[0.6em] lowercase drop-shadow-sm">
            (otu)
          </p>
          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2rem, 9.5vw, 7.5rem)",
              letterSpacing: "0.08em",
              lineHeight: "1.2",
              textTransform: "uppercase",
              color: "#1B261B", 
              width: "100%",
            }}
          >
            haus der<br />grünen
          </h1>
        </div>

        {/* Scroll Indicator: Minimalist Vertical Line */}
        <div className="absolute bottom-12 flex flex-col items-center group">
          <div className="w-[1px] h-20 bg-[#1B261B]/10 relative overflow-hidden rounded-full">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-[#9CA764]/40 animate-scroll-line" />
          </div>
        </div>
      </section>

      {/* PAGE 1: THE ANTICIPATION & WAITLIST */}
      <section className="relative z-20 w-full flex flex-col px-6 md:px-12 lg:px-24 bg-[#0A0F0A] overflow-hidden">
        {/* Cute Math Grid Notebook Overlay (Dark Theme) */}
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none" 
          style={{ backgroundImage: "linear-gradient(#9CA764 1px, transparent 1px), linear-gradient(90deg, #9CA764 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        
        {/* --- CLOCK SEGMENT --- */}
        <div className="relative min-h-screen flex flex-col items-center justify-center py-24">
          <div className="absolute top-8 right-12 font-mono text-[10px] tracking-[0.2em] uppercase text-[#9CA764]/70 hidden md:block">001: ANTICIPATE_MODE</div>
          <div className="absolute bottom-12 left-12 font-mono text-[10px] tracking-[0.2em] uppercase text-[#9CA764]/70 hidden md:block">SYSTEM: ACTIVE</div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-[#9CA764]/10 to-transparent pointer-events-none" />
          
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-16 md:gap-24 lg:gap-32 relative z-10 w-full">
            <Clock />
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-sans text-[#F1E8C7] font-bold leading-[1.1] max-w-2xl tracking-tight text-center md:text-left drop-shadow-2xl">
              they have only <br className="hidden md:block" /> been waiting for this <br className="hidden md:block" /> moment to arrive.
            </h2>
          </div>
        </div>

        {/* --- WAITLIST SEGMENT --- */}
        <div className="relative min-h-screen flex flex-col items-center justify-center py-24 pb-40">
          <div className="absolute top-8 left-12 font-mono text-[10px] tracking-[0.2em] uppercase text-[#9CA764]/70 hidden md:block">001.5: INTAKE_PROTOCOL</div>
          <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center gap-12 mt-12 md:mt-0">
            <div className="space-y-6 text-center">
               <h2 className="text-5xl md:text-7xl lg:text-8xl font-sans font-black tracking-tight text-[#F1E8C7] uppercase leading-[0.9] drop-shadow-lg">
                 you kill plants.<br/>
                 <span className="text-[#9CA764]">otu fixes that.</span>
               </h2>
               <div className="w-12 h-px bg-[#9CA764]/50 mx-auto" />
            </div>
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* PAGE 3: THE WORK (EVERYTHING WE DO) */}
      <section id="features" className="relative z-20 px-6 py-40 md:px-12 lg:px-24 bg-[#F1E8C7] overflow-hidden">
        {/* Cute Math Grid Notebook Overlay (Cream Theme) */}
        <div className="absolute inset-0 opacity-[0.12] pointer-events-none" 
          style={{ backgroundImage: "linear-gradient(#1B261B 1px, transparent 1px), linear-gradient(90deg, #1B261B 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-24 flex flex-col items-center gap-8 group">
             <div className="w-px h-16 bg-[#1B261B]/20 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full bg-[#1B261B]/60 animate-scroll-line" />
             </div>
             <div className="text-center space-y-6">
               <h2 className="text-2xl md:text-5xl lg:text-6xl font-mono font-bold tracking-[0.2em] text-[#1B261B]/90 uppercase">
                 EVERYTHING_WE_DO
               </h2>
               <div className="w-16 h-px bg-[#1B261B]/30 mx-auto" />
             </div>
          </div>

          <BentoGrid className="auto-rows-auto grid-rows-[min-content] md:grid-cols-3">
            {features.map((feature) => (
              <BentoCard key={feature.id} {...feature} />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* SEAMLESS INTELLIGENCE + FOOTER SECTION */}
      <section className="relative z-20 w-full bg-[#1B261B] text-[#F1E8C7] overflow-hidden py-32">
        {/* Shared subtle math grid */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none" 
          style={{ backgroundImage: "linear-gradient(#9CA764 1px, transparent 1px), linear-gradient(90deg, #9CA764 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center relative z-10 w-full px-6 md:px-12 lg:px-24">
          
          <div className="space-y-12 max-w-4xl mx-auto flex flex-col items-center">
            
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-sans font-black tracking-widest text-[#F1E8C7] uppercase leading-relaxed drop-shadow-lg">
              good things take time.<br/>so do good apps.<br/>
              we are worth the wait.
            </h2>
            
            <div className="flex flex-col items-center gap-6 font-mono text-[10px] md:text-xs uppercase tracking-[0.15em] font-medium text-white/50 pt-8">
              <BushGreenLogo width={120} className="opacity-80" />
              <p className="text-[#F1E8C7] font-bold text-xs md:text-sm tracking-[0.3em] font-sans">
                © {new Date().getFullYear()} otu plant intelligence (the first version)
              </p>
              <div className="flex gap-6 md:gap-12 opacity-60">
                <Link href="/privacy" className="hover:text-[#F1E8C7] transition-colors cursor-pointer">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-[#F1E8C7] transition-colors cursor-pointer">Terms of Service</Link>
                <span onClick={() => setShowContact(!showContact)} className="hover:text-[#F1E8C7] transition-colors cursor-pointer text-[#9CA764] font-bold">Talk to Us</span>
              </div>
            </div>

            {showContact && (
              <div className="w-full max-w-2xl mx-auto pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-xl md:text-3xl font-sans font-black tracking-widest text-[#9CA764] uppercase mb-8">drop us a line</h3>
                <ContactForm />
              </div>
            )}

            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-8 px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-[10px] uppercase tracking-widest font-bold"
            >
              Back to Top
            </button>

          </div>
        </div>
      </section>

      {/* Global Grain Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply z-[999]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
    </main>
  );
}
