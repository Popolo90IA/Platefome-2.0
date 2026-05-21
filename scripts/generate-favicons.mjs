// Génère le set complet de favicons + OG image depuis logo-monogram.svg.
// Lancer : node scripts/generate-favicons.mjs
import sharp from "sharp";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const publicDir = join(root, "public");
const monoPath = join(publicDir, "brand", "logo-monogram.svg");
const wordmarkPath = join(publicDir, "brand", "wordmark.svg");

const monoSvg = await readFile(monoPath);

const PNG_SIZES = [16, 32, 64, 192, 512];
for (const size of PNG_SIZES) {
  const out = join(publicDir, `favicon-${size}.png`);
  await sharp(monoSvg, { density: 384 })
    .resize(size, size, { fit: "contain", background: { r: 13, g: 12, b: 11, alpha: 1 } })
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(`✓ favicon-${size}.png`);
}

// Apple touch icon : 180×180, fond bronze foncé, padding interne
await sharp(monoSvg, { density: 512 })
  .resize(180, 180, { fit: "contain", background: { r: 13, g: 12, b: 11, alpha: 1 } })
  .png({ compressionLevel: 9 })
  .toFile(join(publicDir, "apple-touch-icon.png"));
console.log("✓ apple-touch-icon.png");

// Favicon .ico (16+32) – Next.js sert /favicon.ico automatiquement
const ico32 = await sharp(monoSvg, { density: 384 })
  .resize(32, 32, { fit: "contain", background: { r: 13, g: 12, b: 11, alpha: 1 } })
  .png({ compressionLevel: 9 })
  .toBuffer();
await writeFile(join(root, "src/app/icon.png"), ico32);
console.log("✓ src/app/icon.png");

// Apple icon dans /app
const apple = await sharp(monoSvg, { density: 512 })
  .resize(180, 180, { fit: "contain", background: { r: 13, g: 12, b: 11, alpha: 1 } })
  .png({ compressionLevel: 9 })
  .toBuffer();
await writeFile(join(root, "src/app/apple-icon.png"), apple);
console.log("✓ src/app/apple-icon.png");

// ── OG IMAGE 1200×630 ───────────────────────────────────────────────
// Fond beige sable + bandeau bronze + monogramme + wordmark + tagline HE.
const OG_W = 1200;
const OG_H = 630;

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}" viewBox="0 0 ${OG_W} ${OG_H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="hsl(38, 28%, 94%)"/>
      <stop offset="1" stop-color="hsl(36, 22%, 88%)"/>
    </linearGradient>
    <linearGradient id="bronze" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="hsl(28, 62%, 42%)"/>
      <stop offset="1" stop-color="hsl(22, 70%, 50%)"/>
    </linearGradient>
    <linearGradient id="goldStroke" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="hsl(38, 65%, 58%)"/>
      <stop offset="1" stop-color="hsl(28, 62%, 42%)"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${OG_W}" height="${OG_H}" fill="url(#bg)"/>

  <!-- Subtle grain bands -->
  <rect x="0" y="0" width="${OG_W}" height="2" fill="hsl(24,18%,16%)" opacity="0.08"/>
  <rect x="0" y="${OG_H - 2}" width="${OG_W}" height="2" fill="hsl(24,18%,16%)" opacity="0.08"/>

  <!-- Eyebrow -->
  <text x="80" y="120" font-family="Helvetica, Arial, sans-serif"
        font-size="20" letter-spacing="6" fill="hsl(28, 62%, 42%)" font-weight="500">
    PLATE·FORM  ·  RESTAURANT MENUS
  </text>

  <!-- Hebrew tagline (large) -->
  <text x="80" y="265" font-family="Georgia, 'Times New Roman', serif"
        font-size="92" fill="hsl(24, 18%, 16%)" font-weight="500" letter-spacing="-1">
    כל מנה
  </text>
  <text x="80" y="380" font-family="Georgia, 'Times New Roman', serif"
        font-size="92" fill="hsl(24, 18%, 16%)" font-weight="500" letter-spacing="-1">
    בתלת <tspan font-style="italic" fill="url(#bronze)">מימד</tspan>.
  </text>

  <!-- Bilingual subtitle -->
  <text x="80" y="455" font-family="Helvetica, Arial, sans-serif"
        font-size="22" fill="hsl(24, 12%, 38%)" font-weight="400">
    Every dish, in 360°  ·  תפריט דיגיטלי למסעדות
  </text>

  <!-- Monogram tile (right) -->
  <g transform="translate(880, 195) scale(1.6)">
    <rect width="200" height="200" rx="36" fill="hsl(24, 18%, 12%)"/>
    <rect x="24" y="134" width="152" height="6" rx="3" fill="none" stroke="url(#goldStroke)" stroke-width="3" stroke-linecap="round"/>
    <line x1="30" y1="134" x2="170" y2="134" stroke="url(#goldStroke)" stroke-width="3" stroke-linecap="round"/>
    <path d="M 34 134 Q 34 60 100 60 Q 166 60 166 134 Z" fill="none" stroke="url(#goldStroke)" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="100" cy="54" r="9" fill="none" stroke="url(#goldStroke)" stroke-width="3"/>
    <path d="M 44 112 C 62 96, 82 96, 100 112 C 118 128, 138 128, 156 112" fill="none" stroke="url(#goldStroke)" stroke-width="3" stroke-linecap="round"/>
    <path d="M 44 124 C 62 108, 82 108, 100 124 C 118 140, 138 140, 156 124" fill="none" stroke="url(#goldStroke)" stroke-width="3" stroke-linecap="round"/>
    <circle cx="68" cy="76" r="3" fill="url(#goldStroke)"/>
    <circle cx="48" cy="98" r="2.5" fill="url(#goldStroke)"/>
    <circle cx="148" cy="84" r="2.5" fill="url(#goldStroke)"/>
  </g>

  <!-- Footer mark -->
  <line x1="80" y1="540" x2="200" y2="540" stroke="hsl(28, 62%, 42%)" stroke-width="2"/>
  <text x="80" y="575" font-family="Helvetica, Arial, sans-serif"
        font-size="14" letter-spacing="3" fill="hsl(24, 12%, 38%)" font-weight="500">
    PLATEFORM.APP
  </text>
</svg>`;

await sharp(Buffer.from(ogSvg))
  .png({ compressionLevel: 9 })
  .toFile(join(publicDir, "og-image.png"));
console.log("✓ og-image.png (1200×630)");

console.log("\nDone.");
