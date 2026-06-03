"use client";

import { EditableText } from "@/components/editable/EditableText";

const TITLES: Record<number, { title: string; subtitle: string; key: string }> = {
  1: {
    key: "livingtable.act1",
    title: "הצלחת מחכה",
    subtitle: "הלקוח מתיישב. הוא פותח את הטלפון.",
  },
  2: {
    key: "livingtable.act2",
    title: "הטלפון נעלם",
    subtitle: "ובמקומו — חוויה שלא שכחת",
  },
  3: {
    key: "livingtable.act3",
    title: "המנה קמה לחיים",
    subtitle: "תלת־מימד על השולחן שלו. לפני ההזמנה.",
  },
  4: {
    key: "livingtable.act4",
    title: "הוא מזמין",
    subtitle: "כי הוא כבר ראה. כבר הרגיש. כבר החליט.",
  },
};

/** Titre de l'acte courant — Playfair Display, change au scroll */
export function ActTitle({ act }: { act: number }) {
  const current = TITLES[act];

  return (
    <div key={act} className="animate-fade-up" style={{ animationDuration: "800ms" }}>
      <h2 className="font-serif-display text-3xl md:text-5xl font-bold leading-tight text-foreground mb-2">
        <EditableText
          contentKey={`${current.key}.title`}
          defaultValue={current.title}
          as="span"
        />
      </h2>
      <p className="text-sm md:text-base text-foreground/70 font-medium">
        <EditableText
          contentKey={`${current.key}.subtitle`}
          defaultValue={current.subtitle}
          as="span"
        />
      </p>
    </div>
  );
}
