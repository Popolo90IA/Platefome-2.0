import Link from "next/link";
import { ChevronRight } from "lucide-react";

type EditBreadcrumbProps = {
  dishName: string;
};

export function EditBreadcrumb({ dishName }: EditBreadcrumbProps) {
  return (
    <nav
      className="font-sans uppercase"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: 11,
        letterSpacing: ".05em",
        color: "hsl(var(--dim))",
        marginBottom: 18,
      }}
    >
      <Link
        href="/dashboard"
        style={{ color: "hsl(var(--subtle))", textDecoration: "none" }}
      >
        דשבורד
      </Link>
      <ChevronRight style={{ width: 12, height: 12, opacity: 0.5 }} />
      <Link
        href="/dashboard/dishes"
        style={{ color: "hsl(var(--subtle))", textDecoration: "none" }}
      >
        תפריט
      </Link>
      <ChevronRight style={{ width: 12, height: 12, opacity: 0.5 }} />
      <span style={{ color: "hsl(var(--accent-bright))" }}>
        {dishName || "מנה חדשה"}
      </span>
    </nav>
  );
}
