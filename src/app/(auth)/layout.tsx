import Link from "next/link";
import { LogoLockup } from "@/components/brand";

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
        <Link href="/" className="inline-block group-hover:opacity-90 transition-opacity">
          <LogoLockup width={180} />
        </Link>
      </div>

      {/* Content */}
      <div className="relative flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-fade-up">{children}</div>
      </div>

      {/* Footer */}
      <div className="relative container mx-auto px-4 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Plateform
      </div>
    </div>
  );
}
