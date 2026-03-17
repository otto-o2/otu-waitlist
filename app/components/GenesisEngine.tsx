"use client";

import React from "react";
import { Zap, Boxes, Share2, Layers, Binary } from "lucide-react";

const GenesisEngine = () => {
  return (
    <div className="relative w-full max-w-[320px] aspect-[0.7/1] flex items-center justify-center p-4 select-none">
      {/* Outer Casing - Sleek Biotech Hardware */}
      <div className="relative w-full h-full bg-[#1B261B] rounded-[40px] border-2 border-white/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden">
        
        {/* The Digital Core Window */}
        <div className="absolute inset-4 bg-[#0A100A] rounded-[30px] border border-white/10 overflow-hidden flex flex-col p-6">
           
           {/* Moving Hexagon Grid Background */}
           <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
           <div className="absolute inset-0 opacity-[0.1] bg-[radial-gradient(circle_at_center,#9CA764_0%,transparent_70%)] animate-pulse" />

           {/* Top Stats - Synthesis Progress */}
           <div className="relative z-10 flex justify-between items-start mb-8">
              <div className="flex flex-col gap-1">
                 <span className="text-[10px] font-sans font-black text-[#9CA764] uppercase tracking-widest leading-none">Genesis Core</span>
                 <span className="text-[7px] font-sans font-bold text-white/20 uppercase tracking-[0.2em]">Genomic Yield: 98.4%</span>
              </div>
              <Binary className="w-4 h-4 text-[#9CA764]/40" />
           </div>

           {/* Central Core Artifact - The Growing Sprout */}
           <div className="flex-1 relative flex items-center justify-center">
              {/* Rotating Outer Ring */}
              <div className="absolute w-48 h-48 border border-dashed border-[#9CA764]/20 rounded-full animate-[spin_20s_linear_infinite]" />
              
              {/* DNA Double Helix Loop */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                 <div className="absolute inset-0 animate-pulse">
                    <div className="absolute inset-0 border-2 border-[#9CA764]/10 rounded-full scale-110" />
                 </div>
                 
                 {/* The "Micro-Greenhouse" - Morphing Shape */}
                 <div className="relative z-10 w-24 h-24 flex items-center justify-center">
                    <Zap className="w-12 h-12 text-[#9CA764] animate-bounce" style={{ animationDuration: '3s' }} />
                    {/* Floating Nodes */}
                    {[0, 72, 144, 216, 288].map((angle, i) => (
                       <div 
                        key={i}
                        className="absolute w-2 h-2 bg-[#F1E8C7] rounded-full shadow-[0_0_10px_#9CA764]"
                        style={{ 
                          transform: `rotate(${angle}deg) translateY(-40px)`,
                          animation: `ping ${2 + i}s infinite cubic-bezier(0, 0, 0.2, 1)`
                        }}
                       />
                    ))}
                 </div>
              </div>
           </div>

           {/* Synthesis Pathway Display */}
           <div className="mt-8 space-y-4 relative z-10">
              <div className="flex justify-between items-center text-[8px] font-sans font-black uppercase text-white/40 tracking-widest">
                 <span>Synthesis Path</span>
                 <span className="text-[#9CA764]">Active</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                 {[Boxes, Share2, Layers, Binary].map((Icon, i) => (
                    <div key={i} className="aspect-square bg-white/5 rounded-lg border border-white/5 flex items-center justify-center group">
                       <Icon className="w-3 h-3 text-[#9CA764]/40 group-hover:text-[#9CA764] transition-colors" />
                    </div>
                 ))}
              </div>
              {/* Progress Bar */}
              <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full w-2/3 bg-gradient-to-r from-transparent via-[#9CA764] to-transparent animate-[shimmer_2s_infinite]" />
              </div>
           </div>
        </div>

        {/* Technical Labeling on Shell */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-30">
           <p className="text-[7px] font-sans font-black uppercase tracking-[0.5em] text-white">Genesis v4.0</p>
        </div>

        {/* Glossy Polish */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 to-transparent opacity-20" />
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default GenesisEngine;
