"use client";

import React, { useState, useEffect } from "react";
import { Database, Binary, ShieldCheck, Cpu } from "lucide-react";

const GenesisEngine = () => {
  const [dnaTime, setDnaTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDnaTime(prev => prev + 0.05);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[300px] select-none" style={{ aspectRatio: "0.65/1" }}>
      {/* ─── HARDWARE CHASSIS (Digital Amethyst) ─── */}
      <div
        className="relative w-full h-full rounded-[42px] p-5 flex flex-col gap-4 overflow-hidden shadow-2xl"
        style={{
          background: "linear-gradient(160deg, #1F1B2B 0%, #15111F 55%, #0D0A14 100%)",
          boxShadow: "0 60px 120px -20px rgba(15,5,25,0.8), 0 0 0 1px rgba(114,9,183,0.15), inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.5)",
          border: "1px solid rgba(114,9,183,0.1)"
        }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.08]" 
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/brushed-alum-dark.png')" }} />

        {/* ─── VAULT DISPLAY ─── */}
        <div
          className="relative w-full rounded-2xl overflow-hidden flex flex-col p-4"
          style={{
            aspectRatio: "1/1.1",
            background: "linear-gradient(160deg, #0F0918 0%, #0A0612 100%)",
            border: "1px solid rgba(255,255,255,0.04)",
            boxShadow: "inset 0 2px 15px rgba(0,0,0,0.9)"
          }}
        >
          {/* Vertical Data Stream Background Mask */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(90deg,transparent_0%,white_1px,transparent_1px)]" style={{ backgroundSize: "25% 100%" }} />
          
          <div className="relative z-10 flex justify-between items-center mb-4">
            <div className="flex flex-col">
              <span style={{ fontSize: 7, fontWeight: 900, color: "rgba(181,23,158,0.9)", textTransform: "uppercase", letterSpacing: "0.2em" }}>
                Genesis Vault
              </span>
              <span style={{ fontSize: 6, color: "rgba(180,200,210,0.4)", fontWeight: 700 }}>GENOMIC ARCHIVE v.42</span>
            </div>
            <ShieldCheck className="w-3 h-3 text-[#B5179E]/40" />
          </div>

          {/* MAIN VISUAL: ANIMATED DNA STRAND */}
          <div className="flex-1 relative flex items-center justify-center overflow-hidden">
             {/* Rotating HUD Elements */}
             <div className="absolute w-40 h-40 border border-white/5 rounded-full animate-[spin_30s_linear_infinite]" />
             <div className="absolute w-32 h-32 border border-[#7209B7]/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
             
             {/* Custom SVG DNA Strand */}
             <svg viewBox="0 0 100 160" className="w-20 h-32 opacity-80 overflow-visible">
                {Array.from({ length: 12 }).map((_, i) => {
                  const y = i * 14 + 5;
                  const phase = dnaTime + (i * 0.5);
                  const x1 = 50 + Math.sin(phase) * 35;
                  const x2 = 50 - Math.sin(phase) * 35;
                  const zIndex = Math.cos(phase); // for visual depth
                  
                  return (
                    <g key={i}>
                      {/* Connector Rung */}
                      <line 
                        x1={x1} y1={y} x2={x2} y2={y} 
                        stroke="#7209B7" 
                        strokeWidth="0.5" 
                        opacity={0.3} 
                      />
                      {/* Helix Point 1 */}
                      <circle 
                        cx={x1} cy={y} 
                        r={zIndex > 0 ? 2 : 1.2} 
                        fill={zIndex > 0 ? "#B5179E" : "rgba(114,9,183,0.4)"} 
                        className="shadow-[0_0_8px_#B5179E]"
                      />
                      {/* Helix Point 2 */}
                      <circle 
                        cx={x2} cy={y} 
                        r={zIndex < 0 ? 2 : 1.2} 
                        fill={zIndex < 0 ? "#B5179E" : "rgba(114,9,183,0.4)"}
                        className="shadow-[0_0_8px_#B5179E]"
                      />
                    </g>
                  );
                })}
             </svg>
          </div>

          {/* Scrolling Activity Log (Simplified) */}
          <div className="flex flex-col gap-1 mt-4">
             <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-to-r from-transparent via-[#7209B7] to-transparent animate-[shimmer_2s_infinite]" />
             </div>
             <div className="flex justify-between items-center px-1">
                <span style={{ fontSize: 5, color: "rgba(181,23,158,0.6)", fontWeight: 900 }}>RECONSTRUCTING_CELL_ARCH...</span>
                <span style={{ fontSize: 5, color: "rgba(181,23,158,0.4)", fontWeight: 900 }}>76%</span>
             </div>
          </div>

          <div className="flex justify-between items-end mt-4 pt-2 border-t border-white/5">
             <div className="flex flex-col gap-0.5">
                <span style={{ fontSize: 6, fontWeight: 900, color: "rgba(180,200,210,0.4)", textTransform: "uppercase" }}>Vault Integrity</span>
                <span style={{ fontSize: 8, fontWeight: 700, color: "white", opacity: 0.7, fontFamily: "monospace" }}>
                   SECURE / 0.00ms LATENCY
                </span>
             </div>
             <Binary className="w-3 h-3 text-[#B5179E]/30" />
          </div>
        </div>

        {/* ─── INTERFACE ─── */}
        <div className="flex items-center justify-between px-2 pb-2">
           <div className="group flex flex-col items-center gap-1.5 cursor-pointer">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:bg-purple-950/20 active:scale-95"
                style={{ background: "linear-gradient(145deg, #2A1F3D 0%, #15101F 100%)", border: "1px solid rgba(114,9,183,0.2)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                 <Database className="w-4 h-4 text-[#B5179E] opacity-60" />
              </div>
              <span style={{ fontSize: 5, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(114,9,183,0.2)" }}>Index</span>
           </div>

           <div className="relative group cursor-pointer">
              <div className="w-16 h-16 rounded-full p-1" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.1), transparent)" }}>
                 <div className="w-full h-full rounded-full flex items-center justify-center" 
                   style={{ 
                     background: "linear-gradient(135deg, #1A1224 0%, #0D0914 100%)",
                     boxShadow: "0 8px 16px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)"
                   }}>
                    <Binary className="w-6 h-6 text-[#B5179E]" />
                 </div>
              </div>
           </div>

           <div className="group flex flex-col items-center gap-1.5 cursor-pointer">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:bg-purple-950/20 active:scale-95"
                style={{ background: "linear-gradient(145deg, #2A1F3D 0%, #15101F 100%)", border: "1px solid rgba(114,9,183,0.2)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                 <Cpu className="w-4 h-4 text-[#B5179E] opacity-60" />
              </div>
              <span style={{ fontSize: 5, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(114,9,183,0.2)" }}>Analyze</span>
           </div>
        </div>

        {/* ─── LABEL ─── */}
        <div className="mt-2 text-center opacity-20">
          <p style={{ fontSize: 6, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.3em", color: "#B5179E" }}>
            otu genesis engine
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default GenesisEngine;
