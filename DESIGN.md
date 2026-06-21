---
name: PLATFORME
description: Menus digitaux 3D / 360° pour restaurants, scannables via QR.
colors:
  bronze: "#ae6729"
  terracotta: "#d96826"
  bronze-bright: "#c2773a"
  void-dark: "#110f0e"
  surface-dark: "#1e1b19"
  line-dark: "#322e2a"
  cream: "#f8f4ed"
  fog: "#ede8df"
  subtle-dark: "#a59a8e"
  sand: "#f3ebdd"
  off-white: "#faf6ef"
  ink: "#302720"
  subtle-light: "#6b6258"
  sage: "#4f9d6b"
typography:
  display:
    fontFamily: "Cormorant Garamond, Noto Serif Hebrew, Georgia, serif"
    fontSize: "clamp(44px, 5.2vw, 88px)"
    fontWeight: 700
    lineHeight: 0.94
    letterSpacing: "-0.03em"
  body:
    fontFamily: "DM Sans, Heebo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "-0.01em"
  label:
    fontFamily: "DM Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    letterSpacing: "0.14em"
rounded:
  sm: "10px"
  md: "16px"
  lg: "28px"
  pill: "99px"
spacing:
  xs: "8px"
  sm: "14px"
  md: "32px"
  lg: "56px"
components:
  button-primary:
    backgroundColor: "{colors.bronze}"
    textColor: "{colors.off-white}"
    rounded: "{rounded.sm}"
    padding: "14px 32px"
  button-ghost:
    textColor: "{colors.subtle-dark}"
    rounded: "{rounded.sm}"
    padding: "14px 28px"
  chip:
    backgroundColor: "{colors.bronze}"
    textColor: "{colors.off-white}"
    rounded: "{rounded.pill}"
    padding: "7px 14px"
  card-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.fog}"
    rounded: "{rounded.lg}"
    padding: "16px"
---

# Design System: PLATFORME

## 1. Overview

**Creative North Star: "Le présentoir d'artisan, sous vitrine"**

PLATFORME fait du menu une expérience : chaque plat se regarde en 3D / 360° avant d'être commandé. Le système visuel doit donner faim et inspirer confiance, sans jamais tomber dans le SaaS corporate. Deux mondes cohabitent sous une même identité bronze : la **landing de marque**, sombre et cinématique (le plat éclairé sur fond quasi-noir, comme une pièce sous vitrine), et l'**app outil** (dashboard, éditeur), claire en beige sable pour de longues sessions de travail. La chaleur vient toujours de l'accent bronze, du serif Cormorant et de l'imagerie — jamais d'un fond beige « par défaut ».

Le ton est éditorial et retenu : un seul geste fort par écran (un mot signature en italique bronze, un cadre, une lueur), pas dix effets. RTL hébreu est la direction première ; FR/EN sont en miroir.

Ce système rejette explicitement : le template SaaS hero-metric, les grilles de cards identiques, la landing « AI cream » beige-fade générique, l'emoji dans l'UI, et les statistiques inventées.

**Key Characteristics:**
- Bronze comme voix unique, jamais dilué dans des neutres.
- Cormorant Garamond display + DM Sans body + DM Mono labels.
- Landing sombre cinématique ; app claire beige sable.
- RTL hébreu d'abord, un geste fort par écran.
- Imagerie / 3D au centre : montre le plat, ne le raconte pas.

## 2. Colors

Palette chaude bronze-terracotta sur deux socles neutres (quasi-noir pour la marque, beige sable pour l'app).

### Primary
- **Bronze** (`#ae6729`, dark `hsl(28 62% 52%)`): l'accent signature. CTA, mots en italique dans les titres, icônes de preuve, cadres. Porte l'identité. En thème sombre on remonte sa luminosité (`--accent-bright`, `--accent-warm`) pour tenir le contraste sur noir.

### Secondary
- **Terracotta** (`#d96826`, `hsl(22 70% 50%)`): seconde borne du gradient signature `--grad-bronze` (135°, bronze → terracotta). Réservée aux dégradés CTA / logo / mot signature, pas en aplat de texte.

### Tertiary
- **Sage** (`#4f9d6b`, vivant): point « live » du badge hero (dot pulsant). Usage strictement ponctuel — statut/disponibilité.

### Neutral
- **Void** (`#110f0e`, `hsl(24 8% 6%)`): fond de la landing. Quasi-noir tiède.
- **Surface dark** (`#1e1b19`): cards et surfaces interactives sur la landing.
- **Cream / Fog** (`#f8f4ed` / `#ede8df`): titres et texte sur fond sombre.
- **Subtle dark** (`#a59a8e`): texte secondaire sur sombre.
- **Sand** (`#f3ebdd`, `hsl(38 28% 94%)`): fond de l'app (dashboard, éditeur).
- **Off-white** (`#faf6ef`): cards de l'app.
- **Ink** (`#302720`): texte principal sur fond clair.

### Named Rules
**The One-Bronze Rule.** Une seule famille d'accent : bronze→terracotta. Aucune autre teinte saturée n'entre dans l'UI ; les couleurs « plat » vivent dans l'imagerie, pas dans les composants.

**The Earned-Warmth Rule.** La chaleur est portée par l'accent, le serif et les photos — **jamais** par un fond beige tiède posé par défaut sur une surface sombre. Sur la marque, le socle est le quasi-noir ; le beige est l'identité de l'app, pas un raccourci « warm ».

## 3. Typography

**Display Font:** Cormorant Garamond (fallback Noto Serif Hebrew, Georgia, serif)
**Body Font:** DM Sans (fallback Heebo pour l'hébreu, system-ui)
**Label/Mono Font:** DM Mono (eyebrows, chips, méta)

**Character:** Le contraste serif × sans porte tout : Cormorant, haut de contraste et italique élégant, pour l'émotion ; DM Sans, neutre et lisible, pour l'UI ; DM Mono en petites capitales tracées pour les labels techniques (QR, 360°). En hébreu, Noto Serif Hebrew et Heebo prennent le relais sans perdre la hiérarchie.

### Hierarchy
- **Display** (700, `clamp(44px, 5.2vw, 88px)`, lh 0.94, `-0.03em`): titres hero. Plafond ~88px ; jamais au-delà de ~96px.
- **Headline** (600–700, `clamp(28px, 3.4vw, 44px)`, lh 1.05): titres de section.
- **Title** (600, `1.25–1.5rem`): titres de cards / sous-sections.
- **Body** (400, `1.0625rem`, lh 1.75): texte courant, ≤ 65–75ch.
- **Label** (500, `0.6875rem`, `0.14em`, UPPERCASE): eyebrows, chips, méta en DM Mono.

### Named Rules
**The Signature-Word Rule.** Dans un titre, **un seul** mot passe en italique Cormorant avec le gradient bronze (`background-clip: text`). C'est la marque, pas de la décoration — un fallback `color: bronze` solide est requis si le clip n'est pas supporté. Le reste du titre reste en couleur d'encre pleine.

**The Letter-Spacing Floor.** Display ≥ `-0.04em`. En dessous, les lettres se touchent.

## 4. Elevation

Système à ombres douces et chaudes (jamais d'ombre noire pure) + lueurs bronze atmosphériques. Sur la landing, la profondeur vient surtout de la lumière (glow radial bronze derrière le visuel hero, cadre décalé) plutôt que d'empilements de cards.

### Shadow Vocabulary
- **Card** (`--shadow-card` : `0 0 0 1px hsl(var(--line)), 0 16px 48px -16px rgba(0,0,0,.8)`): cards sur fond sombre.
- **CTA** (`--shadow-cta` : `0 2px 16px hsl(28 62% 38% / .5), inset 0 1px 0 rgba(255,255,255,.08)`): boutons primaires bronze.
- **Glow gold** (`--shadow-glow-gold` : `0 0 0 1px hsl(var(--gold)/.3), 0 0 32px hsl(var(--gold)/.2)`): éléments mis en avant, halo.
- **Deep** (`--shadow-deep` : `0 24px 64px -24px rgba(0,0,0,.7)`): visuel hero, modales.

### Named Rules
**The Warm-Shadow Rule.** Les ombres et lueurs sont teintées bronze, pas grises/noires neutres. La profondeur est lumineuse, pas funèbre.

## 5. Components

### Buttons
- **Shape:** coins doux (`10px`, `--rounded.sm`).
- **Primary:** fond gradient `--grad-bronze`, texte blanc cassé, `padding: 14px 32px`, ombre `--shadow-cta`. Flèche `chevron` inline.
- **Hover / Focus:** `brightness(1.1)` + `translateY(-2px)` + ombre renforcée, uniquement sur pointeur fin (`hover: hover`). `:active` → `scale(0.97)`. Focus clavier visible obligatoire.
- **Ghost (secondaire):** fond `hsl(var(--white)/.06)`, bord `hsl(var(--white)/.1)`, `backdrop-filter: blur(8px)`, texte `--subtle`. Hover → bord bronze + texte blanc.

### Chips
- **Style:** pilule (`99px`), fond `--grad-bronze`, texte blanc, DM Mono `.7rem` tracé `.12em` (ex. « 360° »). Variante « live » : fond `accent/.1`, bord `accent/.22`, dot `sage` pulsant.

### Cards / Containers
- **Corner Style:** `28px` (`--rounded.lg`) pour le cadre hero/visuel ; `16px` pour les cards courantes.
- **Background:** `surface-dark` sur la marque, `off-white` sur l'app.
- **Shadow Strategy:** cf. Elevation (`--shadow-card`, `--shadow-deep`).
- **Border:** trait fin teinté bronze `hsl(var(--accent-bright)/.22)`.
- **Internal Padding:** `clamp(10px, 1.6vw, 16px)`.

### Inputs / Fields
- **Style:** fond `surface`, bord `--line`, radius `10px`.
- **Focus:** bascule de bord vers bronze + ring `--ring` ; jamais d'outline supprimée sans remplacement.

### Navigation
- **Style:** pill flottante centrée, fixe, `backdrop-filter` ; au scroll (>60px) elle se densifie (fond plus opaque, ombre). Liens DM Sans, soulignement bronze animé en `transform: scaleX` (pas `width`).

### Hero CTA (signature)
Paire bouton primaire bronze + ghost verre, ancrée au start (droite en RTL), révélée par le rideau cinématique (`.hero-fade-*`).

## 6. Do's and Don'ts

### Do:
- **Do** verrouiller la landing en thème sombre (`.dark` sur la racine) : tous les effets hero sont calibrés pour le quasi-noir.
- **Do** réserver le gradient `background-clip: text` à **un** mot signature par titre, avec fallback `color` solide.
- **Do** porter la chaleur par l'accent bronze, le serif et l'imagerie.
- **Do** honorer `prefers-reduced-motion` sur **toutes** les animations, y compris l'intro GSAP (tweens JS non coupés par le CSS `animation: none`).
- **Do** garder un seul geste fort par écran ; varier l'espacement pour le rythme.
- **Do** penser RTL d'abord (ancrage start, `insetInlineStart`, bidi-override sur le wordmark latin).

### Don't:
- **Don't** inventer de statistiques (« 4.9/5 », « +200 restaurants ») : ancrer un chiffre réel ou le retirer.
- **Don't** poser un fond beige tiède « par défaut » sur une surface qui doit être sombre (the Earned-Warmth Rule).
- **Don't** utiliser le gradient-text comme décoration ailleurs que le mot signature.
- **Don't** empiler le template SaaS hero-metric ni des grilles de cards identiques.
- **Don't** mettre d'emoji dans l'UI.
- **Don't** animer `width` / `height` / `padding` / `margin` ; utiliser `transform` / `opacity`.
- **Don't** poser de texte gris sur un fond coloré ; utiliser une nuance de la teinte ou une transparence.
