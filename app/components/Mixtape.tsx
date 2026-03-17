"use client";

import React from 'react';

const Mixtape = () => {
  return (
    <div className="relative w-full max-w-[340px] aspect-[0.7/1] flex items-center justify-center p-4">
      {/* Remove outer glass frame to let it float */}
      
      {/* Cassette Body (Vertical) */}
      <div className="relative w-full h-full bg-[#1B261B] rounded-[32px] border-2 border-[#1B261B] shadow-[0_40px_100px_-20px_rgba(27,38,27,0.4)] flex flex-col overflow-hidden">
        {/* Top Branding Section */}
        <div className="h-2/5 w-full p-4 flex flex-col pt-8">
          <div className="w-full h-full bg-[#F1E8C7] rounded-xl border-b-8 border-black/20 p-6 flex flex-col justify-between relative overflow-hidden">
             {/* Diagonal stripe texture */}
             <div className="absolute inset-0 opacity-5 pointer-events-none bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#1B261B_10px,#1B261B_20px)]" />
             
             <div className="relative z-10 flex flex-col gap-1">
                <p className="text-[10px] font-sans font-black uppercase tracking-[0.5em] text-[#9CA764]">otu intelligence</p>
                <h4 className="text-xl font-sans font-black uppercase tracking-tighter text-[#1B261B] leading-none">leaf notes</h4>
                <div className="w-8 h-1 bg-[#9CA764] mt-2" />
             </div>
             
             <div className="relative z-10 flex flex-col mt-auto">
                <span className="text-[8px] font-sans font-bold uppercase text-[#1B261B]/30 tracking-[0.4em]">Symphony of Flora</span>
                <span className="text-[12px] font-sans font-black uppercase text-[#1B261B]">side a</span>
             </div>
          </div>
        </div>

        {/* Middle Reel Section (Vertical Stack) */}
        <div className="flex-1 w-full bg-[#0D140D]/40 flex flex-col items-center justify-center gap-12 p-8 border-y border-white/5">
           {/* Top Reel */}
           <div className="relative w-20 h-20 flex items-center justify-center group">
              <div className="absolute inset-0 bg-[#251A0F] rounded-full animate-[spin_10s_linear_infinite] group-hover:animate-[spin_2s_linear_infinite] transition-all" />
              <div className="z-10 w-10 h-10 bg-[#F1E8C7] rounded-full flex items-center justify-center border-4 border-[#1B261B] animate-[spin_10s_linear_infinite] group-hover:animate-[spin_2s_linear_infinite]">
                 <div className="w-1.5 h-3 bg-[#1B261B] rounded-full -mt-2" />
                 <div className="w-1.5 h-3 bg-[#1B261B] rounded-full mt-2" />
              </div>
              {/* Center screw */}
              <div className="absolute z-20 w-2 h-2 bg-black/40 rounded-full" />
           </div>

           {/* Animated Waveform Bridge */}
           <div className="w-[2px] h-12 bg-gradient-to-b from-[#9CA764] to-transparent relative opacity-40">
              <div className="absolute inset-0 animate-pulse bg-[#9CA764]" />
           </div>

           {/* Bottom Reel */}
           <div className="relative w-20 h-20 flex items-center justify-center group">
              <div className="absolute inset-0 bg-[#251A0F] rounded-full animate-[spin_10s_linear_infinite] group-hover:animate-[spin_2s_linear_infinite] transition-all" />
              <div className="z-10 w-10 h-10 bg-[#F1E8C7] rounded-full flex items-center justify-center border-4 border-[#1B261B] animate-[spin_10s_linear_infinite] group-hover:animate-[spin_2s_linear_infinite]">
                 <div className="w-1.5 h-3 bg-[#1B261B] rounded-full -mt-2" />
                 <div className="w-1.5 h-3 bg-[#1B261B] rounded-full mt-2" />
              </div>
              <div className="absolute z-20 w-2 h-2 bg-black/40 rounded-full" />
           </div>
        </div>

        {/* Bottom Detailed Plate */}
        <div className="h-16 w-full bg-[#1B261B] border-t border-white/5 flex flex-col justify-center items-center px-6 gap-1 pb-2">
           <div className="flex gap-4 opacity-30">
              <div className="w-1 h-1 bg-white rounded-full" />
              <div className="w-1 h-1 bg-white rounded-full" />
              <div className="w-1 h-1 bg-white rounded-full" />
           </div>
           <span className="text-[7px] text-white/20 font-sans tracking-[0.5em] uppercase font-bold">botanical sonification engine v2.0</span>
        </div>
      </div>
      
      {/* Light highlights */}
      <div className="absolute top-10 left-10 w-full h-[1px] bg-white/10 rotate-[45deg] pointer-events-none" />
    </div>
  );
};

export default Mixtape;
