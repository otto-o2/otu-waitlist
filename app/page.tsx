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
    id: "botanical-sonification",
    name: "The Chime: Living Data Compositions",
    description: "Transform bio-data into adaptive frequencies and finally understand what your plants are saying.",
    href: "#botanical-sonification-detail",
    cta: "Listen to the leaves",
    className: "md:col-span-1",
    Icon: Music,
    highlights: [
      "Gene Signatures — We translate the unique genome of your plant into a one-of-a-kind musical signature.",
      "Vital Signs — We render biological data and the pulse of your home into an audible stream.",
      "Playlist Gardens — You can now curate a private living library of sound."
    ],
    background: <div className="absolute inset-0 bg-[#13141C]/40" />,
    color: "#13141C", // Obsidian Indigo
  },
  {
    id: "ward-mode",
    name: "Ward Mode: Health Hub",
    description: "Stop the guessing game. The Ward is full-spectrum plant clinic that lives in your pocket, translating silent distress into actionable data, providing a clinical-grade roadmap from diagnosis to full recovery.",
    href: "#ward-mode",
    cta: "System scan",
    className: "md:col-span-2",
    Icon: ShieldAlert,
    highlights: [
      "The Diagnostics — Our neural engine identifies pathogens, nutrient gaps, and atmospheric red flags to bridge prevention and cure.",
      "Call to Action — Receive comprehensive doctor reports and care cards for daily guidance. When your plant loses its balance, The Ward opens you up to the Farmer’s Market, a unique marketplace of tailor-made care packages and organic elixirs specifically prescribed by the Ward.",
      "The Air and the Hour — Receive hour-by-hour care updates that adapt in real-time. By syncing your recovery plan with the local weather and the light in your home, the Ward ensures your collection stays in its flow state, always."
    ],
    background: <div className="absolute inset-0 bg-[#0A1A14]/40 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/10 to-transparent" />
    </div>,
    color: "#0A1A14", // Deep Hospital Emerald
  },
  {
    id: "wild-mode",
    name: "Wild Mode: Adventure is out there!",
    description: "Spot the rare. Name the unknown. All off the grid.",
    href: "#wild-mode",
    cta: "Explore the wild",
    className: "md:col-span-2",
    Icon: Map,
    highlights: [
      "Identify that “thing” on your hike — Our neural engine draws from a massive local database of over four thousand species, providing high-fidelity data even when you are off the grid.",
      "Go beyond the name — Access a deep library of botanical facts, rarity rankings, and the unique history of every plant you encounter.",
      "The Log — Record your finds and map your journey in real-time to build a living timeline of every signature encountered in the field."
    ],
    background: <div className="absolute inset-0 bg-[#0F160F]/40">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#4ADE80]/10 to-transparent" />
    </div>,
    color: "#0F160F", // Tactical Dark Forest
  },
  {
    id: "genesis-engine",
    name: "The Greenhouse: The Alive Archive",
    description: "Your Little Digital Universe",
    href: "#genesis-engine",
    cta: "Open vault",
    className: "md:col-span-1",
    Icon: Dna,
    highlights: [
      "Beyond the Scan — Our engine analyzes the biological makeup of your plant to create unique digital life forms.",
      "The Genetic Vault — Store \"Digital Twins\" of your plants in your pocket universe, carrying historical health records and growth curves. The more you care for the physical plant, the more its digital counterpart evolves within the Greenhouse.",
      "To the future — Use the Greenhouse to simulate years of growth in seconds. By going forward in time you can simulate how a heatwave in July or a low-light winter will impact your plant’s health signature, giving you the data to intervene before the clock even starts."
    ],
    background: <div className="absolute inset-0 bg-[#1A0A1A]/40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#E040FB]/10 to-transparent" />
    </div>,
    color: "#1A0A1A", // Deep Amethyst
  },
  {
    id: "marketplace",
    name: "The Farmer’s Market: Plants and Plant Stuff",
    description: "Bridging the gap between digital diagnosis and physical recovery.",
    href: "#marketplace",
    cta: "Enter market",
    className: "md:col-span-2",
    Icon: ShoppingBag,
    highlights: [
      "A curated inventory of plants ranked by their ability to thrive in your current microclimate.",
      "Data to the Dirt – Utilizing the doctor’s reports from the Ward mode and your Wild Mode logs, the Farmer’s market suggests care packages and tool kits that match your patch.",
      "The Humans behind the Data — Connect with master gardeners for 1-on-1 consultations"
    ],
    background: <div className="absolute inset-0 bg-[#1A1A1A]/60 opacity-40">
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent" />
    </div>,
    color: "#1A1A1A", // Deep Graphite
  },
  {
    id: "compendium",
    name: "Sprout and About: The Plant Encyclopedia",
    description: "Thousands of species and Infinite Curiosities",
    href: "#compendium",
    cta: "Start exploring",
    className: "md:col-span-1",
    Icon: Library,
    highlights: [
      "A detailed repository for the nerds covering four thousand species",
      "The neural foundation of the otu ecosystem as an on-device intelligence framework designed to deliver scans, diagnostics, and recovery strategies.",
      "An encyclopedia to learn and understand biological blueprints, toxicity guides, histories, and clinical data"
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

      {/* PAGE 1: THE ANTICIPATION */}
      <section className="relative z-20 w-full h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 bg-[#0A0F0A] overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-[#9CA764]/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-16 relative z-10">
          <Clock />
          <div className="w-[1px] h-20 bg-[#F1E8C7]/10" />
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-sans text-[#F1E8C7] font-bold leading-[1.1] max-w-2xl tracking-tight text-center drop-shadow-2xl">
            they have only <br /> been waiting for this <br /> moment to arrive.
          </h2>
        </div>
      </section>

      {/* PAGE 2: THE INTELLIGENCE */}
      <section className="relative z-20 w-full h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 bg-[#050805] overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-12 text-center relative z-10">
          <div className="space-y-6">
            <p className="text-[14px] md:text-xl font-sans font-black tracking-[0.8em] text-[#9CA764] uppercase ml-[0.8em]">
              otu plant intelligence
            </p>
            <div className="w-16 h-px bg-[#9CA764]/30 mx-auto" />
            <p className="text-2xl md:text-5xl font-sans font-black tracking-[0.3em] text-[#F1E8C7] uppercase leading-tight">
              scan it. name it. <br /> let it live a little.
            </p>
          </div>
        </div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: "linear-gradient(#9CA764 1px, transparent 1px), linear-gradient(90deg, #9CA764 1px, transparent 1px)", backgroundSize: "100px 100px" }} />
      </section>

      {/* PAGE 3: THE WORK (EVERYTHING WE DO) */}
      <section className="relative z-20 px-6 py-40 md:px-12 lg:px-24 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 flex flex-col items-center gap-6 group">
             <div className="w-px h-16 bg-[#1B261B]/10 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full bg-[#9CA764]/40 animate-scroll-line" />
             </div>
             <span className="text-[12px] md:text-sm uppercase tracking-[1em] font-black text-[#1B261B] ml-[1em]">everything we do</span>
          </div>

          <BentoGrid className="auto-rows-[45rem]">
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
