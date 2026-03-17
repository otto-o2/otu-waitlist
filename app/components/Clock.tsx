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
    <div className="relative flex items-center justify-center select-none" style={{ width: "clamp(120px, 20vw, 240px)", aspectRatio: "1/1" }}>
      {/* ─── HARDWARE BEZEL (Industrial Metal) ─── */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: "linear-gradient(135deg, #E5E7EB 0%, #9CA3AF 45%, #4B5563 100%)",
          boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.8), inset 0 -2px 4px rgba(0,0,0,0.2)",
          padding: "8%"
        }}
      >
        {/* Inner shadow layer for depth */}
        <div className="w-full h-full rounded-full bg-[#0A0A0A] shadow-[inset_0_4px_12px_rgba(0,0,0,0.8)] relative overflow-hidden">
          {/* Dial Markings */}
          <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0">
             {/* Minute/Second Ticks */}
             {[...Array(60)].map((_, i) => (
                <line
                  key={i}
                  x1="50" y1="5" x2="50" y2={i % 5 === 0 ? "10" : "7"}
                  transform={`rotate(${i * 6} 50 50)`}
                  stroke={i % 5 === 0 ? "white" : "rgba(255,255,255,0.3)"}
                  strokeWidth={i % 5 === 0 ? "1" : "0.5"}
                />
             ))}
             
             {/* Precision Scale Numbers (Industrial Font Style) */}
             {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n, i) => (
                <text
                  key={n}
                  x={50 + 34 * Math.sin((i * 30 * Math.PI) / 180)}
                  y={50 - 34 * Math.cos((i * 30 * Math.PI) / 180)}
                  fill="white"
                  fontSize="7"
                  fontWeight="900"
                  textAnchor="middle"
                  alignmentBaseline="central"
                  style={{ fontFamily: "'Inter', sans-serif", opacity: 0.8 }}
                >
                  {n}
                </text>
             ))}

             {/* Inner scale markings like a lab instrument */}
             <circle cx="50" cy="50" r="28" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" strokeDasharray="1 2" />

             {/* ─── CLOCK HANDS ─── */}
             {/* Hour Hand */}
             <line 
                x1="50" y1="50" x2="50" y2="28" 
                stroke="white" strokeWidth="2.5" strokeLinecap="round" 
                style={{ 
                   transform: `rotate(${time.getHours() * 30 + time.getMinutes() * 0.5}deg)`,
                   transformOrigin: '50% 50%',
                   transition: 'transform 0.5s cubic-bezier(0.4, 2.08, 0.55, 0.44)'
                }}
             />
             {/* Minute Hand */}
             <line 
                x1="50" y1="50" x2="50" y2="15" 
                stroke="white" strokeWidth="1.5" strokeLinecap="round" 
                style={{ 
                   transform: `rotate(${time.getMinutes() * 6}deg)`,
                   transformOrigin: '50% 50%',
                   transition: 'transform 0.5s cubic-bezier(0.4, 2.08, 0.55, 0.44)'
                }}
             />
             {/* Second Hand (Needle Thin) */}
             <line 
                x1="50" y1="60" x2="50" y2="10" 
                stroke="#9CA764" strokeWidth="0.5" 
                style={{ 
                   transform: `rotate(${time.getSeconds() * 6}deg)`,
                   transformOrigin: '50% 50%',
                   transition: 'transform 0.5s linear'
                }}
             />
             
             {/* Center Cap */}
             <circle cx="50" cy="50" r="2.5" fill="#E5E7EB" />
             <circle cx="50" cy="50" r="1" fill="#4B5563" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Clock;
