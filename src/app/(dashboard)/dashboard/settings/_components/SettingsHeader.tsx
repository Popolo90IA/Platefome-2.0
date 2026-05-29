"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

type Props = {
  restaurantSlug: string | null;
};

/**
 * SettingsHeader — titre h1 + bouton "פתח תפריט" si restaurant existe.
 */
export function SettingsHeader({ restaurantSlug }: Props) {
  return (
    <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div>
        <h1 className="font-serif-display text-4xl font-bold">
          <span className="text-gold-gradient">הגדרות המסעדה</span>
        </h1>
        <p className="text-muted-foreground mt-2">נהל את פרטי המסעדה</p>
      </div>
      {restaurantSlug && (
        <Link href={`/menu/${restaurantSlug}`} target="_blank">
          <Button
            className="hover:opacity-90 text-white"
            style={{ background: "var(--grad-bronze)" }}
          >
            <ExternalLink className="h-4 w-4" />
            פתח תפריט
          </Button>
        </Link>
      )}
    </div>
  );
}
