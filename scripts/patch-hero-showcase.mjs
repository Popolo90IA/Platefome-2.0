// Patch automatique : intègre HeroShowcase dans src/app/page.tsx
// Idempotent — détecte si déjà patché.
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PAGE = join(__dirname, "..", "src", "app", "page.tsx");

let src = readFileSync(PAGE, "utf8");

// 1. Idempotence
if (src.includes('from "@/components/landing/HeroShowcase"')) {
  console.log("✓ Déjà patché — rien à faire.");
  process.exit(0);
}

// 2. Ajouter import après CinematicCurtain
const importNeedle = 'import { CinematicCurtain } from "@/components/landing/CinematicCurtain";';
if (!src.includes(importNeedle)) {
  console.error("✗ Ligne d'import CinematicCurtain introuvable. Patch abandonné.");
  process.exit(1);
}
src = src.replace(
  importNeedle,
  `${importNeedle}\nimport { HeroShowcase } from "@/components/landing/HeroShowcase";`
);

// 3. Remplacer le bloc 3D (entre le commentaire MODÈLE 3D et la fermeture du wrapper)
// On cherche le commentaire de début, puis on remplace jusqu'à la fin du wrapper Label.
const startMarker = "{/* ── MODÈLE 3D EN DESSOUS, pleine largeur ── */}";
const startIdx = src.indexOf(startMarker);
if (startIdx === -1) {
  console.error("✗ Marqueur de section 3D introuvable.");
  process.exit(1);
}

// Trouver la fin du Label (cherche "גרור לסיבוב" suivi du </div> de fermeture)
const endMarker = "גרור לסיבוב</span>";
const endMarkerIdx = src.indexOf(endMarker, startIdx);
if (endMarkerIdx === -1) {
  console.error("✗ Fin de la section 3D (label גרור לסיבוב) introuvable.");
  process.exit(1);
}

// Avancer jusqu'à la fermeture du div parent du label (3 </div> + </div> wrapper interne)
// Plus simple : on cherche la première occurrence de "{/* CTA sous le modèle */}"
const ctaMarker = "{/* CTA sous le modèle */}";
const ctaIdx = src.indexOf(ctaMarker, endMarkerIdx);
if (ctaIdx === -1) {
  console.error("✗ Marqueur CTA introuvable.");
  process.exit(1);
}

const before = src.slice(0, startIdx);
const after = src.slice(ctaIdx);

const replacement = `{/* ── PRÉSENTOIR 3D — carte cream + AR + 3D + QR (inspiré Gemini mockup) ── */}
          <div style={{ width: "100%", marginTop: 16 }}>
            <HeroShowcase
              models={MODELS}
              modelIdx={modelIdx}
              onPrev={prev}
              onNext={next}
              onSelect={setModelIdx}
            />
          </div>

          `;

src = before + replacement + after;

writeFileSync(PAGE, src);
console.log("✓ page.tsx patché avec HeroShowcase.");
console.log(`  Bloc remplacé : ${ctaIdx - startIdx} caractères → ${replacement.length} caractères.`);
