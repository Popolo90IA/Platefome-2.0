import Link from "next/link";
import { Building2, ExternalLink, Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { RestaurantDetail } from "../_lib/queries";

/* ── RestaurantHeader — banner + logo + meta + open-menu CTA ── */
export function RestaurantHeader({
  restaurant,
  ownerRole,
}: {
  restaurant: RestaurantDetail["restaurant"];
  ownerRole: RestaurantDetail["ownerRole"];
}) {
  return (
    <Card className="shadow-premium overflow-hidden">
      {restaurant.banner_url && (
        <div className="relative h-32" style={{ background: "var(--grad-bronze)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={restaurant.banner_url}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
        </div>
      )}
      <CardContent className="p-6">
        <div className="flex items-start gap-4 flex-wrap">
          {restaurant.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={restaurant.logo_url}
              alt={restaurant.name}
              className="h-20 w-20 rounded-xl object-cover border-2 border-border/60 flex-shrink-0"
            />
          ) : (
            <div className="h-20 w-20 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--grad-bronze)" }}>
              <Building2 className="h-8 w-8 text-white" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-serif-display text-3xl font-bold">
                {restaurant.name}
              </h1>
              {restaurant.is_active ? (
                <span className="text-xs text-[hsl(var(--accent-bright))] bg-[hsl(var(--accent-bright))]/10 px-2 py-1 rounded-full">
                  פעילה
                </span>
              ) : (
                <span className="text-xs text-muted-foreground bg-[hsl(var(--line))]/40 px-2 py-1 rounded-full">
                  מושבתת
                </span>
              )}
              {ownerRole?.role === "super_admin" && (
                <span className="text-xs text-[hsl(var(--gold-dark))] bg-[hsl(var(--gold))]/10 px-2 py-1 rounded-full">
                  Admin
                </span>
              )}
            </div>
            <div className="text-sm text-muted-foreground mt-1" dir="ltr">
              /menu/{restaurant.slug}
            </div>
            {restaurant.description && (
              <p className="text-sm mt-3 text-foreground/80">
                {restaurant.description}
              </p>
            )}

            <div className="grid sm:grid-cols-3 gap-3 mt-4 text-sm">
              {restaurant.email && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate" dir="ltr">{restaurant.email}</span>
                </div>
              )}
              {restaurant.phone && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span dir="ltr">{restaurant.phone}</span>
                </div>
              )}
              {restaurant.address && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">{restaurant.address}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 flex-shrink-0">
            <Link href={`/menu/${restaurant.slug}`} target="_blank">
              <Button className="w-full hover:opacity-90 text-white" style={{ background: "var(--grad-bronze)" }}>
                <ExternalLink className="h-4 w-4" />
                פתח תפריט
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
