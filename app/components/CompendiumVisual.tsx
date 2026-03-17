"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, ChevronLeft, ChevronRight, Bookmark, Share2, HelpCircle } from "lucide-react";

const CompendiumVisual = () => {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(prev => !prev);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[300px] select-none" style={{ aspectRatio: "0.65/1" }}>
      {/* ─── HARDWARE CHASSIS (Midnight Forest) ─── */}
      <div
        className="relative w-full h-full rounded-[42px] p-5 flex flex-col gap-4 overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #0E1A14 0%, #08110D 55%, #040806 100%)",
          boxShadow: "0 60px 120px -20px rgba(5,15,10,0.8), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,255,255,0.05)"
        }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.08]" 
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/brushed-alum-dark.png')" }} />

        {/* ─── COMPENDIUM SCREEN (Midnight Forest) ─── */}
        <div
          className="relative w-full rounded-2xl overflow-hidden flex flex-col p-4 shadow-2xl"
          style={{
            aspectRatio: "1/1.1",
            background: "linear-gradient(160deg, #0D1F16 0%, #050E0A 100%)",
            border: "1px solid rgba(197, 160, 89, 0.25)",
            boxShadow: "inset 0 0 40px rgba(0,0,0,0.8), 0 0 15px rgba(0,255,100,0.05)"
          }}
        >
          {/* Subtle Screen Overlay (Texture) */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-repeat" 
            style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }} />

          {/* Header */}
          <div className="relative flex justify-between items-center mb-3 border-b border-[#C5A059]/20 pb-2 z-10">
             <span style={{ fontSize: 6, fontWeight: 900, color: "#D4B886", letterSpacing: "0.1em", textShadow: "0 0 5px rgba(197,160,89,0.3)" }}>
               LIBRARY / Ficus benghalensis
             </span>
             <div className="flex gap-2 items-center">
                <Bookmark className="w-2.5 h-2.5 text-[#C5A059]/80" />
                <span style={{ fontSize: 6, fontWeight: 900, color: "#D4B886" }}>PG. 421</span>
             </div>
          </div>

          {/* MAIN PAGE CONTENT */}
          <div className="relative flex-1 flex flex-col gap-2 font-serif text-[#F0F5F2] overflow-hidden scrollbar-hide z-10">
             <div className="flex justify-between items-start">
               <h3 className="font-bold leading-none text-[#D4B886]" style={{ fontSize: 13, letterSpacing: "-0.01em", textShadow: "0 0 8px rgba(197,160,89,0.2)" }}>
                 The Banyan Tree
               </h3>
               <span className="text-[18px] transform -translate-y-1 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">🌳</span>
             </div>
             
             <div className="space-y-2.5 overflow-y-auto pr-1 pb-4 custom-scrollbar" style={{ fontSize: '7.5px', lineHeight: '1.4' }}>
                <p className="opacity-100 leading-relaxed">
                   Known as the <span className="italic font-bold text-[#D4B886]">"Vat-vriksha"</span> in ancient texts, the Great Banyan is a marvel of biological architecture. Its defining feature—aerial prop roots—eventually become indistinguishable from the primary trunk.
                </p>

                {/* Detailed Spec Table */}
                <div className="border-y border-[#C5A059]/20 py-2 my-2 grid grid-cols-2 gap-x-2 gap-y-1.5 font-sans font-bold text-[5.5px] uppercase tracking-wider">
                   <div className="text-[#C5A059]/70">Classification: <span className="text-[#F0F5F2] italic">Moraceae</span></div>
                   <div className="text-[#C5A059]/70">Toxicity: <span className="text-[#F0F5F2] italic">Mild (Sap)</span></div>
                   <div className="text-[#C5A059]/70">Sunlight: <span className="text-[#F0F5F2] italic">Full / Part</span></div>
                   <div className="text-[#C5A059]/70">Growth: <span className="text-[#F0F5F2] italic">Evergreen</span></div>
                 </div>

                <p className="opacity-90 leading-relaxed">
                   A single tree in <span className="font-bold text-[#D4B886]/90">Kolkata</span> currently covers over 14,000 square meters, forming a literal forest from one genetic source. It is estimated to be over 250 years old.
                </p>

                <p className="opacity-95 leading-relaxed">
                   In the <span className="italic">otu vault</span>, we categorize this species as a <span className="font-bold text-[#00FF41]/80">Tier 4 Keystone</span>. Its canopy provides a micro-climate capable of supporting 400+ species.
                </p>

                <p className="opacity-80 leading-normal border-l-2 border-[#C5A059]/40 pl-2 italic">
                   "If you stand still enough, the Vat-vriksha doesn't just grow around you; it absorbs the very air you breathe."
                </p>
             </div>
          </div>

          {/* Footer */}
          <div className="relative mt-auto pt-2 border-t border-[#C5A059]/20 flex justify-between items-center z-10">
             <div className="flex gap-3">
                <span style={{ fontSize: 5, fontWeight: 900, color: "#D4B886", opacity: 0.8 }}>42% READ</span>
                <span className="flex items-center gap-1" style={{ fontSize: 5, fontWeight: 800, color: "#F0F5F2", opacity: 0.9 }}>
                   <Share2 className="w-2 h-2 text-[#C5A059]" /> SHARE ARCHIVE
                </span>
             </div>
             <div className="flex items-center gap-2">
                <HelpCircle className="w-2 h-2 text-[#C5A059] opacity-60" />
                <div className={`w-1 h-1 rounded-full bg-[#00FF41] transition-all duration-300 shadow-[0_0_8px_#00FF41] ${blink ? 'opacity-100 scale-125' : 'opacity-40 scale-100'}`} />
             </div>
          </div>
        </div>

        {/* ─── INTERFACE ─── */}
        <div className="flex items-center justify-between px-2 pb-2">
           <div className="group flex flex-col items-center gap-1.5 cursor-pointer">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:bg-white/11 active:scale-95"
                style={{ background: "linear-gradient(145deg, #2A2C38 0%, #181A22 100%)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                 <ChevronLeft className="w-4 h-4 text-[#D4DCE8] opacity-60" />
              </div>
              <span style={{ fontSize: 5, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(215,230,240,0.2)" }}>Prev</span>
           </div>

           <div className="relative group cursor-pointer">
              <div className="w-16 h-16 rounded-full p-1" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.1), transparent)" }}>
                 <div className="w-full h-full rounded-full flex items-center justify-center" 
                   style={{ 
                     background: "linear-gradient(135deg, #1A1F1C 0%, #080D0B 100%)",
                     boxShadow: "0 8px 16px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)"
                   }}>
                    <BookOpen className="w-6 h-6 text-[#C5A059]" />
                 </div>
              </div>
           </div>

           <div className="group flex flex-col items-center gap-1.5 cursor-pointer">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:bg-white/11 active:scale-95"
                style={{ background: "linear-gradient(145deg, #2A2C38 0%, #181A22 100%)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                 <ChevronRight className="w-4 h-4 text-[#D4DCE8] opacity-60" />
              </div>
              <span style={{ fontSize: 5, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(215,230,240,0.2)" }}>Next</span>
           </div>
        </div>

        {/* ─── LABEL ─── */}
        <div className="mt-2 text-center opacity-10">
          <p style={{ fontSize: 5, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.3em", color: "#D4DCE8" }}>
            otu botanical compendium v.0.1
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompendiumVisual;
