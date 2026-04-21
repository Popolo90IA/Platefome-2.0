import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" />
      <div className="absolute top-0 -left-40 w-[500px] h-[500px] bg-[hsl(var(--gold))]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top bar with logo */}
      <div className="relative container mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="relative h-9 w-9 rounded-lg bg-gold-gradient flex items-center justify-center shadow-gold-glow group-hover:scale-105 transition-transform">
            <UtensilsCrossed className="h-5 w-5 text-white" />
          </div>
          <span className="font-serif-display text-xl font-bold">
            פלטפורמת מסעדות
          </span>
        </Link>
      </div>

      {/* Content */}
      <div className="relative flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-fade-up">{children}</div>
      </div>

      {/* Footer */}
      <div className="relative container mx-auto px-4 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} פלטפורמת מסעדות
      </div>
    </div>
  );
}
