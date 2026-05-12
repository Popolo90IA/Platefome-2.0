import Link from "next/link";
import { LogoLockup } from "@/components/brand";

/**
 * Centered auth shell for card-based auth pages (signup, forgot-password, reset-password).
 * The login page uses its own full-screen split layout.
 */
export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen bg-background relative overflow-hidden flex flex-col"
      dir="rtl"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" />
      <div
        className="absolute pointer-events-none"
        style={{
          top: 0, left: "-10rem",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "hsl(var(--gold) / .1)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: 0, right: "-10rem",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "hsl(var(--primary) / .1)",
          filter: "blur(80px)",
        }}
      />

      {/* Top bar */}
      <div className="relative container mx-auto px-4 py-6">
        <Link href="/" className="logo-hover inline-block">
          <LogoLockup width={160} />
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
