"use client";

import { useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";
import { BentoGrid, BentoCard } from "./components/Bento";
import { 
  ShieldAlert, 
  Map, 
  Dna, 
  Music, 
  ShoppingBag, 
  Search,
  ChevronDown
} from "lucide-react";

const features = [
  {
    name: "The Clinical Hub: Ward Mode",
    description: "Instant scanning for pests, deficiencies, and bespoke care schedules tailored to your micro-climate.",
    href: "#",
    cta: "Start diagnosis",
    className: "md:col-span-2",
    Icon: ShieldAlert,
    background: <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent" />,
  },
  {
    name: "The Expedition: Wild Mode",
    description: "Identify plants in the wild with a Pokémon-style capture mechanic and GPS journal.",
    href: "#",
    cta: "Join expedition",
    className: "md:col-span-1",
    Icon: Map,
    background: <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent" />,
  },
  {
    name: "The Genesis Engine",
    description: "Every plant scanned is assigned a Unique Genome to spawn a living digital species in your archives.",
    href: "#",
    cta: "Synthesize species",
    className: "md:col-span-1",
    Icon: Dna,
    background: <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/10 to-transparent" />,
  },
  {
    name: "Botanical Sonification",
    description: "Our algorithm translates DNA and health metrics into a unique ambient track. Your garden is your soundtrack.",
    href: "#",
    cta: "Listen to flora",
    className: "md:col-span-2",
    Icon: Music,
    background: <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent" />,
  },
  {
    name: "The Farmer’s Market",
    description: "Connect directly with local experts, buy rare seeds, or call a physical plant-sitter to your home.",
    href: "#",
    cta: "Visit market",
    className: "md:col-span-2",
    Icon: ShoppingBag,
    background: <div className="absolute inset-0 bg-gradient-to-l from-orange-500/10 to-transparent" />,
  },
  {
    name: "The Compendium",
    description: "A deep-dive database of 4,000+ species with digital yield stats and synthesis probabilities.",
    href: "#",
    cta: "Browse library",
    className: "md:col-span-1",
    Icon: Search,
    background: <div className="absolute inset-0 bg-gradient-to-t from-teal-500/10 to-transparent" />,
  },
];

export default function Home() {
  const [speed] = useState(0.6);

  return (
    <main className="relative bg-[#050805]">
      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center p-8">
        <MeshGradient
          className="w-full h-full absolute inset-0"
          colors={["#050805", "#0D140D", "#1B261B", "#2A382A"]}
          speed={speed}
        />

        {/* Lighting overlay effects */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div
            className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#3D5A3D]/20 rounded-full blur-[120px] animate-pulse"
            style={{ animationDuration: `${6 / speed}s` }}
          />
          <div
            className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-white/5 rounded-full blur-[100px] animate-pulse"
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
              color: "rgba(245, 242, 234, 0.90)",
              textShadow: "0 0 40px rgba(255,255,255,0.05)",
              maxWidth: "1400px",
              marginLeft: "0.18em", 
            }}
          >
            haus der<br />grünen
          </h1>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 flex flex-col items-center gap-2 opacity-30 animate-bounce">
          <span className="text-[10px] uppercase tracking-[0.4em] font-semibold">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </div>
      </section>

      {/* Feature Section */}
      <section className="relative z-20 px-6 py-24 md:px-12 lg:px-24 bg-[#050805]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 space-y-4">
            <h2 className="text-xs uppercase tracking-[0.5em] text-white/30 font-bold">The Otu Ecosystem</h2>
            <p className="text-4xl md:text-5xl font-serif text-white/90 leading-tight">
              Where Botany Meets <span className="italic text-white/50">Biology 2.0</span>
            </p>
          </div>

          <BentoGrid>
            {features.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>

          {/* Core Stats Section */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 p-12 rounded-[50px] border border-white/5 bg-[#0D140D] box-shadow-[0_-20px_100px_-20px_#ffffff05_inset]">
            <div className="space-y-2">
              <h4 className="text-white/80 font-serif text-xl">Self-Learning Core</h4>
              <p className="text-white/30 text-sm leading-relaxed">Every scan feeds into a personalized growth engine that adapts to your skills.</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-white/80 font-serif text-xl">Adaptive UX</h4>
              <p className="text-white/30 text-sm leading-relaxed">Notifications that learn your habits. From "forgetful waterer" to "master botanist".</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-white/80 font-serif text-xl">Integrated Experience</h4>
              <p className="text-white/30 text-sm leading-relaxed">One centralized vault for every capture, from office ferns to rare mountain orchids.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ambient Grain Effect (Global) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-screen z-[999]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
    </main>
  );
}
