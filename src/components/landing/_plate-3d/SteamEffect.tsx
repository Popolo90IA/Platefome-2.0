/** Vapeur animée — 3 panaches SVG montants */
export function SteamEffect() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[160px] pointer-events-none">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            width: "30px",
            height: "80px",
            background:
              "radial-gradient(ellipse, rgba(255,255,255,0.5) 0%, transparent 70%)",
            filter: "blur(4px)",
            animation: `steamRise ${3 + i * 0.5}s ease-out ${i * 0.7}s infinite`,
            opacity: 0,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes steamRise {
          0% {
            opacity: 0;
            transform: translate(-50%, 0) scale(0.6);
          }
          30% {
            opacity: 0.7;
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -120px) scale(1.5);
          }
        }
      `}</style>
    </div>
  );
}
