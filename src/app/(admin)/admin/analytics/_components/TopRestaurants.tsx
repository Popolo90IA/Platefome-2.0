"use client";

import Link from "next/link";
import { TrendingUp, Building2, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { TopRestaurant } from "../_lib/types";

/* ── TopRestaurants — ranked list of top-viewed restaurants ── */
export function TopRestaurants({
  topRestaurants,
  maxTop,
}: {
  topRestaurants: TopRestaurant[];
  maxTop: number;
}) {
  return (
    <Card className="shadow-premium">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-[hsl(var(--gold-dark))]" />
          <h2 className="font-serif-display text-xl font-bold">מובילי הצפיות</h2>
        </div>
        {topRestaurants.length === 0 ? (
          <p className="text-muted-foreground text-sm">אין נתונים עדיין</p>
        ) : (
          <div className="space-y-2">
            {topRestaurants.map((r, i) => (
              <Link
                key={r.restaurant_id}
                href={`/admin/restaurants/${r.restaurant_id}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/60 transition-colors group"
              >
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    i === 0 ? "text-white" : "bg-secondary text-foreground"
                  }`}
                  style={
                    i === 0
                      ? {
                          background: "var(--grad-bronze)",
                          boxShadow: "0 2px 10px hsl(28 62% 38% / .35)",
                        }
                      : {}
                  }
                >
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="font-medium truncate">{r.name}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full"
                      style={{
                        background: "var(--grad-bronze)",
                        width: `${(r.views / maxTop) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="text-left flex-shrink-0">
                  <div className="font-serif-display text-xl font-bold">
                    {r.views}
                  </div>
                  <div className="text-[10px] text-muted-foreground">צפיות</div>
                </div>
                <ArrowLeft className="h-4 w-4 text-muted-foreground/40 group-hover:text-foreground transition-colors" />
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
