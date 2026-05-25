import Link from "next/link";
import { FolderTree } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function NoCategoriesState() {
  return (
    <Card className="max-w-md mx-auto shadow-premium">
      <CardContent className="pt-8 pb-8 text-center">
        <FolderTree className="h-12 w-12 mx-auto text-[hsl(var(--gold))] mb-4" />
        <p className="mb-5 text-muted-foreground">
          עליך ליצור קטגוריה לפני הוספת מנות
        </p>
        <Link href="/dashboard/categories">
          <Button className="bg-gold-gradient hover:opacity-90">
            צור קטגוריה
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
