"use client";

import React, { useState, useEffect } from "react";
import { Activity, Thermometer, Droplets, Sun, ShieldAlert, Cpu } from "lucide-react";
import DeviceChassis from "./DeviceChassis";

const WardScanner = () => {
  const [vitals, setVitals] = useState({ photosyn: 94, turgor: 0.82, thermal: 22.4, growth: 1.2 });

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
    <DeviceChassis
      chassisGradient="linear-gradient(160deg, #1E293B 0%, #0F172A 55%, #020617 100%)"
      chassisShadowColor="rgba(2,6,23,0.8)"
      screenBackground="linear-gradient(160deg, #101827 0%, #070B14 100%)"
      screenOverlay={
        <div
          className="absolute inset-0 pointer-events-none opacity-40 z-10"
          style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03), transparent)" }}
        />
      }
      phosphorGlow="rgba(52,211,153,0.15)"
      buttons={{
        left: { icon: <Cpu className="w-5 h-5 text-[#D4DCE8] opacity-60" />, label: "Diagnostic" },
        center: { icon: <Activity className="w-8 h-8 text-[#10B981]" /> },
        right: { icon: <Sun className="w-5 h-5 text-[#D4DCE8] opacity-60" />, label: "History" },
        sideGradient: "linear-gradient(145deg, #24344D 0%, #101A2B 100%)",
        centerGradient: "linear-gradient(135deg, #1E2D44 0%, #0D1524 100%)",
        labelColor: "rgba(180,200,230,0.3)",
      }}
      engravingText="otu medical core module"
      engravingColor="#64748B"
    >
      {/* Scanning Beam Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        <div className="w-full h-[1px] bg-[#10B981]/40 animate-[sweep_3s_ease-in-out_infinite]" />
        <div className="w-full h-20 bg-gradient-to-b from-[#10B981]/10 to-transparent animate-[sweep_3s_ease-in-out_infinite] opacity-50" />
      </div>

      {/* HUD Header */}
      <div className="relative flex justify-between items-start mb-4 z-30">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span style={{ fontSize: 10, fontWeight: 900, color: "rgba(180,200,210,0.5)", textTransform: "uppercase", letterSpacing: "0.2em", fontFamily: "'Outfit', sans-serif" }}>
              Ward Mode Core
            </span>
          </div>
          <span className="font-mono" style={{ fontSize: 8, color: "rgba(16,185,129,0.3)", fontWeight: 700 }}>
            SYS_STATE: SCAN_ACTIVE
          </span>
        </div>
        <ShieldAlert className="w-4 h-4 text-[#10B981]/40" />
      </div>

      {/* VITAL WAVEFORM */}
      <div className="w-full h-1/4 bg-black/40 rounded-xl border border-white/5 relative overflow-hidden flex items-center mb-4">
        <div className="absolute inset-0 opacity-[0.05] bg-[repeating-linear-gradient(0deg,transparent,transparent_14px,white_15px),repeating-linear-gradient(90deg,transparent,transparent_14px,white_15px)]" />
        <svg viewBox="0 0 200 60" className="w-full h-full text-[#10B981] stroke-current fill-none">
          <path
            d="M 0 30 Q 10 30 15 30 L 20 10 L 25 50 L 30 30 L 70 30 L 75 10 L 80 50 L 85 30 L 120 30 L 125 10 L 130 50 L 135 30 L 200 30"
            strokeWidth="2"
            className="animate-[dash_8s_linear_infinite]"
          />
        </svg>
      </div>

      {/* VITALS GRID */}
      <div className="grid grid-cols-2 gap-3 flex-1 relative z-20">
        <div className="bg-white/5 rounded-lg p-2.5 border border-white/5 flex flex-col gap-1">
          <Sun className="w-4 h-4 text-[#10B981]/60" />
          <span style={{ fontSize: 8, fontWeight: 900, color: "rgba(215,230,240,0.3)", textTransform: "uppercase" }}>Photosyn</span>
          <span style={{ fontSize: 14, fontWeight: 900, color: "white" }}>{vitals.photosyn.toFixed(0)}%</span>
        </div>
        <div className="bg-white/5 rounded-lg p-2.5 border border-white/5 flex flex-col gap-1">
          <Droplets className="w-4 h-4 text-[#10B981]/60" />
          <span style={{ fontSize: 8, fontWeight: 900, color: "rgba(215,230,240,0.3)", textTransform: "uppercase" }}>Turgor</span>
          <span style={{ fontSize: 14, fontWeight: 900, color: "white" }}>{vitals.turgor}mPa</span>
        </div>
        <div className="bg-white/5 rounded-lg p-2.5 border border-white/5 flex flex-col gap-1">
          <Thermometer className="w-4 h-4 text-[#10B981]/60" />
          <span style={{ fontSize: 8, fontWeight: 900, color: "rgba(215,230,240,0.3)", textTransform: "uppercase" }}>Thermal</span>
          <span style={{ fontSize: 14, fontWeight: 900, color: "white" }}>{vitals.thermal}°C</span>
        </div>
        <div className="bg-white/5 rounded-lg p-2.5 border border-white/5 flex flex-col gap-1">
          <Activity className="w-4 h-4 text-[#10B981]/60" />
          <span style={{ fontSize: 8, fontWeight: 900, color: "rgba(215,230,240,0.3)", textTransform: "uppercase" }}>Growth</span>
          <span style={{ fontSize: 14, fontWeight: 900, color: "white" }}>+{vitals.growth}mm</span>
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
    </DeviceChassis>
  );
};

export default WardScanner;
