'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame, Canvas } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleData {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  originalPosition: THREE.Vector3;
  size: number;
  phase: number;
}

function generateParticles(count: number, bounds: number = 5): ParticleData[] {
  const particles: ParticleData[] = [];
  
  for (let i = 0; i < count; i++) {
    const position = new THREE.Vector3(
      (Math.random() - 0.5) * bounds,
      (Math.random() - 0.5) * bounds,
      (Math.random() - 0.5) * bounds
    );
    
    particles.push({
      position: position.clone(),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      ),
      originalPosition: position.clone(),
      size: 0.02 + Math.random() * 0.03,
      phase: Math.random() * Math.PI * 2
    });
  }
  
  return particles;
}

function ParticleField({ 
  particles, 
  mousePosition, 
  scrollProgress 
}: { 
  particles: ParticleData[];
  mousePosition: THREE.Vector2;
  scrollProgress: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const positionsRef = useRef<Float32Array>();
  const sizesRef = useRef<Float32Array>();
  const colorsRef = useRef<Float32Array>();
  
  // Initialize arrays
  useMemo(() => {
    const positions = new Float32Array(particles.length * 3);
    const sizes = new Float32Array(particles.length);
    const colors = new Float32Array(particles.length * 3);
    
    particles.forEach((particle, i) => {
      positions[i * 3] = particle.position.x;
      positions[i * 3 + 1] = particle.position.y;
      positions[i * 3 + 2] = particle.position.z;
      
      sizes[i] = particle.size;
      
      // Color based on distance from center
      const hue = 0.5 + Math.sin(particle.phase) * 0.3;
      colors[i * 3] = hue;
      colors[i * 3 + 1] = 0.8;
      colors[i * 3 + 2] = 1.0;
    });
    
    positionsRef.current = positions;
    sizesRef.current = sizes;
    colorsRef.current = colors;
  }, [particles]);
  
  useFrame(({ clock, mouse }) => {
    if (!pointsRef.current || !positionsRef.current || !sizesRef.current || !colorsRef.current) return;
    
    const time = clock.getElapsedTime();
    const mouseForce = 0.5;
    const returnForce = 0.02;
    const positions = positionsRef.current;
    const sizes = sizesRef.current;
    const colors = colorsRef.current;
    
    particles.forEach((particle, i) => {
      const i3 = i * 3;
      
      // Mouse interaction - attract/repel particles
      const mouseX = mouse.x * 5;
      const mouseY = mouse.y * 5;
      const mouseZ = 0;
      
      const dx = mouseX - particle.position.x;
      const dy = mouseY - particle.position.y;
      const dz = mouseZ - particle.position.z;
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
      
      if (distance < 2) {
        // Repel particles when mouse is near
        const force = (2 - distance) * mouseForce;
        particle.velocity.x -= (dx / distance) * force * 0.01;
        particle.velocity.y -= (dy / distance) * force * 0.01;
        particle.velocity.z -= (dz / distance) * force * 0.01;
      }
      
      // Return to original position
      const returnX = (particle.originalPosition.x - particle.position.x) * returnForce;
      const returnY = (particle.originalPosition.y - particle.position.y) * returnForce;
      const returnZ = (particle.originalPosition.z - particle.position.z) * returnForce;
      
      particle.velocity.x += returnX;
      particle.velocity.y += returnY;
      particle.velocity.z += returnZ;
      
      // Apply velocity with damping
      particle.velocity.multiplyScalar(0.95);
      particle.position.add(particle.velocity);
      
      // Add subtle floating motion
      particle.position.y += Math.sin(time * 2 + particle.phase) * 0.001;
      particle.position.x += Math.cos(time * 1.5 + particle.phase) * 0.0005;
      
      // Scroll influence
      particle.position.y -= scrollProgress * 0.5;
      
      // Update positions array
      positions[i3] = particle.position.x;
      positions[i3 + 1] = particle.position.y;
      positions[i3 + 2] = particle.position.z;
      
      // Dynamic size based on velocity
      const velocityMagnitude = particle.velocity.length();
      sizes[i] = particle.size * (1 + velocityMagnitude * 20);
      
      // Dynamic color based on interaction
      const interactionIntensity = Math.min(velocityMagnitude * 50, 1);
      colors[i * 3] = 0.5 + interactionIntensity * 0.5; // More cyan when active
      colors[i * 3 + 1] = 0.8 + interactionIntensity * 0.2;
      colors[i * 3 + 2] = 1.0;
    });
    
    // Mark attributes as needing update
    if (pointsRef.current.geometry) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      if (pointsRef.current.geometry.attributes.size) {
        pointsRef.current.geometry.attributes.size.needsUpdate = true;
      }
      if (pointsRef.current.geometry.attributes.color) {
        pointsRef.current.geometry.attributes.color.needsUpdate = true;
      }
    }
  });
  
  return (
    <Points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length}
          array={positionsRef.current}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particles.length}
          array={sizesRef.current}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.length}
          array={colorsRef.current}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        size={0.05}
        transparent
        vertexColors
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  );
}

// Main Interactive Particle Field Component
export default function InteractiveParticleField({
  particleCount = 150,
  className = "",
  bounds = 4,
  scrollProgress = 0
}: {
  particleCount?: number;
  className?: string;
  bounds?: number;
  scrollProgress?: number;
}) {
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  
  const particles = useMemo(() => 
    generateParticles(particleCount, bounds), 
    [particleCount, bounds]
  );
  
  const handleMouseMove = (event: React.MouseEvent) => {
    mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };
  
  return (
    <div 
      className={`w-full h-full ${className}`}
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ 
          position: [0, 0, 5], 
          fov: 75,
          near: 0.1,
          far: 100 
        }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        {/* Subtle ambient lighting */}
        <ambientLight intensity={0.2} />
        
        {/* Interactive particle field */}
        <ParticleField 
          particles={particles}
          mousePosition={mouseRef.current}
          scrollProgress={scrollProgress}
        />
        
        {/* Background atmosphere */}
        <mesh>
          <sphereGeometry args={[15, 32, 32]} />
          <meshBasicMaterial
            color="#000033"
            transparent
            opacity={0.05}
            side={THREE.BackSide}
          />
        </mesh>
      </Canvas>
    </div>
  );
}