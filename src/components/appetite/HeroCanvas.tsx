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
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const wrapRef    = useRef<HTMLDivElement>(null);
  const flashRef   = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);
  const rafOverlay = useRef<number>(0);
  const switchMode = useRef(false);
  const [loaded, setLoaded] = useState(false);

  // ── Overlay canvas 2D : particules + halo ───────────────────────────────
  useEffect(() => {
    if (!loaded) return;
    const ol   = overlayRef.current;
    const wrap = wrapRef.current;
    if (!ol || !wrap) return;

    ol.width  = wrap.clientWidth;
    ol.height = wrap.clientHeight;

    // 16 particules dorées
    const pts = Array.from({ length: 16 }, (_, i) => ({
      a: (i / 16) * Math.PI * 2,
      r: 140 + Math.random() * 70,
      spd: (0.004 + Math.random() * 0.003) * (i % 2 ? 1 : -1),
      sz: 1.8 + Math.random() * 2,
      op: 0.5 + Math.random() * 0.5,
      trail: [] as {x:number;y:number}[],
    }));

    let frame = 0;
    function draw() {
      rafOverlay.current = requestAnimationFrame(draw);
      const ctx = ol!.getContext("2d");
      if (!ctx) return;
      const W = ol!.width, H = ol!.height;
      const cx = W / 2, cy = H / 2;
      ctx.clearRect(0, 0, W, H);
      frame++;

      // Halo respirant
      const breath = 0.5 + 0.5 * Math.sin(frame * 0.02);
      const hR = 150 + breath * 20;
      const g = ctx.createRadialGradient(cx, cy, hR * 0.2, cx, cy, hR);
      g.addColorStop(0, `hsla(36,85%,58%,${0.12 + breath * 0.08})`);
      g.addColorStop(0.6, `hsla(30,70%,50%,${0.04 + breath * 0.02})`);
      g.addColorStop(1, "hsla(0,0%,0%,0)");
      ctx.beginPath(); ctx.arc(cx, cy, hR, 0, Math.PI*2);
      ctx.fillStyle = g; ctx.fill();

      // Particules
      const boost = switchMode.current ? 5 : 1;
      for (const p of pts) {
        p.a += p.spd * boost;
        const px = cx + Math.cos(p.a) * p.r;
        const py = cy + Math.sin(p.a) * p.r * 0.35;
        p.trail.push({x:px,y:py});
        if (p.trail.length > 12) p.trail.shift();

        // Trail
        for (let i=1; i<p.trail.length; i++) {
          const t0=p.trail[i-1], t1=p.trail[i];
          ctx.beginPath(); ctx.moveTo(t0.x,t0.y); ctx.lineTo(t1.x,t1.y);
          ctx.strokeStyle=`hsla(38,90%,62%,${(i/p.trail.length)*p.op*0.6})`;
          ctx.lineWidth=p.sz*0.4*(i/p.trail.length);
          ctx.stroke();
        }

        // Dot glow
        const dg = ctx.createRadialGradient(px,py,0,px,py,p.sz*3);
        dg.addColorStop(0, `hsla(45,100%,82%,${p.op})`);
        dg.addColorStop(0.5, `hsla(38,90%,62%,${p.op*0.5})`);
        dg.addColorStop(1, "hsla(36,80%,55%,0)");
        ctx.beginPath(); ctx.arc(px,py,p.sz*3,0,Math.PI*2);
        ctx.fillStyle=dg; ctx.fill();
      }

      // Lightning au switch
      if (switchMode.current) {
        for (let b=0; b<5; b++) {
          const sa = (b/5)*Math.PI*2 + frame*0.4;
          const sx = cx + Math.cos(sa)*80, sy = cy + Math.sin(sa)*35;
          ctx.beginPath(); ctx.moveTo(sx,sy);
          let bx=sx, by=sy;
          for (let s=0;s<4;s++) {
            bx += (Math.random()-0.5)*28 + (cx-sx)*0.22;
            by += (Math.random()-0.5)*28 + (cy-sy)*0.22;
            ctx.lineTo(bx,by);
          }
          ctx.lineTo(cx,cy);
          ctx.strokeStyle=`hsla(45,100%,88%,${0.5+Math.random()*0.5})`;
          ctx.lineWidth=0.8+Math.random()*1.5;
          ctx.shadowColor="hsl(45,100%,88%)";
          ctx.shadowBlur=10;
          ctx.stroke();
          ctx.shadowBlur=0;
        }
      }
    }
    draw();

    const ro = new ResizeObserver(() => {
      if (!ol || !wrap) return;
      ol.width=wrap.clientWidth; ol.height=wrap.clientHeight;
    });
    ro.observe(wrap);

    return () => { cancelAnimationFrame(rafOverlay.current); ro.disconnect(); };
  }, [loaded]);

  // ── GSAP intro ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!loaded) return;
    requestAnimationFrame(() => {
      const wrap  = wrapRef.current;
      const flash = flashRef.current;
      const amb   = ambientRef.current;
      if (!wrap) return;

      const tl = gsap.timeline();
      tl.fromTo(wrap,
        { y: 55, autoAlpha: 0, scale: 0.9, filter: "blur(12px)" },
        { y: 0,  autoAlpha: 1, scale: 1,   filter: "blur(0px)", duration: 1.1, ease: "power3.out" }
      );
      if (flash) {
        tl.fromTo(flash, { autoAlpha:0, scale:0.5 }, { autoAlpha:1, scale:1.2, duration:0.3, ease:"power2.out" }, 0.4)
          .to(flash, { autoAlpha:0, scale:2.2, duration:0.75, ease:"expo.in" }, 0.7);
      }
      if (amb) tl.to(amb, { autoAlpha:1, duration:1.3, ease:"power2.out" }, 0.5);
    });
  }, [loaded]);

  // ── GSAP switch ──────────────────────────────────────────────────────────
  const prevUrl = useRef<string|null>(null);
  useEffect(() => {
    if (prevUrl.current === null) { prevUrl.current = modelUrl; return; }
    if (prevUrl.current === modelUrl) return;
    prevUrl.current = modelUrl;

    const wrap  = wrapRef.current;
    const flash = flashRef.current;
    if (!wrap) return;

    switchMode.current = true;
    setTimeout(() => { switchMode.current = false; }, 750);

    const tl = gsap.timeline();
    tl.to(wrap, { scale:0.88, autoAlpha:0.15, filter:"blur(18px)", duration:0.35, ease:"power3.in" });
    if (flash) {
      tl.to(flash, { autoAlpha:1, scale:1.6, duration:0.18, ease:"power2.out" }, "-=0.05")
        .to(flash, { autoAlpha:0, scale:3.0, duration:0.55, ease:"expo.in" });
    }
    tl.fromTo(wrap,
      { scale:0.88, autoAlpha:0.15, filter:"blur(18px)" },
      { scale:1, autoAlpha:1, filter:"blur(0px)", duration:0.7, ease:"elastic.out(1,0.55)" },
      "-=0.35"
    );
  }, [modelUrl]);

  // ── Hover ────────────────────────────────────────────────────────────────
  function onMouseEnter() {
    const amb = ambientRef.current;
    if (amb) gsap.to(amb, { scale:1.4, duration:0.6, ease:"power2.out" });
  }
  function onMouseLeave() {
    const amb = ambientRef.current;
    if (amb) gsap.to(amb, { scale:1, duration:0.8, ease:"power2.inOut" });
  }

  // ── Three.js ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    if (!canvas || !wrap) return;

    setLoaded(false);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true, powerPreference:"high-performance" });
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
    keyLight.position.set(3,5,4); keyLight.castShadow=true;
    keyLight.shadow.mapSize.set(1024,1024); scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0x8ebccc, 0.5);
    fillLight.position.set(-4,2,-2); scene.add(fillLight);
    const rimLight  = new THREE.DirectionalLight(0xf0ebe2, 0.8);
    rimLight.position.set(0,-2,-4); scene.add(rimLight);
    const glowLight = new THREE.PointLight(0xf0d8a0, 1.0, 6);
    glowLight.position.set(0,-1,0.5); scene.add(glowLight);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping=true; controls.dampingFactor=0.05;
    controls.enableZoom=false; controls.enablePan=false;
    controls.minPolarAngle=Math.PI/4; controls.maxPolarAngle=Math.PI*0.7;
    controls.autoRotate=true; controls.autoRotateSpeed=0.8;

    let model: THREE.Object3D|null = null;

    function showFallback() {
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.9,64,64),
        new THREE.MeshStandardMaterial({color:0x1a1c22,metalness:0.6,roughness:0.3})
      );
      sphere.castShadow=true; scene.add(sphere); model=sphere; setLoaded(true);
    }

    new GLTFLoader().load(modelUrl, (gltf) => {
      model = gltf.scene;
      const box=new THREE.Box3().setFromObject(model);
      const center=box.getCenter(new THREE.Vector3());
      const size=box.getSize(new THREE.Vector3());
      const scale=2.2/Math.max(size.x,size.y,size.z);
      model.scale.setScalar(scale);
      model.position.sub(center.multiplyScalar(scale));
      model.position.y -= size.y*scale*0.15;
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow=child.receiveShadow=true;
          const m=(child as THREE.Mesh).material as THREE.MeshStandardMaterial;
          if (m) m.envMapIntensity=1.4;
        }
      });
      scene.add(model); setLoaded(true);
    }, undefined, () => showFallback());

    function resize() {
      if (!wrap) return;
      renderer.setSize(wrap.clientWidth, wrap.clientHeight);
      camera.aspect=wrap.clientWidth/wrap.clientHeight;
      camera.updateProjectionMatrix();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    let userInteracting=false;
    const onDown=()=>{userInteracting=true; controls.autoRotate=false;};
    const onUp=()=>{userInteracting=false; setTimeout(()=>{controls.autoRotate=true;},2000);};
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerup", onUp);

    const clock=new THREE.Clock();
    let rafId: number;
    function animate() {
      rafId=requestAnimationFrame(animate);
      const t=clock.getElapsedTime();
      if (model && !userInteracting) model.position.y += Math.sin(t*0.6)*0.0008;
      glowLight.intensity=0.8+Math.sin(t*1.2)*0.2;
      controls.update();
      renderer.render(scene,camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      canvas.removeEventListener("pointerdown",onDown);
      canvas.removeEventListener("pointerup",onUp);
      renderer.dispose();
    };
  }, [modelUrl]);

  return (
    <div ref={wrapRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
      style={{ position:"relative", width:"100%", height:"420px", borderRadius:16, overflow:"visible", opacity:0, visibility:"hidden" }}
    >
      <div ref={ambientRef} style={{
        position:"absolute", inset:"-22%", borderRadius:"50%",
        background:"radial-gradient(ellipse at 50% 55%, hsl(36,85%,58%,.18) 0%, transparent 70%)",
        filter:"blur(40px)", pointerEvents:"none", opacity:0, visibility:"hidden", zIndex:0,
      }} />
      <div ref={flashRef} style={{
        position:"absolute", inset:0, borderRadius:16,
        background:"radial-gradient(ellipse at 50% 50%, hsl(45,100%,78%,.9) 0%, hsl(36,90%,58%,.4) 28%, transparent 58%)",
        filter:"blur(22px)", pointerEvents:"none", opacity:0, visibility:"hidden", zIndex:4,
      }} />
      <canvas ref={canvasRef} style={{ width:"100%", height:"100%", display:"block", cursor:"grab", position:"relative", zIndex:1, borderRadius:16 }} />
      <canvas ref={overlayRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:2, borderRadius:16 }} />
      {!loaded && (
        <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:16, pointerEvents:"none", zIndex:6, borderRadius:16, background:"hsl(36,20%,96%,.6)", backdropFilter:"blur(8px)" }}>
          <div style={{ width:32, height:32, border:"1.5px solid hsl(36,30%,82%)", borderTopColor:"hsl(36,65%,50%)", borderRadius:"50%", animation:"spin 0.9s linear infinite" }} />
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".5625rem", letterSpacing:".18em", textTransform:"uppercase", color:"hsl(28,20%,52%)" }}>טוען מודל</span>
        </div>
      )}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
