"use client";

import { DECO_LINE_BG, FRAME_CORNERS, HALO_BG } from "../_lib/constants";

/**
 * ShowcaseFrame — décorations cadre (halo + lignes haut/bas + coins).
 * Composant purement visuel, à placer en absolute dans la carte.
 */
export function ShowcaseFrame() {
  return (
    <>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: HALO_BG,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 14,
          left: 24,
          right: 24,
          height: 1,
          background: DECO_LINE_BG,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 14,
          left: 24,
          right: 24,
          height: 1,
          background: DECO_LINE_BG,
          pointerEvents: "none",
        }}
      />
      {FRAME_CORNERS.map((c, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            position: "absolute",
            ...(c.top !== undefined ? { top: c.top } : {}),
            ...(c.bottom !== undefined ? { bottom: c.bottom } : {}),
            ...(c.left !== undefined ? { left: c.left } : {}),
            ...(c.right !== undefined ? { right: c.right } : {}),
            width: 18,
            height: 18,
            borderTop: "1.5px solid hsl(28,62%,42%,.5)",
            borderLeft: "1.5px solid hsl(28,62%,42%,.5)",
            transform: `rotate(${c.rot}deg)`,
            pointerEvents: "none",
          }}
        />
      ))}
    </>
  );
}
