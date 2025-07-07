'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

// Tech stack nodes with categories and connections
const techNodes = [
  // AI/ML Core
  { id: 'claude', name: 'Claude', category: 'ai', position: [0, 2, 0], color: '#00d4ff' },
  { id: 'gpt4', name: 'GPT-4', category: 'ai', position: [2, 2, 0], color: '#00d4ff' },
  { id: 'gemma', name: 'Gemma', category: 'ai', position: [-2, 2, 0], color: '#00d4ff' },
  { id: 'llava', name: 'LLaVA', category: 'ai', position: [0, 2, 2], color: '#00d4ff' },
  
  // Orchestration
  { id: 'langchain', name: 'LangChain', category: 'orchestration', position: [0, 0, 0], color: '#8b5cf6' },
  { id: 'n8n', name: 'n8n', category: 'orchestration', position: [2, 0, 0], color: '#8b5cf6' },
  
  // Data & Storage
  { id: 'supabase', name: 'Supabase', category: 'data', position: [0, -2, 0], color: '#10b981' },
  { id: 'pgvector', name: 'pgvector', category: 'data', position: [2, -2, 0], color: '#10b981' },
  { id: 'postgres', name: 'PostgreSQL', category: 'data', position: [-2, -2, 0], color: '#10b981' },
  
  // Frontend
  { id: 'nextjs', name: 'Next.js', category: 'frontend', position: [4, 1, 0], color: '#f59e0b' },
  { id: 'react', name: 'React', category: 'frontend', position: [4, -1, 0], color: '#f59e0b' },
  { id: 'tailwind', name: 'Tailwind', category: 'frontend', position: [4, 0, 1], color: '#f59e0b' },
  
  // Backend
  { id: 'python', name: 'Python', category: 'backend', position: [-4, 1, 0], color: '#ef4444' },
  { id: 'nodejs', name: 'Node.js', category: 'backend', position: [-4, -1, 0], color: '#ef4444' },
  { id: 'fastapi', name: 'FastAPI', category: 'backend', position: [-4, 0, 1], color: '#ef4444' },
  
  // Infrastructure
  { id: 'docker', name: 'Docker', category: 'infra', position: [0, 0, -3], color: '#6366f1' },
  { id: 'vercel', name: 'Vercel', category: 'infra', position: [2, 0, -3], color: '#6366f1' },
  { id: 'runpod', name: 'RunPod', category: 'infra', position: [-2, 0, -3], color: '#6366f1' },
];

// Connections between technologies
const connections = [
  // AI to Orchestration
  ['claude', 'langchain'],
  ['gpt4', 'langchain'],
  ['gemma', 'langchain'],
  ['llava', 'langchain'],
  ['langchain', 'n8n'],
  
  // Orchestration to Data
  ['langchain', 'supabase'],
  ['n8n', 'supabase'],
  ['supabase', 'pgvector'],
  ['supabase', 'postgres'],
  
  // Frontend connections
  ['nextjs', 'react'],
  ['react', 'tailwind'],
  ['nextjs', 'supabase'],
  
  // Backend connections
  ['python', 'fastapi'],
  ['nodejs', 'n8n'],
  ['python', 'langchain'],
  
  // Infrastructure
  ['docker', 'python'],
  ['docker', 'nodejs'],
  ['vercel', 'nextjs'],
  ['runpod', 'python'],
];

interface TechNodeProps {
  node: typeof techNodes[0];
  onHover: (name: string | null) => void;
}

function TechNode({ node, onHover }: TechNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      if (hovered) {
        meshRef.current.scale.x = meshRef.current.scale.y = meshRef.current.scale.z = 1.2;
      } else {
        meshRef.current.scale.x = meshRef.current.scale.y = meshRef.current.scale.z = 1;
      }
    }
  });
  
  return (
    <group position={node.position as [number, number, number]}>
      <Sphere
        ref={meshRef}
        args={[0.3, 32, 32]}
        onPointerOver={() => {
          setHovered(true);
          onHover(node.name);
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
        }}
      >
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          metalness={0.5}
          roughness={0.5}
        />
      </Sphere>
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {node.name}
      </Text>
    </group>
  );
}

function ConnectionLines() {
  const lines = useMemo(() => {
    return connections.map(([from, to]) => {
      const fromNode = techNodes.find(n => n.id === from);
      const toNode = techNodes.find(n => n.id === to);
      if (!fromNode || !toNode) return null;
      
      return {
        points: [
          new THREE.Vector3(...fromNode.position),
          new THREE.Vector3(...toNode.position)
        ],
        color: '#4b5563'
      };
    }).filter(Boolean);
  }, []);
  
  return (
    <>
      {lines.map((line, i) => (
        <Line
          key={i}
          points={line!.points}
          color={line!.color}
          lineWidth={1}
          opacity={0.3}
          transparent
        />
      ))}
    </>
  );
}

export default function TechStack3D() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  
  return (
    <div className="relative w-full h-[600px]">
      <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxDistance={15}
          minDistance={5}
        />
        
        <ConnectionLines />
        
        {techNodes.map(node => (
          <TechNode
            key={node.id}
            node={node}
            onHover={setHoveredTech}
          />
        ))}
      </Canvas>
      
      {/* Hover Info */}
      {hoveredTech && (
        <div className="absolute top-4 left-4 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
          <div className="text-cyan-400 font-bold">{hoveredTech}</div>
          <div className="text-gray-400 text-sm">Click and drag to rotate</div>
        </div>
      )}
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
        <div className="text-white font-bold mb-2">Tech Categories</div>
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
            <span className="text-gray-300">AI/ML Models</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-gray-300">Orchestration</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-300">Data & Storage</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-gray-300">Frontend</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-gray-300">Backend</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
            <span className="text-gray-300">Infrastructure</span>
          </div>
        </div>
      </div>
    </div>
  );
}