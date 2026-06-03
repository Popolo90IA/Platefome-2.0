/* ─── Badge — uppercase mono pill ─────────────────────────── */
export function Badge({
  label,
  color,
  bg,
}: {
  label: string;
  color: string;
  bg: string;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 14px",
        background: bg,
        border: `1px solid ${color}`,
        borderRadius: 99,
        fontFamily: "'DM Mono',monospace",
        fontSize: ".5875rem",
        letterSpacing: ".14em",
        textTransform: "uppercase",
        color,
      }}
    >
      {label}
    </span>
  );
}
