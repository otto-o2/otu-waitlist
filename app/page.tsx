"use client";

import { useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

export default function Home() {
  const [speed] = useState(0.6);

  return (
    <div className="w-full h-screen bg-[#050805] relative overflow-hidden">
      {/* 
          Deep Midnight Botanical Shader 
          Using varied deep greens and charcoals to ensure the 'flowing lines' are visible.
      */}
      <MeshGradient
        className="w-full h-full absolute inset-0"
        colors={["#050805", "#0D140D", "#1B261B", "#2A382A"]}
        speed={speed}
      />

      {/* Lighting overlay effects (moonlight / mist) */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div
          className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#3D5A3D]/20 rounded-full blur-[120px] animate-pulse"
          style={{ animationDuration: `${6 / speed}s` }}
        />
        <div
          className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-white/5 rounded-full blur-[100px] animate-pulse"
          style={{ animationDuration: `${4 / speed}s`, animationDelay: "2s" }}
        />
      </div>

      {/* Center text — haus der grünen */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-8">
        <div className="text-center">
          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.5rem, 10vw, 7.5rem)",
              letterSpacing: "0.22em",
              lineHeight: "1.1",
              textTransform: "uppercase",
              color: "rgba(245, 242, 234, 0.85)", // Warm Cream/White for high visibility
              textShadow: "0 0 40px rgba(255,255,255,0.1)",
              maxWidth: "1200px",
              marginLeft: "0.22em", 
            }}
          >
            haus der<br />grünen
          </h1>
        </div>
      </div>

      {/* Ambient Grain Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-screen" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
    </div>
  );
}
