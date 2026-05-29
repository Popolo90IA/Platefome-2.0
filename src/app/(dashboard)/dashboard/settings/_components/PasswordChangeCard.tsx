"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Check,
  AlertCircle,
} from "lucide-react";
import { SectionIcon } from "./SectionIcon";
import type { PasswordForm, PasswordVisibility } from "../_lib/types";

type Field = "current" | "next" | "confirm";

const FIELDS: ReadonlyArray<Field> = ["current", "next", "confirm"];

const LABELS: Record<Field, string> = {
  current: "סיסמה נוכחית",
  next: "סיסמה חדשה",
  confirm: "אימות סיסמה חדשה",
};

const PLACEHOLDERS: Record<Field, string> = {
  current: "••••••••",
  next: "לפחות 6 תווים",
  confirm: "חזור על הסיסמה החדשה",
};

type Props = {
  pwForm: PasswordForm;
  setPwForm: React.Dispatch<React.SetStateAction<PasswordForm>>;
  showPw: PasswordVisibility;
  setShowPw: React.Dispatch<React.SetStateAction<PasswordVisibility>>;
  pwSaving: boolean;
  pwSaved: boolean;
  pwError: string | null;
  onSubmit: (e: React.FormEvent) => void;
};

/**
 * PasswordChangeCard — formulaire 3 champs (current/next/confirm) avec eye toggle.
 */
export function PasswordChangeCard({
  pwForm,
  setPwForm,
  showPw,
  setShowPw,
  pwSaving,
  pwSaved,
  pwError,
  onSubmit,
}: Props) {
  return (
    <form onSubmit={onSubmit}>
      <Card className="shadow-premium">
        <CardHeader>
          <CardTitle className="font-serif-display text-xl flex items-center gap-2.5">
            <SectionIcon>
              <Lock className="h-3.5 w-3.5" />
            </SectionIcon>
            שינוי סיסמה
          </CardTitle>
          <p className="text-sm text-muted-foreground pt-1">
            עדכן את הסיסמה לחשבון
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {FIELDS.map((field) => (
            <div key={field} className="space-y-2">
              <Label htmlFor={`pw_${field}`}>{LABELS[field]}</Label>
              <div className="relative">
                <Input
                  id={`pw_${field}`}
                  type={showPw[field] ? "text" : "password"}
                  value={pwForm[field]}
                  onChange={(e) =>
                    setPwForm((f) => ({ ...f, [field]: e.target.value }))
                  }
                  placeholder={PLACEHOLDERS[field]}
                  required
                  dir="ltr"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPw((s) => ({ ...s, [field]: !s[field] }))
                  }
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPw[field] ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          ))}

          {pwError && (
            <div className="flex items-start gap-2 text-sm text-destructive bg-destructive/10 p-3.5 rounded-xl border border-destructive/20">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>{pwError}</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={
              pwSaving || !pwForm.current || !pwForm.next || !pwForm.confirm
            }
            className="hover:opacity-90 text-white"
            style={{ background: "var(--grad-bronze)" }}
          >
            {pwSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : pwSaved ? (
              <>
                <Check className="h-4 w-4" />
                הסיסמה עודכנה!
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                עדכן סיסמה
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
