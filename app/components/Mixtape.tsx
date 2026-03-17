"use client";

const Mixtape = () => {
  return (
    <div className="relative w-full max-w-[320px] aspect-[0.65/1] flex items-center justify-center p-4 select-none">
      {/* Cassette Shell (The Body) */}
      <div className="relative w-full h-full bg-[#1B261B] rounded-[24px] border-[6px] border-[#1B261B] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden">
        {/* Subtle texture/grain on shell */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        {/* Main Label Sticker */}
        <div className="relative z-10 w-full h-full p-3 flex flex-col gap-1">
          <div className="w-full h-full bg-[#FDFBF7] rounded-xl border-b-[10px] border-black/10 flex flex-col relative overflow-hidden p-6">
            {/* Design Stripes */}
            <div className="absolute top-0 right-0 w-12 h-full bg-[#9CA764]/20 -skew-x-12 translate-x-4" />
            <div className="absolute top-0 right-8 w-4 h-full bg-[#9CA764]/10 -skew-x-12 translate-x-4" />
            
            {/* Header / Brand */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col">
                <span className="text-[14px] font-sans font-black text-[#9CA764] leading-none mb-1">A</span>
                <span className="text-[7px] font-sans font-bold uppercase tracking-[0.3em] text-[#1B261B]/40">Index</span>
              </div>
              <div className="text-right">
                <p className="text-[8px] font-sans font-black uppercase tracking-widest text-[#1B261B]">otu intelligence</p>
                <div className="h-[2px] w-full bg-[#1B261B] mt-1" />
              </div>
            </div>

            {/* Title Section */}
            <div className="flex-1 flex flex-col justify-center">
               <h4 className="text-2xl font-sans font-black uppercase tracking-tighter text-[#1B261B] mb-1">leaf notes</h4>
               <p className="text-[10px] font-sans font-medium italic text-[#1B261B]/60 tracking-wide">Symphony of Flora v2.1</p>
               
               <div className="mt-6 flex flex-col gap-1 opacity-20">
                  <div className="w-full h-[1px] bg-[#1B261B]" />
                  <div className="w-full h-[1px] bg-[#1B261B]" />
                  <div className="w-4/5 h-[1px] bg-[#1B261B]" />
               </div>
            </div>

            {/* Cassette Center (Window & Reels) */}
            <div className="my-6 w-full h-40 bg-[#1B261B] rounded-2xl border-2 border-black/20 flex flex-col items-center justify-around p-4 relative shadow-inner overflow-hidden">
               {/* Magnetic Tape Visual in Window */}
               <div className="absolute inset-0 bg-gradient-to-b from-[#251A0F] via-[#3d2c1a] to-[#251A0F] opacity-40" />
               
               {/* Top Reel */}
               <div className="relative z-10 w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
                  <div className="w-full h-full bg-[#251A0F] rounded-full animate-[spin_10s_linear_infinite] flex items-center justify-center p-1">
                     <div className="w-full h-full rounded-full border-[3px] border-dashed border-white/20" />
                  </div>
                  <div className="absolute z-20 w-8 h-8 bg-[#F1E8C7] rounded-full border-4 border-[#1B261B] animate-[spin_10s_linear_infinite] flex items-center justify-center">
                     <div className="w-1 h-3 bg-[#1B261B] rounded-full" />
                  </div>
               </div>

               {/* Center Tape Level Indicator */}
               <div className="w-20 h-2 bg-black/40 rounded-full relative overflow-hidden border border-white/5">
                  <div className="absolute top-0 left-0 h-full w-1/2 bg-[#9CA764]/60 animate-pulse" />
               </div>

               {/* Bottom Reel */}
               <div className="relative z-10 w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
                  <div className="w-full h-full bg-[#251A0F] rounded-full animate-[spin_10s_linear_infinite] flex items-center justify-center p-1">
                     <div className="w-full h-full rounded-full border-[3px] border-dashed border-white/20" />
                  </div>
                  <div className="absolute z-20 w-8 h-8 bg-[#F1E8C7] rounded-full border-4 border-[#1B261B] animate-[spin_10s_linear_infinite] flex items-center justify-center">
                     <div className="w-1 h-3 bg-[#1B261B] rounded-full" />
                  </div>
               </div>
            </div>

            {/* Footer Specs */}
            <div className="flex justify-between items-end mt-auto">
               <div className="flex flex-col">
                  <span className="text-[7px] font-sans font-black uppercase text-[#1B261B]/60 tracking-widest">Studio</span>
                  <span className="text-[10px] font-sans font-black uppercase text-[#1B261B]">Quality</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="flex flex-col items-end">
                     <span className="text-[7px] font-sans font-bold uppercase text-[#1B261B]/40">Type</span>
                     <span className="text-[9px] font-sans font-black text-[#1B261B]">GENOME I</span>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Realism: Mechanical details */}
        <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-black/40 border border-white/5" />
        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-black/40 border border-white/5" />
        <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-black/40 border border-white/5" />
        <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-black/40 border border-white/5" />
        
        {/* Top Case Openings */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-black/20 rounded-b-full" />
        
        {/* Shine/Reflections Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/10 rounded-[24px]" />
      </div>
    </div>
  );
};

export default Mixtape;
