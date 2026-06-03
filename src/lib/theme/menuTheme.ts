/**
 * buildMenuTheme — génère les tokens CSS du menu client à partir
 * d'une couleur primaire HSL et d'un mode dark/light.
 *
 * Retourne un objet React.CSSProperties contenant les variables CSS
 * à injecter en style inline sur le wrapper racine du menu.
 */

/** Parse "hsl(H, S%, L%)" ou "hsl(H S% L%)" → [h, s, l] */
export function parseHsl(raw: string): [number, number, number] {
  const cleaned = raw.replace(/hsl\(|\)/gi, "").replace(/,/g, " ");
  const parts = cleaned.trim().split(/\s+/);
  const h = parseFloat(parts[0] ?? "28");
  const s = parseFloat((parts[1] ?? "62").replace("%", ""));
  const l = parseFloat((parts[2] ?? "42").replace("%", ""));
  return [isNaN(h) ? 28 : h, isNaN(s) ? 62 : s, isNaN(l) ? 42 : l];
}

function hsl(h: number, s: number, l: number, a?: number): string {
  if (a !== undefined) return `hsl(${h},${s}%,${l}%,${a})`;
  return `hsl(${h},${s}%,${l}%)`;
}

export interface MenuTheme {
  "--mt-page": string;
  "--mt-section": string;
  "--mt-card": string;
  "--mt-surface": string;
  "--mt-line": string;
  "--mt-line2": string;
  "--mt-text": string;
  "--mt-text-dim": string;
  "--mt-cream": string;
  "--mt-gold": string;
  "--mt-gold-lt": string;
  "--mt-grad": string;
}

export function buildMenuTheme(
  primary: string | null | undefined,
  darkMode: boolean | null | undefined
): MenuTheme {
  const raw = primary ?? "hsl(28,62%,42%)";
  const dark = darkMode ?? true;
  const [h, s, l] = parseHsl(raw);

  // Couleur accent = la couleur primaire normalisée à L~42 pour cohérence
  const accentL = Math.min(Math.max(l, 32), 58);
  // Secondaire = hue +12°, saturation +8, légèrement plus lumineux
  const h2 = (h + 12) % 360;
  const s2 = Math.min(s + 8, 90);
  const l2 = Math.min(accentL + 8, 65);

  if (dark) {
    // Mode sombre : fond très sombre avec teinte primaire
    return {
      "--mt-page":    hsl(h, Math.min(s * 0.3, 20), 6),
      "--mt-section": hsl(h, Math.min(s * 0.35, 22), 9),
      "--mt-card":    hsl(h, Math.min(s * 0.38, 24), 12),
      "--mt-surface": hsl(h, Math.min(s * 0.35, 22), 18),
      "--mt-line":    hsl(h, Math.min(s * 0.65, 42), accentL, 0.18),
      "--mt-line2":   hsl(h, Math.min(s * 0.65, 42), accentL, 0.35),
      "--mt-text-dim":hsl(h + 8, Math.min(s * 0.25, 20), 56),
      "--mt-text":    hsl(h + 8, Math.min(s * 0.3, 30), 80),
      "--mt-cream":   hsl(h + 8, Math.min(s * 0.4, 40), 92),
      "--mt-gold":    hsl(h, s, Math.min(accentL + 10, 58)),
      "--mt-gold-lt": hsl(h + 8, Math.min(s + 18, 90), Math.min(accentL + 20, 68)),
      "--mt-grad":    `linear-gradient(135deg, ${hsl(h, s, accentL)}, ${hsl(h2, s2, l2)})`,
    };
  } else {
    // Mode clair : fond beige/ivoire avec teinte primaire
    return {
      "--mt-page":    hsl(h, Math.min(s * 0.2, 18), 96),
      "--mt-section": hsl(h, Math.min(s * 0.18, 16), 92),
      "--mt-card":    hsl(h, Math.min(s * 0.15, 14), 98),
      "--mt-surface": hsl(h, Math.min(s * 0.18, 16), 88),
      "--mt-line":    hsl(h, Math.min(s * 0.4, 30), 70, 0.22),
      "--mt-line2":   hsl(h, Math.min(s * 0.4, 30), 60, 0.40),
      "--mt-text-dim":hsl(h, Math.min(s * 0.35, 25), 45),
      "--mt-text":    hsl(h, Math.min(s * 0.4, 30), 20),
      "--mt-cream":   hsl(h, Math.min(s * 0.2, 18), 14),
      "--mt-gold":    hsl(h, s, accentL),
      "--mt-gold-lt": hsl(h + 8, Math.min(s + 12, 85), Math.min(accentL + 15, 62)),
      "--mt-grad":    `linear-gradient(135deg, ${hsl(h, s, accentL)}, ${hsl(h2, s2, l2)})`,
    };
  }
}

/** Valeurs par défaut (thème Plateform original) */
export const DEFAULT_THEME = buildMenuTheme("hsl(28,62%,42%)", true);

/** Convertit une couleur hex (#rrggbb) en hsl(...) string */
export function hexToHsl(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let hv = 0, sv = 0;
  const lv = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    sv = lv > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: hv = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: hv = ((b - r) / d + 2) / 6; break;
      case b: hv = ((r - g) / d + 4) / 6; break;
    }
  }
  return `hsl(${Math.round(hv * 360)},${Math.round(sv * 100)}%,${Math.round(lv * 100)}%)`;
}

/** Convertit hsl(...) en hex pour l'input type="color" */
export function hslToHex(hslStr: string): string {
  const [h, s, l] = parseHsl(hslStr);
  const sl = s / 100, ll = l / 100;
  const a = sl * Math.min(ll, 1 - ll);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = ll - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
