"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function Dish3DScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);

    /* ── Scene ── */
    const scene = new THREE.Scene();

    /* ── Camera ── */
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
    camera.position.set(0, 2.8, 5.5);
    camera.lookAt(0, 0, 0);

    /* ── Lights ── */
    // Ambient
    const ambient = new THREE.AmbientLight(0xfff4e0, 0.5);
    scene.add(ambient);

    // Key light — warm gold from top-left
    const keyLight = new THREE.DirectionalLight(0xffd580, 2.2);
    keyLight.position.set(-3, 6, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.setScalar(1024);
    scene.add(keyLight);

    // Rim light — cool blue from behind
    const rimLight = new THREE.DirectionalLight(0x8ab4ff, 0.8);
    rimLight.position.set(3, 2, -5);
    scene.add(rimLight);

    // Fill light — subtle from below
    const fillLight = new THREE.PointLight(0xffa040, 0.4, 12);
    fillLight.position.set(0, -2, 3);
    scene.add(fillLight);

    /* ── Materials ── */
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0xf5f0e8,
      roughness: 0.15,
      metalness: 0.05,
    });

    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xe8e0d0,
      roughness: 0.2,
      metalness: 0.08,
    });

    const sauceMat = new THREE.MeshStandardMaterial({
      color: 0xc8440a,
      roughness: 0.6,
      metalness: 0.0,
    });

    const pastaMat = new THREE.MeshStandardMaterial({
      color: 0xe8c87a,
      roughness: 0.85,
      metalness: 0.0,
    });

    const herbMat = new THREE.MeshStandardMaterial({
      color: 0x4a8c3f,
      roughness: 0.9,
      metalness: 0.0,
    });

    const parmesanMat = new THREE.MeshStandardMaterial({
      color: 0xf0e0a0,
      roughness: 0.7,
      metalness: 0.0,
    });

    /* ── Plate group ── */
    const group = new THREE.Group();
    scene.add(group);

    // Base plate — flat disk
    const baseGeo = new THREE.CylinderGeometry(1.9, 1.85, 0.12, 64);
    const base = new THREE.Mesh(baseGeo, plateMat);
    base.castShadow = true;
    base.receiveShadow = true;
    group.add(base);

    // Rim — torus around edge
    const rimGeo = new THREE.TorusGeometry(1.85, 0.09, 20, 80);
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0.06;
    group.add(rim);

    // Inner well — slightly recessed
    const wellGeo = new THREE.CylinderGeometry(1.5, 1.5, 0.04, 64);
    const well = new THREE.Mesh(wellGeo, plateMat);
    well.position.y = 0.02;
    group.add(well);

    // Sauce puddle — irregular ellipsoid flattened
    const sauceGeo = new THREE.SphereGeometry(1.1, 32, 16);
    const sauce = new THREE.Mesh(sauceGeo, sauceMat);
    sauce.scale.set(1, 0.06, 0.95);
    sauce.position.y = 0.07;
    group.add(sauce);

    // Pasta nest — several curved torus segments
    const rng = (min: number, max: number) => min + Math.random() * (max - min);
    for (let i = 0; i < 14; i++) {
      const r = rng(0.18, 0.55);
      const tube = rng(0.028, 0.05);
      const arc = rng(Math.PI * 0.6, Math.PI * 1.6);
      const geo = new THREE.TorusGeometry(r, tube, 8, 24, arc);
      const mesh = new THREE.Mesh(geo, pastaMat);
      mesh.rotation.x = Math.PI / 2 + rng(-0.3, 0.3);
      mesh.rotation.z = rng(0, Math.PI * 2);
      mesh.position.set(rng(-0.45, 0.45), 0.14 + rng(0, 0.18), rng(-0.45, 0.45));
      mesh.castShadow = true;
      group.add(mesh);
    }

    // Parmesan shavings
    for (let i = 0; i < 6; i++) {
      const geo = new THREE.BoxGeometry(rng(0.1, 0.22), 0.018, rng(0.06, 0.14));
      const mesh = new THREE.Mesh(geo, parmesanMat);
      const angle = rng(0, Math.PI * 2);
      const dist = rng(0.1, 0.7);
      mesh.position.set(
        Math.cos(angle) * dist,
        0.22 + rng(0, 0.12),
        Math.sin(angle) * dist
      );
      mesh.rotation.set(rng(-0.3, 0.3), rng(0, Math.PI * 2), rng(-0.2, 0.2));
      mesh.castShadow = true;
      group.add(mesh);
    }

    // Herb leaves (basil)
    for (let i = 0; i < 4; i++) {
      const geo = new THREE.SphereGeometry(0.1, 8, 6);
      const mesh = new THREE.Mesh(geo, herbMat);
      mesh.scale.set(rng(0.8, 1.3), 0.2, rng(0.6, 1.0));
      const angle = rng(0, Math.PI * 2);
      const dist = rng(0.2, 0.65);
      mesh.position.set(
        Math.cos(angle) * dist,
        0.24 + rng(0, 0.08),
        Math.sin(angle) * dist
      );
      mesh.rotation.y = rng(0, Math.PI * 2);
      mesh.castShadow = true;
      group.add(mesh);
    }

    // Slight tilt for a natural feel
    group.rotation.x = 0.18;

    /* ── Shadow catcher ── */
    const shadowGeo = new THREE.CircleGeometry(2.5, 48);
    const shadowMat = new THREE.MeshStandardMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.18,
      roughness: 1,
    });
    const shadowCatcher = new THREE.Mesh(shadowGeo, shadowMat);
    shadowCatcher.rotation.x = -Math.PI / 2;
    shadowCatcher.position.y = -0.08;
    shadowCatcher.receiveShadow = true;
    scene.add(shadowCatcher);

    /* ── Mouse drag ── */
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let velX = 0;
    let velY = 0;
    let rotY = 0;
    let rotX = 0.18;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      velX = 0;
      velY = 0;
      mount.style.cursor = "grabbing";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      velX = dx * 0.012;
      velY = dy * 0.006;
      rotY += velX;
      rotX = Math.max(-0.2, Math.min(0.55, rotX + velY));
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
      mount.style.cursor = "grab";
    };

    // Touch support
    const onTouchStart = (e: TouchEvent) => {
      isDragging = true;
      prevX = e.touches[0].clientX;
      prevY = e.touches[0].clientY;
      velX = 0;
      velY = 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const dx = e.touches[0].clientX - prevX;
      const dy = e.touches[0].clientY - prevY;
      velX = dx * 0.012;
      velY = dy * 0.006;
      rotY += velX;
      rotX = Math.max(-0.2, Math.min(0.55, rotX + velY));
      prevX = e.touches[0].clientX;
      prevY = e.touches[0].clientY;
    };

    const onTouchEnd = () => { isDragging = false; };

    mount.style.cursor = "grab";
    mount.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    mount.addEventListener("touchstart", onTouchStart);
    mount.addEventListener("touchmove", onTouchMove);
    mount.addEventListener("touchend", onTouchEnd);

    /* ── Resize ── */
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    /* ── Animation loop ── */
    let raf: number;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (!isDragging) {
        // Inertia
        velX *= 0.92;
        velY *= 0.92;
        rotY += velX;
        rotX += velY;
        rotX = Math.max(-0.2, Math.min(0.55, rotX));
        // Auto slow rotate when idle
        if (Math.abs(velX) < 0.001) rotY += 0.003;
      }

      group.rotation.y = rotY;
      group.rotation.x = rotX;

      // Subtle float
      group.position.y = Math.sin(t * 0.7) * 0.04;

      renderer.render(scene, camera);
    };
    animate();

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(raf);
      mount.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      mount.removeEventListener("touchstart", onTouchStart);
      mount.removeEventListener("touchmove", onTouchMove);
      mount.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        inset: 0,
      }}
    />
  );
}
