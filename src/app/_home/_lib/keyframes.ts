/**
 * Inline CSS keyframes + class shortcuts used across the landing page.
 * Injected once via <style>{HOME_KEYFRAMES}</style> in the page root.
 */
export const HOME_KEYFRAMES = `
  @keyframes borderRun { 0%{background-position:0% 0%} 100%{background-position:200% 0%} }
  @keyframes goldShimmer { 0%{background-position:100% 0} 50%{background-position:0% 0} 100%{background-position:100% 0} }
  @keyframes orbFloat1 { 0%,100%{transform:translate(0,0) scale(1);opacity:.35} 33%{transform:translate(60px,-80px) scale(1.15);opacity:.6} 66%{transform:translate(-40px,40px) scale(.88);opacity:.25} }
  @keyframes orbFloat2 { 0%,100%{transform:translate(0,0) scale(1);opacity:.25} 25%{transform:translate(-70px,60px) scale(1.2);opacity:.5} 75%{transform:translate(50px,-50px) scale(.85);opacity:.15} }
  @keyframes marqueeScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes marqueeScrollReverse { from{transform:translateX(-50%)} to{transform:translateX(0)} }
  @keyframes pulseGlow { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.12)} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pricingPulse {
    0%,100%{box-shadow:0 0 0 1px hsl(var(--line) / .18),0 40px 80px -24px rgba(0,0,0,.7)}
    50%{box-shadow:0 0 0 1px hsl(var(--abyss) / .42),0 40px 80px -24px rgba(0,0,0,.7),0 0 80px hsl(var(--abyss) / .05)}
  }
  @keyframes shimmerCard { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes letterReveal { from{opacity:0;transform:translateY(60px) skewY(4deg)} to{opacity:1;transform:translateY(0) skewY(0deg)} }
  @keyframes lineExpand { from{scaleX:0} to{scaleX:1} }
  @keyframes subtlePulse { 0%,100%{opacity:.6} 50%{opacity:1} }
  @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes kineticWord {
    0%,18%  {transform:translateY(0);opacity:1}
    22%,96% {transform:translateY(-120%);opacity:0}
    100%    {transform:translateY(0);opacity:1}
  }
  @keyframes kineticWord2 {
    0%,18%  {transform:translateY(120%);opacity:0}
    22%,68% {transform:translateY(0);opacity:1}
    72%,96% {transform:translateY(-120%);opacity:0}
    100%    {transform:translateY(120%);opacity:0}
  }
  @keyframes kineticWord3 {
    0%,68%  {transform:translateY(120%);opacity:0}
    72%,96% {transform:translateY(0);opacity:1}
    100%    {transform:translateY(0);opacity:1}
  }
  @keyframes scrollIndicator { 0%{transform:translateY(0);opacity:1} 100%{transform:translateY(18px);opacity:0} }
  @keyframes stepProgress { from{height:0} to{height:100%} }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes heroFadeIn { from{opacity:0} to{opacity:1} }
  @keyframes slideUp { from{opacity:0;transform:translateY(32px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes aurora1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-80px,60px) scale(1.2)} }
  @keyframes aurora2 { 0%,100%{transform:translate(0,0) scale(1.1)} 50%{transform:translate(120px,-50px) scale(0.9)} }
  @keyframes aurora3 { 0%,100%{transform:translate(0,0) scale(0.9)} 50%{transform:translate(-60px,90px) scale(1.15)} }
  @keyframes navPill { from{opacity:0;transform:translateX(-50%) translateY(-16px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
  @keyframes badgeDot { 0%,100%{box-shadow:0 0 0 0 hsl(var(--accent-bright) / .35)} 50%{box-shadow:0 0 0 8px hsl(var(--accent-bright) / 0)} }
  @keyframes showcaseBounce { 0%,100%{transform:translateY(0);opacity:.6} 50%{transform:translateY(6px);opacity:1} }

  /* ── Hero elements: initial hidden, revealed by GSAP CinematicCurtain ── */
  .hero-fade-a,.hero-fade-b,.hero-fade-c,.hero-fade-d,.hero-fade-e,.hero-fade-f {
    opacity: 0;
  }
  @media (prefers-reduced-motion: reduce) {
    .hero-fade-a,.hero-fade-b,.hero-fade-c,.hero-fade-d,.hero-fade-e,.hero-fade-f {
      opacity: 1 !important;
      filter: none !important;
      transform: none !important;
    }
  }
  .fade-a{animation:fadeUp 1s cubic-bezier(.16,1,.3,1) both}
  .fade-b{animation:fadeUp 1s cubic-bezier(.16,1,.3,1) .12s both}
  .fade-c{animation:fadeUp 1s cubic-bezier(.16,1,.3,1) .24s both}
  .fade-d{animation:fadeUp 1s cubic-bezier(.16,1,.3,1) .36s both}
  .kinetic-a{position:absolute;inset:0;display:flex;align-items:flex-start;overflow:hidden}
  .kinetic-a>span{display:block;animation:kineticWord 9s cubic-bezier(.76,0,.24,1) infinite}
  .kinetic-b{position:absolute;inset:0;display:flex;align-items:flex-start;overflow:hidden}
  .kinetic-b>span{display:block;animation:kineticWord2 9s cubic-bezier(.76,0,.24,1) infinite}
  .kinetic-c{position:absolute;inset:0;display:flex;align-items:flex-start;overflow:hidden}
  .kinetic-c>span{display:block;animation:kineticWord3 9s cubic-bezier(.76,0,.24,1) infinite}
  @media (max-width:900px){
    .hero-cols{flex-direction:column !important}
    .hero-text{max-width:100% !important;padding-left:0 !important}
    .hero-3d{max-width:100% !important}
    .features-grid{grid-template-columns:1fr !important}
    .gallery-grid{grid-template-columns:repeat(2,1fr) !important}
    .pricing-grid{grid-template-columns:1fr !important}
    .stats-grid{grid-template-columns:repeat(2,1fr) !important}
    .footer-links{grid-template-columns:repeat(2,1fr) !important}
    .steps-layout{flex-direction:column !important}
    .steps-sticky{position:relative !important;top:auto !important;width:100% !important}
  }
  @media (max-width:600px){
    .gallery-grid{grid-template-columns:1fr !important}
    .stats-grid{grid-template-columns:1fr !important}
    .footer-links{grid-template-columns:1fr !important}
  }
  @media (prefers-reduced-motion:reduce){
    *{animation:none !important;transition-duration:.01ms !important}
  }
`;

/** Grain SVG noise overlay (inline data URI). */
export const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
