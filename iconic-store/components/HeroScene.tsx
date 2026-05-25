'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { Environment, Float, Lightformer } from '@react-three/drei';

function FloatingObjects() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Parallax effect based on mouse
    const targetX = (state.pointer.x * Math.PI) / 8; // max +- 22.5 degrees
    const targetY = (state.pointer.y * Math.PI) / 8;
    
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.05;

    // Slow continuous rotation
    groupRef.current.children.forEach((child, i) => {
      child.rotation.x += 0.003 * (i % 2 === 0 ? 1 : -1);
      child.rotation.y += 0.004 * (i % 3 === 0 ? 1 : -1);
    });
  });

  const objects = Array.from({ length: 45 }).map((_, i) => {
    // Significantly larger objects
    const scale = Math.random() * 0.8 + 0.4; 
    
    // Bring objects much closer to the camera
    const position = [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 15 + 2 // Z from -5.5 to 9.5
    ] as [number, number, number];

    const isBox = i % 3 === 0;
    const isTorus = i % 3 === 1;

    return (
      <mesh key={i} position={position} scale={[scale * 2, scale * 2, scale * 2]}>
        {isBox ? <boxGeometry args={[1, 1, 1]} /> : isTorus ? <torusGeometry args={[0.7, 0.25, 16, 32]} /> : <icosahedronGeometry args={[0.8, 0]} />}
        <meshStandardMaterial 
          color={i % 2 === 0 ? "#FFDF73" : "#FFB347"} // Brighter gold/amber colors
          roughness={0.05} // Almost mirror-like
          metalness={1}    // Full metal
          emissive="#4A3B00"
          emissiveIntensity={0.4}
        />
      </mesh>
    );
  });

  return <group ref={groupRef}>{objects}</group>;
}

function MovingLight() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (!lightRef.current) return;
    const t = clock.getElapsedTime();
    lightRef.current.position.x = Math.sin(t * 0.5) * 12;
    lightRef.current.position.z = Math.cos(t * 0.5) * 12;
    lightRef.current.position.y = Math.sin(t * 0.8) * 8;
  });

  return <pointLight ref={lightRef} color="#FFF2D8" intensity={150} distance={40} />;
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#FFD700" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#FFA500" />
        
        <MovingLight />
        
        {/* Local Environment Map to avoid CDN network errors but keep premium reflections */}
        <Environment resolution={256}>
          <group rotation={[-Math.PI / 4, -0.3, 0]}>
            <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} color="#FFD700" />
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 2, 1]} color="#ffffff" />
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[5, 1, 1]} scale={[20, 2, 1]} color="#FFA500" />
            <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, -5, 0]} scale={[10, 10, 1]} color="#ffffff" />
          </group>
        </Environment>
        
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
          <FloatingObjects />
        </Float>
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] pointer-events-none opacity-80" />
    </div>
  );
}
