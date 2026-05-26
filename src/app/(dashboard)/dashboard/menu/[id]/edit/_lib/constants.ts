import type { AllergenOption, FormState, MenuTag } from "./types";

export const ALLERGEN_OPTIONS: AllergenOption[] = [
  { key: "gluten",    label: "גלוטן",      emoji: "🌾" },
  { key: "dairy",     label: "חלב",        emoji: "🥛" },
  { key: "eggs",      label: "ביצים",      emoji: "🥚" },
  { key: "nuts",      label: "אגוזים",     emoji: "🥜" },
  { key: "sesame",    label: "שומשום",     emoji: "🌰" },
  { key: "fish",      label: "דגים",       emoji: "🐟" },
  { key: "shellfish", label: "פירות ים",   emoji: "🦐" },
  { key: "soy",       label: "סויה",       emoji: "🫘" },
];

export const MENU_TAGS: MenuTag[] = [
  { key: "popular",    label: "פופולרי" },
  { key: "homemade",   label: "בית" },
  { key: "hot",        label: "חם" },
  { key: "cold",       label: "קר" },
  { key: "spicy",      label: "חריף" },
  { key: "seasonal",   label: "עונתי" },
  { key: "vegan",      label: "טבעוני" },
  { key: "vegetarian", label: "צמחוני" },
  { key: "glutenfree", label: "ללא גלוטן" },
];

export const EMPTY_FORM: FormState = {
  name: "",
  name_en: "",
  name_fr: "",
  category_id: "",
  description: "",
  description_en: "",
  description_fr: "",
  price: "",
  image_url: null,
  video_url: null,
  model_3d_url: null,
  photos_360: null,
  ar_enabled: true,
  is_available: true,
  is_featured: false,
  is_new: false,
  is_signature: false,
  allergens: [],
  tags: [],
};

export const AUTO_SAVE_DEBOUNCE_MS = 1800;
