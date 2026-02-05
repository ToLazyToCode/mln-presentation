
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { GraphScene } from './GraphScene';
import { useStore } from '../store/useStore';

const GraphCanvas = () => {
  const performanceMode = useStore((state) => state.performanceMode);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        shadows
        dpr={performanceMode === 'high' ? [1, 2] : 1}
        camera={{ position: [0, 0, 15], fov: 45 }}
        gl={{ antialias: performanceMode === 'high', alpha: true }}
      >
        <Suspense fallback={null}>
          <GraphScene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default GraphCanvas;
