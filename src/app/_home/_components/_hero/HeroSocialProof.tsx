"use client";

/**
 * HeroSocialProof — rangée de preuves *produit* (faits vérifiables), pas de
 * statistiques inventées (cf. CLAUDE.md « pas de stats inventées »). Remplace
 * l'ancien stack d'avatars + note 4.9/5 fabriquée.
 */
const PROOF_ITEMS = ["ללא אפליקציה", "סריקת QR", "תלת-מימד · 360°"];

export function HeroSocialProof() {
  return (
    <div
      className="hero-fade-f"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        marginTop: 28,
        flexWrap: "wrap",
        justifyContent: "flex-start",
      }}
    >
      {PROOF_ITEMS.map((label) => (
        <div
          key={label}
          style={{ display: "inline-flex", alignItems: "center", gap: 7 }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="hsl(var(--accent-warm))"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: ".8125rem",
              color: "hsl(var(--subtle))",
              fontWeight: 500,
            }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
