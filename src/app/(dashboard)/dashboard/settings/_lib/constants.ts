import type { LanguageOption, CurrencyOption, FormState } from "./types";

/**
 * LANGUAGES — langues supportées par les menus restaurants.
 */
export const LANGUAGES: ReadonlyArray<LanguageOption> = [
  { code: "he", flag: "🇮🇱", label: "עברית" },
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "fr", flag: "🇫🇷", label: "Français" },
];

/**
 * CURRENCIES — devises supportées (libellés RTL hébreu).
 */
export const CURRENCIES: ReadonlyArray<CurrencyOption> = [
  { code: "ILS", symbol: "₪", label: "שקל" },
  { code: "EUR", symbol: "€", label: "אירו" },
  { code: "USD", symbol: "$", label: "דולר" },
  { code: "GBP", symbol: "£", label: "לירה שטרלינג" },
];

/**
 * DEFAULT_FORM — état initial du formulaire profil.
 */
export const DEFAULT_FORM: FormState = {
  name: "",
  slug: "",
  description: "",
  description_en: "",
  description_fr: "",
  address: "",
  phone: "",
  email: "",
  languages: ["he"],
  default_language: "he",
  currency: "ILS",
  theme_primary: "hsl(28,62%,42%)",
  theme_dark_mode: true,
};

/**
 * DEFAULT_PW_FORM — état initial du formulaire mot de passe.
 */
export const DEFAULT_PW_FORM = {
  current: "",
  next: "",
  confirm: "",
};

/**
 * DEFAULT_PW_VISIBILITY — toggles d'affichage initiaux.
 */
export const DEFAULT_PW_VISIBILITY = {
  current: false,
  next: false,
  confirm: false,
};

/**
 * MIN_PASSWORD_LENGTH — longueur minimale du mot de passe.
 */
export const MIN_PASSWORD_LENGTH = 8;

/**
 * DEACTIVATE_TIMEOUT_MS — délai avant masquage toast succès désactivation.
 */
export const DEACTIVATE_TIMEOUT_MS = 4000;

/**
 * SAVED_TOAST_MS — délai avant masquage toast "נשמר".
 */
export const SAVED_TOAST_MS = 3000;
