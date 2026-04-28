import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DishDetailView } from "@/components/menu/DishDetailView";

interface DishPageProps {
  params: Promise<{ slug: string; dishId: string }>;
}

export default async function DishDetailPage({ params }: DishPageProps) {
  const { slug, dishId } = await params;
  const supabase = await createClient();

  const [{ data: restaurant }, { data: dish }] = await Promise.all([
    supabase.from("restaurants").select("*").eq("slug", slug).maybeSingle(),
    supabase.from("dishes").select("*").eq("id", dishId).maybeSingle(),
  ]);

  if (!restaurant || !dish || dish.restaurant_id !== restaurant.id) {
    notFound();
  }

  return <DishDetailView dish={dish} restaurant={restaurant} slug={slug} />;
}
