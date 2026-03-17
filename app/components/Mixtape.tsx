"use client";

import React from "react";
import { Play, SkipBack, SkipForward, Volume2, Music } from "lucide-react";

const Mixtape = () => {
  return (
    <div className="relative w-full max-w-[280px] aspect-[0.62/1] flex items-center justify-center p-4 select-none">
      {/* iPod Mini Shell - Anodized Botanical Green */}
      <div className="relative w-full h-full bg-gradient-to-b from-[#9CA764] to-[#7A8542] rounded-[35px] border-x-[1px] border-t-[1px] border-white/20 shadow-[0_50px_100px_-20px_rgba(27,38,27,0.5),inset_0_2px_5px_rgba(255,255,255,0.3)] flex flex-col p-6 overflow-hidden">
        
        {/* Subtle Metallic Grain */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]" />

        {/* Screen Area - Backlit Monochromatic LCD */}
        <div className="relative w-full aspect-[1.3/1] bg-[#D4E2D4] rounded-lg border-2 border-black/5 shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col p-4">
          {/* LCD Pixel Grid Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[repeating-linear-gradient(0deg,#000,#000_1px,transparent_1px,transparent_2px),repeating-linear-gradient(90deg,#000,#000_1px,transparent_1px,transparent_2px)]" />
          
          {/* Top Status Bar */}
          <div className="flex justify-between items-center mb-2">
            <Play className="w-2 h-2 fill-black/60 text-black/60" />
            <div className="flex gap-1">
              <div className="w-4 h-2 border border-black/40 rounded-[1px] relative">
                <div className="absolute inset-y-0 left-0 w-3/4 bg-black/60" />
              </div>
            </div>
          </div>

          {/* Now Playing Content with "Moving Parts" Spools */}
          <div className="flex-1 flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-4">
               {/* Animated Small Reels on Screen */}
               <div className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center animate-[spin_8s_linear_infinite]">
                  <div className="w-1 h-3 bg-black/40 rounded-full" />
               </div>
               <div className="flex flex-col items-center">
                  <span className="text-[10px] font-sans font-black uppercase tracking-tighter text-black/80 leading-none">leaf notes</span>
                  <span className="text-[7px] font-sans font-bold text-black/40">otu intelligence</span>
               </div>
               <div className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center animate-[spin_8s_linear_infinite]">
                  <div className="w-1 h-3 bg-black/40 rounded-full" />
               </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-1 bg-black/10 rounded-full mt-4 relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-2/3 bg-black/60" />
            </div>
            <div className="w-full flex justify-between mt-1">
              <span className="text-[6px] font-sans font-bold text-black/40">2:45</span>
              <span className="text-[6px] font-sans font-bold text-black/40">-1:15</span>
            </div>
          </div>
        </div>

        {/* Click Wheel Area */}
        <div className="flex-1 flex items-center justify-center mt-4">
           <div className="relative w-40 h-40 bg-[#FDFBF7] rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.1),inset_0_-2px_5px_rgba(0,0,0,0.05)] flex items-center justify-center border border-black/5 group cursor-pointer transition-transform hover:scale-[1.02]">
              {/* Labels on Wheel */}
              <span className="absolute top-4 text-[9px] font-sans font-black uppercase tracking-widest text-[#1B261B]/40">Menu</span>
              <SkipForward className="absolute right-4 w-4 h-4 text-[#1B261B]/40" />
              <SkipBack className="absolute left-4 w-4 h-4 text-[#1B261B]/40" />
              <div className="absolute bottom-4 flex gap-1 items-center">
                 <Play className="w-3 h-3 text-[#1B261B]/40 fill-current" />
                 <div className="w-[1px] h-3 bg-[#1B261B]/20" />
                 <Play className="w-3 h-3 text-[#1B261B]/40 rotate-180 fill-current" />
              </div>

              {/* Center Button */}
              <div className="w-16 h-16 bg-[#FDFBF7] rounded-full shadow-[0_2px_5px_rgba(0,0,0,0.1)] border border-black/5 flex items-center justify-center active:scale-95 transition-transform">
                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
              </div>

              {/* Touch Interaction Indicator (Hobbyist) */}
              <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-[#9CA764]/10 transition-colors" />
           </div>
        </div>
        
        {/* Botanical Engraving at Bottom */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-30">
           <div className="w-1 h-1 bg-white rounded-full" />
           <p className="text-[7px] font-sans font-black uppercase tracking-[0.5em] text-white">otu mini</p>
           <div className="w-1 h-1 bg-white rounded-full" />
        </div>

        {/* Outer Edge Polish */}
        <div className="absolute inset-0 pointer-events-none rounded-[35px] border-[1px] border-white/10" />
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Mixtape;
