'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame, Canvas } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';

// DNA Helix Geometry Generator
function generateHelixPoints(numPoints: number, radius: number, height: number, turns: number) {
  const points = [];
  const colors = [];
  
  for (let i = 0; i < numPoints; i++) {
    const t = i / numPoints;
    const angle = t * Math.PI * 2 * turns;
    
    // Create double helix structure
    const x1 = Math.cos(angle) * radius;
    const z1 = Math.sin(angle) * radius;
    const y1 = (t - 0.5) * height;
    
    const x2 = Math.cos(angle + Math.PI) * radius;
    const z2 = Math.sin(angle + Math.PI) * radius;
    const y2 = (t - 0.5) * height;
    
    points.push(x1, y1, z1);
    points.push(x2, y2, z2);
    
    // Color gradient from cyan to blue
    const hue1 = 0.5 + Math.sin(angle * 0.5) * 0.1; // Cyan variations
    const hue2 = 0.6 + Math.cos(angle * 0.5) * 0.1; // Blue variations
    
    colors.push(hue1, 0.8, 1);
    colors.push(hue2, 0.8, 1);
  }
  
  return { points: new Float32Array(points), colors: new Float32Array(colors) };
}

// Animated DNA Helix Component
function DNAHelix({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.Group>(null);
  
  const { points, colors } = useMemo(() => 
    generateHelixPoints(100, 0.8, 6, 3), []
  );
  
  // Generate connecting lines between helix strands
  const connectionLines = useMemo(() => {
    const lines = [];
    const numConnections = 20;
    
    for (let i = 0; i < numConnections; i++) {
      const t = i / numConnections;
      const angle = t * Math.PI * 2 * 3;
      
      const x1 = Math.cos(angle) * 0.8;
      const z1 = Math.sin(angle) * 0.8;
      const y1 = (t - 0.5) * 6;
      
      const x2 = Math.cos(angle + Math.PI) * 0.8;
      const z2 = Math.sin(angle + Math.PI) * 0.8;
      const y2 = (t - 0.5) * 6;
      
      lines.push([
        new THREE.Vector3(x1, y1, z1),
        new THREE.Vector3(x2, y2, z2)
      ]);
    }
    
    return lines;
  }, []);
  
  useFrame(({ clock, mouse }) => {
    if (!groupRef.current || !pointsRef.current) return;
    
    const time = clock.getElapsedTime();
    
    // Rotate the entire helix
    groupRef.current.rotation.y = time * 0.3 + scrollProgress * Math.PI * 2;
    groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    
    // Interactive mouse movement
    groupRef.current.rotation.z = mouse.x * 0.2;
    groupRef.current.position.y = Math.sin(time * 0.5) * 0.3 - scrollProgress * 2;
    
    // Animate point materials
    if (pointsRef.current.material instanceof THREE.PointsMaterial) {
      pointsRef.current.material.size = 0.05 + Math.sin(time * 2) * 0.02;
    }
    
    // Animate connection lines
    if (linesRef.current) {
      linesRef.current.children.forEach((line, i) => {
        if (line instanceof THREE.Line) {
          const material = line.material as THREE.LineBasicMaterial;
          material.opacity = 0.3 + Math.sin(time * 3 + i * 0.5) * 0.2;
        }
      });
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* DNA Helix Points */}
      <Points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length / 3}
            array={points}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <PointMaterial
          size={0.05}
          transparent
          vertexColors
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </Points>
      
      {/* Connection Lines */}
      <group ref={linesRef}>
        {connectionLines.map((linePoints, i) => (
          <Line
            key={i}
            points={linePoints}
            color="#00ffff"
            lineWidth={1}
            transparent
            opacity={0.4}
          />
        ))}
      </group>
      
      {/* Glow Effect */}
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.03}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// Floating AI Brain Particles
function AIBrainParticles({ mousePosition }: { mousePosition: THREE.Vector2 }) {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleCount = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      // Create brain-like cluster formation
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      
      const radius = 1 + Math.random() * 2;
      pos[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      pos[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = radius * Math.cos(phi);
      
      // Neural network colors (cyan to purple gradient)
      const intensity = Math.random();
      colors[i * 3] = 0.2 + intensity * 0.3; // R
      colors[i * 3 + 1] = 0.8 + intensity * 0.2; // G
      colors[i * 3 + 2] = 1.0; // B
    }
    
    return { positions: pos, colors };
  }, []);
  
  useFrame(({ clock }) => {
    if (!particlesRef.current) return;
    
    const time = clock.getElapsedTime();
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    
    // Animate particles following mouse with neural network behavior
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Add gentle floating motion
      positions[i3 + 1] += Math.sin(time * 2 + i) * 0.002;
      
      // Mouse attraction with dampening
      const mouseInfluence = 0.001;
      positions[i3] += (mousePosition.x * 2 - positions[i3]) * mouseInfluence;
      positions[i3 + 2] += (mousePosition.y * 2 - positions[i3 + 2]) * mouseInfluence;
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Rotate the entire system
    particlesRef.current.rotation.y = time * 0.1;
    particlesRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
  });
  
  return (
    <Points ref={particlesRef} position={[3, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={positions.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        size={0.03}
        transparent
        vertexColors
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  );
}

// Main DNA Helix Canvas Component
export default function AnimatedDNAHelix({ 
  scrollProgress = 0,
  className = "" 
}: { 
  scrollProgress?: number;
  className?: string;
}) {
  const [mounted, setMounted] = React.useState(false);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  
  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleMouseMove = (event: React.MouseEvent) => {
    mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };
  
  if (!mounted) {
    return <div className={`${className} bg-black`} />;
  }
  
  return (
    <div 
      className={`w-full h-full ${className}`}
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ 
          position: [0, 0, 8], 
          fov: 75,
          near: 0.1,
          far: 1000 
        }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00ffff" />
        <pointLight position={[-10, -10, 10]} intensity={0.3} color="#ff00ff" />
        
        {/* DNA Helix */}
        <DNAHelix scrollProgress={scrollProgress} />
        
        {/* AI Brain Particles */}
        <AIBrainParticles mousePosition={mouseRef.current} />
        
        {/* Background Fog */}
        <fog attach="fog" args={['#000000', 5, 15]} />
      </Canvas>
    </div>
  );
}