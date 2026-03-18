"use client";

import { ReactNode } from "react";

// ─── STANDARDIZED DEVICE DIMENSIONS ───
// All device mockups share these structural constants:
//   Outer:    max-w-[280px], aspect-ratio 0.65/1 (or override)
//   Chassis:  rounded-[42px], p-5, gap-3
//   Screen:   rounded-2xl, p-4, aspect-ratio 1/1.1 (or override)
//   Buttons:  side w-10 h-10 rounded-xl, center w-16 h-16 rounded-full
//   Labels:   5px uppercase 900-weight

interface DeviceButton {
  icon: ReactNode;
  label: string;
}

interface DeviceChassisProps {
  /** CSS gradient for the chassis body */
  chassisGradient: string;
  /** Shadow color for the outer drop shadow */
  chassisShadowColor: string;
  /** CSS gradient or solid color for the screen */
  screenBackground: string;
  /** Optional unique texture overlay for the screen (rendered at z-10) */
  screenOverlay?: ReactNode;
  /** Phosphor glow color string, e.g. "rgba(74,222,128,0.04)" */
  phosphorGlow: string;
  /** Screen content */
  children: ReactNode;
  /** Standard 3-button control layout (ignored if controls is provided) */
  buttons?: {
    left: DeviceButton;
    center: { icon: ReactNode };
    right: DeviceButton;
    sideGradient: string;
    centerGradient: string;
    labelColor: string;
  };
  /** Custom controls slot (overrides buttons, e.g. Mixtape click wheel) */
  controls?: ReactNode;
  /** Bottom engraving text */
  engravingText: string;
  /** Engraving accent color */
  engravingColor: string;
  /** Override outer aspect ratio (default "0.65/1") */
  aspectRatio?: string;
  /** Override screen aspect ratio (default "1/1.1") */
  screenAspectRatio?: string;
  /** Extra absolutely-positioned chassis decorations */
  chassisOverlay?: ReactNode;
}

export default function DeviceChassis({
  chassisGradient,
  chassisShadowColor,
  screenBackground,
  screenOverlay,
  phosphorGlow,
  children,
  buttons,
  controls,
  engravingText,
  engravingColor,
  aspectRatio = "0.65/1",
  screenAspectRatio = "1/1.1",
  chassisOverlay,
}: DeviceChassisProps) {
  return (
    <div
      className="relative w-full max-w-[280px] select-none"
      style={{ aspectRatio }}
    >
      <div
        className="relative w-full h-full rounded-[42px] p-5 flex flex-col gap-3 overflow-hidden shadow-2xl"
        style={{
          background: chassisGradient,
          boxShadow: `0 60px 120px -20px ${chassisShadowColor}, 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.5)`,
        }}
      >
        {/* Brushed aluminum texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08]"
          style={{
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/brushed-alum-dark.png')",
          }}
        />

        {chassisOverlay}

        {/* ─── SCREEN ─── */}
        <div
          className="relative w-full rounded-2xl overflow-hidden flex flex-col p-4"
          style={{
            aspectRatio: screenAspectRatio,
            background: screenBackground,
            boxShadow:
              "inset 0 2px 14px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          {screenOverlay}

          {/* Scanlines (shared across all devices) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035] z-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.6) 1px, rgba(255,255,255,0.6) 2px)",
            }}
          />

          {/* Phosphor Glow */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `radial-gradient(ellipse at 50% 50%, ${phosphorGlow} 0%, transparent 75%)`,
            }}
          />

          {children}
        </div>

        {/* ─── CONTROLS ─── */}
        {controls}
        {buttons && !controls && (
          <div className="flex items-center justify-between px-2">
            {/* Left Button */}
            <div className="group flex flex-col items-center gap-1.5 cursor-pointer">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:bg-white/[0.11] active:scale-95"
                style={{
                  background: buttons.sideGradient,
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
              >
                {buttons.left.icon}
              </div>
              <span
                style={{
                  fontSize: 5,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: buttons.labelColor,
                }}
              >
                {buttons.left.label}
              </span>
            </div>

            {/* Center Button */}
            <div className="relative group cursor-pointer">
              <div
                className="w-16 h-16 rounded-full p-1"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.1), transparent)",
                }}
              >
                <div
                  className="w-full h-full rounded-full flex items-center justify-center"
                  style={{
                    background: buttons.centerGradient,
                    boxShadow:
                      "0 8px 16px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)",
                  }}
                >
                  {buttons.center.icon}
                </div>
              </div>
            </div>

            {/* Right Button */}
            <div className="group flex flex-col items-center gap-1.5 cursor-pointer">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:bg-white/[0.11] active:scale-95"
                style={{
                  background: buttons.sideGradient,
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
              >
                {buttons.right.icon}
              </div>
              <span
                style={{
                  fontSize: 5,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: buttons.labelColor,
                }}
              >
                {buttons.right.label}
              </span>
            </div>
          </div>
        )}

        {/* ─── BOTTOM ENGRAVING ─── */}
        <div className="flex items-center justify-center gap-2 opacity-20">
          <div
            className="w-1 h-1 rounded-full"
            style={{ background: engravingColor }}
          />
          <p
            style={{
              fontSize: 6,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: engravingColor,
              opacity: 0.4,
            }}
          >
            {engravingText}
          </p>
          <div
            className="w-1 h-1 rounded-full"
            style={{ background: engravingColor }}
          />
        </div>

        {/* Edge highlight */}
        <div className="absolute inset-0 pointer-events-none rounded-[42px] border border-white/[0.05]" />
      </div>
    </div>
  );
}
