"use client";

/**
 * ScrollChevron — petit chevron animé bas de showcase (scroll cue).
 */
export function ScrollChevron() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: 20,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "hsl(38,30%,97%,.7)",
          border: "1px solid hsl(28,62%,42%,.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "showcaseBounce 2.2s ease-in-out infinite",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="hsl(28,62%,38%)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  );
}
