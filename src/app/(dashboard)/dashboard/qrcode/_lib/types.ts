/**
 * Format — preset format d'impression (carte de table, sous-bock, etc.).
 */
export type Format = {
  label: string;
  ratio: string;
  width: number;
  height: number;
};

/**
 * BgSwatch — preset fond carte (beige, dark, bronze, white).
 */
export type BgSwatch = {
  bg: string;
  label: string;
  border: boolean;
};

/**
 * QrStyle — preset couleurs QR (fg/bg).
 */
export type QrStyle = {
  fg: string;
  bg: string;
  label: string;
};

/**
 * QrVariant — variante téléchargeable (4 styles dans la strip du canvas).
 */
export type QrVariant = {
  label: string;
  size: string;
  fg: string;
  bg: string;
};
