"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * LoadingSpinner — skeleton de la liste des restaurants (épouse la forme des
 * RestaurantCard) affiché pendant le chargement.
 */
export function LoadingSpinner() {
  return (
    <div className="grid gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="shadow-premium">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-14 w-14 rounded-xl flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-44" />
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-3 w-56" />
              </div>
              <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                <Skeleton className="h-8 w-20 rounded-md" />
                <Skeleton className="h-8 w-20 rounded-md" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
