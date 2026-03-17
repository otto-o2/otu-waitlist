"use client";

import React, { useState, useEffect } from "react";
import { Activity, Thermometer, Droplets, Sun, ShieldAlert, Cpu } from "lucide-react";

const WardScanner = () => {
  const [vitals, setVitals] = useState({ photosyn: 94, turgor: 0.82, thermal: 22.4, growth: 1.2 });

  // Subtle vital fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setVitals(prev => ({
        photosyn: Math.min(100, Math.max(80, prev.photosyn + (Math.random() - 0.5))),
        turgor: Number((prev.turgor + (Math.random() - 0.5) * 0.01).toFixed(2)),
        thermal: Number((prev.thermal + (Math.random() - 0.5) * 0.1).toFixed(1)),
        growth: Number((prev.growth + (Math.random() - 0.5) * 0.05).toFixed(1)),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[300px] select-none" style={{ aspectRatio: "0.65/1" }}>
      {/* ─── HARDWARE CHASSIS (Obsidian Emerald) ─── */}
      <div
        className="relative w-full h-full rounded-[42px] p-5 flex flex-col gap-4 overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #1A2E22 0%, #111D16 55%, #0A110D 100%)",
          boxShadow: "0 60px 120px -20px rgba(5,15,5,0.75), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,255,255,0.05)"
        }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.08]" 
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/brushed-alum-dark.png')" }} />

        {/* ─── SCANNER SCREEN (Green Abyss) ─── */}
        <div
          className="relative w-full rounded-2xl overflow-hidden flex flex-col p-3"
          style={{
            aspectRatio: "1/1.1",
            background: "linear-gradient(160deg, #051205 0%, #020802 100%)",
            border: "1px solid rgba(0,255,100,0.08)",
            boxShadow: "inset 0 2px 20px rgba(0,0,0,0.9)"
          }}
        >
          {/* Scanning Beam Overlay */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
            <div className="w-full h-[1px] bg-[#00FF41]/40 animate-[sweep_3s_ease-in-out_infinite]" />
            <div className="w-full h-20 bg-gradient-to-b from-[#00FF41]/10 to-transparent animate-[sweep_3s_ease-in-out_infinite] opacity-50" />
          </div>

          {/* HUD Header */}
          <div className="relative flex justify-between items-start mb-4 z-20">
            <div className="flex flex-col gap-0.5">
               <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse shadow-[0_0_5px_#00FF41]" />
                  <span style={{ fontSize: 7, fontWeight: 900, color: "rgba(0,255,65,0.8)", textTransform: "uppercase", letterSpacing: "0.2em" }}>
                    Ward Mode Core
                  </span>
               </div>
               <span style={{ fontSize: 6, color: "rgba(0,255,65,0.4)", fontWeight: 700, fontFamily: "monospace" }}>
                 SYS_STATE: SCAN_ACTIVE
               </span>
            </div>
            <ShieldAlert className="w-3 h-3 text-[#00FF41]/40" />
          </div>

          {/* VITAL WAVEFORM */}
          <div className="w-full h-1/4 bg-black/40 rounded-xl border border-green-900/20 relative overflow-hidden flex items-center mb-4">
            <div className="absolute inset-0 opacity-[0.05] bg-[repeating-linear-gradient(0deg,transparent,transparent_14px,rgba(0,255,65,0.2)_15px),repeating-linear-gradient(90deg,transparent,transparent_14px,rgba(0,255,65,0.2)_15px)]" />
            <svg viewBox="0 0 200 60" className="w-full h-full text-[#00FF41] stroke-current fill-none">
              <path 
                d="M 0 30 Q 10 30 15 30 L 20 10 L 25 50 L 30 30 L 70 30 L 75 10 L 80 50 L 85 30 L 120 30 L 125 10 L 130 50 L 135 30 L 200 30" 
                strokeWidth="2"
                className="animate-[dash_8s_linear_infinite]"
              />
            </svg>
          </div>

          {/* VITALS GRID */}
          <div className="grid grid-cols-2 gap-2 flex-1 relative z-20">
             <div className="bg-white/5 rounded-lg p-2 border border-white/5 flex flex-col gap-0.5">
                <Sun className="w-2.5 h-2.5 text-[#00FF41]/60" />
                <span style={{ fontSize: 6, fontWeight: 900, color: "rgba(0,255,65,0.4)", textTransform: "uppercase" }}>Photosyn</span>
                <span style={{ fontSize: 10, fontWeight: 900, color: "white" }}>{vitals.photosyn.toFixed(0)}%</span>
             </div>
             <div className="bg-white/5 rounded-lg p-2 border border-white/5 flex flex-col gap-0.5">
                <Droplets className="w-2.5 h-2.5 text-[#00FF41]/60" />
                <span style={{ fontSize: 6, fontWeight: 900, color: "rgba(0,255,65,0.4)", textTransform: "uppercase" }}>Turgor</span>
                <span style={{ fontSize: 10, fontWeight: 900, color: "white" }}>{vitals.turgor}mPa</span>
             </div>
             <div className="bg-white/5 rounded-lg p-2 border border-white/5 flex flex-col gap-0.5">
                <Thermometer className="w-2.5 h-2.5 text-[#00FF41]/60" />
                <span style={{ fontSize: 6, fontWeight: 900, color: "rgba(0,255,65,0.4)", textTransform: "uppercase" }}>Thermal</span>
                <span style={{ fontSize: 10, fontWeight: 900, color: "white" }}>{vitals.thermal}°C</span>
             </div>
             <div className="bg-white/5 rounded-lg p-2 border border-white/5 flex flex-col gap-0.5">
                <Activity className="w-2.5 h-2.5 text-[#00FF41]/60" />
                <span style={{ fontSize: 6, fontWeight: 900, color: "rgba(0,255,65,0.4)", textTransform: "uppercase" }}>Growth</span>
                <span style={{ fontSize: 10, fontWeight: 900, color: "white" }}>+{vitals.growth}mm</span>
             </div>
          </div>
        </div>

        {/* ─── PHYSICAL SCANNER BUTTONS ─── */}
        <div className="flex items-center justify-between px-2 pb-2">
           <div className="group flex flex-col items-center gap-1.5 cursor-pointer">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:bg-white/11 active:scale-95"
                style={{ background: "linear-gradient(145deg, #2A2C38 0%, #181A22 100%)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                 <Cpu className="w-4 h-4 text-[#D4DCE8] opacity-60" />
              </div>
              <span style={{ fontSize: 5, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(215,230,240,0.2)" }}>Diagnostic</span>
           </div>

           <div className="relative group cursor-pointer">
              <div className="w-16 h-16 rounded-full p-1" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.1), transparent)" }}>
                 <div className="w-full h-full rounded-full flex items-center justify-center" 
                   style={{ 
                     background: "linear-gradient(135deg, #22242E 0%, #13141C 100%)",
                     boxShadow: "0 8px 16px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)"
                   }}>
                    <Activity className="w-6 h-6 text-[#00FF41] shadow-[0_0_10px_rgba(0,255,65,0.4)]" />
                 </div>
              </div>
           </div>

           <div className="group flex flex-col items-center gap-1.5 cursor-pointer">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:bg-white/11 active:scale-95"
                style={{ background: "linear-gradient(145deg, #2A2C38 0%, #181A22 100%)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                 <Sun className="w-4 h-4 text-[#D4DCE8] opacity-60" />
              </div>
              <span style={{ fontSize: 5, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(215,230,240,0.2)" }}>History</span>
           </div>
        </div>

        {/* ─── LABEL ─── */}
        <div className="mt-2 flex items-center justify-center gap-2 opacity-20 text-center">
          <p style={{ fontSize: 6, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.3em", color: "#D4DCE8" }}>
            otu medical core module
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes dash {
          0% { stroke-dasharray: 0, 1000; stroke-dashoffset: 0; }
          100% { stroke-dasharray: 1000, 1000; stroke-dashoffset: 0; }
        }
        @keyframes sweep {
          0%, 100% { transform: translateY(0); opacity: 0; }
          50% { transform: translateY(220px); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default WardScanner;
