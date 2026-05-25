'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import { Suspense } from 'react';

// Using a basic fallback if no GLTF is provided, as specified in prompt
function PlaceholderModel() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#333" roughness={0.5} metalness={0.8} />
    </mesh>
  );
}

export default function ProductViewer3D() {
  return (
    <div className="w-[400px] h-[400px] bg-black/50 border border-white/10 rounded-lg overflow-hidden relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={2} color="#F5A623" />
        <Suspense fallback={null}>
          <Center>
            <PlaceholderModel />
          </Center>
        </Suspense>
        <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
      <div className="absolute bottom-4 left-0 w-full text-center pointer-events-none">
        <p className="font-dm-mono text-[10px] text-white/50 tracking-widest">DRAG TO ROTATE · SCROLL TO ZOOM</p>
      </div>
    </div>
  );
}
