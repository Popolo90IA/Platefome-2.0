"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { EditableText } from "@/components/editable/EditableText";
import { TableTextureBg } from "./TableTextureBg";
import { PhoneToPlatterTransition } from "./PhoneToPlatterTransition";
import { Plate3DStage } from "./Plate3DStage";
import { FloatingBadges } from "./FloatingBadges";
import { ExperiencePath } from "./ExperiencePath";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * LivingTable — the signature scroll-driven showcase.
 *
 * Story (scroll progress 0 → 1):
 *   Act 1 (0.00 - 0.25): Empty plate on linen table. Phone hovers above with QR.
 *   Act 2 (0.25 - 0.55): Phone dissolves into gold particles.
 *   Act 3 (0.55 - 0.85): Particles become plate, 3D dish rises, badges orbit.
 *   Act 4 (0.85 - 1.00): Stable plate, CTA reveals.
 */
export function LivingTable() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Total scrollable range: when top of section reaches viewport top
      // until bottom of section leaves viewport top. We use the sticky body.
      const total = rect.height - vh;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / Math.max(1, total)));
      setProgress(p);
      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Chapter detection
  const act =
    progress < 0.25
      ? 1
      : progress < 0.55
      ? 2
      : progress < 0.85
      ? 3
      : 4;

  // Transition progress for the phone→plate (0 to 1 mapped from 0.1 → 0.7 of global)
  const transitionProgress = Math.max(
    0,
    Math.min(1, (progress - 0.1) / 0.55)
  );

  // Plate3D active from 0.55+
  const plateActive = progress > 0.55;

  // Badges start appearing at 0.7
  const badgesActive = progress > 0.7;

  // CTA reveal at 0.9
  const ctaReveal = Math.max(0, Math.min(1, (progress - 0.85) / 0.12));

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "320vh" }} // scroll room
      aria-label="La table vivante"
    >
      {/* Sticky stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Warm table background */}
        <TableTextureBg />

        {/* Decorative divider top */}
        <div
          className="absolute top-16 left-1/2 -translate-x-1/2 h-[1px] w-64 divider-gold opacity-60"
          aria-hidden
        />

        {/* Chapter indicator (top-left) */}
        <div className="absolute top-8 start-8 z-30 flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-1 rounded-full transition-all duration-500"
                style={{
                  width: act === n ? "28px" : "10px",
                  background:
                    act >= n
                      ? "hsl(var(--gold))"
                      : "hsl(var(--gold) / 0.25)",
                }}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-[hsl(var(--gold-dark))] tracking-wide">
            פרק {act} / 4
          </span>
        </div>

        {/* Act title (top center) */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none">
          <ActTitle act={act} />
        </div>

        {/* Main stage — the table surface */}
        <div className="relative h-full w-full flex items-center justify-center px-4">
          {/* Central scene container */}
          <div className="relative w-full max-w-4xl h-[75vh] flex items-center justify-center">
            {/* Phone → Plate transition layer */}
            <div
              className="absolute inset-0 flex items-center justify-center z-20"
              style={{
                opacity: progress < 0.62 ? 1 : 1 - (progress - 0.62) / 0.1,
                transition: "opacity 200ms linear",
              }}
            >
              <PhoneToPlatterTransition progress={transitionProgress} />
            </div>

            {/* 3D plate stage layer */}
            <div
              className="absolute inset-0 flex items-center justify-center z-10"
              style={{
                opacity: plateActive ? 1 : 0,
              }}
            >
              <Plate3DStage active={plateActive} />
            </div>

            {/* Floating badges layer */}
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <FloatingBadges active={badgesActive} radius={260} />
            </div>

            {/* CTA reveal at end */}
            {ctaReveal > 0.05 && (
              <div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3"
                style={{
                  opacity: ctaReveal,
                  transform: `translate(-50%, ${(1 - ctaReveal) * 20}px)`,
                  transition: "opacity 400ms ease, transform 400ms ease",
                }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(var(--gold))]/15 border border-[hsl(var(--gold))]/30 backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5 text-[hsl(var(--gold))]" />
                  <span className="text-sm font-medium text-[hsl(var(--gold-dark))]">
                    המנה מוכנה להזמנה
                  </span>
                </div>
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="bg-gold-gradient hover:opacity-90 shadow-gold-glow px-8 h-14 text-base font-semibold"
                  >
                    תן ללקוחות שלך לטעום לפני
                    <ArrowLeft className="h-4 w-4 mr-1" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Bottom hint (scroll indicator) */}
        {progress < 0.1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60 animate-bounce">
            <div className="text-xs text-[hsl(var(--gold-dark))] font-medium">
              גלול להמשך הסיפור
            </div>
            <div className="h-8 w-[2px] bg-gradient-to-b from-[hsl(var(--gold))] to-transparent" />
          </div>
        )}

        {/* Experience Path (bottom) — visible during acts 3-4 */}
        <div
          className="absolute bottom-6 left-0 right-0 z-30 transition-opacity duration-700"
          style={{ opacity: progress > 0.3 ? 1 : 0 }}
        >
          <ExperiencePath progress={progress} />
        </div>

        {/* Corner ornaments — gold decorative accents */}
        <CornerOrnament position="top-start" />
        <CornerOrnament position="top-end" />
        <CornerOrnament position="bottom-start" />
        <CornerOrnament position="bottom-end" />
      </div>
    </section>
  );
}

/** Titre de l'acte courant — Playfair Display, change au scroll */
function ActTitle({ act }: { act: number }) {
  const titles: Record<number, { title: string; subtitle: string; key: string }> =
    {
      1: {
        key: "livingtable.act1",
        title: "הצלחת מחכה",
        subtitle: "הלקוח מתיישב. הוא פותח את הטלפון.",
      },
      2: {
        key: "livingtable.act2",
        title: "הטלפון נעלם",
        subtitle: "ובמקומו — חוויה שלא שכחת",
      },
      3: {
        key: "livingtable.act3",
        title: "המנה קמה לחיים",
        subtitle: "תלת־מימד על השולחן שלו. לפני ההזמנה.",
      },
      4: {
        key: "livingtable.act4",
        title: "הוא מזמין",
        subtitle: "כי הוא כבר ראה. כבר הרגיש. כבר החליט.",
      },
    };
  const current = titles[act];

  return (
    <div
      key={act}
      className="animate-fade-up"
      style={{ animationDuration: "800ms" }}
    >
      <h2 className="font-serif-display text-3xl md:text-5xl font-bold leading-tight text-foreground mb-2">
        <EditableText
          contentKey={`${current.key}.title`}
          defaultValue={current.title}
          as="span"
        />
      </h2>
      <p className="text-sm md:text-base text-foreground/70 font-medium">
        <EditableText
          contentKey={`${current.key}.subtitle`}
          defaultValue={current.subtitle}
          as="span"
        />
      </p>
    </div>
  );
}

/** Ornement doré d'angle — rappel d'un menu de restaurant classique */
function CornerOrnament({
  position,
}: {
  position: "top-start" | "top-end" | "bottom-start" | "bottom-end";
}) {
  const classes: Record<typeof position, string> = {
    "top-start": "top-4 start-4",
    "top-end": "top-4 end-4",
    "bottom-start": "bottom-4 start-4",
    "bottom-end": "bottom-4 end-4",
  };
  const rotations: Record<typeof position, string> = {
    "top-start": "rotate(0deg)",
    "top-end": "rotate(90deg)",
    "bottom-start": "rotate(270deg)",
    "bottom-end": "rotate(180deg)",
  };

  return (
    <svg
      className={`absolute ${classes[position]} w-10 h-10 text-[hsl(var(--gold))]/50 pointer-events-none`}
      style={{ transform: rotations[position] }}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
    >
      <path
        d="M2 2 L14 2 M2 2 L2 14 M2 2 Q8 8 14 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="2" cy="2" r="2" fill="currentColor" />
    </svg>
  );
}
