// Extrait la cloche dorée d'une image (JPEG ou PNG) en retirant le damier
// de fond, puis rogne aux bords et nettoie les artefacts.
//
// Sources acceptées (par ordre de priorité) :
//   1. public/brand/cloche-source.png  (HD, recommandé)
//   2. public/brand/cloche-source.jpeg (fallback)
import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { existsSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BRAND_DIR = join(__dirname, "..", "public", "brand");
const SRC_PNG = join(BRAND_DIR, "cloche-source.png");
const SRC_JPG = join(BRAND_DIR, "cloche-source.jpeg");
const SRC = existsSync(SRC_PNG) ? SRC_PNG : SRC_JPG;
const OUT = join(BRAND_DIR, "cloche.png");

console.log(`Source : ${SRC}`);

// 1. Lecture raw RGBA
const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
const out = Buffer.from(data);

// 2. Pour chaque pixel : déterminer si c'est doré (à garder) ou neutre (à virer).
//    Critère "doré" : R > G > B avec écart suffisant (teinte chaude saturée).
for (let i = 0; i < out.length; i += channels) {
  const r = out[i], g = out[i + 1], b = out[i + 2];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const chroma = max - min;

  // Teinte dorée : rouge dominant, bleu le plus bas, écart R-B suffisant
  const isGold = r > g && g >= b && (r - b) > 25 && r > 110;

  if (!isGold) {
    // Damier (neutre clair), ombre (neutre gris), bordure (teinte exotique) → invisible
    out[i + 3] = 0;
  } else {
    // Pixel doré → alpha proportionnel à la saturation (adoucit l'anti-aliasing)
    const goldStrength = Math.min(1, chroma / 60);
    out[i + 3] = Math.round(255 * goldStrength);
  }
}

// 3. Pipeline : raw → trim auto sur alpha → crop ombre du bas → resize 600px → PNG
const trimmedPng = await sharp(out, { raw: { width, height, channels } })
  .trim({ threshold: 10 })
  .png()
  .toBuffer();

const meta = await sharp(trimmedPng).metadata();
const cropHeight = Math.round(meta.height * 0.91);

await sharp(trimmedPng)
  .extract({ left: 0, top: 0, width: meta.width, height: cropHeight })
  .resize({ width: 800, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(OUT);

const outMeta = await sharp(OUT).metadata();
console.log(`OK → ${OUT} (${outMeta.width}×${outMeta.height}, ${(outMeta.size / 1024).toFixed(1)} KB)`);
