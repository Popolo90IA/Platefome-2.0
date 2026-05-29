"use client";

/**
 * DesignHeader — eyebrow + h1 gradient + sous-titre du panneau design.
 */
export function DesignHeader() {
  return (
    <div>
      <p
        className="font-mono uppercase text-xs mb-1"
        style={{
          letterSpacing: ".1em",
          color: "hsl(var(--accent-bright))",
        }}
      >
        עיצוב
      </p>
      <h1 className="font-serif-display text-3xl font-bold">
        <span className="text-gold-gradient">מראה התפריט</span>
      </h1>
      <p className="text-muted-foreground mt-1 text-xs">
        השינויים מופיעים בתצוגה המקדימה מיד · שמור כדי להחיל על הלקוחות
      </p>
    </div>
  );
}
