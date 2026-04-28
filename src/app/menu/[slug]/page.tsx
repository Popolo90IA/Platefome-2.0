import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MenuView } from "@/components/menu/MenuView";

interface MenuPageProps {
  params: Promise<{ slug: string }>;
}

export default async function MenuPage({ params }: MenuPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (!restaurant) {
    notFound();
  }

  // Restaurant désactivé par l'admin → page neutre (pas 404 pour que l'utilisateur sache)
  if (!restaurant.is_active) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-charcoal-gradient text-white">
        <div className="text-center max-w-md">
          <h1 className="font-serif-display text-3xl font-bold mb-3">
            התפריט אינו זמין כרגע
          </h1>
          <p className="text-white/70">
            המסעדה השביתה זמנית את התפריט שלה. נסה שוב מאוחר יותר.
          </p>
        </div>
      </div>
    );
  }

  const [{ data: categories }, { data: dishes }] = await Promise.all([
    supabase
      .from("categories")
      .select("*")
      .eq("restaurant_id", restaurant.id)
      .order("display_order"),
    supabase
      .from("dishes")
      .select("*")
      .eq("restaurant_id", restaurant.id)
      .order("created_at"),
  ]);

  return (
    <MenuView
      restaurant={restaurant}
      categories={categories ?? []}
      dishes={dishes ?? []}
      slug={slug}
    />
  );
}
