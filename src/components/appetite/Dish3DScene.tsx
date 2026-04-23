"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function Dish3DScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth || 600;
    const H = mount.clientHeight || 600;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.setClearColor(0x000000, 0); // transparent bg
    mount.appendChild(renderer.domElement);

    /* ── Scene + Camera ── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, W / H, 0.1, 100);
    camera.position.set(0, 4.2, 6.0);
    camera.lookAt(0, 0.2, 0);

    /* ── Procedural canvas textures ── */
    const tex = (size: number, fn: (c: CanvasRenderingContext2D, s: number) => void) => {
      const cv = document.createElement("canvas");
      cv.width = cv.height = size;
      fn(cv.getContext("2d")!, size);
      const t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      return t;
    };
    const rn = (a: number, b: number) => a + Math.random() * (b - a);

    // Porcelain plate — cream white with gloss
    const plateTex = tex(512, (c, s) => {
      const g = c.createRadialGradient(s/2, s/2, 0, s/2, s/2, s * 0.65);
      g.addColorStop(0, "#faf7f2");
      g.addColorStop(0.5, "#f4efe6");
      g.addColorStop(1, "#ece4d8");
      c.fillStyle = g; c.fillRect(0, 0, s, s);
      for (let i = 0; i < 6000; i++) {
        c.fillStyle = `rgba(${160+rn(0,60)|0},${140+rn(0,40)|0},${120+rn(0,30)|0},${rn(0,.04)})`;
        c.fillRect(rn(0,s), rn(0,s), 1, 1);
      }
    });

    // Tomato sauce — deep red, glossy, organic
    const sauceTex = tex(512, (c, s) => {
      const g = c.createRadialGradient(s*0.45, s*0.45, 0, s/2, s/2, s*0.55);
      g.addColorStop(0, "#c8380a");
      g.addColorStop(0.4, "#b02808");
      g.addColorStop(0.75, "#8e1e05");
      g.addColorStop(1, "#701504");
      c.fillStyle = g; c.fillRect(0, 0, s, s);
      for (let i = 0; i < 50; i++) {
        const x = rn(80,420), y = rn(80,420), r = rn(10,35);
        const sg = c.createRadialGradient(x,y,0,x,y,r);
        sg.addColorStop(0, `rgba(${180+rn(0,40)|0},${50+rn(0,30)|0},10,0.35)`);
        sg.addColorStop(1, "rgba(0,0,0,0)");
        c.fillStyle = sg; c.beginPath(); c.arc(x,y,r,0,Math.PI*2); c.fill();
      }
      // Oil reflections
      for (let i = 0; i < 8; i++) {
        const x = rn(120,390), y = rn(120,390), r = rn(5,18);
        const og = c.createRadialGradient(x,y,0,x,y,r);
        og.addColorStop(0,"rgba(255,140,60,0.4)"); og.addColorStop(1,"rgba(0,0,0,0)");
        c.fillStyle = og; c.beginPath(); c.arc(x,y,r,0,Math.PI*2); c.fill();
      }
    });

    // Pasta — golden egg noodle
    const pastaTex = tex(256, (c, s) => {
      c.fillStyle = "#c89a3a"; c.fillRect(0,0,s,s);
      for (let i = 0; i < s; i += 2.5) {
        const l = 0.75 + rn(0, 0.5);
        c.strokeStyle = `rgba(${(160*l)|0},${(120*l)|0},${(40*l)|0},0.55)`;
        c.lineWidth = rn(0.5, 1.5);
        c.beginPath(); c.moveTo(i, 0); c.lineTo(i+rn(-3,3), s); c.stroke();
      }
      for (let i = 0; i < 4000; i++) {
        c.fillStyle = `rgba(${60+rn(0,80)|0},${40+rn(0,50)|0},${rn(0,20)|0},${rn(.05,.14)})`;
        c.fillRect(rn(0,s), rn(0,s), 1, 1);
      }
    });
    pastaTex.repeat.set(2, 2);

    /* ── Lights ── */
    // Main warm key — top left, restaurant overhead
    const keyLight = new THREE.SpotLight(0xfff3d0, 5.0, 18, Math.PI / 5, 0.4, 1.5);
    keyLight.position.set(-2, 9, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.setScalar(2048);
    keyLight.shadow.bias = -0.001;
    keyLight.shadow.camera.near = 2;
    keyLight.shadow.camera.far = 18;
    scene.add(keyLight);
    scene.add(keyLight.target);
    keyLight.target.position.set(0, 0, 0);

    // Warm fill — right side
    const fillLight = new THREE.DirectionalLight(0xffd890, 1.2);
    fillLight.position.set(4, 3, 3);
    scene.add(fillLight);

    // Cool blue rim — back
    const rimLight = new THREE.DirectionalLight(0x90b8ff, 1.4);
    rimLight.position.set(0.5, 1.5, -7);
    scene.add(rimLight);

    // Warm ambient
    scene.add(new THREE.AmbientLight(0xffe8cc, 0.35));

    // Under-bounce (warm table reflection)
    const bounceLight = new THREE.PointLight(0xffaa55, 0.5, 6);
    bounceLight.position.set(0, -1, 1.5);
    scene.add(bounceLight);

    /* ── PLATE (lathe profile — real porcelain shape) ── */
    const group = new THREE.Group();
    scene.add(group);

    const profilePts: THREE.Vector2[] = [];
    const N = 50;
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const r = t * 2.05;
      let y: number;
      if      (t < 0.04) y = -0.055;
      else if (t < 0.60) y = -0.055 + Math.pow((t-0.04)/0.56, 1.8) * 0.035;
      else if (t < 0.80) y = -0.02  + ((t-0.60)/0.20) * 0.20;
      else               y =  0.20  - ((t-0.80)/0.20) * 0.07;
      profilePts.push(new THREE.Vector2(r, y));
    }
    const plateGeo = new THREE.LatheGeometry(profilePts, 96);
    const plateMat = new THREE.MeshStandardMaterial({
      map: plateTex, roughness: 0.06, metalness: 0.01, envMapIntensity: 1.0,
    });
    const plateMesh = new THREE.Mesh(plateGeo, plateMat);
    plateMesh.castShadow = true; plateMesh.receiveShadow = true;
    group.add(plateMesh);

    // Foot ring
    const footMesh = new THREE.Mesh(
      new THREE.TorusGeometry(0.52, 0.04, 14, 72),
      plateMat
    );
    footMesh.rotation.x = Math.PI / 2;
    footMesh.position.y = -0.062;
    group.add(footMesh);

    /* ── SAUCE POOL ── */
    const saucePts: THREE.Vector2[] = [];
    for (let i = 0; i <= 36; i++) {
      const t = i / 36;
      saucePts.push(new THREE.Vector2(t * 1.28, 0.005 + Math.pow(1-t, 2.5) * 0.04));
    }
    const sauceGeo = new THREE.LatheGeometry(saucePts, 72);
    // Organic edge distortion
    const sp = sauceGeo.attributes.position;
    for (let i = 0; i < sp.count; i++) {
      const x = sp.getX(i), z = sp.getZ(i);
      const a = Math.atan2(z, x);
      const n = 1 + Math.sin(a*9)*0.035 + Math.sin(a*17)*0.018;
      sp.setX(i, x*n); sp.setZ(i, z*n);
    }
    sauceGeo.computeVertexNormals();
    const sauceMesh = new THREE.Mesh(sauceGeo, new THREE.MeshStandardMaterial({
      map: sauceTex, roughness: 0.45, metalness: 0, envMapIntensity: 0.5,
    }));
    sauceMesh.position.y = 0.028;
    sauceMesh.receiveShadow = true; sauceMesh.castShadow = true;
    group.add(sauceMesh);

    /* ── PASTA NEST (tagliatelle) ── */
    const pastaGroup = new THREE.Group();
    pastaGroup.position.y = 0.055;
    group.add(pastaGroup);

    const pastaMat = new THREE.MeshStandardMaterial({ map: pastaTex, roughness: 0.8, metalness: 0 });
    for (let s = 0; s < 26; s++) {
      const radius = rn(0.18, 0.78);
      const arc    = rn(Math.PI * 0.5, Math.PI * 1.9);
      const start  = rn(0, Math.PI * 2);
      const lift   = rn(0, 0.26);
      const pts    = Array.from({ length: 20 }, (_, i) => {
        const t   = i / 19;
        const ang = start + t * arc;
        const r   = radius * (1 + Math.sin(t * Math.PI) * 0.1);
        return new THREE.Vector3(
          Math.cos(ang) * r,
          lift + Math.sin(t * Math.PI) * rn(0.04, 0.16),
          Math.sin(ang) * r
        );
      });
      const tubeGeo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 32, rn(0.025,0.048), 7, false);
      // Flatten to tagliatelle shape
      const tp = tubeGeo.attributes.position;
      for (let vi = 0; vi < tp.count; vi++) tp.setY(vi, tp.getY(vi) * 0.42);
      tubeGeo.computeVertexNormals();
      const m = new THREE.Mesh(tubeGeo, pastaMat);
      m.castShadow = true; m.receiveShadow = true;
      pastaGroup.add(m);
    }

    /* ── CHERRY TOMATOES ── */
    const tomatoMat = new THREE.MeshStandardMaterial({ color: 0xcc2a08, roughness: 0.2, metalness: 0 });
    const tomatoGlossMat = new THREE.MeshStandardMaterial({ color: 0xff5535, roughness: 0.05, metalness: 0 });
    for (let i = 0; i < 4; i++) {
      const ang = rn(0, Math.PI*2), dist = rn(0.2, 0.82);
      const tGeo = new THREE.SphereGeometry(0.115 + rn(0,0.035), 28, 22);
      const t = new THREE.Mesh(tGeo, tomatoMat);
      t.scale.y = 0.90;
      t.position.set(Math.cos(ang)*dist, 0.12+rn(0,0.09), Math.sin(ang)*dist);
      t.castShadow = true;
      pastaGroup.add(t);
      // Highlight
      const hl = new THREE.Mesh(new THREE.SphereGeometry(0.038, 8, 8), tomatoGlossMat);
      hl.position.copy(t.position).addScaledVector(new THREE.Vector3(-0.07, 0.07, 0.04), 1);
      pastaGroup.add(hl);
    }

    /* ── BASIL LEAVES ── */
    const basilMats = [
      new THREE.MeshStandardMaterial({ color: 0x276324, roughness: 0.9, metalness: 0, side: THREE.DoubleSide }),
      new THREE.MeshStandardMaterial({ color: 0x3e9636, roughness: 0.55, metalness: 0.04, side: THREE.DoubleSide }),
    ];
    for (let i = 0; i < 5; i++) {
      const ang = rn(0, Math.PI*2), dist = rn(0.1, 0.78);
      const lw = rn(0.1, 0.17), ll = rn(0.18, 0.28);
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.bezierCurveTo(-lw, ll*0.28, -lw*1.15, ll*0.62, 0, ll);
      shape.bezierCurveTo( lw*1.15, ll*0.62, lw, ll*0.28, 0, 0);
      const leaf = new THREE.Mesh(new THREE.ShapeGeometry(shape, 16), basilMats[i%2]);
      leaf.position.set(Math.cos(ang)*dist, 0.19+rn(0,0.12), Math.sin(ang)*dist);
      leaf.rotation.x = -Math.PI/2 + rn(-0.35, 0.35);
      leaf.rotation.z = rn(0, Math.PI*2);
      leaf.castShadow = true;
      pastaGroup.add(leaf);
    }

    /* ── PARMESAN ── */
    const parmMat = new THREE.MeshStandardMaterial({ color: 0xeece68, roughness: 0.6, metalness: 0 });
    for (let i = 0; i < 8; i++) {
      const ang = rn(0, Math.PI*2), dist = rn(0.08, 0.88);
      const w = rn(0.06, 0.2), l = rn(0.1, 0.28);
      const g = new THREE.BoxGeometry(w, 0.011, l);
      const pa = g.attributes.position;
      for (let vi = 0; vi < pa.count; vi++) {
        const pz = pa.getZ(vi);
        pa.setY(vi, pa.getY(vi) + Math.abs(pz/l) * rn(0.01, 0.045));
      }
      g.computeVertexNormals();
      const sh = new THREE.Mesh(g, parmMat);
      sh.position.set(Math.cos(ang)*dist, 0.25+rn(0,0.16), Math.sin(ang)*dist);
      sh.rotation.set(rn(-0.45,0.45), rn(0,Math.PI*2), rn(-0.3,0.3));
      sh.castShadow = true;
      pastaGroup.add(sh);
    }

    /* ── OIL DRIZZLE ── */
    const oilMat = new THREE.MeshStandardMaterial({ color: 0xcca418, roughness: 0.08, metalness: 0, transparent: true, opacity: 0.72 });
    for (let i = 0; i < 4; i++) {
      const pts = [
        new THREE.Vector3(rn(-0.7,0.7), 0.23, rn(-0.7,0.7)),
        new THREE.Vector3(rn(-0.7,0.7), 0.21, rn(-0.7,0.7)),
        new THREE.Vector3(rn(-0.7,0.7), 0.20, rn(-0.7,0.7)),
      ];
      const og = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 12, 0.011, 5, false);
      pastaGroup.add(new THREE.Mesh(og, oilMat));
    }

    /* ── TABLE (dark marble-ish) ── */
    const tableTex = tex(512, (c, s) => {
      c.fillStyle = "#0e0b09"; c.fillRect(0,0,s,s);
      for (let i = 0; i < s; i += rn(1.5, 4.5)) {
        const lm = 0.5 + rn(0, 0.7);
        c.strokeStyle = `rgba(${(30*lm)|0},${(18*lm)|0},${(10*lm)|0},0.7)`;
        c.lineWidth = rn(0.4, 2.2);
        c.beginPath(); c.moveTo(0, i+rn(-1,1)); c.lineTo(s, i+rn(-1,1)); c.stroke();
      }
      // vignette
      const vg = c.createRadialGradient(s/2,s/2, 80, s/2,s/2, s*0.72);
      vg.addColorStop(0,"rgba(0,0,0,0)"); vg.addColorStop(1,"rgba(0,0,0,0.75)");
      c.fillStyle = vg; c.fillRect(0,0,s,s);
    });
    tableTex.repeat.set(4, 4);
    const tableMesh = new THREE.Mesh(
      new THREE.CircleGeometry(5.5, 64),
      new THREE.MeshStandardMaterial({ map: tableTex, roughness: 0.55, metalness: 0.12 })
    );
    tableMesh.rotation.x = -Math.PI/2;
    tableMesh.position.y = -0.115;
    tableMesh.receiveShadow = true;
    scene.add(tableMesh);

    /* ── CONTACT SHADOW ── */
    const csTex = tex(256, (c, s) => {
      const g = c.createRadialGradient(s/2,s/2, 0, s/2,s/2, s/2);
      g.addColorStop(0,"rgba(0,0,0,0.7)");
      g.addColorStop(0.4,"rgba(0,0,0,0.25)");
      g.addColorStop(1,"rgba(0,0,0,0)");
      c.fillStyle = g; c.fillRect(0,0,s,s);
    });
    const csShadow = new THREE.Mesh(
      new THREE.CircleGeometry(2.6, 64),
      new THREE.MeshBasicMaterial({ map: csTex, transparent: true, depthWrite: false })
    );
    csShadow.rotation.x = -Math.PI/2;
    csShadow.position.y = -0.112;
    scene.add(csShadow);

    /* ── Mouse / Touch ── */
    let drag = false, px = 0, py = 0;
    let vx = 0.003, vy = 0;
    let ry = 0, rx = 0.24;
    let auto = true;

    const md = (e: MouseEvent) => { drag=true; auto=false; px=e.clientX; py=e.clientY; vx=0; vy=0; mount.style.cursor="grabbing"; };
    const mm = (e: MouseEvent) => { if (!drag) return; vx=(e.clientX-px)*0.012; vy=(e.clientY-py)*0.006; ry+=vx; rx=Math.max(-0.1,Math.min(0.55,rx+vy)); px=e.clientX; py=e.clientY; };
    const mu = () => { drag=false; mount.style.cursor="grab"; };
    const ts = (e: TouchEvent) => { drag=true; auto=false; px=e.touches[0].clientX; py=e.touches[0].clientY; vx=0; vy=0; };
    const tm = (e: TouchEvent) => { if (!drag) return; vx=(e.touches[0].clientX-px)*0.012; vy=(e.touches[0].clientY-py)*0.006; ry+=vx; rx=Math.max(-0.1,Math.min(0.55,rx+vy)); px=e.touches[0].clientX; py=e.touches[0].clientY; };
    const te = () => { drag=false; };

    mount.style.cursor = "grab";
    mount.addEventListener("mousedown", md);
    window.addEventListener("mousemove", mm);
    window.addEventListener("mouseup", mu);
    mount.addEventListener("touchstart", ts, { passive: true });
    mount.addEventListener("touchmove", tm, { passive: true });
    mount.addEventListener("touchend", te);

    /* ── Resize ── */
    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w/h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    /* ── Animate ── */
    let raf: number;
    const clock = new THREE.Clock();

    (function loop() {
      raf = requestAnimationFrame(loop);
      const t = clock.getElapsedTime();
      if (!drag) {
        vx *= 0.92; vy *= 0.92;
        if (auto || Math.abs(vx) < 0.0004) vx = 0.003;
        ry += vx; rx += vy;
        rx = Math.max(-0.1, Math.min(0.55, rx));
      }
      group.rotation.y = ry;
      group.rotation.x = rx;
      group.position.y = Math.sin(t * 0.6) * 0.022;
      // Candlelight flicker
      keyLight.intensity = 5.0 + Math.sin(t*5.1)*0.12 + Math.sin(t*8.7)*0.06;
      renderer.render(scene, camera);
    })();

    return () => {
      cancelAnimationFrame(raf);
      mount.removeEventListener("mousedown", md);
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("mouseup", mu);
      mount.removeEventListener("touchstart", ts);
      mount.removeEventListener("touchmove", tm);
      mount.removeEventListener("touchend", te);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} />;
}
