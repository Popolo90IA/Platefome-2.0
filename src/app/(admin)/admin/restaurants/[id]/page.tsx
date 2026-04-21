import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  ArrowLeft,
  ExternalLink,
  Utensils,
  FolderTree,
  Eye,
  Scan,
  Cuboid,
  PlayCircle,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminRestaurantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!restaurant) notFound();

  const [
    { count: dishCount },
    { count: catCount },
    { count: menuViewCount },
    { count: qrScanCount },
    { count: arViewCount },
    { count: videoPlayCount },
    { data: dishes },
    { data: ownerRole },
  ] = await Promise.all([
    supabase
      .from("dishes")
      .select("*", { count: "exact", head: true })
      .eq("restaurant_id", id),
    supabase
      .from("categories")
      .select("*", { count: "exact", head: true })
      .eq("restaurant_id", id),
    supabase
      .from("menu_events")
      .select("*", { count: "exact", head: true })
      .eq("restaurant_id", id)
      .eq("event_type", "menu_view"),
    supabase
      .from("menu_events")
      .select("*", { count: "exact", head: true })
      .eq("restaurant_id", id)
      .eq("event_type", "qr_scan"),
    supabase
      .from("menu_events")
      .select("*", { count: "exact", head: true })
      .eq("restaurant_id", id)
      .eq("event_type", "ar_view"),
    supabase
      .from("menu_events")
      .select("*", { count: "exact", head: true })
      .eq("restaurant_id", id)
      .eq("event_type", "video_play"),
    supabase
      .from("dishes")
      .select("id, name, price, is_available, image_url, model_3d_url, video_url")
      .eq("restaurant_id", id)
      .order("created_at", { ascending: false })
      .limit(20),
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", restaurant.user_id)
      .maybeSingle(),
  ]);

  return (
    <div className="space-y-6 animate-fade-up">
      <Link
        href="/admin/restaurants"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        חזרה לרשימה
      </Link>

      {/* Header card */}
      <Card className="shadow-premium overflow-hidden">
        {restaurant.banner_url && (
          <div className="relative h-32 bg-charcoal-gradient">
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
              <div className="h-20 w-20 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground flex-shrink-0">
                <Building2 className="h-8 w-8" />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-serif-display text-3xl font-bold">
                  {restaurant.name}
                </h1>
                {restaurant.is_active ? (
                  <span className="text-xs text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-full">
                    פעילה
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
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
                <Button className="w-full bg-gold-gradient hover:opacity-90">
                  <ExternalLink className="h-4 w-4" />
                  פתח תפריט
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <MiniStat icon={<Utensils className="h-4 w-4" />} label="מנות" value={dishCount ?? 0} />
        <MiniStat icon={<FolderTree className="h-4 w-4" />} label="קטגוריות" value={catCount ?? 0} />
        <MiniStat icon={<Eye className="h-4 w-4" />} label="צפיות" value={menuViewCount ?? 0} />
        <MiniStat icon={<Scan className="h-4 w-4" />} label="סריקות QR" value={qrScanCount ?? 0} />
        <MiniStat icon={<Cuboid className="h-4 w-4" />} label="AR" value={arViewCount ?? 0} />
        <MiniStat icon={<PlayCircle className="h-4 w-4" />} label="וידאו" value={videoPlayCount ?? 0} />
      </div>

      {/* Dishes list */}
      <Card className="shadow-premium">
        <CardContent className="p-6">
          <h2 className="font-serif-display text-xl font-bold mb-4">
            מנות ({dishes?.length ?? 0} אחרונות)
          </h2>
          {dishes && dishes.length > 0 ? (
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
                        <span className="mr-2 text-rose-600">וידאו</span>
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
          <div className="h-7 w-7 rounded-md bg-gold-gradient flex items-center justify-center text-white">
            {icon}
          </div>
        </div>
        <div className="font-serif-display text-2xl font-bold">{value.toLocaleString()}</div>
      </CardContent>
    </Card>
  );
}
