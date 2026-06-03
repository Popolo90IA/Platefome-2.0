/**
 * Page de test : aligne le composant React LogoWordmark sur le SVG logo-lockup.svg
 * Affiche le SVG (référence) et plusieurs variantes du composant React pour calibrer.
 * URL: /logo-test
 */

import { LogoWordmark } from "@/components/brand/LogoWordmark";
import { Wordmark } from "./_logo-test/Wordmark";
import { Section } from "./_logo-test/Section";

const OPTIONS = [
  { n: "A", bell: 0.2, font: 0.15, gap: 0.075, label: "ratio SVG (15%)" },
  { n: "B", bell: 0.22, font: 0.2, gap: 0.06, label: "ratio milieu (20%)" },
  { n: "C", bell: 0.2, font: 0.26, gap: 0.05, label: "actuel (26%)" },
  { n: "D", bell: 0.2, font: 0.18, gap: 0.04, label: "compact (18%)" },
];

export default function LogoTestPage() {
  const W = 360;

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
      <h1 style={{ fontSize: 24, marginBottom: 8, color: "hsl(24,18%,16%)", fontWeight: 600 }}>
        Calibrage typo wordmark
      </h1>
      <p style={{ color: "hsl(24,12%,38%)", marginBottom: 48, fontSize: 14 }}>
        En haut : SVG du login (référence). En dessous : variantes du composant
        React. Dis-moi quelle lettre (A, B, C, D) correspond le mieux au login.
      </p>

      {/* SVG de référence (le login utilise ça) */}
      <Section
        eyebrow="★ Référence — SVG utilisé sur la page login"
        style={{ marginBottom: 64, padding: "32px", border: "2px solid hsl(28, 62%, 42%)" }}
      >
        <img src="/brand/logo-lockup.svg" width={W} alt="logo-lockup.svg" style={{ display: "block" }} />
        <div style={{ fontSize: 12, color: "hsl(24,12%,38%)", marginTop: 12 }}>
          /brand/logo-lockup.svg @ width={W}
        </div>
      </Section>

      {/* Composant React actuel */}
      <Section
        eyebrow="État actuel du composant React (LogoWordmark)"
        eyebrowColor="hsl(24,12%,38%)"
        style={{ marginBottom: 48, background: "hsl(36, 22%, 90%)", border: "none" }}
      >
        <LogoWordmark width={W} />
      </Section>

      {/* Variantes à comparer */}
      {OPTIONS.map((o) => (
        <Section key={o.n} eyebrow={`Option ${o.n} — ${o.label}`}>
          <Wordmark width={W} bellRatio={o.bell} fontRatio={o.font} gapRatio={o.gap} />
          <div style={{ fontSize: 11, color: "hsl(24,12%,50%)", marginTop: 10 }}>
            bell={o.bell} · font={o.font} · gap={o.gap}
          </div>
        </Section>
      ))}
    </div>
  );
}
