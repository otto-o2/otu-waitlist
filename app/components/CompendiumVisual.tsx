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
        className="relative w-full h-full rounded-[42px] p-5 flex flex-col gap-4 overflow-hidden shadow-2xl"
        style={{
          background: "linear-gradient(160deg, #1A2B23 0%, #0F120F 55%, #050805 100%)",
          boxShadow: "0 60px 120px -20px rgba(5,15,5,0.8), 0 0 0 1px rgba(61,82,59,0.2), inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.5)",
          border: "1px solid rgba(61,82,59,0.15)"
        }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.08]" 
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/brushed-alum-dark.png')" }} />

        {/* ─── ENCYCLOPEDIA SCREEN ─── */}
        <div
          className="relative w-full rounded-2xl overflow-hidden flex flex-col p-4"
          style={{
            aspectRatio: "1/1.1",
            background: "linear-gradient(160deg, #051A10 0%, #020805 100%)", // Deep Forest Black
            boxShadow: "inset 0 2px 15px rgba(0,0,0,0.9), 0 0 0 1px rgba(149,213,178,0.1)"
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-2 border-b border-white/5 pb-1">
             <span style={{ fontSize: 6, fontWeight: 900, color: "#95D5B1", opacity: 0.8 }}>ARCHIVE / Ficus benghalensis</span>
             <div className="flex gap-2 items-center">
                <Bookmark className="w-2.5 h-2.5 text-[#95D5B1]/40" />
                <span style={{ fontSize: 6, fontWeight: 900, color: "#95D5B1", opacity: 0.8 }}>PG. 421</span>
             </div>
          </div>

          {/* MAIN PAGE CONTENT */}
           <div className="flex-1 flex flex-col gap-1 font-serif text-[#D8F3DC] overflow-hidden scrollbar-hide">
             <div className="flex justify-between items-start">
                <h3 className="font-bold leading-none text-[#95D5B1]" style={{ fontSize: 13, letterSpacing: "-0.02em" }}>The Banyan Tree</h3>
                <span className="text-[18px] transform -translate-y-1">🌳</span>
             </div>
             
             <div className="space-y-2 overflow-y-auto pr-1 pb-4" style={{ fontSize: '7.2px', lineHeight: '1.25' }}>
                <p className="opacity-90">
                   Known as the <span className="italic font-bold text-[#52B788]">"Vat-vriksha"</span> in ancient texts, the Great Banyan is a marvel of biological architecture. Its defining feature—aerial prop roots—eventually become indistinguishable from the primary trunk.
                </p>

                 {/* Detailed Spec Table */}
                 <div className="border-y border-white/5 py-1.5 my-1 grid grid-cols-2 gap-x-2 gap-y-1 font-sans font-bold text-[5.5px] uppercase text-[#40916C]">
                    <div>Classification: <span className="text-[#95D5B1] italic">Moraceae</span></div>
                    <div>Toxicity: <span className="text-[#95D5B1] italic">Mild (Sap)</span></div>
                    <div>Sunlight: <span className="text-[#95D5B1] italic">Full / Part</span></div>
                    <div>Growth: <span className="text-[#95D5B1] italic">Evergreen</span></div>
                 </div>

                <p className="opacity-70 text-[#D8F3DC]">
                   A single tree in <span className="font-bold text-[#52B788]">Kolkata</span> currently covers over 14,000 square meters, forming a literal forest from one genetic source. It is estimated to be over 250 years old.
                </p>

                <p className="opacity-70 text-[#D8F3DC]">
                   In the <span className="italic">otu vault</span>, we categorize this species as a <span className="font-bold text-[#52B788]">Tier 4 Keystone</span>.
                </p>
             </div>
          </div>

          {/* Footer */}
           <div className="mt-auto pt-2 border-t border-white/5 flex justify-between items-center z-10">
             <div className="flex gap-3">
                <span style={{ fontSize: 5, fontWeight: 900, color: "#95D5B1", opacity: 0.4 }}>42% READ</span>
                <span className="flex items-center gap-1" style={{ fontSize: 5, fontWeight: 800, color: "#95D5B1" }}>
                   <Share2 className="w-2 h-2" /> SHARE DATA
                </span>
             </div>
             <div className="flex items-center gap-2">
                <HelpCircle className="w-2 h-2 opacity-20 text-[#95D5B1]" />
                <div className={`w-1 h-1 rounded-full bg-[#52B788] transition-opacity duration-300 ${blink ? 'opacity-100' : 'opacity-20'}`} />
             </div>
          </div>
        </div>

        {/* ─── INTERFACE ─── */}
        <div className="flex items-center justify-between px-2 pb-2">
           <div className="group flex flex-col items-center gap-1.5 cursor-pointer">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:bg-emerald-950/20 active:scale-95"
                style={{ background: "linear-gradient(145deg, #102018 0%, #050805 100%)", border: "1px solid rgba(61,82,59,0.2)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                 <ChevronLeft className="w-4 h-4 text-[#95D5B1] opacity-60" />
              </div>
              <span style={{ fontSize: 5, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(149,213,178,0.2)" }}>Prev</span>
           </div>

           <div className="relative group cursor-pointer">
              <div className="w-16 h-16 rounded-full p-1" style={{ background: "linear-gradient(135deg, rgba(82,183,136,0.1), transparent)" }}>
                 <div className="w-full h-full rounded-full flex items-center justify-center" 
                   style={{ 
                     background: "linear-gradient(135deg, #0A1F14 0%, #020502 100%)",
                     boxShadow: "0 8px 16px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)"
                   }}>
                    <BookOpen className="w-6 h-6 text-[#52B788]" />
                 </div>
              </div>
           </div>

           <div className="group flex flex-col items-center gap-1.5 cursor-pointer">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:bg-emerald-950/20 active:scale-95"
                style={{ background: "linear-gradient(145deg, #102018 0%, #050805 100%)", border: "1px solid rgba(61,82,59,0.2)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                 <ChevronRight className="w-4 h-4 text-[#95D5B1] opacity-60" />
              </div>
              <span style={{ fontSize: 5, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(149,213,178,0.2)" }}>Next</span>
           </div>
        </div>

        {/* ─── LABEL ─── */}
        <div className="mt-2 text-center opacity-10">
          <p style={{ fontSize: 5, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.3em", color: "#95D5B1" }}>
            otu plant encyclopedia v1.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompendiumVisual;
