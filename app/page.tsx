'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { FloatingNav } from '@/components/aceternity/floating-navbar';
import { BackgroundBeams } from '@/components/aceternity/background-beams';
import { TextGenerateEffect } from '@/components/aceternity/text-generate-effect';
import { motion } from 'framer-motion';
import { IconHome, IconMessage, IconBriefcase, IconCode, IconTerminal2, IconBrain, IconCloud } from '@tabler/icons-react';

const navItems = [
  {
    name: "Home",
    link: "/",
    icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Projects",
    link: "/projects",
    icon: <IconBriefcase className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Tech Stack",
    link: "/tech-stack",
    icon: <IconCode className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Contact",
    link: "/contact",
    icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];

// Minimal 3D Grid Background
function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let time = 0;
    
    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      
      const gridSize = 50;
      const perspective = 800;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw perspective grid
      for (let x = -10; x <= 10; x++) {
        ctx.beginPath();
        for (let z = 0; z <= 20; z++) {
          const x3d = x * gridSize;
          const z3d = z * gridSize - time % gridSize;
          const scale = perspective / (perspective + z3d);
          const x2d = centerX + x3d * scale;
          const y2d = centerY + 200 * scale;
          
          if (z === 0) {
            ctx.moveTo(x2d, y2d);
          } else {
            ctx.lineTo(x2d, y2d);
          }
        }
        ctx.stroke();
      }
      
      // Draw horizontal lines
      for (let z = 0; z <= 20; z++) {
        ctx.beginPath();
        for (let x = -10; x <= 10; x++) {
          const x3d = x * gridSize;
          const z3d = z * gridSize - time % gridSize;
          const scale = perspective / (perspective + z3d);
          const x2d = centerX + x3d * scale;
          const y2d = centerY + 200 * scale;
          
          if (x === -10) {
            ctx.moveTo(x2d, y2d);
          } else {
            ctx.lineTo(x2d, y2d);
          }
        }
        ctx.stroke();
      }
      
      time += 0.5;
      requestAnimationFrame(drawGrid);
    };
    
    drawGrid();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return <canvas ref={canvasRef} className="absolute inset-0 opacity-30" />;
}

// Simple floating orbs
function FloatingOrbs() {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-64 h-64 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(0,255,255,${0.1 - i * 0.03}) 0%, transparent 70%)`,
            filter: 'blur(40px)',
            left: `${20 + i * 30}%`,
            top: `${20 + i * 20}%`,
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <FloatingNav navItems={navItems} />
      
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <GridBackground />
        <FloatingOrbs />
        <BackgroundBeams />
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 font-mono">
              <span className="text-white">NEO</span>
              <span className="text-cyan-400"> TODAK</span>
            </h1>
            <TextGenerateEffect 
              words="Creative Technologist & AI Systems Architect"
              className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto font-light"
            />
            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
              Building intelligent systems with minimalist design
            </p>
            
            <div className="flex flex-wrap gap-6 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/projects" className="px-8 py-3 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 inline-block font-mono">
                  VIEW PROJECTS
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/contact" className="px-8 py-3 border border-gray-600 text-gray-400 hover:border-white hover:text-white transition-all duration-300 inline-block font-mono">
                  CONTACT
                </Link>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Minimal scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-8"
          >
            <div className="w-px h-16 bg-gradient-to-b from-cyan-400 to-transparent" />
          </motion.div>
        </div>
      </section>
      
      {/* What I Do - Minimal Cards */}
      <section className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 font-mono"
          >
            <span className="text-gray-500">WHAT I</span> <span className="text-cyan-400">BUILD</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'AI SYSTEMS', icon: <IconBrain className="w-6 h-6" />, desc: 'Custom LLMs and intelligent automation' },
              { title: 'AUTOMATION', icon: <IconTerminal2 className="w-6 h-6" />, desc: 'Self-running workflows and integrations' },
              { title: 'CLOUD INFRA', icon: <IconCloud className="w-6 h-6" />, desc: 'Scalable architectures and deployments' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href="/projects">
                  <div className="border border-gray-800 p-8 hover:border-cyan-400/50 transition-all duration-300">
                    <div className="text-cyan-400 mb-4">{item.icon}</div>
                    <h3 className="text-xl font-mono mb-2 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Tech Stack - Ultra Minimal */}
      <section className="relative py-32 px-4 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 font-mono"
          >
            <span className="text-gray-500">TECH</span> <span className="text-cyan-400">STACK</span>
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 font-mono text-sm">
            {['CLAUDE', 'N8N', 'NEXT.JS', 'SUPABASE', 'LANGCHAIN', 'PYTHON', 'DOCKER', 'POSTGRES'].map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="border border-gray-800 p-4 text-center hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300 cursor-pointer"
              >
                {tech}
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/tech-stack" className="text-gray-500 hover:text-cyan-400 transition-colors font-mono text-sm">
              VIEW FULL STACK →
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-32 px-4 border-t border-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8 font-mono">
              <span className="text-gray-500">READY TO</span> <span className="text-cyan-400">BUILD?</span>
            </h2>
            <div className="flex gap-6 justify-center">
              <Link href="/contact" className="px-8 py-3 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 inline-block font-mono">
                START A PROJECT
              </Link>
              <a href="https://github.com/broneotodak" target="_blank" rel="noopener noreferrer" className="px-8 py-3 border border-gray-600 text-gray-400 hover:border-white hover:text-white transition-all duration-300 inline-block font-mono">
                GITHUB
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}