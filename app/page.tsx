"use client";

import { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   RAIN DROP — individual raindrop with lifecycle
   ═══════════════════════════════════════════════════════════════ */
interface RainDrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  width: number;
}

interface Ripple {
  x: number;
  y: number;
  r: number;
  maxR: number;
  opacity: number;
  life: number;
}

interface MistBlob {
  x: number;
  y: number;
  r: number;
  opacity: number;
  phase: number;
  speed: number;
}

/* ═══════════════════════════════════════════════════════════════
   RAIN CANVAS — pure canvas animation, no libraries
   ═══════════════════════════════════════════════════════════════ */
function RainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    let W = window.innerWidth;
    let H = window.innerHeight;
    let animId: number;

    canvas.width = W;
    canvas.height = H;

    /* ── Build rain drop pool ── */
    function makeRainDrop(): RainDrop {
      return {
        x: Math.random() * W * 1.2 - W * 0.1,
        y: Math.random() * H - H,
        length: 12 + Math.random() * 28,
        speed: 9 + Math.random() * 14,
        opacity: 0.06 + Math.random() * 0.22,
        width: 0.4 + Math.random() * 0.6,
      };
    }

    const DROP_COUNT = 420;
    const drops: RainDrop[] = Array.from({ length: DROP_COUNT }, makeRainDrop).map((d) => ({
      ...d,
      y: Math.random() * H, // scatter initial positions so it doesn't all start from top
    }));

    const ripples: Ripple[] = [];
    const ANGLE_RAD = (Math.PI / 180) * 12; // 12° angle — light wind-driven rain

    /* ── Mist blobs drifting over the waterfall zone ── */
    const mistBlobs: MistBlob[] = Array.from({ length: 8 }, (_, i) => ({
      x: W * (0.2 + Math.random() * 0.6),
      y: H * (0.2 + Math.random() * 0.5),
      r: 80 + Math.random() * 180,
      opacity: 0.025 + Math.random() * 0.05,
      phase: Math.random() * Math.PI * 2,
      speed: 0.003 + Math.random() * 0.005,
    }));

    /* ── Bokeh light orbs ── */
    const orbs = Array.from({ length: 6 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 40 + Math.random() * 120,
      opacity: 0.015 + Math.random() * 0.025,
      phase: Math.random() * Math.PI * 2,
      speed: 0.004 + Math.random() * 0.006,
    }));

    let frame = 0;

    function draw() {
      frame++;
      ctx.clearRect(0, 0, W, H);

      /* ── 1. MIST BLOBS ── */
      mistBlobs.forEach((b) => {
        b.phase += b.speed;
        const pulsedOpacity = b.opacity * (0.7 + 0.3 * Math.sin(b.phase));
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grad.addColorStop(0, `rgba(255,255,255,${pulsedOpacity})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      });

      /* ── 2. SOFT LIGHT ORBS (bokeh) ── */
      orbs.forEach((o) => {
        o.phase += o.speed;
        const pulsedOpacity = o.opacity * (0.6 + 0.4 * Math.sin(o.phase));
        const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        grad.addColorStop(0, `rgba(200,240,210,${pulsedOpacity})`);
        grad.addColorStop(1, "rgba(200,240,210,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();
      });

      /* ── 3. RAIN DROPS ── */
      ctx.lineCap = "round";
      drops.forEach((d) => {
        // Move
        d.x += Math.sin(ANGLE_RAD) * d.speed;
        d.y += Math.cos(ANGLE_RAD) * d.speed;

        // Draw streak — gradient so tail fades
        const x2 = d.x - Math.sin(ANGLE_RAD) * d.length;
        const y2 = d.y - Math.cos(ANGLE_RAD) * d.length;
        const grad = ctx.createLinearGradient(x2, y2, d.x, d.y);
        grad.addColorStop(0, `rgba(220,240,255,0)`);
        grad.addColorStop(1, `rgba(220,240,255,${d.opacity})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = d.width;
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(d.x, d.y);
        ctx.stroke();

        // Hit bottom → spawn ripple & reset
        if (d.y > H + 20) {
          if (Math.random() < 0.25) {
            ripples.push({
              x: d.x,
              y: H - 4,
              r: 0,
              maxR: 6 + Math.random() * 10,
              opacity: 0.3 + Math.random() * 0.2,
              life: 0,
            });
          }
          Object.assign(d, makeRainDrop());
        }
      });

      /* ── 4. RIPPLES ── */
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.life += 1;
        rp.r = rp.maxR * (rp.life / 22);
        rp.opacity = 0.35 * (1 - rp.life / 22);
        if (rp.life > 22) { ripples.splice(i, 1); continue; }
        ctx.strokeStyle = `rgba(200,230,255,${rp.opacity})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.ellipse(rp.x, rp.y, rp.r, rp.r * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    function handleResize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 2,
        pointerEvents: "none",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Slight delay — let the font finish loading
    const t = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* ── LAYER 1: 4K Background Image ── */}
      <img
        src="/images/waterfall.png"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          zIndex: 0,
          // No filter — show full quality
        }}
      />

      {/* ── LAYER 2: Very subtle vignette to help text readability ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: `
            radial-gradient(ellipse at center, transparent 30%, rgba(8,18,8,0.35) 100%),
            linear-gradient(to bottom, rgba(8,18,8,0.12) 0%, transparent 30%, transparent 70%, rgba(8,18,8,0.2) 100%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* ── LAYER 3: Rain Canvas ── */}
      <RainCanvas />

      {/* ── LAYER 4: Title — haus der grünen ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "0",
          pointerEvents: "none",
        }}
      >
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 300,
            fontStyle: "normal",
            fontSize: "clamp(28px, 5vw, 68px)",
            letterSpacing: "0.28em",
            textTransform: "lowercase",
            color: "rgba(255, 255, 255, 0.92)",
            textAlign: "center",
            // Subtle luminous glow — like mist
            textShadow: `
              0 0 60px rgba(180, 230, 190, 0.35),
              0 0 120px rgba(180, 230, 190, 0.15),
              0 2px 8px rgba(0, 0, 0, 0.25)
            `,
            // Fade in on load
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0px)" : "translateY(6px)",
            transition: "opacity 2.4s cubic-bezier(0.16,1,0.3,1), transform 2.8s cubic-bezier(0.16,1,0.3,1)",
            whiteSpace: "nowrap",
          }}
        >
          haus der grünen
        </h1>
      </div>
    </div>
  );
}
