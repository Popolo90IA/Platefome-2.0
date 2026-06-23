"use client";

import { Eye, Scan, Cuboid, PlayCircle, Utensils } from "lucide-react";
import type { Totals } from "../_lib/types";
import { BigStat } from "./BigStat";

/* ── KpiGrid — 5 top-line KPIs (views, scans, dishes, 3D/AR, video) ── */
export function KpiGrid({ totals }: { totals: Totals }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 auto-rows-fr">
      <BigStat
        icon={<Eye className="h-4 w-4" />}
        label="צפיות בתפריט"
        value={totals.menu_view}
        color="from-[hsl(28,62%,42%)]/20 to-transparent"
      />
      <BigStat
        icon={<Scan className="h-4 w-4" />}
        label="סריקות QR"
        value={totals.qr_scan}
        color="from-[hsl(28,48%,34%)]/20 to-transparent"
      />
      <BigStat
        icon={<Utensils className="h-4 w-4" />}
        label="צפיות במנות"
        value={totals.dish_view}
        color="from-[hsl(22,70%,50%)]/20 to-transparent"
      />
      <BigStat
        icon={<Cuboid className="h-4 w-4" />}
        label="צפיות 3D/AR"
        value={totals.ar_view}
        color="from-[hsl(28,52%,52%)]/20 to-transparent"
      />
      <BigStat
        icon={<PlayCircle className="h-4 w-4" />}
        label="ניגונים וידאו"
        value={totals.video_play}
        color="from-[hsl(36,80%,58%)]/20 to-transparent"
      />
    </div>
  );
}
