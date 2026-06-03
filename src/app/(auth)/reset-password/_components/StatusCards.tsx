"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, Link2Off, Loader2, ShieldCheck } from "lucide-react";

/* ── Success — password updated, redirecting ── */
export function SuccessCard() {
  return (
    <Card className="shadow-premium border-border/60 backdrop-blur-sm bg-card/95">
      <CardHeader className="text-center pb-6">
        <div className="flex justify-center mb-4">
          <div className="h-14 w-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
            <CheckCircle2 className="h-7 w-7 text-emerald-400" />
          </div>
        </div>
        <CardTitle className="font-serif-display text-2xl">סיסמה עודכנה!</CardTitle>
        <CardDescription className="pt-1">מעביר אותך לדשבורד...</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Loader2 className="h-5 w-5 animate-spin mx-auto text-muted-foreground" />
      </CardContent>
    </Card>
  );
}

/* ── Expired / invalid link ── */
export function LinkErrorCard({ message }: { message: string }) {
  return (
    <Card className="shadow-premium border-border/60 backdrop-blur-sm bg-card/95">
      <CardHeader className="text-center pb-6">
        <div className="flex justify-center mb-4">
          <div className="h-14 w-14 rounded-2xl bg-destructive/15 border border-destructive/30 flex items-center justify-center">
            <Link2Off className="h-7 w-7 text-destructive" />
          </div>
        </div>
        <CardTitle className="font-serif-display text-2xl">קישור לא תקין</CardTitle>
        <CardDescription className="pt-1">{message}</CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <Link
          href="/forgot-password"
          className="inline-flex items-center justify-center w-full h-11 rounded-xl bg-gold-gradient hover:opacity-90 shadow-gold-glow text-white font-medium transition-opacity"
        >
          שלח קישור חדש
        </Link>
        <Link
          href="/login"
          className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          חזור להתחברות
        </Link>
      </CardContent>
    </Card>
  );
}

/* ── Waiting for the recovery token ── */
export function WaitingCard() {
  return (
    <Card className="shadow-premium border-border/60 backdrop-blur-sm bg-card/95">
      <CardHeader className="text-center pb-6">
        <div className="flex justify-center mb-4">
          <div className="h-14 w-14 rounded-2xl bg-gold-gradient flex items-center justify-center shadow-gold-glow">
            <ShieldCheck className="h-7 w-7 text-white" />
          </div>
        </div>
        <CardTitle className="font-serif-display text-2xl">מאמת קישור...</CardTitle>
        <CardDescription className="pt-1">אנא המתן</CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
        <p className="text-xs text-muted-foreground">
          אם הדף לא נטען, ייתכן שהקישור פג תוקף.{" "}
          <Link
            href="/forgot-password"
            className="font-medium text-[hsl(var(--gold-dark))] hover:text-[hsl(var(--gold))] transition-colors"
          >
            שלח קישור חדש
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
