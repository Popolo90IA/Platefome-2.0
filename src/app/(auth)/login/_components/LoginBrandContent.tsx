"use client";

const FEATURES = [
  { icon: "✦", text: "תמונות 360° לכל מנה" },
  { icon: "✦", text: "QR מותאם אישית לכל שולחן" },
  { icon: "✦", text: "אנליטיקס בזמן אמת" },
];

export function LoginBrandContent() {
  return (
    <>
      <div
        className="font-sans uppercase"
        style={{
          fontSize: 11,
          letterSpacing: ".08em",
          fontWeight: 600,
          color: "hsl(28,62%,52%)",
          marginBottom: 20,
        }}
      >
        כל מנה · בתלת מימד
      </div>
      <h2
        className="font-display"
        style={{
          fontSize: "clamp(2rem, 3vw, 2.8rem)",
          fontWeight: 600,
          lineHeight: 1.05,
          letterSpacing: "-.025em",
          color: "hsl(36,30%,88%)",
          margin: "0 0 32px",
        }}
      >
        התפריט שלך,
        <br />
        <em style={{ fontStyle: "italic", color: "hsl(28,62%,52%)" }}>
          חי ובתלת מימד.
        </em>
      </h2>
      {FEATURES.map((f) => (
        <div
          key={f.text}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 14,
          }}
        >
          <span
            style={{ color: "hsl(28,62%,52%)", fontSize: 9, flexShrink: 0 }}
          >
            {f.icon}
          </span>
          <span
            className="font-sans"
            style={{ fontSize: 14, color: "hsl(36,20%,65%)", lineHeight: 1.4 }}
          >
            {f.text}
          </span>
        </div>
      ))}
    </>
  );
}
