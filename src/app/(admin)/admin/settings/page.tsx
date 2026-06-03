"use client";

import { Save, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminSettings } from "./_lib/useAdminSettings";
import {
  GeneralSection,
  PlatformSection,
  NotificationsSection,
  SecuritySection,
  DataSection,
} from "./_components/Sections";

export default function AdminSettingsPage() {
  const s = useAdminSettings();

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-serif-display text-4xl font-bold">
            <span className="text-gold-gradient">הגדרות מערכת</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            הגדרות גלובליות של הפלטפורמה
          </p>
        </div>
        <Button
          onClick={s.handleSave}
          className="text-white gap-2"
          style={{ background: "var(--grad-bronze)" }}
        >
          {s.saved ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              נשמר
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              שמור הגדרות
            </>
          )}
        </Button>
      </div>

      <GeneralSection s={s} />
      <PlatformSection s={s} />
      <NotificationsSection s={s} />
      <SecuritySection s={s} />
      <DataSection s={s} />
    </div>
  );
}
