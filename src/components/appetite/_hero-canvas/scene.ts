import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

type SceneDeps = {
  canvas: HTMLCanvasElement;
  wrap: HTMLDivElement;
  modelUrl: string;
  onLoaded: () => void;
};

/**
 * Builds the Three.js hero scene (renderer, lights, controls, model load,
 * resize observer, idle float + glow pulse loop). Returns a dispose fn.
 */
export function createHeroScene({ canvas, wrap, modelUrl, onLoaded }: SceneDeps) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
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
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.9, 64, 64),
      new THREE.MeshStandardMaterial({ color: 0x1a1c22, metalness: 0.6, roughness: 0.3 }),
    );
    sphere.castShadow = true;
    scene.add(sphere);
    model = sphere;
    onLoaded();
  }

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/");
  dracoLoader.setDecoderConfig({ type: "js" });
  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);

  gltfLoader.load(
    modelUrl,
    (gltf) => {
      model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const scale = 2.2 / Math.max(size.x, size.y, size.z);
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
      onLoaded();
    },
    undefined,
    () => showFallback(),
  );

  function resize() {
    renderer.setSize(wrap.clientWidth, wrap.clientHeight);
    camera.aspect = wrap.clientWidth / wrap.clientHeight;
    camera.updateProjectionMatrix();
  }
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(wrap);

  let userInteracting = false;
  const onDown = () => {
    userInteracting = true;
    controls.autoRotate = false;
  };
  const onUp = () => {
    userInteracting = false;
    setTimeout(() => {
      controls.autoRotate = true;
    }, 2000);
  };
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
    dracoLoader.dispose();
    renderer.dispose();
  };
}
