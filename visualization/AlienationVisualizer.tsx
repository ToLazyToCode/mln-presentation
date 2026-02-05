
import React, { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { BackgroundShader, NodeShader, EdgeShader } from './Shaders';

interface VisualizerProps {
  activeSection: number;
  selectedNode: string | null;
}

const AlienationVisualizer: React.FC<VisualizerProps> = ({ activeSection, selectedNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const nodesRef = useRef<Map<string, THREE.Mesh>>(new Map());
  const uniformsRef = useRef<{ time: { value: number } }>({ time: { value: 0 } });

  // Map nodes to 3D positions
  const nodePositions = useMemo(() => ({
    human: [0, 0, 0],
    product: [0, 4, 0],
    process: [4, 0, 0],
    society: [0, -4, 0],
    nature_essence: [-4, 0, 0]
  }), []);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. Background Plane
    const bgGeo = new THREE.PlaneGeometry(50, 50);
    const bgMat = new THREE.ShaderMaterial({
      vertexShader: BackgroundShader.vertex,
      fragmentShader: BackgroundShader.fragment,
      uniforms: { uTime: uniformsRef.current.time },
      transparent: true,
      depthWrite: false
    });
    const background = new THREE.Mesh(bgGeo, bgMat);
    background.position.z = -5;
    scene.add(background);

    // 3. Nodes
    const sphereGeo = new THREE.SphereGeometry(1, 64, 64);
    Object.entries(nodePositions).forEach(([id, pos]) => {
      const mat = new THREE.ShaderMaterial({
        vertexShader: NodeShader.vertex,
        fragmentShader: NodeShader.fragment,
        uniforms: {
          uColor: { value: new THREE.Color(id === 'human' ? 0xffffff : 0xff3333) },
          uIntensity: { value: 0.5 },
          uTime: uniformsRef.current.time
        },
        transparent: true,
        blending: THREE.AdditiveBlending
      });
      const mesh = new THREE.Mesh(sphereGeo, mat);
      mesh.position.set(pos[0], pos[1], pos[2]);
      mesh.scale.setScalar(id === 'human' ? 1.2 : 0.8);
      scene.add(mesh);
      nodesRef.current.set(id, mesh);
    });

    // 4. Edges (Simple Lines)
    const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.1 });
    const humanPos = new THREE.Vector3(...nodePositions.human);
    ['product', 'process', 'society', 'nature_essence'].forEach(id => {
      const pos = (nodePositions as any)[id];
      const points = [humanPos, new THREE.Vector3(...pos)];
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geo, lineMat);
      scene.add(line);
    });

    // 5. Particles
    const particlesCount = 500;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particlesCount * 3);
    for(let i=0; i<particlesCount * 3; i++) pPos[i] = (Math.random() - 0.5) * 20;
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.05, color: 0xffffff, transparent: true, opacity: 0.2 });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    // Animation Loop
    let frameId: number;
    const animate = (time: number) => {
      uniformsRef.current.time.value = time * 0.001;
      
      // Floating motion
      points.rotation.y += 0.0005;
      
      // Camera Smoothing
      if (cameraRef.current) {
        const targetZ = activeSection === 4 ? 10 : 15;
        const targetY = activeSection === 4 ? 0 : -2;
        cameraRef.current.position.z += (targetZ - cameraRef.current.position.z) * 0.05;
        cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * 0.05;
        cameraRef.current.lookAt(0, 0, 0);
      }

      // Node Updates
      nodesRef.current.forEach((mesh, id) => {
        const mat = mesh.material as THREE.ShaderMaterial;
        const isSelected = selectedNode === id;
        const isAlienationSection = activeSection === 4;
        
        let targetIntensity = 0.3;
        if (isAlienationSection) targetIntensity = isSelected ? 2.5 : 0.6;
        if (activeSection === 0) targetIntensity = 0;

        mat.uniforms.uIntensity.value += (targetIntensity - mat.uniforms.uIntensity.value) * 0.1;
        
        // Idle hover
        mesh.position.y += Math.sin(time * 0.002 + mesh.position.x) * 0.005;
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!renderer || !camera) return;
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  // Update on Props change
  useEffect(() => {
    // This handles the transition logic triggered by section index changes
  }, [activeSection, selectedNode]);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0" />;
};

export default AlienationVisualizer;
