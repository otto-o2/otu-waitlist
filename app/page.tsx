"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { MeshGradient } from "@paper-design/shaders-react";
import { BentoGrid, BentoCard } from "./components/Bento";
import { 
  ShieldAlert, 
  Map, 
  Dna, 
  Music, 
  ShoppingBag, 
  Search,
  ChevronDown,
  Stethoscope,
  Compass,
  Zap,
  Volume2,
  Store,
  Library
} from "lucide-react";

const features = [
  {
    id: "ward-mode",
    name: "The Clinical Hub: Ward Mode",
    description: "Instant scanning for pests, deficiencies, and bespoke care schedules tailored to your micro-climate.",
    href: "#ward-mode-detail",
    cta: "View details",
    className: "md:col-span-2",
    Icon: Stethoscope,
    background: <div className="absolute inset-0 bg-gradient-to-br from-[#9CA764]/20 to-transparent" />,
  },
  {
    id: "wild-mode",
    name: "The Expedition: Wild Mode",
    description: "Identify plants in the wild with a Pokémon-style capture mechanic and GPS journal.",
    href: "#wild-mode-detail",
    cta: "Join expedition",
    className: "md:col-span-1",
    Icon: Compass,
    background: <div className="absolute inset-0 bg-gradient-to-tr from-[#9CA764]/20 to-transparent" />,
  },
  {
    id: "genesis-engine",
    name: "The Genesis Engine",
    description: "Every plant scanned is assigned a Unique Genome to spawn a living digital species in your archives.",
    href: "#genesis-engine-detail",
    cta: "Synthesize species",
    className: "md:col-span-1",
    Icon: Zap,
    background: <div className="absolute inset-0 bg-gradient-to-bl from-[#9CA764]/20 to-transparent" />,
  },
  {
    id: "botanical-sonification",
    name: "The Symphony of Flora",
    description: "Our algorithm translates DNA and health metrics into a unique ambient track. Your garden is your soundtrack.",
    href: "#botanical-sonification-detail",
    cta: "Listen to flora",
    className: "md:col-span-2",
    Icon: Volume2,
    background: <div className="absolute inset-0 bg-gradient-to-r from-[#9CA764]/20 to-transparent" />,
  },
  {
    id: "marketplace",
    name: "The Farmer’s Market",
    description: "Connect directly with local experts, buy rare seeds, or call a physical plant-sitter to your home.",
    href: "#marketplace-detail",
    cta: "Visit market",
    className: "md:col-span-2",
    Icon: Store,
    background: <div className="absolute inset-0 bg-gradient-to-l from-[#9CA764]/20 to-transparent" />,
  },
  {
    id: "compendium",
    name: "The Compendium",
    description: "A deep-dive database of 4,000+ species with digital yield stats and synthesis probabilities.",
    href: "#compendium-detail",
    cta: "Browse library",
    className: "md:col-span-1",
    Icon: Library,
    background: <div className="absolute inset-0 bg-gradient-to-t from-[#9CA764]/20 to-transparent" />,
  },
];

export default function Home() {
  const [speed] = useState(0.4);

  return (
    <main className="relative bg-[#FDFBF7]">
      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center p-8">
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

        {/* Title */}
        <div className="relative z-10 text-center">
          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(3rem, 12vw, 8.5rem)",
              letterSpacing: "0.18em",
              lineHeight: "1.0",
              textTransform: "uppercase",
              color: "#1B261B", // Deep Botanical for visibility
              maxWidth: "1400px",
              marginLeft: "0.18em", 
            }}
          >
            haus der<br />grünen
          </h1>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 flex flex-col items-center gap-2 opacity-50 animate-bounce">
          <span className="text-[10px] uppercase tracking-[0.4em] font-semibold text-[#1B261B]">Scroll</span>
          <ChevronDown className="h-4 w-4 text-[#1B261B]" />
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="relative z-20 px-6 py-32 md:px-12 lg:px-24 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 space-y-6">
            <h2 className="text-sm uppercase tracking-[0.5em] text-[#9CA764] font-bold">The Otu Ecosystem</h2>
            <p className="text-5xl md:text-7xl font-serif text-[#1B261B] leading-tight">
              Where Botany Meets <br /><span className="italic text-[#9CA764]">Biology 2.0</span>
            </p>
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
                <h2 className="text-2xl uppercase tracking-[0.3em] text-[#9CA764] font-bold">{feature.name.split(":")[0]}</h2>
                <h3 className="text-4xl md:text-6xl font-serif text-[#1B261B] leading-tight font-medium">
                  {feature.name.split(":")[1] || feature.name}
                </h3>
                <p className="text-xl md:text-2xl text-[#1B261B]/70 font-light leading-relaxed max-w-xl">
                  {feature.description}
                </p>
              </div>
              <ul className="space-y-6">
                {[1,2,3].map(i => (
                  <li key={i} className="flex gap-4 items-start">
                    <div className="h-2 w-2 rounded-full bg-[#9CA764] mt-3" />
                    <p className="text-lg text-[#1B261B]/80 font-medium">Core feature highlight detail {i} explaining the depth of {feature.name}.</p>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative aspect-square rounded-[60px] bg-[#EBE7DD]/50 border border-[#9CA764]/20 overflow-hidden flex items-center justify-center p-12">
               {/* Visual placeholder for the feature specific illustration/image */}
               <div className="w-full h-full rounded-[40px] bg-[#9CA764]/5 border border-[#9CA764]/10 flex flex-col items-center justify-center group">
                  <feature.Icon className="h-32 w-32 text-[#9CA764]/20 group-hover:scale-110 transition-transform duration-700" />
                  <p className="mt-8 text-sm uppercase tracking-widest text-[#9CA764]/40 font-bold">Otu {feature.name.split(":")[0]} Engine</p>
               </div>
               
               {/* Floating elements */}
               <div className="absolute top-10 right-10 w-24 h-24 bg-white/80 rounded-3xl shadow-xl flex items-center justify-center animate-bounce" style={{animationDuration: "3s"}}>
                 <Dna className="text-[#9CA764]" />
               </div>
               <div className="absolute bottom-10 left-10 w-32 h-32 bg-[#9CA764]/10 rounded-full blur-3xl" />
            </div>
          </div>
        </section>
      ))}

      {/* Footer / Core Stats */}
      <section className="px-6 py-32 md:px-12 lg:px-24 bg-[#1B261B] text-[#F1E8C7]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 p-20 rounded-[80px] border border-white/5 bg-white/5">
            <div className="space-y-6">
              <h4 className="font-serif text-3xl">Self-Learning Core</h4>
              <p className="text-[#F1E8C7]/60 text-lg leading-relaxed font-light">Every scan feeds into a personalized growth engine that adapts to your skills.</p>
            </div>
            <div className="space-y-6">
              <h4 className="font-serif text-3xl">Adaptive UX</h4>
              <p className="text-[#F1E8C7]/60 text-lg leading-relaxed font-light">Notifications that learn your habits. From "forgetful waterer" to "master botanist".</p>
            </div>
            <div className="space-y-6">
              <h4 className="font-serif text-3xl">The Integrated Experience</h4>
              <p className="text-[#F1E8C7]/60 text-lg leading-relaxed font-light">One centralized vault for every capture, from office ferns to rare mountain orchids.</p>
            </div>
          </div>
          
          <div className="mt-32 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="font-serif text-2xl italic">haus der grünen</p>
            <p className="text-white/30 text-xs uppercase tracking-[0.5em] font-bold">© 2026 Biology 2.0 Ecosystem</p>
          </div>
        </div>
      </section>

      {/* Global Grain Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply z-[999]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
    </main>
  );
}
