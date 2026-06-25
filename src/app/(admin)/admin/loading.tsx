import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton de chargement du dashboard admin — épouse la forme de page.tsx
 * (en-tête + grille de 6 stats + liste « מסעדות חדשות »). Rendu pendant que
 * le server component attend les comptages Supabase.
 */
export default function AdminLoading() {
  return (
    <div className="space-y-8" dir="rtl">
      {/* En-tête */}
      <div className="space-y-2.5">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Grille de stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="shadow-premium">
            <CardContent className="px-5 py-4">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <Skeleton className="h-9 w-20 mt-3" />
              <Skeleton className="h-3.5 w-24 mt-2.5" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Liste restaurants récents */}
      <Card className="shadow-premium">
        <CardContent className="p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3">
                <Skeleton className="h-10 w-10 rounded-lg flex-shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-40" />
                  <Skeleton className="h-3 w-28" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
