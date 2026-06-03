"use client";

/* ── PlateGarnish — static plate layers + SVG pasta + tomatoes / basil /
   parmesan / highlight reflet. Rendered inside the rotating container. ── */
export function PlateGarnish() {
  return (
    <>
      {/* Rim extérieur */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 38% 28%, #faf6f0 0%, #ece4d5 45%, #c8bda8 80%, #a89880 100%)",
          boxShadow:
            "inset 0 6px 24px rgba(255,255,255,0.7), inset 0 -8px 32px rgba(100,75,40,0.25), 0 20px 50px -10px rgba(0,0,0,0.5)",
        }}
      />

      {/* Well central */}
      <div
        style={{
          position: "absolute",
          inset: "18px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 40% 30%, #f5efe5 0%, #e8dece 55%, #d4c6ae 100%)",
          boxShadow:
            "inset 0 4px 16px rgba(120,90,50,0.2), inset 0 -4px 12px rgba(255,255,255,0.5)",
        }}
      />

      {/* Sauce */}
      <div
        style={{
          position: "absolute",
          inset: "40px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 45% 35%, #d4512a 0%, #b03a1a 50%, #7a2010 100%)",
          boxShadow:
            "inset 0 4px 12px rgba(200,80,30,0.4), inset 0 -4px 12px rgba(60,10,0,0.4)",
        }}
      />

      {/* Pâtes SVG */}
      <div style={{ position: "absolute", inset: "54px", borderRadius: "50%", overflow: "hidden" }}>
        <svg viewBox="0 0 210 210" style={{ width: "100%", height: "100%" }} fill="none">
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse
              key={i}
              cx="105"
              cy="105"
              rx={85 - i * 14}
              ry={40 - i * 6}
              stroke="#e8c87a"
              strokeWidth="6"
              strokeOpacity={0.85 - i * 0.1}
              transform={`rotate(${i * 28} 105 105)`}
            />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <ellipse
              key={`i${i}`}
              cx="105"
              cy="105"
              rx={30 - i * 6}
              ry={14 - i * 2}
              stroke="#d4a84a"
              strokeWidth="5"
              strokeOpacity={0.7 - i * 0.1}
              transform={`rotate(${i * 45 + 15} 105 105)`}
            />
          ))}
        </svg>
      </div>

      {/* Tomates */}
      {[
        { top: "30px", left: "80px", size: 28, c: "#e03020" },
        { top: "58px", right: "44px", size: 24, c: "#c82010" },
        { bottom: "62px", left: "52px", size: 22, c: "#d42818" },
      ].map((t, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: t.size,
            height: t.size,
            borderRadius: "50%",
            background: `radial-gradient(circle at 35% 28%, #ff6b5b, ${t.c})`,
            boxShadow:
              "inset -3px -3px 6px rgba(0,0,0,0.3), 0 4px 10px rgba(0,0,0,0.3)",
            top: (t as { top?: string }).top,
            left: (t as { left?: string }).left,
            right: (t as { right?: string }).right,
            bottom: (t as { bottom?: string }).bottom,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "22%",
              width: "30%",
              height: "22%",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.55)",
            }}
          />
        </div>
      ))}

      {/* Basilic */}
      {[
        { top: "70px", left: "120px", rotate: "-20deg" },
        { top: "130px", left: "60px", rotate: "35deg" },
      ].map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: "32px",
            height: "18px",
            borderRadius: "50% 10% 50% 10%",
            background: "radial-gradient(circle at 40% 30%, #4a9a2e, #1e5010)",
            boxShadow: "inset -1px -2px 4px rgba(0,0,0,0.25)",
            top: b.top,
            left: b.left,
            transform: `rotate(${b.rotate})`,
          }}
        />
      ))}

      {/* Parmesan */}
      {[
        { top: "95px", left: "110px", w: 22, h: 9 },
        { top: "110px", left: "88px", w: 18, h: 7 },
      ].map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: p.w,
            height: p.h,
            borderRadius: "3px",
            background:
              "linear-gradient(135deg, #f5e8c0 0%, #e0cc90 50%, #c8aa60 100%)",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            top: p.top,
            left: p.left,
            transform: `rotate(${i % 2 === 0 ? -12 : 8}deg)`,
          }}
        />
      ))}

      {/* Reflet brillant assiette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at 28% 18%, rgba(255,255,255,0.45) 0%, transparent 35%)",
          pointerEvents: "none",
        }}
      />
    </>
  );
}
