import Link from "next/link";
import { Utensils } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function NoRestaurantState() {
  return (
    <Card className="max-w-md mx-auto shadow-premium">
      <CardContent className="pt-8 pb-8 text-center">
        <Utensils className="h-12 w-12 mx-auto text-[hsl(var(--gold))] mb-4" />
        <p className="mb-5 text-muted-foreground">צור תחילה פרופיל מסעדה</p>
        <Link href="/dashboard/settings">
          <Button className="bg-gold-gradient hover:opacity-90">
            צור פרופיל
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
