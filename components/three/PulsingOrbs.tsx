'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame, Canvas } from '@react-three/fiber';
import * as THREE from 'three';

// Custom shader material for glowing orbs
const orbVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const orbFragmentShader = `
  uniform float time;
  uniform vec3 color1;
  uniform vec3 color2;
  uniform float intensity;
  uniform float pulse;
  
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  
  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    
    // Fresnel effect for edge glow
    float fresnel = pow(1.0 - dot(normal, viewDir), 2.0);
    
    // Pulsing color blend
    vec3 color = mix(color1, color2, sin(time + pulse) * 0.5 + 0.5);
    
    // Add rim lighting effect
    float rim = 1.0 - dot(viewDir, normal);
    rim = smoothstep(0.6, 1.0, rim);
    
    // Final color with intensity and glow
    vec3 finalColor = color * (fresnel * intensity + rim * 0.5);
    
    gl_FragColor = vec4(finalColor, fresnel * 0.8);
  }
`;

interface OrbData {
  position: THREE.Vector3;
  scale: number;
  speed: number;
  phase: number;
  color1: THREE.Color;
  color2: THREE.Color;
}

function generateOrbs(count: number): OrbData[] {
  const orbs: OrbData[] = [];
  
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const radius = 2 + Math.random() * 3;
    
    orbs.push({
      position: new THREE.Vector3(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 4,
        Math.sin(angle) * radius
      ),
      scale: 0.3 + Math.random() * 0.7,
      speed: 0.5 + Math.random() * 1.5,
      phase: Math.random() * Math.PI * 2,
      color1: new THREE.Color().setHSL(0.5 + Math.random() * 0.3, 0.8, 0.6),
      color2: new THREE.Color().setHSL(0.6 + Math.random() * 0.2, 0.9, 0.8)
    });
  }
  
  return orbs;
}

function Orb({ orbData, time }: { orbData: OrbData; time: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: orbData.color1 },
        color2: { value: orbData.color2 },
        intensity: { value: 1.5 },
        pulse: { value: orbData.phase }
      },
      vertexShader: orbVertexShader,
      fragmentShader: orbFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
  }, [orbData]);
  
  useFrame(() => {
    if (!meshRef.current) return;
    
    // Update material uniforms
    material.uniforms.time.value = time;
    
    // Floating animation
    meshRef.current.position.y = orbData.position.y + Math.sin(time * orbData.speed + orbData.phase) * 0.5;
    meshRef.current.position.x = orbData.position.x + Math.cos(time * orbData.speed * 0.7 + orbData.phase) * 0.3;
    
    // Scale pulsing
    const pulseScale = 1 + Math.sin(time * orbData.speed * 2 + orbData.phase) * 0.2;
    meshRef.current.scale.setScalar(orbData.scale * pulseScale);
    
    // Slow rotation
    meshRef.current.rotation.x = time * 0.1;
    meshRef.current.rotation.y = time * 0.15;
  });
  
  return (
    <mesh ref={meshRef} position={orbData.position} material={material}>
      <sphereGeometry args={[1, 32, 32]} />
    </mesh>
  );
}

function InnerOrbs({ orbs, time }: { orbs: OrbData[]; time: number }) {
  return (
    <>
      {orbs.map((orb, i) => (
        <Orb key={i} orbData={orb} time={time} />
      ))}
    </>
  );
}

// Background energy field
function EnergyField() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const fieldMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        opacity: { value: 0.05 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float opacity;
        varying vec2 vUv;
        
        void main() {
          vec2 center = vec2(0.5, 0.5);
          float dist = distance(vUv, center);
          
          // Create ripple effect
          float ripple = sin(dist * 20.0 - time * 3.0) * 0.5 + 0.5;
          float fade = 1.0 - smoothstep(0.0, 0.7, dist);
          
          vec3 color = mix(vec3(0.0, 1.0, 1.0), vec3(1.0, 0.0, 1.0), ripple);
          
          gl_FragColor = vec4(color, opacity * fade * ripple);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
  }, []);
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    fieldMaterial.uniforms.time.value = clock.getElapsedTime();
    meshRef.current.rotation.z = clock.getElapsedTime() * 0.1;
  });
  
  return (
    <mesh ref={meshRef} material={fieldMaterial}>
      <planeGeometry args={[20, 20, 50, 50]} />
    </mesh>
  );
}

// Main Pulsing Orbs Component
export default function PulsingOrbs({
  orbCount = 8,
  className = ""
}: {
  orbCount?: number;
  className?: string;
}) {
  const timeRef = useRef(0);
  
  const orbs = useMemo(() => generateOrbs(orbCount), [orbCount]);
  
  useFrame(({ clock }) => {
    timeRef.current = clock.getElapsedTime();
  });
  
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ 
          position: [0, 0, 8], 
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
        {/* Lighting */}
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 0, 5]} intensity={0.5} color="#00ffff" />
        
        {/* Energy field background */}
        <EnergyField />
        
        {/* Pulsing orbs */}
        <InnerOrbs orbs={orbs} time={timeRef.current} />
        
        {/* Fog for depth */}
        <fog attach="fog" args={['#000000', 8, 15]} />
      </Canvas>
    </div>
  );
}