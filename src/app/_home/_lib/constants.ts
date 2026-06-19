import type { GalleryDish, HeroModel, PricingPlan, StatItem } from "./types";

export const MODELS: HeroModel[] = [
  { url: "/models/hero-dish.glb", label: "פסטה שף" },
  { url: "/models/pizza.glb", label: "פיצה" },
  { url: "/models/tuna.glb", label: "טונה" },
];

export const GALLERY_CATEGORIES: readonly string[] = [
  "הכל",
  "בשר",
  "פסטה",
  "ירקות",
  "קינוח",
  "שתייה",
];

export const GALLERY_DISHES: readonly GalleryDish[] = [
  {
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&h=440&fit=crop&q=80",
    name: "בשר אנגוס",
    desc: "נתח אנגוס פרמיום על האש עם תוספת לבחירה — גריל פחמים, עשבי תיבול טריים, וסלסה בית. מוגש עם אחת מהתוספות העונתיות שלנו.",
    price: "₪148",
    badge: "3D · AR",
    badgeColor: "hsl(var(--accent-bright))",
    cat: "בשר",
  },
  {
    img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=700&h=440&fit=crop&q=80",
    name: "פסטה ים",
    desc: "פסטה פתוחה עם פירות ים טריים — שרימפס, מולים ותמנון — ברוטב ויין לבן, שום ופרמז'ן. הכנה טרייה ב-20 דקות.",
    price: "₪89",
    badge: "וידאו",
    badgeColor: "hsl(var(--gold-light))",
    cat: "פסטה",
  },
  {
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&h=440&fit=crop&q=80",
    name: "סלט עונתי",
    desc: "תערובת עשבי תיבול טריים מהגינה שלנו עם גבינה צרפתית, אגוזי מלך קלויים ורוטב ביתי על בסיס שמן זית וחומץ תפוחים.",
    price: "₪54",
    badge: "3D",
    badgeColor: "hsl(var(--accent-vivid))",
    cat: "ירקות",
  },
  {
    img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=700&h=440&fit=crop&q=80",
    name: "יין אדום",
    desc: "בורדו עדין ועשיר משנת 2021 — פרי יומרני עם טאנינים מעודנים. בחירת הסומלייה החודש. מוגש במצב החדר האידיאלי של 16°.",
    price: "₪62",
    badge: "360°",
    badgeColor: "hsl(var(--gold))",
    cat: "שתייה",
  },
  {
    img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=700&h=440&fit=crop&q=80",
    name: "פונדאן שוקולד",
    desc: "עוגת שוקולד בלגי 72% חמה ונוזלית בפנים, מוגשת עם גלידת וניל מדגסקר וקרמל מלח ים. מומלץ לאכול מיד כשמגיע.",
    price: "₪44",
    badge: "AR",
    badgeColor: "hsl(var(--accent-bright))",
    cat: "קינוח",
  },
  {
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&h=440&fit=crop&q=80",
    name: "אספרסו",
    desc: "בלנד אתיופי מיוחד — עם טעמי פרי יערות ופרחים — נקלה בקלייה בינונית כדי לשמר את הארומה. מוגש כפול כדיפולט.",
    price: "₪28",
    badge: "חי",
    badgeColor: "hsl(var(--accent-vivid))",
    cat: "שתייה",
  },
];

export const HOME_STATS: readonly StatItem[] = [
  {
    num: "+200",
    label: "מסעדות פעילות",
    sub: "לקוחות ברחבי הארץ משתמשים בפלטפורמה בכל יום",
    badge: "+40% השנה",
  },
  {
    num: "×3.2",
    label: "יותר הזמנות",
    sub: "בממוצע בהשוואה לתפריט נייר רגיל",
    badge: "מוכח בנתונים",
  },
  {
    num: "<0.8s",
    label: "זמן טעינה",
    sub: "התפריט נפתח מיידית — ללא אפליקציה, ללא המתנה",
    badge: "ביצועים גבוהים",
  },
  {
    num: "98%",
    label: "שביעות רצון",
    sub: "מהלקוחות ממשיכים לאחר תקופת הניסיון",
    badge: "שימור לקוחות",
  },
];

export const PRICING_PLANS: readonly PricingPlan[] = [
  {
    tier: "I · טעימה",
    title: "Starter",
    price: "₪0",
    tagline: "כניסה לעולם",
    features: ["תפריט דיגיטלי מלא", "קוד QR אישי", "עד 30 מנות", "2 שפות"],
    highlighted: false,
    badge: {
      label: "חינם",
      bg: "hsl(var(--subtle) / .1)",
      border: "hsl(var(--subtle) / .25)",
      color: "hsl(var(--subtle))",
    },
  },
  {
    tier: "II · המנה העיקרית",
    title: "Popular",
    price: "₪149",
    tagline: "הבחירה הפופולרית",
    features: [
      "מנות ללא הגבלה",
      "וידאו לכל מנה",
      "3 שפות + תרגום",
      "אנליטיקה מתקדמת",
      "תמיכה מועדפת",
    ],
    highlighted: true,
    badge: {
      label: "✦ מומלץ",
      bg: "hsl(var(--accent-bright) / .1)",
      border: "hsl(var(--accent-bright) / .3)",
      color: "hsl(var(--accent-bright))",
    },
  },
  {
    tier: "III · דגוסטציון",
    title: "Enterprise",
    price: "₪349",
    tagline: "חוויה מלאה",
    features: [
      "תלת-מימד לכל המנות",
      "מציאות רבודה (AR)",
      "מיתוג מותאם אישית",
      "ייעוץ אישי חודשי",
    ],
    highlighted: false,
  },
];
