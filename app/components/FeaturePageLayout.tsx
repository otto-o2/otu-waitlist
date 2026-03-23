"use client";

import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FeaturePageLayoutProps {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  visual: ReactNode;
  icon: any;
  color: string;
  backdropColor?: string;
  className?: string;
  hideNav?: boolean;
}

export default function FeaturePageLayout({
  id,
  title,
  subtitle,
  description,
  highlights,
  visual,
  icon: Icon,
  color,
  backdropColor,
  className,
  hideNav = false,
}: FeaturePageLayoutProps) {
  const glowHex = backdropColor || color;
  return (
    <section 
      id={id}
      className={cn("relative overflow-hidden text-[#F1E8C7] py-12 md:py-16", className)}
      style={{ backgroundColor: color }}
    >
      {/* Background Decor (Optimized for performance) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
         <div 
           className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] md:w-[1000px] md:h-[1000px]" 
           style={{ background: `radial-gradient(circle, ${glowHex}30 0%, transparent 70%)` }}
         />
         <div 
           className="absolute bottom-[-150px] left-[-150px] w-[500px] h-[500px] md:w-[800px] md:h-[800px]" 
           style={{ background: `radial-gradient(circle, ${glowHex}20 0%, transparent 70%)` }}
         />
      </div>

      {/* Navigation */}
      {!hideNav && (
        <nav className="relative z-50 p-6 md:p-12 mb-12">
          <Link 
            href="/#features" 
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-[10px] uppercase tracking-widest font-bold group w-fit"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Hub
          </Link>
        </nav>
      )}

      {/* Main Content */}
      <section className="relative z-10 px-6 py-24 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 lg:gap-8">
          
          {/* Header Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
            <div className="space-y-8">
              <div className="p-7 rounded-[2.5rem] w-fit border border-white/10" style={{ backgroundColor: `${color}40` }}>
                <Icon className="h-20 w-20" style={{ color: '#9CA764' }} />
              </div>
              <div className="space-y-6">
                <p className="text-sm md:text-2xl font-sans font-black tracking-[0.6em] text-[#9CA764] uppercase">
                  {subtitle}
                </p>
                <h1 className="text-6xl md:text-9xl font-sans font-bold tracking-tighter leading-[0.9] drop-shadow-2xl">
                  {title}
                </h1>
                <p className="text-xl md:text-2xl text-[#F1E8C7]/70 font-medium leading-relaxed max-w-2xl">
                  {description}
                </p>
              </div>
            </div>
          </div>

          {/* Body Row (List & Graphic aligned) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center">
            
            {/* Left Side: Body List */}
            <div className="space-y-12">
              <div className="space-y-8">
                <div className="w-20 h-px bg-[#9CA764]/30" />
                <ul className="space-y-8">
                  {highlights.map((highlight, i) => {
                    const [label, content] = highlight.includes("—") ? highlight.split("—") : highlight.includes("–") ? highlight.split("–") : ["", highlight];
                    return (
                      <li key={i} className="group flex gap-8 items-start">
                        <div className="h-4 w-4 rounded-full bg-[#9CA764]/40 mt-3 shrink-0 group-hover:scale-125 transition-transform" />
                        <p className="text-xl md:text-2xl leading-relaxed text-[#F1E8C7]/60 group-hover:text-[#F1E8C7] transition-colors">
                          {label && <strong className="text-[#9CA764] uppercase tracking-wider block mb-2 text-sm">{label.trim()}</strong>}
                          {content.trim()}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {!hideNav && (
                <div className="pt-12">
                  <Link 
                    href="/#features"
                    className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-[10px] uppercase tracking-widest font-bold group"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Hub
                  </Link>
                </div>
              )}
            </div>

            {/* Right Side: Graphic vertically centered against the list block */}
            <div className="relative flex items-center justify-center w-full h-full">
               <div className="w-full flex justify-center">
                  {/* Visual Backdrop Glow */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[500px] md:h-[500px] rounded-full opacity-40 md:animate-pulse pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${glowHex}80 0%, transparent 65%)` }}
                  />
                  <div className="relative z-10 w-full flex justify-center transition-all duration-1000 transform md:hover:scale-[1.03] md:hover:translate-y-[-8px]">
                    {visual}
                  </div>
               </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Removed huge spacer footer for continuous feel */}

      {/* Grain */}
      <div className="hidden md:block fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply z-[999]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
    </section>
  );
}
