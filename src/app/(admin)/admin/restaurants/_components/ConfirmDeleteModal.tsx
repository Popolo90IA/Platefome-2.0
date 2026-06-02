"use client";

import { AlertTriangle, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  busy: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

/**
 * ConfirmDeleteModal — modal confirmation suppression restaurant.
 */
export function ConfirmDeleteModal({ busy, onCancel, onConfirm }: Props) {
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <Card
        className="max-w-md w-full shadow-premium"
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <h3 className="font-serif-display text-xl font-bold">
              מחיקת מסעדה
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            פעולה זו תמחק לצמיתות את המסעדה, כל המנות, הקטגוריות וה-analytics
            שלה. לא ניתן לבטל.
          </p>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onCancel} disabled={busy}>
              ביטול
            </Button>
            <Button
              onClick={onConfirm}
              disabled={busy}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              <Trash2 className="h-4 w-4" />
              מחק לצמיתות
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
