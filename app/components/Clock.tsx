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
    <div className="relative flex items-center justify-center select-none" style={{ width: "clamp(120px, 22vw, 260px)", aspectRatio: "1/1" }}>
      {/* ─── HARDWARE BEZEL (Scientific instrument look) ─── */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: "linear-gradient(135deg, #F3F4F6 0%, #D1D5DB 40%, #9CA3AF 70%, #4B5563 100%)",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.8), inset 0 -3px 6px rgba(0,0,0,0.2)",
          padding: "7%"
        }}
      >
        {/* Inner shadow layer for depth */}
        <div className="w-full h-full rounded-full bg-[#080808] shadow-[inset_0_4px_20px_rgba(0,0,0,1)] relative overflow-hidden">
          {/* Dial Markings */}
          <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0">
             {/* 60 Minute Ticks (Outer) */}
             {[...Array(60)].map((_, i) => (
                <line
                  key={`m-${i}`}
                  x1="50" y1="5" x2="50" y2="7"
                  transform={`rotate(${i * 6} 50 50)`}
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="0.5"
                />
             ))}

             {/* 24 Hour Ticks & Numbers (Matches HP Design) */}
             {[24, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22].map((n, i) => {
                const angle = i * 30;
                return (
                  <g key={`h-${n}`}>
                    <line
                      x1="50" y1="5" x2="50" y2="10"
                      transform={`rotate(${angle} 50 50)`}
                      stroke="white"
                      strokeWidth="1.2"
                    />
                    <text
                      x={50 + 35 * Math.sin((angle * Math.PI) / 180)}
                      y={50 - 35 * Math.cos((angle * Math.PI) / 180)}
                      fill="white"
                      fontSize="6.5"
                      fontWeight="900"
                      textAnchor="middle"
                      alignmentBaseline="central"
                      style={{ fontFamily: "'Inter', sans-serif", opacity: 0.9 }}
                    >
                      {n}
                    </text>
                  </g>
                );
             })}

             {/* Micro-scale inner circle */}
             <circle cx="50" cy="50" r="26" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.3" strokeDasharray="0.5 1.5" />
             
             {/* ─── SCIENTIFIC HANDS ─── */}
             {/* Hour Hand (24-hour movement: 1 tick = 15 degrees) */}
             <g style={{ 
                transform: `rotate(${(time.getHours() % 24) * 15 + time.getMinutes() * 0.25}deg)`,
                transformOrigin: '50% 50%',
                transition: 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)'
             }}>
                <line x1="50" y1="50" x2="50" y2="30" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M 50 30 L 49.2 32 L 50.8 32 Z" fill="white" /> {/* Pointy tip */}
             </g>

             {/* Minute Hand */}
             <g style={{ 
                transform: `rotate(${time.getMinutes() * 6 + time.getSeconds() * 0.1}deg)`,
                transformOrigin: '50% 50%',
                transition: 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)'
             }}>
                <line x1="50" y1="50" x2="50" y2="12" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M 50 12 L 49.4 15 L 50.6 15 Z" fill="white" /> {/* Pointy tip */}
             </g>
             
             {/* Center Cap (Silver) */}
             <circle cx="50" cy="50" r="3" fill="#D1D5DB" />
             <circle cx="50" cy="50" r="1.5" fill="#9CA3AF" />
             <circle cx="50" cy="50" r="0.8" fill="#4B5563" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Clock;
