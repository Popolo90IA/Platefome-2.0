"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";

interface HeroCanvasProps {
  modelUrl: string;
}

// ── Particle system ──────────────────────────────────────────────────────────
interface Particle {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  opacity: number;
  y: number;
  ySpeed: number;
  trail: { x: number; y: number; a: number }[];
}

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, () => ({
    angle:   Math.random() * Math.PI * 2,
    radius:  120 + Math.random() * 80,
    speed:   (0.003 + Math.random() * 0.004) * (Math.random() > 0.5 ? 1 : -1),
    size:    1.5 + Math.random() * 2.5,
    opacity: 0.4 + Math.random() * 0.6,
    y:       (Math.random() - 0.5) * 60,
    ySpeed:  (Math.random() - 0.5) * 0.008,
    trail:   [],
  }));
}

export function HeroCanvas({ modelUrl }: HeroCanvasProps) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const overlayRef   = useRef<HTMLCanvasElement>(null);
  const wrapRef      = useRef<HTMLDivElement>(null);
  const flashRef     = useRef<HTMLDivElement>(null);
  const ambientRef   = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>(createParticles(28));
  const overlayRaf   = useRef<number>(0);
  const switchingRef = useRef(false);
  const [loaded, setLoaded] = useState(false);

  // ── Overlay canvas: particules + halo respirant ──────────────────────────
  useEffect(() => {
    if (!loaded) return;
    const raf = requestAnimationFrame(() => {
      const ol = overlayRef.current;
      if (!ol) return;

      let frame = 0;

      function drawOverlay() {
        overlayRaf.current = requestAnimationFrame(drawOverlay);
        const ctx = ol!.getContext("2d");
        if (!ctx) return;

        const W = ol!.width;
        const H = ol!.height;
        const cx = W / 2;
        const cy = H / 2;

        ctx.clearRect(0, 0, W, H);
        frame++;

        // ── Halo respirant ─────────────────────────────────────────────────
        const breathe = 0.5 + 0.5 * Math.sin(frame * 0.018);
        const haloR = 145 + breathe * 18;
        const grad = ctx.createRadialGradient(cx, cy, haloR * 0.3, cx, cy, haloR);
        grad.addColorStop(0, `hsla(36,85%,58%,${0.13 + breathe * 0.07})`);
        grad.addColorStop(0.5, `hsla(30,70%,50%,${0.06 + breathe * 0.03})`);
        grad.addColorStop(1, "hsla(0,0%,0%,0)");
        ctx.beginPath();
        ctx.arc(cx, cy, haloR, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // ── Particules orbitales ───────────────────────────────────────────
        const particles = particlesRef.current;
        for (const p of particles) {
          p.angle += p.speed;
          p.y     += p.ySpeed;
          if (Math.abs(p.y) > 50) p.ySpeed *= -1;

          const px = cx + Math.cos(p.angle) * p.radius;
          const py = cy + Math.sin(p.angle) * p.radius * 0.38 + p.y;

          // Trail
          p.trail.push({ x: px, y: py, a: p.opacity });
          if (p.trail.length > 10) p.trail.shift();

          // Draw trail
          for (let i = 0; i < p.trail.length - 1; i++) {
            const t0 = p.trail[i];
            const t1 = p.trail[i + 1];
            const alpha = (i / p.trail.length) * p.opacity * 0.5;
            ctx.beginPath();
            ctx.moveTo(t0.x, t0.y);
            ctx.lineTo(t1.x, t1.y);
            ctx.strokeStyle = `hsla(38,90%,62%,${alpha})`;
            ctx.lineWidth = p.size * 0.5 * (i / p.trail.length);
            ctx.stroke();
          }

          // Draw dot
          const dotGrad = ctx.createRadialGradient(px, py, 0, px, py, p.size * 2.5);
          dotGrad.addColorStop(0, `hsla(45,100%,80%,${p.opacity})`);
          dotGrad.addColorStop(0.5, `hsla(38,90%,62%,${p.opacity * 0.6})`);
          dotGrad.addColorStop(1, "hsla(36,80%,55%,0)");
          ctx.beginPath();
          ctx.arc(px, py, p.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = dotGrad;
          ctx.fill();
        }

        // ── Lightning au switch ─────────────────────────────────────────────
        if (switchingRef.current) {
          const bolts = 6;
          for (let b = 0; b < bolts; b++) {
            const startAngle = (b / bolts) * Math.PI * 2 + frame * 0.3;
            const sx = cx + Math.cos(startAngle) * 90;
            const sy = cy + Math.sin(startAngle) * 40;
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            let bx = sx, by = sy;
            for (let s = 0; s < 5; s++) {
              bx += (Math.random() - 0.5) * 30 + (cx - sx) * 0.2;
              by += (Math.random() - 0.5) * 30 + (cy - sy) * 0.2;
              ctx.lineTo(bx, by);
            }
            ctx.lineTo(cx, cy);
            ctx.strokeStyle = `hsla(45,100%,85%,${0.6 + Math.random() * 0.4})`;
            ctx.lineWidth   = 1 + Math.random() * 1.5;
            ctx.shadowColor = "hsl(45,100%,85%)";
            ctx.shadowBlur  = 12;
            ctx.stroke();
            ctx.shadowBlur  = 0;
          }
        }
      }

      drawOverlay();
    });

    return () => {
      cancelAnimationFrame(overlayRaf.current);
    };
  }, [loaded]);

  // ── Resize overlay ───────────────────────────────────────────────────────
  useEffect(() => {
    const ol   = overlayRef.current;
    const wrap = wrapRef.current;
    if (!ol || !wrap) return;
    const ro = new ResizeObserver(() => {
      ol.width  = wrap.clientWidth;
      ol.height = wrap.clientHeight;
    });
    ro.observe(wrap);
    ol.width  = wrap.clientWidth;
    ol.height = wrap.clientHeight;
    return () => ro.disconnect();
  }, []);

  // ── GSAP intro ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!loaded) return;
    const raf = requestAnimationFrame(() => {
      const wrap  = wrapRef.current;
      const flash = flashRef.current;
      const amb   = ambientRef.current;
      if (!wrap) return;

      const tl = gsap.timeline();

      tl.fromTo(wrap,
        { y: 60, autoAlpha: 0, scale: 0.88, filter: "blur(14px)" },
        { y: 0,  autoAlpha: 1, scale: 1,    filter: "blur(0px)", duration: 1.2, ease: "power3.out" },
        0
      );

      if (flash) {
        tl.fromTo(flash,
          { autoAlpha: 0, scale: 0.5 },
          { autoAlpha: 1, scale: 1.3, duration: 0.35, ease: "power2.out" },
          0.4
        ).to(flash, { autoAlpha: 0, scale: 2.2, duration: 0.8, ease: "power2.in" }, 0.75);
      }

      if (amb) {
        tl.to(amb, { autoAlpha: 1, duration: 1.4, ease: "power2.out" }, 0.5);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [loaded]);

  // ── GSAP switch ──────────────────────────────────────────────────────────
  const prevUrl = useRef<string | null>(null);

  useEffect(() => {
    if (prevUrl.current === null) { prevUrl.current = modelUrl; return; }
    if (prevUrl.current === modelUrl) return;
    prevUrl.current = modelUrl;

    const wrap  = wrapRef.current;
    const flash = flashRef.current;
    if (!wrap) return;

    // Activer les lightnings
    switchingRef.current = true;
    setTimeout(() => { switchingRef.current = false; }, 700);

    const tl = gsap.timeline();

    tl.to(wrap, { scale: 0.9, filter: "blur(16px)", autoAlpha: 0.2, duration: 0.35, ease: "power3.in" });

    if (flash) {
      tl.to(flash, { autoAlpha: 1, scale: 1.6, duration: 0.18, ease: "power2.out" }, "-=0.05")
        .to(flash, { autoAlpha: 0, scale: 2.8, duration: 0.6,  ease: "expo.in" });
    }

    tl.fromTo(wrap,
      { scale: 0.9, filter: "blur(16px)", autoAlpha: 0.2 },
      { scale: 1,   filter: "blur(0px)",  autoAlpha: 1, duration: 0.7, ease: "elastic.out(1, 0.6)" },
      "-=0.35"
    );

    // Boost des particules
    particlesRef.current.forEach(p => {
      p.speed *= 3.5;
      setTimeout(() => { p.speed /= 3.5; }, 900);
    });
  }, [modelUrl]);

  // ── Hover ────────────────────────────────────────────────────────────────
  function onMouseEnter() {
    const amb = ambientRef.current;
    if (amb) gsap.to(amb, { scale: 1.35, duration: 0.7, ease: "power2.out" });
    particlesRef.current.forEach(p => { p.speed *= 1.8; });
  }
  function onMouseLeave() {
    const amb = ambientRef.current;
    if (amb) gsap.to(amb, { scale: 1, duration: 0.8, ease: "power2.inOut" });
    particlesRef.current.forEach(p => { p.speed /= 1.8; });
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
    const rimLight = new THREE.DirectionalLight(0xf0ebe2, 0.8);
    rimLight.position.set(0, -2, -4);
    scene.add(rimLight);
    const glowLight = new THREE.PointLight(0xf0d8a0, 1.0, 6);
    glowLight.position.set(0, -1, 0.5);
    scene.add(glowLight);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping   = true;
    controls.dampingFactor   = 0.05;
    controls.enableZoom      = false;
    controls.enablePan       = false;
    controls.minPolarAngle   = Math.PI / 4;
    controls.maxPolarAngle   = Math.PI * 0.7;
    controls.autoRotate      = true;
    controls.autoRotateSpeed = 0.8;

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
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale  = 2.2 / maxDim;
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
    const onDown = () => { userInteracting = true;  controls.autoRotate = false; };
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
      <div
        ref={ambientRef}
        style={{
          position: "absolute", inset: "-20%",
          background: "radial-gradient(ellipse at 50% 55%, hsl(36,85%,58%,.18) 0%, hsl(28,70%,50%,.06) 50%, transparent 72%)",
          filter: "blur(36px)",
          pointerEvents: "none",
          opacity: 0, visibility: "hidden",
          zIndex: 0, borderRadius: "50%",
        }}
      />

      {/* Gold flash */}
      <div
        ref={flashRef}
        style={{
          position: "absolute", inset: 0, borderRadius: 16,
          background: "radial-gradient(ellipse at 50% 50%, hsl(45,100%,75%,.85) 0%, hsl(36,90%,58%,.4) 30%, transparent 60%)",
          filter: "blur(24px)",
          pointerEvents: "none",
          opacity: 0, visibility: "hidden",
          zIndex: 4,
        }}
      />

      {/* Three.js canvas */}
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block", cursor: "grab", position: "relative", zIndex: 1, borderRadius: 16 }}
      />

      {/* Particle overlay canvas */}
      <canvas
        ref={overlayRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 2, borderRadius: 16 }}
      />

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
