"use client";

import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════
   UTILITY HOOKS
   ═══════════════════════════════════════════════ */

function useReveal(threshold = 0.12) {
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
    <span style={{ display: "inline", fontFamily: serif ? "var(--serif)" : "inherit" }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.28em" }}>
          <span
            style={{
              display: "inline-block",
              transform: visible ? "translateY(0)" : "translateY(110%)",
              opacity: visible ? 1 : 0,
              transition: `transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay + i * 0.06}s, opacity 0.5s ease ${delay + i * 0.06}s`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

/* ═══════════════════════════════════════════════
   FLOATING LEAF PARTICLE
   ═══════════════════════════════════════════════ */

function FloatingLeaf({ delay, left, size }: { delay: number; left: string; size: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left,
        top: "-20px",
        width: `${size}px`,
        height: `${size}px`,
        opacity: 0,
        animation: `leafDrift ${12 + Math.random() * 8}s ${delay}s linear infinite`,
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2C6.5 2 2 8 2 14c0 2.5 1 4.5 2.5 6 1.5-1.5 3-3 5.5-4 2.5-1 5-1.5 6-1.5-1-4-3-8-4-12.5z"
          fill="var(--green-leaf)"
          opacity="0.15"
        />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════ */

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "already" | "error">("idle");
  const [navScrolled, setNavScrolled] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const r1 = useReveal();
  const r2 = useReveal();
  const r3 = useReveal();
  const r4 = useReveal();
  const r5 = useReveal();
  const r6 = useReveal();
  const r7 = useReveal();
  const r8 = useReveal();

  useEffect(() => {
    setTimeout(() => setHeroLoaded(true), 100);
  }, []);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

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

  const features = [
    {
      icon: "🌱",
      tag: "ward mode",
      title: "full care reports",
      body: "point your camera at any plant. otu builds a complete care profile — watering schedule, light, soil, stress flags, common problems.",
      color: "var(--green-leaf)",
      gradient: "linear-gradient(135deg, rgba(107,159,94,0.12), rgba(74,122,74,0.06))",
    },
    {
      icon: "🌿",
      tag: "wild mode",
      title: "instant identification",
      body: "out in the world and something catches your eye? identify any plant in seconds. its name, its story, where it comes from.",
      color: "var(--green-mist)",
      gradient: "linear-gradient(135deg, rgba(168,196,154,0.12), rgba(107,159,94,0.06))",
    },
    {
      icon: "🪴",
      tag: "farmer's market",
      title: "every plant. delivered.",
      body: "a marketplace for plants, pots, soil, and everything your collection deserves. browse, discover, acquire.",
      color: "var(--terra-soft)",
      gradient: "linear-gradient(135deg, rgba(212,154,122,0.12), rgba(201,106,63,0.06))",
    },
    {
      icon: "📖",
      tag: "encyclopedia",
      title: "the full archive",
      body: "every plant. every fact. a complete botanical encyclopedia so when your monstera looks wrong at 2am, you have answers.",
      color: "var(--amber-light)",
      gradient: "linear-gradient(135deg, rgba(219,184,110,0.12), rgba(200,164,90,0.06))",
    },
  ];

  const steps = [
    {
      n: "01",
      emoji: "📸",
      title: "take a photo",
      desc: "any plant. anywhere. potted on your shelf, wild on a trail, slowly dying in the corner you keep ignoring.",
    },
    {
      n: "02",
      emoji: "🔍",
      title: "otu identifies it",
      desc: "species name, common name, origin, personality. delivered in seconds. no more guessing.",
    },
    {
      n: "03",
      emoji: "🌿",
      title: "know everything",
      desc: "care guide, watering rhythm, light needs, warning signs. the full picture — finally.",
    },
  ];

  const isConfirmed = status === "success" || status === "already";

  return (
    <>
      {/* ═══════════════════════════════════════════
          NAVIGATION
          ═══════════════════════════════════════════ */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "18px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: navScrolled ? "rgba(26,22,18,0.92)" : "transparent",
          backdropFilter: navScrolled ? "blur(24px) saturate(1.2)" : "none",
          WebkitBackdropFilter: navScrolled ? "blur(24px) saturate(1.2)" : "none",
          borderBottom: navScrolled ? "1px solid rgba(168,196,154,0.06)" : "1px solid transparent",
          transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Leaf logo mark */}
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--green-dark), var(--green-mid))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              boxShadow: "0 2px 12px rgba(74,122,74,0.2)",
            }}
          >
            🌿
          </div>
          <span
            style={{
              fontFamily: "var(--serif)",
              fontSize: "24px",
              letterSpacing: "-0.02em",
              color: "var(--cream)",
            }}
          >
            otu
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <a
            href="#features"
            style={{
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.06em",
              color: "rgba(240,235,224,0.45)",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,235,224,0.45)")}
          >
            features
          </a>
          <a
            href="#how"
            style={{
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.06em",
              color: "rgba(240,235,224,0.45)",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,235,224,0.45)")}
          >
            how it works
          </a>
          <a
            href="#waitlist"
            className="btn-primary"
            style={{ padding: "10px 24px", fontSize: "11px" }}
          >
            join waitlist
          </a>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Hero background image with parallax */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/images/hero.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `scale(1.1) translate(${(mousePos.x - 0.5) * -10}px, ${(mousePos.y - 0.5) * -10}px)`,
            transition: "transform 0.8s ease-out",
            filter: "brightness(0.5) saturate(1.2)",
          }}
        />

        {/* Warm gradient overlays */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(26,22,18,0.85) 0%, rgba(26,22,18,0.5) 40%, rgba(26,22,18,0.7) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 20% 80%, rgba(107,159,94,0.08) 0%, transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 80% 20%, rgba(200,164,90,0.06) 0%, transparent 60%)",
          }}
        />

        {/* Floating leaves */}
        {heroLoaded && (
          <>
            <FloatingLeaf delay={0} left="10%" size={18} />
            <FloatingLeaf delay={3} left="25%" size={14} />
            <FloatingLeaf delay={6} left="45%" size={20} />
            <FloatingLeaf delay={9} left="65%" size={16} />
            <FloatingLeaf delay={12} left="80%" size={22} />
            <FloatingLeaf delay={2} left="92%" size={15} />
          </>
        )}

        {/* Bottom gradient fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "200px",
            background: "linear-gradient(to top, var(--bg-deep) 0%, transparent 100%)",
            zIndex: 5,
          }}
        />

        {/* Hero content */}
        <div
          className="hero-content"
          style={{
            position: "relative",
            zIndex: 10,
            padding: "0 64px",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            paddingTop: "120px",
          }}
        >
          {heroLoaded && (
            <div style={{ maxWidth: "680px" }}>
              {/* Tag line */}
              <div
                className="hero-anim-1 breathe"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "rgba(107,159,94,0.1)",
                  border: "1px solid rgba(107,159,94,0.15)",
                  borderRadius: "var(--radius-full)",
                  padding: "8px 20px",
                  marginBottom: "32px",
                }}
              >
                <span style={{ fontSize: "14px" }}>🌱</span>
                <span
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--green-mist)",
                    fontWeight: 500,
                  }}
                >
                  plant intelligence — opening soon
                </span>
              </div>

              {/* Main headline */}
              <h1
                className="hero-anim-2 hero-title"
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(44px, 7vw, 96px)",
                  fontWeight: 400,
                  letterSpacing: "-0.035em",
                  lineHeight: 1.05,
                  marginBottom: "28px",
                  color: "var(--cream)",
                }}
              >
                the world grows
                <br />
                around you.
                <br />
                <em
                  style={{
                    color: "var(--green-mist)",
                    fontStyle: "italic",
                    textShadow: "0 0 60px rgba(168,196,154,0.15)",
                  }}
                >
                  otu sees it all.
                </em>
              </h1>

              {/* Sub text */}
              <p
                className="hero-anim-3"
                style={{
                  fontSize: "clamp(15px, 1.6vw, 18px)",
                  color: "var(--cream-dim)",
                  maxWidth: "460px",
                  lineHeight: 1.8,
                  marginBottom: "44px",
                  fontWeight: 300,
                }}
              >
                identify any plant. receive full care reports.
                know what&apos;s growing everywhere you go.
              </p>

              {/* CTA buttons */}
              <div
                className="hero-anim-4"
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <a href="#waitlist" className="btn-primary">
                  join the waitlist
                </a>
                <a
                  href="#features"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "16px 28px",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "var(--cream-dim)",
                    border: "1px solid rgba(240,235,224,0.1)",
                    borderRadius: "var(--radius-full)",
                    transition: "all 0.3s var(--ease-out)",
                    letterSpacing: "0.04em",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(168,196,154,0.3)";
                    e.currentTarget.style.color = "var(--cream)";
                    e.currentTarget.style.background = "rgba(168,196,154,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(240,235,224,0.1)";
                    e.currentTarget.style.color = "var(--cream-dim)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  learn more
                  <span style={{ fontSize: "16px", transition: "transform 0.3s" }}>↓</span>
                </a>
              </div>

              {/* Trust line */}
              <p
                className="hero-anim-5"
                style={{
                  marginTop: "24px",
                  fontSize: "12px",
                  color: "var(--stone)",
                  letterSpacing: "0.06em",
                }}
              >
                🔒 free · no spam · one email when we launch
              </p>
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div
          className={heroLoaded ? "hero-anim-5" : ""}
          style={{
            position: "absolute",
            bottom: "36px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span
            style={{
              fontSize: "10px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(240,235,224,0.2)",
            }}
          >
            scroll
          </span>
          <div
            style={{
              width: "1px",
              height: "36px",
              background: "linear-gradient(to bottom, rgba(240,235,224,0.25), transparent)",
              animation: "breathe 3s ease infinite",
            }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          QUOTE / PHILOSOPHY SECTION
          ═══════════════════════════════════════════ */}
      <section
        className="quote-section"
        style={{
          padding: "120px 64px",
          background: "linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-warm) 50%, var(--bg-deep) 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle radial glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "700px",
            height: "700px",
            background: "radial-gradient(circle, rgba(107,159,94,0.04) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div
          ref={r1.ref}
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Decorative botanical element */}
          <div
            style={{
              fontSize: "32px",
              marginBottom: "32px",
              opacity: r1.visible ? 0.6 : 0,
              transition: "opacity 1s ease 0.2s",
            }}
          >
            🍃
          </div>
          <p
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(24px, 3.5vw, 48px)",
              fontStyle: "italic",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.35,
              color: "rgba(240,235,224,0.55)",
            }}
          >
            <WordReveal
              text="most people walk through a forest and see trees."
              visible={r1.visible}
              serif
              delay={0}
            />{" "}
            <span style={{ color: "var(--green-mist)" }}>
              <WordReveal
                text="otu walks through and sees everything else."
                visible={r1.visible}
                serif
                delay={0.4}
              />
            </span>
          </p>
          {/* Decorative line */}
          <div
            style={{
              width: "60px",
              height: "2px",
              background: "linear-gradient(to right, transparent, var(--green-mid), transparent)",
              margin: "40px auto 0",
              opacity: r1.visible ? 0.5 : 0,
              transition: "opacity 1s ease 1s",
            }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FEATURES SECTION
          ═══════════════════════════════════════════ */}
      <section
        id="features"
        className="section-pad"
        style={{
          padding: "120px 64px",
          background: "var(--bg-deep)",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* Section header */}
          <div
            ref={r2.ref}
            style={{
              marginBottom: "72px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                background: "rgba(107,159,94,0.08)",
                borderRadius: "var(--radius-full)",
                marginBottom: "24px",
                opacity: r2.visible ? 1 : 0,
                transition: "opacity 0.6s ease",
              }}
            >
              <span style={{ fontSize: "12px" }}>✦</span>
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--green-mist)",
                  fontWeight: 500,
                }}
              >
                what otu does
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(32px, 4vw, 56px)",
                fontWeight: 400,
                letterSpacing: "-0.03em",
                color: "var(--cream)",
                lineHeight: 1.15,
              }}
            >
              <WordReveal text="everything your plants" visible={r2.visible} serif />
              <br />
              <span style={{ color: "var(--green-mist)", fontStyle: "italic" }}>
                <WordReveal text="have been trying to tell you." visible={r2.visible} serif delay={0.25} />
              </span>
            </h2>
          </div>

          {/* Feature cards grid */}
          <div
            className="features-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "24px",
            }}
          >
            {features.map((f, i) => {
              const revealRef = [r3, r4, r5, r6][i];
              return (
                <div
                  key={f.tag}
                  ref={revealRef.ref}
                  className="feature-card"
                  style={{
                    opacity: revealRef.visible ? 1 : 0,
                    transform: revealRef.visible ? "translateY(0)" : "translateY(40px)",
                    transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
                    background: f.gradient,
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "var(--radius-md)",
                      background: "rgba(0,0,0,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "28px",
                      marginBottom: "24px",
                    }}
                  >
                    {f.icon}
                  </div>

                  {/* Tag */}
                  <div
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: f.color,
                      marginBottom: "12px",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {f.tag}
                    {i >= 2 && (
                      <span
                        style={{
                          fontSize: "9px",
                          padding: "2px 8px",
                          border: "1px solid rgba(240,235,224,0.1)",
                          borderRadius: "var(--radius-full)",
                          color: "var(--stone)",
                          fontWeight: 400,
                        }}
                      >
                        soon
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: "clamp(22px, 2.5vw, 30px)",
                      fontWeight: 400,
                      letterSpacing: "-0.02em",
                      color: "var(--cream)",
                      lineHeight: 1.2,
                      marginBottom: "14px",
                    }}
                  >
                    {f.title}
                  </h3>

                  {/* Body */}
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.8,
                      color: "var(--cream-dim)",
                      fontWeight: 300,
                      maxWidth: "380px",
                    }}
                  >
                    {f.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          IMAGE DIVIDER — BOTANICAL BREAK
          ═══════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          height: "50vh",
          minHeight: "400px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/images/cozy.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.45) saturate(1.1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, var(--bg-deep) 0%, transparent 25%, transparent 75%, var(--bg-deep) 100%)",
          }}
        />
        <div
          ref={r7.ref}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "16px",
            opacity: r7.visible ? 1 : 0,
            transition: "opacity 1.2s ease",
          }}
        >
          <p
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: "clamp(20px, 2.5vw, 34px)",
              color: "rgba(168,196,154,0.5)",
              letterSpacing: "-0.015em",
              textAlign: "center",
              maxWidth: "500px",
              lineHeight: 1.4,
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            &ldquo;nothing that grows
            <br />
            is a stranger to otu.&rdquo;
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HOW IT WORKS
          ═══════════════════════════════════════════ */}
      <section
        id="how"
        className="section-pad"
        style={{
          padding: "120px 64px",
          background: "linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-warm) 50%, var(--bg-deep) 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(200,164,90,0.04) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          {/* Section header */}
          <div ref={r8.ref} style={{ marginBottom: "80px", textAlign: "center" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                background: "rgba(200,164,90,0.08)",
                borderRadius: "var(--radius-full)",
                marginBottom: "24px",
                opacity: r8.visible ? 1 : 0,
                transition: "opacity 0.6s ease",
              }}
            >
              <span style={{ fontSize: "12px" }}>◉</span>
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--amber-light)",
                  fontWeight: 500,
                }}
              >
                how it works
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(32px, 4vw, 56px)",
                fontWeight: 400,
                letterSpacing: "-0.03em",
                color: "var(--cream)",
                lineHeight: 1.15,
              }}
            >
              <WordReveal text="three steps to knowing" visible={r8.visible} serif />
              <br />
              <span style={{ color: "var(--amber-light)", fontStyle: "italic" }}>
                <WordReveal text="every plant around you." visible={r8.visible} serif delay={0.25} />
              </span>
            </h2>
          </div>

          {/* Steps — horizontal cards */}
          <div
            className="steps-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
            }}
          >
            {steps.map((step, i) => (
              <div
                key={step.n}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid rgba(200,164,90,0.06)",
                  borderRadius: "var(--radius-lg)",
                  padding: "40px 32px",
                  position: "relative",
                  overflow: "hidden",
                  opacity: r8.visible ? 1 : 0,
                  transform: r8.visible ? "translateY(0)" : "translateY(40px)",
                  transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.15}s`,
                }}
              >
                {/* Step number */}
                <span
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: "64px",
                    fontWeight: 400,
                    color: "rgba(200,164,90,0.08)",
                    position: "absolute",
                    top: "16px",
                    right: "24px",
                    lineHeight: 1,
                  }}
                >
                  {step.n}
                </span>

                {/* Emoji */}
                <div
                  style={{
                    fontSize: "36px",
                    marginBottom: "24px",
                    filter: "grayscale(0.2)",
                  }}
                >
                  {step.emoji}
                </div>

                <h3
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: "clamp(22px, 2vw, 28px)",
                    fontWeight: 400,
                    letterSpacing: "-0.02em",
                    color: "var(--cream)",
                    marginBottom: "14px",
                    lineHeight: 1.2,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.8,
                    color: "var(--cream-dim)",
                    fontWeight: 300,
                  }}
                >
                  {step.desc}
                </p>

                {/* Connecting line to next step */}
                {i < 2 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "-14px",
                      width: "28px",
                      height: "2px",
                      background: "linear-gradient(to right, rgba(200,164,90,0.15), rgba(200,164,90,0.05))",
                      zIndex: 10,
                      display: "none", // Hidden on mobile, visible on desktop via CSS
                    }}
                    className="step-connector"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          DIVIDER IMAGE
          ═══════════════════════════════════════════ */}
      <div
        style={{
          height: "8px",
          background: "linear-gradient(90deg, transparent 0%, var(--green-dark) 50%, transparent 100%)",
          opacity: 0.2,
        }}
      />

      {/* ═══════════════════════════════════════════
          WAITLIST SECTION
          ═══════════════════════════════════════════ */}
      <section
        id="waitlist"
        style={{
          padding: "0",
          background: "var(--bg-deep)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background botanical image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/images/divider.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.15) saturate(0.7)",
            opacity: 0.5,
          }}
        />

        {/* Gradient overlays */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 70% 70%, rgba(201,106,63,0.06) 0%, transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 20% 30%, rgba(107,159,94,0.04) 0%, transparent 60%)",
          }}
        />

        <div
          className="waitlist-inner"
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            padding: "120px 64px",
            position: "relative",
            zIndex: 2,
            textAlign: "center",
          }}
        >
          {/* Decorative element */}
          <div
            style={{
              fontSize: "28px",
              marginBottom: "28px",
              opacity: 0.7,
            }}
          >
            🌿
          </div>

          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--terra-warm)",
              marginBottom: "24px",
              fontWeight: 500,
            }}
          >
            early access
          </p>

          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 400,
              letterSpacing: "-0.035em",
              color: "var(--cream)",
              lineHeight: 1.1,
              marginBottom: "20px",
            }}
          >
            be there
            <br />
            <em style={{ color: "var(--cream-dim)" }}>before it opens.</em>
          </h2>

          <p
            style={{
              fontSize: "16px",
              color: "var(--stone)",
              lineHeight: 1.8,
              marginBottom: "48px",
              fontWeight: 300,
              maxWidth: "420px",
              margin: "0 auto 48px",
            }}
          >
            join the waitlist. get early access when otu launches.
            we&apos;ll send one email — when it&apos;s ready.
          </p>

          {isConfirmed ? (
            <div
              style={{
                padding: "48px 40px",
                background: "rgba(107,159,94,0.06)",
                border: "1px solid rgba(107,159,94,0.15)",
                borderRadius: "var(--radius-lg)",
                animation: "fadeInScale 0.6s var(--ease-out) both",
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "16px" }}>
                {status === "already" ? "🌻" : "🌱"}
              </div>
              <p
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(24px, 3vw, 36px)",
                  fontWeight: 400,
                  letterSpacing: "-0.025em",
                  color: "var(--green-mist)",
                  marginBottom: "12px",
                }}
              >
                {status === "already" ? "already there." : "you're in."}
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--cream-dim)",
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
                style={{
                  display: "flex",
                  gap: "0",
                  maxWidth: "520px",
                  margin: "0 auto",
                }}
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
                    border: "1px solid rgba(168,196,154,0.12)",
                    borderRight: "none",
                    borderRadius: "var(--radius-full) 0 0 var(--radius-full)",
                    color: "var(--cream)",
                    fontSize: "14px",
                    fontFamily: "var(--sans)",
                    letterSpacing: "0.02em",
                    transition: "all 0.3s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(107,159,94,0.35)";
                    e.target.style.background = "rgba(240,235,224,0.06)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(168,196,154,0.12)";
                    e.target.style.background = "rgba(240,235,224,0.04)";
                  }}
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{
                    background:
                      status === "loading"
                        ? "rgba(107,159,94,0.3)"
                        : "linear-gradient(135deg, var(--green-mid), var(--green-dark))",
                    color: "var(--cream)",
                    padding: "18px 32px",
                    border: "none",
                    borderRadius: "0 var(--radius-full) var(--radius-full) 0",
                    fontSize: "12px",
                    fontWeight: 600,
                    fontFamily: "var(--sans)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    flexShrink: 0,
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                    transition: "all 0.3s var(--ease-out)",
                    boxShadow: "0 4px 20px rgba(74,122,74,0.2)",
                  }}
                  onMouseEnter={(e) => {
                    if (status !== "loading") {
                      e.currentTarget.style.boxShadow = "0 8px 30px rgba(74,122,74,0.35)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(74,122,74,0.2)";
                  }}
                >
                  {status === "loading" ? "..." : "join →"}
                </button>
              </div>
              {status === "error" && (
                <p
                  style={{
                    color: "var(--terra-warm)",
                    marginTop: "16px",
                    fontSize: "13px",
                    fontWeight: 400,
                  }}
                >
                  something didn&apos;t work — try again.
                </p>
              )}
            </form>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════ */}
      <footer
        style={{
          padding: "40px 64px",
          background: "var(--bg-warm)",
          borderTop: "1px solid rgba(168,196,154,0.05)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--green-dark), var(--green-mid))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              opacity: 0.5,
            }}
          >
            🌿
          </div>
          <span
            style={{
              fontFamily: "var(--serif)",
              fontSize: "18px",
              color: "rgba(240,235,224,0.25)",
              letterSpacing: "-0.02em",
            }}
          >
            otu
          </span>
        </div>
        <p
          style={{
            fontSize: "11px",
            color: "rgba(240,235,224,0.15)",
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
