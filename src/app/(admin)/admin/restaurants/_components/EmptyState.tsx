"use client";

import { Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  hasSearch: boolean;
}

/**
 * EmptyState — pas de restaurant ou aucun match recherche.
 */
export function EmptyState({ hasSearch }: Props) {
  return (
    <Card className="shadow-premium">
      <CardContent className="py-16 text-center">
        <Building2 className="h-12 w-12 text-muted-foreground/70 mx-auto mb-3" />
        <p className="text-muted-foreground">
          {hasSearch ? "לא נמצאו תוצאות" : "אין מסעדות במערכת"}
        </p>
      </CardContent>
    </Card>
  );
}
