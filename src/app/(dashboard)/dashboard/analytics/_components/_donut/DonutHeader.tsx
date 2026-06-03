/* ── DonutHeader — title + "3D · 360 · AR" badge ── */
export function DonutHeader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 18,
      }}
    >
      <h3
        className="font-display"
        style={{
          fontSize: 20,
          fontWeight: 600,
          color: "hsl(var(--fog))",
          margin: 0,
          flex: 1,
        }}
      >
        תצוגות לפי מצב
      </h3>
      <span
        className="font-sans uppercase"
        style={{
          fontSize: "11px",
          letterSpacing: ".08em",
          padding: "3px 10px",
          borderRadius: 99,
          background: "hsl(28,62%,42%,.1)",
          color: "hsl(var(--accent-bright))",
          border: "1px solid hsl(28,62%,42%,.2)",
        }}
      >
        3D · 360 · AR
      </span>
    </div>
  );
}
