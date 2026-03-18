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

    setTargets(prev => prev.map(t => {
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
      setCoordinates(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.00002,
        lng: prev.lng + (Math.random() - 0.5) * 0.00002
      }));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[300px] select-none" style={{ aspectRatio: "0.65/1" }}>
      {/* ─── HARDWARE CHASSIS (High-Altitude Amber) ─── */}
      <div
        className="relative w-full h-full rounded-[42px] p-5 flex flex-col gap-4 overflow-hidden shadow-2xl"
        style={{
          background: "linear-gradient(160deg, #2B1F1B 0%, #1F1411 55%, #140D0B 100%)",
          boxShadow: "0 60px 120px -20px rgba(20,10,5,0.7), 0 0 0 1px rgba(255,159,28,0.15), inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,159,28,0.1)"
        }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.08]" 
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/brushed-alum-dark.png')" }} />

        {/* ─── RADAR SCREEN (Thermal Depth) ─── */}
        <div
          className="relative w-full rounded-2xl overflow-hidden flex flex-col p-3"
          style={{
            aspectRatio: "1/1.1",
            background: "linear-gradient(160deg, #1A1510 0%, #0F0D0A 100%)",
            border: "1px solid rgba(255,255,255,0.04)",
            boxShadow: "inset 0 2px 15px rgba(0,0,0,0.9)"
          }}
        >
          {/* Static Grid Circles */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none">
            {[20, 40, 60, 80].map(s => (
              <div key={s} className="absolute border border-white rounded-full" style={{ width: `${s}%`, height: `${s}%` }} />
            ))}
            <div className="absolute w-[1px] h-full bg-white" />
            <div className="absolute h-[1px] w-full bg-white" />
          </div>

          {/* HUD Status Text */}
          <div className="relative flex justify-between items-start mb-2 z-20">
            <div className="flex flex-col gap-0.5">
               <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-[#FF9F1C] animate-pulse" />
                  <span style={{ fontSize: 7, fontWeight: 900, color: "rgba(255,230,210,0.8)", textTransform: "uppercase", letterSpacing: "0.2em" }}>
                    radar active
                  </span>
               </div>
               <span style={{ fontSize: 6, color: "rgba(210,200,180,0.3)", fontWeight: 700, fontFamily: "monospace" }}>
                 LIDAR_SEQ: {dnaFeed}
               </span>
            </div>
            <div className="flex flex-col items-end opacity-40">
               <span style={{ fontSize: 6, fontWeight: 900, color: "rgba(210,200,180,1)" }}>SWEEP_72HZ</span>
            </div>
          </div>

          {/* ACTUAL RADAR PLANE */}
          <div className="flex-1 relative">
            {/* Sweep Line with Radial Gradient Head */}
            <div 
              className="absolute top-1/2 left-1/2 w-[50%] h-[2px] -translate-y-1/2 origin-left z-10"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(255,159,28,0.7) 100%)",
                transform: `rotate(${angle - 90}deg)`,
              }}
            >
               {/* Leading point glow */}
               <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#FF9F1C]/20 blur-sm rounded-full" />
            </div>

            {/* Sweep Trail (Conic Gradient) */}
            <div 
              className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                background: `conic-gradient(from ${angle - 30}deg, rgba(255,159,28,0.15) 0%, transparent 30deg)`,
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
                {/* Schiff/Ship dot */}
                <div className="w-1.5 h-1.5 bg-[#FF9F1C] rounded-[1px] shadow-[0_0_10px_#F77F00]" 
                     style={{ transform: `rotate(${(t.driftX > 0 ? 45 : -45)}deg)` }} />
                
                {/* Ripple on Ping */}
                {t.opacity > 0.95 && (
                  <div className="absolute inset-[-4px] border border-[#FF9F1C] rounded-full animate-[ping_0.8s_ease-out_infinite]" />
                )}
              </div>
            ))}
          </div>

          {/* HUD Footer Information */}
          <div className="relative flex justify-between items-end mt-2 pt-2 border-t border-white/5 z-20">
             <div className="flex flex-col gap-0.5">
                <span style={{ fontSize: 6, fontWeight: 900, color: "rgba(210,200,180,0.4)", textTransform: "uppercase" }}>TARGET_COORD</span>
                <span style={{ fontSize: 8, fontWeight: 700, color: "white", opacity: 0.7, fontFamily: "monospace" }}>
                   {coordinates.lat.toFixed(5)}N {coordinates.lng.toFixed(5)}E
                </span>
             </div>
             <div className="flex flex-col items-end gap-1">
                <div className="flex gap-[1px]">
                   {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-[10px] h-[2.5px]" style={{ background: i < 4 ? '#FF9F1C' : 'rgba(255,255,255,0.1)' }} />
                   ))}
                </div>
                <span style={{ fontSize: 6, fontWeight: 900, color: "rgba(255,159,28,0.7)", textTransform: "uppercase" }}>SIG: LOCKED</span>
             </div>
          </div>
        </div>

        {/* ─── PHYSICAL CONTROLS ─── */}
        <div className="flex items-center justify-between px-2 pb-2">
           <div className="group flex flex-col items-center gap-1.5 cursor-pointer">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:bg-amber-950/20 active:scale-95"
                style={{ background: "linear-gradient(145deg, #3D2B24 0%, #1F1511 100%)", border: "1px solid rgba(255,159,28,0.2)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                 <Binary className="w-4 h-4 text-[#FF9F1C] opacity-60" />
              </div>
              <span style={{ fontSize: 5, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,159,28,0.2)" }}>DECODE</span>
           </div>

           <div className="relative group cursor-pointer">
              <div className="absolute -inset-2 bg-[#FF9F1C]/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-16 h-16 rounded-full p-1" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.1), transparent)" }}>
                 <div className="w-full h-full rounded-full flex items-center justify-center" 
                   style={{ 
                     background: "linear-gradient(135deg, #2D1B16 0%, #170E0B 100%)",
                     boxShadow: "0 8px 16px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)"
                   }}>
                    <Camera className="w-6 h-6 text-[#FF9F1C] transition-all group-hover:scale-110" />
                 </div>
              </div>
           </div>

           <div className="group flex flex-col items-center gap-1.5 cursor-pointer">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:bg-amber-950/20 active:scale-95"
                style={{ background: "linear-gradient(145deg, #3D2B24 0%, #1F1511 100%)", border: "1px solid rgba(255,159,28,0.2)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                 <Compass className="w-4 h-4 text-[#FF9F1C] opacity-60" />
              </div>
              <span style={{ fontSize: 5, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,159,28,0.2)" }}>NAV</span>
           </div>
        </div>

        {/* ─── BOTTOM ENGRAVING ─── */}
        <div className="mt-2 flex items-center justify-center gap-2 opacity-20">
          <div className="w-1 h-1 rounded-full bg-[#FF9F1C]" />
          <p style={{ fontSize: 6, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.3em", color: "#FF9F1C" }}>
            otu wild radar core
          </p>
          <div className="w-1 h-1 rounded-full bg-[#FF9F1C]" />
        </div>
      </div>
    </div>
  );
};

export default WildViewfinder;
