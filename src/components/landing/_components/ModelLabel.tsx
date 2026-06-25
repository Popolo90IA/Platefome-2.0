"use client";

interface Props {
  label: string;
}

/**
 * ModelLabel — pastille bas de carte : label modèle + hint drag.
 */
export function ModelLabel({ label }: Props) {
  return (
    <div
      style={{
        position: "relative",
        marginTop: 24,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          padding: "8px 20px",
          background: "hsl(38,34%,96%,.7)",
          border: "1px solid hsl(28,62%,42%,.18)",
          borderRadius: 99,
          backdropFilter: "blur(10px)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-hebrew)",
            fontSize: ".95rem",
            color: "hsl(24,18%,16%)",
            fontStyle: "italic",
          }}
        >
          {label}
        </span>
        <span
          style={{
            width: 1,
            height: 14,
            background: "hsl(28,62%,42%,.25)",
          }}
        />
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "hsl(22,70%,50%)",
            boxShadow: "0 0 8px hsl(22,70%,50%,.6)",
            animation: "showcasePulse 2s ease-in-out infinite",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: ".18em",
            color: "hsl(24,12%,38%)",
            textTransform: "uppercase",
          }}
        >
          גרור לסיבוב
        </span>
      </div>
    </div>
  );
}
