"use client";

import { useState } from "react";
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
import { Loader2, Sparkles, AlertCircle, Check } from "lucide-react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password.length < 6) {
      setError("הסיסמה חייבת להכיל לפחות 6 תווים");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <Card className="shadow-premium border-border/60 backdrop-blur-sm bg-card/95">
      <CardHeader className="text-center pb-6">
        <div className="flex justify-center mb-4">
          <div className="h-14 w-14 rounded-2xl bg-gold-gradient flex items-center justify-center shadow-gold-glow">
            <Sparkles className="h-7 w-7 text-white" />
          </div>
        </div>
        <CardTitle className="font-serif-display text-3xl">
          צור חשבון
        </CardTitle>
        <CardDescription className="pt-1">
          התחל לבנות את התפריט הדיגיטלי שלך בדקות
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
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">סיסמה</Label>
            <Input
              id="password"
              type="password"
              placeholder="מינימום 6 תווים"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              dir="ltr"
              minLength={6}
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 text-sm text-destructive bg-destructive/10 p-3.5 rounded-xl border border-destructive/20">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Benefits */}
          <div className="space-y-2 py-2">
            <Benefit text="הקמה מיידית, ללא הגדרות" />
            <Benefit text="עיצוב מקצועי, ללא צורך במעצב" />
            <Benefit text="QR קוד מוכן להדפסה" />
          </div>

          <Button
            type="submit"
            className="w-full bg-gold-gradient hover:opacity-90 shadow-gold-glow h-11"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "הירשם בחינם"
            )}
          </Button>

          <div className="divider-gold w-20 mx-auto my-2" />

          <p className="text-center text-sm text-muted-foreground">
            כבר יש לך חשבון?{" "}
            <Link
              href="/login"
              className="font-medium text-[hsl(var(--gold-dark))] hover:text-[hsl(var(--gold))] transition-colors"
            >
              התחבר ←
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

function Benefit({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-foreground/70">
      <div className="h-4 w-4 rounded-full bg-gold-gradient flex items-center justify-center flex-shrink-0">
        <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
      </div>
      <span>{text}</span>
    </div>
  );
}
