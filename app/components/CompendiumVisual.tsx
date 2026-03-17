"use client";

import React from "react";
import { Library, BookOpen, Scroll, Info, Leaf } from "lucide-react";

const CompendiumVisual = () => {
  return (
    <div className="relative w-full max-w-[320px] aspect-[0.7/1] flex items-center justify-center p-4 select-none">
      {/* Compendium Vault - Infinite Knowledge */}
      <div className="relative w-full h-full bg-[#1B261B] rounded-[40px] border-2 border-[#9CA764]/30 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden">
        
        {/* The Knowledge Core Window */}
        <div className="absolute inset-4 bg-[#F1E8C7] rounded-[30px] overflow-hidden flex flex-col">
           
           {/* Parchment Texture Overlay */}
           <div className="absolute inset-0 opacity-[0.4] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')]" />

           {/* Top Branding - The Vault */}
           <div className="p-6 flex justify-between items-start border-b border-[#1B261B]/10 relative z-10">
              <div className="flex flex-col">
                 <span className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-[#1B261B]">Compendium v4.2</span>
                 <span className="text-[8px] font-sans font-bold text-[#1B261B]/40">4,021 Species Logged</span>
              </div>
              <Library className="w-4 h-4 text-[#1B261B]" />
           </div>

           {/* Central Artifact - The Floating Knowledge Book */}
           <div className="flex-1 relative flex items-center justify-center">
              {/* Floating Leaf Particles */}
              {[1, 2, 3, 4, 5].map((i) => (
                 <div 
                  key={i}
                  className="absolute w-4 h-4 text-[#9CA764]/30 animate-[float_8s_infinite]"
                  style={{ 
                    top: `${Math.random() * 80}%`, 
                    left: `${Math.random() * 80}%`,
                    animationDelay: `${i * 1.5}s`
                  }}
                 >
                    <Leaf className="w-full h-full" />
                 </div>
              ))}

              <div className="relative w-40 h-52 bg-[#F1E8C7] rounded-sm shadow-2xl border border-[#1B261B]/10 flex flex-col p-6 animate-[rock_6s_ease-in-out_infinite]">
                 {/* Page Lines Simulation */}
                 <div className="w-full h-2/3 flex flex-col gap-2">
                    <div className="w-full h-[6px] bg-[#1B261B]/10 rounded-full" />
                    <div className="flex gap-2">
                       <div className="w-16 h-16 bg-[#9CA764]/20 rounded-md border border-[#9CA764]/10" />
                       <div className="flex flex-col gap-2 flex-1 pt-1">
                          <div className="w-full h-[3px] bg-[#1B261B]/10 rounded-full" />
                          <div className="w-4/5 h-[3px] bg-[#1B261B]/10 rounded-full" />
                          <div className="w-full h-[3px] bg-[#1B261B]/10 rounded-full" />
                       </div>
                    </div>
                    <div className="w-full h-[2px] bg-[#1B261B]/5 mt-4" />
                    <div className="w-full h-[2px] bg-[#1B261B]/5" />
                    <div className="w-1/2 h-[2px] bg-[#1B261B]/5" />
                 </div>
                 
                 {/* Mythology Icon at Bottom */}
                 <div className="mt-auto flex justify-center">
                    <Scroll className="w-8 h-8 text-[#9CA764] opacity-40" />
                 </div>
              </div>
           </div>

           {/* Footer Navigation Tabs */}
           <div className="p-6 flex justify-around items-center border-t border-[#1B261B]/10 relative z-10">
              <BookOpen className="w-4 h-4 text-[#1B261B]/30 hover:text-[#1B261B] transition-colors cursor-pointer" />
              <div className="w-[1px] h-4 bg-[#1B261B]/10" />
              <Info className="w-4 h-4 text-[#1B261B]/30 hover:text-[#1B261B] transition-colors cursor-pointer" />
              <div className="w-[1px] h-4 bg-[#1B261B]/10" />
              <Library className="w-4 h-4 text-[#1B261B]/30 hover:text-[#1B261B] transition-colors cursor-pointer" />
           </div>
        </div>

        {/* Glossy Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 to-transparent opacity-30" />
      </div>

      <style jsx>{`
        @keyframes rock {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0); opacity: 0; }
          25% { opacity: 1; }
          75% { opacity: 1; }
          100% { transform: translate(40px, -60px) rotate(45deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default CompendiumVisual;
