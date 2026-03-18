"use client";
// Deployment Trigger: Force refresh thematic updates - v1.0.2

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MeshGradient } from "@paper-design/shaders-react";
import { BentoGrid, BentoCard } from "./components/Bento";
import Mixtape from "./components/Mixtape";
import WardScanner from "./components/WardScanner";
import WildViewfinder from "./components/WildViewfinder";
import GenesisEngine from "./components/GenesisEngine";
import MarketplaceVisual from "./components/MarketplaceVisual";
import CompendiumVisual from "./components/CompendiumVisual";
import Clock from "./components/Clock";
import { 
  ShieldAlert, 
  Map, 
  Dna, 
  Music, 
  ShoppingBag, 
  Library
} from "lucide-react";

const features = [
  {
    id: "ward-mode",
    name: "Ward Mode: Health Hub",
    description: "Full-spectrum plant clinic providing clinical-grade diagnostics and roadmaps to recovery.",
    href: "#ward-mode",
    cta: "System scan →",
    className: "md:col-span-2",
    Icon: ShieldAlert,
    highlights: [
      "The Diagnostics — Neural engine identifies pathogens, nutrient gaps, and atmospheric red flags.",
      "Call to Action — Complete recovery plans synced with local weather and home light conditions.",
      "Farmer's Market Integration — Direct prescription orders for organic elixirs and care packages."
    ],
    background: <div className="absolute inset-0 bg-[#0A1A14]/40 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/10 to-transparent" />
    </div>,
    color: "#0A1A14", // Deep Hospital Emerald
  },
  {
    id: "wild-mode",
    name: "Wild Mode: Field Recon",
    description: "Identify the unknown off-the-grid with high-fidelity local biological data.",
    href: "#wild-mode",
    cta: "Explore the wild →",
    className: "md:col-span-1",
    Icon: Map,
    highlights: [
      "Offline Recognition — Database of 4,000+ species available without satellite connection.",
      "Rarity Rankings — Real-time botanical history and status encounters in the field.",
      "The Log — Living timeline of every unique biological signature identified."
    ],
    background: <div className="absolute inset-0 bg-[#0F160F]/40">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#4ADE80]/10 to-transparent" />
    </div>,
    color: "#0F160F", // Tactical Dark Forest
  },
  {
    id: "botanical-sonification",
    name: "The Chime: Living Data",
    description: "Transform plant bio-data into adaptive frequencies. Finally understand the silence.",
    href: "#botanical-sonification-detail",
    cta: "Listen to the leaves →",
    className: "md:col-span-1",
    Icon: Music,
    highlights: [
      "Gene Signatures — Unique genomic snapshots translated into musical arrangements.",
      "Biological Pulse — Real-time rendering of your home's vital signs into audible streams.",
      "Playlist Gardens — Private curated libraries of living houseplant soundscapes."
    ],
    background: <div className="absolute inset-0 bg-[#13141C]/40" />,
    color: "#13141C", // Obsidian Indigo (The Chime Perfect)
  },
  {
    id: "marketplace",
    name: "Farmer’s Market",
    description: "Bridging the gap between digital diagnosis and physical botanical recovery.",
    href: "#marketplace",
    cta: "Enter market →",
    className: "md:col-span-2",
    Icon: ShoppingBag,
    highlights: [
      "Climate Ranking — Inventory sorted by microclimate thrive-probability in your home.",
      "Prescription Ready — Suggeseted kits based on Ward Mode doctor reports.",
      "Master Gardeners — Direct access to real Humans for 1-on-1 consultations."
    ],
    background: <div className="absolute inset-0 bg-[#1A1A1A]/60 opacity-40">
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent" />
    </div>,
    color: "#1A1A1A", // Deep Graphite
  },
  {
    id: "genesis-engine",
    name: "The Greenhouse: Archive",
    description: "Carry historical health records, growth curves and digital twins in your pocket.",
    href: "#genesis-engine",
    cta: "Open vault →",
    className: "md:col-span-2",
    Icon: Dna,
    highlights: [
      "Digital Twins — Your plant's biological counterpart evolved through physical care.",
      "Genetic Vault — Centuries of biological history stored in a sub-atomic universe.",
      "Growth Simulation — Forward-predictive models for July heat or winter low-light."
    ],
    background: <div className="absolute inset-0 bg-[#1A0A1A]/40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#E040FB]/10 to-transparent" />
    </div>,
    color: "#1A0A1A", // Deep Amethyst
  },
  {
    id: "compendium",
    name: "Sprout and About",
    description: "The neural foundation of the ecosystem covering 4,000+ biological blueprints.",
    href: "#compendium",
    cta: "Start exploring →",
    className: "md:col-span-1",
    Icon: Library,
    highlights: [
      "On-Device Intelligence — Infinite curiosities delivered through local frameworks.",
      "Biological Detail — Toxicity guides, historical footprints, and clinical data.",
      "Global Knowledge — A detailed repository for the world's most serious nerds."
    ],
    background: <div className="absolute inset-0 bg-[#1A1810]/40 opacity-40">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#9CA764]/10 to-transparent" />
    </div>,
    color: "#1A1810", // Dark Brass
  },
];

export default function Home() {
  const [speed] = useState(0.4);

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
          <p className="text-xl md:text-2xl font-sans font-light tracking-[0.6em] text-[#1B261B]/40 ml-[0.6em] lowercase">
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

      {/* Bento Grid Section (Otu Plant Intelligence Sub-Page) */}
      <section className="relative z-20 px-6 py-32 md:px-12 lg:px-24 bg-[#0A0F0A] overflow-hidden">
        {/* Ambient Environmental Lights */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#1B261B]/40 to-transparent pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#9CA764]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header with Content Map Details */}
          <div className="mb-24 space-y-12 text-center flex flex-col items-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <Clock />
              <div className="hidden md:block w-[1px] h-32 bg-[#F1E8C7]/10" />
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-sans text-[#F1E8C7] font-bold leading-[1.1] max-w-2xl tracking-tight text-center md:text-left drop-shadow-2xl">
                they have only <br /> been waiting for this <br /> moment to arrive.
              </h2>
            </div>
            
            <div className="w-[1px] h-20 bg-[#F1E8C7]/10" />
            
            <div className="space-y-4">
              <p className="text-[14px] md:text-lg font-sans font-black tracking-[0.5em] text-[#9CA764] uppercase">
                otu plant intelligence
              </p>
              <p className="text-lg md:text-4xl font-sans font-black tracking-[0.3em] text-[#F1E8C7] uppercase">
                scan it. name it. let it live a little.
              </p>
            </div>
          </div>

          <div className="mb-12 flex flex-col items-center gap-4 group">
             <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#9CA764]/50 to-transparent" />
             <span className="text-[10px] uppercase tracking-[0.8em] font-black text-[#9CA764]/60 ml-[0.8em]">everything we do</span>
          </div>

          <BentoGrid className="auto-rows-[30rem]">
            {features.map((feature) => (
              <BentoCard key={feature.id} {...feature} />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Detailed subsections for each feature */}
      {features.map((feature, index) => (
        <section 
          key={feature.id} 
          id={feature.href.replace("#", "")}
          className={cn(
            "min-h-screen flex items-center px-6 py-24 md:px-12 lg:px-24 border-t border-[#9CA764]/10",
            index % 2 === 0 ? "bg-[#FDFBF7]" : "bg-[#F1E8C7]/30"
          )}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="bg-[#9CA764]/10 p-6 rounded-3xl w-fit">
                <feature.Icon className="h-16 w-16 text-[#9CA764]" />
              </div>
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-sans uppercase tracking-[0.3em] text-[#9CA764] font-black">{feature.name.split(":")[0]}</h2>
                <h3 className="text-4xl md:text-6xl font-sans text-[#1B261B] leading-tight font-bold">
                  {feature.name.split(":")[1] || feature.name}
                </h3>
                <p className="text-xl md:text-2xl text-[#1B261B]/70 font-normal leading-relaxed max-w-xl">
                  {feature.description}
                </p>
              </div>
              <ul className="space-y-6">
                {feature.highlights.map((highlight, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <div className="h-2 w-2 rounded-full bg-[#9CA764] mt-3 shrink-0" />
                    <p className="text-lg text-[#1B261B]/60 font-normal leading-relaxed">{highlight}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative flex items-center justify-center min-h-[500px]">
               {feature.id === "botanical-sonification" ? (
                 <div className="w-full flex justify-center">
                    <Mixtape />
                 </div>
               ) : feature.id === "ward-mode" ? (
                 <div className="w-full flex justify-center">
                    <WardScanner />
                 </div>
               ) : feature.id === "wild-mode" ? (
                 <div className="w-full flex justify-center">
                    <WildViewfinder />
                 </div>
               ) : feature.id === "genesis-engine" ? (
                 <div className="w-full flex justify-center">
                    <GenesisEngine />
                 </div>
               ) : feature.id === "marketplace" ? (
                 <div className="w-full flex justify-center">
                    <MarketplaceVisual />
                 </div>
               ) : feature.id === "compendium" ? (
                 <div className="w-full flex justify-center">
                    <CompendiumVisual />
                 </div>
               ) : (
                 <div className="relative aspect-square rounded-[60px] bg-[#EBE7DD]/30 border border-[#9CA764]/20 overflow-hidden flex items-center justify-center p-6 md:p-12 w-full">
                   <div className="w-full h-full rounded-[40px] bg-[#9CA764]/5 border border-[#9CA764]/10 flex flex-col items-center justify-center group overflow-hidden relative">
                      <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-[#9CA764] to-transparent" />
                      <feature.Icon className="h-32 w-32 text-[#9CA764]/20 group-hover:scale-110 transition-transform duration-700" />
                      <p className="mt-8 text-sm uppercase tracking-widest text-[#9CA764]/40 font-bold relative z-10">Otu {feature.name.split(":")[0]} Engine</p>
                      
                      {/* Abstract floating botanical elements */}
                      <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#9CA764]/10 rounded-full blur-[80px]" />
                      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[#9CA764]/10 rounded-full blur-[100px]" />
                   </div>
                   
                   {/* Floating elements */}
                   <div className="absolute top-10 right-10 w-24 h-24 bg-white/80 rounded-3xl shadow-xl flex items-center justify-center animate-bounce" style={{animationDuration: "3s"}}>
                     <Dna className="text-[#9CA764] h-8 w-8" />
                   </div>
                 </div>
               )}
            </div>
          </div>
        </section>
      ))}

      {/* Footer / Core Stats */}
      <section className="px-6 py-32 md:px-12 lg:px-24 bg-[#1B261B] text-[#F1E8C7]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 p-20 rounded-[80px] border border-white/5 bg-white/5">
            <div className="space-y-6">
              <h4 className="font-sans font-bold text-3xl">Self-Learning Core</h4>
              <p className="text-[#F1E8C7]/60 text-lg leading-relaxed font-normal">Every scan feeds into a personalized growth engine that adapts to your skills.</p>
            </div>
            <div className="space-y-6">
              <h4 className="font-sans font-bold text-3xl">Adaptive UX</h4>
              <p className="text-[#F1E8C7]/60 text-lg leading-relaxed font-normal">Notifications that learn your habits. From "forgetful waterer" to "master botanist".</p>
            </div>
            <div className="space-y-6">
              <h4 className="font-sans font-bold text-3xl">The Integrated Experience</h4>
              <p className="text-[#F1E8C7]/60 text-lg leading-relaxed font-normal">One centralized vault for every capture, from office ferns to rare mountain orchids.</p>
            </div>
          </div>
          
          <div className="mt-32 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <p className="font-sans text-2xl font-bold uppercase tracking-widest">haus der grünen</p>
              <p className="text-white/30 text-[10px] uppercase tracking-[0.4em] font-bold">© 2026 Biology 2.0 Ecosystem</p>
            </div>
            
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-xs uppercase tracking-widest font-bold"
            >
              Back to Top
            </button>

            <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-medium text-center md:text-right">
              Biology 2.0 Ecosystem <br className="md:hidden" />
              <span className="opacity-50">(do not seek life advice)</span>
            </p>
          </div>
        </div>
      </section>

      {/* Global Grain Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply z-[999]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
    </main>
  );
}
