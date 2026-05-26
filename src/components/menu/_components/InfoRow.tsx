import { D } from "../_lib/constants";

type InfoRowProps = {
  label: string;
  value: string;
};

/**
 * Label/value row used inside the dish detail modal (allergens, etc.).
 */
export function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          letterSpacing: ".18em",
          textTransform: "uppercase",
          color: D.textDim,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          color: D.cream,
        }}
      >
        {value}
      </span>
    </div>
  );
}
