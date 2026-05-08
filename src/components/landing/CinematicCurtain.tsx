"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * CinematicCurtain — rideau d'ouverture GSAP pro.
 *
 * Timeline (total ~2.8s) :
 *  0.0s  — Deux panneaux couvrent l'écran (haut + bas)
 *  0.3s  — Logo + lignes se tracent
 *  0.8s  — Logo PLATFORME : lettres apparaissent une par une
 *  1.8s  — Panneaux s'écartent (haut → top, bas → bottom)
 *  2.4s  — Hero éléments reveal en cascade
 */
export function CinematicCurtain() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const panelTopRef = useRef<HTMLDivElement>(null);
  const panelBotRef = useRef<HTMLDivElement>(null);
  const lineTopRef = useRef<HTMLDivElement>(null);
  const lineBotRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<HTMLSpanElement[]>([]);
  const haloRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // ── Phase 0 : état initial ───────────────────────────────
    gsap.set(curtainRef.current, { autoAlpha: 1 });
    gsap.set([panelTopRef.current, panelBotRef.current], { yPercent: 0 });
    gsap.set(lineTopRef.current, { scaleX: 0, opacity: 0, transformOrigin: "center" });
    gsap.set(lineBotRef.current, { scaleX: 0, opacity: 0, transformOrigin: "center" });
    gsap.set(letterRefs.current, { opacity: 0, y: 14, filter: "blur(4px)" });
    gsap.set(haloRef.current, { opacity: 0, scale: 0.7 });

    // ── Phase 1 : logo appear (0.3s) ────────────────────────
    tl.to(haloRef.current, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }, 0.3)
      .to(lineTopRef.current, { scaleX: 1, opacity: 1, duration: 0.7, ease: "power2.inOut" }, 0.4)
      .to(lineBotRef.current, { scaleX: 1, opacity: 1, duration: 0.7, ease: "power2.inOut" }, 0.5)
      // Lettres en stagger de droite à gauche : E apparaît en premier, P en dernier
      .to(letterRefs.current, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.5,
        stagger: { each: 0.06, from: "end" },
        ease: "power2.out",
      }, 0.65);

    // ── Phase 2 : logo fade + panneaux s'ouvrent (1.6s) ─────
    tl.to([lineTopRef.current, lineBotRef.current, haloRef.current], {
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
      }, 1.65)
      .to(letterRefs.current, {
        opacity: 0,
        y: -10,
        filter: "blur(6px)",
        duration: 0.35,
        stagger: 0.03,
        ease: "power2.in",
      }, 1.65)
      // Panneau haut monte
      .to(panelTopRef.current, {
        yPercent: -100,
        duration: 1.1,
        ease: "power4.inOut",
      }, 1.9)
      // Panneau bas descend
      .to(panelBotRef.current, {
        yPercent: 100,
        duration: 1.1,
        ease: "power4.inOut",
      }, 1.9)
      // Cacher le wrapper quand c'est fini
      .set(curtainRef.current, { autoAlpha: 0, pointerEvents: "none" }, "+=0.05");

    // ── Phase 3 : hero elements reveal ──────────────────────
    const heroEls = [
      ".hero-fade-a",
      ".hero-fade-b",
      ".hero-fade-c",
      ".hero-fade-d",
      ".hero-fade-e",
      ".hero-fade-f",
    ];

    heroEls.forEach((sel, i) => {
      const el = document.querySelector(sel);
      if (!el) return;
      gsap.set(el, { opacity: 0, y: 32, filter: "blur(6px)" });
      tl.to(
        el,
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" },
        2.8 + i * 0.14
      );
    });
  }, { scope: curtainRef });

  const LETTERS = "PLATFORME".split(""); // P L A T F O R M E — stagger from:"end" anime E en premier

  return (
    <div
      ref={curtainRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99998,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* ── Panneau haut ── */}
      <div
        ref={panelTopRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: "hsl(28,18%,8%)",
          transformOrigin: "top",
        }}
      />

      {/* ── Panneau bas ── */}
      <div
        ref={panelBotRef}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: "hsl(28,18%,8%)",
          transformOrigin: "bottom",
        }}
      />

      {/* ── Logo centré ── */}
      <div
        ref={logoRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
          zIndex: 1,
        }}
      >
        {/* Halo bronze ambiant */}
        <div
          ref={haloRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 360,
            height: 160,
            background:
              "radial-gradient(ellipse at center, hsl(28,62%,38%,.22) 0%, transparent 70%)",
            filter: "blur(20px)",
            pointerEvents: "none",
          }}
        />

        {/* Ligne dorée haut */}
        <div
          ref={lineTopRef}
          style={{
            height: 1,
            width: 160,
            background:
              "linear-gradient(90deg, transparent, hsl(28,70%,62%), transparent)",
          }}
        />

        {/* Wordmark lettre par lettre */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 0,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1.2rem",
            fontWeight: 400,
            letterSpacing: ".44em",
            textTransform: "uppercase",
            color: "hsl(38,35%,96%)",
            textShadow: "0 0 40px hsl(28,62%,52%,.5)",
            paddingLeft: ".44em",
          }}
        >
          {LETTERS.map((l, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) letterRefs.current[i] = el;
              }}
              style={{ display: "inline-block" }}
            >
              {l}
            </span>
          ))}
        </div>

        {/* Ligne dorée bas */}
        <div
          ref={lineBotRef}
          style={{
            height: 1,
            width: 160,
            background:
              "linear-gradient(90deg, transparent, hsl(28,70%,62%), transparent)",
          }}
        />
      </div>

      {/* Grain subtil sur les panneaux */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
