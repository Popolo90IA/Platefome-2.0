"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, ToggleLeft, ToggleRight } from "lucide-react";
import { SectionIcon } from "./SectionIcon";

type Props = {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * MenuVisibilityCard — toggle ON/OFF de la visibilité publique du menu.
 */
export function MenuVisibilityCard({ isActive, setIsActive }: Props) {
  return (
    <Card className="shadow-premium">
      <CardHeader>
        <CardTitle className="font-serif-display text-xl flex items-center gap-2.5">
          <SectionIcon>
            <Eye className="h-3.5 w-3.5" />
          </SectionIcon>
          נראות התפריט
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-medium">הצג תפריט ללקוחות</div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {isActive
                ? "התפריט ציבורי וגלוי לכל מי שיש לו את הקישור"
                : "התפריט מוסתר — לקוחות יראו עמוד 'לא זמין'"}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsActive((v) => !v)}
            className="flex-shrink-0 transition-opacity hover:opacity-80"
            title={isActive ? "לחץ להסתרה" : "לחץ להפעלה"}
          >
            {isActive ? (
              <ToggleRight
                className="h-9 w-9"
                style={{ color: "hsl(var(--accent-bright))" }}
              />
            ) : (
              <ToggleLeft className="h-9 w-9 text-muted-foreground" />
            )}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
