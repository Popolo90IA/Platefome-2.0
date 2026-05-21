"use client";

// Next.js App Router bundles React canary which exports ViewTransition.
// TypeScript types react@19.2 stable don't include it yet — d'où le // @ts-ignore.
// @ts-ignore — ViewTransition existe dans le React canary bundled par Next
import { ViewTransition } from "react";

/**
 * Wrapper officiel pour transitions de page directionnelles.
 * Suit le skill react-view-transitions (Vercel) — recettes CSS dans globals.css.
 *
 * - `nav-forward` : home → login, list → detail, etc.
 * - `nav-back`    : navigation retour
 * - `default: "none"` : aucune animation si pas de type \u2192 \u00e9vite les conflits avec Suspense reveals
 *
 * Usage : envelopper le contenu d'une page (PAS un layout).
 * Le type est d\u00e9clench\u00e9 via `<Link transitionTypes={['nav-forward']}>`
 * (flag `experimental.viewTransition` requis dans next.config).
 */
export function DirectionalTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
