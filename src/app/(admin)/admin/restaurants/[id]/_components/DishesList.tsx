import { Utensils } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { RestaurantDetail } from "../_lib/queries";

/* ── DishesList — latest 20 dishes grid with 3D/video badges ── */
export function DishesList({ dishes }: { dishes: RestaurantDetail["dishes"] }) {
  return (
    <Card className="shadow-premium">
      <CardContent className="p-6">
        <h2 className="font-serif-display text-xl font-bold mb-4">
          מנות ({dishes.length} אחרונות)
        </h2>
        {dishes.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-2">
            {dishes.map((d) => (
              <div
                key={d.id}
                className="flex items-center gap-3 p-2 rounded-lg bg-secondary/40"
              >
                {d.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={d.image_url}
                    alt={d.name}
                    className="h-12 w-12 rounded object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded bg-secondary flex items-center justify-center text-muted-foreground">
                    <Utensils className="h-4 w-4" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate flex items-center gap-1">
                    {d.name}
                    {!d.is_available && (
                      <span className="text-[9px] text-muted-foreground">(אזל)</span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ₪{d.price}
                    {d.model_3d_url && (
                      <span className="mr-2 text-[hsl(var(--gold-dark))]">3D</span>
                    )}
                    {d.video_url && (
                      <span className="mr-2 text-[hsl(var(--accent-bright))]">וידאו</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">אין מנות עדיין</p>
        )}
      </CardContent>
    </Card>
  );
}
