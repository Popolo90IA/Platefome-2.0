import { createClient } from "@/lib/supabase/server";

/* ── loadRestaurantDetail — fetch resto + counts + dishes + owner role ── */
export async function loadRestaurantDetail(id: string) {
  const supabase = await createClient();

  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!restaurant) return null;

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

  return {
    restaurant,
    counts: {
      dishCount: dishCount ?? 0,
      catCount: catCount ?? 0,
      menuViewCount: menuViewCount ?? 0,
      qrScanCount: qrScanCount ?? 0,
      arViewCount: arViewCount ?? 0,
      videoPlayCount: videoPlayCount ?? 0,
    },
    dishes: dishes ?? [],
    ownerRole,
  };
}

export type RestaurantDetail = NonNullable<
  Awaited<ReturnType<typeof loadRestaurantDetail>>
>;
