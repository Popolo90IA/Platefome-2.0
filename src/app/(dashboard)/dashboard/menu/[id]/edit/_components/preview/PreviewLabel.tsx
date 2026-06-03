/* ── PreviewLabel — "תצוגה מקדימה · חי" + syncing dot ── */
export function PreviewLabel() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 4px",
        marginBottom: 14,
      }}
    >
      <span
        className="font-sans uppercase"
        style={{ fontSize: 11, letterSpacing: ".06em", color: "hsl(var(--subtle))" }}
      >
        תצוגה מקדימה · חי
      </span>
      <span
        className="font-sans uppercase"
        style={{
          fontSize: 10,
          letterSpacing: ".06em",
          color: "hsl(var(--accent-bright))",
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "hsl(var(--accent-bright))",
            display: "inline-block",
            opacity: 0.7,
          }}
        />
        מסנכרן
      </span>
    </div>
  );
}
