"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";

const BurnOverlay = dynamic(() => import("./BurnOverlay"), { ssr: false });

function useParallax() {
  const scrollY = useRef(0);
  const ticking = useRef(false);
  const listeners = useRef<Array<(y: number) => void>>([]);
  useEffect(() => {
    const onScroll = () => {
      scrollY.current = window.scrollY;
      if (!ticking.current) {
        requestAnimationFrame(() => {
          listeners.current.forEach((fn) => fn(scrollY.current));
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const subscribe = useCallback((fn: (y: number) => void) => {
    listeners.current.push(fn);
    return () => {
      listeners.current = listeners.current.filter((l) => l !== fn);
    };
  }, []);
  return subscribe;
}

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function WordReveal({
  text,
  visible,
  serif = false,
  delay = 0,
}: {
  text: string;
  visible: boolean;
  serif?: boolean;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <span
      style={{
        display: "inline",
        fontFamily: serif ? "var(--serif)" : "inherit",
      }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            marginRight: "0.28em",
          }}
        >
          <span
            style={{
              display: "inline-block",
              transform: visible ? "translateY(0)" : "translateY(110%)",
              opacity: visible ? 1 : 0,
              transition: `transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay + i * 0.07}s, opacity 0.5s ease ${delay + i * 0.07}s`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

export default function Home() {
  // FIX: added "already" as a status to handle duplicate signups gracefully
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "already" | "error"
  >("idle");
  const [navScrolled, setNavScrolled] = useState(false);
  const subscribe = useParallax();

  /* burn state */
  const [burnTriggered, setBurnTriggered] = useState(false);
  const [burnDone, setBurnDone] = useState(false);
  const hasScrolled = useRef(false);

  /* parallax refs */
  const layerFar = useRef<HTMLDivElement>(null);
  const layerMid = useRef<HTMLDivElement>(null);
  const layerNear = useRef<HTMLDivElement>(null);
  const layerFront = useRef<HTMLDivElement>(null);
  const layerMist = useRef<HTMLDivElement>(null);
  const heroText = useRef<HTMLDivElement>(null);
  const heroBg = useRef<HTMLDivElement>(null);

  const colorSection = useRef<HTMLElement>(null);
  const [bgColor, setBgColor] = useState("#0A0F0A");

  const pinnedRef = useRef<HTMLElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);

  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => setHeroLoaded(true), 100);
  }, []);

  /* trigger burn on very first scroll */
  useEffect(() => {
    const onFirstScroll = () => {
      if (!hasScrolled.current) {
        hasScrolled.current = true;
        setBurnTriggered(true);
      }
    };
    window.addEventListener("scroll", onFirstScroll, { passive: true });
    return () => window.removeEventListener("scroll", onFirstScroll);
  }, []);

  useEffect(() => {
    const unsub = subscribe((y) => setNavScrolled(y > 60));
    return unsub;
  }, [subscribe]);

  useEffect(() => {
    const unsub = subscribe((y) => {
      const vh = window.innerHeight;
      if (layerFar.current)
        layerFar.current.style.transform = `translateY(${y * 0.08}px)`;
      if (layerMid.current)
        layerMid.current.style.transform = `translateY(${y * 0.18}px)`;
      if (layerNear.current)
        layerNear.current.style.transform = `translateY(${y * 0.32}px)`;
      if (layerFront.current)
        layerFront.current.style.transform = `translateY(${y * 0.5}px)`;
      if (layerMist.current)
        layerMist.current.style.transform = `translateY(${y * 0.12}px)`;
      if (heroText.current)
        heroText.current.style.transform = `translateY(${y * 0.22}px)`;
      if (heroBg.current) {
        heroBg.current.style.opacity = String(
          1 - Math.min(y / (vh * 0.6), 1) * 0.3
        );
      }
      if (colorSection.current) {
        const rect = colorSection.current.getBoundingClientRect();
        // FIX: guard against division by zero when rect.height === vh
        const range = Math.max(rect.height - vh, 1);
        const progress = Math.max(0, Math.min(1, -rect.top / range));
        setBgColor(
          `rgb(${Math.round(10 + progress * 50)},${Math.round(
            15 + progress * 30
          )},${Math.round(10 + progress * 20)})`
        );
      }
      if (pinnedRef.current) {
        const rect = pinnedRef.current.getBoundingClientRect();
        // FIX: guard against division by zero when rect.height === vh
        const range = Math.max(rect.height - vh, 1);
        const progress = Math.max(0, Math.min(1, -rect.top / range));
        setActiveFeature(Math.min(3, Math.floor(progress * 4.5)));
      }
    });
    return unsub;
  }, [subscribe]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success && data.alreadySignedUp) {
        // FIX: handle duplicate signups with a distinct status
        setStatus("already");
      } else if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const r1 = useReveal();
  const r2 = useReveal();
  const r3 = useReveal();
  const r4 = useReveal();
  const r5 = useReveal();
  const r6 = useReveal();

  const features = [
    {
      emoji: "🛡️",
      tag: "ward mode",
      title: "Full care reports.",
      body: "Point your camera at any plant. otu builds a complete care profile — watering schedule, light, soil, stress flags, common problems. Your plant finally has a voice. You just have to listen.",
      accent: "var(--sage)",
    },
    {
      emoji: "🌿",
      tag: "wild mode",
      title: "On-the-go intelligence.",
      body: "Out in the world and something catches your eye? Identify any plant in seconds. Its name, its story, where it comes from, what it does. Curiosity satisfied — immediately.",
      accent: "var(--mist)",
    },
    {
      emoji: "🛒",
      tag: "farmer's market",
      title: "Every plant. Delivered.",
      body: "A marketplace for plants, pots, soil, and everything your collection deserves. Browse, discover, acquire. Currently growing in the background.",
      accent: "var(--terra-warm)",
    },
    {
      emoji: "📖",
      tag: "encyclopedia",
      title: "The full archive.",
      body: "Every plant. Every fact. A complete botanical encyclopedia built into the app — so when your monstera looks wrong at 2am, you have answers. Coming soon.",
      accent: "var(--cream-dim)",
    },
  ];

  // FIX: success/already states share the same confirmation block with different copy
  const isConfirmed = status === "success" || status === "already";

  return (
    <>
      <style>{`
        /* FIX: removed @import from here — fonts are now loaded in layout.tsx <head>
           which prevents FOUT and avoids SSR/build issues */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --void: #0A0F0A; --forest: #0E1A0E; --mid: #122612;
          --sage: #4A7A4A; --leaf: #6B9F5E; --mist: #A8C49A;
          --terra: #C96A3F; --terra-warm: #E8896A;
          --cream: #F0EBE0; --cream-dim: #C8C0B0;
          --serif: 'DM Serif Display', Georgia, serif;
          --sans: 'Inter', sans-serif;
        }
        html { scroll-behavior: smooth; }
        body {
          background: var(--void); color: var(--cream);
          font-family: var(--sans); -webkit-font-smoothing: antialiased; overflow-x: hidden;
        }
        body::before {
          content: ''; position: fixed; inset: 0; z-index: 800; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E");
          opacity: 0.45; mix-blend-mode: overlay;
        }
        ::selection { background: var(--terra); color: var(--cream); }
        a { text-decoration: none; color: inherit; }

        @keyframes scanline {
          0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); }
        }
        .scanline::after {
          content: ''; position: fixed; left: 0; right: 0; top: 0; height: 120px;
          pointer-events: none; z-index: 799;
          background: linear-gradient(to bottom, transparent, rgba(107,159,94,0.025), transparent);
          animation: scanline 8s linear infinite;
        }
        @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes breathe { 0%,100% { opacity:.55; } 50% { opacity:.8; } }

        .hero-loaded-1 { animation: fadeIn 1.2s 0.2s ease both; }
        .hero-loaded-2 { animation: fadeUp 1.2s 0.5s cubic-bezier(0.16,1,0.3,1) both; }
        .hero-loaded-3 { animation: fadeUp 1s 0.8s cubic-bezier(0.16,1,0.3,1) both; }
        .hero-loaded-4 { animation: fadeUp 1s 1.1s cubic-bezier(0.16,1,0.3,1) both; }
        .breathe { animation: breathe 4s ease infinite; }

        .feature-pill { transition: all 0.4s cubic-bezier(0.16,1,0.3,1); }
        .feature-pill:hover { transform: translateX(6px); }

        .join-btn {
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          position: relative; overflow: hidden;
        }
        .join-btn::before {
          content: ''; position: absolute; inset: 0;
          background: rgba(255,255,255,0.1);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.3s ease;
        }
        .join-btn:hover::before { transform: scaleX(1); }
        .join-btn:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(201,106,63,0.4) !important; }

        input:focus { outline: none; }
        input::placeholder { color: rgba(240,235,224,0.25); }

        /* FIX: mobile form — stack vertically and restore borders correctly */
        @media (max-width: 768px) {
          .hero-title { font-size: 52px !important; }
          .pinned-inner { flex-direction: column !important; }
          .pinned-sticky { position: relative !important; top: auto !important; height: auto !important; }
          .section-pad { padding: 80px 24px !important; }
          .form-row { flex-direction: column !important; }
          .form-row input {
            border-right: 1px solid rgba(240,235,224,0.1) !important;
            border-bottom: none !important;
          }
          .form-row button { width: 100%; }
          nav { padding: 16px 24px !important; }
        }
      `}</style>

      {/* ── BURN OVERLAY ── */}
      <BurnOverlay
        triggered={burnTriggered}
        onComplete={() => setBurnDone(true)}
      />

      <div className="scanline" />

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 700,
          padding: "20px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: navScrolled ? "rgba(10,15,10,0.88)" : "transparent",
          backdropFilter: navScrolled ? "blur(20px)" : "none",
          borderBottom: navScrolled
            ? "1px solid rgba(107,159,94,0.08)"
            : "none",
          transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--serif)",
            fontSize: "24px",
            letterSpacing: "-0.02em",
          }}
        >
          otu
        </span>
        <a
          href="#waitlist"
          style={{
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(240,235,224,0.5)",
            borderBottom: "1px solid rgba(240,235,224,0.2)",
            paddingBottom: "2px",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--cream)";
            e.currentTarget.style.borderBottomColor = "rgba(240,235,224,0.7)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(240,235,224,0.5)";
            e.currentTarget.style.borderBottomColor = "rgba(240,235,224,0.2)";
          }}
        >
          join the list
        </a>
      </nav>

      {/* ══ HERO — MULTI-LAYER PARALLAX ══ */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          overflow: "hidden",
        }}
      >
        <div
          ref={heroBg}
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(175deg, #060C06 0%, #0A160A 30%, #0E1E0E 60%, #122212 100%)",
          }}
        />

        {/* far trees */}
        <div
          ref={layerFar}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "75%",
            willChange: "transform",
          }}
        >
          <svg
            viewBox="0 0 1440 600"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: "100%",
            }}
            preserveAspectRatio="xMidYMax slice"
          >
            <path
              d="M0 600 L0 320 C40 300 80 280 120 260 C160 240 200 250 240 270 C280 290 300 285 340 265 C380 245 400 235 440 248 C480 261 510 275 550 258 C590 241 620 230 660 242 C700 254 720 268 760 255 C800 242 830 232 870 245 C910 258 940 272 980 258 C1020 244 1050 232 1090 246 C1130 260 1160 275 1200 262 C1240 249 1270 238 1310 252 C1350 266 1390 278 1440 265 L1440 600Z"
              fill="#0D1E0D"
            />
            {[
              60, 150, 240, 340, 430, 530, 620, 720, 810, 910, 1000, 1100,
              1200, 1300, 1400,
            ].map((x, i) => (
              <path
                key={i}
                d={`M${x} ${270 + (i % 3) * 15} L${x - 18} ${
                  310 + (i % 3) * 15
                } L${x + 18} ${310 + (i % 3) * 15}Z`}
                fill="#0A1A0A"
              />
            ))}
          </svg>
        </div>

        {/* mid forest */}
        <div
          ref={layerMid}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "65%",
            willChange: "transform",
          }}
        >
          <svg
            viewBox="0 0 1440 520"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: "100%",
            }}
            preserveAspectRatio="xMidYMax slice"
          >
            <path
              d="M0 520 L0 280 C30 260 60 245 100 240 C140 235 170 248 210 268 L210 250 C230 225 255 210 280 215 C305 220 320 238 335 258 C360 240 390 225 420 232 C450 239 470 256 495 270 L495 248 C515 222 545 208 570 215 C595 222 610 242 630 260 C660 240 695 226 725 235 C755 244 775 262 800 275 L800 250 C822 224 852 210 878 218 C904 226 918 246 938 264 C965 244 1000 230 1030 238 C1060 246 1080 264 1105 278 L1105 255 C1128 228 1160 214 1188 222 C1216 230 1230 252 1250 270 C1280 250 1315 238 1345 246 C1375 254 1400 268 1440 275 L1440 520Z"
              fill="#0F210F"
            />
            {[0, 120, 240, 380, 500, 640, 760, 880, 1000, 1140, 1260, 1380].map(
              (x, i) => {
                const bx = x + 20;
                return (
                  <g key={i}>
                    <line
                      x1={bx}
                      y1={260}
                      x2={bx}
                      y2={340}
                      stroke="#0A1C0A"
                      strokeWidth="4"
                    />
                    <polygon
                      points={`${bx},${240} ${bx - 22},${290} ${bx + 22},${290}`}
                      fill="#0D200D"
                    />
                    <polygon
                      points={`${bx},${258} ${bx - 28},${318} ${bx + 28},${318}`}
                      fill="#0A1A0A"
                    />
                  </g>
                );
              }
            )}
          </svg>
        </div>

        {/* near trees */}
        <div
          ref={layerNear}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "60%",
            willChange: "transform",
          }}
        >
          <svg
            viewBox="0 0 1440 480"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: "100%",
            }}
            preserveAspectRatio="xMidYMax slice"
          >
            <path
              d="M0 480 L0 200 C50 180 100 168 150 175 C200 182 240 200 285 215 L285 185 C310 155 345 140 375 148 C405 156 425 175 450 195 C480 170 520 155 555 163 C590 171 615 192 640 210 L640 182 C668 150 705 136 735 145 C765 154 788 176 812 198 C845 170 888 155 922 164 C956 173 982 196 1010 216 L1010 188 C1038 155 1078 140 1108 150 C1138 160 1162 182 1188 204 C1220 175 1262 160 1295 169 C1328 178 1355 200 1385 218 L1440 200 L1440 480Z"
              fill="#112511"
            />
            {[40, 180, 320, 460, 600, 740, 880, 1020, 1160, 1300].map(
              (x, i) => (
                <g key={i}>
                  <rect
                    x={x + 14}
                    y={200}
                    width="6"
                    height={120 + (i % 3) * 40}
                    rx="3"
                    fill="#0C1C0C"
                  />
                  <path
                    d={`M${x + 17} ${190} L${x - 8} ${240} L${x + 42} ${240}Z`}
                    fill="#0F220F"
                  />
                  <path
                    d={`M${x + 17} ${218} L${x - 14} ${278} L${x + 48} ${278}Z`}
                    fill="#0C1C0C"
                  />
                  <path
                    d={`M${x + 17} ${250} L${x - 18} ${322} L${x + 52} ${322}Z`}
                    fill="#0A1A0A"
                  />
                </g>
              )
            )}
          </svg>
        </div>

        {/* front silhouettes */}
        <div
          ref={layerFront}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "45%",
            willChange: "transform",
          }}
        >
          <svg
            viewBox="0 0 1440 380"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: "100%",
            }}
            preserveAspectRatio="xMidYMax slice"
          >
            <path
              d="M0 380 L0 200 C80 185 160 178 240 185 C320 192 380 205 460 198 C540 191 600 178 680 182 C760 186 820 200 900 196 C980 192 1040 179 1120 184 C1200 189 1260 200 1340 194 L1440 188 L1440 380Z"
              fill="#081408"
            />
            {[0, 280, 560, 850, 1140, 1400].map((x, i) => (
              <g key={i}>
                <rect
                  x={x + 20}
                  y={80}
                  width="10"
                  height={180}
                  rx="5"
                  fill="#060E06"
                />
                <path
                  d={`M${x + 25} ${68} L${x - 5} ${130} L${x + 55} ${130}Z`}
                  fill="#081208"
                />
                <path
                  d={`M${x + 25} ${100} L${x - 18} ${180} L${x + 68} ${180}Z`}
                  fill="#060E06"
                />
                <path
                  d={`M${x + 25} ${145} L${x - 28} ${238} L${x + 78} ${238}Z`}
                  fill="#050C05"
                />
              </g>
            ))}
          </svg>
        </div>

        {/* mist */}
        <div
          ref={layerMist}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40%",
            willChange: "transform",
            opacity: 0.6,
          }}
        >
          <svg
            viewBox="0 0 1440 300"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: "100%",
            }}
            preserveAspectRatio="xMidYMax slice"
          >
            <defs>
              <radialGradient id="m1" cx="30%" cy="100%" r="60%">
                <stop offset="0%" stopColor="rgba(107,159,94,0.08)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <radialGradient id="m2" cx="70%" cy="100%" r="50%">
                <stop offset="0%" stopColor="rgba(74,122,74,0.06)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <ellipse cx="420" cy="300" rx="600" ry="80" fill="url(#m1)" />
            <ellipse cx="1020" cy="300" rx="550" ry="70" fill="url(#m2)" />
            <ellipse
              cx="720"
              cy="300"
              rx="800"
              ry="50"
              fill="rgba(30,60,30,0.12)"
            />
          </svg>
        </div>

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "220px",
            background:
              "linear-gradient(to bottom, rgba(6,12,6,0.8) 0%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* hero text */}
        <div
          ref={heroText}
          style={{
            position: "relative",
            zIndex: 10,
            padding: "0 52px 100px",
            maxWidth: "960px",
            willChange: "transform",
          }}
        >
          {heroLoaded && (
            <>
              <p
                className="hero-loaded-1 breathe"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--leaf)",
                  marginBottom: "28px",
                  fontWeight: 500,
                }}
              >
                plant intelligence — coming soon
              </p>
              <h1
                className="hero-loaded-2 hero-title"
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(52px, 7.5vw, 108px)",
                  fontWeight: 400,
                  letterSpacing: "-0.035em",
                  lineHeight: 1.0,
                  marginBottom: "28px",
                  color: "var(--cream)",
                }}
              >
                the world grows
                <br />
                around you.
                <br />
                <em style={{ color: "var(--mist)", fontStyle: "italic" }}>
                  otu sees it all.
                </em>
              </h1>
              <p
                className="hero-loaded-3"
                style={{
                  fontSize: "clamp(15px, 1.8vw, 18px)",
                  color: "rgba(240,235,224,0.5)",
                  maxWidth: "440px",
                  lineHeight: 1.75,
                  marginBottom: "52px",
                  fontWeight: 300,
                }}
              >
                identify any plant. receive full care reports. know what's
                growing everywhere you go.
              </p>
              <div
                className="hero-loaded-4"
                style={{
                  display: "flex",
                  gap: "28px",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="#waitlist"
                  className="join-btn"
                  style={{
                    background: "var(--terra)",
                    color: "var(--cream)",
                    padding: "16px 40px",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    boxShadow: "0 4px 20px rgba(201,106,63,0.25)",
                    display: "inline-block",
                  }}
                >
                  join the waitlist
                </a>
                <span
                  style={{
                    fontSize: "12px",
                    color: "rgba(240,235,224,0.22)",
                    letterSpacing: "0.04em",
                  }}
                >
                  free · no spam
                </span>
              </div>
            </>
          )}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "300px",
            background:
              "linear-gradient(to top, var(--void) 0%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 5,
          }}
        />

        {/* scroll indicator — pulses until burn is done */}
        {!burnTriggered && (
          <div
            style={{
              position: "absolute",
              bottom: "32px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontSize: "9px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(240,235,224,0.25)",
              }}
            >
              scroll
            </span>
            <div
              style={{
                width: "1px",
                height: "40px",
                background:
                  "linear-gradient(to bottom, rgba(240,235,224,0.3), transparent)",
              }}
            />
          </div>
        )}
      </section>

      {/* ══ COLOR SHIFT SECTION ══ */}
      <section
        ref={colorSection}
        style={{
          padding: "140px 52px",
          background: bgColor,
          transition: "background 0.1s linear",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "800px",
            height: "800px",
            background:
              "radial-gradient(circle, rgba(107,159,94,0.06) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div
          ref={r1.ref}
          style={{
            maxWidth: "820px",
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          <p
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(28px, 4vw, 52px)",
              fontStyle: "italic",
              fontWeight: 400,
              letterSpacing: "-0.025em",
              lineHeight: 1.3,
              color: "rgba(240,235,224,0.65)",
            }}
          >
            <WordReveal
              text="most people walk through a forest and see trees."
              visible={r1.visible}
              serif
              delay={0}
            />
            {" "}
            <span style={{ color: "var(--mist)" }}>
              <WordReveal
                text="otu walks through and sees everything else."
                visible={r1.visible}
                serif
                delay={0.4}
              />
            </span>
          </p>
        </div>
      </section>

      {/* ══ PINNED FEATURES ══ */}
      <section ref={pinnedRef} style={{ height: "400vh", position: "relative" }}>
        <div
          className="pinned-inner"
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            overflow: "hidden",
          }}
        >
          {/* left list */}
          <div
            style={{
              width: "40%",
              padding: "60px 52px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              background: "var(--void)",
              borderRight: "1px solid rgba(107,159,94,0.07)",
              position: "relative",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--sage)",
                marginBottom: "40px",
                fontWeight: 500,
              }}
            >
              what otu does
            </p>
            {features.map((f, i) => (
              <div
                key={f.tag}
                className="feature-pill"
                style={{
                  padding: "20px 24px",
                  marginBottom: "8px",
                  borderLeft: `2px solid ${
                    activeFeature === i ? f.accent : "rgba(107,159,94,0.1)"
                  }`,
                  background:
                    activeFeature === i
                      ? "rgba(107,159,94,0.05)"
                      : "transparent",
                  cursor: "default",
                  transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
                  opacity: activeFeature === i ? 1 : 0.35,
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: f.accent,
                    marginBottom: "6px",
                    fontWeight: 600,
                  }}
                >
                  {f.tag}
                </div>
                <div
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: "22px",
                    fontWeight: 400,
                    letterSpacing: "-0.02em",
                    color: "var(--cream)",
                    lineHeight: 1.2,
                  }}
                >
                  {f.title}
                </div>
              </div>
            ))}
            <div
              style={{
                position: "absolute",
                bottom: "40px",
                left: "52px",
                display: "flex",
                gap: "8px",
              }}
            >
              {features.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: activeFeature === i ? "24px" : "6px",
                    height: "6px",
                    borderRadius: "3px",
                    background:
                      activeFeature === i
                        ? "var(--terra)"
                        : "rgba(240,235,224,0.15)",
                    transition: "all 0.4s ease",
                  }}
                />
              ))}
            </div>
          </div>
          {/* right detail */}
          <div
            style={{
              flex: 1,
              position: "relative",
              background: "var(--forest)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {features.map((f, i) => (
              <div
                key={f.tag}
                style={{
                  position: "absolute",
                  inset: 0,
                  padding: "60px 64px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  opacity: activeFeature === i ? 1 : 0,
                  transform:
                    activeFeature === i
                      ? "translateY(0)"
                      : activeFeature > i
                      ? "translateY(-40px)"
                      : "translateY(40px)",
                  transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
                  pointerEvents: activeFeature === i ? "auto" : "none",
                }}
              >
                <div
                  style={{
                    fontSize: "72px",
                    marginBottom: "36px",
                    filter: "grayscale(0.3)",
                    lineHeight: 1,
                  }}
                >
                  {f.emoji}
                </div>
                {i >= 2 && (
                  <div
                    style={{
                      display: "inline-block",
                      fontSize: "10px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(240,235,224,0.3)",
                      border: "1px solid rgba(240,235,224,0.12)",
                      padding: "4px 12px",
                      marginBottom: "20px",
                      alignSelf: "flex-start",
                    }}
                  >
                    coming soon
                  </div>
                )}
                <h3
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: "clamp(32px, 4vw, 52px)",
                    fontWeight: 400,
                    letterSpacing: "-0.03em",
                    color: "var(--cream)",
                    lineHeight: 1.1,
                    marginBottom: "24px",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.78,
                    color: "rgba(240,235,224,0.45)",
                    fontWeight: 300,
                    maxWidth: "480px",
                  }}
                >
                  {f.body}
                </p>
                <div
                  style={{
                    position: "absolute",
                    bottom: "52px",
                    left: "64px",
                    right: "64px",
                    height: "1px",
                    background: `linear-gradient(to right, ${f.accent}40, transparent)`,
                  }}
                />
              </div>
            ))}
            <svg
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: "absolute",
                right: "-40px",
                bottom: "-40px",
                width: "300px",
                height: "300px",
                opacity: 0.04,
                pointerEvents: "none",
              }}
            >
              <circle
                cx="200"
                cy="200"
                r="180"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <circle
                cx="200"
                cy="200"
                r="120"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <line
                x1="20"
                y1="200"
                x2="380"
                y2="200"
                stroke="currentColor"
                strokeWidth="1"
              />
              <line
                x1="200"
                y1="20"
                x2="200"
                y2="380"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section
        className="section-pad"
        style={{
          padding: "140px 52px",
          background:
            "linear-gradient(180deg, var(--void) 0%, #0C1A0C 50%, var(--void) 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(107,159,94,0.04) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div ref={r2.ref} style={{ marginBottom: "80px", textAlign: "center" }}>
            <h2
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(32px, 4.5vw, 60px)",
                fontWeight: 400,
                letterSpacing: "-0.03em",
                color: "var(--cream)",
                lineHeight: 1.1,
              }}
            >
              <WordReveal
                text="three steps to knowing"
                visible={r2.visible}
                serif
              />
              <br />
              <span style={{ color: "var(--mist)", fontStyle: "italic" }}>
                <WordReveal
                  text="every plant you've ever passed."
                  visible={r2.visible}
                  serif
                  delay={0.3}
                />
              </span>
            </h2>
          </div>
          {[
            {
              n: "01",
              ref: r3,
              t: "take a photo",
              d: "any plant. anywhere. potted on your shelf, wild on a trail, slowly dying in the corner you keep ignoring.",
            },
            {
              n: "02",
              ref: r4,
              t: "otu identifies it",
              d: "species name, common name, origin, personality. delivered in seconds. no more guessing, no more googling at midnight.",
            },
            {
              n: "03",
              ref: r5,
              t: "know everything",
              d: "care guide, watering rhythm, light requirements, warning signs. the full picture — finally.",
            },
          ].map((step, i) => (
            <div
              ref={step.ref.ref}
              key={step.n}
              style={{
                display: "flex",
                gap: "48px",
                alignItems: "flex-start",
                padding: "60px 0",
                borderBottom:
                  i < 2 ? "1px solid rgba(107,159,94,0.07)" : "none",
                opacity: step.ref.visible ? 1 : 0,
                transform: step.ref.visible
                  ? "translateY(0)"
                  : "translateY(48px)",
                transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${
                  i * 0.15
                }s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(48px, 6vw, 80px)",
                  fontWeight: 400,
                  letterSpacing: "-0.06em",
                  color: "rgba(107,159,94,0.15)",
                  lineHeight: 1,
                  flexShrink: 0,
                  minWidth: "100px",
                }}
              >
                {step.n}
              </span>
              <div style={{ paddingTop: "8px" }}>
                <h3
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: "clamp(24px, 3vw, 36px)",
                    fontWeight: 400,
                    letterSpacing: "-0.02em",
                    color: "var(--cream)",
                    marginBottom: "14px",
                    lineHeight: 1.2,
                  }}
                >
                  {step.t}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.75,
                    color: "rgba(240,235,224,0.4)",
                    fontWeight: 300,
                    maxWidth: "500px",
                  }}
                >
                  {step.d}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FOREST BREAK ══ */}
      <section
        style={{
          position: "relative",
          height: "60vh",
          overflow: "hidden",
          background: "linear-gradient(to bottom, var(--void), #0E1E0E)",
        }}
      >
        <svg
          viewBox="0 0 1440 500"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "100%",
          }}
          preserveAspectRatio="xMidYMax slice"
        >
          <path
            d="M0 500 L0 180 C80 160 160 150 240 158 C320 166 380 182 460 175 C540 168 600 152 680 158 C760 164 820 180 900 175 C980 170 1040 155 1120 162 C1200 169 1260 184 1340 178 L1440 172 L1440 500Z"
            fill="#0A1A0A"
            opacity="0.9"
          />
          <path
            d="M0 500 L0 250 C60 240 120 235 180 242 C240 249 290 262 350 255 C410 248 460 234 520 240 C580 246 620 260 680 254 C740 248 780 234 840 240 C900 246 940 260 1000 255 C1060 250 1100 238 1160 244 C1220 250 1270 264 1330 258 L1440 250 L1440 500Z"
            fill="#081508"
            opacity="0.95"
          />
        </svg>
        <div
          ref={r6.ref}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: r6.visible ? 1 : 0,
            transition: "opacity 1.2s ease",
          }}
        >
          <p
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: "clamp(20px, 3vw, 36px)",
              color: "rgba(168,196,154,0.4)",
              letterSpacing: "-0.02em",
              textAlign: "center",
            }}
          >
            "nothing that grows is a stranger
            <br />
            to otu."
          </p>
        </div>
      </section>

      {/* ══ WAITLIST ══ */}
      <section
        id="waitlist"
        className="section-pad"
        style={{
          padding: "140px 52px",
          background: "var(--forest)",
          borderTop: "1px solid rgba(107,159,94,0.07)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            right: "-100px",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(201,106,63,0.06) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "-80px",
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(107,159,94,0.04) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: "620px",
            margin: "0 auto",
            position: "relative",
            zIndex: 2,
          }}
        >
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--terra-warm)",
              marginBottom: "28px",
              fontWeight: 500,
            }}
          >
            early access
          </p>
          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(40px, 5vw, 72px)",
              fontWeight: 400,
              letterSpacing: "-0.035em",
              color: "var(--cream)",
              lineHeight: 1.0,
              marginBottom: "24px",
            }}
          >
            be there
            <br />
            <em style={{ color: "rgba(240,235,224,0.38)" }}>
              before it opens.
            </em>
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "rgba(240,235,224,0.38)",
              lineHeight: 1.75,
              marginBottom: "56px",
              fontWeight: 300,
              maxWidth: "400px",
            }}
          >
            join the waitlist. get early access when otu launches. we'll send
            one email. when it's ready.
          </p>

          {/* FIX: handle success, already-signed-up, and form states distinctly */}
          {isConfirmed ? (
            <div
              style={{
                padding: "52px 44px",
                border: "1px solid rgba(107,159,94,0.18)",
                background: "rgba(107,159,94,0.04)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(28px, 3vw, 40px)",
                  fontWeight: 400,
                  letterSpacing: "-0.025em",
                  color: "var(--mist)",
                  marginBottom: "14px",
                }}
              >
                {status === "already" ? "already there." : "you're in."}
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(240,235,224,0.38)",
                  lineHeight: 1.75,
                  fontWeight: 300,
                }}
              >
                {status === "already"
                  ? "you're already on the list. we'll reach out when otu is ready."
                  : "we'll reach out when otu is ready for you.\nin the meantime — really look at your plants."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div
                className="form-row"
                style={{ display: "flex", gap: "0" }}
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    flex: "1 1 240px",
                    padding: "18px 22px",
                    background: "rgba(240,235,224,0.04)",
                    border: "1px solid rgba(240,235,224,0.1)",
                    // FIX: borderRight removed from inline style;
                    // handled by .form-row input CSS rule above for mobile
                    borderRight: "none",
                    color: "var(--cream)",
                    fontSize: "14px",
                    fontFamily: "var(--sans)",
                    letterSpacing: "0.02em",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(107,159,94,0.4)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(240,235,224,0.1)")
                  }
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="join-btn"
                  style={{
                    background:
                      status === "loading"
                        ? "rgba(201,106,63,0.5)"
                        : "var(--terra)",
                    color: "var(--cream)",
                    padding: "18px 32px",
                    border: "none",
                    fontSize: "12px",
                    fontWeight: 600,
                    fontFamily: "var(--sans)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    flexShrink: 0,
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                    boxShadow: "0 4px 20px rgba(201,106,63,0.2)",
                  }}
                >
                  {status === "loading" ? "..." : "join →"}
                </button>
              </div>
              {status === "error" && (
                <p
                  style={{
                    color: "var(--terra-warm)",
                    marginTop: "12px",
                    fontSize: "13px",
                    fontWeight: 300,
                  }}
                >
                  something didn't work. try again.
                </p>
              )}
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "44px 52px",
          background: "var(--void)",
          borderTop: "1px solid rgba(107,159,94,0.05)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--serif)",
            fontSize: "22px",
            color: "rgba(240,235,224,0.3)",
            letterSpacing: "-0.02em",
          }}
        >
          otu
        </span>
        <p
          style={{
            fontSize: "11px",
            color: "rgba(240,235,224,0.18)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          plant intelligence · © {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}
