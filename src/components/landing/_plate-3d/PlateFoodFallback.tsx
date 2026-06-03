/** Beau plat stylisé en CSS quand aucun modèle GLB fourni */
export function PlateFoodFallback() {
  return (
    <div
      className="relative w-[200px] h-[200px]"
      style={{
        animation: "plateSpin 12s linear infinite",
      }}
    >
      {/* Main dish dome */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 25%, #e8a968 0%, #c17838 40%, #8a4e1f 100%)",
          boxShadow:
            "inset -10px -15px 30px rgba(60,30,10,0.5), inset 10px 10px 20px rgba(255,200,120,0.4), 0 20px 30px -8px rgba(60,30,10,0.4)",
        }}
      />

      {/* Garnish elements */}
      <div
        className="absolute top-6 left-10 h-6 w-6 rounded-full"
        style={{
          background: "radial-gradient(circle, #3d7a2a, #1f4515)",
          boxShadow: "inset -2px -2px 4px rgba(0,0,0,0.3)",
        }}
      />
      <div
        className="absolute top-12 right-8 h-5 w-5 rounded-full"
        style={{
          background: "radial-gradient(circle, #c43030, #7a1515)",
          boxShadow: "inset -2px -2px 4px rgba(0,0,0,0.3)",
        }}
      />
      <div
        className="absolute bottom-8 left-16 h-4 w-4 rounded-full"
        style={{
          background: "radial-gradient(circle, #3d7a2a, #1f4515)",
        }}
      />
      <div
        className="absolute bottom-12 right-12 h-7 w-7 rounded-full"
        style={{
          background: "radial-gradient(circle, #f4d06f, #b88e2a)",
          boxShadow: "inset -2px -2px 6px rgba(60,40,10,0.5)",
        }}
      />

      {/* Gold glaze shine */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.4) 0%, transparent 40%)",
        }}
      />

      <style jsx>{`
        @keyframes plateSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
