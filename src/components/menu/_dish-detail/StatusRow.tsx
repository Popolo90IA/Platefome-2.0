/* ─── StatusRow — icon dot + label/value ──────────────────── */
export function StatusRow({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: string;
  color: string;
  icon: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <span
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: `${color}12`,
          border: `1px solid ${color}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: ".75rem",
          color,
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <div>
        <div
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: ".5875rem",
            letterSpacing: ".14em",
            color: "hsl(var(--dim))",
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>
        <div style={{ fontSize: ".875rem", color: "hsl(var(--subtle))", marginTop: 1 }}>
          {value}
        </div>
      </div>
    </div>
  );
}
