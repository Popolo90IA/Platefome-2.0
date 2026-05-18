// Correctif post-patch : retire le </div> orphelin laissé par le premier patch.
// Le wrapper original (ligne 507) englobait 3D+CTA+social-proof ; on a remplacé
// seulement la zone 3D, donc il reste un </div> en trop ligne 595.
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PAGE = join(__dirname, "..", "src", "app", "page.tsx");

let src = readFileSync(PAGE, "utf8");

// Idempotence : marker injecté à la fin du fix
const MARK = "/* hero-showcase-fix-v1 */";
if (src.includes(MARK)) {
  console.log("✓ Déjà corrigé.");
  process.exit(0);
}

// On cherche le bloc exact à corriger : la </div> orpheline juste avant </section>
// Pattern : "\n          </div>\n        </div>\n      </section>"
// Le wrapper original a été ouvert ligne 508 (qu'on a remplacé), et il y avait :
//   </div>  ← ferme le wrapper interne (modèle)
//   </div>  ← ferme le wrapper externe (toute la zone)
//   </section>
//
// Depuis le patch, on a 5 </div> imbriqués sans wrapper d'ouverture suffisant.
// La structure actuelle :
//   <div HeroShowcase wrapper>...</div>  ← OK auto-fermé
//   {/* CTA */}<div>...</div>            ← OK
//   {/* Social proof */}<div>...</div>   ← OK
//   </div>                                ← orphelin (l'ancien wrapper global)
//   </div>                                ← ferme le container .page-section-inner
//   </section>

// Retirer la </div> orpheline juste avant la fermeture du container.
// On cible : "          </div>\n        </div>\n      </section>"  (3 lignes)
// On veut  : "        </div>\n      </section>"  (2 lignes)

const target = "          </div>\n        </div>\n      </section>\n\n\n      {/* ═══ STATS ═══ */}";
const replacement = "        </div>\n      </section>\n\n\n      {/* ═══ STATS ═══ */}";

if (!src.includes(target)) {
  console.error("✗ Pattern de fermeture introuvable — patch non appliqué.");
  console.error("  Recherché :", JSON.stringify(target.slice(0, 80)) + "...");
  process.exit(1);
}

src = src.replace(target, replacement);
src = `${MARK}\n${src}`;
writeFileSync(PAGE, src);
console.log("✓ </div> orphelin retiré.");
