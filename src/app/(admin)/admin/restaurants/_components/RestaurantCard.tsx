"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Building2,
  ExternalLink,
  Eye,
  Moon,
  MoreVertical,
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
 * RestaurantCard — carte ligne (logo, infos, badges). Action primaire
 * « פרטים » visible ; actions secondaires (תפריט, עיצוב, activation, suppression)
 * regroupées dans un menu kebab pour désencombrer.
 */
export function RestaurantCard({
  r,
  busy,
  onToggleActive,
  onOpenTheme,
  onConfirmDelete,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const themeColor = hslToHex(r.theme_primary ?? DEFAULT_THEME_PRIMARY);

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const itemCls =
    "flex items-center gap-2.5 w-full px-2.5 py-2 rounded-md text-[13px] text-start transition-colors disabled:opacity-50 disabled:pointer-events-none";

  return (
    <Card
      className={`shadow-premium transition-all ${!r.is_active ? "opacity-60" : ""}`}
      style={{ position: "relative", zIndex: menuOpen ? 30 : 1 }}
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

          <div className="flex-1 min-w-[12rem]">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-serif-display text-lg font-bold">{r.name}</h3>
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
              <span>נוצרה {new Date(r.created_at).toLocaleDateString("he-IL")}</span>
              <span className="flex items-center gap-1.5">
                <span
                  className="h-3.5 w-3.5 rounded-full border border-border/50 flex-shrink-0"
                  style={{ backgroundColor: themeColor }}
                />
                {r.theme_dark_mode !== false ? (
                  <Moon className="h-3 w-3 text-muted-foreground/60" />
                ) : (
                  <Sun className="h-3 w-3 text-muted-foreground/60" />
                )}
              </span>
            </div>
          </div>

          {/* Actions : primaire visible + kebab */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link href={`/admin/restaurants/${r.id}`}>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4" />
                פרטים
              </Button>
            </Link>

            <div className="relative" ref={menuRef}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMenuOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                aria-label="פעולות נוספות"
                className="px-2"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>

              {menuOpen && (
                <div
                  role="menu"
                  className="absolute top-full mt-1.5 w-44 rounded-xl overflow-hidden z-50 p-1.5 animate-fade-up"
                  style={{
                    insetInlineEnd: 0,
                    background: "hsl(var(--deep))",
                    border: "1px solid hsl(var(--line))",
                    boxShadow: "0 16px 48px rgba(0,0,0,.5)",
                  }}
                >
                  <Link
                    href={`/menu/${r.slug}`}
                    target="_blank"
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                    className={`${itemCls} hover:bg-[hsl(var(--accent-bright))]/10 hover:text-[hsl(var(--fog))]`}
                    style={{ color: "hsl(var(--subtle))" }}
                  >
                    <ExternalLink className="h-4 w-4 flex-shrink-0" strokeWidth={1.6} />
                    תפריט
                  </Link>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setMenuOpen(false);
                      onOpenTheme();
                    }}
                    className={`${itemCls} hover:bg-[hsl(var(--accent-bright))]/10 hover:text-[hsl(var(--fog))]`}
                    style={{ color: "hsl(var(--subtle))" }}
                  >
                    <Palette
                      className="h-4 w-4 flex-shrink-0"
                      style={{ color: themeColor }}
                      strokeWidth={1.6}
                    />
                    עיצוב
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setMenuOpen(false);
                      onToggleActive();
                    }}
                    disabled={busy}
                    className={`${itemCls} hover:bg-[hsl(var(--accent-bright))]/10 hover:text-[hsl(var(--fog))]`}
                    style={{ color: "hsl(var(--subtle))" }}
                  >
                    <Power className="h-4 w-4 flex-shrink-0" strokeWidth={1.6} />
                    {r.is_active ? "השבת" : "הפעל"}
                  </button>

                  <div
                    className="my-1 h-px"
                    style={{ background: "hsl(var(--line))" }}
                  />

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setMenuOpen(false);
                      onConfirmDelete();
                    }}
                    disabled={busy}
                    className={`${itemCls} hover:bg-[hsl(var(--ember))]/10`}
                    style={{ color: "hsl(var(--ember))" }}
                  >
                    <Trash2 className="h-4 w-4 flex-shrink-0" strokeWidth={1.6} />
                    מחק
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
