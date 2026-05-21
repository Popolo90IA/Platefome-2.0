/* hero-showcase-fix-v1 */
"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { LogoWordmark } from "@/components/brand";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CinematicCurtain } from "@/components/landing/CinematicCurtain";
import { HeroShowcase } from "@/components/landing/HeroShowcase";
import { DirectionalTransition } from "@/components/transitions/DirectionalTransition";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HeroCanvas = dynamic(
  () => import("@/components/appetite/HeroCanvas").then(m => m.HeroCanvas),
  { ssr: false }
);

/* ─── Scroll reveal — GSAP ScrollTrigger ───────────────── */
function useReveal() {
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = gsap.utils.toArray<HTMLElement>(".reveal, .reveal-left, .reveal-scale, .reveal-blur");
    els.forEach((el) => {
      const delay = Number(el.dataset.delay || 0) / 1000;
      gsap.fromTo(
        el,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 94%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  });
}

/* ─── Header scroll effect — GSAP ScrollTrigger ─────────── */
function useHeaderScroll() {
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const header = document.getElementById("site-header");
    if (!header) return;
    const inner = header.firstElementChild as HTMLElement | null;
    if (!inner) return;

    ScrollTrigger.create({
      start: "top+=60 top",
      onEnter: () =>
        gsap.to(inner, {
          duration: 0.35,
          ease: "power2.out",
          "--bg": "hsl(38,28%,94%,.92)",
          borderColor: "hsl(30,18%,78%)",
          boxShadow: "0 8px 40px rgba(0,0,0,.6), inset 0 1px 0 hsl(30,18%,82%,.5)",
        }),
      onLeaveBack: () =>
        gsap.to(inner, {
          duration: 0.35,
          ease: "power2.out",
          borderColor: "hsl(30,18%,82%,.5)",
          boxShadow: "0 8px 32px rgba(0,0,0,.4), inset 0 1px 0 hsl(30,18%,82%,.3)",
        }),
    });
  });
}

/* ─── Stats count-up component — GSAP ───────────────────── */
function StatNumber({ value, color }: { value: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const numMatch = value.match(/([\d]+(?:\.[\d]+)?)/);
  const numVal = numMatch ? Math.round(parseFloat(numMatch[1])) : 0;
  const proxy = useRef({ val: 0 });

  useGSAP(() => {
    const el = ref.current;
    if (!el || numVal === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = value;
      return;
    }
    gsap.fromTo(
      proxy.current,
      { val: 0 },
      {
        val: numVal,
        duration: 1.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        onUpdate() {
          const cur = Math.floor(proxy.current.val);
          el.textContent = value.replace(/([\d]+(?:\.[\d]+)?)/, String(cur));
        },
        onComplete() {
          el.textContent = value;
        },
      }
    );
  }, { scope: ref });

  return (
    <div ref={ref} style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "clamp(2.2rem,3.5vw,3.25rem)", letterSpacing: "-.05em", color, lineHeight: 1, marginBottom: 10 }}>
      {value}
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
    0%,100%{box-shadow:0 0 0 1px hsl(30,18%,82%,.18),0 40px 80px -24px rgba(0,0,0,.7)}
    50%{box-shadow:0 0 0 1px hsl(36,28%,92%,.42),0 40px 80px -24px rgba(0,0,0,.7),0 0 80px hsl(36,28%,92%,.05)}
  }
  @keyframes shimmerCard { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes letterReveal { from{opacity:0;transform:translateY(60px) skewY(4deg)} to{opacity:1;transform:translateY(0) skewY(0deg)} }
  @keyframes lineExpand { from{scaleX:0} to{scaleX:1} }
  @keyframes subtlePulse { 0%,100%{opacity:.6} 50%{opacity:1} }
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
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes heroFadeIn { from{opacity:0} to{opacity:1} }
  @keyframes slideUp { from{opacity:0;transform:translateY(32px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes aurora1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-80px,60px) scale(1.2)} }
  @keyframes aurora2 { 0%,100%{transform:translate(0,0) scale(1.1)} 50%{transform:translate(120px,-50px) scale(0.9)} }
  @keyframes aurora3 { 0%,100%{transform:translate(0,0) scale(0.9)} 50%{transform:translate(-60px,90px) scale(1.15)} }
  @keyframes navPill { from{opacity:0;transform:translateX(-50%) translateY(-16px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
  @keyframes badgeDot { 0%,100%{box-shadow:0 0 0 0 hsl(28,62%,42%,.35)} 50%{box-shadow:0 0 0 8px hsl(28,62%,42%,0)} }

  /* ── Hero elements: état initial invisible, révélés par GSAP CinematicCurtain ── */
  .hero-fade-a,.hero-fade-b,.hero-fade-c,.hero-fade-d,.hero-fade-e,.hero-fade-f {
    opacity: 0;
  }
  @media (prefers-reduced-motion: reduce) {
    .hero-fade-a,.hero-fade-b,.hero-fade-c,.hero-fade-d,.hero-fade-e,.hero-fade-f {
      opacity: 1 !important;
      filter: none !important;
      transform: none !important;
    }
  }
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
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="hsl(28,62%,42%)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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

type GalleryDish = { img: string; name: string; desc: string; price: string; badge: string; badgeColor: string };

export default function HomePage() {
  useReveal();
  useHeaderScroll();
  const [modelIdx, setModelIdx] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const stepsRef = useRef<HTMLDivElement>(null);
  const [selectedDish, setSelectedDish] = useState<GalleryDish | null>(null);
  const prev = () => setModelIdx(i => (i - 1 + MODELS.length) % MODELS.length);
  const next = () => setModelIdx(i => (i + 1) % MODELS.length);

  // Close modal on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedDish(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* Steps scroll tracking — GSAP ScrollTrigger */
  useGSAP(() => {
    const el = stepsRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("[data-step]");
    items.forEach((item) => {
      ScrollTrigger.create({
        trigger: item,
        start: "top 55%",
        end: "bottom 45%",
        onEnter: () => setActiveStep(Number(item.dataset.step)),
        onEnterBack: () => setActiveStep(Number(item.dataset.step)),
      });
    });
  }, { scope: stepsRef });

  return (
    <DirectionalTransition>
    <div style={{ background: "hsl(var(--void))", color: "hsl(var(--cream))", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{KEYFRAMES}</style>

      {/* ═══ CINEMATIC CURTAIN — GSAP ═══ */}
      <CinematicCurtain />

      {/* Grain */}
      <div aria-hidden style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, opacity: 0.028, mixBlendMode: "multiply", backgroundImage: GRAIN_SVG, backgroundSize: "256px" }} />

      {/* ═══ DISH DETAIL MODAL ═══ */}
      {selectedDish && (
        <div
          onClick={() => setSelectedDish(null)}
          style={{ position: "fixed", inset: 0, zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", background: "hsl(38,28%,94%,.88)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", animation: "fadeIn .2s ease" }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: "hsl(36,22%,90%)", border: "1px solid hsl(36,28%,92%,.14)", borderRadius: 16, overflow: "hidden", maxWidth: 560, width: "100%", boxShadow: "0 40px 80px -20px rgba(0,0,0,.9)", animation: "slideUp .35s cubic-bezier(.16,1,.3,1)", direction: "rtl" }}
          >
            {/* Image */}
            <div style={{ position: "relative", height: 300, overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selectedDish.img} alt={selectedDish.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,hsl(36,22%,90%) 0%,transparent 50%)" }} />
              {/* Badge */}
              <div style={{ position: "absolute", top: 16, right: 16, padding: "6px 14px", background: "hsl(38,28%,94%,.82)", backdropFilter: "blur(8px)", border: "1px solid hsl(30,18%,82%,.2)", borderRadius: 99, fontFamily: "'DM Mono',monospace", fontSize: ".625rem", letterSpacing: ".14em", textTransform: "uppercase", color: selectedDish.badgeColor }}>{selectedDish.badge}</div>
              {/* Close button */}
              <button
                onClick={() => setSelectedDish(null)}
                style={{ position: "absolute", top: 16, left: 16, width: 36, height: 36, borderRadius: "50%", background: "hsl(38,28%,94%,.72)", border: "1px solid hsl(30,18%,82%,.15)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "hsl(var(--pale))", transition: "background .2s" }}
                onMouseOver={e => ((e.currentTarget as HTMLButtonElement).style.background = "hsl(38,30%,97%)")}
                onMouseOut={e => ((e.currentTarget as HTMLButtonElement).style.background = "hsl(38,28%,94%,.72)")}
                aria-label="סגור"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>

            {/* Content */}
            <div style={{ padding: "28px 32px 36px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 16 }}>
                <h2 style={{ fontFamily: "'Noto Serif Hebrew',serif", fontWeight: 400, fontSize: "1.75rem", letterSpacing: "-.03em", color: "hsl(var(--cream))", lineHeight: 1.15, margin: 0 }}>{selectedDish.name}</h2>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "2rem", letterSpacing: "-.04em", color: "hsl(var(--gold))", whiteSpace: "nowrap", lineHeight: 1 }}>{selectedDish.price}</span>
              </div>
              <div style={{ width: 40, height: 1, background: "hsl(30,18%,82%,.2)", marginBottom: 16 }} />
              <p style={{ fontSize: "1.0625rem", color: "hsl(var(--subtle))", lineHeight: 1.75, margin: 0 }}>{selectedDish.desc}</p>

              <div style={{ marginTop: 28, padding: "16px 20px", background: "hsl(36,28%,92%,.04)", border: "1px solid hsl(36,28%,92%,.08)", borderRadius: 10, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "hsl(var(--sage))", boxShadow: "0 0 8px hsl(28,62%,42%,.4)", flexShrink: 0 }} />
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".6875rem", letterSpacing: ".12em", color: "hsl(var(--dim))", textTransform: "uppercase" }}>זמין לצפייה בתלת-מימד ו-AR</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ HEADER — Pill glassmorphism 2026 ═══ */}
      <header id="site-header" style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", zIndex: 50, width: "calc(100% - 48px)", maxWidth: 1100, animation: "navPill .6s cubic-bezier(.16,1,.3,1) both", direction: "rtl" }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 16px 10px 20px",
          background: "hsl(38,28%,94%,.75)",
          backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          border: "1px solid hsl(30,18%,82%,.5)",
          borderRadius: 14,
          boxShadow: "0 8px 32px rgba(0,0,0,.4), inset 0 1px 0 hsl(30,18%,82%,.3)",
          transition: "background .4s, border-color .4s",
        }}>

          {/* ── Logo ── */}
          <Link href="/" className="logo-hover" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
            <LogoWordmark width={140} />
          </Link>

          {/* ── Nav centre ── */}
          <nav className="home-nav-center" style={{ display: "flex", gap: 2, alignItems: "center" }}>
            {[["#features","תכונות"],["#gallery","גלריה"],["#pricing","מחירים"],["#","הדגמה"]].map(([href, label]) => (
              <a key={href} href={href} style={{
                padding: "7px 14px",
                textDecoration: "none",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".875rem", fontWeight: 400,
                color: "hsl(24,12%,38%)",
                letterSpacing: "-.01em",
                borderRadius: 8,
                transition: "color .2s, background .2s",
              }}
                onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; (e.currentTarget as HTMLAnchorElement).style.background = "hsl(32,20%,100%,.06)"; }}
                onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.color = "hsl(24,12%,38%)"; (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
              >{label}</a>
            ))}
          </nav>

          {/* ── Actions droite ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <Link href="/login" transitionTypes={['nav-forward']} className="home-nav-login" style={{
              padding: "7px 14px",
              textDecoration: "none",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: ".875rem", fontWeight: 400,
              color: "hsl(24,12%,38%)",
              letterSpacing: "-.01em",
              transition: "color .2s",
            }}
              onMouseOver={e => (e.currentTarget.style.color = "#fff")}
              onMouseOut={e => (e.currentTarget.style.color = "hsl(24,12%,38%)")}
            >כניסה</Link>

            <Link href="/signup" transitionTypes={['nav-forward']} style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "9px 20px",
              background: "linear-gradient(135deg, hsl(28,62%,38%) 0%, hsl(22,70%,50%) 100%)",
              color: "#fff",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: ".875rem", fontWeight: 600,
              letterSpacing: "-.01em",
              borderRadius: 8,
              textDecoration: "none",
              boxShadow: "0 2px 16px hsl(28,62%,38%,.4), inset 0 1px 0 rgba(255,255,255,.18)",
              transition: "filter .2s, transform .18s, box-shadow .2s",
            }}
              onMouseOver={e => {
                (e.currentTarget as HTMLAnchorElement).style.filter = "brightness(1.12)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 28px hsl(28,62%,38%,.5), inset 0 1px 0 rgba(255,255,255,.18)";
              }}
              onMouseOut={e => {
                (e.currentTarget as HTMLAnchorElement).style.filter = "";
                (e.currentTarget as HTMLAnchorElement).style.transform = "";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 16px hsl(28,62%,38%,.4), inset 0 1px 0 rgba(255,255,255,.18)";
              }}
            >התחל בחינם</Link>
          </div>
        </div>
      </header>

      {/* ═══ HERO ═══ */}
      <section style={{ paddingTop: 120, paddingBottom: 60, position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", background: "hsl(38,28%,94%)" }}>
        {/* Aurora background */}
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          {/* Grid lines */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(hsl(32,20%,100%,.045) 1px,transparent 1px),linear-gradient(90deg,hsl(32,20%,100%,.045) 1px,transparent 1px)", backgroundSize: "72px 72px", maskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, transparent 100%)" }} />
          {/* Aurora blobs */}
          <div style={{ position: "absolute", top: "-10%", left: "15%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle,hsl(28,62%,42%,.15) 0%,transparent 60%)", filter: "blur(80px)", animation: "aurora1 9s ease-in-out infinite" }} />
          <div style={{ position: "absolute", top: "25%", right: "-8%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,hsl(36,80%,55%,.12) 0%,transparent 60%)", filter: "blur(100px)", animation: "aurora2 11s ease-in-out infinite" }} />
          <div style={{ position: "absolute", bottom: "-15%", left: "-5%", width: 700, height: 500, borderRadius: "50%", background: "radial-gradient(circle,hsl(40,50%,80%,.1) 0%,transparent 60%)", filter: "blur(120px)", animation: "aurora3 13s ease-in-out infinite" }} />
          {/* Vignette bas */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 200, background: "linear-gradient(to bottom, transparent, hsl(38,28%,94%))" }} />
        </div>

        <div className="page-section-inner" style={{ maxWidth: 1320, margin: "0 auto", padding: "0 56px", width: "100%", position: "relative", zIndex: 3, direction: "rtl", textAlign: "center" }}>

          {/* ══ HERO ÉDITORIAL ══ */}

          {/* Badge social proof */}
          <div className="hero-fade-a" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px 6px 12px", background: "hsl(28,62%,42%,.1)", border: "1px solid hsl(28,62%,42%,.22)", borderRadius: 99, marginBottom: 36 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "hsl(var(--sage))", flexShrink: 0, animation: "badgeDot 2.2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".8125rem", color: "hsl(28,62%,58%)", fontWeight: 500 }}>+200 מסעדות כבר משתמשות בפלטפורמה</span>
          </div>

          {/* Titre */}
          <div style={{ overflow: "visible", marginBottom: 20 }}>
            <div style={{ overflow: "hidden" }}>
              <h1 className="hero-fade-b" style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: "clamp(48px, 7vw, 108px)",
                lineHeight: .92,
                letterSpacing: "-.03em",
                margin: 0,
                padding: "4px 0 6px",
                color: "hsl(24,18%,16%)",
                display: "block",
              }}>
                תפריט שגורם
              </h1>
            </div>

            <div style={{ overflow: "hidden" }}>
              <h1 className="hero-fade-c" style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: "clamp(40px, 6vw, 92px)",
                lineHeight: .92,
                letterSpacing: "-.02em",
                margin: 0,
                padding: "4px 0 6px",
                background: "linear-gradient(135deg, hsl(28,62%,42%), hsl(22,70%,56%), hsl(28,58%,42%))",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "fadeUp .7s cubic-bezier(.16,1,.3,1) .3s both, goldShimmer 6s ease-in-out 1s infinite",
                display: "block",
              }}>
                ללקוחות להזמין יותר
              </h1>
            </div>
          </div>

          {/* Description */}
          <p className="hero-fade-d" style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "hsl(24,12%,38%)", maxWidth: 480, margin: "0 auto 0" }}>
            הלקוח סורק QR, רואה את המנה בתלת-מימד ומזמין בביטחון.<br />
            ללא אפליקציה. ללא הורדה.
          </p>

          {/* ── PRÉSENTOIR 3D — carte cream + AR + 3D + QR (inspiré Gemini mockup) ── */}
          <div style={{ width: "100%", marginTop: 16 }}>
            <HeroShowcase
              models={MODELS}
              modelIdx={modelIdx}
              onPrev={prev}
              onNext={next}
              onSelect={setModelIdx}
            />
          </div>

          {/* CTA sous le modèle */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 32 }}>
              <Link href="/signup" transitionTypes={["nav-forward"]} style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 32px",
                background: "linear-gradient(135deg, hsl(28,62%,38%), hsl(22,70%,50%))",
                color: "#fff",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".9375rem", fontWeight: 600,
                letterSpacing: "-.01em",
                borderRadius: 10,
                textDecoration: "none",
                boxShadow: "0 4px 24px hsl(28,62%,38%,.4), inset 0 1px 0 rgba(255,255,255,.18)",
                transition: "filter .2s,transform .18s,box-shadow .2s",
              }}
                onMouseOver={e => {
                  (e.currentTarget as HTMLAnchorElement).style.filter = "brightness(1.1)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 32px hsl(28,62%,38%,.5), inset 0 1px 0 rgba(255,255,255,.18)";
                }}
                onMouseOut={e => {
                  (e.currentTarget as HTMLAnchorElement).style.filter = "";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 24px hsl(28,62%,38%,.4), inset 0 1px 0 rgba(255,255,255,.18)";
                }}
              >
                התחל בחינם
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </Link>
              <a href="#features" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 28px",
                background: "hsl(32,20%,100%,.06)",
                color: "hsl(24,12%,38%)",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".9375rem", fontWeight: 500,
                letterSpacing: "-.01em",
                border: "1px solid hsl(32,20%,100%,.1)",
                borderRadius: 10,
                textDecoration: "none",
                backdropFilter: "blur(8px)",
                transition: "border-color .2s,color .2s,background .2s",
              }}
                onMouseOver={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "hsl(28,62%,42%,.35)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                  (e.currentTarget as HTMLAnchorElement).style.background = "hsl(28,62%,42%,.08)";
                }}
                onMouseOut={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "hsl(32,20%,100%,.1)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "hsl(24,12%,38%)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "hsl(32,20%,100%,.06)";
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                ראה הדגמה
              </a>
            </div>

            {/* Social proof */}
            <div className="hero-fade-f" style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 28, justifyContent: "center" }}>
              <div style={{ display: "flex" }}>
                {["hsl(28,60%,55%)","hsl(200,60%,55%)","hsl(140,50%,50%)","hsl(280,50%,60%)","hsl(0,60%,60%)"].map((c, i) => (
                  <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", background: c, border: "2px solid hsl(38,28%,94%)", marginLeft: i === 0 ? 0 : -7, flexShrink: 0 }} />
                ))}
              </div>
              <div style={{ width: 1, height: 24, background: "hsl(32,20%,100%,.1)" }} />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
                <div style={{ display: "flex", gap: 2 }}>
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="hsl(22,70%,50%)"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  ))}
                </div>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".75rem", color: "hsl(24,12%,38%)" }}>מדורג 4.9/5 על ידי 200+ מסעדות</span>
              </div>
            </div>

        </div>
      </section>


      {/* ═══ STATS ═══ */}
      <section style={{ padding: "96px 0", background: "hsl(30,20%,87%)", borderTop: "1px solid hsl(30,18%,80%)", borderBottom: "1px solid hsl(30,18%,80%)", position: "relative" }}>
        <div aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 900, height: 400, background: "radial-gradient(ellipse,hsl(28,62%,42%,.06) 0%,transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div className="page-section-inner" style={{ maxWidth: 1320, margin: "0 auto", padding: "0 56px", direction: "rtl" }}>

          {/* Eyebrow + Titre */}
          <div className="reveal" style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 32, height: 1, background: "hsl(28,62%,42%,.35)" }} />
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".6875rem", letterSpacing: ".18em", textTransform: "uppercase", color: "hsl(28,62%,42%)", fontWeight: 500 }}>מספרים שמדברים</span>
              <div style={{ width: 32, height: 1, background: "hsl(28,62%,42%,.35)" }} />
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,4vw,2.75rem)", fontWeight: 600, color: "hsl(24,18%,16%)", lineHeight: 1.1, margin: 0 }}>
              המסעדות שבחרו{" "}
              <em style={{ color: "hsl(28,62%,42%)", fontStyle: "italic" }}>PLATFORME</em>{" "}
              מרוויחות יותר
            </h2>
          </div>

          {/* Grille stats */}
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "hsl(30,18%,88%)" }}>
            {[
              { num: "+200",   label: "מסעדות פעילות",  sub: "לקוחות ברחבי הארץ משתמשים בפלטפורמה בכל יום",    badge: "+40% השנה" },
              { num: "×3.2",   label: "יותר הזמנות",    sub: "בממוצע בהשוואה לתפריט נייר רגיל",                badge: "מוכח בנתונים" },
              { num: "<0.8s",  label: "זמן טעינה",      sub: "התפריט נפתח מיידית — ללא אפליקציה, ללא המתנה",   badge: "ביצועים גבוהים" },
              { num: "98%",    label: "שביעות רצון",    sub: "מהלקוחות ממשיכים לאחר תקופת הניסיון",            badge: "retention rate" },
            ].map((s, i) => (
              <div key={i} className="reveal" data-delay={String(i * 80)}
                style={{ background: "hsl(38,28%,94%)", padding: "40px 32px", display: "flex", flexDirection: "column", gap: 10, position: "relative", overflow: "hidden", transition: "background .2s", cursor: "default" }}
                onMouseOver={e => (e.currentTarget as HTMLDivElement).style.background = "hsl(36,22%,90%)"}
                onMouseOut={e => (e.currentTarget as HTMLDivElement).style.background = "hsl(38,28%,94%)"}>
                {/* Barre supérieure orange */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, hsl(28,62%,42%), hsl(22,70%,50%))" }} />
                {/* Chiffre — DM Sans 800 */}
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "3.75rem", fontWeight: 800, color: "hsl(24,18%,16%)", lineHeight: 1, letterSpacing: "-.04em" }}>{s.num}</div>
                {/* Label */}
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", fontWeight: 500, color: "hsl(24,18%,16%)" }}>{s.label}</div>
                {/* Description */}
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".8125rem", color: "hsl(24,12%,38%)", lineHeight: 1.55, flexGrow: 1 }}>{s.sub}</div>
                {/* Badge bas */}
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid hsl(30,18%,88%)", display: "flex", alignItems: "center", gap: 6 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="hsl(28,62%,42%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                    <polyline points="17 6 23 6 23 12"/>
                  </svg>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".75rem", color: "hsl(28,62%,42%)" }}>{s.badge}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══ FEATURES — 3 cards grid 2026 ═══ */}
      <section id="features" style={{ padding: "120px 0 140px", background: "hsl(38,30%,97%)", borderTop: "1px solid hsl(30,18%,86%)", position: "relative", scrollMarginTop: 80, overflow: "hidden" }}>

        {/* Ambient glow */}
        <div aria-hidden style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: 800, height: 400, background: "radial-gradient(ellipse,hsl(28,62%,42%,.06) 0%,transparent 65%)", filter: "blur(60px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px", direction: "rtl" }}>

          {/* Header */}
          <div className="reveal" style={{ textAlign: "center", marginBottom: 72 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "hsl(28,62%,42%,.08)", border: "1px solid hsl(28,62%,42%,.18)", borderRadius: 99, padding: "6px 18px", marginBottom: 24 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "hsl(28,62%,42%)" }} />
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase" as const, color: "hsl(28,62%,42%)" }}>השיטה</span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.2rem,4.5vw,3.5rem)", fontWeight: 700, color: "hsl(24,18%,16%)", lineHeight: 1.05, letterSpacing: "-.02em", margin: 0 }}>
              שלושה שלבים.{" "}
              <em style={{ color: "hsl(28,62%,42%)", fontStyle: "italic" }}>מהפכה גסטרונומית.</em>
            </h2>
          </div>

          {/* 3 cards */}
          <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>

            {/* Card 1 — QR Scan */}
            <div className="reveal" data-delay="0" style={{ background: "linear-gradient(135deg,hsl(38,30%,97%),hsl(36,22%,93%))", border: "1px solid hsl(30,18%,82%,.5)", borderRadius: 20, padding: "36px 32px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, hsl(28,62%,42%), hsl(22,70%,50%))" }} />
              {/* Big number bg */}
              <div style={{ position: "absolute", top: 12, left: 20, fontFamily: "'DM Sans',sans-serif", fontSize: 72, fontWeight: 800, color: "hsl(28,62%,42%,.18)", lineHeight: 1, letterSpacing: "-.04em", userSelect: "none" as const }}>01</div>
              {/* Icon */}
              <div style={{ width: 52, height: 52, background: "linear-gradient(135deg,hsl(28,62%,42%,.12),hsl(22,70%,50%,.08))", border: "1px solid hsl(28,62%,42%,.3)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(28,62%,42%)" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                  <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="3" height="3" rx=".5"/>
                </svg>
              </div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" as const, color: "hsl(28,62%,42%)", marginBottom: 10 }}>סריקה</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 700, color: "hsl(24,18%,16%)", lineHeight: 1.1, marginBottom: 12 }}>הלקוח מכוון,<br />התפריט נפתח</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".9rem", color: "hsl(24,12%,32%)", lineHeight: 1.65, marginBottom: 24 }}>קוד QR אישי. תוך 0.8 שניות נפתח תפריט ישירות בדפדפן — ללא אפליקציה, ללא הורדה.</p>
              {/* Mini mockup */}
              <div style={{ background: "hsl(38,28%,94%)", border: "1px solid hsl(30,18%,82%,.3)", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 38, height: 38, background: "hsl(38,30%,97%)", borderRadius: 8, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, padding: 7, flexShrink: 0 }}>
                  <div style={{ background: "hsl(36,28%,80%)", borderRadius: 2 }} />
                  <div style={{ background: "hsl(36,28%,80%)", borderRadius: 2 }} />
                  <div style={{ background: "hsl(36,28%,80%)", borderRadius: 2 }} />
                  <div style={{ background: "hsl(28,62%,42%)", borderRadius: 2 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".8rem", fontWeight: 600, color: "hsl(24,18%,16%)" }}>תפריט נפתח</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".7rem", color: "hsl(28,8%,50%)" }}>0.8s · ללא הורדה</div>
                </div>
                <div style={{ background: "hsl(140,60%,45%,.15)", border: "1px solid hsl(140,60%,45%,.3)", borderRadius: 6, padding: "3px 8px", fontFamily: "'DM Sans',sans-serif", fontSize: ".7rem", color: "hsl(140,60%,60%)", flexShrink: 0 }}>✓ פעיל</div>
              </div>
            </div>

            {/* Card 2 — 3D AR */}
            <div className="reveal" data-delay="120" style={{ background: "linear-gradient(135deg,hsl(38,30%,97%),hsl(36,22%,93%))", border: "1px solid hsl(30,18%,82%,.5)", borderRadius: 20, padding: "36px 32px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,hsl(36,80%,58%),hsl(28,62%,42%))" }} />
              <div style={{ position: "absolute", top: 12, left: 20, fontFamily: "'DM Sans',sans-serif", fontSize: 72, fontWeight: 800, color: "hsl(28,62%,42%,.18)", lineHeight: 1, letterSpacing: "-.04em", userSelect: "none" as const }}>02</div>
              <div style={{ width: 52, height: 52, background: "linear-gradient(135deg,hsl(36,80%,55%,.15),hsl(28,62%,42%,.1))", border: "1px solid hsl(36,80%,55%,.25)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(36,80%,62%)" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" x2="12" y1="22.08" y2="12"/>
                </svg>
              </div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" as const, color: "hsl(36,80%,62%)", marginBottom: 10 }}>AR תלת-מימד</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 700, color: "hsl(24,18%,16%)", lineHeight: 1.1, marginBottom: 12 }}>המנה על<br />השולחן, ב-AR</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".9rem", color: "hsl(24,12%,32%)", lineHeight: 1.65, marginBottom: 24 }}>iPhone ו-Android מציגים את המנה במציאות רבודה. כל מנה — לפני ההזמנה.</p>
              <div style={{ background: "hsl(38,28%,94%)", border: "1px solid hsl(30,18%,82%,.3)", borderRadius: 12, padding: "14px 16px", textAlign: "center" as const }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "hsl(36,80%,55%,.1)", border: "1px solid hsl(36,80%,55%,.2)", borderRadius: 8, padding: "8px 16px", marginBottom: 10 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(36,80%,62%)" strokeWidth="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  </svg>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".8rem", color: "hsl(28,62%,42%)", fontWeight: 600 }}>360° AR Mode</span>
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".75rem", color: "hsl(28,8%,50%)" }}>iPhone ✓</span>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".75rem", color: "hsl(28,8%,50%)" }}>Android ✓</span>
                </div>
              </div>
            </div>

            {/* Card 3 — Analytics */}
            <div className="reveal" data-delay="240" style={{ background: "linear-gradient(135deg,hsl(38,30%,97%),hsl(36,22%,93%))", border: "1px solid hsl(30,18%,82%,.5)", borderRadius: 20, padding: "36px 32px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,hsl(140,60%,45%),hsl(28,62%,42%))" }} />
              <div style={{ position: "absolute", top: 12, left: 20, fontFamily: "'DM Sans',sans-serif", fontSize: 72, fontWeight: 800, color: "hsl(28,62%,42%,.18)", lineHeight: 1, letterSpacing: "-.04em", userSelect: "none" as const }}>03</div>
              <div style={{ width: 52, height: 52, background: "linear-gradient(135deg,hsl(140,60%,45%,.15),hsl(28,62%,42%,.1))", border: "1px solid hsl(140,60%,45%,.25)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(140,60%,55%)" strokeWidth="2">
                  <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                </svg>
              </div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" as const, color: "hsl(140,60%,55%)", marginBottom: 10 }}>אנליטיקה</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 700, color: "hsl(24,18%,16%)", lineHeight: 1.1, marginBottom: 12 }}>+30% הזמנות<br />נמדדו</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".9rem", color: "hsl(24,12%,32%)", lineHeight: 1.65, marginBottom: 24 }}>שולחנות שסורקים ממירים ×3.4 יותר. אנליטיקה בזמן אמת: צפיות, המרות, מנות פופולריות.</p>
              <div style={{ background: "hsl(38,28%,94%)", border: "1px solid hsl(30,18%,82%,.3)", borderRadius: 12, padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 48, marginBottom: 8 }}>
                  {[30, 50, 40, 65, 55, 80, 100].map((h, i) => (
                    <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 6 ? "hsl(28,62%,42%)" : `hsl(28,62%,42%,${0.15 + i * 0.11})`, borderRadius: "3px 3px 0 0" }} />
                  ))}
                </div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".72rem", color: "hsl(28,8%,45%)", textAlign: "center" as const }}>הזמנות — 7 ימים אחרונים ↑</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ GALLERY ═══ */}
      <section id="gallery" style={{ padding: "120px 0 140px", background: "hsl(38,28%,94%)", borderTop: "1px solid hsl(30,18%,86%)", scrollMarginTop: 80, position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: 700, height: 300, background: "radial-gradient(ellipse,hsl(28,62%,42%,.05) 0%,transparent 65%)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px", direction: "rtl" }}>

          {/* Header centré */}
          <div className="reveal" style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "hsl(28,62%,42%,.08)", border: "1px solid hsl(28,62%,42%,.18)", borderRadius: 99, padding: "6px 18px", marginBottom: 24 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "hsl(28,62%,42%)" }} />
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase" as const, color: "hsl(28,62%,42%)" }}>הגלריה</span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.2rem,4.5vw,3.5rem)", fontWeight: 700, color: "hsl(24,18%,16%)", lineHeight: 1.05, letterSpacing: "-.02em", margin: "0 0 16px" }}>
              כל מנה,{" "}
              <em style={{ color: "hsl(28,62%,42%)", fontStyle: "italic" }}>בשלושה ממדים</em>
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", color: "hsl(24,12%,38%)", maxWidth: 420, margin: "0 auto", lineHeight: 1.7 }}>הלקוחות רואים את המנה לפני שמזמינים. AR תואם iPhone ו-Android, ללא אפליקציה.</p>
          </div>

          {/* Filter tabs */}
          {(() => {
            const galleryDishes = [
              { img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&h=440&fit=crop&q=80", name: "בשר אנגוס", desc: "נתח אנגוס פרמיום על האש עם תוספת לבחירה — גריל פחמים, עשבי תיבול טריים, וסלסה בית. מוגש עם אחת מהתוספות העונתיות שלנו.", price: "₪148", badge: "3D · AR", badgeColor: "hsl(28,62%,42%)", cat: "בשר" },
              { img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=700&h=440&fit=crop&q=80", name: "פסטה ים", desc: "פסטה פתוחה עם פירות ים טריים — שרימפס, מולים ותמנון — ברוטב ויין לבן, שום ופרמז'ן. הכנה טרייה ב-20 דקות.", price: "₪89", badge: "וידאו", badgeColor: "hsl(36,80%,62%)", cat: "פסטה" },
              { img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&h=440&fit=crop&q=80", name: "סלט עונתי", desc: "תערובת עשבי תיבול טריים מהגינה שלנו עם גבינה צרפתית, אגוזי מלך קלויים ורוטב ביתי על בסיס שמן זית וחומץ תפוחים.", price: "₪54", badge: "3D", badgeColor: "hsl(140,60%,55%)", cat: "ירקות" },
              { img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=700&h=440&fit=crop&q=80", name: "יין אדום", desc: "בורדו עדין ועשיר משנת 2021 — פרי יומרני עם טאנינים מעודנים. בחירת הסומלייה החודש. מוגש במצב החדר האידיאלי של 16°.", price: "₪62", badge: "360°", badgeColor: "hsl(22,70%,50%)", cat: "שתייה" },
              { img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=700&h=440&fit=crop&q=80", name: "פונדאן שוקולד", desc: "עוגת שוקולד בלגי 72% חמה ונוזלית בפנים, מוגשת עם גלידת וניל מדגסקר וקרמל מלח ים. מומלץ לאכול מיד כשמגיע.", price: "₪44", badge: "AR", badgeColor: "hsl(28,62%,42%)", cat: "קינוח" },
              { img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&h=440&fit=crop&q=80", name: "אספרסו", desc: "בלנד אתיופי מיוחד — עם טעמי פרי יערות ופרחים — נקלה בקלייה בינונית כדי לשמר את הארומה. מוגש כפול כדיפולט.", price: "₪28", badge: "חי", badgeColor: "hsl(140,60%,55%)", cat: "שתייה" },
            ];
            return (
              <>
                <div className="reveal" style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 48, flexWrap: "wrap" as const }}>
                  {["הכל","בשר","פסטה","ירקות","קינוח","שתייה"].map((t, ti) => (
                    <div key={t} style={{
                      fontFamily: "'DM Sans',sans-serif", fontSize: ".85rem", fontWeight: ti === 0 ? 600 : 400,
                      padding: "8px 18px", borderRadius: 99,
                      border: `1px solid ${ti === 0 ? "hsl(28,62%,42%)" : "hsl(30,18%,82%,.5)"}`,
                      background: ti === 0 ? "hsl(28,62%,42%,.1)" : "transparent",
                      color: ti === 0 ? "hsl(28,62%,42%)" : "hsl(28,8%,55%)",
                      cursor: "pointer",
                    }}>{t}</div>
                  ))}
                </div>

                {/* Cards grid */}
                <div className="gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
                  {galleryDishes.map((d, i) => (
                    <div
                      key={i}
                      className="reveal"
                      data-delay={String((i % 3) * 80)}
                      onClick={() => setSelectedDish(d)}
                      style={{ background: "hsl(38,30%,97%)", border: "1px solid hsl(30,18%,82%,.5)", borderRadius: 16, overflow: "hidden", cursor: "pointer", transition: "border-color .25s, transform .25s, box-shadow .25s" }}
                      onMouseOver={e => {
                        const el = e.currentTarget as HTMLDivElement;
                        el.style.borderColor = "hsl(28,62%,42%,.3)";
                        el.style.transform = "translateY(-4px)";
                        el.style.boxShadow = "0 16px 40px rgba(0,0,0,.4)";
                      }}
                      onMouseOut={e => {
                        const el = e.currentTarget as HTMLDivElement;
                        el.style.borderColor = "hsl(30,18%,82%,.5)";
                        el.style.transform = "";
                        el.style.boxShadow = "";
                      }}
                    >
                      {/* Image */}
                      <div style={{ height: 220, overflow: "hidden", position: "relative" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={d.img}
                          alt={d.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .6s cubic-bezier(.16,1,.3,1)" }}
                          onMouseOver={e => (e.currentTarget.style.transform = "scale(1.06)")}
                          onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
                          loading="lazy"
                        />
                        {/* Gradient overlay bottom */}
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 50%,hsl(24,18%,16%,.4) 100%)" }} />
                        {/* Badge */}
                        <div style={{ position: "absolute", top: 12, right: 12, padding: "4px 10px", background: "hsl(38,28%,94%,.85)", backdropFilter: "blur(8px)", border: `1px solid ${d.badgeColor.replace("hsl(", "hsl(").replace(")", ", .3)")}`, borderRadius: 99, fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, color: d.badgeColor }}>{d.badge}</div>
                      </div>
                      {/* Info */}
                      <div style={{ padding: "16px 18px 20px", direction: "rtl" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.25rem", fontWeight: 700, color: "hsl(24,18%,16%)" }}>{d.name}</span>
                          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", fontWeight: 700, color: "hsl(28,62%,42%)" }}>{d.price}</span>
                        </div>
                        <div style={{ display: "inline-block", background: "hsl(36,22%,92%)", border: "1px solid hsl(30,18%,80%)", borderRadius: 99, padding: "2px 10px", fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "hsl(28,8%,50%)" }}>{d.cat}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            );
          })()}

          {/* Footer note */}
          <div style={{ textAlign: "center", marginTop: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, fontFamily: "'DM Sans',sans-serif", fontSize: ".82rem", color: "hsl(28,8%,40%)" }}>
              <div style={{ height: 1, width: 48, background: "hsl(30,18%,82%,.5)" }} />
              מודלים תלת-מימדיים · GLTF/GLB · פורמטים שלנו
              <div style={{ height: 1, width: 48, background: "hsl(30,18%,82%,.5)" }} />
            </div>
          </div>

        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" style={{ padding: "120px 0 140px", background: "hsl(38,30%,97%)", borderTop: "1px solid hsl(30,18%,86%)", scrollMarginTop: 80, position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 800, height: 400, background: "radial-gradient(ellipse,hsl(28,62%,42%,.06) 0%,transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 24px", direction: "rtl" }}>

          {/* Header centré */}
          <div className="reveal" style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "hsl(28,62%,42%,.08)", border: "1px solid hsl(28,62%,42%,.18)", borderRadius: 99, padding: "6px 18px", marginBottom: 24 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "hsl(28,62%,42%)" }} />
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase" as const, color: "hsl(28,62%,42%)" }}>מחירים</span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.2rem,4.5vw,3.5rem)", fontWeight: 700, color: "hsl(24,18%,16%)", lineHeight: 1.05, letterSpacing: "-.02em", margin: "0 0 20px" }}>
              שלוש תוכניות.{" "}
              <em style={{ color: "hsl(28,62%,42%)", fontStyle: "italic" }}>אפס הפתעות.</em>
            </h2>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "hsl(28,62%,42%,.07)", border: "1px solid hsl(28,62%,42%,.2)", borderRadius: 99, padding: "8px 20px" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "hsl(28,62%,42%)", boxShadow: "0 0 8px hsl(28,62%,42%,.35)", animation: "pulseGlow 2.5s ease-in-out infinite" }} />
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".82rem", fontWeight: 600, color: "hsl(28,62%,42%)" }}>חודש ראשון מתנה לכל תוכנית</span>
            </div>
          </div>

          {/* 3 cards */}
          <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, alignItems: "center" }}>

            {/* Starter */}
            <div className="reveal" style={{ background: "hsl(38,30%,97%)", border: "1px solid hsl(30,18%,82%,.5)", borderRadius: 20, overflow: "hidden", position: "relative" }}>
              <div style={{ height: 2, background: "hsl(30,18%,82%,.3)" }} />
              <div style={{ position: "absolute", top: 16, left: 16, background: "hsl(142,52%,44%,.12)", border: "1px solid hsl(142,52%,44%,.3)", borderRadius: 8, padding: "4px 10px", fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, color: "hsl(142,52%,36%)", letterSpacing: ".06em" }}>חינם</div>
              <div style={{ padding: "28px 28px 24px", borderBottom: "1px solid hsl(30,18%,82%,.3)" }}>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase" as const, color: "hsl(28,8%,50%)", marginBottom: 16 }}>I · טעימה</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: "3.25rem", letterSpacing: "-.04em", color: "hsl(24,18%,16%)", lineHeight: 1 }}>
                  ₪0<span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".85rem", fontWeight: 400, color: "hsl(24,12%,38%)", letterSpacing: 0 }}>/חודש</span>
                </div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".8rem", color: "hsl(28,8%,42%)", marginTop: 6 }}>כניסה לעולם</div>
              </div>
              <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column" as const, gap: 12, marginBottom: 4 }}>
                {["תפריט דיגיטלי מלא","קוד QR אישי","עד 30 מנות","2 שפות"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, direction: "rtl" as const }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(28,8%,45%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".9rem", color: "hsl(24,12%,38%)" }}>{f}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: "0 28px 28px" }}>
                <Link href="/signup" transitionTypes={["nav-forward"]} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "13px 24px", background: "transparent", border: "1px solid hsl(30,18%,78%)", borderRadius: 10, fontFamily: "'DM Sans',sans-serif", fontSize: ".9rem", fontWeight: 600, color: "hsl(24,12%,38%)", textDecoration: "none", transition: "border-color .2s,color .2s,background .2s" }}
                  onMouseOver={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "hsl(28,62%,42%,.5)"; el.style.color = "hsl(28,62%,42%)"; }}
                  onMouseOut={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "hsl(30,18%,78%)"; el.style.color = "hsl(24,12%,38%)"; }}
                >בחר תוכנית</Link>
              </div>
            </div>

            {/* Popular — highlighted */}
            <div className="reveal" data-delay="100" style={{ background: "linear-gradient(180deg,hsl(38,30%,97%),hsl(36,22%,90%))", border: "1px solid hsl(28,62%,42%,.4)", borderRadius: 20, overflow: "hidden", position: "relative", transform: "scale(1.04)", boxShadow: "0 0 0 1px hsl(28,62%,42%,.08), 0 24px 64px -16px rgba(0,0,0,.12)" }}>
              <div style={{ height: 2, background: "linear-gradient(90deg, hsl(28,62%,42%), hsl(22,70%,50%))" }} />
              <div style={{ position: "absolute", top: 16, left: 16, background: "hsl(28,62%,42%,.1)", border: "1px solid hsl(28,62%,42%,.3)", borderRadius: 99, padding: "4px 12px", fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, color: "hsl(28,62%,42%)", letterSpacing: ".06em" }}>✦ מומלץ</div>
              <div style={{ padding: "28px 28px 24px", borderBottom: "1px solid hsl(28,62%,42%,.1)" }}>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase" as const, color: "hsl(28,62%,42%)", marginBottom: 16 }}>II · המנה העיקרית</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: "3.25rem", letterSpacing: "-.04em", color: "hsl(28,62%,42%)", lineHeight: 1 }}>
                  ₪149<span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".85rem", fontWeight: 400, color: "hsl(28,48%,38%)", letterSpacing: 0 }}>/חודש</span>
                </div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".8rem", color: "hsl(28,48%,36%)", marginTop: 6 }}>הבחירה הפופולרית</div>
              </div>
              <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column" as const, gap: 12, marginBottom: 4 }}>
                {["מנות ללא הגבלה","וידאו לכל מנה","3 שפות + תרגום","אנליטיקה מתקדמת","תמיכה מועדפת"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, direction: "rtl" as const }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(28,62%,42%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".9rem", color: "hsl(24,18%,16%)" }}>{f}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: "0 28px 28px" }}>
                <Link href="/signup" transitionTypes={["nav-forward"]} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "13px 24px", background: "linear-gradient(135deg, hsl(28,62%,38%), hsl(22,70%,50%))", borderRadius: 10, fontFamily: "'DM Sans',sans-serif", fontSize: ".9rem", fontWeight: 600, color: "#fff", textDecoration: "none", boxShadow: "0 4px 20px hsl(28,62%,42%,.3)", transition: "transform .2s,box-shadow .2s" }}
                  onMouseOver={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 8px 32px hsl(28,62%,42%,.4)"; }}
                  onMouseOut={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = ""; el.style.boxShadow = "0 4px 20px hsl(28,62%,42%,.3)"; }}
                >בחר תוכנית</Link>
              </div>
            </div>

            {/* Enterprise */}
            <div className="reveal" data-delay="200" style={{ background: "hsl(38,30%,97%)", border: "1px solid hsl(30,18%,82%,.5)", borderRadius: 20, overflow: "hidden", position: "relative" }}>
              <div style={{ height: 2, background: "hsl(30,18%,82%,.3)" }} />
              <div style={{ padding: "28px 28px 24px", borderBottom: "1px solid hsl(30,18%,82%,.3)" }}>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase" as const, color: "hsl(28,8%,50%)", marginBottom: 16 }}>III · דגוסטציון</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: "3.25rem", letterSpacing: "-.04em", color: "hsl(24,18%,16%)", lineHeight: 1 }}>
                  ₪349<span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".85rem", fontWeight: 400, color: "hsl(24,12%,38%)", letterSpacing: 0 }}>/חודש</span>
                </div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".8rem", color: "hsl(28,8%,42%)", marginTop: 6 }}>חוויה מלאה</div>
              </div>
              <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column" as const, gap: 12, marginBottom: 4 }}>
                {["תלת-מימד לכל המנות","מציאות רבודה (AR)","מיתוג מותאם אישית","ייעוץ אישי חודשי"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, direction: "rtl" as const }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(28,8%,45%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".9rem", color: "hsl(24,12%,38%)" }}>{f}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: "0 28px 28px" }}>
                <Link href="/signup" transitionTypes={["nav-forward"]} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "13px 24px", background: "transparent", border: "1px solid hsl(30,18%,78%)", borderRadius: 10, fontFamily: "'DM Sans',sans-serif", fontSize: ".9rem", fontWeight: 600, color: "hsl(24,12%,38%)", textDecoration: "none", transition: "border-color .2s,color .2s,background .2s" }}
                  onMouseOver={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "hsl(28,62%,42%,.5)"; el.style.color = "hsl(28,62%,42%)"; }}
                  onMouseOut={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "hsl(30,18%,78%)"; el.style.color = "hsl(24,12%,38%)"; }}
                >בחר תוכנית</Link>
              </div>
            </div>

          </div>

          <p style={{ textAlign: "center", marginTop: 40, fontFamily: "'DM Sans',sans-serif", fontSize: ".8rem", color: "hsl(28,8%,38%)" }}>כל המחירים בשקלים · לא כולל מע״מ · ללא התחייבות</p>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: "hsl(28,22%,14%)" }}>

        {/* CTA band */}
        <div style={{ borderBottom: "1px solid hsl(28,18%,22%)", padding: "80px 24px" }}>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", direction: "rtl" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "hsl(32,28%,92%)", lineHeight: 1.1, letterSpacing: "-.02em", marginBottom: 16 }}>
              מוכן להפוך את התפריט שלך<br />
              <em style={{ color: "hsl(28,62%,42%)", fontStyle: "italic" }}>לחוויה תלת-מימדית?</em>
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", color: "hsl(28,12%,62%)", lineHeight: 1.7, marginBottom: 36 }}>הצטרף ל-200+ מסעדות שכבר מגדילות את ההכנסות עם PLATFORME.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" as const }}>
              <Link href="/signup" transitionTypes={["nav-forward"]} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "linear-gradient(135deg, hsl(28,62%,38%), hsl(22,70%,50%))", borderRadius: 10, fontFamily: "'DM Sans',sans-serif", fontSize: ".9375rem", fontWeight: 600, color: "#fff", textDecoration: "none", boxShadow: "0 4px 24px hsl(28,62%,42%,.3)" }}>
                התחל בחינם
              </Link>
              <a href="mailto:hello@platforme.app" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "hsl(28,18%,22%)", border: "1px solid hsl(28,18%,32%)", borderRadius: 10, fontFamily: "'DM Sans',sans-serif", fontSize: ".9375rem", fontWeight: 500, color: "hsl(32,28%,88%)", textDecoration: "none" }}>
                דברו איתנו
              </a>
            </div>
          </div>
        </div>

        {/* Main footer content */}
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "64px 24px 0", direction: "rtl" }}>
          <div className="footer-links" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 56 }}>

            {/* Brand col */}
            <div>
              <div style={{ marginBottom: 16 }}>
                <Link href="/" className="logo-hover" style={{ display: "inline-block" }}>
                  <LogoWordmark width={130} />
                </Link>
              </div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".9rem", lineHeight: 1.75, color: "hsl(28,10%,55%)", marginBottom: 24 }}>
                פלטפורמת תפריטים תלת-מימד/AR למסעדות.<br />תל אביב · פריז.
              </p>
              {/* Social links */}
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { href: "#", label: "Instagram", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg> },
                  { href: "#", label: "LinkedIn", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="3"/><line x1="8" y1="11" x2="8" y2="16"/><line x1="8" y1="8" x2="8" y2="8.01"/><path d="M12 16v-5m4 5v-3a2 2 0 0 0-4 0"/></svg> },
                  { href: "mailto:hello@platforme.app", label: "Email", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg> },
                ].map(s => (
                  <a key={s.label} href={s.href} aria-label={s.label} style={{ width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", background: "hsl(28,18%,20%)", border: "1px solid hsl(28,18%,28%)", borderRadius: 8, color: "hsl(28,10%,60%)", textDecoration: "none", transition: "color .2s,border-color .2s,background .2s" }}
                    onMouseOver={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "hsl(28,62%,62%)"; el.style.borderColor = "hsl(28,62%,42%,.4)"; el.style.background = "hsl(28,18%,22%)"; }}
                    onMouseOut={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "hsl(28,10%,60%)"; el.style.borderColor = "hsl(28,18%,28%)"; el.style.background = "hsl(28,18%,20%)"; }}
                  >{s.icon}</a>
                ))}
              </div>
            </div>

            {/* Links cols */}
            {[
              { title: "מוצר", links: [["#features","תכונות"],["#gallery","גלריה"],["#pricing","מחירים"],["#","הדגמה"]] },
              { title: "חברה",  links: [["#","אודות"],["#","בלוג"],["#","שותפים"],["mailto:hello@platforme.app","צור קשר"]] },
              { title: "משפטי", links: [["#","תנאי שימוש"],["#","פרטיות"],["#","נגישות"]] },
            ].map(col => (
              <div key={col.title}>
                <span style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase" as const, color: "hsl(28,62%,42%)", marginBottom: 20 }}>{col.title}</span>
                <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
                  {col.links.map(([href, label]) => (
                    <a key={label} href={href} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".9rem", color: "hsl(28,10%,58%)", textDecoration: "none", transition: "color .2s" }}
                      onMouseOver={e => (e.currentTarget.style.color = "hsl(32,28%,88%)")}
                      onMouseOut={e => (e.currentTarget.style.color = "hsl(28,10%,58%)")}
                    >{label}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid hsl(28,18%,22%)", padding: "24px 0 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: 12 }}>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".8rem", color: "hsl(28,10%,48%)" }}>© 2025 PLATFORME · כל הזכויות שמורות</span>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".8rem", color: "hsl(28,10%,48%)" }}>נוצר באהבה <span style={{ color: "hsl(28,62%,42%)" }}>◆</span> בתל אביב</span>
          </div>
        </div>
      </footer>
    </div>
    </DirectionalTransition>
  );
}
