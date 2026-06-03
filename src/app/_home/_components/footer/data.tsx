export const FOOTER_COLUMNS: ReadonlyArray<{
  title: string;
  links: ReadonlyArray<readonly [string, string]>;
}> = [
  {
    title: "מוצר",
    links: [
      ["#features", "תכונות"],
      ["#gallery", "גלריה"],
      ["#pricing", "מחירים"],
      ["#", "הדגמה"],
    ],
  },
  {
    title: "חברה",
    links: [
      ["#", "אודות"],
      ["#", "בלוג"],
      ["#", "שותפים"],
      ["mailto:hello@platforme.app", "צור קשר"],
    ],
  },
  {
    title: "משפטי",
    links: [
      ["#", "תנאי שימוש"],
      ["#", "פרטיות"],
      ["#", "נגישות"],
    ],
  },
];

export const SOCIAL_LINKS = [
  {
    href: "#",
    label: "Instagram",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "LinkedIn",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="2" width="20" height="20" rx="3" />
        <line x1="8" y1="11" x2="8" y2="16" />
        <line x1="8" y1="8" x2="8" y2="8.01" />
        <path d="M12 16v-5m4 5v-3a2 2 0 0 0-4 0" />
      </svg>
    ),
  },
  {
    href: "mailto:hello@platforme.app",
    label: "Email",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polyline points="2,4 12,13 22,4" />
      </svg>
    ),
  },
];
