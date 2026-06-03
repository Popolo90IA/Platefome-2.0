"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * useScrollStory — drives the LivingTable scroll narrative.
 * Returns the section ref plus the derived act/transition/CTA values.
 */
export function useScrollStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const proxy = useRef({ p: 0 });

  useGSAP(
    () => {
      const el = sectionRef.current;
      if (!el) return;

      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onUpdate(self) {
          proxy.current.p = self.progress;
          setProgress(self.progress);
        },
      });
    },
    { scope: sectionRef },
  );

  const act = progress < 0.25 ? 1 : progress < 0.55 ? 2 : progress < 0.85 ? 3 : 4;
  const transitionProgress = Math.max(0, Math.min(1, (progress - 0.1) / 0.55));
  const plateActive = progress > 0.55;
  const badgesActive = progress > 0.7;
  const ctaReveal = Math.max(0, Math.min(1, (progress - 0.85) / 0.12));

  return {
    sectionRef,
    progress,
    act,
    transitionProgress,
    plateActive,
    badgesActive,
    ctaReveal,
  };
}
