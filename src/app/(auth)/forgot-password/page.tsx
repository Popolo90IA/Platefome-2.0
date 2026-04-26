"use client";

import { useState } from "react";
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
import { Loader2, KeyRound, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl}/reset-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  };

  if (sent) {
    return (
      <Card className="shadow-premium border-border/60 backdrop-blur-sm bg-card/95">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="h-14 w-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <CheckCircle2 className="h-7 w-7 text-emerald-400" />
            </div>
          </div>
          <CardTitle className="font-serif-display text-2xl">נשלח!</CardTitle>
          <CardDescription className="pt-1">
            בדוק את תיבת הדואר שלך
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            שלחנו לך קישור לאיפוס הסיסמה לכתובת{" "}
            <span className="font-medium text-foreground">{email}</span>.
            <br />
            הקישור יפוג תוך שעה.
          </p>
          <p className="text-xs text-muted-foreground">
            לא קיבלת? בדוק בתיקיית הספאם.
          </p>
          <div className="divider-gold w-20 mx-auto my-2" />
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--gold-dark))] hover:text-[hsl(var(--gold))] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            חזור להתחברות
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-premium border-border/60 backdrop-blur-sm bg-card/95">
      <CardHeader className="text-center pb-6">
        <div className="flex justify-center mb-4">
          <div className="h-14 w-14 rounded-2xl bg-gold-gradient flex items-center justify-center shadow-gold-glow">
            <KeyRound className="h-7 w-7 text-white" />
          </div>
        </div>
        <CardTitle className="font-serif-display text-3xl">שכחת סיסמה?</CardTitle>
        <CardDescription className="pt-1">
          הכנס את האימייל שלך ונשלח לך קישור לאיפוס
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">אימייל</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              dir="ltr"
              autoFocus
            />
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
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "שלח קישור לאיפוס"
            )}
          </Button>

          <div className="divider-gold w-20 mx-auto my-2" />

          <p className="text-center text-sm text-muted-foreground">
            נזכרת?{" "}
            <Link
              href="/login"
              className="font-medium text-[hsl(var(--gold-dark))] hover:text-[hsl(var(--gold))] transition-colors"
            >
              חזור להתחברות ←
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
