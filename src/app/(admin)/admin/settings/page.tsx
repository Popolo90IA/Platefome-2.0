"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Settings,
  Globe,
  Bell,
  Shield,
  Database,
  Save,
  CheckCircle2,
} from "lucide-react";

type Section = {
  key: string;
  label: string;
  icon: React.ReactNode;
};

const SECTIONS: Section[] = [
  { key: "general", label: "כללי", icon: <Settings className="h-4 w-4" /> },
  { key: "platform", label: "פלטפורמה", icon: <Globe className="h-4 w-4" /> },
  { key: "notifications", label: "התראות", icon: <Bell className="h-4 w-4" /> },
  { key: "security", label: "אבטחה", icon: <Shield className="h-4 w-4" /> },
  { key: "data", label: "נתונים", icon: <Database className="h-4 w-4" /> },
];

function SectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card className="shadow-premium">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-5">
          <div
            className="h-7 w-7 rounded-md flex items-center justify-center text-white"
            style={{ background: "var(--grad-bronze)" }}
          >
            {icon}
          </div>
          <h2 className="font-serif-display text-lg font-bold">{title}</h2>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}

function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-6 py-4 border-b border-border/50 last:border-0">
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium">{label}</div>
        {description && (
          <div className="text-xs text-muted-foreground mt-0.5">{description}</div>
        )}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="relative h-6 w-11 rounded-full transition-colors duration-200 focus:outline-none"
      style={{
        background: checked ? "var(--grad-bronze)" : "hsl(var(--line))",
      }}
    >
      <span
        className="block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200"
        style={{
          transform: checked ? "translateX(-1.5rem)" : "translateX(-0.25rem)",
          marginTop: "4px",
          marginRight: checked ? "0" : "auto",
          position: "absolute",
          top: 0,
          right: checked ? "0.25rem" : "auto",
          left: checked ? "auto" : "0.25rem",
        }}
      />
    </button>
  );
}

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [platformName, setPlatformName] = useState("Plateform");
  const [supportEmail, setSupportEmail] = useState("support@plateform.co.il");
  const [maxDishes, setMaxDishes] = useState("20");
  const [allowSignup, setAllowSignup] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [newRestaurantAlert, setNewRestaurantAlert] = useState(true);
  const [require2FA, setRequire2FA] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

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
          onClick={handleSave}
          className="text-white gap-2"
          style={{ background: "var(--grad-bronze)" }}
        >
          {saved ? (
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

      {/* General */}
      <SectionCard title="כללי" icon={<Settings className="h-4 w-4" />}>
        <SettingRow label="שם הפלטפורמה" description="מוצג בכותרות ובמיילים">
          <Input
            value={platformName}
            onChange={(e) => setPlatformName(e.target.value)}
            className="w-48 text-sm"
            dir="ltr"
          />
        </SettingRow>
        <SettingRow label="אימייל תמיכה" description="כתובת ליצירת קשר עם משתמשים">
          <Input
            value={supportEmail}
            onChange={(e) => setSupportEmail(e.target.value)}
            className="w-56 text-sm"
            dir="ltr"
          />
        </SettingRow>
      </SectionCard>

      {/* Platform */}
      <SectionCard title="פלטפורמה" icon={<Globe className="h-4 w-4" />}>
        <SettingRow
          label="הרשמה פתוחה"
          description="אפשר למשתמשים חדשים להירשם לפלטפורמה"
        >
          <Toggle checked={allowSignup} onChange={setAllowSignup} />
        </SettingRow>
        <SettingRow
          label="מצב תחזוקה"
          description="חוסם גישה לכל המשתמשים מלבד Super Admin"
        >
          <Toggle checked={maintenanceMode} onChange={setMaintenanceMode} />
        </SettingRow>
        <SettingRow
          label="מקסימום מנות (חינם)"
          description="מספר מנות מקסימלי בתוכנית החינמית"
        >
          <Input
            value={maxDishes}
            onChange={(e) => setMaxDishes(e.target.value)}
            className="w-20 text-sm text-center"
            dir="ltr"
            type="number"
            min="1"
          />
        </SettingRow>
      </SectionCard>

      {/* Notifications */}
      <SectionCard title="התראות" icon={<Bell className="h-4 w-4" />}>
        <SettingRow
          label="התראות אימייל"
          description="שליחת התראות כלליות למנהל"
        >
          <Toggle checked={emailNotifs} onChange={setEmailNotifs} />
        </SettingRow>
        <SettingRow
          label="מסעדה חדשה"
          description="קבל התראה כשמסעדה חדשה נרשמת"
        >
          <Toggle checked={newRestaurantAlert} onChange={setNewRestaurantAlert} />
        </SettingRow>
      </SectionCard>

      {/* Security */}
      <SectionCard title="אבטחה" icon={<Shield className="h-4 w-4" />}>
        <SettingRow
          label="אימות דו-שלבי (2FA)"
          description="חובה לכל חשבונות Super Admin"
        >
          <Toggle checked={require2FA} onChange={setRequire2FA} />
        </SettingRow>
        <SettingRow
          label="תפוגת סשן"
          description="ניתוק אוטומטי לאחר חוסר פעילות"
        >
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

      {/* Data */}
      <SectionCard title="נתונים" icon={<Database className="h-4 w-4" />}>
        <SettingRow
          label="גיבוי אוטומטי"
          description="גיבוי יומי של מסד הנתונים"
        >
          <Toggle checked={autoBackup} onChange={setAutoBackup} />
        </SettingRow>
        <SettingRow
          label="שמירת לוגים"
          description="משך שמירת לוגי פעילות"
        >
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
    </div>
  );
}
