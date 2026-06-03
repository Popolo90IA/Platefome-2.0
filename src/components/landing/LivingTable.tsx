"use client";

import { ExperiencePath } from "./ExperiencePath";
import { FloatingBadges } from "./FloatingBadges";
import { PhoneToPlatterTransition } from "./PhoneToPlatterTransition";
import { Plate3DStage } from "./Plate3DStage";
import { TableTextureBg } from "./TableTextureBg";
import { ActTitle } from "./_living-table/ActTitle";
import { CornerOrnament } from "./_living-table/CornerOrnament";
import { CtaReveal } from "./_living-table/CtaReveal";
import { useScrollStory } from "./_living-table/useScrollStory";

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
  const {
    sectionRef,
    progress,
    act,
    transitionProgress,
    plateActive,
    badgesActive,
    ctaReveal,
  } = useScrollStory();

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "320vh" }} // scroll room
      aria-label="La table vivante"
    >
      {/* Sticky stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
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
                    act >= n ? "hsl(var(--gold))" : "hsl(var(--gold) / 0.25)",
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
              style={{ opacity: plateActive ? 1 : 0 }}
            >
              <Plate3DStage active={plateActive} />
            </div>

            {/* Floating badges layer */}
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <FloatingBadges active={badgesActive} radius={260} />
            </div>

            {/* CTA reveal at end */}
            {ctaReveal > 0.05 && <CtaReveal ctaReveal={ctaReveal} />}
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
