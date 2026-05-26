export type GalleryDish = {
  img: string;
  name: string;
  desc: string;
  price: string;
  badge: string;
  badgeColor: string;
  cat: string;
};

export type HeroModel = {
  url: string;
  label: string;
};

export type StatItem = {
  num: string;
  label: string;
  sub: string;
  badge: string;
};

export type PricingPlan = {
  tier: string;
  title: string;
  price: string;
  tagline: string;
  features: readonly string[];
  highlighted: boolean;
  badge?: { label: string; bg: string; border: string; color: string };
};
