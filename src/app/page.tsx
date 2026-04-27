"use client";

import React, { useEffect } from "react";
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
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
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

/* ─── Inline keyframes ──────────────────────────────────── */
const KEYFRAMES = `
  @keyframes borderRun { 0%{background-position:0% 0%} 100%{background-position:200% 0%} }
  @keyframes goldShimmer { 0%{background-position:100% 0} 50%{background-position:0% 0} 100%{background-position:100% 0} }
  @keyframes orbFloat1 { 0%,100%{transform:translate(0,0) scale(1);opacity:.35} 33%{transform:translate(60px,-80px) scale(1.15);opacity:.6} 66%{transform:translate(-40px,40px) scale(.88);opacity:.25} }
  @keyframes orbFloat2 { 0%,100%{transform:translate(0,0) scale(1);opacity:.25} 25%{transform:translate(-70px,60px) scale(1.2);opacity:.5} 75%{transform:translate(50px,-50px) scale(.85);opacity:.15} }
  @keyframes marqueeScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes pulseGlow { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.12)} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pricingPulse {
    0%,100%{box-shadow:0 0 0 1px hsl(36,28%,92%,.18),0 40px 80px -24px rgba(0,0,0,.7)}
    50%{box-shadow:0 0 0 1px hsl(36,28%,92%,.42),0 40px 80px -24px rgba(0,0,0,.7),0 0 80px hsl(36,28%,92%,.05)}
  }
  @keyframes shimmerCard { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  .fade-a{animation:fadeUp 1s cubic-bezier(.16,1,.3,1) both}
  .fade-b{animation:fadeUp 1s cubic-bezier(.16,1,.3,1) .12s both}
  .fade-c{animation:fadeUp 1s cubic-bezier(.16,1,.3,1) .24s both}
  .fade-d{animation:fadeUp 1s cubic-bezier(.16,1,.3,1) .36s both}
  @media (max-width:900px){
    .hero-cols{flex-direction:column !important}
    .hero-text{max-width:100% !important;padding-left:0 !important}
    .hero-3d{max-width:100% !important}
    .features-grid{grid-template-columns:1fr !important}
    .gallery-grid{grid-template-columns:repeat(2,1fr) !important}
    .pricing-grid{grid-template-columns:1fr !important}
    .stats-grid{grid-template-columns:repeat(2,1fr) !important}
    .footer-links{grid-template-columns:repeat(2,1fr) !important}
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
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const IconCheck = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="hsl(158,28%,48%)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconScan = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/>
    <path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
  </svg>
);
const IconCube = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
  </svg>
);
const IconBar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/>
  </svg>
);
const IconExternal = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/>
  </svg>
);

export default function HomePage() {
  useReveal();
  useHeaderScroll();

  return (
    <div style={{ background: "hsl(var(--void))", color: "hsl(var(--cream))", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{KEYFRAMES}</style>

      {/* Grain */}
      <div aria-hidden style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, opacity: 0.022, mixBlendMode: "screen", backgroundImage: GRAIN_SVG, backgroundSize: "256px" }} />

      {/* ═══ HEADER ═══ */}
      <header id="site-header" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, transition: "background .4s,border-color .4s" }}>
        <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,hsl(36,28%,92%,.45),hsl(158,28%,48%,.25),hsl(36,28%,92%,.45),transparent)", backgroundSize: "200% 100%", animation: "borderRun 5s linear infinite" }} />
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 56px", height: 66, display: "flex", alignItems: "center", justifyContent: "space-between", direction: "rtl" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", flexShrink: 0 }}>
            <div style={{ width: 34, height: 34, background: "linear-gradient(135deg,hsl(36,28%,92%,.12),hsl(36,28%,92%,.04))", border: "1px solid hsl(36,28%,92%,.35)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 1px 0 hsl(36,28%,92%,.18),0 4px 20px hsl(36,28%,92%,.12)" }}>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.15rem", color: "hsl(var(--gold))", fontStyle: "italic", lineHeight: 1, marginTop: 1 }}>פ</span>
            </div>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.25rem", fontWeight: 300, letterSpacing: "-.025em", color: "hsl(var(--cream))" }}>פלטפורמה</span>
          </Link>
          <nav style={{ display: "flex", gap: 40, alignItems: "center" }}>
            {[["#features","תכונות"],["#gallery","גלריה"],["#pricing","מחירים"]].map(([href,label]) => (
              <a key={href} href={href} className="eyebrow hover-underline" style={{ textDecoration: "none", transition: "color .2s" }}>{label}</a>
            ))}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Link href="/login" className="eyebrow hover-underline" style={{ textDecoration: "none" }}>כניסה</Link>
            <Link href="/signup" className="btn-primary" style={{ padding: "9px 22px", fontSize: ".625rem" }}>
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
            <div className="fade-a liquid-glass" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 44, padding: "8px 20px", borderRadius: 99 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "hsl(var(--sage))", boxShadow: "0 0 14px hsl(158,28%,48%,.9)", flexShrink: 0, animation: "pulseGlow 2.5s ease-in-out infinite" }} />
              <span className="eyebrow-gold" style={{ fontSize: ".5875rem" }}>תפריטים תלת-מימד · AR · VR — מסעדות כוכב מישלן</span>
            </div>
            {/* Headline */}
            <div className="fade-b" style={{ marginBottom: 32 }}>
              <h1 style={{ fontFamily: "'Noto Serif Hebrew',serif", fontWeight: 300, fontSize: "clamp(52px,5.5vw,100px)", lineHeight: .88, letterSpacing: "-.04em" }}>
                <span style={{ display: "block", color: "hsl(var(--cream))", marginBottom: 2 }}>הטלפון</span>
                <span style={{ display: "block", fontStyle: "italic", background: "linear-gradient(135deg,hsl(24,80%,32%) 0%,hsl(36,28%,92%) 28%,hsl(28,95%,72%) 50%,hsl(36,28%,92%) 72%,hsl(24,80%,32%) 100%)", backgroundSize: "220% 100%", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", animation: "goldShimmer 3.5s ease-in-out infinite", marginBottom: 2 }}>הופך</span>
                <span style={{ display: "block", color: "hsl(36,28%,92%,.3)" }}>לצלחת</span>
              </h1>
            </div>
            <p className="fade-c" style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "hsl(var(--subtle))", maxWidth: 400, marginBottom: 52 }}>
              הלקוח סורק. המנה מופיעה בתלת-מימד על השולחן.<br />זה לא תפריט — זו חוויה גסטרונומית דיגיטלית.
            </p>
            <div className="fade-c" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 52 }}>
              <Link href="/signup" className="btn-primary">התחל בחינם <IconArrow /></Link>
              <a href="#features" className="btn-ghost">ראה הדגמה</a>
            </div>
            {/* Trust pills */}
            <div className="fade-d" style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
              {["הגדרה תוך 5 דקות", "ללא אפליקציה", "iOS ו-Android AR"].map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ width: 18, height: 18, borderRadius: "50%", background: "hsl(158,28%,48%,.1)", border: "1px solid hsl(158,28%,48%,.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><IconCheck /></span>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".625rem", letterSpacing: ".08em", color: "hsl(var(--subtle))" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3D viewer */}
          <div style={{ flex: "0 0 50%", maxWidth: "50%", position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }} className="hero-3d">
            <div className="fade-b" style={{ width: "100%", position: "relative" }}>
              <HeroCanvas />
            </div>
            {/* Drag hint — identique au Design System */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16, padding: "7px 18px", background: "hsl(220,10%,6%,.9)", border: "1px solid hsl(36,28%,92%,.15)", borderRadius: 99, backdropFilter: "blur(16px)" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "hsl(var(--gold))", boxShadow: "0 0 8px hsl(36,28%,92%,.8)" }} />
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".5625rem", letterSpacing: ".14em", color: "hsl(var(--subtle))", textTransform: "uppercase" }}>גרור לסיבוב · Drag to rotate</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="reveal" style={{ borderTop: "1px solid hsl(var(--line))", borderBottom: "1px solid hsl(var(--line))", background: "linear-gradient(180deg,hsl(var(--abyss)) 0%,hsl(var(--void)) 100%)", padding: "18px 0", overflow: "hidden" }}>
        <div style={{ overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg,transparent,black 10%,black 90%,transparent)", maskImage: "linear-gradient(90deg,transparent,black 10%,black 90%,transparent)" }}>
          <div style={{ display: "flex", width: "max-content", animation: "marqueeScroll 55s linear infinite" }}>
            {[...Array(2)].flatMap(() => [
              <span key="a1" style={{ display: "inline-flex", alignItems: "center", gap: 24, paddingLeft: 24, fontFamily: "'Noto Serif Hebrew',serif", fontSize: "1.3rem", fontWeight: 300, fontStyle: "italic", color: "hsl(var(--cream))", whiteSpace: "nowrap" }}>בשר וגריל<span style={{ color: "hsl(var(--line))" }}>·</span></span>,
              <span key="a2" style={{ display: "inline-flex", alignItems: "center", gap: 24, paddingLeft: 24, fontFamily: "'DM Mono',monospace", fontSize: ".6875rem", letterSpacing: ".16em", textTransform: "uppercase", color: "hsl(var(--gold))", whiteSpace: "nowrap" }}>3D · AR · VR<span style={{ color: "hsl(var(--line))" }}>·</span></span>,
              <span key="a3" style={{ display: "inline-flex", alignItems: "center", gap: 24, paddingLeft: 24, fontFamily: "'DM Sans',sans-serif", fontSize: ".9rem", color: "hsl(var(--pale))", whiteSpace: "nowrap" }}>תפריט דיגיטלי<span style={{ color: "hsl(var(--line))" }}>·</span></span>,
              <span key="a4" style={{ display: "inline-flex", alignItems: "center", gap: 24, paddingLeft: 24, fontFamily: "'DM Mono',monospace", fontSize: ".6875rem", letterSpacing: ".16em", textTransform: "uppercase", color: "hsl(var(--dim))", whiteSpace: "nowrap" }}>QR חי<span style={{ color: "hsl(var(--line))" }}>·</span></span>,
              <span key="a5" style={{ display: "inline-flex", alignItems: "center", gap: 24, paddingLeft: 24, fontFamily: "'Noto Serif Hebrew',serif", fontSize: "1.3rem", fontWeight: 300, color: "hsl(var(--fog))", whiteSpace: "nowrap" }}>מנות ים<span style={{ color: "hsl(var(--line))" }}>·</span></span>,
              <span key="a6" style={{ display: "inline-flex", alignItems: "center", gap: 24, paddingLeft: 24, fontFamily: "'DM Mono',monospace", fontSize: ".6875rem", letterSpacing: ".16em", textTransform: "uppercase", color: "hsl(var(--gold))", whiteSpace: "nowrap" }}>תל אביב · פריז<span style={{ color: "hsl(var(--line))" }}>·</span></span>,
            ])}
          </div>
        </div>
      </div>

      {/* ═══ STATS ═══ */}
      <section style={{ padding: "80px 0", background: "hsl(var(--void))", position: "relative" }}>
        <div aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 1000, height: 300, background: "radial-gradient(ellipse,hsl(36,28%,92%,.035) 0%,transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 56px", display: "grid", gap: 1, background: "hsl(var(--line))", direction: "rtl" }} className="stats-grid" data-cols="4">
          {[
            { num: "+30%", label: "יותר הזמנות", sub: "שולחנות שסורקים", color: "hsl(var(--gold))" },
            { num: "3.4×", label: "יותר המרות", sub: "לעומת תפריט נייר", color: "hsl(var(--sage))" },
            { num: "<1s", label: "זמן פתיחה", sub: "ללא אפליקציה", color: "hsl(var(--gold))" },
            { num: "100%", label: "תואם AR", sub: "iOS ו-Android", color: "hsl(var(--sage))" },
          ].map((s, i) => (
            <div key={i} className="reveal" data-delay={String(i * 100)} style={{ padding: "36px 28px", textAlign: "center", background: "hsl(var(--abyss))", transition: "background .2s", cursor: "default" }}
              onMouseOver={e => (e.currentTarget.style.background = "hsl(var(--deep))")}
              onMouseOut={e => (e.currentTarget.style.background = "hsl(var(--abyss))")}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "3.25rem", letterSpacing: "-.06em", color: s.color, lineHeight: 1, marginBottom: 10 }}>{s.num}</div>
              <div style={{ fontSize: ".875rem", color: "hsl(var(--cream))", fontWeight: 400, marginBottom: 3 }}>{s.label}</div>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".5875rem", letterSpacing: ".1em", color: "hsl(var(--dim))" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" style={{ padding: "140px 0", borderTop: "1px solid hsl(var(--line))", background: "hsl(var(--abyss))", position: "relative", scrollMarginTop: 80, overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: "20%", right: "5%", width: 600, height: 600, background: "radial-gradient(circle,hsl(36,28%,92%,.04) 0%,transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 56px", direction: "rtl" }}>
          <div style={{ marginBottom: 80 }}>
            <div className="reveal" style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 10 }}>
              <span className="eyebrow">השיטה</span>
              <div style={{ flex: 1, maxWidth: 80, height: 1, background: "hsl(var(--line))" }} />
            </div>
            <h2 className="reveal" style={{ fontFamily: "'Noto Serif Hebrew',serif", fontWeight: 300, fontSize: "clamp(36px,5vw,76px)", lineHeight: .9, letterSpacing: "-.04em", color: "hsl(var(--cream))", marginTop: 18 }}>
              שלושה שלבים.<br />
              <span style={{ fontStyle: "italic", color: "hsl(36,18%,72%)" }}>מהפכה גסטרונומית.</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }} className="features-grid">
            {[
              { num: "01", icon: <IconScan />, accentColor: "hsl(36,28%,92%)", bg: "hsl(36,28%,92%,.06)", border: "hsl(36,28%,92%,.12)", eyebrow: <span className="eyebrow" style={{ display: "block", marginBottom: 14 }}>סריקה</span>, title: <>הלקוח מכוון,<br />התפריט נפתח</>, body: "קוד QR אישי. תוך 0.8 שניות התפריט נפתח ישירות בדפדפן — ללא אפליקציה, ללא הורדה.", topLine: "linear-gradient(90deg,transparent,hsl(36,28%,92%,.2),transparent)", cardBorder: "hsl(var(--line))" },
              { num: "02", icon: <IconCube />, accentColor: "hsl(var(--sage))", bg: "hsl(158,28%,48%,.08)", border: "hsl(158,28%,48%,.2)", eyebrow: <span className="eyebrow-sage" style={{ display: "block", marginBottom: 14 }}>תלת-מימד AR</span>, title: <>המנה על<br />השולחן, ב-AR</>, body: "iPhone ו-Android מציגים את המנה במציאות רבודה. כל מנה — לפני ההזמנה.", topLine: "linear-gradient(90deg,transparent,hsl(158,28%,48%,.35),transparent)", cardBorder: "hsl(158,28%,48%,.22)" },
              { num: "03", icon: <IconBar />, accentColor: "hsl(var(--pale))", bg: "hsl(220,3%,64%,.06)", border: "hsl(220,3%,64%,.15)", eyebrow: <span className="eyebrow" style={{ display: "block", marginBottom: 14 }}>אנליטיקה</span>, title: <>+30% הזמנות<br />נמדדו</>, body: "שולחנות שסורקים ממירים 3.4× יותר. אנליטיקה בזמן אמת: צפיות, המרות, מנות פופולריות.", topLine: "linear-gradient(90deg,transparent,hsl(220,3%,64%,.2),transparent)", cardBorder: "hsl(var(--line))" },
            ].map((f, i) => (
              <div key={i} className="card-surface reveal" data-delay={String(i * 120)} style={{ padding: "44px 36px", borderRadius: 4, position: "relative", overflow: "hidden", borderColor: f.cardBorder }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: f.topLine }} />
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".625rem", letterSpacing: ".18em", color: "hsl(var(--dim))", marginBottom: 24 }}>{f.num}</div>
                <div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", background: f.bg, border: `1px solid ${f.border}`, borderRadius: 4, marginBottom: 24, color: f.accentColor }}>{f.icon}</div>
                {f.eyebrow}
                <h3 style={{ fontFamily: "'Noto Serif Hebrew',serif", fontWeight: 300, fontSize: "1.625rem", letterSpacing: "-.02em", color: "hsl(var(--cream))", marginBottom: 18, lineHeight: 1.15 }}>{f.title}</h3>
                <p style={{ fontSize: ".9375rem", color: "hsl(var(--subtle))", lineHeight: 1.7 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GALLERY ═══ */}
      <section id="gallery" style={{ padding: "140px 0", background: "hsl(var(--void))", borderTop: "1px solid hsl(var(--line))", scrollMarginTop: 80 }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 56px", direction: "rtl" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 32, marginBottom: 64 }}>
            <div>
              <div className="reveal" style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
                <span className="eyebrow">הגלריה</span>
                <div style={{ flex: 1, maxWidth: 64, height: 1, background: "hsl(var(--line))" }} />
              </div>
              <h2 className="reveal" style={{ fontFamily: "'Noto Serif Hebrew',serif", fontWeight: 300, fontSize: "clamp(36px,5vw,72px)", lineHeight: .9, letterSpacing: "-.04em", color: "hsl(var(--cream))" }}>
                כל מנה,<br /><span style={{ fontStyle: "italic", color: "hsl(36,18%,72%)" }}>בשלושה ממדים</span>
              </h2>
            </div>
            <p className="reveal" data-delay="150" style={{ fontSize: ".9375rem", color: "hsl(var(--subtle))", maxWidth: 300, lineHeight: 1.75 }}>הלקוחות רואים את המנה לפני שמזמינים. AR תואם iPhone ו-Android, ללא אפליקציה.</p>
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
              <div key={i} className="card-surface reveal" data-delay={String((i % 3) * 80)} style={{ borderRadius: 4, overflow: "hidden", cursor: "pointer" }}>
                <div style={{ height: 220, overflow: "hidden", position: "relative" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={d.img} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .6s cubic-bezier(.16,1,.3,1)" }}
                    onMouseOver={e => (e.currentTarget.style.transform = "scale(1.06)")}
                    onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
                    loading="lazy"
                  />
                  <div style={{ position: "absolute", top: 12, left: 12, padding: "4px 10px", background: "hsl(220,12%,4%,.8)", backdropFilter: "blur(8px)", border: "1px solid hsl(36,28%,92%,.2)", borderRadius: 99, fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", color: d.badgeColor }}>{d.badge}</div>
                </div>
                <div style={{ padding: "20px 22px" }}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 6 }}>
                    <div style={{ fontFamily: "'Noto Serif Hebrew',serif", fontSize: "1.0625rem", fontWeight: 400, color: "hsl(var(--cream))" }}>{d.name}</div>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".875rem", color: "hsl(var(--gold))" }}>{d.price}</div>
                  </div>
                  <div style={{ fontSize: ".8125rem", color: "hsl(var(--subtle))" }}>{d.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 24, fontFamily: "'DM Mono',monospace", fontSize: ".5875rem", letterSpacing: ".14em", textTransform: "uppercase", color: "hsl(var(--dim))" }}>מודלים תלת-מימדיים מסופקים על ידי הצוות שלנו · פורמטים GLTF/GLB נתמכים</p>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" style={{ padding: "140px 0", background: "hsl(var(--abyss))", borderTop: "1px solid hsl(var(--line))", scrollMarginTop: 80, position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 1000, height: 500, background: "radial-gradient(ellipse at 50% 100%,hsl(36,28%,92%,.05) 0%,transparent 65%)", filter: "blur(40px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 56px", direction: "rtl" }}>
          <div style={{ marginBottom: 80, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 28 }}>
            <div>
              <div className="reveal" style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
                <span className="eyebrow">מחירים</span>
                <div style={{ flex: 1, maxWidth: 64, height: 1, background: "hsl(var(--line))" }} />
              </div>
              <h2 className="reveal" style={{ fontFamily: "'Noto Serif Hebrew',serif", fontWeight: 300, fontSize: "clamp(36px,5vw,72px)", lineHeight: .9, letterSpacing: "-.04em", color: "hsl(var(--cream))" }}>
                שלוש תוכניות.<br /><span style={{ fontStyle: "italic", color: "hsl(36,12%,64%)" }}>אפס הפתעות.</span>
              </h2>
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "9px 20px", background: "hsl(158,28%,48%,.07)", border: "1px solid hsl(158,28%,48%,.22)", borderRadius: 99 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "hsl(var(--sage))", boxShadow: "0 0 10px hsl(158,28%,48%,.8)", animation: "pulseGlow 2.5s ease-in-out infinite" }} />
              <span className="eyebrow-sage" style={{ fontSize: ".5875rem" }}>חודש ראשון מתנה</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, alignItems: "start" }} className="pricing-grid">
            {/* Starter */}
            <div className="card-surface reveal" style={{ borderRadius: 4, overflow: "hidden" }}>
              <div style={{ padding: "32px 32px 28px", borderBottom: "1px solid hsl(var(--line))" }}>
                <div className="eyebrow" style={{ marginBottom: 12 }}>I · טעימה</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "3.25rem", letterSpacing: "-.06em", color: "hsl(var(--cream))", lineHeight: 1 }}>
                  ₪49<span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".75rem", letterSpacing: ".04em", color: "hsl(var(--dim))" }}>/חודש</span>
                </div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".5875rem", color: "hsl(var(--dim))", marginTop: 6 }}>כניסה לעולם</div>
              </div>
              <div style={{ padding: "28px 32px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                  {["תפריט דיגיטלי מלא","קוד QR אישי","עד 30 מנות","2 שפות"].map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="hsl(220,4%,46%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      <span style={{ fontSize: ".875rem", color: "hsl(var(--subtle))" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link href="/signup" className="btn-ghost" style={{ width: "100%", justifyContent: "center", display: "inline-flex" }}>בחר תוכנית</Link>
              </div>
            </div>

            {/* Popular */}
            <div className="reveal" data-delay="120" style={{ borderRadius: 4, overflow: "hidden", border: "1px solid hsl(36,28%,92%,.25)", animation: "pricingPulse 4.5s ease-in-out 1.5s infinite", background: "hsl(var(--abyss))" }}>
              <div style={{ padding: "32px 32px 28px", borderBottom: "1px solid hsl(36,28%,92%,.1)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <span className="eyebrow-gold">II · המנה העיקרית</span>
                  <span style={{ padding: "3px 10px", background: "hsl(36,28%,92%,.08)", border: "1px solid hsl(36,28%,92%,.2)", borderRadius: 99, fontFamily: "'DM Mono',monospace", fontSize: ".5625rem", letterSpacing: ".14em", textTransform: "uppercase", color: "hsl(var(--gold))" }}>מומלץ</span>
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "3.25rem", letterSpacing: "-.06em", color: "hsl(var(--gold))", lineHeight: 1 }}>
                  ₪149<span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".75rem", letterSpacing: ".04em", color: "hsl(36,12%,54%)" }}>/חודש</span>
                </div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".5875rem", color: "hsl(36,12%,54%)", marginTop: 6 }}>הבחירה הפופולרית</div>
              </div>
              <div style={{ padding: "28px 32px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                  {["מנות ללא הגבלה","וידאו לכל מנה","3 שפות + תרגום","אנליטיקה מתקדמת","תמיכה מועדפת"].map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="hsl(158,28%,48%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      <span style={{ fontSize: ".875rem", color: "hsl(var(--cream))" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link href="/signup" className="btn-primary" style={{ width: "100%", justifyContent: "center", display: "inline-flex" }}>בחר תוכנית</Link>
              </div>
            </div>

            {/* Enterprise */}
            <div className="card-surface reveal" style={{ borderRadius: 4, overflow: "hidden" }} data-delay="120">
              <div style={{ padding: "32px 32px 28px", borderBottom: "1px solid hsl(var(--line))" }}>
                <div className="eyebrow" style={{ marginBottom: 12 }}>III · דגוסטסיון</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "3.25rem", letterSpacing: "-.06em", color: "hsl(var(--cream))", lineHeight: 1 }}>
                  ₪349<span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".75rem", letterSpacing: ".04em", color: "hsl(var(--dim))" }}>/חודש</span>
                </div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".5875rem", color: "hsl(var(--dim))", marginTop: 6 }}>חוויה מלאה</div>
              </div>
              <div style={{ padding: "28px 32px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                  {["תלת-מימד לכל המנות","מציאות רבודה (AR)","מיתוג מותאם אישית","ייעוץ אישי חודשי"].map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="hsl(36,28%,92%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      <span style={{ fontSize: ".875rem", color: "hsl(var(--pale))" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link href="/signup" className="btn-ghost" style={{ width: "100%", justifyContent: "center", display: "inline-flex" }}>בחר תוכנית</Link>
              </div>
            </div>
          </div>
          <p style={{ textAlign: "center", marginTop: 22, fontFamily: "'DM Mono',monospace", fontSize: ".5875rem", letterSpacing: ".12em", textTransform: "uppercase", color: "hsl(var(--dim))" }}>כל המחירים בשקלים · לא כולל מע״מ · ללא התחייבות</p>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: "1px solid hsl(var(--line))", background: "hsl(var(--abyss))", padding: "60px 0 36px" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 56px", direction: "rtl" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 48, marginBottom: 56 }}>
            <div className="reveal" style={{ maxWidth: 260 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 30, height: 30, border: "1px solid hsl(36,28%,92%,.35)", borderRadius: 5, background: "linear-gradient(135deg,hsl(36,28%,92%,.1),hsl(36,28%,92%,.04))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.05rem", color: "hsl(var(--gold))", fontStyle: "italic" }}>פ</span>
                </div>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 300, color: "hsl(var(--cream))", letterSpacing: "-.025em" }}>פלטפורמה</span>
              </div>
              <p style={{ fontSize: ".875rem", lineHeight: 1.7, color: "hsl(var(--subtle))" }}>פלטפורמת תפריטים תלת-מימד/AR למסעדות. תל אביב · פריז.</p>
            </div>
            <div className="reveal footer-links" data-delay="150" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 48 }}>
              {[
                { title: "מוצר", links: [["#features","תכונות"],["#pricing","מחירים"]] },
                { title: "חברה", links: [["#","אודות"],["#","צור קשר"]] },
                { title: "משפטי", links: [["#","תנאי שימוש"],["#","פרטיות"]] },
              ].map((col) => (
                <div key={col.title}>
                  <span className="eyebrow-gold" style={{ display: "block", marginBottom: 16 }}>{col.title}</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {col.links.map(([href, label]) => (
                      <a key={label} href={href} className="hover-underline" style={{ fontSize: ".875rem", color: "hsl(var(--subtle))", textDecoration: "none", transition: "color .2s" }}
                        onMouseOver={e => (e.currentTarget.style.color = "hsl(36,28%,92%)")}
                        onMouseOut={e => (e.currentTarget.style.color = "hsl(220,4%,46%)")}>{label}</a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid hsl(var(--line))", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".5875rem", letterSpacing: ".08em", color: "hsl(var(--dim))" }}>© 2025 פלטפורמה · כל הזכויות שמורות</span>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".5875rem", letterSpacing: ".08em", color: "hsl(var(--dim))" }}>נוצר באהבה <span style={{ color: "hsl(var(--gold))" }}>◆</span> בתל אביב</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
