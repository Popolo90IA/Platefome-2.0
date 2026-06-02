"use client";

import Link from "next/link";
import {
  Building2,
  ExternalLink,
  Eye,
  Moon,
  Palette,
  Power,
  Sun,
  Trash2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { hslToHex } from "@/lib/theme";
import { DEFAULT_THEME_PRIMARY } from "../_lib/constants";
import type { RestaurantWithStats } from "../_lib/types";

interface Props {
  r: RestaurantWithStats;
  busy: boolean;
  onToggleActive: () => void;
  onOpenTheme: () => void;
  onConfirmDelete: () => void;
}

/**
 * RestaurantCard — carte ligne (logo, infos, badges, actions).
 */
export function RestaurantCard({
  r,
  busy,
  onToggleActive,
  onOpenTheme,
  onConfirmDelete,
}: Props) {
  return (
    <Card
      className={`shadow-premium transition-all ${
        !r.is_active ? "opacity-60" : ""
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4 flex-wrap">
          {r.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={r.logo_url}
              alt={r.name}
              className="h-14 w-14 rounded-xl object-cover border border-border/60 flex-shrink-0"
            />
          ) : (
            <div
              className="h-14 w-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--grad-bronze)" }}
            >
              <Building2 className="h-5 w-5 text-white" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-serif-display text-lg font-bold truncate">
                {r.name}
              </h3>
              {r.is_active ? (
                <span className="text-[10px] text-[hsl(var(--accent-bright))] bg-[hsl(var(--accent-bright))]/10 px-2 py-0.5 rounded-full">
                  פעילה
                </span>
              ) : (
                <span className="text-[10px] text-muted-foreground bg-[hsl(var(--line))]/40 px-2 py-0.5 rounded-full">
                  מושבתת
                </span>
              )}
            </div>
            <div
              className="text-xs text-muted-foreground mt-0.5 truncate"
              dir="ltr"
            >
              /menu/{r.slug}
            </div>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground flex-wrap">
              <span>{r.dish_count} מנות</span>
              <span>{r.view_count} צפיות</span>
              <span>
                נוצרה {new Date(r.created_at).toLocaleDateString("he-IL")}
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  className="h-3.5 w-3.5 rounded-full border border-border/50 flex-shrink-0"
                  style={{
                    backgroundColor: hslToHex(
                      r.theme_primary ?? DEFAULT_THEME_PRIMARY
                    ),
                  }}
                />
                {r.theme_dark_mode !== false ? (
                  <Moon className="h-3 w-3 text-muted-foreground/60" />
                ) : (
                  <Sun className="h-3 w-3 text-muted-foreground/60" />
                )}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 flex-wrap justify-end">
            <Link href={`/admin/restaurants/${r.id}`}>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4" />
                פרטים
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenTheme}
              className="hover:border-[hsl(var(--gold))]/40"
            >
              <Palette
                className="h-4 w-4"
                style={{
                  color: hslToHex(
                    r.theme_primary ?? DEFAULT_THEME_PRIMARY
                  ),
                }}
              />
              עיצוב
            </Button>
            <Link href={`/menu/${r.slug}`} target="_blank">
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4" />
                תפריט
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleActive}
              disabled={busy}
              className={
                r.is_active
                  ? "text-[hsl(var(--ember))] hover:bg-[hsl(var(--ember))]/10"
                  : "text-[hsl(var(--accent-bright))] hover:bg-[hsl(var(--accent-bright))]/10"
              }
            >
              <Power className="h-4 w-4" />
              {r.is_active ? "השבת" : "הפעל"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onConfirmDelete}
              disabled={busy}
              className="text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
              מחק
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
