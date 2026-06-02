"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FolderTree } from "lucide-react";

export function NoRestaurantState() {
  return (
    <Card className="max-w-md mx-auto shadow-premium">
      <CardContent className="pt-8 pb-8 text-center">
        <FolderTree
          className="h-12 w-12 mx-auto mb-4"
          style={{ color: "hsl(var(--accent-bright))" }}
        />
        <p className="mb-5 text-muted-foreground">צור תחילה פרופיל מסעדה</p>
        <Link href="/dashboard/settings">
          <Button
            className="text-white hover:opacity-90"
            style={{ background: "var(--grad-bronze)" }}
          >
            צור פרופיל
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
