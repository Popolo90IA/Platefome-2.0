import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { loadRestaurantDetail } from "./_lib/queries";
import { RestaurantHeader } from "./_components/RestaurantHeader";
import { StatsGrid } from "./_components/StatsGrid";
import { DishesList } from "./_components/DishesList";

export const dynamic = "force-dynamic";

export default async function AdminRestaurantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await loadRestaurantDetail(id);
  if (!data) notFound();

  return (
    <div className="space-y-6 animate-fade-up">
      <Link
        href="/admin/restaurants"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        חזרה לרשימה
      </Link>

      <RestaurantHeader restaurant={data.restaurant} ownerRole={data.ownerRole} />
      <StatsGrid counts={data.counts} />
      <DishesList dishes={data.dishes} />
    </div>
  );
}
