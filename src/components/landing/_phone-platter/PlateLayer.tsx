"use client";

/* ── PlateLayer — ceramic plate (top view) that materializes at the end ── */
export function PlateLayer({
  opacity,
  scale,
}: {
  opacity: number;
  scale: number;
}) {
  return (
    <div
      className="absolute"
      style={{
        opacity,
        transform: `scale(${scale}) rotateX(60deg)`,
        transformStyle: "preserve-3d",
        transition: "transform 200ms ease-out",
      }}
    >
      <div
        className="absolute top-full left-1/2 -translate-x-1/2 -mt-4 w-[260px] h-[40px] rounded-full blur-xl"
        style={{
          background:
            "radial-gradient(ellipse, rgba(24,18,10,0.45) 0%, transparent 70%)",
        }}
      />
      <div
        className="relative w-[280px] h-[280px] rounded-full flex items-center justify-center"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #fefefe 0%, #f0ebe3 55%, #d9d0c2 100%)",
          boxShadow:
            "inset 0 4px 20px rgba(255,255,255,0.9), inset 0 -8px 30px rgba(120,90,50,0.15), 0 20px 40px -10px rgba(24,18,10,0.35)",
        }}
      >
        <div
          className="absolute inset-3 rounded-full border-2"
          style={{
            borderColor: "hsl(var(--gold) / 0.6)",
            boxShadow:
              "inset 0 0 0 1px rgba(212,160,50,0.3), 0 0 20px rgba(212,160,50,0.15)",
          }}
        />
        <div
          className="w-[180px] h-[180px] rounded-full relative overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 40% 35%, #fafafa 0%, #ebe3d5 60%, #cec2ae 100%)",
            boxShadow: "inset 0 2px 12px rgba(120,90,50,0.25)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.6) 0%, transparent 50%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
