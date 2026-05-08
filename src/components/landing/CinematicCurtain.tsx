"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const WORD = "PLATFORME";

export function CinematicCurtain() {
  const curtainRef   = useRef<HTMLDivElement>(null);
  const panelTopRef  = useRef<HTMLDivElement>(null);
  const panelBotRef  = useRef<HTMLDivElement>(null);
  const lineTopRef   = useRef<HTMLDivElement>(null);
  const lineBotRef   = useRef<HTMLDivElement>(null);
  const haloRef      = useRef<HTMLDivElement>(null);
  // Un ref par lettre, indexé 0→8 = P→E
  const l0 = useRef<HTMLSpanElement>(null);
  const l1 = useRef<HTMLSpanElement>(null);
  const l2 = useRef<HTMLSpanElement>(null);
  const l3 = useRef<HTMLSpanElement>(null);
  const l4 = useRef<HTMLSpanElement>(null);
  const l5 = useRef<HTMLSpanElement>(null);
  const l6 = useRef<HTMLSpanElement>(null);
  const l7 = useRef<HTMLSpanElement>(null);
  const l8 = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const letters = [
      l0.current, l1.current, l2.current, l3.current, l4.current,
      l5.current, l6.current, l7.current, l8.current,
    ];

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    gsap.set(curtainRef.current,  { autoAlpha: 1 });
    gsap.set([panelTopRef.current, panelBotRef.current], { yPercent: 0 });
    gsap.set(lineTopRef.current,  { scaleX: 0, opacity: 0, transformOrigin: "center" });
    gsap.set(lineBotRef.current,  { scaleX: 0, opacity: 0, transformOrigin: "center" });
    gsap.set(haloRef.current,     { opacity: 0, scale: 0.7 });
    gsap.set(letters,             { opacity: 0, scaleY: 0.3, transformOrigin: "bottom center", filter: "blur(3px)" });

    // Phase 1 — logo apparaît
    tl.to(haloRef.current,    { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }, 0.3)
      .to(lineTopRef.current, { scaleX: 1, opacity: 1, duration: 0.7, ease: "power2.inOut" }, 0.4)
      .to(lineBotRef.current, { scaleX: 1, opacity: 1, duration: 0.7, ease: "power2.inOut" }, 0.5)
      .to(letters, {
        opacity: 1, scaleY: 1, filter: "blur(0px)",
        duration: 0.45, stagger: 0.06, ease: "back.out(1.4)",
      }, 0.65);

    // Phase 2 — logo disparaît + panneaux s'ouvrent
    tl.to([lineTopRef.current, lineBotRef.current, haloRef.current], {
        opacity: 0, duration: 0.35, ease: "power2.in",
      }, 1.65)
      .to(letters, {
        opacity: 0, scaleY: 0, filter: "blur(4px)",
        duration: 0.3, stagger: 0.03, ease: "power2.in",
      }, 1.65)
      .to(panelTopRef.current, { yPercent: -100, duration: 1.1, ease: "power4.inOut" }, 1.9)
      .to(panelBotRef.current, { yPercent:  100, duration: 1.1, ease: "power4.inOut" }, 1.9)
      .set(curtainRef.current, { autoAlpha: 0, pointerEvents: "none" }, "+=0.05");

    // Phase 3 — hero reveal
    const heroSelectors = [".hero-fade-a",".hero-fade-b",".hero-fade-c",".hero-fade-d",".hero-fade-e",".hero-fade-f"];
    heroSelectors.forEach((sel, i) => {
      const el = document.querySelector(sel);
      if (!el) return;
      gsap.set(el, { opacity: 0, y: 32, filter: "blur(6px)" });
      tl.to(el, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" }, 2.8 + i * 0.14);
    });
  }, { scope: curtainRef });

  const letterRefs = [l0, l1, l2, l3, l4, l5, l6, l7, l8];

  return (
    <div ref={curtainRef} aria-hidden style={{ position: "fixed", inset: 0, zIndex: 99998, pointerEvents: "none", overflow: "hidden" }}>

      {/* Panneau haut */}
      <div ref={panelTopRef} style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50%", background: "hsl(28,18%,8%)" }} />

      {/* Panneau bas */}
      <div ref={panelBotRef} style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: "hsl(28,18%,8%)" }} />

      {/* Logo centré */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 18, zIndex: 1 }}>

        {/* Halo bronze */}
        <div ref={haloRef} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 360, height: 160, background: "radial-gradient(ellipse at center, hsl(28,62%,38%,.22) 0%, transparent 70%)", filter: "blur(20px)", pointerEvents: "none" }} />

        {/* Ligne haut */}
        <div ref={lineTopRef} style={{ height: 1, width: 160, background: "linear-gradient(90deg, transparent, hsl(28,70%,62%), transparent)" }} />

        {/* Wordmark — chaque lettre a son propre ref fixe */}
        <div style={{ display: "flex", alignItems: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "1.2rem", fontWeight: 400, letterSpacing: ".44em", textTransform: "uppercase", color: "hsl(38,35%,96%)", textShadow: "0 0 40px hsl(28,62%,52%,.5)", paddingLeft: ".44em" }}>
          {WORD.split("").map((letter, i) => (
            <span key={i} ref={letterRefs[i]} style={{ display: "inline-block" }}>{letter}</span>
          ))}
        </div>

        {/* Ligne bas */}
        <div ref={lineBotRef} style={{ height: 1, width: 160, background: "linear-gradient(90deg, transparent, hsl(28,70%,62%), transparent)" }} />
      </div>

      {/* Grain */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "200px", pointerEvents: "none" }} />
    </div>
  );
}
