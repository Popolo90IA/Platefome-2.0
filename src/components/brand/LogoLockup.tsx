import { LogoWordmark } from "./LogoWordmark";

interface LogoLockupProps {
  width?: number;
  className?: string;
  /** Affiche la tagline "Every dish · in 360°" sous le wordmark */
  showTagline?: boolean;
}

/**
 * Horizontal lockup — réutilise LogoWordmark (cloche + Plateform) + tagline.
 * Source de vérité unique pour le logo avec texte sur toute l'app.
 * Use for: marketing hero, auth pages (180px), email headers, footers.
 */
export function LogoLockup({ width = 180, className, showTagline = true }: LogoLockupProps) {
  return (
    <div
      className={className}
      style={{ display: "inline-flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1 }}
    >
      <LogoWordmark width={width} />
      {showTagline && (
        <span
          style={{
            fontFamily: "DM Mono, ui-monospace, monospace",
            fontSize: Math.max(9, Math.round(width * 0.065)),
            letterSpacing: "0.22em",
            color: "hsl(24,12%,38%)",
            marginTop: Math.round(width * 0.04),
            marginLeft: Math.round(width * (28 / 180)),
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          Every dish · in 360°
        </span>
      )}
    </div>
  );
}
