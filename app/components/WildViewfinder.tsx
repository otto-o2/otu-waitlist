"use client";

import React from "react";
import { Compass, Map as MapIcon, Target, Camera, Sparkles } from "lucide-react";

const WildViewfinder = () => {
  return (
    <div className="relative w-full max-w-[320px] aspect-[0.7/1] flex items-center justify-center p-4 select-none">
      {/* Viewfinder Frame - Rugged Outdoor Tech */}
      <div className="relative w-full h-full bg-[#1B261B] rounded-[30px] border-4 border-[#2A362A] shadow-[0_50px_100px_-20px_rgba(27,38,27,0.5)] flex flex-col overflow-hidden">
        
        {/* Main Viewport */}
        <div className="absolute inset-4 bg-[#0D140D] rounded-2xl overflow-hidden border border-white/5">
           {/* Background Map Grid (Moving) */}
           <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy-dark.png')] animate-[pan_20s_linear_infinite]" />
           
           {/* Central Targeting Reticle */}
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-40 h-40">
                 {/* Corner Brackets */}
                 <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#9CA764]" />
                 <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#9CA764]" />
                 <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#9CA764]" />
                 <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#9CA764]" />
                 
                 {/* Pulsing Target Circle */}
                 <div className="absolute inset-4 border border-[#9CA764]/20 rounded-full animate-pulse" />
                 
                 {/* Small Rotating Compass Elements */}
                 <div className="absolute inset-0 animate-[spin_15s_linear_infinite]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-3 bg-[#9CA764]" />
                 </div>
              </div>
           </div>

           {/* Captured Leaf Ghost (Floating) */}
           <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <Sparkles className="w-12 h-12 text-[#9CA764] animate-pulse" />
           </div>

           {/* Overlay UI: Coordinates & Biome */}
           <div className="absolute top-4 left-4 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                 <Target className="w-3 h-3 text-[#9CA764]" />
                 <span className="text-[10px] font-sans font-black text-white/60 tracking-widest uppercase">Target Lock</span>
              </div>
              <span className="text-[8px] font-sans font-bold text-[#9CA764]/40">Lat: 52.5200° N | Lon: 13.4050° E</span>
           </div>

           <div className="absolute bottom-4 right-4 flex flex-col items-end gap-1">
              <span className="text-[10px] font-sans font-black text-white/40 uppercase tracking-widest">Biome: Forest Alpha</span>
              <div className="flex gap-1">
                 {[1, 2, 3].map(i => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#9CA764]" />
                 ))}
              </div>
           </div>

           {/* Scanning Sweep Line */}
           <div className="absolute inset-0 flex items-center justify-center opacity-40">
              <div className="w-full h-[1px] bg-[#9CA764] animate-[sweep_3s_ease-in-out_infinite]" />
           </div>
        </div>

        {/* Physical Button Details */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-8">
           <div className="w-12 h-12 rounded-full bg-[#2A362A] border border-white/10 flex items-center justify-center shadow-lg active:scale-90 transition-transform cursor-pointer">
              <MapIcon className="w-5 h-5 text-white/40" />
           </div>
           <div className="w-16 h-16 rounded-full bg-[#9CA764] border-4 border-[#1B261B] flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.3)] group active:scale-95 transition-transform cursor-pointer">
              <Camera className="w-6 h-6 text-[#1B261B] group-hover:scale-110 transition-transform" />
           </div>
           <div className="w-12 h-12 rounded-full bg-[#2A362A] border border-white/10 flex items-center justify-center shadow-lg active:scale-90 transition-transform cursor-pointer">
              <Compass className="w-5 h-5 text-white/40" />
           </div>
        </div>

        {/* Shine Overlay */}
        <div className="absolute inset-0 pointer-events-none rounded-[30px] bg-gradient-to-tr from-white/5 via-transparent to-white/10" />
      </div>

      <style jsx>{`
        @keyframes pan {
          from { background-position: 0 0; }
          to { background-position: 200px 200px; }
        }
        @keyframes sweep {
          0%, 100% { transform: translateY(-100px); opacity: 0; }
          50% { transform: translateY(100px); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default WildViewfinder;
