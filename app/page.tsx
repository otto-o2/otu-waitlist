"use client";

import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════
   UTILITY HOOKS
   ═══════════════════════════════════════════════ */

function useReveal(threshold = 0.1) {
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
        <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.24em" }}>
          <span
            style={{
              display: "inline-block",
              transform: visible ? "translateY(0)" : "translateY(110%)",
              opacity: visible ? 1 : 0,
              transition: `transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay + i * 0.05}s, opacity 0.5s ease ${delay + i * 0.05}s`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

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
        animation: `leafDrift ${15 + Math.random() * 10}s ${delay}s linear infinite`,
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2C6.5 2 2 8 2 14c0 2.5 1 4.5 2.5 6 1.5-1.5 3-3 5.5-4 2.5-1 5-1.5 6-1.5-1-4-3-8-4-12.5z"
          fill="var(--green-leaf)"
          opacity="0.3"
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
  const [activeTab, setActiveTab] = useState(0);

  const rHero = useReveal(0);
  const rPhilosophy = useReveal(0.2);
  const rFeatures = useReveal(0.1);
  const rWaitlist = useReveal(0.1);

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    setHeroLoaded(true);
    return () => window.removeEventListener("scroll", handleScroll);
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
      if (data.success && data.alreadySignedUp) setStatus("already");
      else if (data.success) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const sections = [
    {
      id: "ward",
      title: "Ward Mode",
      subtitle: "Complete care intelligence",
      description: "Point your camera at any plant. otu builds a complete care profile — watering schedule, light, soil, stress flags, and common problems. Your plant finally has a voice.",
      emoji: "🛡️",
      color: "var(--green-mid)"
    },
    {
      id: "wild",
      title: "Wild Mode",
      subtitle: "Identify anything instantly",
      description: "Out in the world and something catches your eye? Identify any plant in seconds. Its name, its story, its origin, and its hidden uses. Curiosity satisfied, immediately.",
      emoji: "🌿",
      color: "var(--amber)"
    },
    {
      id: "market",
      title: "Market",
      subtitle: "Every plant. Delivered.",
      description: "A curated marketplace for plants, pots, soil, and everything your collection deserves. Browse, discover, and acquire. Currently growing in the background.",
      emoji: "🛒",
      color: "var(--terra)"
    },
    {
      id: "archive",
      title: "Encyclopedia",
      subtitle: "The full botanical archive",
      description: "Every plant. Every fact. A complete botanical encyclopedia built into the app — so when your monstera looks wrong at 2am, you have answers.",
      emoji: "📖",
      color: "var(--stone)"
    }
  ];

  const isConfirmed = status === "success" || status === "already";

  return (
    <>
      {/* ── NAVIGATION ── */}
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          padding: navScrolled ? "14px 40px" : "24px 40px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: navScrolled ? "rgba(253, 253, 251, 0.8)" : "transparent",
          backdropFilter: navScrolled ? "blur(12px)" : "none",
          borderBottom: navScrolled ? "1px solid var(--border)" : "1px solid transparent",
          transition: "all 0.5s var(--ease-out)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "22px" }}>🌿</span>
          <span style={{ fontFamily: "var(--serif)", fontSize: "24px", letterSpacing: "-0.01em" }}>otu</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <a href="#how" style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-secondary)" }}>How it works</a>
          <a href="#waitlist" className="btn-primary" style={{ padding: "10px 24px" }}>Join the list</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "95vh", display: "flex", alignItems: "center", overflow: "hidden", background: "var(--bg-soft)" }}>
        <div 
          style={{ 
            position: "absolute", inset: 0, 
            backgroundImage: "url(/images/hero_4k.png)", 
            backgroundSize: "cover", backgroundPosition: "center",
            filter: "brightness(1.05) saturate(1.1)",
            zIndex: 0
          }} 
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(253,253,251,0.95) 20%, rgba(253,253,251,0.2) 100%)", zIndex: 1 }} />
        
        {/* Floating Leaves */}
        <FloatingLeaf delay={0} left="15%" size={20} />
        <FloatingLeaf delay={4} left="40%" size={14} />
        <FloatingLeaf delay={8} left="70%" size={22} />

        <div style={{ position: "relative", zIndex: 10, padding: "0 80px", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
          <div style={{ maxWidth: "600px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--green-pale)", padding: "6px 16px", borderRadius: "100px", marginBottom: "32px", border: "1px solid var(--green-mist)" }}>
              <span style={{ fontSize: "14px" }}>✨</span>
              <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--green-dark)" }}>Redesigned for light</span>
            </div>
            
            <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(48px, 8vw, 100px)", lineHeight: 1, letterSpacing: "-0.04em", color: "var(--text-primary)", marginBottom: "32px" }}>
              The world grows<br />around you.<br />
              <span style={{ color: "var(--green-mid)", fontStyle: "italic" }}>otu sees it all.</span>
            </h1>
            
            <p style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "48px", maxWidth: "480px" }}>
              Identify any plant with 4K clarity. Receive detailed care intelligence. Build your botanical archive.
            </p>
            
            <div style={{ display: "flex", gap: "20px" }}>
              <a href="#waitlist" className="btn-primary" style={{ padding: "18px 40px", fontSize: "15px" }}>Get early access</a>
              <a href="#how" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "15px", fontWeight: 500, color: "var(--text-primary)" }}>
                Watch the story <span style={{ fontSize: "20px" }}>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Fade */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "120px", background: "linear-gradient(to top, var(--bg-main), transparent)", zIndex: 5 }} />
      </section>

      {/* ── PHILOSOPHY ── */}
      <section ref={rPhilosophy.ref} style={{ padding: "140px 80px", background: "var(--bg-main)", textAlign: "center", position: "relative" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--serif)", fontSize: "clamp(24px, 4vw, 44px)", lineHeight: 1.4, color: "var(--text-secondary)", fontStyle: "italic" }}>
            <WordReveal text="Most people walk through a forest and see trees." visible={rPhilosophy.visible} serif />{" "}
            <span style={{ color: "var(--green-mid)" }}>
              <WordReveal text="otu walks through and sees everything else." visible={rPhilosophy.visible} serif delay={0.4} />
            </span>
          </p>
        </div>
      </section>

      {/* ── FRAMER STYLE TABS SECTION ── */}
      <section id="how" style={{ padding: "120px 80px", background: "var(--bg-soft)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "80px", textAlign: "left" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--green-mid)" }}>Intelligence</span>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(36px, 5vw, 64px)", color: "var(--text-primary)", marginTop: "12px" }}>The full botanical suite.</h2>
          </div>

          <div style={{ display: "flex", gap: "64px", alignItems: "flex-start" }} className="split-section">
            {/* Left side: Tabs */}
            <div style={{ width: "380px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {sections.map((s, i) => (
                <div 
                  key={s.id} 
                  className={`tab-btn ${activeTab === i ? "active" : ""}`}
                  onClick={() => setActiveTab(i)}
                  onMouseEnter={() => setActiveTab(i)}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "20px", opacity: activeTab === i ? 1 : 0.6 }}>{s.emoji}</span>
                    <span style={{ fontWeight: 600, fontSize: "16px", color: activeTab === i ? "var(--text-primary)" : "var(--text-muted)" }}>{s.title}</span>
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--text-muted)", marginLeft: "32px", opacity: activeTab === i ? 1 : 0.7, lineHeight: 1.4 }}>
                    {s.subtitle}
                  </p>
                </div>
              ))}
            </div>

            {/* Right side: Content Card (Framer Style) */}
            <div style={{ flex: 1 }}>
              <div className="card-stack" style={{ position: "relative", minHeight: "560px", display: "flex", flexDirection: "column" }}>
                <div style={{ 
                  position: "absolute", inset: 0, 
                  background: activeTab === 0 ? "linear-gradient(135deg, #fdfdfb, #ecf1e9)" : 
                              activeTab === 1 ? "linear-gradient(135deg, #fcfaf5, #f5f0e0)" :
                              activeTab === 2 ? "linear-gradient(135deg, #fdfdfb, #f5e9e2)" :
                              "linear-gradient(135deg, #fdfdfb, #f2f2f2)",
                  opacity: 0.4,
                  transition: "background 0.5s ease"
                }} />
                
                <div style={{ position: "relative", zIndex: 1, padding: "60px", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontSize: "64px", display: "block", marginBottom: "32px", transform: "scale(1.2)", transformOrigin: "left" }}>
                      {sections[activeTab].emoji}
                    </span>
                    <h3 style={{ fontFamily: "var(--serif)", fontSize: "40px", color: "var(--text-primary)", marginBottom: "20px" }}>
                      {sections[activeTab].title}
                    </h3>
                    <p style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: "500px" }}>
                      {sections[activeTab].description}
                    </p>
                  </div>

                  <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "12px", borderTop: "1px solid var(--border)", paddingTop: "40px" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: sections[activeTab].color }} />
                    <span style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)" }}>
                      Part of the core otu engine
                    </span>
                  </div>
                </div>

                {/* Decorative 4K Background Element */}
                <div style={{ 
                  position: "absolute", right: "-100px", bottom: "-50px", 
                  width: "400px", height: "400px", 
                  backgroundImage: "url(/images/hero_4k.png)", backgroundSize: "cover", opacity: 0.08,
                  maskImage: "radial-gradient(circle, black, transparent)",
                  WebkitMaskImage: "radial-gradient(circle, black, transparent)",
                  filter: "grayscale(1) contrast(1.2)"
                }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WAITLIST ── */}
      <section id="waitlist" style={{ padding: "140px 80px", background: "var(--bg-main)", position: "relative" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ marginBottom: "48px" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--terra)" }}>Waitlist</span>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(40px, 6vw, 80px)", color: "var(--text-primary)", marginTop: "16px", marginBottom: "24px" }}>
              Be there before it opens.
            </h2>
            <p style={{ fontSize: "17px", color: "var(--text-muted)", lineHeight: 1.7 }}>
              Join the list for early access to the 4K botanical encyclopedia. 
              We&apos;ll send one email when it&apos;s ready. No spam, ever.
            </p>
          </div>

          {isConfirmed ? (
            <div style={{ padding: "48px", background: "var(--bg-soft)", border: "1px solid var(--border)", borderRadius: "var(--radius-xl)" }}>
              <span style={{ fontSize: "40px" }}>🌱</span>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: "28px", marginTop: "16px", marginBottom: "8px" }}>
                {status === "already" ? "You're already on the list" : "You're in."}
              </h3>
              <p style={{ color: "var(--text-muted)" }}>We&apos;ll reach out soon. In the meantime, look closely at your plants.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "0 auto" }}>
              <div style={{ display: "flex", gap: "10px" }} className="form-row">
                <input
                  type="email"
                  placeholder="name@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1, padding: "18px 24px", borderRadius: "100px",
                    border: "1px solid var(--border)", background: "#fff",
                    fontSize: "15px", transition: "all 0.3s"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "var(--green-mid)"}
                />
                <button type="submit" disabled={status === "loading"} className="btn-primary" style={{ padding: "0 40px" }}>
                  {status === "loading" ? "..." : "Join →"}
                </button>
              </div>
              {status === "error" && <p style={{ color: "var(--terra)", marginTop: "12px", fontSize: "13px" }}>Something went wrong. Try again.</p>}
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: "80px", background: "var(--bg-soft)", textAlign: "center", borderTop: "1px solid var(--border)" }}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "20px", color: "var(--text-muted)", marginBottom: "12px" }}>otu</p>
        <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--stone)" }}>
          Made with care for growing things.
        </p>
      </footer>
    </>
  );
}
