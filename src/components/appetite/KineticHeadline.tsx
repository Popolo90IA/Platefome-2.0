"use client";

interface KineticHeadlineProps {
  prefix?: string;
  words: string[];
  suffix?: string;
  className?: string;
}

/**
 * Titre kinétique — 4 mots empilés qui défilent verticalement.
 * Utilise l'utilitaire .kinetic-cycle de globals.css (9s par cycle).
 */
export function KineticHeadline({
  prefix,
  words,
  suffix,
  className = "",
}: KineticHeadlineProps) {
  // On pad à 4 pour matcher l'animation (0% / -100% / -200% / -300%)
  const padded = [...words];
  while (padded.length < 4) padded.push(words[padded.length % words.length]);

  return (
    <div
      className={`flex flex-wrap items-baseline gap-x-4 gap-y-2 ${className}`}
    >
      {prefix && (
        <span className="font-[Instrument_Serif] italic text-[hsl(var(--cream))]">
          {prefix}
        </span>
      )}
      <span
        className="relative inline-block overflow-hidden align-baseline"
        style={{ height: "1em", lineHeight: 1 }}
      >
        <span
          className="kinetic-cycle inline-flex flex-col"
          style={{ lineHeight: 1 }}
        >
          {padded.slice(0, 4).map((w, i) => (
            <span
              key={i}
              className="font-[Instrument_Serif] italic"
              style={{
                color:
                  i === 0
                    ? "hsl(var(--crimson))"
                    : i === 1
                    ? "hsl(var(--matcha))"
                    : i === 2
                    ? "hsl(var(--amber))"
                    : "hsl(var(--cream))",
                height: "1em",
              }}
            >
              {w}
            </span>
          ))}
        </span>
      </span>
      {suffix && (
        <span className="font-[Instrument_Serif] italic text-[hsl(var(--cream))]">
          {suffix}
        </span>
      )}
    </div>
  );
}
