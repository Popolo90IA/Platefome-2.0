"use client";

/**
 * AnalyticsLoading — état chargement (barre pulse).
 */
export function AnalyticsLoading() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "96px 0",
      }}
    >
      <div
        style={{
          width: 2,
          height: 32,
          background: "hsl(var(--line))",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
    </div>
  );
}
