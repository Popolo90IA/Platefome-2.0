import gsap from "gsap";

type Refs = {
  wrap: HTMLDivElement | null;
  flash: HTMLDivElement | null;
  amb?: HTMLDivElement | null;
};

/* ── Intro reveal — wrap rise/blur + flash burst + ambient fade ── */
export function playIntro({ wrap, flash, amb }: Refs) {
  if (!wrap) return;
  const tl = gsap.timeline();
  tl.fromTo(
    wrap,
    { y: 55, autoAlpha: 0, scale: 0.9, filter: "blur(12px)" },
    { y: 0, autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 1.1, ease: "power3.out" },
  );
  if (flash) {
    tl.fromTo(flash, { autoAlpha: 0, scale: 0.5 }, { autoAlpha: 1, scale: 1.2, duration: 0.3, ease: "power2.out" }, 0.4)
      .to(flash, { autoAlpha: 0, scale: 2.2, duration: 0.75, ease: "expo.in" }, 0.7);
  }
  if (amb) tl.to(amb, { autoAlpha: 1, duration: 1.3, ease: "power2.out" }, 0.5);
}

/* ── Model switch — collapse/blur + flash + elastic return ── */
export function playSwitch({ wrap, flash }: Refs) {
  if (!wrap) return;
  const tl = gsap.timeline();
  tl.to(wrap, { scale: 0.88, autoAlpha: 0.15, filter: "blur(18px)", duration: 0.35, ease: "power3.in" });
  if (flash) {
    tl.to(flash, { autoAlpha: 1, scale: 1.6, duration: 0.18, ease: "power2.out" }, "-=0.05")
      .to(flash, { autoAlpha: 0, scale: 3.0, duration: 0.55, ease: "expo.in" });
  }
  tl.fromTo(
    wrap,
    { scale: 0.88, autoAlpha: 0.15, filter: "blur(18px)" },
    { scale: 1, autoAlpha: 1, filter: "blur(0px)", duration: 0.7, ease: "elastic.out(1,0.55)" },
    "-=0.35",
  );
}

/* ── Hover — ambient glow scale ── */
export function ambientScale(amb: HTMLDivElement | null, hover: boolean) {
  if (!amb) return;
  gsap.to(amb, hover
    ? { scale: 1.4, duration: 0.6, ease: "power2.out" }
    : { scale: 1, duration: 0.8, ease: "power2.inOut" });
}
