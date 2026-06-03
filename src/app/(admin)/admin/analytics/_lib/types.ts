export type TopRestaurant = {
  restaurant_id: string;
  name: string;
  slug: string;
  views: number;
};

export type DayPoint = { date: string; views: number; scans: number };

export type Totals = {
  menu_view: number;
  qr_scan: number;
  dish_view: number;
  ar_view: number;
  video_play: number;
};

export const RANGE_OPTIONS = [
  { value: 7, label: "7 ימים" },
  { value: 30, label: "30 ימים" },
  { value: 90, label: "90 ימים" },
] as const;
