"use client";

type Props = {
  onDownloadSvg: () => void;
  onDownloadPng: () => void;
};

const DOWNLOAD_ICON = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);

/**
 * QrHeader — h1 + sous-titre + boutons "הורד SVG" / "הורד PNG".
 */
export function QrHeader({ onDownloadSvg, onDownloadPng }: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: 32,
        gap: 24,
        flexWrap: "wrap",
      }}
    >
      <div>
        <h1
          className="font-display"
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: "-.02em",
            color: "hsl(var(--fog))",
            margin: "0 0 8px",
          }}
        >
          QR{" "}
          <em
            style={{
              fontStyle: "italic",
              color: "hsl(var(--accent-bright))",
            }}
          >
            שולחן
          </em>{" "}
          והדפסות
        </h1>
        <p
          className="font-sans"
          style={{
            fontSize: 14,
            color: "hsl(var(--subtle))",
            lineHeight: 1.55,
            maxWidth: 580,
            margin: 0,
          }}
        >
          צור קודי QR ייחודיים לכל שולחן ישירות לחוויית 3D שלך. הזמן הדפסה
          בכמה לחיצות, או הורד PDF להדפסה מקומית.
        </p>
      </div>
      <div className="qr-header-actions" style={{ display: "flex", gap: 10 }}>
        <button
          className="font-sans"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "11px 22px",
            borderRadius: 10,
            background: "transparent",
            border: "1px solid hsl(var(--line))",
            color: "hsl(var(--fog))",
            fontSize: 13.5,
            fontWeight: 600,
            cursor: "pointer",
          }}
          onClick={onDownloadSvg}
        >
          הורד SVG
          {DOWNLOAD_ICON}
        </button>
        <button
          className="btn-primary"
          style={{ padding: "11px 22px", fontSize: 13.5 }}
          onClick={onDownloadPng}
        >
          הורד PNG
          {DOWNLOAD_ICON}
        </button>
      </div>
    </div>
  );
}
