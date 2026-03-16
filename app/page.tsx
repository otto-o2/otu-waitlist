"use client";

import { useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

export default function Home() {
  const [speed] = useState(0.8);

  return (
    <div className="w-full h-screen bg-[#FDFBF7] relative overflow-hidden">
      {/* Mesh Gradient with Cream/Beige palette */}
      <MeshGradient
        className="w-full h-full absolute inset-0"
        colors={["#FDFBF7", "#F5F2EA", "#EBE7DD", "#F6F3EB"]}
        speed={speed}
      />

      {/* Lighting overlay effects (subtle warm pulse) */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div
          className="absolute top-1/4 left-1/3 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: `${4 / speed}s` }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: `${3 / speed}s`, animationDelay: "1s" }}
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
              color: "#1B261B", // Deep Botanical Green - visible against cream
              textShadow: "0 2px 10px rgba(0,0,0,0.03)",
              maxWidth: "1200px",
              marginLeft: "0.22em", // To properly center due to letter-spacing
            }}
          >
            haus der<br />grünen
          </h1>
        </div>
      </div>

      {/* Optional Grain Effect for that "Ranch Water" photo feel */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
    </div>
  );
}
