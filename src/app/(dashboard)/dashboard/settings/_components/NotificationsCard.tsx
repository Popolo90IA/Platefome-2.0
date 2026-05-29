"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, ToggleLeft, ToggleRight } from "lucide-react";
import { SectionIcon } from "./SectionIcon";

type Props = {
  notifWeekly: boolean;
  setNotifWeekly: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * NotificationsCard — toggle pour recevoir un récap hebdo par email.
 */
export function NotificationsCard({ notifWeekly, setNotifWeekly }: Props) {
  return (
    <Card className="shadow-premium">
      <CardHeader>
        <CardTitle className="font-serif-display text-xl flex items-center gap-2.5">
          <SectionIcon>
            <Bell className="h-3.5 w-3.5" />
          </SectionIcon>
          התראות
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-medium">סיכום שבועי</div>
            <div className="text-xs text-muted-foreground mt-0.5">
              קבל אימייל שבועי עם סטטיסטיקות התפריט
            </div>
          </div>
          <button
            type="button"
            onClick={() => setNotifWeekly((v) => !v)}
            className="flex-shrink-0 transition-opacity hover:opacity-80"
          >
            {notifWeekly ? (
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
