"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, ShieldCheck, AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // Supabase sends a PKCE / implicit hash token in the URL.
  // onAuthStateChange fires with type "PASSWORD_RECOVERY" once it is consumed.
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("הסיסמה חייבת להכיל לפחות 6 תווים");
      return;
    }
    if (password !== confirm) {
      setError("הסיסמאות אינן תואמות");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setDone(true);
    setLoading(false);

    // Redirect to dashboard after 2 seconds
    setTimeout(() => router.push("/dashboard"), 2000);
  };

  /* ── Success state ── */
  if (done) {
    return (
      <Card className="shadow-premium border-border/60 backdrop-blur-sm bg-card/95">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="h-14 w-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <CheckCircle2 className="h-7 w-7 text-emerald-400" />
            </div>
          </div>
          <CardTitle className="font-serif-display text-2xl">סיסמה עודכנה!</CardTitle>
          <CardDescription className="pt-1">
            מעביר אותך לדשבורד...
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Loader2 className="h-5 w-5 animate-spin mx-auto text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  /* ── Waiting for token state ── */
  if (!ready) {
    return (
      <Card className="shadow-premium border-border/60 backdrop-blur-sm bg-card/95">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="h-14 w-14 rounded-2xl bg-gold-gradient flex items-center justify-center shadow-gold-glow">
              <ShieldCheck className="h-7 w-7 text-white" />
            </div>
          </div>
          <CardTitle className="font-serif-display text-2xl">מאמת קישור...</CardTitle>
          <CardDescription className="pt-1">
            אנא המתן
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            אם הדף לא נטען, ייתכן שהקישור פג תוקף.{" "}
            <Link href="/forgot-password" className="font-medium text-[hsl(var(--gold-dark))] hover:text-[hsl(var(--gold))] transition-colors">
              שלח קישור חדש
            </Link>
          </p>
        </CardContent>
      </Card>
    );
  }

  /* ── Main reset form ── */
  return (
    <Card className="shadow-premium border-border/60 backdrop-blur-sm bg-card/95">
      <CardHeader className="text-center pb-6">
        <div className="flex justify-center mb-4">
          <div className="h-14 w-14 rounded-2xl bg-gold-gradient flex items-center justify-center shadow-gold-glow">
            <ShieldCheck className="h-7 w-7 text-white" />
          </div>
        </div>
        <CardTitle className="font-serif-display text-3xl">סיסמה חדשה</CardTitle>
        <CardDescription className="pt-1">
          בחר סיסמה חדשה לחשבון שלך
        </CardDescription>
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
                      background: password.length > i * 3
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
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "עדכן סיסמה"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
