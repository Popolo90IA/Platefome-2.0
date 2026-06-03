/* ── Calibration wordmark — bell image + Cormorant "Plateform" lockup ── */

function ReactBell({ height }: { height: number }) {
  const width = Math.round(height * 1.587);
  return (
    <img
      src="/brand/cloche.png"
      width={width}
      height={height}
      alt=""
      draggable={false}
      style={{ flexShrink: 0, objectFit: "contain" }}
    />
  );
}

export function Wordmark({
  width,
  bellRatio,
  fontRatio,
  gapRatio,
  letter = "-0.02em",
}: {
  width: number;
  bellRatio: number;
  fontRatio: number;
  gapRatio: number;
  letter?: string;
}) {
  const bellHeight = Math.round(width * bellRatio);
  const fontSize = Math.round(width * fontRatio);
  const gap = Math.round(width * gapRatio);
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap,
        lineHeight: 1,
        direction: "ltr",
        whiteSpace: "nowrap",
      }}
    >
      <ReactBell height={bellHeight} />
      <span
        style={{
          fontFamily:
            "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
          fontWeight: 500,
          fontSize,
          color: "hsl(24,18%,16%)",
          letterSpacing: letter,
          lineHeight: 1,
        }}
      >
        Plate
        <em
          style={{
            fontStyle: "italic",
            background:
              "linear-gradient(135deg, hsl(28,62%,38%) 0%, hsl(22,70%,50%) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          form
        </em>
      </span>
    </span>
  );
}
