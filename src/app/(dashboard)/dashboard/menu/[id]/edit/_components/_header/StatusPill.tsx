/* ── StatusPill — availability badge (active / unavailable) ── */
export function StatusPill({ isAvailable }: { isAvailable: boolean }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <span
        className="font-sans uppercase"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "5px 12px",
          borderRadius: 99,
          background: isAvailable
            ? "hsl(120,30%,40%,.1)"
            : "hsl(0,60%,50%,.08)",
          border: `1px solid ${
            isAvailable ? "hsl(120,30%,40%,.2)" : "hsl(0,60%,50%,.2)"
          }`,
          fontSize: 10.5,
          letterSpacing: ".06em",
          color: isAvailable ? "hsl(120,30%,30%)" : "hsl(0,55%,42%)",
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: isAvailable ? "hsl(120,40%,40%)" : "hsl(0,60%,50%)",
          }}
        />
        {isAvailable ? "פעיל · זמין בתפריט" : "לא זמין"}
      </span>
    </div>
  );
}
