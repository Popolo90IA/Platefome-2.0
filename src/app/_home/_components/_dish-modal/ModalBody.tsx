import type { GalleryDish } from "../../_lib/types";

/* ── ModalBody — title/price + divider + desc + 3D/AR availability ── */
export function ModalBody({ dish }: { dish: GalleryDish }) {
  return (
    <div style={{ padding: "28px 32px 36px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <h2
          style={{
            fontFamily: "'Noto Serif Hebrew',serif",
            fontWeight: 400,
            fontSize: "1.75rem",
            letterSpacing: "-.03em",
            color: "hsl(var(--cream))",
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          {dish.name}
        </h2>
        <span
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontWeight: 300,
            fontSize: "2rem",
            letterSpacing: "-.04em",
            color: "hsl(var(--gold))",
            whiteSpace: "nowrap",
            lineHeight: 1,
          }}
        >
          {dish.price}
        </span>
      </div>
      <div
        style={{
          width: 40,
          height: 1,
          background: "hsl(30,18%,82%,.2)",
          marginBottom: 16,
        }}
      />
      <p
        style={{
          fontSize: "1.0625rem",
          color: "hsl(var(--subtle))",
          lineHeight: 1.75,
          margin: 0,
        }}
      >
        {dish.desc}
      </p>

      <div
        style={{
          marginTop: 28,
          padding: "16px 20px",
          background: "hsl(36,28%,92%,.04)",
          border: "1px solid hsl(36,28%,92%,.08)",
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "hsl(var(--sage))",
            boxShadow: "0 0 8px hsl(28,62%,42%,.4)",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: ".6875rem",
            letterSpacing: ".12em",
            color: "hsl(var(--dim))",
            textTransform: "uppercase",
          }}
        >
          זמין לצפייה בתלת-מימד ו-AR
        </span>
      </div>
    </div>
  );
}
