"use client";

import React, { useState, useEffect, useRef } from "react";
import { Compass, Target, Camera, Binary } from "lucide-react";

interface RadarTarget {
  id: number;
  x: number; // 0-100
  y: number; // 0-100
  angle: number; // 0-360
  dist: number; // 0-50
  intensity: number; // 0-1
  opacity: number;
  lastPing: number; // timestamp
}

const WildViewfinder = () => {
  const [dnaFeed, setDnaFeed] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: 52.5201, lng: 13.4049 });
  const [angle, setAngle] = useState(0);
  const [targets, setTargets] = useState<RadarTarget[]>([]);
  const requestRef = useRef<number>(null);
  const lastAngleRef = useRef(0);

  // Initialize fixed "biological" targets in polar space
  useEffect(() => {
    const initialTargets: RadarTarget[] = [
      { id: 1, x: 0, y: 0, angle: 45, dist: 35, intensity: 0.8, opacity: 0, lastPing: 0 },
      { id: 2, x: 0, y: 0, angle: 120, dist: 15, intensity: 0.4, opacity: 0, lastPing: 0 },
      { id: 3, x: 0, y: 0, angle: 190, dist: 42, intensity: 0.9, opacity: 0, lastPing: 0 },
      { id: 4, x: 0, y: 0, angle: 260, dist: 28, intensity: 0.6, opacity: 0, lastPing: 0 },
      { id: 5, x: 0, y: 0, angle: 310, dist: 22, intensity: 0.5, opacity: 0, lastPing: 0 },
      { id: 6, x: 0, y: 0, angle: 80, dist: 48, intensity: 0.3, opacity: 0, lastPing: 0 },
    ];
    
    // Map polar to cartesian (center is 50,50)
    const processed = initialTargets.map(t => {
      const rad = (t.angle - 90) * (Math.PI / 180);
      return {
        ...t,
        x: 50 + t.dist * Math.cos(rad),
        y: 50 + t.dist * Math.sin(rad)
      };
    });
    setTargets(processed);
  }, []);

  // Radar logic: Sweep rotation + collision detection
  const animate = (time: number) => {
    // Rotation speed: ~3 seconds per sweep
    const currentAngle = (time / 30) % 360;
    setAngle(currentAngle);

    setTargets(prev => prev.map(t => {
      // If the sweep line just passed this target's angle
      const diff = (currentAngle - t.angle + 360) % 360;
      const wasJustHit = diff < 4 && (lastAngleRef.current - t.angle + 360) % 360 > 350;
      
      let newOpacity = t.opacity;
      if (wasJustHit) {
        newOpacity = 1; // Flash to full
      } else {
        newOpacity = Math.max(0, t.opacity - 0.015); // Quick fade
      }
      
      return { ...t, opacity: newOpacity };
    }));

    lastAngleRef.current = currentAngle;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Ancillary HUD effects
  useEffect(() => {
    const chars = "ATCG-";
    const interval = setInterval(() => {
      let newStr = "";
      for (let i = 0; i < 12; i++) {
        newStr += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setDnaFeed(newStr);
      setCoordinates(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.00005,
        lng: prev.lng + (Math.random() - 0.5) * 0.00005
      }));
    }, 150);
    return () => clearInterval(interval);
  }, []);

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
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]" 
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/brushed-alum-dark.png')" }} />

        {/* ─── RADAR SCREEN ─── */}
        <div
          className="relative w-full rounded-2xl overflow-hidden flex flex-col p-3"
          style={{
            aspectRatio: "1/1.1",
            background: "radial-gradient(circle at center, #0F1A0F 0%, #060906 100%)",
            border: "1px solid rgba(156,167,100,0.1)",
            boxShadow: "inset 0 0 40px rgba(0,0,0,0.8)"
          }}
        >
          {/* Static Grid Circles */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none">
            <div className="w-[20%] h-[20%] border border-[#9CA764] rounded-full" />
            <div className="absolute w-[40%] h-[40%] border border-[#9CA764] rounded-full" />
            <div className="absolute w-[60%] h-[60%] border border-[#9CA764] rounded-full" />
            <div className="absolute w-[80%] h-[80%] border border-[#9CA764] rounded-full" />
            {/* Crosshairs */}
            <div className="absolute w-[1px] h-full bg-[#9CA764]" />
            <div className="absolute h-[1px] w-full bg-[#9CA764]" />
          </div>

          {/* HUD: Top Status */}
          <div className="relative flex justify-between items-start mb-2 z-20">
            <div className="flex flex-col gap-0.5">
               <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#9CA764] animate-pulse" />
                  <span style={{ fontSize: 7, fontWeight: 900, color: "rgba(156,167,100,0.9)", textTransform: "uppercase", letterSpacing: "0.2em" }}>
                    radar active
                  </span>
               </div>
               <span style={{ fontSize: 6, color: "rgba(156,167,100,0.3)", fontWeight: 700, fontFamily: "monospace" }}>
                 LIDAR_SEQ: {dnaFeed}
               </span>
            </div>
            <div className="flex flex-col items-end">
               <span style={{ fontSize: 6, fontWeight: 900, color: "rgba(156,167,100,0.4)" }}>SWEEP_72HZ</span>
            </div>
          </div>

          {/* SWEEP & TARGETS CONTAINER */}
          <div className="flex-1 relative">
            {/* Sweep Line */}
            <div 
              className="absolute top-1/2 left-1/2 w-[100%] h-[2px] -translate-y-1/2 origin-left z-10"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(156,167,100,0.6) 100%)",
                transform: `translate(0, -50%) rotate(${angle - 90}deg)`,
                width: "50%"
              }}
            />
            {/* Conic Glow trailing sweep */}
            <div 
              className="absolute top-1/2 left-1/2 w-[100%] h-[100%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                background: `conic-gradient(from ${angle - 10}deg, rgba(156,167,100,0.12) 0%, transparent 40deg)`,
                borderRadius: "50%"
              }}
            />

            {/* Beeping Radar Dots */}
            {targets.map(t => (
              <div 
                key={t.id}
                className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${t.x}%`,
                  top: `${t.y}%`,
                  opacity: t.opacity,
                  transition: "opacity 0.05s linear"
                }}
              >
                {/* Core Dot */}
                <div className="w-1 h-1 bg-[#9CA764] rounded-full shadow-[0_0_8px_rgba(156,167,100,1)]" />
                {/* Beep Ripple */}
                {t.opacity > 0.9 && (
                  <div className="absolute inset-0 border border-[#9CA764] rounded-full animate-[ping_0.6s_ease-out_infinite]" />
                )}
              </div>
            ))}
          </div>

          {/* HUD: Bottom Readings */}
          <div className="relative flex justify-between items-end mt-2 pt-2 border-t border-white/5 z-20">
             <div className="flex flex-col gap-0.5">
                <span style={{ fontSize: 6, fontWeight: 900, color: "rgba(156,167,100,0.4)", textTransform: "uppercase" }}>TARGET_COORD</span>
                <span style={{ fontSize: 8, fontWeight: 700, color: "white", opacity: 0.7, fontFamily: "monospace" }}>
                   {coordinates.lat.toFixed(4)}N {coordinates.lng.toFixed(4)}E
                </span>
             </div>
             <div className="flex flex-col items-end gap-1">
                <div className="flex gap-[1px]">
                   {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-[10px] h-[3px]" style={{ background: i < 4 ? '#9CA764' : 'rgba(255,255,255,0.1)' }} />
                   ))}
                </div>
                <span style={{ fontSize: 6, fontWeight: 900, color: "rgba(156,167,100,0.8)", textTransform: "uppercase" }}>SIGNAL: CLEAR</span>
             </div>
          </div>
        </div>

        {/* ─── PHYSICAL CONTROLS ─── */}
        <div className="flex items-center justify-between px-2 pb-2">
           <div className="group flex flex-col items-center gap-1.5 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:bg-white/10 active:scale-95">
                 <Binary className="w-4 h-4 text-[#9CA764] opacity-60" />
              </div>
              <span style={{ fontSize: 5, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)" }}>DECODE</span>
           </div>

           <div className="relative group cursor-pointer">
              <div className="absolute -inset-2 bg-[#9CA764]/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-16 h-16 rounded-full p-1" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.15), transparent)" }}>
                 <div className="w-full h-full rounded-full flex items-center justify-center" 
                   style={{ 
                     background: "linear-gradient(135deg, #1B261B 0%, #050805 100%)",
                     boxShadow: "0 4px 15px rgba(0,0,0,0.4), inset 0 1px 1px rgba(156,167,100,0.2)"
                   }}>
                    <Camera className="w-6 h-6 text-[#9CA764] transition-all group-hover:scale-110" />
                 </div>
              </div>
           </div>

           <div className="group flex flex-col items-center gap-1.5 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:bg-white/10 active:scale-95">
                 <Compass className="w-4 h-4 text-[#9CA764] opacity-60" />
              </div>
              <span style={{ fontSize: 5, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)" }}>NAV</span>
           </div>
        </div>

        {/* ─── BOTTOM ENGRAVING ─── */}
        <div className="mt-2 flex items-center justify-center gap-2 opacity-20">
          <div className="w-1 h-1 rounded-full bg-[#9CA764]" />
          <p style={{ fontSize: 6, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.3em", color: "#9CA764" }}>
            otu wild radar core
          </p>
          <div className="w-1 h-1 rounded-full bg-[#9CA764]" />
        </div>
      </div>
    </div>
  );
};

export default WildViewfinder;
