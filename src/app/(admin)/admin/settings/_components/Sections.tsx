"use client";

import { Settings, Globe, Bell, Shield, Database } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { AdminSettingsCtrl } from "../_lib/useAdminSettings";
import { SectionCard, SettingRow, Toggle } from "./primitives";

/* ── Settings sections — each fed the shared form ctrl ── */
export function GeneralSection({ s }: { s: AdminSettingsCtrl }) {
  return (
    <SectionCard title="כללי" icon={<Settings className="h-4 w-4" />}>
      <SettingRow label="שם הפלטפורמה" description="מוצג בכותרות ובמיילים">
        <Input
          value={s.platformName}
          onChange={(e) => s.setPlatformName(e.target.value)}
          className="w-48 text-sm"
          dir="ltr"
        />
      </SettingRow>
      <SettingRow label="אימייל תמיכה" description="כתובת ליצירת קשר עם משתמשים">
        <Input
          value={s.supportEmail}
          onChange={(e) => s.setSupportEmail(e.target.value)}
          className="w-56 text-sm"
          dir="ltr"
        />
      </SettingRow>
    </SectionCard>
  );
}

export function PlatformSection({ s }: { s: AdminSettingsCtrl }) {
  return (
    <SectionCard title="פלטפורמה" icon={<Globe className="h-4 w-4" />}>
      <SettingRow
        label="הרשמה פתוחה"
        description="אפשר למשתמשים חדשים להירשם לפלטפורמה"
      >
        <Toggle checked={s.allowSignup} onChange={s.setAllowSignup} />
      </SettingRow>
      <SettingRow
        label="מצב תחזוקה"
        description="חוסם גישה לכל המשתמשים מלבד Super Admin"
      >
        <Toggle checked={s.maintenanceMode} onChange={s.setMaintenanceMode} />
      </SettingRow>
      <SettingRow
        label="מקסימום מנות (חינם)"
        description="מספר מנות מקסימלי בתוכנית החינמית"
      >
        <Input
          value={s.maxDishes}
          onChange={(e) => s.setMaxDishes(e.target.value)}
          className="w-20 text-sm text-center"
          dir="ltr"
          type="number"
          min="1"
        />
      </SettingRow>
    </SectionCard>
  );
}

export function NotificationsSection({ s }: { s: AdminSettingsCtrl }) {
  return (
    <SectionCard title="התראות" icon={<Bell className="h-4 w-4" />}>
      <SettingRow label="התראות אימייל" description="שליחת התראות כלליות למנהל">
        <Toggle checked={s.emailNotifs} onChange={s.setEmailNotifs} />
      </SettingRow>
      <SettingRow label="מסעדה חדשה" description="קבל התראה כשמסעדה חדשה נרשמת">
        <Toggle
          checked={s.newRestaurantAlert}
          onChange={s.setNewRestaurantAlert}
        />
      </SettingRow>
    </SectionCard>
  );
}

export function SecuritySection({ s }: { s: AdminSettingsCtrl }) {
  return (
    <SectionCard title="אבטחה" icon={<Shield className="h-4 w-4" />}>
      <SettingRow
        label="אימות דו-שלבי (2FA)"
        description="חובה לכל חשבונות Super Admin"
      >
        <Toggle checked={s.require2FA} onChange={s.setRequire2FA} />
      </SettingRow>
      <SettingRow label="תפוגת סשן" description="ניתוק אוטומטי לאחר חוסר פעילות">
        <select
          className="text-sm border border-border rounded-md px-3 py-1.5 bg-background"
          defaultValue="24"
        >
          <option value="1">שעה</option>
          <option value="8">8 שעות</option>
          <option value="24">24 שעות</option>
          <option value="168">שבוע</option>
        </select>
      </SettingRow>
    </SectionCard>
  );
}

export function DataSection({ s }: { s: AdminSettingsCtrl }) {
  return (
    <SectionCard title="נתונים" icon={<Database className="h-4 w-4" />}>
      <SettingRow label="גיבוי אוטומטי" description="גיבוי יומי של מסד הנתונים">
        <Toggle checked={s.autoBackup} onChange={s.setAutoBackup} />
      </SettingRow>
      <SettingRow label="שמירת לוגים" description="משך שמירת לוגי פעילות">
        <select
          className="text-sm border border-border rounded-md px-3 py-1.5 bg-background"
          defaultValue="90"
        >
          <option value="30">30 יום</option>
          <option value="90">90 יום</option>
          <option value="180">180 יום</option>
          <option value="365">שנה</option>
        </select>
      </SettingRow>
    </SectionCard>
  );
}
