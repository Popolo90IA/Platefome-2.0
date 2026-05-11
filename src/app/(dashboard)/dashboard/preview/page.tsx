"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Smartphone, Monitor, ExternalLink, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function PreviewPage() {
  const [slug, setSlug] = useState<string | null>(null);
  const [mode, setMode] = useState<"mobile" | "desktop">("mobile");
  const [key, setKey] = useState(0);
  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("restaurants")
        .select("slug")
        .eq("user_id", user.id)
        .maybeSingle();
      if (data?.slug) setSlug(data.slug);
    };
    load();
  }, [supabase]);

  const menuUrl = slug ? `/menu/${slug}` : null;

  return (
    <div className="flex flex-col h-full animate-fade-up" style={{ minHeight: "calc(100vh - 80px)" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="font-serif-display text-4xl font-bold">
            <span className="text-gold-gradient">תצוגה מקדימה</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            כך הלקוחות שלך רואים את התפריט
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Device toggle */}
          <div className="flex gap-1 p-1 bg-secondary/60 rounded-lg">
            <button
              onClick={() => setMode("mobile")}
              className={`p-2 rounded-md transition-colors ${mode === "mobile" ? "text-white" : "text-foreground/60 hover:text-foreground"}`}
              style={mode === "mobile" ? { background: "var(--grad-bronze)" } : {}}
              title="מובייל"
            >
              <Smartphone className="h-4 w-4" />
            </button>
            <button
              onClick={() => setMode("desktop")}
              className={`p-2 rounded-md transition-colors ${mode === "desktop" ? "text-white" : "text-foreground/60 hover:text-foreground"}`}
              style={mode === "desktop" ? { background: "var(--grad-bronze)" } : {}}
              title="דסקטופ"
            >
              <Monitor className="h-4 w-4" />
            </button>
          </div>

          {/* Refresh */}
          <button
            onClick={() => setKey(k => k + 1)}
            className="p-2 rounded-md bg-secondary/60 text-foreground/60 hover:text-foreground transition-colors"
            title="רענן"
          >
            <RefreshCw className="h-4 w-4" />
          </button>

          {/* Open in new tab */}
          {menuUrl && (
            <Link
              href={menuUrl}
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm text-white transition-opacity hover:opacity-90"
              style={{ background: "var(--grad-bronze)" }}
            >
              <ExternalLink className="h-4 w-4" />
              פתח בלשונית
            </Link>
          )}
        </div>
      </div>

      {/* Preview frame */}
      <div className="flex-1 flex items-start justify-center">
        {!slug ? (
          <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
            <div className="h-8 w-8 rounded-full border-2 border-[hsl(var(--gold))] border-t-transparent animate-spin" />
            <span className="text-sm">טוען...</span>
          </div>
        ) : (
          <div
            className="relative overflow-hidden shadow-premium transition-all duration-300"
            style={{
              width: mode === "mobile" ? 390 : "100%",
              maxWidth: mode === "mobile" ? 390 : "100%",
              borderRadius: mode === "mobile" ? 32 : 12,
              border: mode === "mobile"
                ? "8px solid hsl(var(--line))"
                : "1px solid hsl(var(--line))",
              height: mode === "mobile" ? 780 : "calc(100vh - 220px)",
              background: "hsl(var(--deep))",
            }}
          >
            {/* Mobile notch */}
            {mode === "mobile" && (
              <div
                className="absolute top-2 left-1/2 -translate-x-1/2 z-10 rounded-full"
                style={{ width: 100, height: 6, background: "hsl(var(--line))" }}
              />
            )}
            <iframe
              key={key}
              src={menuUrl ?? undefined}
              className="w-full h-full border-0"
              style={{ borderRadius: mode === "mobile" ? 26 : 10 }}
              title="תצוגה מקדימה של התפריט"
            />
          </div>
        )}
      </div>
    </div>
  );
}
