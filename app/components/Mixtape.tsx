"use client";

import React from 'react';

const Mixtape = () => {
  return (
    <div className="relative w-full max-w-lg aspect-[1.5/1] flex items-center justify-center p-8">
      {/* Outer Case / Glass Frame */}
      <div className="absolute inset-0 bg-[#EBE7DD]/40 rounded-[40px] border border-white/40 shadow-xl backdrop-blur-sm" />
      
      {/* Cassette Body */}
      <div className="relative w-full h-full bg-[#1B261B] rounded-[24px] border-4 border-[#1B261B] shadow-2xl flex flex-col overflow-hidden">
        {/* Top Section with Label Slot */}
        <div className="h-1/2 w-full p-4 flex flex-col gap-2">
          <div className="w-full h-full bg-[#F1E8C7] rounded-lg border-b-4 border-black/10 p-4 flex flex-col justify-between">
             <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-[10px] font-sans font-black uppercase tracking-widest text-[#1B261B]/40">otu plant intelligence</p>
                  <h4 className="text-sm font-sans font-black uppercase tracking-tighter text-[#1B261B]">leaf notes engine</h4>
                </div>
                <div className="text-[10px] font-sans font-black bg-[#1B261B] text-[#F1E8C7] px-2 py-0.5 rounded">SIDE A</div>
             </div>
             
             <div className="flex justify-between items-end border-t border-[#1B261B]/10 pt-2">
                <div className="flex flex-col">
                   <span className="text-[8px] font-sans font-bold uppercase text-[#1B261B]/30 tracking-widest">Symphony of Flora</span>
                   <span className="text-[10px] font-sans font-black uppercase text-[#1B261B]">ambient botanical score</span>
                </div>
                <div className="flex gap-1">
                   <div className="w-2 h-2 rounded-full bg-[#9CA764]" />
                   <div className="w-2 h-2 rounded-full bg-[#9CA764]/40" />
                   <div className="w-2 h-2 rounded-full bg-[#9CA764]/10" />
                </div>
             </div>
          </div>
        </div>

        {/* Middle Section (The Window & Reels) */}
        <div className="flex-1 w-full bg-[#0D140D] flex items-center justify-center relative p-4">
           {/* Center Window */}
           <div className="w-4/5 h-20 bg-[#1B261B]/80 rounded-xl border-2 border-white/5 flex items-center justify-around overflow-hidden inner-shadow">
              {/* Left Reel */}
              <div className="relative w-16 h-16 flex items-center justify-center">
                 {/* Reel Background (Tape) */}
                 <div className="absolute inset-0 bg-[#251A0F] rounded-full animate-[spin_8s_linear_infinite]" />
                 {/* Hub */}
                 <div className="z-10 w-8 h-8 bg-[#F1E8C7] rounded-full flex items-center justify-center border-4 border-[#1B261B] animate-[spin_8s_linear_infinite]">
                    <div className="w-1 h-3 bg-[#1B261B] rounded-full -mt-2" />
                    <div className="w-1 h-3 bg-[#1B261B] rounded-full mt-2" />
                 </div>
              </div>

              {/* Tape Gap */}
              <div className="h-[2px] w-20 bg-[#251A0F] opacity-50 relative">
                 <div className="absolute top-0 left-0 w-full h-full animate-[pulse_2s_ease-in-out_infinite] bg-[#9CA764]/20" />
              </div>

              {/* Right Reel */}
              <div className="relative w-16 h-16 flex items-center justify-center">
                 {/* Reel Background (Tape) */}
                 <div className="absolute inset-0 bg-[#251A0F] rounded-full animate-[spin_8s_linear_infinite]" />
                 {/* Hub */}
                 <div className="z-10 w-8 h-8 bg-[#F1E8C7] rounded-full flex items-center justify-center border-4 border-[#1B261B] animate-[spin_8s_linear_infinite]">
                    <div className="w-1 h-3 bg-[#1B261B] rounded-full -mt-2" />
                    <div className="w-1 h-3 bg-[#1B261B] rounded-full mt-2" />
                 </div>
              </div>
           </div>
        </div>

        {/* Bottom Section (Buttons/Screws) */}
        <div className="h-10 w-full bg-[#1B261B] border-t border-white/5 flex items-center justify-between px-6">
           <div className="flex gap-8">
              <span className="text-[7px] text-white/20 font-sans tracking-[0.4em] uppercase font-bold">Auto Reverse</span>
              <span className="text-[7px] text-white/20 font-sans tracking-[0.4em] uppercase font-bold">NR System</span>
           </div>
           <div className="flex gap-4">
              <div className="w-2 h-2 bg-[#9CA764]/10 rounded-full border border-white/5" />
              <div className="w-2 h-2 bg-[#9CA764]/10 rounded-full border border-white/5" />
           </div>
        </div>
      </div>
      
      {/* Decorative Shimmer Overlay */}
      <div className="absolute inset-0 pointer-events-none rounded-[40px] bg-gradient-to-tr from-white/5 to-transparent mix-blend-overlay" />
    </div>
  );
};

export default Mixtape;
