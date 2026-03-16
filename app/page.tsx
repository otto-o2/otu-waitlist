"use client";

import { useState } from "react";
import { MeshGradient, DotOrbit } from "@paper-design/shaders-react";

export default function Home() {
  const [speed] = useState(1.0);
  const [activeEffect] = useState("mesh");

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      {activeEffect === "mesh" && (
        <MeshGradient
          className="w-full h-full absolute inset-0"
          colors={["#000000", "#1a1a1a", "#333333", "#ffffff"]}
          speed={speed}
        />
      )}

      {activeEffect === "dots" && (
        <div className="w-full h-full absolute inset-0 bg-black">
          <DotOrbit
            className="w-full h-full"
            colors={["#333333"]}
            colorBack="#1a1a1a"
            speed={speed}
          />
        </div>
      )}

      {activeEffect === "combined" && (
        <>
          <MeshGradient
            className="w-full h-full absolute inset-0"
            colors={["#000000", "#1a1a1a", "#333333", "#ffffff"]}
            speed={speed * 0.5}
          />
          <div className="w-full h-full absolute inset-0 opacity-60">
            <DotOrbit
              className="w-full h-full"
              colors={["#333333"]}
              colorBack="#1a1a1a"
              speed={speed * 1.5}
            />
          </div>
        </>
      )}

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Header */}
        <div className="absolute top-8 left-8 pointer-events-auto"></div>

        {/* Effect Controls */}
        <div className="absolute bottom-8 left-8 pointer-events-auto"></div>

        {/* Parameter Controls */}
        <div className="absolute bottom-8 right-8 pointer-events-auto space-y-4"></div>

        {/* Status indicator */}
        <div className="absolute top-8 right-8 pointer-events-auto"></div>
      </div>

      {/* Lighting overlay effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 w-32 h-32 bg-gray-800/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: `${3 / speed}s` }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: `${2 / speed}s`, animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-20 h-20 bg-gray-900/5 rounded-full blur-xl animate-pulse"
          style={{ animationDuration: `${4 / speed}s`, animationDelay: "0.5s" }}
        />
      </div>

      {/* Center text — haus der grünen */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 300,
              fontSize: "clamp(28px, 5vw, 68px)",
              letterSpacing: "0.28em",
              textTransform: "lowercase",
              color: "rgba(255, 255, 255, 0.40)",
              textShadow: "0 0 60px rgba(255,255,255,0.08)",
            }}
          >
            haus der grünen
          </h1>
        </div>
      </div>
    </div>
  );
}
