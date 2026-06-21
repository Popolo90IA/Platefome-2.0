"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins once at module load (idempotent côté GSAP).
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const REVEAL_SELECTOR = ".reveal, .reveal-left, .reveal-scale, .reveal-blur";

/**
 * Scroll-reveal pour tout élément `.reveal`, `.reveal-left`, `.reveal-scale`
 * ou `.reveal-blur`. Pilote la classe `.visible` (les transitions vivent dans
 * globals.css). IntersectionObserver plutôt que ScrollTrigger : il ne dépend
 * pas de positions calculées avant le layout final, et un failsafe garantit
 * que le contenu ne reste JAMAIS invisible (no-scroll, headless, crawlers).
 * Respecte `prefers-reduced-motion`.
 */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
    );
    if (els.length === 0) return;

    const revealAll = () => els.forEach((el) => el.classList.add("visible"));

    // Reduced motion : le CSS force déjà la visibilité ; rien à observer.
    // IO indisponible : on révèle tout immédiatement (jamais de blank).
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      revealAll();
      return;
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.delay || 0);
          if (delay) {
            window.setTimeout(() => el.classList.add("visible"), delay);
          } else {
            el.classList.add("visible");
          }
          obs.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.01 },
    );

    els.forEach((el) => io.observe(el));

    // Filet de sécurité : ne jamais laisser du contenu caché si aucun scroll
    // n'arrive (onglet en arrière-plan au load, rendu headless, robots).
    const failsafe = window.setTimeout(revealAll, 2500);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);
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
