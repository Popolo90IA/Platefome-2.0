"use client";

/**
 * TableTextureBg — fond "nappe de lin" premium avec ombres chaudes.
 * Pur CSS, pas d'image externe. Respire subtilement.
 */
export function TableTextureBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Base linen warm */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, hsl(36 40% 94%) 0%, hsl(32 28% 86%) 45%, hsl(28 20% 72%) 100%)",
        }}
      />

      {/* Linen weave pattern (woven fabric) */}
      <div
        className="absolute inset-0 opacity-[0.35] mix-blend-multiply"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              rgba(120, 90, 50, 0.10) 0 1px,
              transparent 1px 3px
            ),
            repeating-linear-gradient(
              0deg,
              rgba(120, 90, 50, 0.08) 0 1px,
              transparent 1px 3px
            )
          `,
        }}
      />

      {/* Grain overlay */}
      <div className="absolute inset-0 bg-grain opacity-50" />

      {/* Warm vignette from center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 30%, rgba(30, 20, 10, 0.15) 75%, rgba(30, 20, 10, 0.35) 100%)",
        }}
      />

      {/* Gold ambient glow top-left */}
      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--gold) / 0.25) 0%, transparent 65%)",
        }}
      />

      {/* Gold ambient glow bottom-right */}
      <div
        className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--gold) / 0.18) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
