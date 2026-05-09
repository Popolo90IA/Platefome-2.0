# 🚀 Plateform — Merge dans ton repo

Le ZIP est structuré **exactement comme ton repo `Platefome-2.0-main/`**.
Tu copies-colles, tu push, c'est fini.

---

## Une seule commande (Mac / Linux)

```bash
cd ~/Downloads
unzip github-handoff.zip          # si pas déjà fait
cp -R github-handoff/* /chemin/vers/Platefome-2.0-main/
cd /chemin/vers/Platefome-2.0-main
git add .
git commit -m "feat(design): brand identity + design reference"
git push
```

## Sur Windows (PowerShell)

```powershell
cd $HOME\Downloads
Expand-Archive github-handoff.zip -DestinationPath .
Copy-Item -Recurse -Force github-handoff\* C:\chemin\vers\Platefome-2.0-main\
cd C:\chemin\vers\Platefome-2.0-main
git add .
git commit -m "feat(design): brand identity + design reference"
git push
```

---

## Ce qui va être ajouté/modifié dans ton repo

| Fichier | Action |
|---|---|
| `CLAUDE.md` | **NOUVEAU** — instructions pour Claude Code |
| `tailwind.config.js` | **MODIFIÉ** — tokens brand ajoutés (bronze, void, fog, gradients…) |
| `public/brand/logo-mark.svg` | **NOUVEAU** |
| `public/brand/logo-lockup.svg` | **NOUVEAU** |
| `public/brand/logo-monogram.svg` | **NOUVEAU** |
| `public/brand/wordmark.svg` | **NOUVEAU** |
| `design-ref/*.html` | **NOUVEAU** — 9 mockups HTML (référence visuelle) |
| `design-ref/colors_and_type.css` | **NOUVEAU** — source de vérité tokens |

**Aucun fichier `.tsx` ou `globals.css` n'est modifié** — ton code Next.js actuel reste intact. La prochaine étape (transformer les mockups en composants React) sera faite par Claude Code quand tu seras prêt.

---

## Étape suivante : Claude Code

Une fois pushé, ouvre le repo dans Claude Code et dis-lui simplement :

> *Lis `CLAUDE.md` puis applique le design system de `design-ref/` à l'app.*

Il s'occupera de tout (composants React, Tailwind, déploiement Vercel).
