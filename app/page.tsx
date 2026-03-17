"use client";

import { useState, useEffect } from "react";
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
    description: "A full-spectrum plant clinic that lives in your pocket. Diagnose, treat, and watch your green babies actually flourish for once.",
    href: "#ward-mode-detail",
    cta: "Enter the ward →",
    className: "md:col-span-2",
    Icon: Stethoscope,
    highlights: [
      "Diagnose in seconds, not days — Point, scan, and otu identifies 50+ pests, diseases, and nutrient deficiencies in under 3 seconds.",
      "Micro-climate memory — Ward Mode maps your home's unique conditions (light, humidity) and builds care schedules that actually work.",
      "A nurse on call, 24/7 — Real-time health alerts ping you before things go sideways. No paperwork. Just thriving plants."
    ],
    background: <div className="absolute inset-0 bg-gradient-to-br from-[#9CA764]/20 to-transparent" />,
  },
  {
    id: "wild-mode",
    name: "The Field Trip: Wild Mode",
    description: "Your field guide to every green thing. Catch, log, and fall in love with plants you didn't know existed.",
    href: "#wild-mode-detail",
    cta: "Head outside →",
    className: "md:col-span-1",
    Icon: Compass,
    highlights: [
      "Tap to catch, no net required — Snap any leaf in the wild and otu identifies it instantly with a satisfying capture animation.",
      "A map that grows with every walk — Every find is geo-tagged to your personal adventure map, building a living catalog.",
      "Go further, get rewarded — Seasonal challenges and biome badges nudge you to wander a little further than usual."
    ],
    background: <div className="absolute inset-0 bg-gradient-to-tr from-[#9CA764]/20 to-transparent" />,
  },
  {
    id: "genesis-engine",
    name: "The Greenhouse: Genesis Engine",
    description: "Every scan grows something new. A tiny digital universe that blooms from your real-world collection, one genome at a time.",
    href: "#genesis-engine-detail",
    cta: "Grow something →",
    className: "md:col-span-1",
    Icon: Zap,
    highlights: [
      "A fingerprint unlike any other — Every scan generates a one-of-a-kind Unique Genome woven from species and health data.",
      "Watch your greenhouse bloom — Your digital collection grows and shifts as your real plants do, reflecting reality.",
      "Hunt for the hidden ones — Certain genome combinations unlock synthesis pathways that sprout entirely new digital hybrid species."
    ],
    background: <div className="absolute inset-0 bg-gradient-to-bl from-[#9CA764]/20 to-transparent" />,
  },
  {
    id: "botanical-sonification",
    name: "Leaf Notes: Symphony of Flora",
    description: "Happy plants hum. Sad ones don't. Otu turns your garden's whole mood into a living ambient track you can actually feel.",
    href: "#botanical-sonification-detail",
    cta: "Hear your garden →",
    className: "md:col-span-2",
    Icon: Volume2,
    highlights: [
      "Every plant, a different note — Otu translates genome and growth stages into a track that belongs to it and only it.",
      "Mood you can actually hear — A happy plant hums lush and warm; a struggling one shifts toward something urgent.",
      "Your garden's soundtrack, on shuffle — Export your collection's living score as a playlist or let it drift through your space."
    ],
    background: <div className="absolute inset-0 bg-gradient-to-r from-[#9CA764]/20 to-transparent" />,
  },
  {
    id: "marketplace",
    name: "The Farmer's Market: Marketplace",
    description: "Rare seeds, local experts, and on-demand plant-sitters — all within reach. The green economy, hyper-local.",
    href: "#marketplace-detail",
    cta: "Visit the market →",
    className: "md:col-span-2",
    Icon: Store,
    highlights: [
      "Hyper-local, hand-picked listings — Browse verified plant experts, rare seed sellers, and suppliers within your city.",
      "Book a plant-sitter IRL — Going away? Book a certified plant-sitter to visit your home and keep your babies alive.",
      "Trade, swap, and connect — Exchange cuttings, share regional growing knowledge, and build real neighborhood relationships."
    ],
    background: <div className="absolute inset-0 bg-gradient-to-l from-[#9CA764]/20 to-transparent" />,
  },
  {
    id: "compendium",
    name: "Sprout and About: Compendium",
    description: "4,000+ species. Infinite curiosity. One cozy deep-dive for the plant-obsessed — and the lore to make you insufferable.",
    href: "#compendium-detail",
    cta: "Start exploring →",
    className: "md:col-span-1",
    Icon: Library,
    highlights: [
      "4,000+ species, zero pretension — Rich profiles, toxicity guides, and just enough mythology to win any dinner party.",
      "Strategy for the serious collector — Digital yield stats and synthesis guides help you hunt for the rarest Greenhouse genomes.",
      "Written by people who really care — Verified botanists and plant parents contribute field notes and regional growing quirks."
    ],
    background: <div className="absolute inset-0 bg-gradient-to-t from-[#9CA764]/20 to-transparent" />,
  },
];

export default function Home() {
  const [speed] = useState(0.4);

  // Ensure the page always opens at the top (Hero section)
  useEffect(() => {
    // Force scroll to top on mount
    window.scrollTo(0, 0);
    // Handle potential browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
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
          <p className="text-xs md:text-sm font-medium tracking-[0.5em] text-[#1B261B]/30 ml-[0.5em] lowercase">
            (otu)
          </p>
          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 11vw, 9rem)",
              letterSpacing: "0.08em",
              lineHeight: "1.0",
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
            <h2 className="text-4xl md:text-7xl font-serif text-[#1B261B] italic leading-tight max-w-4xl tracking-tight">
              everything your plants have been trying <br className="hidden md:block" /> to tell you.
            </h2>
            
            <div className="w-[1px] h-20 bg-[#9CA764]/20" /> {/* Artisanal vertical divider */}
            
            <div className="space-y-6">
              <p className="text-sm md:text-lg font-bold tracking-[0.4em] text-[#1B261B] uppercase">
                scan it. name it. let it live a little.
              </p>
              <p className="text-xs md:text-sm font-serif italic text-[#1B261B]/40 tracking-[0.3em] lowercase">
                otu is for plants. (human errors may occur)
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
                <h2 className="text-2xl uppercase tracking-[0.3em] text-[#9CA764] font-bold">{feature.name.split(":")[0]}</h2>
                <h3 className="text-4xl md:text-6xl font-serif text-[#1B261B] leading-tight font-medium">
                  {feature.name.split(":")[1] || feature.name}
                </h3>
                <p className="text-xl md:text-2xl text-[#1B261B]/70 font-light leading-relaxed max-w-xl">
                  {feature.description}
                </p>
              </div>
              <ul className="space-y-6">
                {feature.highlights.map((highlight, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <div className="h-2 w-2 rounded-full bg-[#9CA764] mt-3 shrink-0" />
                    <p className="text-lg text-[#1B261B]/80 font-medium">{highlight}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative aspect-square rounded-[60px] bg-[#EBE7DD]/50 border border-[#9CA764]/20 overflow-hidden flex items-center justify-center p-12">
               {/* Visual placeholder for the feature specific illustration/image */}
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
            <div className="flex flex-col items-center md:items-start gap-2">
              <p className="font-serif text-2xl italic">haus der grünen</p>
              <p className="text-white/30 text-[10px] uppercase tracking-[0.4em] font-bold">© 2026 Biology 2.0 Ecosystem</p>
            </div>
            
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-xs uppercase tracking-widest font-bold"
            >
              Back to Top
            </button>

            <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-medium text-center md:text-right">
              <span className="italic">otu is for plants.</span> <br className="md:hidden" />
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
