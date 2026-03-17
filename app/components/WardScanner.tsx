"use client";

import React from "react";
import { Activity, ShieldAlert, Thermometer, Droplets, Sun } from "lucide-react";

const WardScanner = () => {
  return (
    <div className="relative w-full max-w-[320px] aspect-[0.7/1] flex items-center justify-center p-4 select-none">
      {/* Main Glass Housing */}
      <div className="relative w-full h-full bg-[#1B261B]/90 rounded-[40px] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden backdrop-blur-md">
        
        {/* Scanning Laser Beam */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#9CA764] to-transparent z-30 animate-[scan_4s_ease-in-out_infinite]" />
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#9CA764]/20 to-transparent z-20 animate-[scan_4s_ease-in-out_infinite] opacity-50" />

        {/* Top Header - Clinical Header */}
        <div className="p-6 flex justify-between items-center border-b border-white/5">
          <div className="flex flex-col">
            <span className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-[#9CA764]">ward mode core</span>
            <span className="text-[8px] font-sans font-bold text-white/30">System Status: Scanning Active</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-[#9CA764] animate-pulse" />
        </div>

        {/* Central Vitals Display */}
        <div className="flex-1 p-6 flex flex-col gap-6">
          {/* Waveform Window */}
          <div className="w-full h-1/3 bg-black/40 rounded-2xl border border-white/5 relative overflow-hidden flex items-center">
            {/* Grid Lines */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_19px,white_20px),repeating-linear-gradient(90deg,transparent,transparent_19px,white_20px)]" />
            
            {/* The Vital Waveform (Animated Path) */}
            <svg viewBox="0 0 200 60" className="w-full h-full text-[#9CA764] stroke-current fill-none">
              <path 
                d="M 0 30 Q 10 30 15 30 L 20 10 L 25 50 L 30 30 L 70 30 L 75 10 L 80 50 L 85 30 L 120 30 L 125 10 L 130 50 L 135 30 L 200 30" 
                strokeWidth="2"
                className="animate-[dash_10s_linear_infinite]"
              />
            </svg>
          </div>

          {/* Plant "Vitals" Grid */}
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex flex-col gap-1">
                <div className="flex justify-between items-center">
                   <Sun className="w-3 h-3 text-[#9CA764]" />
                   <span className="text-[8px] font-sans font-black text-white/40 uppercase">Photosyn</span>
                </div>
                <div className="flex gap-1 items-end">
                   <span className="text-xl font-sans font-black text-white">94</span>
                   <span className="text-[8px] text-white/20 mb-1 font-bold">%</span>
                </div>
             </div>
             
             <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex flex-col gap-1">
                <div className="flex justify-between items-center">
                   <Droplets className="w-3 h-3 text-[#9CA764]" />
                   <span className="text-[8px] font-sans font-black text-white/40 uppercase">Turgor</span>
                </div>
                <div className="flex gap-1 items-end">
                   <span className="text-xl font-sans font-black text-white">0.82</span>
                   <span className="text-[8px] text-white/20 mb-1 font-bold">mPa</span>
                </div>
             </div>

             <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex flex-col gap-1">
                <div className="flex justify-between items-center">
                   <Thermometer className="w-3 h-3 text-[#9CA764]" />
                   <span className="text-[8px] font-sans font-black text-white/40 uppercase">Thermal</span>
                </div>
                <div className="flex gap-1 items-end">
                   <span className="text-xl font-sans font-black text-white">22.4</span>
                   <span className="text-[8px] text-white/20 mb-1 font-bold">°C</span>
                </div>
             </div>

             <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex flex-col gap-1">
                <div className="flex justify-between items-center">
                   <Activity className="w-3 h-3 text-[#9CA764]" />
                   <span className="text-[8px] font-sans font-black text-white/40 uppercase">Growth</span>
                </div>
                <div className="flex gap-1 items-end">
                   <span className="text-xl font-sans font-black text-white">+1.2</span>
                   <span className="text-[8px] text-white/20 mb-1 font-bold">mm/d</span>
                </div>
             </div>
          </div>
        </div>

        {/* Footer Technical Plate */}
        <div className="p-6 bg-black/20 border-t border-white/5 flex flex-col gap-2">
           <div className="flex justify-between text-[7px] font-sans font-bold text-white/30 uppercase tracking-[0.2em]">
              <span>Diagnostic Protocol 4-Beta</span>
              <span>otu med-core</span>
           </div>
           {/* Progress Ring or Circular Indicator */}
           <div className="flex gap-2">
              <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full w-2/3 bg-[#9CA764] animate-pulse" />
              </div>
           </div>
        </div>

        {/* Glass Reflections */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent opacity-50" />
      </div>

      <style jsx>{`
        @keyframes scan {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(500px); }
        }
        @keyframes dash {
          0% { stroke-dasharray: 0, 1000; stroke-dashoffset: 0; }
          100% { stroke-dasharray: 1000, 1000; stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
};

export default WardScanner;
