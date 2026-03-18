"use client";

import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FeaturePageLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  visual: ReactNode;
  icon: any;
  color: string;
  className?: string;
}

export default function FeaturePageLayout({
  title,
  subtitle,
  description,
  highlights,
  visual,
  icon: Icon,
  color,
  className
}: FeaturePageLayoutProps) {
  return (
    <main className={cn("min-h-screen relative overflow-hidden bg-[#0A0F0A] text-[#F1E8C7]", className)}>
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
         <div 
           className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px]" 
           style={{ backgroundColor: `${color}30` }}
         />
         <div 
           className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px]" 
           style={{ backgroundColor: `${color}20` }}
         />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 p-6 md:p-12">
        <Link 
          href="/" 
          className="flex items-center gap-4 text-sm font-black uppercase tracking-[0.4em] opacity-60 hover:opacity-100 transition-opacity group"
        >
          <div className="p-3 rounded-full border border-white/10 group-hover:bg-white/5 transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </div>
          Back to Home
        </Link>
      </nav>

      {/* Main Content */}
      <section className="relative z-10 px-6 py-12 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="p-6 rounded-[2.5rem] w-fit border border-white/10" style={{ backgroundColor: `${color}40` }}>
                <Icon className="h-16 w-16" style={{ color: '#9CA764' }} />
              </div>
              <div className="space-y-4">
                <p className="text-sm md:text-xl font-sans font-black tracking-[0.6em] text-[#9CA764] uppercase">
                  {subtitle}
                </p>
                <h1 className="text-5xl md:text-8xl font-sans font-bold tracking-tighter leading-tight drop-shadow-2xl">
                  {title}
                </h1>
                <p className="text-xl md:text-2xl text-[#F1E8C7]/70 font-medium leading-relaxed max-w-xl">
                  {description}
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="w-12 h-px bg-[#9CA764]/30" />
              <ul className="space-y-8">
                {highlights.map((highlight, i) => {
                  const [label, content] = highlight.includes("—") ? highlight.split("—") : highlight.includes("–") ? highlight.split("–") : ["", highlight];
                  return (
                    <li key={i} className="group flex gap-6 items-start">
                      <div className="h-3 w-3 rounded-full bg-[#9CA764]/40 mt-3 shrink-0 group-hover:scale-125 transition-transform" />
                      <p className="text-lg md:text-xl leading-relaxed text-[#F1E8C7]/60 group-hover:text-[#F1E8C7] transition-colors">
                        {label && <strong className="text-[#9CA764] uppercase tracking-wider block mb-1 text-sm">{label.trim()}</strong>}
                        {content.trim()}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="relative flex items-center justify-center min-h-[500px] lg:min-h-[700px]">
             <div className="w-full relative">
                {/* Visual Placeholder for high-end feel if component fails */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[80px] blur-3xl opacity-20" />
                <div className="relative z-10 flex justify-center scale-110 lg:scale-[1.25] transition-transform duration-1000 transform-gpu">
                  {visual}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="relative z-10 p-12 md:p-24 mt-20 opacity-20 pointer-events-none">
        <p className="font-sans text-9xl font-bold uppercase tracking-widest text-[#F1E8C7]/5 select-none text-center">
          {title}
        </p>
      </footer>

      {/* Grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply z-[999]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
    </main>
  );
}
