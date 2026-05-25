"use client";

import { Plus, Utensils } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EmptyDishesStateProps {
  showForm: boolean;
  onCreate: () => void;
}

export function EmptyDishesState({ showForm, onCreate }: EmptyDishesStateProps) {
  return (
    <Card className="shadow-premium">
      <CardContent className="pt-10 pb-10 text-center">
        <Utensils className="h-12 w-12 mx-auto text-[hsl(var(--gold))] opacity-50 mb-4" />
        <p className="text-muted-foreground mb-5">אין מנות עדיין</p>
        {!showForm && (
          <Button
            onClick={onCreate}
            className="bg-gold-gradient hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            הוסף מנה ראשונה
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
