"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface HeroCanvasProps {
  modelUrl: string;
}

export function HeroCanvas({ modelUrl }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    setLoaded(false);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Scene + Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0.5, 4);

    // Lights — warm luxury
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

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI * 0.7;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;

    let model: THREE.Object3D | null = null;

    function showFallback() {
      const geo = new THREE.SphereGeometry(0.9, 64, 64);
      const mat = new THREE.MeshStandardMaterial({ color: 0x1a1c22, metalness: 0.6, roughness: 0.3 });
      const sphere = new THREE.Mesh(geo, mat);
      sphere.castShadow = true;
      scene.add(sphere);
      const ringGeo = new THREE.TorusGeometry(1.2, 0.01, 8, 80);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xf0ebe2, transparent: true, opacity: 0.15 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      scene.add(ring);
      model = sphere;
      setLoaded(true);
    }

    new GLTFLoader().load(
      modelUrl,
      (gltf) => {
        model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.2 / maxDim;
        model.scale.setScalar(scale);
        model.position.sub(center.multiplyScalar(scale));
        model.position.y -= size.y * scale * 0.15;
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            const m = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
            if (m) m.envMapIntensity = 1.4;
          }
        });
        scene.add(model);
        setLoaded(true);
      },
      undefined,
      () => showFallback()
    );

    // Resize
    function resize() {
      if (!wrap) return;
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // Interact
    let userInteracting = false;
    const onDown = () => { userInteracting = true; controls.autoRotate = false; };
    const onUp = () => { userInteracting = false; setTimeout(() => { controls.autoRotate = true; }, 2000); };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerup", onUp);

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
      canvas.removeEventListener("pointerup", onUp);
      renderer.dispose();
    };
  }, [modelUrl]);

  return (
    <div ref={wrapRef} style={{ position: "relative", width: "100%", height: "560px", borderRadius: 8, overflow: "hidden", background: "radial-gradient(ellipse at 50% 40%,hsl(36,28%,92%,.07) 0%,transparent 60%)" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block", cursor: "grab" }} />
      {!loaded && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, pointerEvents: "none" }}>
          <div style={{ width: 32, height: 32, border: "1px solid hsl(220,7%,16%)", borderTopColor: "hsl(36,28%,92%)", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".5625rem", letterSpacing: ".18em", textTransform: "uppercase", color: "hsl(220,5%,32%)" }}>טוען מודל</span>
        </div>
      )}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
