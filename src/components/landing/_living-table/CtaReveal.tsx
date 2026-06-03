"use client";

import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/** CTA final — révélé à la fin du scroll (ctaReveal > .05) */
export function CtaReveal({ ctaReveal }: { ctaReveal: number }) {
  return (
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
  );
}
