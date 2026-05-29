"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2 } from "lucide-react";

type Props = {
  restaurantName: string;
  hasRestaurant: boolean;
  dangerConfirm: string;
  setDangerConfirm: React.Dispatch<React.SetStateAction<string>>;
  deactivating: boolean;
  deactivateSuccess: boolean;
  onDeactivate: () => void;
};

/**
 * DangerZoneCard — désactivation menu avec confirmation par nom restaurant.
 */
export function DangerZoneCard({
  restaurantName,
  hasRestaurant,
  dangerConfirm,
  setDangerConfirm,
  deactivating,
  deactivateSuccess,
  onDeactivate,
}: Props) {
  return (
    <Card
      className="shadow-premium"
      style={{ borderColor: "hsl(var(--ember) / .3)" }}
    >
      <CardHeader>
        <CardTitle className="font-serif-display text-xl flex items-center gap-2.5">
          <div
            className="h-7 w-7 rounded-md flex items-center justify-center flex-shrink-0"
            style={{ background: "hsl(var(--ember) / .15)" }}
          >
            <AlertTriangle
              className="h-3.5 w-3.5"
              style={{ color: "hsl(var(--ember))" }}
            />
          </div>
          <span style={{ color: "hsl(var(--ember))" }}>אזור מסוכן</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          השבתת התפריט תסתיר אותו מהציבור. הנתונים לא יימחקו ותוכל להפעיל מחדש
          בכל עת.
        </p>
        <div className="space-y-2">
          <Label htmlFor="danger-confirm" className="text-sm">
            כדי להמשיך, הקלד{" "}
            <code
              className="px-1.5 py-0.5 rounded text-xs"
              style={{
                background: "hsl(var(--ember) / .1)",
                color: "hsl(var(--ember))",
              }}
            >
              {restaurantName || "שם המסעדה"}
            </code>
          </Label>
          <Input
            id="danger-confirm"
            value={dangerConfirm}
            onChange={(e) => setDangerConfirm(e.target.value)}
            placeholder={restaurantName || "שם המסעדה"}
          />
        </div>
        <Button
          type="button"
          variant="outline"
          disabled={
            dangerConfirm !== restaurantName || deactivating || !hasRestaurant
          }
          onClick={onDeactivate}
          className="border-[hsl(var(--ember))]/40 hover:bg-[hsl(var(--ember))]/10"
          style={{ color: "hsl(var(--ember))" }}
        >
          {deactivating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <AlertTriangle className="h-4 w-4" />
              השבת תפריט
            </>
          )}
        </Button>
        {deactivateSuccess && (
          <p
            className="text-sm font-sans"
            style={{ color: "hsl(158 45% 42%)" }}
          >
            התפריט הושבת. תוכל להפעיל אותו מחדש בכל עת.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
