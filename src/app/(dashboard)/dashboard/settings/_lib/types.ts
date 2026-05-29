/**
 * FormState — état du formulaire profil restaurant (settings).
 */
export type FormState = {
  name: string;
  slug: string;
  description: string;
  description_en: string;
  description_fr: string;
  address: string;
  phone: string;
  email: string;
  languages: string[];
  default_language: string;
  currency: string;
  theme_primary: string;
  theme_dark_mode: boolean;
};

/**
 * PasswordForm — état du formulaire changement de mot de passe.
 */
export type PasswordForm = {
  current: string;
  next: string;
  confirm: string;
};

/**
 * PasswordVisibility — toggles d'affichage par champ.
 */
export type PasswordVisibility = {
  current: boolean;
  next: boolean;
  confirm: boolean;
};

/**
 * LanguageOption — option de langue supportée (sélecteur multi).
 */
export type LanguageOption = {
  code: string;
  label: string;
  flag: string;
};

/**
 * CurrencyOption — option de devise (sélecteur).
 */
export type CurrencyOption = {
  code: string;
  label: string;
  symbol: string;
};
