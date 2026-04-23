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

    /* ─── Renderer ─── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    mount.appendChild(renderer.domElement);

    /* ─── Scene ─── */
    const scene = new THREE.Scene();

    /* ─── Camera ─── */
    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
    camera.position.set(0, 3.4, 5.8);
    camera.lookAt(0, 0.1, 0);

    /* ─── Procedural textures via canvas ─── */
    function makeCanvasTex(
      size: number,
      draw: (ctx: CanvasRenderingContext2D) => void
    ): THREE.CanvasTexture {
      const c = document.createElement("canvas");
      c.width = c.height = size;
      const ctx = c.getContext("2d")!;
      draw(ctx);
      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      return tex;
    }

    /* Plate surface — fine porcelain with subtle grain */
    const plateDiffuse = makeCanvasTex(512, (ctx) => {
      // Base cream-white
      const bg = ctx.createRadialGradient(256, 256, 0, 256, 256, 320);
      bg.addColorStop(0, "#faf6f0");
      bg.addColorStop(0.6, "#f5f0e8");
      bg.addColorStop(1, "#ede6db");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, 512, 512);
      // Micro grain noise
      for (let i = 0; i < 8000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const a = Math.random() * 0.06;
        ctx.fillStyle = `rgba(${180 + Math.random() * 40},${160 + Math.random() * 30},${140 + Math.random() * 20},${a})`;
        ctx.fillRect(x, y, 1, 1);
      }
    });
    plateDiffuse.repeat.set(1, 1);

    /* Sauce texture — rich tomato with organic variation */
    const sauceDiffuse = makeCanvasTex(512, (ctx) => {
      const bg = ctx.createRadialGradient(256, 256, 0, 256, 256, 280);
      bg.addColorStop(0, "#c43a0a");
      bg.addColorStop(0.35, "#b83208");
      bg.addColorStop(0.7, "#a02606");
      bg.addColorStop(1, "#8a1e04");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, 512, 512);
      // Organic sauce variation
      for (let i = 0; i < 60; i++) {
        const x = 100 + Math.random() * 312;
        const y = 100 + Math.random() * 312;
        const r = 8 + Math.random() * 30;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, "rgba(200,60,10,0.4)");
        g.addColorStop(1, "rgba(140,20,4,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      // Oil sheen spots
      for (let i = 0; i < 12; i++) {
        const x = 140 + Math.random() * 240;
        const y = 140 + Math.random() * 240;
        const r = 4 + Math.random() * 14;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, "rgba(255,120,40,0.35)");
        g.addColorStop(1, "rgba(255,100,30,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    /* Pasta texture — egg pasta golden color with surface variation */
    const pastaDiffuse = makeCanvasTex(256, (ctx) => {
      ctx.fillStyle = "#d4a84b";
      ctx.fillRect(0, 0, 256, 256);
      // Longitudinal lines (pasta ridges)
      for (let i = 0; i < 256; i += 3) {
        const lum = 0.85 + Math.random() * 0.3;
        ctx.strokeStyle = `rgba(${Math.floor(180 * lum)},${Math.floor(140 * lum)},${Math.floor(50 * lum)},0.5)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + Math.random() * 4 - 2, 256);
        ctx.stroke();
      }
      // Surface noise
      for (let i = 0; i < 3000; i++) {
        const x = Math.random() * 256;
        const y = Math.random() * 256;
        ctx.fillStyle = `rgba(${100 + Math.random() * 80},${70 + Math.random() * 50},${10 + Math.random() * 20},${0.08 + Math.random() * 0.1})`;
        ctx.fillRect(x, y, 1, 1);
      }
    });
    pastaDiffuse.repeat.set(2, 2);

    /* ─── Lights ─── */
    // Warm key — overhead slightly front-left (restaurant candle feel)
    const key = new THREE.DirectionalLight(0xfff0d0, 3.0);
    key.position.set(-2.5, 7, 5);
    key.castShadow = true;
    key.shadow.mapSize.setScalar(2048);
    key.shadow.camera.near = 0.5;
    key.shadow.camera.far = 20;
    key.shadow.camera.left = -4;
    key.shadow.camera.right = 4;
    key.shadow.camera.top = 4;
    key.shadow.camera.bottom = -4;
    key.shadow.bias = -0.0005;
    scene.add(key);

    // Warm fill — opposite side, softer
    const fill = new THREE.DirectionalLight(0xffe8b0, 0.9);
    fill.position.set(3, 3, 4);
    scene.add(fill);

    // Cool rim — behind, creates separation
    const rim = new THREE.DirectionalLight(0xb0d0ff, 1.1);
    rim.position.set(1, 2, -6);
    scene.add(rim);

    // Ambient — very warm, low
    const ambient = new THREE.AmbientLight(0xffeedd, 0.45);
    scene.add(ambient);

    // Bounce light from table below
    const bounce = new THREE.PointLight(0xffcc88, 0.6, 8);
    bounce.position.set(0, -1.5, 1.5);
    scene.add(bounce);

    /* ─── PLATE ─── */
    const plateGroup = new THREE.Group();
    scene.add(plateGroup);

    // Plate base — lathe geometry for a real plate profile
    const platePoints: THREE.Vector2[] = [];
    // Profile from center outward: flat bottom, gently curved well, raised rim
    for (let i = 0; i <= 40; i++) {
      const t = i / 40;
      const r = t * 2.1;
      let y = 0;
      if (t < 0.05) y = -0.05;
      else if (t < 0.65) y = -0.05 + Math.pow((t - 0.05) / 0.6, 2) * 0.04;
      else if (t < 0.82) y = -0.01 + (t - 0.65) / 0.17 * 0.18;
      else y = 0.18 - (t - 0.82) / 0.18 * 0.06;
      platePoints.push(new THREE.Vector2(r, y));
    }
    const plateGeo = new THREE.LatheGeometry(platePoints, 80);
    const plateMat = new THREE.MeshStandardMaterial({
      map: plateDiffuse,
      roughness: 0.08,
      metalness: 0.02,
      envMapIntensity: 0.8,
    });
    const plate = new THREE.Mesh(plateGeo, plateMat);
    plate.castShadow = true;
    plate.receiveShadow = true;
    plateGroup.add(plate);

    // Plate underside / foot ring
    const footGeo = new THREE.TorusGeometry(0.55, 0.045, 12, 60);
    const foot = new THREE.Mesh(footGeo, plateMat);
    foot.rotation.x = Math.PI / 2;
    foot.position.y = -0.06;
    plateGroup.add(foot);

    /* ─── SAUCE POOL ─── */
    // Organic ellipse — use lathe with slight distortion
    const saucePoints: THREE.Vector2[] = [];
    for (let i = 0; i <= 30; i++) {
      const t = i / 30;
      const r = t * 1.32;
      const y = 0.005 + Math.pow(1 - t, 3) * 0.035;
      saucePoints.push(new THREE.Vector2(r, y));
    }
    const sauceGeo = new THREE.LatheGeometry(saucePoints, 64);
    // Displace vertices slightly for organic look
    const saucePosAttr = sauceGeo.attributes.position;
    for (let i = 0; i < saucePosAttr.count; i++) {
      const x = saucePosAttr.getX(i);
      const z = saucePosAttr.getZ(i);
      const angle = Math.atan2(z, x);
      const noise = 1 + Math.sin(angle * 7) * 0.04 + Math.sin(angle * 13) * 0.025;
      saucePosAttr.setX(i, x * noise);
      saucePosAttr.setZ(i, z * noise);
    }
    sauceGeo.computeVertexNormals();
    const sauceMat = new THREE.MeshStandardMaterial({
      map: sauceDiffuse,
      roughness: 0.55,
      metalness: 0.0,
      envMapIntensity: 0.3,
    });
    const sauce = new THREE.Mesh(sauceGeo, sauceMat);
    sauce.position.y = 0.03;
    sauce.castShadow = true;
    sauce.receiveShadow = true;
    plateGroup.add(sauce);

    /* ─── PASTA NEST ─── */
    const pastaGroup = new THREE.Group();
    pastaGroup.position.y = 0.06;
    plateGroup.add(pastaGroup);

    const pastaMat = new THREE.MeshStandardMaterial({
      map: pastaDiffuse,
      roughness: 0.75,
      metalness: 0.0,
    });

    // Thick tagliatelle — wide flat noodles using lathe tubes
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    for (let strand = 0; strand < 22; strand++) {
      const segments = 18;
      const radius = rand(0.22, 0.72);
      const arcLen = rand(Math.PI * 0.55, Math.PI * 1.85);
      const startAngle = rand(0, Math.PI * 2);
      const tubeR = rand(0.026, 0.046);
      const lift = rand(0, 0.22);
      const tiltX = rand(-0.5, 0.5);
      const tiltZ = rand(-0.5, 0.5);

      const curve = new THREE.CatmullRomCurve3(
        Array.from({ length: segments }, (_, i) => {
          const t = i / (segments - 1);
          const angle = startAngle + t * arcLen;
          const r = radius * (1 + Math.sin(t * Math.PI) * 0.12);
          const x = Math.cos(angle) * r;
          const z = Math.sin(angle) * r;
          const y = lift + Math.sin(t * Math.PI) * rand(0.04, 0.14) + Math.sin(t * Math.PI * 3) * 0.02;
          return new THREE.Vector3(x, y, z);
        })
      );

      const tubeGeo = new THREE.TubeGeometry(curve, 28, tubeR, 6, false);
      // Flatten slightly (tagliatelle are wide, flat)
      const pos = tubeGeo.attributes.position;
      for (let vi = 0; vi < pos.count; vi++) {
        pos.setY(vi, pos.getY(vi) * 0.45);
      }
      tubeGeo.computeVertexNormals();

      const mesh = new THREE.Mesh(tubeGeo, pastaMat);
      mesh.rotation.x = tiltX * 0.15;
      mesh.rotation.z = tiltZ * 0.15;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      pastaGroup.add(mesh);
    }

    /* ─── CHERRY TOMATOES ─── */
    const tomatoMat = new THREE.MeshStandardMaterial({
      color: 0xd42a0a,
      roughness: 0.25,
      metalness: 0.0,
      envMapIntensity: 1.2,
    });
    const tomatoHighlight = new THREE.MeshStandardMaterial({
      color: 0xff6040,
      roughness: 0.15,
      metalness: 0.0,
    });

    for (let i = 0; i < 3; i++) {
      const angle = rand(0, Math.PI * 2);
      const dist = rand(0.25, 0.8);
      const tGeo = new THREE.SphereGeometry(0.12 + rand(0, 0.04), 24, 18);
      const tomato = new THREE.Mesh(tGeo, tomatoMat);
      tomato.position.set(
        Math.cos(angle) * dist,
        0.13 + rand(0, 0.08),
        Math.sin(angle) * dist
      );
      // Slight squish
      tomato.scale.y = 0.88;
      tomato.castShadow = true;
      pastaGroup.add(tomato);

      // Specular highlight spot on tomato
      const hlGeo = new THREE.SphereGeometry(0.045, 8, 8);
      const hl = new THREE.Mesh(hlGeo, tomatoHighlight);
      hl.position.copy(tomato.position);
      hl.position.y += 0.08;
      hl.position.x += 0.06;
      pastaGroup.add(hl);
    }

    /* ─── BASIL LEAVES ─── */
    const basilMat = new THREE.MeshStandardMaterial({
      color: 0x2d7a2a,
      roughness: 0.85,
      metalness: 0.0,
      side: THREE.DoubleSide,
    });
    const basilShine = new THREE.MeshStandardMaterial({
      color: 0x4aaa40,
      roughness: 0.5,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });

    for (let i = 0; i < 4; i++) {
      const angle = rand(0, Math.PI * 2);
      const dist = rand(0.15, 0.75);
      // Leaf shape — custom geometry
      const shape = new THREE.Shape();
      const lw = rand(0.12, 0.18);
      const ll = rand(0.2, 0.28);
      shape.moveTo(0, 0);
      shape.bezierCurveTo(-lw, ll * 0.3, -lw * 1.1, ll * 0.65, 0, ll);
      shape.bezierCurveTo(lw * 1.1, ll * 0.65, lw, ll * 0.3, 0, 0);
      const leafGeo = new THREE.ShapeGeometry(shape, 12);
      const leaf = new THREE.Mesh(leafGeo, i % 2 === 0 ? basilMat : basilShine);
      leaf.position.set(
        Math.cos(angle) * dist,
        0.18 + rand(0, 0.1),
        Math.sin(angle) * dist
      );
      leaf.rotation.x = -Math.PI / 2 + rand(-0.3, 0.3);
      leaf.rotation.z = rand(0, Math.PI * 2);
      leaf.castShadow = true;
      pastaGroup.add(leaf);
    }

    /* ─── PARMESAN SHAVINGS ─── */
    const parmMat = new THREE.MeshStandardMaterial({
      color: 0xf0d878,
      roughness: 0.65,
      metalness: 0.0,
    });
    for (let i = 0; i < 7; i++) {
      const angle = rand(0, Math.PI * 2);
      const dist = rand(0.1, 0.82);
      const w = rand(0.07, 0.18);
      const l = rand(0.12, 0.26);
      const geo = new THREE.BoxGeometry(w, 0.012, l);
      // Slightly bend the shaving
      const posAttr = geo.attributes.position;
      for (let vi = 0; vi < posAttr.count; vi++) {
        const pz = posAttr.getZ(vi);
        posAttr.setY(vi, posAttr.getY(vi) + Math.abs(pz / l) * rand(0.01, 0.04));
      }
      geo.computeVertexNormals();
      const shaving = new THREE.Mesh(geo, parmMat);
      shaving.position.set(
        Math.cos(angle) * dist,
        0.24 + rand(0, 0.14),
        Math.sin(angle) * dist
      );
      shaving.rotation.set(rand(-0.4, 0.4), rand(0, Math.PI * 2), rand(-0.3, 0.3));
      shaving.castShadow = true;
      pastaGroup.add(shaving);
    }

    /* ─── OLIVE OIL DRIZZLE ─── */
    const oilMat = new THREE.MeshStandardMaterial({
      color: 0xd4a820,
      roughness: 0.1,
      metalness: 0.0,
      transparent: true,
      opacity: 0.75,
    });
    for (let i = 0; i < 3; i++) {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(rand(-0.6, 0.6), 0.22, rand(-0.6, 0.6)),
        new THREE.Vector3(rand(-0.6, 0.6), 0.2, rand(-0.6, 0.6)),
        new THREE.Vector3(rand(-0.6, 0.6), 0.19, rand(-0.6, 0.6)),
      ]);
      const oilGeo = new THREE.TubeGeometry(curve, 10, 0.012, 5, false);
      const oil = new THREE.Mesh(oilGeo, oilMat);
      pastaGroup.add(oil);
    }

    /* ─── TABLE SURFACE ─── */
    const tableTex = makeCanvasTex(512, (ctx) => {
      ctx.fillStyle = "#1a1210";
      ctx.fillRect(0, 0, 512, 512);
      // Wood-like grain
      for (let i = 0; i < 512; i += rand(2, 5)) {
        const lum = 0.7 + Math.random() * 0.4;
        ctx.strokeStyle = `rgba(${Math.floor(40 * lum)},${Math.floor(25 * lum)},${Math.floor(15 * lum)},0.6)`;
        ctx.lineWidth = rand(0.5, 2);
        ctx.beginPath();
        ctx.moveTo(0, i + rand(-1, 1));
        ctx.lineTo(512, i + rand(-1, 1));
        ctx.stroke();
      }
      // Subtle vignette
      const vig = ctx.createRadialGradient(256, 256, 100, 256, 256, 360);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.6)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, 512, 512);
    });
    tableTex.repeat.set(3, 3);

    const tableGeo = new THREE.PlaneGeometry(14, 14, 1, 1);
    const tableMat = new THREE.MeshStandardMaterial({
      map: tableTex,
      roughness: 0.6,
      metalness: 0.08,
    });
    const table = new THREE.Mesh(tableGeo, tableMat);
    table.rotation.x = -Math.PI / 2;
    table.position.y = -0.12;
    table.receiveShadow = true;
    scene.add(table);

    /* ─── PLATE SHADOW (contact) ─── */
    const shadowTex = makeCanvasTex(256, (ctx) => {
      const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      g.addColorStop(0, "rgba(0,0,0,0.55)");
      g.addColorStop(0.5, "rgba(0,0,0,0.2)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 256, 256);
    });
    const shadowGeo = new THREE.CircleGeometry(2.4, 48);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -0.11;
    scene.add(shadow);

    /* ─── ENVIRONMENT (fake IBL via gradient sphere) ─── */
    const envGeo = new THREE.SphereGeometry(30, 32, 16);
    const envMat = new THREE.MeshBasicMaterial({
      side: THREE.BackSide,
      color: 0x0a0806,
    });
    scene.add(new THREE.Mesh(envGeo, envMat));

    /* ─── Mouse / touch rotation ─── */
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let velX = 0.004; // start with gentle auto-rotate
    let velY = 0;
    let rotY = 0;
    let rotX = 0.22;
    let autoRotate = true;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      autoRotate = false;
      prevX = e.clientX;
      prevY = e.clientY;
      velX = 0; velY = 0;
      mount.style.cursor = "grabbing";
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      velX = dx * 0.011;
      velY = dy * 0.006;
      rotY += velX;
      rotX = Math.max(-0.15, Math.min(0.6, rotX + velY));
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onMouseUp = () => {
      isDragging = false;
      mount.style.cursor = "grab";
    };

    const onTouchStart = (e: TouchEvent) => {
      isDragging = true;
      autoRotate = false;
      prevX = e.touches[0].clientX;
      prevY = e.touches[0].clientY;
      velX = 0; velY = 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const dx = e.touches[0].clientX - prevX;
      const dy = e.touches[0].clientY - prevY;
      velX = dx * 0.011;
      velY = dy * 0.006;
      rotY += velX;
      rotX = Math.max(-0.15, Math.min(0.6, rotX + velY));
      prevX = e.touches[0].clientX;
      prevY = e.touches[0].clientY;
    };
    const onTouchEnd = () => { isDragging = false; };

    mount.style.cursor = "grab";
    mount.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    mount.addEventListener("touchstart", onTouchStart, { passive: true });
    mount.addEventListener("touchmove", onTouchMove, { passive: true });
    mount.addEventListener("touchend", onTouchEnd);

    /* ─── Resize ─── */
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    /* ─── Animation ─── */
    let raf: number;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (!isDragging) {
        velX *= 0.93;
        velY *= 0.93;
        if (autoRotate || Math.abs(velX) < 0.0005) {
          velX = 0.004; // slow auto rotate
        }
        rotY += velX;
        rotX += velY;
        rotX = Math.max(-0.15, Math.min(0.6, rotX));
      }

      plateGroup.rotation.y = rotY;
      plateGroup.rotation.x = rotX;
      // Gentle float
      plateGroup.position.y = Math.sin(t * 0.55) * 0.025;

      // Subtle key light flicker (candlelight)
      key.intensity = 3.0 + Math.sin(t * 4.3) * 0.08 + Math.sin(t * 7.1) * 0.04;

      renderer.render(scene, camera);
    };
    animate();

    /* ─── Cleanup ─── */
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
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
    />
  );
}
