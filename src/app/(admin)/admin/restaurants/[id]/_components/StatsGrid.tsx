import { Utensils, FolderTree, Eye, Scan, Cuboid, PlayCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { RestaurantDetail } from "../_lib/queries";

/* ── StatsGrid — 6 mini-stat cards (dishes/cats/views/QR/AR/video) ── */
export function StatsGrid({ counts }: { counts: RestaurantDetail["counts"] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      <MiniStat icon={<Utensils className="h-4 w-4" />} label="מנות" value={counts.dishCount} />
      <MiniStat icon={<FolderTree className="h-4 w-4" />} label="קטגוריות" value={counts.catCount} />
      <MiniStat icon={<Eye className="h-4 w-4" />} label="צפיות" value={counts.menuViewCount} />
      <MiniStat icon={<Scan className="h-4 w-4" />} label="סריקות QR" value={counts.qrScanCount} />
      <MiniStat icon={<Cuboid className="h-4 w-4" />} label="AR" value={counts.arViewCount} />
      <MiniStat icon={<PlayCircle className="h-4 w-4" />} label="וידאו" value={counts.videoPlayCount} />
    </div>
  );
}

function MiniStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <Card className="shadow-premium">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">{label}</span>
          <div className="h-7 w-7 rounded-md flex items-center justify-center text-white" style={{ background: "var(--grad-bronze)" }}>
            {icon}
          </div>
        </div>
        <div className="font-serif-display text-2xl font-bold">{value.toLocaleString()}</div>
      </CardContent>
    </Card>
  );
}
