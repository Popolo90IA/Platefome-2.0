"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins once at module load (idempotent côté GSAP).
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/**
 * Scroll-reveal animation for any element with class `.reveal`,
 * `.reveal-left`, `.reveal-scale`, or `.reveal-blur`. Respects
 * `prefers-reduced-motion`.
 */
export function useReveal() {
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = gsap.utils.toArray<HTMLElement>(
      ".reveal, .reveal-left, .reveal-scale, .reveal-blur",
    );
    els.forEach((el) => {
      const delay = Number(el.dataset.delay || 0) / 1000;
      gsap.fromTo(
        el,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 94%",
            toggleActions: "play none none none",
          },
        },
      );
    });
  });
}

/**
 * Adds a frosted-pill effect to the fixed header (#site-header) once the
 * user has scrolled past 60px.
 */
export function useHeaderScroll() {
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const header = document.getElementById("site-header");
    if (!header) return;
    const inner = header.firstElementChild as HTMLElement | null;
    if (!inner) return;

    // NB: on applique les couleurs en CSS direct (pas via gsap.to) car GSAP
    // ne sait pas parser `var()` dans une couleur — il appelle splitColor(null)
    // et crash à chaque frame. La transition CSS (définie sur l'inner dans
    // SiteNav) anime ces propriétés en douceur, et `var()` est résolu nativement.
    const scrolled = {
      background: "hsl(var(--void) / .92)",
      borderColor: "hsl(var(--line))",
      boxShadow: "0 8px 40px rgba(0,0,0,.6), inset 0 1px 0 hsl(var(--line) / .5)",
    } as const;
    const atTop = {
      background: "hsl(var(--void) / .75)",
      borderColor: "hsl(var(--line) / .5)",
      boxShadow: "0 8px 32px rgba(0,0,0,.4), inset 0 1px 0 hsl(var(--line) / .3)",
    } as const;

    const st = ScrollTrigger.create({
      start: "top+=60 top",
      onEnter: () => Object.assign(inner.style, scrolled),
      onLeaveBack: () => Object.assign(inner.style, atTop),
    });

    return () => st.kill();
  });
}
