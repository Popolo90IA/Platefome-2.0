"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

interface AuthFlipLinkProps {
  href: string;
  direction: "forward" | "backward"; // forward = login→signup (gauche→droite), backward = signup→login (droite→gauche)
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Lien avec animation flip de page façon menu/livre.
 * - forward  : page tourne de droite vers gauche (comme ouvrir un livre)
 * - backward : page tourne de gauche vers droite (comme revenir en arrière)
 */
export function AuthFlipLink({ href, direction, children, style, className }: AuthFlipLinkProps) {
  const router = useRouter();
  const triggered = useRef(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (triggered.current) return;
    triggered.current = true;

    // On cherche la page (le wrapper root du composant parent)
    const page = document.querySelector("[data-auth-page]") as HTMLElement | null;
    if (!page) {
      router.push(href);
      return;
    }

    const animClass = direction === "forward" ? "auth-flip-forward" : "auth-flip-backward";
    page.classList.add(animClass);

    page.addEventListener(
      "animationend",
      () => {
        router.push(href);
      },
      { once: true }
    );
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
