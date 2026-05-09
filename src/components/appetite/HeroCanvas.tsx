"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";
import { DrawSVGPlugin } from "gsap/dist/DrawSVGPlugin";

interface HeroCanvasProps {
  modelUrl: string;
}

const ORBIT_PATH = "M 390,210 A 230,80 0 1,1 389.9,210";   // ellipse orbitale
const N_DOTS     = 6;

export function HeroCanvas({ modelUrl }: HeroCanvasProps) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const wrapRef    = useRef<HTMLDivElement>(null);
  const svgRef     = useRef<SVGSVGElement>(null);
  const flashRef   = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);
  const orbitTween = useRef<gsap.core.Tween[]>([]);
  const [loaded, setLoaded]   = useState(false);

  // ── GSAP intro + DrawSVG + MotionPath ────────────────────────────────────
  useEffect(() => {
    if (!loaded) return;

    gsap.registerPlugin(MotionPathPlugin, DrawSVGPlugin);

    const raf = requestAnimationFrame(() => {
      const wrap  = wrapRef.current;
      const svg   = svgRef.current;
      const flash = flashRef.current;
      const amb   = ambientRef.current;
      if (!wrap || !svg) return;

      // ── 1. Reveal wrapper ────────────────────────────────────────────────
      const tl = gsap.timeline();
      tl.fromTo(wrap,
        { y: 50, autoAlpha: 0, scale: 0.9, filter: "blur(12px)" },
        { y: 0,  autoAlpha: 1, scale: 1,   filter: "blur(0px)", duration: 1.1, ease: "power3.out" },
        0
      );

      // ── 2. DrawSVG — les deux arcs se dessinent depuis le centre ─────────
      const arcTop = svg.querySelector<SVGPathElement>("#arc-top");
      const arcBot = svg.querySelector<SVGPathElement>("#arc-bot");
      if (arcTop && arcBot) {
        tl.fromTo([arcTop, arcBot],
          { drawSVG: "50% 50%" },
          { drawSVG: "0% 100%", duration: 1.4, ease: "power2.inOut", stagger: 0.08 },
          0.3
        );
      }

      // ── 3. DrawSVG — orbit path apparaît ─────────────────────────────────
      const orbitEl = svg.querySelector<SVGPathElement>("#orbit");
      if (orbitEl) {
        tl.fromTo(orbitEl,
          { drawSVG: "0% 0%" },
          { drawSVG: "0% 100%", duration: 1.6, ease: "power1.inOut" },
          0.5
        );
      }

      // ── 4. Flash doré ────────────────────────────────────────────────────
      if (flash) {
        tl.fromTo(flash,
          { autoAlpha: 0, scale: 0.6 },
          { autoAlpha: 1, scale: 1.2, duration: 0.3, ease: "power2.out" },
          0.4
        ).to(flash, { autoAlpha: 0, scale: 2.0, duration: 0.7, ease: "expo.in" }, 0.7);
      }

      // ── 5. Ambient glow ──────────────────────────────────────────────────
      if (amb) {
        tl.to(amb, { autoAlpha: 1, duration: 1.2, ease: "power2.out" }, 0.5);
      }

      // ── 6. MotionPath — dots orbitent autour du modèle ───────────────────
      const dots = svg.querySelectorAll<SVGCircleElement>(".orbit-dot");
      dots.forEach((dot, i) => {
        gsap.set(dot, { autoAlpha: 0 });
        const tw = gsap.to(dot, {
          motionPath: {
            path: "#orbit",
            align: "#orbit",
            alignOrigin: [0.5, 0.5],
            start: i / N_DOTS,
            end:   i / N_DOTS + 1,
          },
          duration: 5 + i * 0.4,
          ease: "none",
          repeat: -1,
        });
        orbitTween.current.push(tw);

        // Fade in chaque dot avec stagger
        tl.to(dot, { autoAlpha: 1, duration: 0.4, ease: "power2.out" }, 1.0 + i * 0.1);
      });

      // ── 7. Pulse permanent des arcs ──────────────────────────────────────
      if (arcTop && arcBot) {
        gsap.to([arcTop, arcBot], {
          opacity: 0.3,
          duration: 1.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.4,
        });
      }
    });

    return () => cancelAnimationFrame(raf);
  }, [loaded]);

  // ── Switch de modèle ─────────────────────────────────────────────────────
  const prevUrl = useRef<string | null>(null);

  useEffect(() => {
    if (prevUrl.current === null) { prevUrl.current = modelUrl; return; }
    if (prevUrl.current === modelUrl) return;
    prevUrl.current = modelUrl;

    const wrap  = wrapRef.current;
    const svg   = svgRef.current;
    const flash = flashRef.current;
    if (!wrap || !svg) return;

    // Accélérer les dots x4
    orbitTween.current.forEach(tw => tw.timeScale(4));
    setTimeout(() => orbitTween.current.forEach(tw => tw.timeScale(1)), 800);

    // DrawSVG efface puis redessine les arcs
    const arcs = svg.querySelectorAll<SVGPathElement>(".arc");
    const tl = gsap.timeline();

    tl.to(wrap, { scale: 0.88, autoAlpha: 0.15, filter: "blur(18px)", duration: 0.35, ease: "power3.in" });

    tl.to(arcs, { drawSVG: "50% 50%", duration: 0.3, ease: "power2.in" }, "<");

    if (flash) {
      tl.to(flash, { autoAlpha: 1, scale: 1.5, duration: 0.2, ease: "power2.out" }, "-=0.05")
        .to(flash, { autoAlpha: 0, scale: 3.0, duration: 0.55, ease: "expo.in" });
    }

    tl.to(wrap,  { scale: 1, autoAlpha: 1, filter: "blur(0px)", duration: 0.65, ease: "elastic.out(1, 0.55)" }, "-=0.4");
    tl.to(arcs,  { drawSVG: "0% 100%", duration: 0.9, ease: "power2.out", stagger: 0.06 }, "-=0.55");
  }, [modelUrl]);

  // ── Hover ────────────────────────────────────────────────────────────────
  function onMouseEnter() {
    const amb = ambientRef.current;
    if (amb) gsap.to(amb, { scale: 1.4, duration: 0.6, ease: "power2.out" });
    orbitTween.current.forEach(tw => tw.timeScale(2.2));
  }
  function onMouseLeave() {
    const amb = ambientRef.current;
    if (amb) gsap.to(amb, { scale: 1, duration: 0.8, ease: "power2.inOut" });
    orbitTween.current.forEach(tw => tw.timeScale(1));
  }

  // ── Three.js ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    if (!canvas || !wrap) return;

    setLoaded(false);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0.5, 4);

    scene.add(new THREE.AmbientLight(0xf0ebe2, 0.6));
    const keyLight = new THREE.DirectionalLight(0xfff5e0, 2.2);
    keyLight.position.set(3, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0x8ebccc, 0.5);
    fillLight.position.set(-4, 2, -2);
    scene.add(fillLight);
    scene.add(Object.assign(new THREE.DirectionalLight(0xf0ebe2, 0.8), { position: new THREE.Vector3(0, -2, -4) }));
    const glowLight = new THREE.PointLight(0xf0d8a0, 1.0, 6);
    glowLight.position.set(0, -1, 0.5);
    scene.add(glowLight);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true; controls.dampingFactor = 0.05;
    controls.enableZoom = false; controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 4; controls.maxPolarAngle = Math.PI * 0.7;
    controls.autoRotate = true; controls.autoRotateSpeed = 0.8;

    let model: THREE.Object3D | null = null;

    function showFallback() {
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.9, 64, 64),
        new THREE.MeshStandardMaterial({ color: 0x1a1c22, metalness: 0.6, roughness: 0.3 })
      );
      sphere.castShadow = true;
      scene.add(sphere);
      model = sphere;
      setLoaded(true);
    }

    new GLTFLoader().load(modelUrl, (gltf) => {
      model = gltf.scene;
      const box    = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size   = box.getSize(new THREE.Vector3());
      const scale  = 2.2 / Math.max(size.x, size.y, size.z);
      model.scale.setScalar(scale);
      model.position.sub(center.multiplyScalar(scale));
      model.position.y -= size.y * scale * 0.15;
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = child.receiveShadow = true;
          const m = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
          if (m) m.envMapIntensity = 1.4;
        }
      });
      scene.add(model);
      setLoaded(true);
    }, undefined, () => showFallback());

    function resize() {
      if (!wrap) return;
      renderer.setSize(wrap.clientWidth, wrap.clientHeight);
      camera.aspect = wrap.clientWidth / wrap.clientHeight;
      camera.updateProjectionMatrix();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    let userInteracting = false;
    const onDown = () => { userInteracting = true; controls.autoRotate = false; };
    const onUp   = () => { userInteracting = false; setTimeout(() => { controls.autoRotate = true; }, 2000); };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerup",   onUp);

    const clock = new THREE.Clock();
    let rafId: number;
    function animate() {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      if (model && !userInteracting) model.position.y += Math.sin(t * 0.6) * 0.0008;
      glowLight.intensity = 0.8 + Math.sin(t * 1.2) * 0.2;
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup",   onUp);
      renderer.dispose();
    };
  }, [modelUrl]);

  return (
    <div
      ref={wrapRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: "relative", width: "100%", height: "420px",
        borderRadius: 16, overflow: "visible",
        opacity: 0, visibility: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div ref={ambientRef} style={{
        position: "absolute", inset: "-22%", borderRadius: "50%",
        background: "radial-gradient(ellipse at 50% 55%, hsl(36,85%,58%,.16) 0%, hsl(28,70%,50%,.05) 55%, transparent 75%)",
        filter: "blur(40px)", pointerEvents: "none",
        opacity: 0, visibility: "hidden", zIndex: 0,
      }} />

      {/* Gold flash */}
      <div ref={flashRef} style={{
        position: "absolute", inset: 0, borderRadius: 16,
        background: "radial-gradient(ellipse at 50% 50%, hsl(45,100%,78%,.9) 0%, hsl(36,90%,58%,.45) 28%, transparent 58%)",
        filter: "blur(22px)", pointerEvents: "none",
        opacity: 0, visibility: "hidden", zIndex: 4,
      }} />

      {/* Three.js canvas */}
      <canvas ref={canvasRef} style={{
        width: "100%", height: "100%", display: "block",
        cursor: "grab", position: "relative", zIndex: 1, borderRadius: 16,
      }} />

      {/* SVG overlay — DrawSVG arcs + MotionPath dots */}
      <svg
        ref={svgRef}
        viewBox="0 0 780 420"
        preserveAspectRatio="xMidYMid meet"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          pointerEvents: "none", zIndex: 3, overflow: "visible",
        }}
      >
        <defs>
          <filter id="glow-gold">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-strong">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Arc supérieur — DrawSVG */}
        <path
          id="arc-top" className="arc"
          d="M 120,210 A 270,130 0 0,1 660,210"
          fill="none"
          stroke="hsl(38,85%,60%)"
          strokeWidth="1.2"
          strokeLinecap="round"
          filter="url(#glow-gold)"
          opacity="0.7"
        />

        {/* Arc inférieur — DrawSVG */}
        <path
          id="arc-bot" className="arc"
          d="M 120,210 A 270,130 0 0,0 660,210"
          fill="none"
          stroke="hsl(36,75%,55%)"
          strokeWidth="0.8"
          strokeLinecap="round"
          filter="url(#glow-gold)"
          opacity="0.45"
        />

        {/* Orbite elliptique — MotionPath */}
        <path
          id="orbit"
          d={ORBIT_PATH}
          fill="none"
          stroke="hsl(38,80%,62%)"
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeDasharray="4 8"
          filter="url(#glow-gold)"
          opacity="0.3"
        />

        {/* Dots orbitaux — MotionPath */}
        {Array.from({ length: N_DOTS }, (_, i) => (
          <circle
            key={i}
            className="orbit-dot"
            r={i % 2 === 0 ? 3.5 : 2.2}
            fill={i % 3 === 0 ? "hsl(45,100%,82%)" : "hsl(38,90%,62%)"}
            filter="url(#glow-strong)"
            opacity="0"
          />
        ))}
      </svg>

      {!loaded && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, pointerEvents: "none", zIndex: 6, borderRadius: 16, background: "hsl(36,20%,96%,.6)", backdropFilter: "blur(8px)" }}>
          <div style={{ width: 32, height: 32, border: "1.5px solid hsl(36,30%,82%)", borderTopColor: "hsl(36,65%,50%)", borderRadius: "50%", animation: "spin 0.9s linear infinite" }} />
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".5625rem", letterSpacing: ".18em", textTransform: "uppercase", color: "hsl(28,20%,52%)" }}>טוען מודל</span>
        </div>
      )}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
