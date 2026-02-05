
import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Sphere, Plane } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { useStore } from '../store/useStore';
import { NodeShader, BackgroundShader } from './Shaders';

const AmbientLight = 'ambientLight' as any;
const ShaderMaterial = 'shaderMaterial' as any;

const NODE_POSITIONS = {
  human: [0, 0, 0],
  product: [0, 5, -2],
  process: [6, 0, -2],
  society: [0, -5, -2],
  nature_essence: [-6, 0, -2]
};

const CameraRig = () => {
  const activeSection = useStore((state) => state.activeSection);
  const { camera } = useThree();

  useFrame(() => {
    let targetZ = 15;
    let targetY = 0;
    let targetX = 0;

    if (activeSection === 0) targetZ = 12;
    if (activeSection === 1) { targetZ = 18; targetX = 5; }
    if (activeSection === 4) { targetZ = 20; targetY = 0; } // Push back slightly
    if (activeSection === 7) { targetZ = 25; targetY = -5; }

    gsap.to(camera.position, {
      x: targetX,
      y: targetY,
      z: targetZ,
      duration: 1.5,
      ease: 'power3.out'
    });
    camera.lookAt(0, 0, 0);
  });

  return null;
};

const Node = ({ id, position }: { id: string; position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const activeSection = useStore((state) => state.activeSection);
  const hoveredNodeId = useStore((state) => state.hoveredNodeId);
  const selectedNodeId = useStore((state) => state.selectedNodeId);
  
  const isSelected = selectedNodeId === id;
  const isHovered = hoveredNodeId === id;

  const uniforms = useMemo(() => ({
    uColor: { value: new THREE.Color(id === 'human' ? 0xffffff : 0xff3333) },
    uIntensity: { value: 0 },
    uTime: { value: 0 }
  }), [id]);

  useFrame((state) => {
    if (!meshRef.current) return;
    uniforms.uTime.value = state.clock.elapsedTime;

    let targetIntensity = 0.2;
    // Hide background nodes when in Alienation section (index 4) to focus on the interactive diagram
    if (activeSection === 4) {
      targetIntensity = 0; 
    } else if (activeSection > 4) {
      targetIntensity = 0.4;
    } else if (activeSection < 4) {
       targetIntensity = 0.2;
    }
    
    uniforms.uIntensity.value = THREE.MathUtils.lerp(uniforms.uIntensity.value, targetIntensity, 0.05);
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
  });

  return (
    <Sphere ref={meshRef} position={position} args={[id === 'human' ? 1.2 : 0.8, 64, 64]}>
      <ShaderMaterial
        vertexShader={NodeShader.vertex}
        fragmentShader={NodeShader.fragment}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
      />
    </Sphere>
  );
};

const ParticleSystem = () => {
  const performanceMode = useStore((state) => state.performanceMode);
  const activeSection = useStore((state) => state.activeSection);
  const count = performanceMode === 'high' ? 2000 : 500;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return pos;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      // Dim particles in interactive section
      const targetOpacity = activeSection === 4 ? 0.05 : 0.2;
      (ref.current.material as THREE.PointsMaterial).opacity = THREE.MathUtils.lerp(
        (ref.current.material as THREE.PointsMaterial).opacity,
        targetOpacity,
        0.05
      );
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial transparent color="#ffffff" size={0.02} sizeAttenuation={true} depthWrite={false} opacity={0.2} />
    </Points>
  );
};

export const GraphScene = () => {
  return (
    <>
      <CameraRig />
      <AmbientLight intensity={0.2} />
      <ParticleSystem />
      
      {Object.entries(NODE_POSITIONS).map(([id, pos]) => (
        <Node key={id} id={id} position={pos as [number, number, number]} />
      ))}

      <Plane position={[0, 0, -10]} args={[100, 100]}>
        <ShaderMaterial
          vertexShader={BackgroundShader.vertex}
          fragmentShader={BackgroundShader.fragment}
          uniforms={{ uTime: { value: 0 } }}
          transparent
          depthWrite={false}
        />
      </Plane>
    </>
  );
};
