"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(
  () => import("@/components/appetite/HeroCanvas").then(m => m.HeroCanvas),
  { ssr: false }
);

/* ─── Scroll reveal ─────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-scale, .reveal-blur");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const delay = el.dataset.delay || "0";
            setTimeout(() => el.classList.add("visible"), Number(delay));
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── Header scroll effect ──────────────────────────────── */
function useHeaderScroll() {
  useEffect(() => {
    const header = document.getElementById("site-header");
    if (!header) return;
    const handler = () => {
      if (window.scrollY > 40) {
        header.style.backdropFilter = "blur(32px) saturate(200%) brightness(0.88)";
        (header.style as CSSStyleDeclaration & { webkitBackdropFilter: string }).webkitBackdropFilter = "blur(32px) saturate(200%) brightness(0.88)";
        header.style.background = "linear-gradient(180deg,hsl(220,12%,4%,.9) 0%,hsl(220,10%,6%,.75) 100%)";
        header.style.borderBottom = "1px solid hsl(220,7%,16%,.8)";
      } else {
        header.style.backdropFilter = "";
        (header.style as CSSStyleDeclaration & { webkitBackdropFilter: string }).webkitBackdropFilter = "";
        header.style.background = "";
        header.style.borderBottom = "";
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
}

/* ─── Count-up animation ─────────────────────────────────── */
function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ─── Stats count-up component ───────────────────────────── */
function StatNumber({ value, suffix, color }: { value: string; suffix?: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const numMatch = value.match(/[\d.]+/);
  const numVal = numMatch ? parseFloat(numMatch[0]) : 0;
  const isFloat = value.includes(".");
  const count = useCountUp(numVal, 1800, started);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const prefix = value.match(/^[^0-9]*/)?.[0] || "";
  const postfix = value.match(/[^0-9.]+$/)?.[0] || suffix || "";

  return (
    <div ref={ref} style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "clamp(2.5rem,4vw,4rem)", letterSpacing: "-.06em", color, lineHeight: 1, marginBottom: 8 }}>
      {prefix}{isFloat ? (count / 10).toFixed(1) : count}{postfix}
    </div>
  );
}

/* ─── Inline keyframes ──────────────────────────────────── */
const KEYFRAMES = `
  @keyframes borderRun { 0%{background-position:0% 0%} 100%{background-position:200% 0%} }
  @keyframes goldShimmer { 0%{background-position:100% 0} 50%{background-position:0% 0} 100%{background-position:100% 0} }
  @keyframes orbFloat1 { 0%,100%{transform:translate(0,0) scale(1);opacity:.35} 33%{transform:translate(60px,-80px) scale(1.15);opacity:.6} 66%{transform:translate(-40px,40px) scale(.88);opacity:.25} }
  @keyframes orbFloat2 { 0%,100%{transform:translate(0,0) scale(1);opacity:.25} 25%{transform:translate(-70px,60px) scale(1.2);opacity:.5} 75%{transform:translate(50px,-50px) scale(.85);opacity:.15} }
  @keyframes marqueeScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes marqueeScrollReverse { from{transform:translateX(-50%)} to{transform:translateX(0)} }
  @keyframes pulseGlow { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.12)} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pricingPulse {
    0%,100%{box-shadow:0 0 0 1px hsl(36,28%,92%,.18),0 40px 80px -24px rgba(0,0,0,.7)}
    50%{box-shadow:0 0 0 1px hsl(36,28%,92%,.42),0 40px 80px -24px rgba(0,0,0,.7),0 0 80px hsl(36,28%,92%,.05)}
  }
  @keyframes shimmerCard { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes kineticWord {
    0%,18%  {transform:translateY(0);opacity:1}
    22%,96% {transform:translateY(-120%);opacity:0}
    100%    {transform:translateY(0);opacity:1}
  }
  @keyframes kineticWord2 {
    0%,18%  {transform:translateY(120%);opacity:0}
    22%,68% {transform:translateY(0);opacity:1}
    72%,96% {transform:translateY(-120%);opacity:0}
    100%    {transform:translateY(120%);opacity:0}
  }
  @keyframes kineticWord3 {
    0%,68%  {transform:translateY(120%);opacity:0}
    72%,96% {transform:translateY(0);opacity:1}
    100%    {transform:translateY(0);opacity:1}
  }
  @keyframes scrollIndicator { 0%{transform:translateY(0);opacity:1} 100%{transform:translateY(18px);opacity:0} }
  @keyframes stepProgress { from{height:0} to{height:100%} }
  .fade-a{animation:fadeUp 1s cubic-bezier(.16,1,.3,1) both}
  .fade-b{animation:fadeUp 1s cubic-bezier(.16,1,.3,1) .12s both}
  .fade-c{animation:fadeUp 1s cubic-bezier(.16,1,.3,1) .24s both}
  .fade-d{animation:fadeUp 1s cubic-bezier(.16,1,.3,1) .36s both}
  .kinetic-a{position:absolute;inset:0;display:flex;align-items:flex-start;overflow:hidden}
  .kinetic-a>span{display:block;animation:kineticWord 9s cubic-bezier(.76,0,.24,1) infinite}
  .kinetic-b{position:absolute;inset:0;display:flex;align-items:flex-start;overflow:hidden}
  .kinetic-b>span{display:block;animation:kineticWord2 9s cubic-bezier(.76,0,.24,1) infinite}
  .kinetic-c{position:absolute;inset:0;display:flex;align-items:flex-start;overflow:hidden}
  .kinetic-c>span{display:block;animation:kineticWord3 9s cubic-bezier(.76,0,.24,1) infinite}
  @media (max-width:900px){
    .hero-cols{flex-direction:column !important}
    .hero-text{max-width:100% !important;padding-left:0 !important}
    .hero-3d{max-width:100% !important}
    .features-grid{grid-template-columns:1fr !important}
    .gallery-grid{grid-template-columns:repeat(2,1fr) !important}
    .pricing-grid{grid-template-columns:1fr !important}
    .stats-grid{grid-template-columns:repeat(2,1fr) !important}
    .footer-links{grid-template-columns:repeat(2,1fr) !important}
    .steps-layout{flex-direction:column !important}
    .steps-sticky{position:relative !important;top:auto !important;width:100% !important}
  }
  @media (max-width:600px){
    .gallery-grid{grid-template-columns:1fr !important}
    .stats-grid{grid-template-columns:1fr !important}
    .footer-links{grid-template-columns:1fr !important}
  }
  @media (prefers-reduced-motion:reduce){
    *{animation:none !important;transition-duration:.01ms !important}
  }
`;

/* ─── Grain overlay ─────────────────────────────────────── */
const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/* ─── SVG Icons ─────────────────────────────────────────── */
const IconArrow = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const IconCheck = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="hsl(158,28%,48%)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconScan = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/>
    <path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
  </svg>
);
const IconCube = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
  </svg>
);
const IconBar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/>
  </svg>
);

/* ─── Sparkline SVG ──────────────────────────────────────── */
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 80; const h = 28;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min + 0.001)) * h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <polyline points={pts} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
    </svg>
  );
}

const MODELS = [
  { url: "/models/hero-dish.glb", label: "פסטה שף" },
  { url: "/models/pizza.glb",     label: "פיצה" },
  { url: "/models/tuna.glb",      label: "טונה" },
];

export default function HomePage() {
  useReveal();
  useHeaderScroll();
  const [modelIdx, setModelIdx] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const stepsRef = useRef<HTMLDivElement>(null);
  const prev = () => setModelIdx(i => (i - 1 + MODELS.length) % MODELS.length);
  const next = () => setModelIdx(i => (i + 1) % MODELS.length);

  /* Steps scroll tracking */
  useEffect(() => {
    const el = stepsRef.current;
    if (!el) return;
    const items = el.querySelectorAll("[data-step]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.step);
            setActiveStep(idx);
          }
        });
      },
      { threshold: 0.5 }
    );
    items.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: "hsl(var(--void))", color: "hsl(var(--cream))", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{KEYFRAMES}</style>

      {/* Grain */}
      <div aria-hidden style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, opacity: 0.022, mixBlendMode: "screen", backgroundImage: GRAIN_SVG, backgroundSize: "256px" }} />

      {/* ═══ HEADER ═══ */}
      <header id="site-header" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, transition: "background .4s,border-color .4s" }}>
        <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,hsl(36,28%,92%,.45),hsl(158,28%,48%,.25),hsl(36,28%,92%,.45),transparent)", backgroundSize: "200% 100%", animation: "borderRun 5s linear infinite" }} />
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 56px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", direction: "rtl" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", flexShrink: 0 }}>
            <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,hsl(36,28%,92%,.12),hsl(36,28%,92%,.04))", border: "1px solid hsl(36,28%,92%,.35)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 1px 0 hsl(36,28%,92%,.18),0 4px 20px hsl(36,28%,92%,.12)" }}>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.2rem", color: "hsl(var(--gold))", fontStyle: "italic", lineHeight: 1, marginTop: 1 }}>פ</span>
            </div>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.35rem", fontWeight: 300, letterSpacing: "-.025em", color: "hsl(var(--cream))" }}>פלטפורמה</span>
          </Link>
          <nav style={{ display: "flex", gap: 40, alignItems: "center" }}>
            {[["#features","תכונות"],["#gallery","גלריה"],["#pricing","מחירים"]].map(([href,label]) => (
              <a key={href} href={href} className="eyebrow hover-underline" style={{ textDecoration: "none", transition: "color .2s", fontSize: ".75rem" }}>{label}</a>
            ))}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Link href="/login" className="eyebrow hover-underline" style={{ textDecoration: "none", fontSize: ".75rem" }}>כניסה</Link>
            <Link href="/signup" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "10px 24px",
              background: "hsl(var(--gold))",
              color: "hsl(var(--void))",
              fontFamily: "'DM Mono',monospace",
              fontSize: ".6875rem", fontWeight: 500,
              letterSpacing: ".14em", textTransform: "uppercase",
              borderRadius: "var(--radius)",
              textDecoration: "none",
              transition: "background .2s,transform .2s,box-shadow .2s",
            }}
              onMouseOver={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "hsl(28 90% 58%)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 32px hsl(28 88% 48% / .4)";
              }}
              onMouseOut={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "hsl(var(--gold))";
                (e.currentTarget as HTMLAnchorElement).style.transform = "";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "";
              }}
            >
              התחל <IconArrow />
            </Link>
          </div>
        </div>
      </header>

      {/* ═══ HERO ═══ */}
      <section style={{ paddingTop: 140, paddingBottom: 100, position: "relative", overflow: "hidden", minHeight: "100vh", display: "flex", alignItems: "center" }}>
        {/* Ambient orbs */}
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "8%", left: "2%", width: 800, height: 800, background: "radial-gradient(circle,hsl(36,28%,92%,.07) 0%,transparent 60%)", filter: "blur(90px)", animation: "orbFloat1 20s ease-in-out infinite" }} />
          <div style={{ position: "absolute", top: "40%", right: 0, width: 700, height: 700, background: "radial-gradient(circle,hsl(158,28%,48%,.05) 0%,transparent 60%)", filter: "blur(90px)", animation: "orbFloat2 28s ease-in-out infinite" }} />
          <div style={{ position: "absolute", bottom: 0, left: "40%", width: 600, height: 400, background: "radial-gradient(circle,hsl(36,28%,92%,.04) 0%,transparent 65%)", filter: "blur(80px)", animation: "orbFloat1 35s ease-in-out 5s infinite" }} />
        </div>
        {/* Grid */}
        <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(hsl(220,7%,16%,.4) 1px,transparent 1px),linear-gradient(90deg,hsl(220,7%,16%,.4) 1px,transparent 1px)", backgroundSize: "80px 80px", opacity: .15, maskImage: "radial-gradient(ellipse 85% 60% at 50% 0%,black 10%,transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 85% 60% at 50% 0%,black 10%,transparent 100%)" }} />
        {/* Top line */}
        <div aria-hidden style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 1200, height: 1, background: "linear-gradient(90deg,transparent,hsl(36,28%,92%,.2),hsl(158,28%,48%,.12),hsl(36,28%,92%,.2),transparent)" }} />

        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 56px", width: "100%", position: "relative", zIndex: 3, display: "flex", alignItems: "center", direction: "rtl" }} className="hero-cols">
          {/* Text */}
          <div style={{ flex: "0 0 50%", maxWidth: "50%", paddingLeft: 48 }} className="hero-text">
            {/* Eyebrow pill */}
            <div className="fade-a liquid-glass" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 44, padding: "9px 22px", borderRadius: 99 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "hsl(var(--sage))", boxShadow: "0 0 14px hsl(158,28%,48%,.9)", flexShrink: 0, animation: "pulseGlow 2.5s ease-in-out infinite" }} />
              <span className="eyebrow-gold" style={{ fontSize: ".6875rem" }}>תפריטים תלת-מימד · AR · VR — מסעדות כוכב מישלן</span>
            </div>

            {/* Kinetic headline */}
            <div className="fade-b" style={{ marginBottom: 36 }}>
              <h1 style={{ fontFamily: "'Noto Serif Hebrew',serif", fontWeight: 300, fontSize: "clamp(56px,5.5vw,108px)", lineHeight: .86, letterSpacing: "-.04em", margin: 0 }}>
                <span style={{ display: "block", color: "hsl(var(--cream))", marginBottom: 4 }}>הטלפון</span>
                {/* Kinetic cycling word */}
                <span style={{ display: "block", position: "relative", height: "1.05em", overflow: "hidden", marginBottom: 4 }}>
                  <span className="kinetic-a">
                    <span style={{ background: "linear-gradient(135deg,hsl(24,80%,32%) 0%,hsl(36,28%,92%) 28%,hsl(28,95%,72%) 50%,hsl(36,28%,92%) 72%,hsl(24,80%,32%) 100%)", backgroundSize: "220% 100%", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", fontStyle: "italic", animation: "goldShimmer 3.5s ease-in-out infinite,kineticWord 9s cubic-bezier(.76,0,.24,1) infinite" }}>הופך</span>
                  </span>
                  <span className="kinetic-b">
                    <span style={{ background: "linear-gradient(135deg,hsl(158,28%,48%) 0%,hsl(36,28%,92%) 60%,hsl(158,28%,48%) 100%)", backgroundSize: "220% 100%", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", fontStyle: "italic" }}>סורק</span>
                  </span>
                  <span className="kinetic-c">
                    <span style={{ color: "hsl(36,28%,92%,.4)", fontStyle: "italic" }}>חושף</span>
                  </span>
                </span>
                <span style={{ display: "block", color: "hsl(36,28%,92%,.3)" }}>לצלחת</span>
              </h1>
            </div>

            <p className="fade-c" style={{ fontSize: "1.125rem", lineHeight: 1.8, color: "hsl(var(--subtle))", maxWidth: 420, marginBottom: 56 }}>
              הלקוח סורק. המנה מופיעה בתלת-מימד על השולחן.<br />זה לא תפריט — זו חוויה גסטרונומית דיגיטלית.
            </p>

            <div className="fade-c" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 56 }}>
              <Link href="/signup" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 32px",
                background: "hsl(var(--gold))",
                color: "hsl(var(--void))",
                fontFamily: "'DM Mono',monospace",
                fontSize: ".75rem", fontWeight: 500,
                letterSpacing: ".14em", textTransform: "uppercase",
                borderRadius: "var(--radius)",
                textDecoration: "none",
                transition: "background .2s,transform .2s,box-shadow .2s",
              }}
                onMouseOver={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "hsl(28 90% 58%)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 12px 40px hsl(28 88% 48% / .5)";
                }}
                onMouseOut={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "hsl(var(--gold))";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "";
                }}
              >התחל בחינם <IconArrow /></Link>
              <a href="#features" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 32px",
                background: "transparent",
                color: "hsl(var(--pale))",
                fontFamily: "'DM Mono',monospace",
                fontSize: ".75rem", fontWeight: 400,
                letterSpacing: ".14em", textTransform: "uppercase",
                border: "1px solid hsl(var(--line))",
                borderRadius: "var(--radius)",
                textDecoration: "none",
                transition: "border-color .2s,color .2s,background .2s",
              }}
                onMouseOver={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "hsl(158,28%,48%,.6)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "hsl(var(--sage))";
                  (e.currentTarget as HTMLAnchorElement).style.background = "hsl(158,28%,48%,.06)";
                }}
                onMouseOut={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "hsl(var(--line))";
                  (e.currentTarget as HTMLAnchorElement).style.color = "hsl(var(--pale))";
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }}
              >ראה הדגמה</a>
            </div>

            {/* Trust pills */}
            <div className="fade-d" style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
              {["הגדרה תוך 5 דקות", "ללא אפליקציה", "iOS ו-Android AR"].map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 20, height: 20, borderRadius: "50%", background: "hsl(158,28%,48%,.1)", border: "1px solid hsl(158,28%,48%,.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><IconCheck /></span>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".6875rem", letterSpacing: ".08em", color: "hsl(var(--subtle))" }}>{t}</span>
                </div>
              ))}
            </div>

            {/* Scroll indicator */}
            <div className="fade-d" style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 48 }}>
              <div style={{ width: 24, height: 40, border: "1px solid hsl(36,28%,92%,.2)", borderRadius: 99, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "6px 0" }}>
                <div style={{ width: 3, height: 10, background: "hsl(36,28%,92%,.6)", borderRadius: 99, animation: "scrollIndicator 1.6s ease-in-out infinite" }} />
              </div>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".5875rem", letterSpacing: ".14em", color: "hsl(var(--dim))", textTransform: "uppercase" }}>גלול למטה</span>
            </div>
          </div>

          {/* 3D viewer — carousel */}
          <div style={{ flex: "0 0 50%", maxWidth: "50%", position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }} className="hero-3d">
            <div className="fade-b" style={{ width: "100%", position: "relative" }}>
              <HeroCanvas modelUrl={MODELS[modelIdx].url} />

              {/* Arrow left */}
              <button onClick={prev} aria-label="מודל קודם" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", zIndex: 10, width: 44, height: 44, borderRadius: "50%", background: "hsl(220,10%,6%,.85)", border: "1px solid hsl(36,28%,92%,.18)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "border-color .2s,background .2s,box-shadow .2s" }}
                onMouseOver={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = "hsl(36,28%,92%,.5)"; b.style.background = "hsl(220,10%,10%,.95)"; b.style.boxShadow = "0 0 20px hsl(36,28%,92%,.1)"; }}
                onMouseOut={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = "hsl(36,28%,92%,.18)"; b.style.background = "hsl(220,10%,6%,.85)"; b.style.boxShadow = ""; }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="hsl(36,28%,92%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>

              {/* Arrow right */}
              <button onClick={next} aria-label="מודל הבא" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", zIndex: 10, width: 44, height: 44, borderRadius: "50%", background: "hsl(220,10%,6%,.85)", border: "1px solid hsl(36,28%,92%,.18)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "border-color .2s,background .2s,box-shadow .2s" }}
                onMouseOver={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = "hsl(36,28%,92%,.5)"; b.style.background = "hsl(220,10%,10%,.95)"; b.style.boxShadow = "0 0 20px hsl(36,28%,92%,.1)"; }}
                onMouseOut={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = "hsl(36,28%,92%,.18)"; b.style.background = "hsl(220,10%,6%,.85)"; b.style.boxShadow = ""; }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="hsl(36,28%,92%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>

              {/* Dots */}
              <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 10 }}>
                {MODELS.map((_, i) => (
                  <button key={i} onClick={() => setModelIdx(i)} aria-label={`מודל ${i + 1}`} style={{ width: i === modelIdx ? 22 : 7, height: 7, borderRadius: 99, background: i === modelIdx ? "hsl(36,28%,92%)" : "hsl(36,28%,92%,.3)", border: "none", cursor: "pointer", transition: "all .3s cubic-bezier(.16,1,.3,1)", padding: 0 }} />
                ))}
              </div>
            </div>

            {/* Label */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 20px", background: "hsl(220,10%,6%,.9)", border: "1px solid hsl(36,28%,92%,.15)", borderRadius: 99, backdropFilter: "blur(16px)" }}>
                <span style={{ fontFamily: "'Noto Serif Hebrew',serif", fontSize: ".9rem", color: "hsl(var(--cream))", fontStyle: "italic" }}>{MODELS[modelIdx].label}</span>
                <span style={{ width: 1, height: 13, background: "hsl(36,28%,92%,.2)" }} />
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "hsl(var(--gold))", boxShadow: "0 0 8px hsl(36,28%,92%,.8)", flexShrink: 0 }} />
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".625rem", letterSpacing: ".14em", color: "hsl(var(--subtle))", textTransform: "uppercase" }}>גרור לסיבוב</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LARGE MARQUEE BACKGROUND ═══ */}
      <div style={{ position: "relative", overflow: "hidden", background: "hsl(var(--void))", borderTop: "1px solid hsl(var(--line))", borderBottom: "1px solid hsl(var(--line))", padding: "0" }}>
        {/* Large background text — line 1 (slow, RTL direction) */}
        <div style={{ overflow: "hidden", pointerEvents: "none", userSelect: "none", lineHeight: 0.85, marginBottom: -8 }}>
          <div style={{ display: "flex", width: "max-content", animation: "marqueeScroll 80s linear infinite", willChange: "transform" }}>
            {[...Array(4)].map((_, i) => (
              <span key={i} style={{ display: "block", fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "clamp(8rem,14vw,18rem)", letterSpacing: "-.04em", color: "transparent", WebkitTextStroke: "1px hsl(36,28%,92%,.06)", whiteSpace: "nowrap", paddingLeft: "2vw" }}>
                מסעדה · תפריט · חוויה ·
              </span>
            ))}
          </div>
        </div>
        {/* Line 2 (faster, opposite direction) */}
        <div style={{ overflow: "hidden", pointerEvents: "none", userSelect: "none", lineHeight: 0.85, marginBottom: -8 }}>
          <div style={{ display: "flex", width: "max-content", animation: "marqueeScrollReverse 55s linear infinite", willChange: "transform" }}>
            {[...Array(4)].map((_, i) => (
              <span key={i} style={{ display: "block", fontFamily: "'Noto Serif Hebrew',serif", fontWeight: 200, fontSize: "clamp(6rem,11vw,15rem)", letterSpacing: "-.02em", color: "transparent", WebkitTextStroke: "1px hsl(158,28%,48%,.05)", whiteSpace: "nowrap", paddingLeft: "2vw" }}>
                3D · AR · VR · סריקה · טכנולוגיה ·
              </span>
            ))}
          </div>
        </div>
        {/* Foreground marquee — actual content */}
        <div style={{ overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg,transparent,black 10%,black 90%,transparent)", maskImage: "linear-gradient(90deg,transparent,black 10%,black 90%,transparent)", padding: "20px 0", position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", width: "max-content", animation: "marqueeScroll 55s linear infinite" }}>
            {[...Array(2)].flatMap((_, k) => [
              <span key={`a1-${k}`} style={{ display: "inline-flex", alignItems: "center", gap: 24, paddingLeft: 24, fontFamily: "'Noto Serif Hebrew',serif", fontSize: "1.45rem", fontWeight: 300, fontStyle: "italic", color: "hsl(var(--cream))", whiteSpace: "nowrap" }}>בשר וגריל<span style={{ color: "hsl(var(--line))" }}>·</span></span>,
              <span key={`a2-${k}`} style={{ display: "inline-flex", alignItems: "center", gap: 24, paddingLeft: 24, fontFamily: "'DM Mono',monospace", fontSize: ".75rem", letterSpacing: ".16em", textTransform: "uppercase", color: "hsl(var(--gold))", whiteSpace: "nowrap" }}>3D · AR · VR<span style={{ color: "hsl(var(--line))" }}>·</span></span>,
              <span key={`a3-${k}`} style={{ display: "inline-flex", alignItems: "center", gap: 24, paddingLeft: 24, fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", color: "hsl(var(--pale))", whiteSpace: "nowrap" }}>תפריט דיגיטלי<span style={{ color: "hsl(var(--line))" }}>·</span></span>,
              <span key={`a4-${k}`} style={{ display: "inline-flex", alignItems: "center", gap: 24, paddingLeft: 24, fontFamily: "'DM Mono',monospace", fontSize: ".75rem", letterSpacing: ".16em", textTransform: "uppercase", color: "hsl(var(--dim))", whiteSpace: "nowrap" }}>QR חי<span style={{ color: "hsl(var(--line))" }}>·</span></span>,
              <span key={`a5-${k}`} style={{ display: "inline-flex", alignItems: "center", gap: 24, paddingLeft: 24, fontFamily: "'Noto Serif Hebrew',serif", fontSize: "1.45rem", fontWeight: 300, color: "hsl(var(--fog))", whiteSpace: "nowrap" }}>מנות ים<span style={{ color: "hsl(var(--line))" }}>·</span></span>,
              <span key={`a6-${k}`} style={{ display: "inline-flex", alignItems: "center", gap: 24, paddingLeft: 24, fontFamily: "'DM Mono',monospace", fontSize: ".75rem", letterSpacing: ".16em", textTransform: "uppercase", color: "hsl(var(--gold))", whiteSpace: "nowrap" }}>תל אביב · פריז<span style={{ color: "hsl(var(--line))" }}>·</span></span>,
            ])}
          </div>
        </div>
      </div>

      {/* ═══ STATS ═══ */}
      <section style={{ padding: "100px 0", background: "hsl(var(--void))", position: "relative" }}>
        <div aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 1000, height: 300, background: "radial-gradient(ellipse,hsl(36,28%,92%,.035) 0%,transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 56px", direction: "rtl" }}>
          {/* Section eyebrow */}
          <div className="reveal" style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 60 }}>
            <span className="eyebrow" style={{ fontSize: ".75rem" }}>מספרים</span>
            <div style={{ flex: 1, maxWidth: 64, height: 1, background: "hsl(var(--line))" }} />
          </div>
          <div style={{ display: "grid", gap: 1, background: "hsl(var(--line))" }} className="stats-grid" data-cols="4">
            {[
              { num: "+30%", label: "יותר הזמנות", sub: "שולחנות שסורקים", color: "hsl(var(--gold))", spark: [20,30,25,40,35,50,45,60,55,70] },
              { num: "3.4×", label: "יותר המרות", sub: "לעומת תפריט נייר", color: "hsl(var(--sage))", spark: [10,18,15,30,28,45,40,55,50,68] },
              { num: "<1s", label: "זמן פתיחה", sub: "ללא אפליקציה", color: "hsl(var(--gold))", spark: [80,75,70,65,60,50,40,30,20,10] },
              { num: "100%", label: "תואם AR", sub: "iOS ו-Android", color: "hsl(var(--sage))", spark: [30,45,40,60,55,70,65,80,75,100] },
            ].map((s, i) => (
              <div key={i} className="reveal" data-delay={String(i * 100)} style={{ padding: "44px 36px", textAlign: "center", background: "hsl(var(--abyss))", transition: "background .2s,transform .2s", cursor: "default", position: "relative" }}
                onMouseOver={e => { (e.currentTarget as HTMLDivElement).style.background = "hsl(var(--deep))"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
                onMouseOut={e => { (e.currentTarget as HTMLDivElement).style.background = "hsl(var(--abyss))"; (e.currentTarget as HTMLDivElement).style.transform = ""; }}>
                <StatNumber value={s.num} color={s.color} />
                <div style={{ fontSize: "1rem", color: "hsl(var(--cream))", fontWeight: 400, marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".6875rem", letterSpacing: ".1em", color: "hsl(var(--dim))", marginBottom: 16 }}>{s.sub}</div>
                <div style={{ display: "flex", justifyContent: "center", opacity: 0.6 }}>
                  <Sparkline data={s.spark} color={s.color} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES — Sticky 3-step ═══ */}
      <section id="features" style={{ padding: "160px 0", borderTop: "1px solid hsl(var(--line))", background: "hsl(var(--abyss))", position: "relative", scrollMarginTop: 80, overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: "20%", right: "5%", width: 600, height: 600, background: "radial-gradient(circle,hsl(36,28%,92%,.04) 0%,transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 56px", direction: "rtl" }}>
          <div style={{ marginBottom: 100 }}>
            <div className="reveal" style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 10 }}>
              <span className="eyebrow" style={{ fontSize: ".75rem" }}>השיטה</span>
              <div style={{ flex: 1, maxWidth: 80, height: 1, background: "hsl(var(--line))" }} />
            </div>
            <h2 className="reveal" style={{ fontFamily: "'Noto Serif Hebrew',serif", fontWeight: 300, fontSize: "clamp(40px,5vw,80px)", lineHeight: .9, letterSpacing: "-.04em", color: "hsl(var(--cream))", marginTop: 20 }}>
              שלושה שלבים.<br />
              <span style={{ fontStyle: "italic", color: "hsl(36,18%,72%)" }}>מהפכה גסטרונומית.</span>
            </h2>
          </div>

          {/* Sticky layout */}
          <div className="steps-layout" style={{ display: "flex", gap: 80, alignItems: "flex-start" }} ref={stepsRef}>
            {/* Sticky left — visual */}
            <div className="steps-sticky" style={{ flex: "0 0 44%", position: "sticky", top: 120, height: "auto" }}>
              {/* Step visual cards */}
              <div style={{ position: "relative" }}>
                {/* Card 1: QR scan */}
                <div style={{ transition: "opacity .5s,transform .5s", opacity: activeStep === 0 ? 1 : 0, transform: activeStep === 0 ? "scale(1) translateY(0)" : "scale(.97) translateY(12px)", position: activeStep === 0 ? "relative" : "absolute", top: 0, left: 0, right: 0, pointerEvents: activeStep === 0 ? "auto" : "none" }}>
                  <div style={{ background: "linear-gradient(135deg,hsl(220,10%,8%) 0%,hsl(220,10%,6%) 100%)", border: "1px solid hsl(36,28%,92%,.12)", borderRadius: 16, padding: "52px 48px", backdropFilter: "blur(32px)", boxShadow: "0 40px 80px -24px rgba(0,0,0,.7),inset 0 1px 0 hsl(36,28%,92%,.08)", minHeight: 380, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".625rem", letterSpacing: ".18em", color: "hsl(var(--dim))", marginBottom: 32 }}>01 / 03 — סריקה</div>
                      {/* QR visual */}
                      <div style={{ width: 120, height: 120, background: "hsl(220,10%,5%)", border: "1px solid hsl(36,28%,92%,.2)", borderRadius: 12, display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 3, padding: 14, marginBottom: 36 }}>
                        {Array(25).fill(0).map((_, j) => (
                          <div key={j} style={{ background: [0,1,2,3,4,5,9,10,14,15,16,17,18,19,20,21,24].includes(j) ? "hsl(36,28%,92%,.8)" : "transparent", borderRadius: 2 }} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 style={{ fontFamily: "'Noto Serif Hebrew',serif", fontWeight: 300, fontSize: "1.75rem", letterSpacing: "-.02em", color: "hsl(var(--cream))", marginBottom: 12, lineHeight: 1.2 }}>הלקוח מכוון,<br />התפריט נפתח</h3>
                      <p style={{ fontSize: "1rem", color: "hsl(var(--subtle))", lineHeight: 1.7 }}>קוד QR אישי. תוך 0.8 שניות התפריט נפתח ישירות בדפדפן.</p>
                    </div>
                  </div>
                </div>

                {/* Card 2: 3D AR */}
                <div style={{ transition: "opacity .5s,transform .5s", opacity: activeStep === 1 ? 1 : 0, transform: activeStep === 1 ? "scale(1) translateY(0)" : "scale(.97) translateY(12px)", position: activeStep === 1 ? "relative" : "absolute", top: 0, left: 0, right: 0, pointerEvents: activeStep === 1 ? "auto" : "none" }}>
                  <div style={{ background: "linear-gradient(135deg,hsl(158,25%,8%) 0%,hsl(220,10%,6%) 100%)", border: "1px solid hsl(158,28%,48%,.2)", borderRadius: 16, padding: "52px 48px", backdropFilter: "blur(32px)", boxShadow: "0 40px 80px -24px rgba(0,0,0,.7),inset 0 1px 0 hsl(158,28%,48%,.1)", minHeight: 380, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".625rem", letterSpacing: ".18em", color: "hsl(var(--dim))", marginBottom: 32 }}>02 / 03 — AR</div>
                      {/* 3D cube icon */}
                      <div style={{ width: 80, height: 80, background: "hsl(158,28%,48%,.08)", border: "1px solid hsl(158,28%,48%,.25)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 36, color: "hsl(var(--sage))" }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                          <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                          <line x1="12" x2="12" y1="22.08" y2="12"/>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 style={{ fontFamily: "'Noto Serif Hebrew',serif", fontWeight: 300, fontSize: "1.75rem", letterSpacing: "-.02em", color: "hsl(var(--cream))", marginBottom: 12, lineHeight: 1.2 }}>המנה על<br />השולחן, ב-AR</h3>
                      <p style={{ fontSize: "1rem", color: "hsl(var(--subtle))", lineHeight: 1.7 }}>iPhone ו-Android מציגים את המנה במציאות רבודה. כל מנה — לפני ההזמנה.</p>
                    </div>
                  </div>
                </div>

                {/* Card 3: Analytics */}
                <div style={{ transition: "opacity .5s,transform .5s", opacity: activeStep === 2 ? 1 : 0, transform: activeStep === 2 ? "scale(1) translateY(0)" : "scale(.97) translateY(12px)", position: activeStep === 2 ? "relative" : "absolute", top: 0, left: 0, right: 0, pointerEvents: activeStep === 2 ? "auto" : "none" }}>
                  <div style={{ background: "linear-gradient(135deg,hsl(220,10%,8%) 0%,hsl(220,10%,6%) 100%)", border: "1px solid hsl(220,7%,16%,.8)", borderRadius: 16, padding: "52px 48px", backdropFilter: "blur(32px)", boxShadow: "0 40px 80px -24px rgba(0,0,0,.7),inset 0 1px 0 hsl(36,28%,92%,.06)", minHeight: 380, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".625rem", letterSpacing: ".18em", color: "hsl(var(--dim))", marginBottom: 32 }}>03 / 03 — אנליטיקה</div>
                      {/* Bar chart visual */}
                      <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 60, marginBottom: 36 }}>
                        {[40, 60, 45, 75, 55, 90, 70].map((h, i) => (
                          <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 5 ? "hsl(36,28%,92%,.7)" : "hsl(36,28%,92%,.15)", borderRadius: "3px 3px 0 0", transition: "height .6s" }} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 style={{ fontFamily: "'Noto Serif Hebrew',serif", fontWeight: 300, fontSize: "1.75rem", letterSpacing: "-.02em", color: "hsl(var(--cream))", marginBottom: 12, lineHeight: 1.2 }}>+30% הזמנות<br />נמדדו</h3>
                      <p style={{ fontSize: "1rem", color: "hsl(var(--subtle))", lineHeight: 1.7 }}>אנליטיקה בזמן אמת: צפיות, המרות, מנות פופולריות.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step dots */}
              <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width: i === activeStep ? 28 : 8, height: 4, borderRadius: 99, background: i === activeStep ? "hsl(var(--cream))" : "hsl(var(--line))", transition: "all .4s" }} />
                ))}
              </div>
            </div>

            {/* Scrollable right — text steps */}
            <div style={{ flex: 1 }}>
              {[
                { num: "01", icon: <IconScan />, accentColor: "hsl(36,28%,92%)", bg: "hsl(36,28%,92%,.06)", border: "hsl(36,28%,92%,.12)", eyebrowEl: <span className="eyebrow" style={{ display: "block", marginBottom: 14, fontSize: ".75rem" }}>סריקה</span>, title: <>הלקוח מכוון,<br />התפריט נפתח</>, body: "קוד QR אישי. תוך 0.8 שניות התפריט נפתח ישירות בדפדפן — ללא אפליקציה, ללא הורדה.", topLine: "linear-gradient(90deg,transparent,hsl(36,28%,92%,.2),transparent)" },
                { num: "02", icon: <IconCube />, accentColor: "hsl(var(--sage))", bg: "hsl(158,28%,48%,.08)", border: "hsl(158,28%,48%,.2)", eyebrowEl: <span className="eyebrow-sage" style={{ display: "block", marginBottom: 14, fontSize: ".75rem" }}>תלת-מימד AR</span>, title: <>המנה על<br />השולחן, ב-AR</>, body: "iPhone ו-Android מציגים את המנה במציאות רבודה. כל מנה — לפני ההזמנה.", topLine: "linear-gradient(90deg,transparent,hsl(158,28%,48%,.35),transparent)" },
                { num: "03", icon: <IconBar />, accentColor: "hsl(var(--pale))", bg: "hsl(220,3%,64%,.06)", border: "hsl(220,3%,64%,.15)", eyebrowEl: <span className="eyebrow" style={{ display: "block", marginBottom: 14, fontSize: ".75rem" }}>אנליטיקה</span>, title: <>+30% הזמנות<br />נמדדו</>, body: "שולחנות שסורקים ממירים 3.4× יותר. אנליטיקה בזמן אמת: צפיות, המרות, מנות פופולריות.", topLine: "linear-gradient(90deg,transparent,hsl(220,3%,64%,.2),transparent)" },
              ].map((f, i) => (
                <div key={i} data-step={i} className="card-surface reveal" data-delay={String(i * 120)} style={{ padding: "52px 44px", borderRadius: 8, position: "relative", overflow: "hidden", marginBottom: 24 }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: f.topLine }} />
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".6875rem", letterSpacing: ".18em", color: "hsl(var(--dim))", marginBottom: 28 }}>{f.num}</div>
                  <div style={{ width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", background: f.bg, border: `1px solid ${f.border}`, borderRadius: 8, marginBottom: 28, color: f.accentColor }}>{f.icon}</div>
                  {f.eyebrowEl}
                  <h3 style={{ fontFamily: "'Noto Serif Hebrew',serif", fontWeight: 300, fontSize: "1.875rem", letterSpacing: "-.02em", color: "hsl(var(--cream))", marginBottom: 20, lineHeight: 1.15 }}>{f.title}</h3>
                  <p style={{ fontSize: "1.0625rem", color: "hsl(var(--subtle))", lineHeight: 1.7 }}>{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ GALLERY ═══ */}
      <section id="gallery" style={{ padding: "160px 0", background: "hsl(var(--void))", borderTop: "1px solid hsl(var(--line))", scrollMarginTop: 80 }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 56px", direction: "rtl" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 32, marginBottom: 80 }}>
            <div>
              <div className="reveal" style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                <span className="eyebrow" style={{ fontSize: ".75rem" }}>הגלריה</span>
                <div style={{ flex: 1, maxWidth: 64, height: 1, background: "hsl(var(--line))" }} />
              </div>
              <h2 className="reveal" style={{ fontFamily: "'Noto Serif Hebrew',serif", fontWeight: 300, fontSize: "clamp(40px,5vw,80px)", lineHeight: .9, letterSpacing: "-.04em", color: "hsl(var(--cream))" }}>
                כל מנה,<br /><span style={{ fontStyle: "italic", color: "hsl(36,18%,72%)" }}>בשלושה ממדים</span>
              </h2>
            </div>
            <p className="reveal" data-delay="150" style={{ fontSize: "1.0625rem", color: "hsl(var(--subtle))", maxWidth: 320, lineHeight: 1.75 }}>הלקוחות רואים את המנה לפני שמזמינים. AR תואם iPhone ו-Android, ללא אפליקציה.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }} className="gallery-grid">
            {[
              { img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&h=440&fit=crop&q=80", name: "בשר אנגוס", desc: "אנגוס על האש עם תוספת לבחירה", price: "₪148", badge: "3D · AR", badgeColor: "hsl(var(--gold))" },
              { img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=700&h=440&fit=crop&q=80", name: "פסטה ים", desc: "פסטה פירות ים ברוטב ויין לבן", price: "₪89", badge: "וידאו", badgeColor: "hsl(var(--pale))" },
              { img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&h=440&fit=crop&q=80", name: "סלט עונתי", desc: "עשבי תיבול טריים ורוטב ביתי", price: "₪54", badge: "3D", badgeColor: "hsl(var(--pale))" },
              { img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=700&h=440&fit=crop&q=80", name: "יין אדום", desc: "בורדו · 2021 · בחירת הסומלייה", price: "₪62", badge: "360°", badgeColor: "hsl(var(--pale))" },
              { img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=700&h=440&fit=crop&q=80", name: "פונדאן", desc: "שוקולד בלגי חם עם גלידת וניל", price: "₪44", badge: "AR", badgeColor: "hsl(var(--pale))" },
              { img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&h=440&fit=crop&q=80", name: "אספרסו", desc: "בלנד אתיופי · קלייה בינונית", price: "₪28", badge: "חי", badgeColor: "hsl(var(--sage))" },
            ].map((d, i) => (
              <div key={i} className="card-surface reveal" data-delay={String((i % 3) * 80)} style={{ borderRadius: 8, overflow: "hidden", cursor: "pointer" }}>
                <div style={{ height: 240, overflow: "hidden", position: "relative" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={d.img} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .6s cubic-bezier(.16,1,.3,1)" }}
                    onMouseOver={e => (e.currentTarget.style.transform = "scale(1.06)")}
                    onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
                    loading="lazy"
                  />
                  <div style={{ position: "absolute", top: 12, left: 12, padding: "5px 12px", background: "hsl(220,12%,4%,.8)", backdropFilter: "blur(8px)", border: "1px solid hsl(36,28%,92%,.2)", borderRadius: 99, fontFamily: "'DM Mono',monospace", fontSize: ".625rem", letterSpacing: ".12em", textTransform: "uppercase", color: d.badgeColor }}>{d.badge}</div>
                </div>
                <div style={{ padding: "24px 26px" }}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
                    <div style={{ fontFamily: "'Noto Serif Hebrew',serif", fontSize: "1.125rem", fontWeight: 400, color: "hsl(var(--cream))" }}>{d.name}</div>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".9375rem", color: "hsl(var(--gold))" }}>{d.price}</div>
                  </div>
                  <div style={{ fontSize: ".9375rem", color: "hsl(var(--subtle))" }}>{d.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 32, fontFamily: "'DM Mono',monospace", fontSize: ".625rem", letterSpacing: ".14em", textTransform: "uppercase", color: "hsl(var(--dim))" }}>מודלים תלת-מימדיים מסופקים על ידי הצוות שלנו · פורמטים GLTF/GLB נתמכים</p>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" style={{ padding: "160px 0", background: "hsl(var(--abyss))", borderTop: "1px solid hsl(var(--line))", scrollMarginTop: 80, position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 1000, height: 500, background: "radial-gradient(ellipse at 50% 100%,hsl(36,28%,92%,.05) 0%,transparent 65%)", filter: "blur(40px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 56px", direction: "rtl" }}>
          <div style={{ marginBottom: 100, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 28 }}>
            <div>
              <div className="reveal" style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                <span className="eyebrow" style={{ fontSize: ".75rem" }}>מחירים</span>
                <div style={{ flex: 1, maxWidth: 64, height: 1, background: "hsl(var(--line))" }} />
              </div>
              <h2 className="reveal" style={{ fontFamily: "'Noto Serif Hebrew',serif", fontWeight: 300, fontSize: "clamp(40px,5vw,80px)", lineHeight: .9, letterSpacing: "-.04em", color: "hsl(var(--cream))" }}>
                שלוש תוכניות.<br /><span style={{ fontStyle: "italic", color: "hsl(36,12%,64%)" }}>אפס הפתעות.</span>
              </h2>
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 22px", background: "hsl(158,28%,48%,.07)", border: "1px solid hsl(158,28%,48%,.22)", borderRadius: 99 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "hsl(var(--sage))", boxShadow: "0 0 10px hsl(158,28%,48%,.8)", animation: "pulseGlow 2.5s ease-in-out infinite" }} />
              <span className="eyebrow-sage" style={{ fontSize: ".6875rem" }}>חודש ראשון מתנה</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, alignItems: "start" }} className="pricing-grid">
            {/* Starter */}
            <div className="card-surface reveal" style={{ borderRadius: 8, overflow: "hidden" }}>
              <div style={{ padding: "36px 36px 32px", borderBottom: "1px solid hsl(var(--line))" }}>
                <div className="eyebrow" style={{ marginBottom: 14, fontSize: ".6875rem" }}>I · טעימה</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "3.5rem", letterSpacing: "-.06em", color: "hsl(var(--cream))", lineHeight: 1 }}>
                  ₪49<span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".8125rem", letterSpacing: ".04em", color: "hsl(var(--dim))" }}>/חודש</span>
                </div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".625rem", color: "hsl(var(--dim))", marginTop: 8 }}>כניסה לעולם</div>
              </div>
              <div style={{ padding: "32px 36px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
                  {["תפריט דיגיטלי מלא","קוד QR אישי","עד 30 מנות","2 שפות"].map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(220,4%,46%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      <span style={{ fontSize: ".9375rem", color: "hsl(var(--subtle))" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link href="/signup" style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center", width: "100%",
                  padding: "14px 24px",
                  background: "transparent",
                  color: "hsl(var(--pale))",
                  fontFamily: "'DM Mono',monospace",
                  fontSize: ".6875rem", fontWeight: 400,
                  letterSpacing: ".14em", textTransform: "uppercase",
                  border: "1px solid hsl(var(--line))",
                  borderRadius: "var(--radius)",
                  textDecoration: "none",
                  transition: "border-color .2s,color .2s,background .2s",
                }}
                  onMouseOver={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = "hsl(36,28%,92%,.4)";
                    el.style.color = "hsl(var(--cream))";
                    el.style.background = "hsl(36,28%,92%,.04)";
                  }}
                  onMouseOut={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = "hsl(var(--line))";
                    el.style.color = "hsl(var(--pale))";
                    el.style.background = "transparent";
                  }}
                >בחר תוכנית</Link>
              </div>
            </div>

            {/* Popular */}
            <div className="reveal" data-delay="120" style={{ borderRadius: 8, overflow: "hidden", border: "1px solid hsl(36,28%,92%,.25)", animation: "pricingPulse 4.5s ease-in-out 1.5s infinite", background: "hsl(var(--abyss))" }}>
              <div style={{ padding: "36px 36px 32px", borderBottom: "1px solid hsl(36,28%,92%,.1)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <span className="eyebrow-gold" style={{ fontSize: ".6875rem" }}>II · המנה העיקרית</span>
                  <span style={{ padding: "4px 12px", background: "hsl(36,28%,92%,.08)", border: "1px solid hsl(36,28%,92%,.2)", borderRadius: 99, fontFamily: "'DM Mono',monospace", fontSize: ".5875rem", letterSpacing: ".14em", textTransform: "uppercase", color: "hsl(var(--gold))" }}>מומלץ</span>
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "3.5rem", letterSpacing: "-.06em", color: "hsl(var(--gold))", lineHeight: 1 }}>
                  ₪149<span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".8125rem", letterSpacing: ".04em", color: "hsl(36,12%,54%)" }}>/חודש</span>
                </div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".625rem", color: "hsl(36,12%,54%)", marginTop: 8 }}>הבחירה הפופולרית</div>
              </div>
              <div style={{ padding: "32px 36px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
                  {["מנות ללא הגבלה","וידאו לכל מנה","3 שפות + תרגום","אנליטיקה מתקדמת","תמיכה מועדפת"].map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(158,28%,48%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      <span style={{ fontSize: ".9375rem", color: "hsl(var(--cream))" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link href="/signup" style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center", width: "100%",
                  padding: "14px 24px",
                  background: "hsl(var(--gold))",
                  color: "hsl(var(--void))",
                  fontFamily: "'DM Mono',monospace",
                  fontSize: ".6875rem", fontWeight: 500,
                  letterSpacing: ".14em", textTransform: "uppercase",
                  borderRadius: "var(--radius)",
                  textDecoration: "none",
                  transition: "background .2s,transform .2s,box-shadow .2s",
                }}
                  onMouseOver={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = "hsl(28 90% 58%)";
                    el.style.transform = "translateY(-2px)";
                    el.style.boxShadow = "0 12px 40px hsl(28 88% 48% / .5)";
                  }}
                  onMouseOut={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = "hsl(var(--gold))";
                    el.style.transform = "";
                    el.style.boxShadow = "";
                  }}
                >בחר תוכנית</Link>
              </div>
            </div>

            {/* Enterprise */}
            <div className="card-surface reveal" style={{ borderRadius: 8, overflow: "hidden" }} data-delay="120">
              <div style={{ padding: "36px 36px 32px", borderBottom: "1px solid hsl(var(--line))" }}>
                <div className="eyebrow" style={{ marginBottom: 14, fontSize: ".6875rem" }}>III · דגוסטסיון</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "3.5rem", letterSpacing: "-.06em", color: "hsl(var(--cream))", lineHeight: 1 }}>
                  ₪349<span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".8125rem", letterSpacing: ".04em", color: "hsl(var(--dim))" }}>/חודש</span>
                </div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".625rem", color: "hsl(var(--dim))", marginTop: 8 }}>חוויה מלאה</div>
              </div>
              <div style={{ padding: "32px 36px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
                  {["תלת-מימד לכל המנות","מציאות רבודה (AR)","מיתוג מותאם אישית","ייעוץ אישי חודשי"].map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(36,28%,92%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      <span style={{ fontSize: ".9375rem", color: "hsl(var(--pale))" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link href="/signup" style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center", width: "100%",
                  padding: "14px 24px",
                  background: "transparent",
                  color: "hsl(var(--pale))",
                  fontFamily: "'DM Mono',monospace",
                  fontSize: ".6875rem", fontWeight: 400,
                  letterSpacing: ".14em", textTransform: "uppercase",
                  border: "1px solid hsl(var(--line))",
                  borderRadius: "var(--radius)",
                  textDecoration: "none",
                  transition: "border-color .2s,color .2s,background .2s",
                }}
                  onMouseOver={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = "hsl(var(--cream),.3)";
                    el.style.color = "hsl(var(--cream))";
                    el.style.background = "hsl(var(--cream),.04)";
                  }}
                  onMouseOut={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = "hsl(var(--line))";
                    el.style.color = "hsl(var(--pale))";
                    el.style.background = "transparent";
                  }}
                >בחר תוכנית</Link>
              </div>
            </div>
          </div>
          <p style={{ textAlign: "center", marginTop: 28, fontFamily: "'DM Mono',monospace", fontSize: ".625rem", letterSpacing: ".12em", textTransform: "uppercase", color: "hsl(var(--dim))" }}>כל המחירים בשקלים · לא כולל מע״מ · ללא התחייבות</p>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: "1px solid hsl(var(--line))", background: "hsl(var(--abyss))", padding: "72px 0 40px" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 56px", direction: "rtl" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 48, marginBottom: 64 }}>
            <div className="reveal" style={{ maxWidth: 280 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <div style={{ width: 32, height: 32, border: "1px solid hsl(36,28%,92%,.35)", borderRadius: 5, background: "linear-gradient(135deg,hsl(36,28%,92%,.1),hsl(36,28%,92%,.04))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", color: "hsl(var(--gold))", fontStyle: "italic" }}>פ</span>
                </div>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", fontWeight: 300, color: "hsl(var(--cream))", letterSpacing: "-.025em" }}>פלטפורמה</span>
              </div>
              <p style={{ fontSize: ".9375rem", lineHeight: 1.75, color: "hsl(var(--subtle))" }}>פלטפורמת תפריטים תלת-מימד/AR למסעדות. תל אביב · פריז.</p>
            </div>
            <div className="reveal footer-links" data-delay="150" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 52 }}>
              {[
                { title: "מוצר", links: [["#features","תכונות"],["#pricing","מחירים"]] },
                { title: "חברה", links: [["#","אודות"],["#","צור קשר"]] },
                { title: "משפטי", links: [["#","תנאי שימוש"],["#","פרטיות"]] },
              ].map((col) => (
                <div key={col.title}>
                  <span className="eyebrow-gold" style={{ display: "block", marginBottom: 18, fontSize: ".6875rem" }}>{col.title}</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {col.links.map(([href, label]) => (
                      <a key={label} href={href} className="hover-underline" style={{ fontSize: ".9375rem", color: "hsl(var(--subtle))", textDecoration: "none", transition: "color .2s" }}
                        onMouseOver={e => (e.currentTarget.style.color = "hsl(36,28%,92%)")}
                        onMouseOut={e => (e.currentTarget.style.color = "hsl(220,4%,46%)")}>{label}</a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid hsl(var(--line))", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".625rem", letterSpacing: ".08em", color: "hsl(var(--dim))" }}>© 2025 פלטפורמה · כל הזכויות שמורות</span>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".625rem", letterSpacing: ".08em", color: "hsl(var(--dim))" }}>נוצר באהבה <span style={{ color: "hsl(var(--gold))" }}>◆</span> בתל אביב</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
