"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import type { useResetPassword } from "../_lib/useResetPassword";

type Ctrl = ReturnType<typeof useResetPassword>;

/* ── ResetForm — new password + confirm + strength bar + submit ── */
export function ResetForm({ ctrl }: { ctrl: Ctrl }) {
  const {
    password,
    setPassword,
    confirm,
    setConfirm,
    showPassword,
    setShowPassword,
    loading,
    error,
    handleSubmit,
  } = ctrl;

  return (
    <Card className="shadow-premium border-border/60 backdrop-blur-sm bg-card/95">
      <CardHeader className="text-center pb-6">
        <div className="flex justify-center mb-4">
          <div className="h-14 w-14 rounded-2xl bg-gold-gradient flex items-center justify-center shadow-gold-glow">
            <ShieldCheck className="h-7 w-7 text-white" />
          </div>
        </div>
        <CardTitle className="font-serif-display text-3xl">סיסמה חדשה</CardTitle>
        <CardDescription className="pt-1">בחר סיסמה חדשה לחשבון שלך</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New password */}
          <div className="space-y-2">
            <Label htmlFor="password">סיסמה חדשה</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="מינימום 6 תווים"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                dir="ltr"
                autoFocus
                className="pr-10"
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "הסתר סיסמה" : "הצג סיסמה"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {/* Strength indicator */}
            {password.length > 0 && (
              <div className="flex gap-1 mt-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-1 flex-1 rounded-full transition-colors duration-300"
                    style={{
                      background:
                        password.length > i * 3
                          ? password.length < 6
                            ? "hsl(var(--destructive))"
                            : password.length < 10
                              ? "hsl(38 92% 50%)"
                              : "hsl(158 45% 52%)"
                          : "hsl(var(--border))",
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Confirm password */}
          <div className="space-y-2">
            <Label htmlFor="confirm">אימות סיסמה</Label>
            <Input
              id="confirm"
              type={showPassword ? "text" : "password"}
              placeholder="הכנס שוב את הסיסמה"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              dir="ltr"
            />
            {confirm.length > 0 && password !== confirm && (
              <p className="text-xs text-destructive">הסיסמאות אינן תואמות</p>
            )}
          </div>

          {error && (
            <div className="flex items-start gap-2 text-sm text-destructive bg-destructive/10 p-3.5 rounded-xl border border-destructive/20">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gold-gradient hover:opacity-90 shadow-gold-glow h-11"
            disabled={loading || password !== confirm || password.length < 6}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "עדכן סיסמה"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
