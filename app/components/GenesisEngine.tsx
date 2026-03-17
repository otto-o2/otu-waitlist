"use client";

import React, { useState, useEffect } from "react";
import { Dna, Database, Binary, ShieldCheck, Cpu } from "lucide-react";

const GenesisEngine = () => {
  const [dataOffset, setDataOffset] = useState(0);
  const [activeNodes, setActiveNodes] = useState<number[]>([]);

  // Animate the background data scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setDataOffset(prev => (prev + 1) % 100);
      if (Math.random() > 0.85) {
        setActiveNodes(prev => {
          const next = [...prev, Math.floor(Math.random() * 5)];
          return next.slice(-3); // Keep only last few active
        });
      }
    }, 120);
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

        {/* ─── VAULT DISPLAY ─── */}
        <div
          className="relative w-full rounded-2xl overflow-hidden flex flex-col p-4"
          style={{
            aspectRatio: "1/1.1",
            background: "linear-gradient(160deg, #0D1A20 0%, #091318 100%)",
            border: "1px solid rgba(255,255,255,0.04)",
            boxShadow: "inset 0 2px 15px rgba(0,0,0,0.9)"
          }}
        >
          {/* Vertical Data Stream Background */}
          {Array.from({ length: 4 }).map((_, col) => (
            <div key={col} className="absolute inset-y-0 opacity-[0.03]" style={{ left: `${col * 25 + 10}%`, width: "2px", background: "white" }} />
          ))}
          
          <div className="relative z-10 flex justify-between items-center mb-4">
            <div className="flex flex-col">
              <span style={{ fontSize: 7, fontWeight: 900, color: "rgba(156,167,100,0.9)", textTransform: "uppercase", letterSpacing: "0.2em" }}>
                Genesis Vault
              </span>
              <span style={{ fontSize: 6, color: "rgba(180,200,210,0.4)", fontWeight: 700 }}>VERIFIED ARCHIVE v.38</span>
            </div>
            <ShieldCheck className="w-3 h-3 text-[#9CA764]/40" />
          </div>

          {/* MAIN VISUAL: BIO-CORE */}
          <div className="flex-1 relative flex items-center justify-center">
             {/* Central Rotating Rings */}
             <div className="absolute w-36 h-36 border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
             <div className="absolute w-28 h-28 border border-[#9CA764]/10 rounded-full animate-[spin_10s_linear_infinite_reverse]" />
             
             {/* The "Sprout" Hologram */}
             <div className="relative z-10 flex items-center justify-center">
                <Dna className="w-12 h-12 text-[#9CA764] animate-pulse" />
                {/* Floating genomic particles */}
                {Array.from({ length: 5 }).map((_, i) => (
                   <div 
                    key={i}
                    className={`absolute w-1 h-1 rounded-full transition-all duration-1000 ${activeNodes.includes(i) ? 'bg-[#9CA764] scale-150 shadow-[0_0_8px_#9CA764]' : 'bg-white/10'}`}
                    style={{ 
                      transform: `rotate(${i * 72}deg) translateY(-45px)`,
                    }}
                   />
                ))}
             </div>
          </div>

          {/* Scrolling Memory Slots */}
          <div className="flex gap-1.5 justify-center mt-4 h-8 overflow-hidden">
             {Array.from({ length: 8 }).map((_, i) => (
               <div 
                key={i} 
                className="w-4 h-full bg-white/5 rounded-sm flex flex-col items-center justify-center gap-1 border border-white/5"
               >
                 <div className={`w-[2px] flex-1 bg-[#9CA764]/20 rounded-full overflow-hidden`}>
                    <div className="w-full bg-[#9CA764] animate-bounce" style={{ height: '40%', animationDuration: `${1 + i * 0.2}s` }} />
                 </div>
               </div>
             ))}
          </div>

          <div className="flex justify-between items-end mt-4 pt-2 border-t border-white/5">
             <div className="flex flex-col gap-0.5">
                <span style={{ fontSize: 6, fontWeight: 900, color: "rgba(180,200,210,0.4)", textTransform: "uppercase" }}>Index Capacity</span>
                <span style={{ fontSize: 8, fontWeight: 700, color: "white", opacity: 0.7, fontFamily: "monospace" }}>
                   98.441 TB / 100 PB
                </span>
             </div>
             <Binary className="w-3 h-3 text-[#9CA764]/30" />
          </div>
        </div>

        {/* ─── INTERFACE ─── */}
        <div className="flex items-center justify-between px-2 pb-2">
           <div className="group flex flex-col items-center gap-1.5 cursor-pointer">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:bg-white/11 active:scale-95"
                style={{ background: "linear-gradient(145deg, #2A2C38 0%, #181A22 100%)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                 <Database className="w-4 h-4 text-[#D4DCE8] opacity-60" />
              </div>
              <span style={{ fontSize: 5, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(215,230,240,0.2)" }}>Index</span>
           </div>

           <div className="relative group cursor-pointer">
              <div className="w-16 h-16 rounded-full p-1" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.1), transparent)" }}>
                 <div className="w-full h-full rounded-full flex items-center justify-center" 
                   style={{ 
                     background: "linear-gradient(135deg, #22242E 0%, #13141C 100%)",
                     boxShadow: "0 8px 16px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)"
                   }}>
                    <Binary className="w-6 h-6 text-[#9CA764]" />
                 </div>
              </div>
           </div>

           <div className="group flex flex-col items-center gap-1.5 cursor-pointer">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:bg-white/11 active:scale-95"
                style={{ background: "linear-gradient(145deg, #2A2C38 0%, #181A22 100%)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                 <Cpu className="w-4 h-4 text-[#D4DCE8] opacity-60" />
              </div>
              <span style={{ fontSize: 5, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(215,230,240,0.2)" }}>Analyze</span>
           </div>
        </div>

        {/* ─── LABEL ─── */}
        <div className="mt-2 flex items-center justify-center gap-2 opacity-20 text-center">
          <p style={{ fontSize: 6, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.3em", color: "#D4DCE8" }}>
            otu genesis engine
          </p>
        </div>
      </div>
    </div>
  );
};

export default GenesisEngine;
