/**
 * Page de test : aligne le composant React LogoWordmark sur le SVG logo-lockup.svg
 * Affiche le SVG (référence) et plusieurs variantes du composant React pour calibrer.
 * URL: /logo-test
 */

import { LogoWordmark } from "@/components/brand/LogoWordmark";

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

function Wordmark({
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

export default function LogoTestPage() {
  const W = 360;

  const options = [
    { n: "A", bell: 0.2, font: 0.15, gap: 0.075, label: "ratio SVG (15%)" },
    { n: "B", bell: 0.22, font: 0.2, gap: 0.06, label: "ratio milieu (20%)" },
    { n: "C", bell: 0.2, font: 0.26, gap: 0.05, label: "actuel (26%)" },
    { n: "D", bell: 0.2, font: 0.18, gap: 0.04, label: "compact (18%)" },
  ];

  return (
    <div
      dir="ltr"
      style={{
        minHeight: "100vh",
        background: "hsl(38, 28%, 94%)",
        padding: "4rem 2rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: 24,
          marginBottom: 8,
          color: "hsl(24,18%,16%)",
          fontWeight: 600,
        }}
      >
        Calibrage typo wordmark
      </h1>
      <p style={{ color: "hsl(24,12%,38%)", marginBottom: 48, fontSize: 14 }}>
        En haut : SVG du login (référence). En dessous : variantes du composant
        React. Dis-moi quelle lettre (A, B, C, D) correspond le mieux au login.
      </p>

      {/* SVG de référence (le login utilise ça) */}
      <section
        style={{
          marginBottom: 64,
          padding: "32px",
          background: "white",
          borderRadius: 16,
          border: "2px solid hsl(28, 62%, 42%)",
        }}
      >
        <div
          style={{
            fontSize: 12,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "hsl(28, 62%, 42%)",
            marginBottom: 16,
            fontWeight: 700,
          }}
        >
          ★ Référence — SVG utilisé sur la page login
        </div>
        <img
          src="/brand/logo-lockup.svg"
          width={W}
          alt="logo-lockup.svg"
          style={{ display: "block" }}
        />
        <div style={{ fontSize: 12, color: "hsl(24,12%,38%)", marginTop: 12 }}>
          /brand/logo-lockup.svg @ width={W}
        </div>
      </section>

      {/* Composant React actuel */}
      <section
        style={{
          marginBottom: 48,
          padding: "24px",
          background: "hsl(36, 22%, 90%)",
          borderRadius: 12,
        }}
      >
        <div
          style={{
            fontSize: 12,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "hsl(24,12%,38%)",
            marginBottom: 16,
            fontWeight: 600,
          }}
        >
          État actuel du composant React (LogoWordmark)
        </div>
        <LogoWordmark width={W} />
      </section>

      {/* Variantes à comparer */}
      {options.map((o) => (
        <section
          key={o.n}
          style={{
            marginBottom: 32,
            padding: "24px",
            background: "white",
            borderRadius: 12,
            border: "1px solid hsl(36, 22%, 85%)",
          }}
        >
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "hsl(28, 62%, 42%)",
              marginBottom: 16,
              fontWeight: 700,
            }}
          >
            Option {o.n} — {o.label}
          </div>
          <Wordmark
            width={W}
            bellRatio={o.bell}
            fontRatio={o.font}
            gapRatio={o.gap}
          />
          <div style={{ fontSize: 11, color: "hsl(24,12%,50%)", marginTop: 10 }}>
            bell={o.bell} · font={o.font} · gap={o.gap}
          </div>
        </section>
      ))}
    </div>
  );
}
