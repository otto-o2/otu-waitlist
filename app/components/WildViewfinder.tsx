"use client";

import React, { useState, useEffect } from "react";
import { Compass, ShieldCheck, Target, Camera, Database, ChevronRight, Binary } from "lucide-react";

const WildViewfinder = () => {
  const [scanProgress, setScanProgress] = useState(65);
  const [isCapturing, setIsCapturing] = useState(false);
  const [dnaFeed, setDnaFeed] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: 52.5200, lng: 13.4050 });

  // Generate a shifting DNA-like sequence
  useEffect(() => {
    const chars = "ATCG-";
    const interval = setInterval(() => {
      let newStr = "";
      for (let i = 0; i < 18; i++) {
        newStr += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setDnaFeed(newStr);
      
      // Shift coords slightly for "motion" feeling
      setCoordinates(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.0001,
        lng: prev.lng + (Math.random() - 0.5) * 0.0001
      }));
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const handleCapture = () => {
    setIsCapturing(true);
    setTimeout(() => setIsCapturing(false), 800);
  };

  return (
    <div className="relative w-full max-w-[300px] select-none" style={{ aspectRatio: "0.65/1" }}>
      {/* ─── HARDWARE CHASSIS ─── */}
      <div
        className="relative w-full h-full rounded-[42px] p-5 flex flex-col gap-4 overflow-hidden"
        style={{
          background: "linear-gradient(170deg, #1B261B 0%, #0F160F 60%, #050805 100%)",
          boxShadow: "0 60px 120px -20px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.08), inset 0 -2px 10px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.05)"
        }}
      >
        {/* Brushed Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]" 
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/brushed-alum-dark.png')" }} />

        {/* ─── RADIOMETRIC SCREEN ─── */}
        <div
          className="relative w-full rounded-2xl overflow-hidden flex flex-col p-3 border border-white/5"
          style={{
            aspectRatio: "1/1.1",
            background: "#080C08",
            boxShadow: "inset 0 2px 15px rgba(0,0,0,0.9)"
          }}
        >
          {/* Scanline / Grid Effect */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.08] bg-[radial-gradient(#9CA764_1px,transparent_1px)]" 
            style={{ backgroundSize: "14px 14px" }} />
          
          {/* Radial Radar Sweep */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full m-2">
            <div className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2"
              style={{
                background: "conic-gradient(from 0deg, transparent 80%, rgba(156,167,100,0.15) 100%)",
                animation: "radarSweep 5s linear infinite"
              }}
            />
          </div>

          {/* HUD: Top Bar */}
          <div className="relative flex justify-between items-start mb-2">
            <div className="flex flex-col gap-0.5">
               <div className="flex items-center gap-1.5">
                  <Target className="w-2.5 h-2.5 text-[#9CA764]" />
                  <span style={{ fontSize: 7, fontWeight: 900, color: "rgba(156,167,100,0.9)", textTransform: "uppercase", letterSpacing: "0.2em" }}>
                    discovery lock: active
                  </span>
               </div>
               <span style={{ fontSize: 6, color: "rgba(156,167,100,0.3)", fontWeight: 700, fontFamily: "monospace" }}>
                 GENE_SIG: {dnaFeed.slice(0, 8)}..
               </span>
            </div>
            <div className="flex gap-1">
               <div className="w-3 h-[2px] bg-[#9CA764] opacity-40" />
               <div className="w-1 h-[2px] bg-[#9CA764] opacity-40" />
            </div>
          </div>

          {/* CENTRAL SPECIMEN VISUALIZER */}
          <div className="flex-1 relative flex items-center justify-center">
             {/* 3D Wireframe Leaf Visual */}
             <div className={`relative transition-all duration-700 ${isCapturing ? 'scale-110' : 'scale-100'}`}>
                <svg viewBox="0 0 100 100" className="w-32 h-32 opacity-80">
                   <defs>
                      <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                         <stop offset="0%" stopColor="rgba(156,167,100,0.1)" />
                         <stop offset="50%" stopColor="rgba(156,167,100,0.4)" />
                         <stop offset="100%" stopColor="rgba(156,167,100,0.1)" />
                      </linearGradient>
                   </defs>
                   {/* Main Leaf Body Wireframe */}
                   <path 
                     d="M50 85 C50 85 20 60 20 35 C20 15 50 5 50 5 C50 5 80 15 80 35 C80 60 50 85 50 85 Z" 
                     fill="none" 
                     stroke="rgba(156,167,100,0.5)" 
                     strokeWidth="0.5"
                     className="animate-[pulse_4s_ease-in-out_infinite]"
                   />
                   {/* Veins */}
                   <path d="M50 85 L50 5 M50 70 L30 50 M50 50 L25 35 M50 30 L35 15 M50 70 L70 50 M50 50 L75 35 M50 30 L65 15" 
                     fill="none" stroke="rgba(156,167,100,0.3)" strokeWidth="0.5" />
                   {/* Point Cloud "Genomic Points" */}
                   {[...Array(8)].map((_, i) => (
                     <circle 
                       key={i} 
                       cx={30 + Math.random() * 40} 
                       cy={20 + Math.random() * 50} 
                       r="0.8" 
                       fill="#9CA764" 
                       className="animate-pulse"
                       style={{ animationDelay: `${i * 0.4}s` }}
                     />
                   ))}
                </svg>
                {/* Captured "Discovery" Rings */}
                {isCapturing && (
                   <div className="absolute inset-0 border-2 border-[#9CA764] rounded-full animate-[ping_0.8s_ease-out_infinite]" />
                )}
             </div>
          </div>

          {/* HUD: Bottom readout */}
          <div className="flex justify-between items-end mt-2 pt-2 border-t border-white/5">
             <div className="flex flex-col gap-0.5">
                <span style={{ fontSize: 6, fontWeight: 900, color: "rgba(156,167,100,0.4)", textTransform: "uppercase" }}>GEO-COORDS</span>
                <span style={{ fontSize: 8, fontWeight: 700, color: "white", opacity: 0.7, fontFamily: "monospace" }}>
                   {coordinates.lat.toFixed(4)}°N {coordinates.lng.toFixed(4)}°E
                </span>
             </div>
             <div className="flex flex-col items-end gap-1">
                <div className="flex gap-[1px]">
                   {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-[10px] h-[3px]" style={{ background: i < 3 ? '#9CA764' : 'rgba(255,255,255,0.1)' }} />
                   ))}
                </div>
                <span style={{ fontSize: 6, fontWeight: 900, color: "rgba(156,167,100,0.8)", textTransform: "uppercase" }}>LIDAR MATCH: 82.4%</span>
             </div>
          </div>
        </div>

        {/* ─── PHYSICAL CONTROLS ─── */}
        <div className="flex items-center justify-between px-2 pb-2">
           {/* Left Toggle (Database/Gene) */}
           <div className="group flex flex-col items-center gap-1.5 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:bg-white/10 active:scale-95">
                 <Binary className="w-4 h-4 text-[#9CA764] opacity-60" />
              </div>
              <span style={{ fontSize: 5, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)" }}>GENE</span>
           </div>

           {/* MAIN CAPTURE BUTTON */}
           <div className="relative group cursor-pointer" onClick={handleCapture}>
              <div className="absolute -inset-2 bg-[#9CA764]/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-16 h-16 rounded-full p-1" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.15), transparent)" }}>
                 <div className="w-full h-full rounded-full flex items-center justify-center" 
                   style={{ 
                     background: "linear-gradient(135deg, #1B261B 0%, #050805 100%)",
                     boxShadow: "0 4px 15px rgba(0,0,0,0.4), inset 0 1px 1px rgba(156,167,100,0.2)"
                   }}>
                    <Camera className={`w-6 h-6 text-[#9CA764] transition-all duration-300 ${isCapturing ? 'scale-75' : 'group-hover:scale-110'}`} />
                 </div>
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                 <span style={{ fontSize: 6, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "#9CA764" }}>DISCOVER</span>
              </div>
           </div>

           {/* Right Toggle (Compass/Map) */}
           <div className="group flex flex-col items-center gap-1.5 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:bg-white/10 active:scale-95">
                 <Compass className="w-4 h-4 text-[#9CA764] opacity-60" />
              </div>
              <span style={{ fontSize: 5, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)" }}>MAP</span>
           </div>
        </div>

        {/* ─── BOTTOM ENGRAVING ─── */}
        <div className="mt-2 flex items-center justify-center gap-2 opacity-20">
          <div className="w-1 h-1 rounded-full bg-[#9CA764]" />
          <p style={{ fontSize: 6, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.3em", color: "#9CA764" }}>
            otu wild discovery core
          </p>
          <div className="w-1 h-1 rounded-full bg-[#9CA764]" />
        </div>

        {/* Shine Overlay */}
        <div className="absolute inset-0 pointer-events-none rounded-[42px] border border-white/[0.05]" />
      </div>

      <style>{`
        @keyframes radarSweep {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default WildViewfinder;
