"use client";

import React, { useState, useEffect } from "react";
import { SkipBack, SkipForward } from "lucide-react";

const NUM_BARS = 28;

const BAR_HEIGHTS = [
  30, 55, 70, 45, 85, 60, 40, 90, 65, 50, 75, 38, 92, 55, 68, 44,
  80, 35, 60, 78, 48, 88, 58, 42, 72, 50, 65, 35,
];

const Mixtape = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(38);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [isWheelHovered, setIsWheelHovered] = useState(false);
  const [activeBars, setActiveBars] = useState(BAR_HEIGHTS);

  // Animate progress bar
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 0.1));
    }, 80);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Animate waveform bars
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveBars((prev) =>
        prev.map((h) => {
          const delta = (Math.random() - 0.5) * 30;
          return Math.max(10, Math.min(100, h + delta));
        })
      );
    }, 120);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Rotate wheel on hover
  useEffect(() => {
    if (!isWheelHovered) return;
    const interval = setInterval(() => {
      setWheelRotation((r) => r + 1.2);
    }, 16);
    return () => clearInterval(interval);
  }, [isWheelHovered]);

  const elapsed = Math.floor((progress / 100) * 244);
  const elapsedMin = Math.floor(elapsed / 60);
  const elapsedSec = String(elapsed % 60).padStart(2, "0");
  const remaining = 244 - elapsed;
  const remMin = Math.floor(remaining / 60);
  const remSec = String(remaining % 60).padStart(2, "0");

  return (
    <div className="relative w-full max-w-[270px] select-none" style={{ aspectRatio: "0.58/1" }}>
      {/* iPod Shell — deep warm umber/clay */}
      <div
        className="relative w-full h-full rounded-[38px] flex flex-col p-5 overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #3D2E1E 0%, #2A1F12 60%, #1E1508 100%)",
          boxShadow:
            "0 60px 120px -20px rgba(10,6,2,0.7), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.4)",
        }}
      >
        {/* Brushed metal grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/brushed-alum-dark.png')",
          }}
        />

        {/* Top notch / port */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[3px] bg-black/40 rounded-b-full" />

        {/* ─── SCREEN ─── */}
        <div
          className="relative w-full rounded-xl overflow-hidden flex flex-col"
          style={{
            aspectRatio: "1.22/1",
            background: "linear-gradient(160deg, #0D1F0D 0%, #0A1A0A 100%)",
            boxShadow: "inset 0 2px 12px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)",
          }}
        >
          {/* LCD scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.5) 1px, rgba(255,255,255,0.5) 2px)",
            }}
          />

          {/* Green phosphor glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 40%, rgba(100,180,80,0.07) 0%, transparent 70%)",
            }}
          />

          <div className="relative flex flex-col h-full p-3 gap-1">
            {/* Status row */}
            <div className="flex justify-between items-center">
              <span
                className="text-[7px] font-black uppercase tracking-widest"
                style={{ color: "rgba(140,210,110,0.6)", fontFamily: "'Outfit', sans-serif" }}
              >
                now playing
              </span>
              {/* Battery */}
              <div className="flex items-center gap-1">
                <span style={{ color: "rgba(140,210,110,0.5)", fontSize: 6, fontFamily: "'Outfit', sans-serif", fontWeight: 700 }}>
                  ▶
                </span>
                <div
                  className="w-5 h-[9px] rounded-[2px] relative"
                  style={{ border: "1px solid rgba(140,210,110,0.3)" }}
                >
                  <div
                    className="absolute inset-y-[2px] left-[2px] rounded-[1px]"
                    style={{ width: "70%", background: "rgba(140,210,110,0.6)" }}
                  />
                  <div
                    className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-[3px] h-[5px] rounded-r-[1px]"
                    style={{ background: "rgba(140,210,110,0.3)" }}
                  />
                </div>
              </div>
            </div>

            {/* Track info */}
            <div className="flex flex-col items-center mt-1">
              <span
                className="text-[11px] font-black uppercase tracking-tight leading-none"
                style={{ color: "rgba(180,240,140,0.95)", fontFamily: "'Outfit', sans-serif" }}
              >
                Xylem Drift
              </span>
              <span
                className="text-[7px] font-bold uppercase tracking-[0.2em] mt-0.5"
                style={{ color: "rgba(140,210,110,0.45)", fontFamily: "'Outfit', sans-serif" }}
              >
                the chlorophyll sessions
              </span>
            </div>

            {/* ── WAVEFORM VISUALIZER ── */}
            <div className="flex-1 flex items-end justify-center gap-[2px] px-1 pb-1 mt-1">
              {activeBars.map((h, i) => (
                <div
                  key={i}
                  style={{
                    width: "3px",
                    height: `${isPlaying ? h : 10}%`,
                    borderRadius: "1.5px",
                    background:
                      i < Math.floor((progress / 100) * NUM_BARS)
                        ? "rgba(156,167,100,0.95)"
                        : "rgba(140,210,110,0.2)",
                    transition: isPlaying ? "height 0.12s ease" : "height 0.4s ease",
                  }}
                />
              ))}
            </div>

            {/* Progress bar */}
            <div
              className="w-full h-[2px] rounded-full overflow-hidden"
              style={{ background: "rgba(140,210,110,0.12)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-75"
                style={{
                  width: `${progress}%`,
                  background: "rgba(156,167,100,0.8)",
                }}
              />
            </div>
            <div className="flex justify-between">
              <span style={{ fontSize: 6, color: "rgba(140,210,110,0.4)", fontFamily: "'Outfit', sans-serif", fontWeight: 700 }}>
                {elapsedMin}:{elapsedSec}
              </span>
              <span style={{ fontSize: 6, color: "rgba(140,210,110,0.4)", fontFamily: "'Outfit', sans-serif", fontWeight: 700 }}>
                -{remMin}:{remSec}
              </span>
            </div>
          </div>
        </div>

        {/* ─── CLICK WHEEL ─── */}
        <div className="flex-1 flex items-center justify-center mt-4">
          <div
            className="relative cursor-pointer transition-transform duration-200"
            style={{ width: 148, height: 148 }}
            onMouseEnter={() => setIsWheelHovered(true)}
            onMouseLeave={() => setIsWheelHovered(false)}
            onClick={() => setIsPlaying((p) => !p)}
          >
            {/* Outer ring — rotates on hover */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "linear-gradient(135deg, #4A3828 0%, #2E2010 50%, #3A2A18 100%)",
                boxShadow:
                  "0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.3)",
                transform: `rotate(${wheelRotation}deg)`,
                transition: isWheelHovered ? "none" : "transform 0.8s ease-out",
              }}
            >
              {/* Engraved tick marks */}
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    transform: `rotate(${i * 15}deg)`,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 4,
                      left: "50%",
                      width: i % 6 === 0 ? 2 : 1,
                      height: i % 6 === 0 ? 6 : 4,
                      transform: "translateX(-50%)",
                      background: i % 6 === 0 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)",
                      borderRadius: 1,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Fixed labels — don't rotate */}
            {/* Menu */}
            <span
              className="absolute font-black uppercase"
              style={{
                top: 10,
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: 7,
                letterSpacing: "0.18em",
                color: "rgba(241,232,199,0.35)",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              flora
            </span>
            {/* Right — next */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <SkipForward style={{ width: 12, height: 12, color: "rgba(241,232,199,0.3)" }} />
            </div>
            {/* Left — prev */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2">
              <SkipBack style={{ width: 12, height: 12, color: "rgba(241,232,199,0.3)" }} />
            </div>
            {/* Bottom — play/pause indicator */}
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-[3px] items-end"
              style={{ color: "rgba(241,232,199,0.3)" }}
            >
              {isPlaying ? (
                <>
                  <div style={{ width: 4, height: 10, background: "rgba(241,232,199,0.3)", borderRadius: 1 }} />
                  <div style={{ width: 4, height: 10, background: "rgba(241,232,199,0.3)", borderRadius: 1 }} />
                </>
              ) : (
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: "6px solid transparent",
                    borderBottom: "6px solid transparent",
                    borderLeft: "10px solid rgba(241,232,199,0.3)",
                  }}
                />
              )}
            </div>

            {/* Center button */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center"
              style={{
                width: 60,
                height: 60,
                background:
                  "linear-gradient(145deg, #3A2812 0%, #241908 100%)",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07), 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            >
              {/* Subtle leaf engraving */}
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50% 10%",
                  border: "1px solid rgba(156,167,100,0.2)",
                  transform: "rotate(-30deg)",
                  opacity: 0.7,
                }}
              />
            </div>
          </div>
        </div>

        {/* Spinning reels decoration flanking wheel */}
        <div className="absolute bottom-[88px] left-5 flex flex-col items-center gap-1 opacity-25">
          <div
            className="w-5 h-5 rounded-full border border-amber-200/40 flex items-center justify-center"
            style={{ animation: "spinReel 4s linear infinite" }}
          >
            <div className="w-[2px] h-[7px] bg-amber-100/60 rounded-full" />
          </div>
        </div>
        <div className="absolute bottom-[88px] right-5 flex flex-col items-center gap-1 opacity-25">
          <div
            className="w-5 h-5 rounded-full border border-amber-200/40 flex items-center justify-center"
            style={{ animation: "spinReel 4s linear infinite reverse" }}
          >
            <div className="w-[2px] h-[7px] bg-amber-100/60 rounded-full" />
          </div>
        </div>

        {/* Bottom engraving */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-20">
          <div className="w-1 h-1 bg-amber-100 rounded-full" />
          <p
            className="text-[6px] font-black uppercase tracking-[0.5em]"
            style={{ color: "#F1E8C7", fontFamily: "'Outfit', sans-serif" }}
          >
            otu flora
          </p>
          <div className="w-1 h-1 bg-amber-100 rounded-full" />
        </div>

        {/* Edge highlight */}
        <div className="absolute inset-0 pointer-events-none rounded-[38px] border border-white/[0.06]" />
      </div>

      <style>{`
        @keyframes spinReel {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Mixtape;
