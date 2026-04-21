"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Download,
  Copy,
  Check,
  QrCode as QrIcon,
  ExternalLink,
  Printer,
  Share2,
} from "lucide-react";
import type { Restaurant } from "@/types/database.types";

export default function QRCodePage() {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("restaurants")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      setRestaurant(data);
      setLoading(false);
    };
    load();
  }, [supabase]);

  const menuUrl = restaurant
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/menu/${restaurant.slug}`
    : "";

  useEffect(() => {
    if (!menuUrl || !canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, menuUrl, {
      width: 340,
      margin: 2,
      color: { dark: "#1a1510", light: "#FFFFFF" },
      errorCorrectionLevel: "H",
    });
  }, [menuUrl]);

  const handleDownload = async () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `qr-${restaurant?.slug ?? "menu"}.png`;
    link.href = url;
    link.click();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(menuUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-8 w-8 rounded-full border-2 border-[hsl(var(--gold))] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <Card className="max-w-md mx-auto shadow-premium">
        <CardContent className="pt-8 pb-8 text-center">
          <QrIcon className="h-12 w-12 mx-auto text-[hsl(var(--gold))] mb-4" />
          <p className="mb-5 text-muted-foreground">צור תחילה פרופיל מסעדה</p>
          <Link href="/dashboard/settings">
            <Button className="bg-gold-gradient hover:opacity-90">
              צור פרופיל
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-up">
      <div>
        <h1 className="font-serif-display text-4xl font-bold">QR קוד</h1>
        <p className="text-muted-foreground mt-2">
          הורד, הדפס והדבק על השולחנות שלך
        </p>
      </div>

      <Card className="shadow-premium overflow-hidden">
        <div className="bg-charcoal-gradient text-white p-6 relative">
          <div className="absolute inset-0 bg-grain opacity-10" />
          <div className="relative flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gold-gradient flex items-center justify-center">
              <QrIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-serif-display text-xl font-bold">
                הקוד שלך מוכן
              </h3>
              <p className="text-white/60 text-sm">
                {restaurant.name}
              </p>
            </div>
          </div>
        </div>

        <CardContent className="p-8 flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gold-gradient blur-2xl opacity-20 scale-90" />
            <div className="relative bg-white p-5 rounded-2xl shadow-premium ring-4 ring-[hsl(var(--gold))]/20">
              <canvas ref={canvasRef} />
            </div>
          </div>

          <div className="w-full space-y-3 max-w-md">
            <div className="flex items-center gap-2 bg-secondary/50 p-3.5 rounded-xl border border-border/60">
              <code
                className="flex-1 text-sm text-foreground/80 truncate"
                dir="ltr"
              >
                {menuUrl}
              </code>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopy}
                className="flex-shrink-0"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              onClick={handleDownload}
              size="lg"
              className="bg-gold-gradient hover:opacity-90 shadow-gold-glow px-8"
            >
              <Download className="h-5 w-5" />
              הורד PNG
            </Button>
            <Link href={`/menu/${restaurant.slug}`} target="_blank">
              <Button size="lg" variant="outline">
                <ExternalLink className="h-5 w-5" />
                תצוגה מקדימה
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TipCard
          icon={<Download className="h-5 w-5" />}
          title="הורד"
          desc="קבל קובץ PNG באיכות גבוהה מוכן להדפסה"
        />
        <TipCard
          icon={<Printer className="h-5 w-5" />}
          title="הדפס"
          desc="הדפס על מדבקות, כרטיסיות או תפריטים"
        />
        <TipCard
          icon={<Share2 className="h-5 w-5" />}
          title="הדבק"
          desc="שים על כל שולחן — הלקוחות סורקים ורואים הכל"
        />
      </div>
    </div>
  );
}

function TipCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Card className="shadow-sm hover:shadow-premium hover:border-[hsl(var(--gold))]/30 transition-all">
      <CardContent className="pt-6">
        <div className="h-10 w-10 rounded-lg bg-[hsl(var(--gold))]/10 flex items-center justify-center text-[hsl(var(--gold-dark))] mb-3">
          {icon}
        </div>
        <h3 className="font-serif-display font-bold text-lg mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
      </CardContent>
    </Card>
  );
}
