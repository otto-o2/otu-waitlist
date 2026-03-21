"use client";

import React, { useState, useEffect } from "react";
import { Database, Binary, ShieldCheck, Cpu } from "lucide-react";
import DeviceChassis from "./DeviceChassis";

const GenesisEngine = () => {
  const [dnaTime, setDnaTime] = useState(0);

  useEffect(() => {
    // 60ms is roughly 15-16 FPS, which is smoother for mobile React state updates without taxing the main thread.
    const interval = setInterval(() => {
      setDnaTime(prev => prev + 0.1); // Increased step size to maintain animation speed
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <DeviceChassis
      chassisGradient="linear-gradient(160deg, #2D1B3E 0%, #1D1128 55%, #120A1A 100%)"
      chassisShadowColor="rgba(2,6,23,0.8)"
      screenBackground="linear-gradient(160deg, #120A1A 0%, #09050D 100%)"
      screenOverlay={
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04] z-10"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/crystal-layer.png')", mixBlendMode: "screen" }}
        />
      }
      phosphorGlow="rgba(232,121,249,0.25)"
      buttons={{
        left: { icon: <Database className="w-5 h-5 text-[#D4DCE8] opacity-60" />, label: "Index" },
        center: { icon: <Binary className="w-8 h-8 text-[#B5179E]" /> },
        right: { icon: <Cpu className="w-5 h-5 text-[#D4DCE8] opacity-60" />, label: "Analyze" },
        sideGradient: "linear-gradient(145deg, #3D2B52 0%, #1D1128 100%)",
        centerGradient: "linear-gradient(135deg, #2D1B3E 0%, #120A1A 100%)",
        labelColor: "rgba(200,180,230,0.25)",
      }}
      engravingText="otu genesis core"
      engravingColor="#64748B"
    >
      {/* Vertical Data Stream Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(90deg,transparent_0%,white_1px,transparent_1px)]" style={{ backgroundSize: "25% 100%" }} />

      {/* Header */}
      <div className="relative z-30 flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <span style={{ fontSize: 10, fontWeight: 900, color: "rgba(180,200,210,0.5)", textTransform: "uppercase", letterSpacing: "0.2em", fontFamily: "'Outfit', sans-serif" }}>
            Genesis Vault
          </span>
          <span style={{ fontSize: 8, color: "rgba(224,64,251,0.6)", fontWeight: 700 }}>GENOMIC ARCHIVE v.42</span>
        </div>
        <ShieldCheck className="w-4 h-4 text-[#E040FB]/60" />
      </div>

      {/* ANIMATED DNA STRAND */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        <div className="absolute w-56 h-56 border border-white/5 rounded-full animate-[spin_30s_linear_infinite]" />
        <div className="absolute w-44 h-44 border border-[#7209B7]/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

        <svg viewBox="0 0 100 160" className="w-28 h-44 opacity-80 overflow-visible">
          {Array.from({ length: 12 }).map((_, i) => {
            const y = i * 14 + 5;
            const phase = dnaTime + (i * 0.5);
            const x1 = 50 + Math.sin(phase) * 35;
            const x2 = 50 - Math.sin(phase) * 35;
            const zIndex = Math.cos(phase);

            return (
              <g key={i}>
                <line x1={x1} y1={y} x2={x2} y2={y} stroke="#7209B7" strokeWidth="0.5" opacity={0.3} />
                <circle cx={x1} cy={y} r={zIndex > 0 ? 2 : 1.2} fill={zIndex > 0 ? "#E040FB" : "rgba(114,9,183,0.7)"} />
                <circle cx={x2} cy={y} r={zIndex < 0 ? 2 : 1.2} fill={zIndex < 0 ? "#E040FB" : "rgba(114,9,183,0.7)"} />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Activity Log */}
      <div className="flex flex-col gap-1 mt-4">
        <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
          <div className="h-full w-2/3 bg-gradient-to-r from-transparent via-[#E040FB] to-transparent animate-[shimmer_2s_infinite]" />
        </div>
        <div className="flex justify-between items-center px-1">
          <span style={{ fontSize: 7, color: "rgba(224,64,251,0.8)", fontWeight: 900 }}>RECONSTRUCTING_CELL_ARCH...</span>
          <span style={{ fontSize: 7, color: "rgba(224,64,251,0.6)", fontWeight: 900 }}>76%</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-end mt-4 pt-2 border-t border-white/5">
        <div className="flex flex-col gap-0.5">
          <span style={{ fontSize: 8, fontWeight: 900, color: "rgba(180,200,210,0.4)", textTransform: "uppercase" }}>Vault Integrity</span>
          <span className="font-mono" style={{ fontSize: 11, fontWeight: 700, color: "white", opacity: 0.7 }}>
            SECURE / 0.00ms LATENCY
          </span>
        </div>
        <Binary className="w-4 h-4 text-[#E040FB]/50" />
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </DeviceChassis>
  );
};

export default GenesisEngine;
