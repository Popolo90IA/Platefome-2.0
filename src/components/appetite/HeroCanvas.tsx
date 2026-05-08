"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";

interface HeroCanvasProps {
  modelUrl: string;
}

export function HeroCanvas({ modelUrl }: HeroCanvasProps) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const wrapRef     = useRef<HTMLDivElement>(null);
  const flashRef    = useRef<HTMLDivElement>(null);
  const ringRef     = useRef<HTMLDivElement>(null);
  const ambientRef  = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  // ── GSAP intro ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!loaded) return;
    // rAF garantit que React a fini le rendu et les refs sont attachés
    const raf = requestAnimationFrame(() => {
      const wrap  = wrapRef.current;
      const flash = flashRef.current;
      const ring  = ringRef.current;
      const amb   = ambientRef.current;
      if (!wrap) return;

      const tl = gsap.timeline();

      // 1. Slide up + dézoom + blur → reveal
      tl.fromTo(wrap,
        { y: 60, autoAlpha: 0, scale: 0.88, filter: "blur(14px)" },
        { y: 0,  autoAlpha: 1, scale: 1,    filter: "blur(0px)", duration: 1.2, ease: "power3.out" },
        0
      );

      // 2. Grand flash doré central
      if (flash) {
        tl.fromTo(flash,
          { autoAlpha: 0, scale: 0.5 },
          { autoAlpha: 1, scale: 1.3, duration: 0.3, ease: "power2.out" },
          0.4
        ).to(flash, { autoAlpha: 0, scale: 2, duration: 0.7, ease: "power2.in" }, 0.7);
      }

      // 3. Ring qui apparaît en tournant
      if (ring) {
        tl.fromTo(ring,
          { autoAlpha: 0, scale: 0.6, rotation: -45 },
          { autoAlpha: 1, scale: 1,   rotation: 0, duration: 0.9, ease: "back.out(1.6)" },
          0.5
        );
        // Loop de rotation permanente
        gsap.to(ring, { rotation: 360, duration: 12, ease: "none", repeat: -1 });
      }

      // 4. Ambient glow permanent
      if (amb) {
        tl.to(amb, { autoAlpha: 1, duration: 1.2, ease: "power2.out" }, 0.6);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [loaded]);

  // ── GSAP switch modèle ───────────────────────────────────────────────────
  const prevUrl = useRef<string | null>(null);

  useEffect(() => {
    if (prevUrl.current === null) { prevUrl.current = modelUrl; return; }
    if (prevUrl.current === modelUrl) return;
    prevUrl.current = modelUrl;

    const wrap  = wrapRef.current;
    const flash = flashRef.current;
    const ring  = ringRef.current;
    if (!wrap) return;

    const tl = gsap.timeline();

    // Spin out + scale down
    tl.to(wrap, { rotationY: 90, scale: 0.85, filter: "blur(12px)", autoAlpha: 0.3, duration: 0.4, ease: "power2.in" });

    // Flash explosion
    if (flash) {
      tl.to(flash, { autoAlpha: 1, scale: 1.4, duration: 0.2, ease: "power2.out" }, "-=0.05")
        .to(flash, { autoAlpha: 0, scale: 2.2, duration: 0.5, ease: "power2.in" });
    }

    // Ring pulse
    if (ring) {
      tl.to(ring, { scale: 1.4, autoAlpha: 0.3, duration: 0.2, ease: "power2.out" }, "<")
        .to(ring, { scale: 1,   autoAlpha: 1,   duration: 0.5, ease: "back.out(2)" });
    }

    // Spin in + scale back
    tl.fromTo(wrap,
      { rotationY: -90, scale: 0.85, filter: "blur(12px)", autoAlpha: 0.3 },
      { rotationY: 0,   scale: 1,    filter: "blur(0px)",  autoAlpha: 1, duration: 0.55, ease: "back.out(1.4)" },
      "-=0.3"
    );
  }, [modelUrl]);

  // ── Hover ────────────────────────────────────────────────────────────────
  function onMouseEnter() {
    const amb = ambientRef.current;
    const ring = ringRef.current;
    if (amb)  gsap.to(amb,  { scale: 1.3, duration: 0.6, ease: "power2.out" });
    if (ring) gsap.to(ring, { scale: 1.08, borderColor: "hsl(38,90%,62%,.9)", boxShadow: "0 0 30px hsl(38,80%,58%,.5)", duration: 0.5, ease: "power2.out" });
  }
  function onMouseLeave() {
    const amb = ambientRef.current;
    const ring = ringRef.current;
    if (amb)  gsap.to(amb,  { scale: 1,    duration: 0.7, ease: "power2.inOut" });
    if (ring) gsap.to(ring, { scale: 1,    borderColor: "hsl(38,80%,58%,.35)", boxShadow: "0 0 16px hsl(38,80%,58%,.2)", duration: 0.6, ease: "power2.inOut" });
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
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.2, 0.01, 8, 80),
        new THREE.MeshBasicMaterial({ color: 0xf0ebe2, transparent: true, opacity: 0.15 })
      );
      ring.rotation.x = Math.PI / 2;
      scene.add(ring);
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
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
    >
      {/* Ambient glow permanent sous le canvas */}
      <div
        ref={ambientRef}
        style={{
          position: "absolute",
          inset: "-18%",
          background: "radial-gradient(ellipse at 50% 55%, hsl(36,85%,58%,.22) 0%, hsl(28,70%,50%,.08) 45%, transparent 70%)",
          filter: "blur(32px)",
          pointerEvents: "none",
          opacity: 0, visibility: "hidden",
          zIndex: 0,
          borderRadius: "50%",
        }}
      />

      {/* Ring doré animé */}
      <div
        ref={ringRef}
        style={{
          position: "absolute",
          inset: -3,
          borderRadius: 18,
          border: "1.5px solid hsl(38,80%,58%,.35)",
          boxShadow: "0 0 16px hsl(38,80%,58%,.2), inset 0 0 20px hsl(38,60%,50%,.04)",
          pointerEvents: "none",
          opacity: 0, visibility: "hidden",
          zIndex: 5,
          background: "transparent",
        }}
      />

      {/* Gold flash burst */}
      <div
        ref={flashRef}
        style={{
          position: "absolute", inset: 0,
          borderRadius: 16,
          background: "radial-gradient(ellipse at 50% 50%, hsl(38,95%,65%,.7) 0%, hsl(36,80%,55%,.3) 35%, transparent 65%)",
          filter: "blur(28px)",
          pointerEvents: "none",
          opacity: 0, visibility: "hidden",
          zIndex: 4,
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          width: "100%", height: "100%", display: "block",
          cursor: "grab", position: "relative", zIndex: 1,
          borderRadius: 16,
        }}
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
