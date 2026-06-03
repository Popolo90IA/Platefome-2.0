"use client";

type Particle = {
  id: number;
  angle: number;
  delay: number;
  distance: number;
  size: number;
};

/* ── GoldParticles — swirl of gold dots between dissolve and coalesce ── */
export function GoldParticles({
  particles,
  particleProgress,
}: {
  particles: Particle[];
  particleProgress: number;
}) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((pt) => {
        const t = Math.max(0, Math.min(1, particleProgress - pt.delay));
        const x = Math.cos(pt.angle) * pt.distance * (0.5 + t * 1.5);
        const y =
          Math.sin(pt.angle) * pt.distance * 0.4 * (0.5 + t * 1.2) +
          (t < 0.5 ? -t * 80 : -40 + (t - 0.5) * 80);
        const opacity = t < 0.1 ? t * 10 : t > 0.8 ? (1 - t) * 5 : 1;

        return (
          <div
            key={pt.id}
            className="absolute top-1/2 left-1/2 rounded-full"
            style={{
              width: `${pt.size}px`,
              height: `${pt.size}px`,
              background:
                "radial-gradient(circle, hsl(var(--gold)) 0%, hsl(var(--gold-dark)) 70%, transparent 100%)",
              boxShadow: "0 0 8px hsl(var(--gold))",
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              opacity: Math.min(1, opacity),
              transition: "none",
            }}
          />
        );
      })}
    </div>
  );
}
