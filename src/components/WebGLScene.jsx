import React from "react";
import { useReducedMotion } from "motion/react";
import "./WebGLScene.css";

export function WebGLScene() {
  const mountRef = React.useRef(null);
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let disposed = false;
    let frame = 0;
    let renderer;
    let particleGeometry;
    let particleMaterial;
    let ringMaterial;
    let torusGeometry;
    let resizeObserver;
    let canvas;

    import("three").then((THREE) => {
      if (disposed || !mountRef.current) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.set(0, 0, 7.5);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
      renderer.setClearColor(0x101312, 0);
      mount.appendChild(renderer.domElement);
      canvas = renderer.domElement;

      const group = new THREE.Group();
      scene.add(group);

      particleGeometry = new THREE.BufferGeometry();
      const count = 1180;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const colorA = new THREE.Color(0x42d677);
      const colorB = new THREE.Color(0xd5a04b);

      for (let i = 0; i < count; i += 1) {
        const radius = 1 + Math.random() * 3.35;
        const angle = Math.random() * Math.PI * 2;
        const depth = (Math.random() - 0.5) * 3.8;
        positions[i * 3] = Math.cos(angle) * radius;
        positions[i * 3 + 1] = Math.sin(angle) * radius * 0.58;
        positions[i * 3 + 2] = depth;
        const mixed = colorA.clone().lerp(colorB, Math.random() * 0.32);
        colors[i * 3] = mixed.r;
        colors[i * 3 + 1] = mixed.g;
        colors[i * 3 + 2] = mixed.b;
      }

      particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      particleMaterial = new THREE.PointsMaterial({
        size: 0.025,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
      });
      group.add(new THREE.Points(particleGeometry, particleMaterial));

      ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x42d677,
        wireframe: true,
        transparent: true,
        opacity: 0.2,
      });
      torusGeometry = new THREE.TorusKnotGeometry(1.92, 0.08, 220, 14, 2, 5);
      const torus = new THREE.Mesh(torusGeometry, ringMaterial);
      torus.position.set(0.45, -0.2, 0);
      torus.rotation.x = 1.08;
      group.add(torus);

      const resize = () => {
        const { width, height } = mount.getBoundingClientRect();
        renderer.setSize(width, height, false);
        camera.aspect = width / Math.max(height, 1);
        camera.updateProjectionMatrix();
      };

      resize();
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(mount);

      const clock = new THREE.Clock();
      const render = () => {
        if (disposed) return;
        const elapsed = clock.getElapsedTime();
        if (!reduceMotion) {
          group.rotation.y = elapsed * 0.095;
          group.rotation.x = Math.sin(elapsed * 0.24) * 0.08;
          torus.rotation.z = elapsed * 0.16;
        }
        renderer.render(scene, camera);
        frame = requestAnimationFrame(render);
      };
      render();
    });

    return () => {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      renderer?.dispose();
      particleGeometry?.dispose();
      particleMaterial?.dispose();
      ringMaterial?.dispose();
      torusGeometry?.dispose();
      if (canvas && mount.contains(canvas)) {
        mount.removeChild(canvas);
      }
    };
  }, [reduceMotion]);

  return <div ref={mountRef} className="webgl-stage" aria-hidden="true" />;
}
