"use client";

interface Props {
  total: number;
}

/**
 * AdminRestaurantsHeader — titre + compteur.
 */
export function AdminRestaurantsHeader({ total }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div>
        <h1 className="font-serif-display text-4xl font-bold">
          <span className="text-gold-gradient">מסעדות</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          {total} מסעדות רשומות במערכת
        </p>
      </div>
    </div>
  );
}
