"use client";

import React, { useState, useEffect } from "react";
import { Library, BookOpen, Search, Layers, FileText } from "lucide-react";

const CompendiumVisual = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Cycle through different "encyclopedia" pages
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const species = [
    { name: "Alocasia Otu", family: "Araceae", status: "RESEARCHED" },
    { name: "Ficus Drift", family: "Moraceae", status: "VERIFIED" },
    { name: "Calathea Ssh", family: "Marantaceae", status: "PENDING" },
    { name: "Xylem Fern", family: "Pteridopsida", status: "ARCHIVED" },
  ];

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

        {/* ─── INDEXER SCREEN ─── */}
        <div
          className="relative w-full rounded-2xl overflow-hidden flex flex-col p-4"
          style={{
            aspectRatio: "1/1.1",
            background: "linear-gradient(160deg, #0D1A20 0%, #091318 100%)",
            border: "1px solid rgba(255,255,255,0.04)",
            boxShadow: "inset 0 2px 15px rgba(0,0,0,0.9)"
          }}
        >
          {/* HUD Status */}
          <div className="relative flex justify-between items-start mb-4 z-20">
            <div className="flex flex-col gap-0.5">
               <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#9CA764] animate-pulse" />
                  <span style={{ fontSize: 7, fontWeight: 900, color: "rgba(215,230,240,0.8)", textTransform: "uppercase", letterSpacing: "0.2em" }}>
                    Botanical Indexer
                  </span>
               </div>
               <span style={{ fontSize: 6, color: "rgba(180,200,210,0.3)", fontWeight: 700, fontFamily: "monospace" }}>
                 DB_STATE: LOCAL_SYNC
               </span>
            </div>
            <Search className="w-3 h-3 text-[#9CA764]/40" />
          </div>

          {/* DOCUMENT VISUALIZER */}
          <div className="flex-1 relative flex flex-col gap-3">
             {/* Main "Page" Highlight */}
             <div className="bg-white/5 rounded-lg p-3 border border-white/5 flex flex-col gap-2 transition-all">
                <div className="flex justify-between items-center border-b border-white/5 pb-1">
                   <div className="w-8 h-2 bg-[#9CA764]/20 rounded-full overflow-hidden">
                      <div className="w-2/3 h-full bg-[#9CA764] animate-pulse" />
                   </div>
                   <span style={{ fontSize: 5, color: "white", opacity: 0.3 }}>#0822-X</span>
                </div>
                <div className="flex gap-3 items-center">
                   <div className="w-10 h-10 rounded-md bg-[#9CA764]/10 border border-[#9CA764]/20 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#9CA764]" />
                   </div>
                   <div className="flex flex-col">
                      <span style={{ fontSize: 10, fontWeight: 900, color: "white" }}>{species[activeIndex].name}</span>
                      <span style={{ fontSize: 6, color: "rgba(215,230,240,0.4)", fontWeight: 700 }}>{species[activeIndex].family}</span>
                   </div>
                </div>
             </div>

             {/* Secondary Entries */}
             <div className="space-y-1.5 py-1">
                {species.map((s, i) => (
                   <div key={i} className={`flex items-center justify-between px-2 py-1.5 rounded transition-all duration-500 ${i === activeIndex ? 'bg-white/10 opacity-100' : 'opacity-20 translate-x-1'}`}>
                      <div className="flex items-center gap-2">
                         <div className={`w-1 h-1 rounded-full ${i === activeIndex ? 'bg-[#9CA764]' : 'bg-white/20'}`} />
                         <span style={{ fontSize: 7, fontWeight: 700, color: "white" }}>{s.name}</span>
                      </div>
                      <span style={{ fontSize: 6, fontWeight: 900, color: "#9CA764" }}>{s.status}</span>
                   </div>
                ))}
             </div>
          </div>

          <div className="flex justify-between items-end mt-4 pt-2 border-t border-white/5 capitalize">
             <div className="flex flex-col gap-0.5">
                <span style={{ fontSize: 6, fontWeight: 900, color: "rgba(180,200,210,0.4)", textTransform: "uppercase" }}>Global Index</span>
                <span style={{ fontSize: 8, fontWeight: 700, color: "white", opacity: 0.7, fontFamily: "monospace" }}>
                   12,482 Entries
                </span>
             </div>
             <Layers className="w-3 h-3 text-[#9CA764]/30" />
          </div>
        </div>

        {/* ─── PHYSICAL BUTTONS ─── */}
        <div className="flex items-center justify-between px-2 pb-2">
           <div className="group flex flex-col items-center gap-1.5 cursor-pointer">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:bg-white/11 active:scale-95"
                style={{ background: "linear-gradient(145deg, #2A2C38 0%, #181A22 100%)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                 <BookOpen className="w-4 h-4 text-[#D4DCE8] opacity-60" />
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
                    <Search className="w-6 h-6 text-[#9CA764]" />
                 </div>
              </div>
           </div>

           <div className="group flex flex-col items-center gap-1.5 cursor-pointer">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:bg-white/11 active:scale-95"
                style={{ background: "linear-gradient(145deg, #2A2C38 0%, #181A22 100%)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                 <Library className="w-4 h-4 text-[#D4DCE8] opacity-60" />
              </div>
              <span style={{ fontSize: 5, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(215,230,240,0.2)" }}>Library</span>
           </div>
        </div>

        {/* ─── LABEL ─── */}
        <div className="mt-2 flex items-center justify-center gap-2 opacity-20 text-center">
          <p style={{ fontSize: 6, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.3em", color: "#D4DCE8" }}>
            otu botanical compendium
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompendiumVisual;
