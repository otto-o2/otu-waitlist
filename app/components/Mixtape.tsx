"use client";

import React, { useState, useEffect, useRef } from "react";
import { SkipBack, SkipForward } from "lucide-react";

const NUM_BARS = 28;

// Lofi waveform: low, calm base heights — mostly mid-low
const BASE_HEIGHTS = [
  12, 18, 28, 16, 22, 35, 18, 14, 30, 20, 25, 15, 32, 18, 22, 16,
  28, 14, 20, 34, 16, 24, 18, 30, 14, 20, 26, 12,
];

// Which bars are "bass" (left side) vs hi-hat (right side) vs mid
const getBarRole = (i: number) => {
  if (i < 6) return "bass";
  if (i >= 22) return "hihat";
  return "mid";
};

const Mixtape = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(31);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [isWheelHovered, setIsWheelHovered] = useState(false);
  const [activeBars, setActiveBars] = useState(BASE_HEIGHTS);
  const beatRef = useRef(0); // beat counter for rhythm

  // Lofi BPM ~72 → one beat every ~833ms
  const BEAT_MS = 833;

  // Animate progress bar (slow, lofi track)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 0.04));
    }, 80);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Lofi waveform – slow sinusoidal breathing with rhythmic beats
  useEffect(() => {
    if (!isPlaying) return;
    let frame = 0;

    const tick = () => {
      frame++;
      const beatPhase = (frame % Math.round(BEAT_MS / 80)) / Math.round(BEAT_MS / 80);
      const isKick = beatPhase < 0.12;            // first 12% of beat = kick hit
      const isSnare = Math.abs(beatPhase - 0.5) < 0.08; // halfway = snare ghost
      const breathe = Math.sin((frame / Math.round(BEAT_MS / 80)) * Math.PI * 2);

      setActiveBars((prev) =>
        prev.map((h, i) => {
          const role = getBarRole(i);
          const base = BASE_HEIGHTS[i];
          // Slow sine sway per bar, each slightly offset
          const sway = Math.sin((frame * 0.04) + i * 0.45) * 6;

          if (role === "bass" && isKick) {
            // Bass bars jump on kick
            return Math.min(88, base + 50 + Math.random() * 10);
          }
          if (role === "mid" && isSnare) {
            // Mid bars gently nudge on snare ghost
            return Math.min(55, base + 18 + Math.random() * 8);
          }
          if (role === "hihat") {
            // Hi-hats flutter very lightly every half beat
            const hhFlutter = Math.sin(frame * 0.25 + i) > 0.6 ? 10 : 0;
            return Math.max(8, Math.min(30, base + sway * 0.5 + hhFlutter));
          }
          // General drift back toward base after hits
          const target = base + sway + breathe * 3;
          return Math.max(8, Math.min(70, h * 0.78 + target * 0.22));
        })
      );
    };

    const interval = setInterval(tick, 80);
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

  const elapsed = Math.floor((progress / 100) * 268);
  const elapsedMin = Math.floor(elapsed / 60);
  const elapsedSec = String(elapsed % 60).padStart(2, "0");
  const remaining = 268 - elapsed;
  const remMin = Math.floor(remaining / 60);
  const remSec = String(remaining % 60).padStart(2, "0");

  return (
    <div className="relative w-full max-w-[270px] select-none" style={{ aspectRatio: "0.58/1" }}>
      {/* iPod Shell — deep muted slate-indigo */}
      <div
        className="relative w-full h-full rounded-[38px] flex flex-col p-5 overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #2B2D3A 0%, #1C1E28 55%, #13141C 100%)",
          boxShadow:
            "0 60px 120px -20px rgba(5,5,15,0.75), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.5)",
        }}
      >
        {/* Brushed grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08]"
          style={{
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/brushed-alum-dark.png')",
          }}
        />

        {/* Top port */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[3px] bg-black/50 rounded-b-full" />

        {/* ─── SCREEN ─── */}
        <div
          className="relative w-full rounded-xl overflow-hidden flex flex-col"
          style={{
            aspectRatio: "1.22/1",
            background: "linear-gradient(160deg, #0D1A20 0%, #091318 100%)",
            boxShadow: "inset 0 2px 14px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.6) 1px, rgba(255,255,255,0.6) 2px)",
            }}
          />
          {/* Amber/warm phosphor glow — lofi vibe */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(180,150,80,0.06) 0%, transparent 70%)",
            }}
          />

          <div className="relative flex flex-col h-full p-3 gap-1">
            {/* Status row */}
            <div className="flex justify-between items-center">
              <span
                style={{
                  fontSize: 7,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "rgba(180,200,210,0.5)",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                now playing
              </span>
              {/* Battery */}
              <div className="flex items-center gap-1">
                <span style={{ color: "rgba(180,200,210,0.4)", fontSize: 6, fontFamily: "'Outfit', sans-serif", fontWeight: 700 }}>
                  ▶
                </span>
                <div
                  className="w-5 h-[9px] rounded-[2px] relative"
                  style={{ border: "1px solid rgba(180,200,210,0.2)" }}
                >
                  <div
                    className="absolute inset-y-[2px] left-[2px] rounded-[1px]"
                    style={{ width: "70%", background: "rgba(156,167,100,0.55)" }}
                  />
                  <div
                    className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-[3px] h-[5px] rounded-r-[1px]"
                    style={{ background: "rgba(180,200,210,0.2)" }}
                  />
                </div>
              </div>
            </div>

            {/* Track info */}
            <div className="flex flex-col items-center mt-1">
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "-0.01em",
                  lineHeight: 1,
                  color: "rgba(215,230,240,0.92)",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                Xylem Drift
              </span>
              <span
                style={{
                  fontSize: 7,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  marginTop: 3,
                  color: "rgba(156,167,100,0.5)",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                the chlorophyll sessions
              </span>
            </div>

            {/* ── WAVEFORM ── */}
            <div className="flex-1 flex items-end justify-center gap-[2px] px-1 pb-1 mt-1">
              {activeBars.map((h, i) => (
                <div
                  key={i}
                  style={{
                    width: "3px",
                    height: `${isPlaying ? h : 8}%`,
                    borderRadius: "2px",
                    background:
                      i < Math.floor((progress / 100) * NUM_BARS)
                        ? "rgba(156,167,100,0.85)"
                        : "rgba(180,200,210,0.15)",
                    // Slow, smooth lofi transition
                    transition: isPlaying
                      ? `height ${0.45 + Math.random() * 0.2}s ease-in-out`
                      : "height 0.6s ease",
                  }}
                />
              ))}
            </div>

            {/* Progress bar */}
            <div
              className="w-full h-[2px] rounded-full overflow-hidden"
              style={{ background: "rgba(180,200,210,0.08)" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "rgba(156,167,100,0.7)",
                  transition: "width 0.08s linear",
                }}
              />
            </div>
            <div className="flex justify-between">
              <span style={{ fontSize: 6, color: "rgba(180,200,210,0.35)", fontFamily: "'Outfit', sans-serif", fontWeight: 700 }}>
                {elapsedMin}:{elapsedSec}
              </span>
              <span style={{ fontSize: 6, color: "rgba(180,200,210,0.35)", fontFamily: "'Outfit', sans-serif", fontWeight: 700 }}>
                -{remMin}:{remSec}
              </span>
            </div>
          </div>
        </div>

        {/* ─── CLICK WHEEL ─── */}
        <div className="flex-1 flex items-center justify-center mt-4">
          <div
            className="relative cursor-pointer"
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
                  "linear-gradient(135deg, #353848 0%, #22242E 50%, #2C2E3C 100%)",
                boxShadow:
                  "0 8px 24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.4)",
                transform: `rotate(${wheelRotation}deg)`,
                transition: isWheelHovered ? "none" : "transform 0.9s ease-out",
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
                      background:
                        i % 6 === 0
                          ? "rgba(255,255,255,0.14)"
                          : "rgba(255,255,255,0.05)",
                      borderRadius: 1,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Fixed labels */}
            <span
              className="absolute font-black uppercase"
              style={{
                top: 10,
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: 7,
                letterSpacing: "0.18em",
                color: "rgba(210,220,235,0.3)",
                fontFamily: "'Outfit', sans-serif",
                whiteSpace: "nowrap",
              }}
            >
              flora
            </span>
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <SkipForward style={{ width: 12, height: 12, color: "rgba(210,220,235,0.28)" }} />
            </div>
            <div className="absolute left-2 top-1/2 -translate-y-1/2">
              <SkipBack style={{ width: 12, height: 12, color: "rgba(210,220,235,0.28)" }} />
            </div>
            {/* Play/Pause */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 flex gap-[4px] items-center h-4 z-10"
              style={{ bottom: 10, color: "rgba(210,220,235,0.28)" }}
            >
              {isPlaying ? (
                <>
                  <div style={{ width: 3, height: 10, background: "rgba(210,220,235,0.28)", borderRadius: "0.5px" }} />
                  <div style={{ width: 3, height: 10, background: "rgba(210,220,235,0.28)", borderRadius: "0.5px" }} />
                </>
              ) : (
                <div
                  style={{
                    width: 0, height: 0,
                    borderTop: "6px solid transparent",
                    borderBottom: "6px solid transparent",
                    borderLeft: "10px solid rgba(210,220,235,0.28)",
                    marginLeft: "2px" // Optical adjustment for triangle
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
                background: "linear-gradient(145deg, #2A2C38 0%, #181A22 100%)",
                boxShadow:
                  "0 4px 14px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50% 10%",
                  border: "1px solid rgba(156,167,100,0.18)",
                  transform: "rotate(-30deg)",
                  opacity: 0.7,
                }}
              />
            </div>
          </div>
        </div>


        {/* Bottom engraving */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-20">
          <div className="w-1 h-1 rounded-full" style={{ background: "#D4DCE8" }} />
          <p style={{ fontSize: 6, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.5em", color: "#D4DCE8", fontFamily: "'Outfit', sans-serif" }}>
            otu flora
          </p>
          <div className="w-1 h-1 rounded-full" style={{ background: "#D4DCE8" }} />
        </div>

        {/* Edge highlight */}
        <div className="absolute inset-0 pointer-events-none rounded-[38px] border border-white/[0.05]" />
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
