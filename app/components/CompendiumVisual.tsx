"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Search, Library, ChevronLeft, ChevronRight, Bookmark } from "lucide-react";

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
      {/* ─── HARDWARE CHASSIS ─── */}
      <div
        className="relative w-full h-full rounded-[42px] p-5 flex flex-col gap-4 overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #2B2D3A 0%, #1C1E28 55%, #13141C 100%)",
          boxShadow: "0 60px 120px -20px rgba(5,5,15,0.75), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,255,255,0.05)"
        }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.08]" 
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/brushed-alum-dark.png')" }} />

        {/* ─── E-INK SCREEN ─── */}
        <div
          className="relative w-full rounded-2xl overflow-hidden flex flex-col p-4"
          style={{
            aspectRatio: "1/1.1",
            background: "#E8EAE6", // Paper-like E-ink background
            boxShadow: "inset 0 0 20px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.1)"
          }}
        >
          {/* E-ink Header */}
          <div className="flex justify-between items-center mb-3 border-b border-black/10 pb-1">
             <span style={{ fontSize: 6, fontWeight: 900, color: "#1a1a1a" }}>LIBRARY / Ficus benghalensis</span>
             <div className="flex gap-2 items-center">
                <Bookmark className="w-2.5 h-2.5 text-black/40" />
                <span style={{ fontSize: 6, fontWeight: 900, color: "#1a1a1a" }}>PG. 421</span>
             </div>
          </div>

          {/* MAIN PAGE CONTENT (Kindle style) */}
          <div className="flex-1 flex flex-col gap-2 font-serif text-[#1a1a1a] overflow-hidden">
             <h3 className="font-bold leading-none mb-1" style={{ fontSize: 13, letterSpacing: "-0.02em" }}>The Banyan Tree</h3>
             
             <p className="leading-tight opacity-80" style={{ fontSize: 7.5 }}>
                Known as the "Vat-vriksha" in ancient texts, the Great Banyan is a marvel of biological architecture. 
                Its defining feature—aerial prop roots—eventually become indistinguishable from the primary trunk.
             </p>

             {/* Illustration Placeholder (Minimalist) */}
             <div className="w-full h-16 bg-black/5 rounded border border-black/5 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
                <svg viewBox="0 0 100 60" className="w-full h-full opacity-60">
                   <path d="M50 50 Q50 20 50 10 M50 25 L30 40 M50 25 L70 40 M50 15 L40 30 M50 15 L60 30" stroke="black" fill="none" strokeWidth="1" />
                   {/* Prop roots */}
                   <path d="M35 40 L35 55 M65 40 L65 55 M42 35 L42 55 M58 35 L58 55" stroke="black" strokeWidth="0.5" opacity="0.4" />
                </svg>
             </div>

             <p className="leading-tight opacity-70 italic" style={{ fontSize: 6.5 }}>
                A single tree in Kolkata currently covers over 14,000 square meters, forming a literal forest from one genetic source.
             </p>
          </div>

          {/* E-ink Footer */}
          <div className="mt-2 pt-2 border-t border-black/10 flex justify-between items-center">
             <div className="flex gap-4">
                <span style={{ fontSize: 6, fontWeight: 900, color: "#1a1a1a" }}>12% READ</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontSize: 6, fontWeight: 800, color: "#1a1a1a" }}>Chapter 4: Aerial Roots</span>
             </div>
             <div className={`w-1 h-1 rounded-full bg-black transition-opacity duration-300 ${blink ? 'opacity-100' : 'opacity-20'}`} />
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
                     background: "linear-gradient(135deg, #22242E 0%, #13141C 100%)",
                     boxShadow: "0 8px 16px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)"
                   }}>
                    <BookOpen className="w-6 h-6 text-[#9CA764]" />
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
        <div className="mt-2 text-center opacity-20">
          <p style={{ fontSize: 6, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.3em", color: "#D4DCE8" }}>
            otu botanical compendium
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompendiumVisual;
