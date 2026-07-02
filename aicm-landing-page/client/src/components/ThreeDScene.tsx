import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeDScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
    scene.fog = new THREE.Fog(0xf5f5f5, 50, 100);

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Purple neon light
    const purpleLight = new THREE.PointLight(0xb366ff, 2, 60);
    purpleLight.position.set(6, 4, 8);
    purpleLight.castShadow = true;
    scene.add(purpleLight);

    // Magenta neon light
    const magentaLight = new THREE.PointLight(0xff00ff, 1.8, 50);
    magentaLight.position.set(-6, 2, 6);
    magentaLight.castShadow = true;
    scene.add(magentaLight);

    // Directional light for shadows
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(10, 15, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Create 3D blocks with enhanced materials
    const blockMaterial = new THREE.MeshStandardMaterial({
      color: 0xfafafa,
      metalness: 0.15,
      roughness: 0.85,
      envMapIntensity: 1,
    });

    const createBlock = (x: number, y: number, z: number, scale: number = 1) => {
      const geometry = new THREE.BoxGeometry(3 * scale, 3 * scale, 3 * scale);
      const mesh = new THREE.Mesh(geometry, blockMaterial);
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      return mesh;
    };

    const block1 = createBlock(-2.5, 0.5, -1);
    const block2 = createBlock(2, -1.5, 0);
    const block3 = createBlock(0.5, 2, -1.5, 0.8);

    scene.add(block1, block2, block3);

    // Create neon glow lines
    const createNeonLine = (start: THREE.Vector3, end: THREE.Vector3, color: number) => {
      const geometry = new THREE.BufferGeometry();
      geometry.setFromPoints([start, end]);
      const material = new THREE.LineBasicMaterial({
        color,
        linewidth: 4,
        fog: false,
      });
      return new THREE.Line(geometry, material);
    };

    const neonLine1 = createNeonLine(
      new THREE.Vector3(-4, 1.5, 1.5),
      new THREE.Vector3(-0.5, 1.5, 1.5),
      0xb366ff
    );
    const neonLine2 = createNeonLine(
      new THREE.Vector3(2, -3, 1.5),
      new THREE.Vector3(2, 0, 1.5),
      0xff00ff
    );
    const neonLine3 = createNeonLine(
      new THREE.Vector3(-1, 3.5, -0.5),
      new THREE.Vector3(2, 3.5, -0.5),
      0xb366ff
    );

    scene.add(neonLine1, neonLine2, neonLine3);

    // Create the gold coin with enhanced material
    const coinGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.12, 64);
    const coinMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.95,
      roughness: 0.1,
      emissive: 0xffaa00,
      emissiveIntensity: 0.3,
    });
    const coin = new THREE.Mesh(coinGeometry, coinMaterial);
    coin.castShadow = true;
    coin.receiveShadow = true;
    scene.add(coin);

    // Particle system for bokeh effect
    const particleCount = 150;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 25;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 15;
      particleSpeeds[i] = Math.random() * 0.5 + 0.1;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.15,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.5,
      fog: false,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Create coin path curve
    const coinPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-4, 1, -2),
      new THREE.Vector3(-2, 2.5, -1),
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(2, -1, 1),
      new THREE.Vector3(3, -2.5, 0),
      new THREE.Vector3(1, -1.5, -1),
      new THREE.Vector3(-2, 0.5, -1.5),
      new THREE.Vector3(-4, 1, -2),
    ]);

    // Animation loop
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.008;

      // Coin rolling animation
      const pathProgress = (time * 0.15) % 1;
      const coinPosition = coinPath.getPoint(pathProgress);
      coin.position.copy(coinPosition);
      coin.rotation.z += 0.08;
      coin.rotation.x += 0.02;

      // Subtle camera drift
      camera.position.x = Math.sin(time * 0.08) * 0.8;
      camera.position.y = Math.cos(time * 0.06) * 0.5;
      camera.lookAt(0, 0, 0);

      // Particle animation
      const positions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(time * 0.3 + i * 0.1) * particleSpeeds[i] * 0.01;

        // Reset particles that go too high
        if (positions[i * 3 + 1] > 15) {
          positions[i * 3 + 1] = -15;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Block subtle rotation
      block1.rotation.y += 0.0003;
      block1.rotation.x += 0.0001;
      block2.rotation.x += 0.0002;
      block2.rotation.z += 0.0003;
      block3.rotation.z += 0.0002;
      block3.rotation.y += 0.0001;

      // Neon line pulsing effect
      const pulseFactor = 0.7 + Math.sin(time * 2) * 0.3;
      neonLine1.material.opacity = pulseFactor;
      neonLine2.material.opacity = pulseFactor;
      neonLine3.material.opacity = pulseFactor;

      // Light intensity pulsing
      purpleLight.intensity = 1.8 + Math.sin(time * 1.5) * 0.4;
      magentaLight.intensity = 1.5 + Math.cos(time * 1.3) * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default ThreeDScene;
