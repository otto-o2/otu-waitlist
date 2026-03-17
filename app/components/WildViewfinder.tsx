"use client";

import React, { useState, useEffect, useRef } from "react";
import { Compass, Target, Camera, Binary } from "lucide-react";

interface RadarTarget {
  id: number;
  x: number; // 0-100
  y: number; // 0-100
  angle: number; // 0-360
  dist: number; // 0-50
  opacity: number;
  driftX: number;
  driftY: number;
}

const WildViewfinder = () => {
  const [dnaFeed, setDnaFeed] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: 52.5201, lng: 13.4049 });
  const [angle, setAngle] = useState(0);
  const [targets, setTargets] = useState<RadarTarget[]>([]);
  const requestRef = useRef<number>(null);
  const lastAngleRef = useRef(0);

  // Initialize a single high-stakes biological target with drift vector
  useEffect(() => {
    const initialTargets: RadarTarget[] = [
      { id: 1, x: 0, y: 0, angle: 45, dist: 35, opacity: 0, driftX: 0.02, driftY: -0.01 },
    ];
    
    // Process initial positions
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

  const animate = (time: number) => {
    // Rotation: ~4 seconds per sweep (slightly slower and more deliberate)
    const currentAngle = (time / 40) % 360;
    setAngle(currentAngle);

    setTargets((prev: RadarTarget[]) => prev.map((t: RadarTarget) => {
      // 1. Update Position (Simulate slight movement/drift)
      let newX = t.x + t.driftX;
      let newY = t.y + t.driftY;
      
      // Keep within radar bounds (dist < 50)
      const distFromCenter = Math.sqrt(Math.pow(newX - 50, 2) + Math.pow(newY - 50, 2));
      if (distFromCenter > 48) {
        newX = t.x - t.driftX * 2; // Simple bounce/reverse
        newY = t.y - t.driftY * 2;
      }

      // 2. Update Angle/Dist for detection check
      const newAngle = (Math.atan2(newY - 50, newX - 50) * 180 / Math.PI + 450) % 360;
      
      // 3. Robust Detection Check: Did the sweep cross the target's angle?
      const lastA = lastAngleRef.current;
      const currA = currentAngle;
      
      let wasJustHit = false;
      // Handle the 360->0 wrap-around crossing
      if (currA < lastA) {
        wasJustHit = (newAngle > lastA) || (newAngle < currA);
      } else {
        wasJustHit = (newAngle > lastA && newAngle < currA);
      }

      let newOpacity = t.opacity;
      if (wasJustHit) {
        newOpacity = 1.0; // Instant bright flash on hit
      } else {
        // Lingering fade effect - pings should be short but visible
        newOpacity = Math.max(0, t.opacity - 0.008); 
      }
      
      return { 
        ...t, 
        x: newX, 
        y: newY, 
        angle: newAngle, 
        opacity: newOpacity 
      };
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

  // HUD and Coordinates
  useEffect(() => {
    const chars = "ATCG-";
    const interval = setInterval(() => {
      let newStr = "";
      for (let i = 0; i < 12; i++) {
        newStr += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setDnaFeed(newStr);
      setCoordinates((prev: { lat: number; lng: number }) => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.00002,
        lng: prev.lng + (Math.random() - 0.5) * 0.00002
      }));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[300px] select-none" style={{ aspectRatio: "0.65/1" }}>
      {/* ─── HARDWARE CHASSIS (Moss Onyx) ─── */}
      <div
        className="relative w-full h-full rounded-[42px] p-5 flex flex-col gap-4 overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #121512 0%, #080A08 55%, #040504 100%)",
          boxShadow: "0 60px 120px -20px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.6)",
          border: "1px solid rgba(255,255,255,0.03)"
        }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.08]" 
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/brushed-alum-dark.png')" }} />

        {/* ─── RADAR SCREEN (Green Abyss) ─── */}
        <div
          className="relative w-full rounded-2xl overflow-hidden flex flex-col p-3 shadow-[0_0_20px_rgba(0,100,50,0.3)]"
          style={{
            aspectRatio: "1/1.1",
            background: "linear-gradient(160deg, #051A05 0%, #010801 100%)",
            border: "1px solid rgba(0,255,100,0.15)",
            boxShadow: "inset 0 2px 20px rgba(0,0,0,0.9)"
          }}
        >
          {/* CRT Scanline Overlay */}
          <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.15]"
            style={{
              background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
              backgroundSize: "100% 2px, 3px 100%"
            }}
          />
          
          {/* Phosphor Glow Layer */}
          <div className="absolute inset-0 pointer-events-none z-40 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.05)_0%,transparent_70%)]" />

          {/* Static Grid Circles */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.15] pointer-events-none">
            {[20, 40, 60, 80].map(s => (
              <div key={s} className="absolute border border-[#00FF41] rounded-full" style={{ width: `${s}%`, height: `${s}%`, boxShadow: "0 0 5px rgba(0,255,65,0.2)" }} />
            ))}
            <div className="absolute w-[1px] h-full bg-[#00FF41]/20 shadow-[0_0_3px_rgba(0,255,65,0.1)]" />
            <div className="absolute h-[1px] w-full bg-[#00FF41]/20 shadow-[0_0_3px_rgba(0,255,65,0.1)]" />
          </div>

          {/* HUD Status Text */}
          <div className="relative flex justify-between items-start mb-2 z-20">
            <div className="flex flex-col gap-0.5">
               <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse shadow-[0_0_8px_#00FF41]" />
                  <span style={{ fontSize: 7, fontWeight: 900, color: "rgba(0,255,65,1)", textTransform: "uppercase", letterSpacing: "0.2em", textShadow: "0 0 5px rgba(0,255,65,0.5)" }}>
                    radar active
                  </span>
               </div>
               <span style={{ fontSize: 6, color: "rgba(0,255,65,0.6)", fontWeight: 700, fontFamily: "monospace", letterSpacing: "0.05em" }}>
                 LIDAR_SEQ: {dnaFeed}
               </span>
            </div>
            <div className="flex flex-col items-end opacity-80">
               <span style={{ fontSize: 6, fontWeight: 900, color: "rgba(0,255,65,1)", textShadow: "0 0 5px rgba(0,255,65,0.5)" }}>SWEEP_72HZ</span>
            </div>
          </div>

          {/* ACTUAL RADAR PLANE */}
          <div className="flex-1 relative">
            {/* Sweep Line with Radial Gradient Head */}
            <div 
              className="absolute top-1/2 left-1/2 w-[48%] h-[2px] -translate-y-1/2 origin-left z-10"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(0,255,65,1) 100%)",
                transform: `rotate(${angle - 90}deg)`,
                boxShadow: "0 0 10px rgba(0,255,65,0.4)"
              }}
            >
               {/* Leading point glow */}
               <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#00FF41]/60 blur-md rounded-full shadow-[0_0_20px_#00FF41]" />
            </div>

            {/* Sweep Trail (Conic Gradient) */}
            <div 
              className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                background: `conic-gradient(from ${angle - 60}deg, rgba(0,255,65,0.2) 0%, transparent 60deg)`,
                borderRadius: "50%"
              }}
            />

            {/* RADAR PINGS (Dots) */}
            {targets.map(t => (
              <div 
                key={t.id}
                className="absolute"
                style={{
                  left: `${t.x}%`,
                  top: `${t.y}%`,
                  opacity: t.opacity,
                  transform: "translate(-50%, -50%)",
                  transition: "opacity 0.03s linear"
                }}
              >
                {/* Target marker */}
                <div className="relative">
                  <div className="w-2 h-2 bg-[#00FF41] rounded-[1px] shadow-[0_0_15px_rgba(0,255,65,1)]" 
                       style={{ transform: `rotate(${(t.driftX > 0 ? 45 : -45)}deg)` }} />
                  {/* Subtle target box */}
                  <div className="absolute -inset-1 border border-[#00FF41]/40" />
                </div>
                
                {/* Ripple on Ping */}
                {t.opacity > 0.95 && (
                  <div className="absolute inset-[-4px] border border-[#00FF41]/80 rounded-full animate-[ping_1s_ease-out_infinite] shadow-[0_0_10px_rgba(0,255,65,0.5)]" />
                )}
              </div>
            ))}
          </div>

          {/* HUD Footer Information */}
          <div className="relative flex justify-between items-end mt-2 pt-2 border-t border-green-900/40 z-20">
             <div className="flex flex-col gap-0.5">
                <span style={{ fontSize: 6, fontWeight: 900, color: "rgba(0,255,65,0.6)", textTransform: "uppercase" }}>TARGET_COORD</span>
                <span style={{ fontSize: 8, fontWeight: 700, color: "#00FF41", opacity: 0.9, fontFamily: "monospace", textShadow: "0 0 5px rgba(0,255,65,0.5)" }}>
                   {coordinates.lat.toFixed(5)}N {coordinates.lng.toFixed(5)}E
                </span>
             </div>
             <div className="flex flex-col items-end gap-1">
                <div className="flex gap-[1px]">
                   {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-[10px] h-[3px] shadow-[0_0_2px_rgba(0,255,100,0.5)]" style={{ background: i < 4 ? '#00FF41' : 'rgba(0,255,65,0.1)' }} />
                   ))}
                </div>
                <span style={{ fontSize: 6, fontWeight: 900, color: "rgba(0,255,65,1)", textTransform: "uppercase", textShadow: "0 0 5px rgba(0,255,65,0.5)" }}>SIG: LOCKED</span>
             </div>
          </div>
        </div>

        {/* ─── PHYSICAL CONTROLS ─── */}
        <div className="flex items-center justify-between px-2 pb-2">
           <div className="group flex flex-col items-center gap-1.5 cursor-pointer">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:bg-white/11 active:scale-95"
                style={{ background: "linear-gradient(145deg, #2A2C38 0%, #181A22 100%)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                 <Binary className="w-4 h-4 text-[#D4DCE8] opacity-60" />
              </div>
              <span style={{ fontSize: 5, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(215,230,240,0.2)" }}>DECODE</span>
           </div>

           <div className="relative group cursor-pointer">
              <div className="absolute -inset-2 bg-[#9CA764]/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-16 h-16 rounded-full p-1" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.1), transparent)" }}>
                 <div className="w-full h-full rounded-full flex items-center justify-center" 
                   style={{ 
                     background: "linear-gradient(135deg, #22242E 0%, #13141C 100%)",
                     boxShadow: "0 8px 16px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)"
                   }}>
                    <Camera className="w-6 h-6 text-[#9CA764] transition-all group-hover:scale-110" />
                 </div>
              </div>
           </div>

           <div className="group flex flex-col items-center gap-1.5 cursor-pointer">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:bg-white/11 active:scale-95"
                style={{ background: "linear-gradient(145deg, #2A2C38 0%, #181A22 100%)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                 <Compass className="w-4 h-4 text-[#D4DCE8] opacity-60" />
              </div>
              <span style={{ fontSize: 5, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(215,230,240,0.2)" }}>NAV</span>
           </div>
        </div>

        {/* ─── BOTTOM ENGRAVING ─── */}
        <div className="mt-2 flex items-center justify-center gap-2 opacity-20">
          <div className="w-1 h-1 rounded-full bg-[#D4DCE8]" />
          <p style={{ fontSize: 6, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.3em", color: "#D4DCE8" }}>
            otu wild radar core
          </p>
          <div className="w-1 h-1 rounded-full bg-[#D4DCE8]" />
        </div>
      </div>
    </div>
  );
};

export default WildViewfinder;
