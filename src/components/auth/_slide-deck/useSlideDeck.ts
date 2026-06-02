"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CSSProperties } from "react";

type Panel = "login" | "signup";
type Direction = "forward" | "backward";

export function useSlideDeck(initialPanel: Panel) {
  const router = useRouter();
  const [panel, setPanel] = useState<Panel>(initialPanel);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<Direction>("forward");
  const [displayPanel, setDisplayPanel] = useState<Panel>(initialPanel);

  const switchTo = (target: Panel) => {
    if (animating || target === panel) return;
    const dir: Direction = target === "signup" ? "forward" : "backward";
    setDirection(dir);
    setAnimating(true);

    router.replace(target === "signup" ? "/signup" : "/login", { scroll: false });

    setTimeout(() => {
      setDisplayPanel(target);
      setPanel(target);
      setAnimating(false);
    }, 420);
  };

  const slideStyle = (which: "brand" | "form"): CSSProperties => {
    if (!animating) return {};
    const exitX =
      direction === "forward"
        ? which === "form"
          ? "-100%"
          : "100%"
        : which === "form"
          ? "100%"
          : "-100%";
    return {
      animation: `authSlideExit 0.42s cubic-bezier(0.4,0,1,1) forwards`,
      "--slide-exit-x": exitX,
    } as CSSProperties;
  };

  return { displayPanel, switchTo, slideStyle };
}
