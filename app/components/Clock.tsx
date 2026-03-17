"use client";

import React, { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: "clamp(120px, 24vw, 300px)", aspectRatio: "1/1" }}>
      {/* ─── VINTAGE MARITIME BEZEL ─── */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 30%, #333 0%, #111 60%, #050505 100%)",
          boxShadow: `
            0 30px 60px -12px rgba(0,0,0,0.8), 
            inset 0 4px 12px rgba(255,255,255,0.08), 
            inset 0 -8px 20px rgba(0,0,0,0.6)
          `,
          padding: "10%"
        }}
      >
        {/* Bezel Screw/Knob Detail */}
        <div 
          className="absolute right-[2%] top-1/2 -translate-y-1/2 w-[6%] h-[8%] rounded-sm"
          style={{
            background: "linear-gradient(135deg, #E5E7EB 0%, #9CA3AF 50%, #4B5563 100%)",
            boxShadow: "0 2px 4px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.8)",
            borderRadius: "40% 10% 10% 40%"
          }}
        />

        {/* Dial Face */}
        <div className="w-full h-full rounded-full bg-[#050505] shadow-[inset_0_2px_15px_rgba(0,0,0,1)] relative overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0">
             {/* Outer Minute Track (Beige/Cream) */}
             {[...Array(60)].map((_, i) => (
                <line
                  key={`m-${i}`}
                  x1="50" y1="4" x2="50" y2={i % 5 === 0 ? "7" : "5.5"}
                  transform={`rotate(${i * 6} 50 50)`}
                  stroke={i % 5 === 0 ? "#D1C7A1" : "rgba(209,199,161,0.3)"}
                  strokeWidth="0.6"
                />
             ))}

             {/* Hour Numbers (24-Hour Format, Beige/Cream) */}
             {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map((n, i) => {
                const angle = i * 15;
                const radius = 33;
                return (
                    <text
                      key={`h-${n}`}
                      x={50 + radius * Math.sin((angle * Math.PI) / 180)}
                      y={50 - radius * Math.cos((angle * Math.PI) / 180)}
                      fill="#D1C7A1"
                      fontSize={n === 0 || n === 12 ? "8.5" : "7"}
                      fontWeight="700"
                      textAnchor="middle"
                      alignmentBaseline="central"
                      style={{ fontFamily: "'Crimson Pro', serif" }}
                    >
                      {n === 0 ? "00" : n}
                    </text>
                );
             })}

             {/* Inner Dotted Circle */}
             {[...Array(60)].map((_, i) => (
                <circle
                  key={`dot-${i}`}
                  cx="50"
                  cy="24"
                  r="0.4"
                  fill="rgba(209,199,161,0.2)"
                  transform={`rotate(${i * 6} 50 50)`}
                />
             ))}

             {/* ─── SPADE HANDS ─── */}
             {/* Hour Hand (24-hour movement) */}
             <g style={{ 
                transform: `rotate(${(time.getHours() % 24) * 15 + time.getMinutes() * 0.25}deg)`,
                transformOrigin: '50% 50%',
                transition: 'transform 0.6s cubic-bezier(0.4, 2.08, 0.55, 0.44)'
             }}>
                {/* Spade Shape */}
                <path d="M 50 50 L 50 28 M 50 28 C 47 28 47 34 50 36 M 50 28 C 53 28 53 34 50 36" fill="none" stroke="#F5F5DC" strokeWidth="1.5" />
                <path d="M 50 24 L 46.5 30 L 50 33 L 53.5 30 Z" fill="#F5F5DC" /> {/* Spade Tip */}
             </g>

             {/* Minute Hand */}
             <g style={{ 
                transform: `rotate(${time.getMinutes() * 6 + time.getSeconds() * 0.1}deg)`,
                transformOrigin: '50% 50%',
                transition: 'transform 0.6s cubic-bezier(0.4, 2.08, 0.55, 0.44)'
             }}>
                {/* Tapered Long Hand */}
                <path d="M 50 50 L 50 12" stroke="#F5F5DC" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M 50 10 L 47 16 L 50 18 L 53 16 Z" fill="#F5F5DC" /> {/* Tapered Tip */}
             </g>
             
             {/* Center Nut Detail */}
             <circle cx="50" cy="50" r="3" fill="#050505" stroke="#D1C7A1" strokeWidth="0.5" />
             <circle cx="50" cy="50" r="1.2" fill="#D1C7A1" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Clock;
