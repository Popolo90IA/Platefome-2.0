"use client";

export function HeroTitle() {
  return (
    <h1
      style={{
        // Titre hébreu : police Noto Serif Hebrew (cf. CLAUDE.md, override RTL).
        // Cormorant n'a pas de glyphes hébreu → fallback + métriques latines qui
        // décalent et rognent les lettres hautes (ל). La police hébreu corrige.
        fontFamily: "var(--font-hebrew)",
        fontWeight: 600,
        lineHeight: 1.1,
        margin: "0 0 20px",
      }}
    >
      {/* Ligne 1 — masque overflow : le reveal "slide up" est piloté par le rideau (.hero-fade-b).
          overflow-y clip pour le rideau vertical ; overflow-x visible pour ne pas rogner
          l'extrémité gauche (overhang italique / lettres larges) du texte hébreu. */}
      <span style={{ display: "block", overflowX: "visible", overflowY: "clip" }}>
        <span
          className="hero-fade-b"
          style={{
            display: "block",
            fontSize: "clamp(44px, 5.2vw, 88px)",
            letterSpacing: "-.03em",
            padding: "0.14em 0 0.1em",
            color: "hsl(var(--fog))",
          }}
        >
          תפריט שגורם
        </span>
      </span>

      {/* Ligne 2 — même typo que la ligne 1 (droit, non-italique, taille/tracking
          identiques) ; garde le dégradé bronze de marque (couleur ≠ typo).
          Fallback `color` solide si background-clip:text non supporté. */}
      <span style={{ display: "block", overflowX: "visible", overflowY: "clip" }}>
        <span
          className="hero-fade-c"
          style={{
            display: "block",
            fontSize: "clamp(44px, 5.2vw, 88px)",
            letterSpacing: "-.03em",
            padding: "0.14em 0 0.1em",
            color: "hsl(var(--gold))",
            background: "var(--grad-gold-shimmer)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ללקוחות להזמין יותר
        </span>
      </span>
    </h1>
  );
}
