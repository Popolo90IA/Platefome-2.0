"use client";

import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";

// Panneau bronze qui sweep l'écran en diagonale pendant la navigation
// Le panel est monté une seule fois dans le DOM via un portail CSS global.

interface AuthSkewLinkProps {
  href: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export function AuthSkewLink({ href, children, style, className }: AuthSkewLinkProps) {
  const router = useRouter();
  const triggered = useRef(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (triggered.current) return;
    triggered.current = true;

    // Récupère ou crée le panneau global
    let panel = document.getElementById("auth-skew-panel");
    if (!panel) {
      panel = document.createElement("div");
      panel.id = "auth-skew-panel";
      panel.className = "auth-skew-panel";
      document.body.appendChild(panel);
    }

    // Lance l'animation
    panel.classList.remove("auth-skew-panel--animating");
    // Force reflow pour relancer l'animation si déjà jouée
    void panel.offsetWidth;
    panel.classList.add("auth-skew-panel--animating");

    // Navigue au milieu de l'animation (quand le panel couvre tout)
    setTimeout(() => {
      router.push(href);
    }, 675);

    // Reset après la fin
    setTimeout(() => {
      triggered.current = false;
    }, 1550);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      style={style}
      className={className}
    >
      {children}
    </a>
  );
}
