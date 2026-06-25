import { cn } from "@/lib/utils";

/**
 * Skeleton — bloc de chargement (pulse). Utilisé pour les états de chargement
 * qui épousent la forme du contenu final, à la place des spinners.
 */
export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-[hsl(var(--muted))]",
        className,
      )}
      {...props}
    />
  );
}
