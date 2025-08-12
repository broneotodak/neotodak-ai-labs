'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame, Canvas } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

interface ConnectionNode {
  position: THREE.Vector3;
  id: number;
  connections: number[];
}

// Generate network of connection nodes
function generateNetworkNodes(count: number, bounds: number = 4): ConnectionNode[] {
  const nodes: ConnectionNode[] = [];
  
  for (let i = 0; i < count; i++) {
    const position = new THREE.Vector3(
      (Math.random() - 0.5) * bounds,
      (Math.random() - 0.5) * bounds,
      (Math.random() - 0.5) * bounds
    );
    
    nodes.push({
      position,
      id: i,
      connections: []
    });
  }
  
  // Create connections between nearby nodes
  nodes.forEach((node, i) => {
    nodes.forEach((otherNode, j) => {
      if (i !== j && node.position.distanceTo(otherNode.position) < 2) {
        if (Math.random() < 0.3) { // 30% chance of connection
          node.connections.push(j);
        }
      }
    });
  });
  
  return nodes;
}

function NetworkLines({ nodes, mousePosition }: { 
  nodes: ConnectionNode[]; 
  mousePosition: THREE.Vector2;
}) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    
    const time = clock.getElapsedTime();
    
    // Animate network pulsing
    groupRef.current.children.forEach((line, i) => {
      if (line instanceof THREE.Line) {
        const material = line.material as THREE.LineBasicMaterial;
        material.opacity = 0.2 + Math.sin(time * 3 + i * 0.5) * 0.3;
        
        // Mouse interaction - brighten nearby lines
        const mouseDistance = Math.abs(mousePosition.x) + Math.abs(mousePosition.y);
        material.opacity *= 1 + (1 - mouseDistance) * 0.5;
      }
    });
    
    // Subtle rotation
    groupRef.current.rotation.y = time * 0.05;
  });
  
  return (
    <group ref={groupRef}>
      {nodes.map((node, i) =>
        node.connections.map((connectionId, j) => {
          const targetNode = nodes[connectionId];
          if (!targetNode) return null;
          
          return (
            <Line
              key={`${i}-${j}`}
              points={[node.position, targetNode.position]}
              color="#00ffff"
              lineWidth={1}
              transparent
              opacity={0.3}
            />
          );
        })
      )}
    </group>
  );
}

function FloatingNodes({ nodes }: { nodes: ConnectionNode[] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock, mouse }) => {
    if (!groupRef.current) return;
    
    const time = clock.getElapsedTime();
    
    groupRef.current.children.forEach((mesh, i) => {
      if (mesh instanceof THREE.Mesh) {
        // Floating animation
        mesh.position.y += Math.sin(time * 2 + i) * 0.001;
        mesh.position.x += Math.cos(time * 1.5 + i) * 0.0005;
        
        // Mouse attraction
        const mouseInfluence = 0.1;
        mesh.position.x += mouse.x * mouseInfluence * 0.01;
        mesh.position.z += mouse.y * mouseInfluence * 0.01;
        
        // Pulsing glow
        const material = mesh.material as THREE.MeshBasicMaterial;
        material.opacity = 0.6 + Math.sin(time * 4 + i) * 0.2;
      }
    });
  });
  
  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial
            color="#00ffff"
            transparent
            opacity={0.7}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

// Main Connection Lines Component
export default function ConnectionLines({
  nodeCount = 15,
  className = "",
  bounds = 3
}: {
  nodeCount?: number;
  className?: string;
  bounds?: number;
}) {
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  
  const nodes = useMemo(() => 
    generateNetworkNodes(nodeCount, bounds), 
    [nodeCount, bounds]
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
          position: [0, 0, 6], 
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
        {/* Subtle lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={0.3} color="#00ffff" />
        
        {/* Network connections */}
        <NetworkLines nodes={nodes} mousePosition={mouseRef.current} />
        
        {/* Floating nodes */}
        <FloatingNodes nodes={nodes} />
        
        {/* Background particles */}
        <mesh>
          <sphereGeometry args={[20, 32, 32]} />
          <meshBasicMaterial
            color="#001133"
            transparent
            opacity={0.02}
            side={THREE.BackSide}
          />
        </mesh>
      </Canvas>
    </div>
  );
}