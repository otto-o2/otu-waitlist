"use client";

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
    name: "Leaf Notes: Sonification",
    description: "Your monstera is singing. No, really. Transform bio-data into adaptive frequencies and finally understand what 'thirsty' sounds like.",
    href: "#botanical-sonification-detail",
    cta: "Listen to the leaves →",
    className: "md:col-span-1",
    Icon: Music,
    highlights: [
      "Real-time biofeedback — Witness the literal song of your plants as we translate xylem movement into custom soundscapes.",
      "Studio-grade fidelity — Adaptive frequencies shift with humidity and light, creating a living ambient soundtrack for your home.",
      "Emotional baseline tracking — Identify 'distress chords' before visual symptoms occur, becoming a proactive plant parent."
    ],
    background: <div className="absolute inset-0 bg-gradient-to-br from-[#9CA764]/20 to-transparent" />,
    color: "#343D52", // iPod Slate
  },
  {
    id: "ward-mode",
    name: "Ward Mode: Health Hub",
    description: "A full-spectrum plant clinic that lives in your pocket. Diagnose, treat, and watch your green babies actually flourish for once.",
    href: "#ward-mode",
    cta: "System scan →",
    className: "md:col-span-2",
    Icon: ShieldAlert,
    highlights: [
      "Clinical diagnostic core — Our neural engine identifies 400+ pathogens and nutrient deficiencies with surgical precision.",
      "Custom recovery protocols — Receive hour-by-hour treatment plans that adapt to your local weather and home microclimate.",
      "Vitals monitoring — Connect smart hardware or use your camera to track photosynthesis efficiency and turgor pressure."
    ],
    background: <div className="absolute inset-0 bg-[#1B261B]/5 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
    </div>,
    color: "#1B261B", // Deep Botanical
  },
  {
    id: "wild-mode",
    name: "Wild Mode: Discovery",
    description: "Stop walking past rare genomes. Pin the wild, trade locations with collectors, and finally identify that 'thing' on your hike.",
    href: "#wild-mode",
    cta: "Explore the wild →",
    className: "md:col-span-2",
    Icon: Map,
    highlights: [
      "Discovery viewfinder — High-fidelity field guide identifies wild species in mid-trek, even with zero network coverage.",
      "Genomic mapping — Pin your discoveries on a private grid or share rare biome locations with the Otu community.",
      "Collector's network — Connect with local experts to trade seeds, locations, and regional soil secrets."
    ],
    background: <div className="absolute inset-0 bg-[#9CA764]/5">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10" />
    </div>,
    color: "#9CA764", // Matcha Green
  },
  {
    id: "genesis-engine",
    name: "The Genesis Engine: Library",
    description: "A tiny digital universe where your clones and captures live. Infinite scrolling of everything you've ever saved.",
    href: "#genesis-engine",
    cta: "Open vault →",
    className: "md:col-span-1",
    Icon: Dna,
    highlights: [
      "Universal Capture Engine — One central vault for every snapshot, note, and song. Your leaf library, perfectly indexed.",
      "Genetic Archive — Store 'digital clones' of your rarest plants, complete with their historical health records and growth curves.",
      "Holographic Timeline — Scroll through your progress as a botanist, from first sprout to professional greenhouse management."
    ],
    background: <div className="absolute inset-0 bg-gradient-to-t from-[#9CA764]/20 to-transparent" />,
    color: "#1B1C28", // Stellar Onyx
  },
  {
    id: "marketplace",
    name: "Marketplace: Green Economy",
    description: "Trade seeds, book plant-sitters, and connect with people who won't roll their eyes when you talk about soil pH.",
    href: "#marketplace",
    cta: "Enter market →",
    className: "md:col-span-2",
    Icon: ShoppingBag,
    highlights: [
      "Peer-to-peer exchange — The world's most trusted trade network for cuttings, rare seeds, and regional fertilizers.",
      "Book a plant-sitter IRL — Going away? Book a certified plant-sitter to visit your home and keep your babies alive.",
      "Trade, swap, and connect — Exchange cuttings, share regional growing knowledge, and build real neighborhood relationships."
    ],
    background: <div className="absolute inset-0 bg-gradient-to-l from-[#9CA764]/20 to-transparent opacity-30" />,
    color: "#080C08", // Marketplace Black
  },
  {
    id: "compendium",
    name: "Sprout and About: Compendium",
    description: "4,000+ species. Infinite curiosity. One cozy deep-dive for the plant-obsessed — and the lore to make you insufferable.",
    href: "#compendium",
    cta: "Start exploring →",
    className: "md:col-span-1",
    Icon: Library,
    highlights: [
      "4,000+ species, zero pretension — Rich profiles, toxicity guides, and just enough mythology to win any dinner party.",
      "Strategy for the serious collector — Digital yield stats and synthesis guides help you hunt for the rarest Greenhouse genomes.",
      "Written by people who really care — Verified botanists and plant parents contribute field notes and regional growing quirks."
    ],
    background: <div className="absolute inset-0 opacity-20">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')]" />
    </div>,
    color: "#0F1A12", // Compendium Emerald
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

      {/* Bento Grid Section */}
      <section className="relative z-20 px-6 py-32 md:px-12 lg:px-24 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header with Content Map Details */}
          <div className="mb-32 space-y-12 text-center flex flex-col items-center">
            <h2 className="text-4xl md:text-7xl font-sans text-[#1B261B] font-bold leading-tight max-w-4xl tracking-tight">
              everything your plants have been trying <br className="hidden md:block" /> to tell you.
            </h2>
            
            <div className="w-[1px] h-20 bg-[#9CA764]/20" /> {/* Artisanal vertical divider */}
            
            <div className="space-y-4"> {/* Tightened spacing */}
              <p className="text-[14px] md:text-lg font-sans font-black tracking-[0.5em] text-[#9CA764] uppercase">
                otu plant intelligence
              </p>
              <p className="text-lg md:text-4xl font-sans font-black tracking-[0.3em] text-[#1B261B] uppercase">
                scan it. name it. let it live a little.
              </p>
            </div>
          </div>

          <BentoGrid>
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
