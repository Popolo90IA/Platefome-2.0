// Extrait la cloche dorée du JPEG WhatsApp en retirant le damier de fond,
// puis rogne et nettoie les artefacts JPEG aux bords (anti-aliasing résiduel).
import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, "..", "public", "brand", "cloche-source.jpeg");
const OUT = join(__dirname, "..", "public", "brand", "cloche.png");

// 1. Lecture raw RGBA
const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
const out = Buffer.from(data);

// 2. Pour chaque pixel : décider alpha selon "à quel point il est doré"
//    On calcule la saturation/teinte et si le pixel est neutre (gris/blanc) → transparent.
//    Si pixel partiellement doré (anti-aliasing), on garde mais avec alpha progressif.
for (let i = 0; i < out.length; i += channels) {
  const r = out[i], g = out[i + 1], b = out[i + 2];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const chroma = max - min; // 0 = gris parfait, élevé = couleur saturée
  const brightness = (r + g + b) / 3;

  // Pixel "doré" = R > G > B avec écart suffisant (teinte chaude)
  const isGold = r > g && g >= b && (r - b) > 25 && r > 110;

  if (!isGold) {
    // Pas doré → on regarde si c'est neutre clair (damier) ou ombre
    // - damier blanc : R≈G≈B et brillance haute
    // - damier gris : R≈G≈B ≈ 204
    // - ombre douce sous plateau : R≈G≈B et chroma faible
    if (chroma < 20) {
      out[i + 3] = 0; // transparent
    } else {
      // teinte exotique (verdâtre/bleuâtre) → on coupe aussi
      out[i + 3] = 0;
    }
  } else {
    // Pixel doré → alpha calculé sur la saturation pour adoucir les bords
    // Plus le pixel est saturé/sombre, plus on le garde opaque
    const goldStrength = Math.min(1, chroma / 60);
    const alpha = Math.round(255 * goldStrength);
    out[i + 3] = alpha;
  }
}

// 3. Pipeline :
//    a) trim auto sur l'alpha (rogne le vide)
//    b) crop la bande d'ombre résiduelle (9% du bas)
//    c) resize → PNG
const trimmedPng = await sharp(out, { raw: { width, height, channels } })
  .trim({ threshold: 10 })
  .png()
  .toBuffer();

const meta = await sharp(trimmedPng).metadata();
const cropHeight = Math.round(meta.height * 0.91);
await sharp(trimmedPng)
  .extract({ left: 0, top: 0, width: meta.width, height: cropHeight })
  .resize({ width: 600, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(OUT);

console.log(`OK → ${OUT}`);
