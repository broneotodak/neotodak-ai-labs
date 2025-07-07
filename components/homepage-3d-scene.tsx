'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Environment, PerspectiveCamera, MeshReflectorMaterial, Box, Sphere, Torus, Cone, MeshDistortMaterial } from '@react-three/drei';

// 3D Floating Objects
function FloatingShapes() {
  return (
    <>
      <Float speed={1.5} rotationIntensity={1.2} floatIntensity={1.5}>
        <Box args={[1, 1, 1]} position={[-4, 2, -2]}>
          <MeshDistortMaterial color="#00d9ff" distort={0.3} speed={2} />
        </Box>
      </Float>
      
      <Float speed={2} rotationIntensity={1} floatIntensity={1.2}>
        <Sphere args={[0.8, 32, 32]} position={[4, 1, -3]}>
          <MeshDistortMaterial color="#ff006e" distort={0.4} speed={3} />
        </Sphere>
      </Float>
      
      <Float speed={1.8} rotationIntensity={1.5} floatIntensity={1}>
        <Torus args={[1, 0.4, 16, 32]} position={[-3, -2, -4]}>
          <MeshDistortMaterial color="#8b5cf6" distort={0.3} speed={2.5} />
        </Torus>
      </Float>
      
      <Float speed={2.2} rotationIntensity={0.8} floatIntensity={1.3}>
        <Cone args={[0.8, 1.5, 32]} position={[3, -1.5, -2]}>
          <MeshDistortMaterial color="#fbbf24" distort={0.2} speed={2} />
        </Cone>
      </Float>
    </>
  );
}

// 3D Scene
export default function Homepage3DScene() {
  return (
    <Canvas className="h-full">
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00d9ff" />
      <pointLight position={[10, -10, 5]} intensity={0.5} color="#ff006e" />
      
      <Suspense fallback={null}>
        <FloatingShapes />
      </Suspense>
      
      <Environment preset="city" />
      
      {/* Reflective Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          mirror={0.5}
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={40}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#101010"
          metalness={0.5}
        />
      </mesh>
    </Canvas>
  );
}