"use client";

const Mixtape = () => {
  return (
    <div className="relative w-full max-w-[300px] aspect-[0.7/1] flex items-center justify-center p-4 select-none">
      {/* Cassette Shell - Deep Forest Green */}
      <div className="relative w-full h-full bg-[#1B261B] rounded-[20px] border-[5px] border-[#2A362A] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden">
        
        {/* The Classic Sticker Label */}
        <div className="absolute inset-[15px] bg-[#FDFBF7] rounded-lg shadow-inner flex flex-col overflow-hidden">
          {/* Sticker Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#1B261B_10px,#1B261B_11px)]" />
          
          {/* Header Section */}
          <div className="h-1/4 w-full p-4 flex justify-between items-start border-b border-[#1B261B]/10">
            <div className="flex flex-col">
              <span className="text-2xl font-sans font-black text-[#A14B3B] leading-none">A</span>
              <span className="text-[8px] font-sans font-black uppercase tracking-[0.2em] text-[#1B261B]/40">Index</span>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-sans font-black uppercase tracking-widest text-[#1B261B]">otu</p>
              <div className="h-[2px] w-full bg-[#9CA764] mt-1" />
            </div>
          </div>

          {/* Central Title */}
          <div className="flex-1 flex flex-col items-center justify-center -mt-4">
             <h4 className="text-3xl font-sans font-black uppercase tracking-tight text-[#1B261B] leading-none">leaf notes</h4>
             <div className="flex items-center gap-4 mt-2">
                <div className="h-[1px] w-8 bg-[#1B261B]/20" />
                <span className="text-[9px] font-sans font-black uppercase tracking-[0.3em] text-[#9CA764]">Stereo Cassette</span>
                <div className="h-[1px] w-8 bg-[#1B261B]/20" />
             </div>
          </div>

          {/* Transparent Window / Reel Slot */}
          <div className="h-[45%] w-full bg-[#0D140D] flex flex-col items-center justify-around py-4 relative">
             {/* Magnetic Tape Spool Simulation */}
             <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_bottom,#251A0F_0%,#3d2c1a_50%,#251A0F_100%)]" />
             
             {/* Top Reel */}
             <div className="relative z-10 w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#251A0F] rounded-full border border-white/5 animate-[spin_10s_linear_infinite]" />
                <div className="z-10 w-10 h-10 bg-[#F1E8C7] rounded-full flex items-center justify-center border-4 border-[#1B261B] animate-[spin_10s_linear_infinite]">
                   {/* Reel Spokes */}
                   <div className="absolute w-full h-[2px] bg-[#1B261B]/20 rotate-0" />
                   <div className="absolute w-full h-[2px] bg-[#1B261B]/20 rotate-60" />
                   <div className="absolute w-full h-[2px] bg-[#1B261B]/20 rotate-120" />
                   <div className="w-2 h-4 bg-[#1B261B] rounded-full" />
                </div>
             </div>

             {/* Moving Tape Line */}
             <div className="w-1 h-8 bg-[#9CA764]/20 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full animate-[slide_1s_linear_infinite] bg-gradient-to-b from-transparent via-[#9CA764] to-transparent" />
             </div>

             {/* Bottom Reel */}
             <div className="relative z-10 w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#251A0F] rounded-full border border-white/5 animate-[spin_10s_linear_infinite]" />
                <div className="z-10 w-10 h-10 bg-[#F1E8C7] rounded-full flex items-center justify-center border-4 border-[#1B261B] animate-[spin_10s_linear_infinite]">
                   <div className="absolute w-full h-[2px] bg-[#1B261B]/20 rotate-0" />
                   <div className="absolute w-full h-[2px] bg-[#1B261B]/20 rotate-60" />
                   <div className="absolute w-full h-[2px] bg-[#1B261B]/20 rotate-120" />
                   <div className="w-2 h-4 bg-[#1B261B] rounded-full" />
                </div>
             </div>
          </div>

          {/* Footer Labeling */}
          <div className="h-16 w-full p-4 flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-[8px] font-sans font-black uppercase text-[#1B261B]/40">Studio</span>
              <span className="text-[12px] font-sans font-black uppercase text-[#1B261B]">Quality</span>
            </div>
            <div className="flex flex-col items-end">
               <span className="text-[8px] font-sans font-black uppercase text-[#1B261B]/40">Type</span>
               <span className="text-[14px] font-sans font-black text-[#1B261B]">I</span>
            </div>
          </div>
        </div>

        {/* Mechanical Shell Details (The realistic holes/screws) */}
        <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-3/4 h-[5px] flex justify-between px-8">
           <div className="w-3 h-3 rounded-full bg-black/40 border border-white/5" />
           <div className="w-3 h-3 rounded-full bg-black/40 border border-white/5" />
           <div className="w-3 h-3 rounded-full bg-black/40 border border-white/5" />
        </div>

        {/* Glass Reflection */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 via-transparent to-black/20 mix-blend-overlay" />
      </div>

      <style jsx>{`
        @keyframes slide {
          from { transform: translateY(-100%); }
          to { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};

export default Mixtape;
