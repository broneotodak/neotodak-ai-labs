'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FloatingNav } from '@/components/aceternity/floating-navbar';
import { BackgroundBeams } from '@/components/aceternity/background-beams';
import { TextGenerateEffect } from '@/components/aceternity/text-generate-effect';
import { useAnalytics } from '@/lib/analytics/use-analytics';
import { motion, useScroll, useTransform } from 'framer-motion';
import { IconHome, IconMessage, IconBriefcase, IconCode, IconTerminal2, IconBrain, IconCloud } from '@tabler/icons-react';
import FlowStateWidget from '@/components/integrations/FlowStateWidget';

// 3D Components
import AnimatedDNAHelix from '@/components/three/AnimatedDNAHelix';
import ConnectionLines from '@/components/three/ConnectionLines';
import PulsingOrbs from '@/components/three/PulsingOrbs';
import TypewriterGlow from '@/components/three/TypewriterGlow';
import AnimatedGradientBg from '@/components/three/AnimatedGradientBg';
import InteractiveParticleField from '@/components/three/InteractiveParticleField';
import { PerformanceDebugger, getDeviceQuality, getResponsiveSettings } from '@/components/three/PerformanceOptimizer';

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
  const analytics = useAnalytics();
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [deviceQuality] = useState(() => getDeviceQuality());
  const [responsiveSettings] = useState(() => getResponsiveSettings());
  
  // Transform scroll progress for 3D components
  const helixRotation = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  // Performance-optimized settings
  const performanceSettings = {
    particleCount: deviceQuality === 'low' ? 30 : deviceQuality === 'medium' ? 75 : responsiveSettings.particleCount,
    orbCount: deviceQuality === 'low' ? 3 : 6,
    nodeCount: deviceQuality === 'low' ? 6 : 12,
    enableAdvancedEffects: deviceQuality !== 'low' && responsiveSettings.enableAdvancedEffects
  };
  
  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div className="min-h-screen bg-black text-white relative">
      <FloatingNav navItems={navItems} />
      
      {/* Animated Background */}
      <AnimatedGradientBg className="fixed inset-0 z-0" />
      
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* 3D DNA Helix - positioned on the right */}
        <div className="absolute right-0 top-0 w-1/3 h-full z-20">
          <AnimatedDNAHelix 
            scrollProgress={helixRotation.get()} 
            className="opacity-80"
          />
        </div>
        
        {/* Pulsing Orbs around hero section */}
        {performanceSettings.enableAdvancedEffects && (
          <div className="absolute inset-0 z-10">
            <PulsingOrbs orbCount={performanceSettings.orbCount} />
          </div>
        )}
        
        {/* Connection Lines - subtle background effect */}
        <div className="absolute inset-0 z-5">
          <ConnectionLines 
            nodeCount={performanceSettings.nodeCount} 
            bounds={responsiveSettings.bounds} 
            className="opacity-60" 
          />
        </div>
        
        {/* Interactive Particle Field */}
        <div className="absolute inset-0 z-15">
          <InteractiveParticleField 
            particleCount={performanceSettings.particleCount} 
            bounds={responsiveSettings.bounds} 
            scrollProgress={helixRotation.get()}
            className="opacity-70"
          />
        </div>
        
        <GridBackground />
        <FloatingOrbs />
        <BackgroundBeams />
        
        <div className="relative z-30 h-full flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center"
          >
            {/* Enhanced title with typewriter effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mb-6"
            >
              <TypewriterGlow
                text="NEOTODAK"
                className="text-6xl md:text-8xl font-bold font-mono"
                delay={1000}
                speed={150}
                glowColor="#00ffff"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2 }}
            >
              <TextGenerateEffect 
                words="Creative Technologist & AI Systems Architect"
                className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto font-light"
              />
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.5 }}
              className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto"
            >
              Building intelligent systems with minimalist design
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 3 }}
              className="flex flex-wrap gap-6 justify-center"
            >
              <motion.div 
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 20px #00ffff80"
                }} 
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/projects" 
                  className="px-8 py-3 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 inline-block font-mono relative overflow-hidden group"
                  onClick={() => analytics.trackNavigation('/projects', 'hero_cta')}
                  style={{
                    boxShadow: "0 0 10px #00ffff40"
                  }}
                >
                  <span className="relative z-10">VIEW PROJECTS</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Link>
              </motion.div>
              <motion.div 
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 20px #ffffff40"
                }} 
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/contact" 
                  className="px-8 py-3 border border-gray-600 text-gray-400 hover:border-white hover:text-white transition-all duration-300 inline-block font-mono relative overflow-hidden group"
                  onClick={() => analytics.trackNavigation('/contact', 'hero_cta')}
                >
                  <span className="relative z-10">CONTACT</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Link>
              </motion.div>
            </motion.div>
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
      
      {/* What I Do - Enhanced Cards with 3D Effects */}
      <section className="relative py-32 px-4">
        {/* Background Connection Lines for this section */}
        <div className="absolute inset-0 z-0">
          <ConnectionLines nodeCount={8} bounds={2} className="opacity-30" />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 font-mono"
          >
            <TypewriterGlow
              text="WHAT I BUILD"
              className="text-4xl font-bold font-mono"
              delay={0}
              speed={100}
              glowColor="#00ffff"
            />
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              { title: 'AI SYSTEMS', icon: <IconBrain className="w-6 h-6" />, desc: 'Custom LLMs and intelligent automation', color: '#00ffff' },
              { title: 'AUTOMATION', icon: <IconTerminal2 className="w-6 h-6" />, desc: 'Self-running workflows and integrations', color: '#ff00ff' },
              { title: 'CLOUD INFRA', icon: <IconCloud className="w-6 h-6" />, desc: 'Scalable architectures and deployments', color: '#00ff88' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  delay: i * 0.2, 
                  duration: 0.8,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                className="group relative"
                style={{ perspective: "1000px" }}
              >
                <Link 
                  href="/projects"
                  onClick={() => analytics.trackNavigation('/projects', `service_card_${item.title.toLowerCase().replace(' ', '_')}`)}
                >
                  <motion.div 
                    className="border border-gray-800 p-8 hover:border-cyan-400/50 transition-all duration-500 relative overflow-hidden bg-black/40 backdrop-blur-sm"
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: 5,
                      boxShadow: `0 10px 30px ${item.color}20`,
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Glowing background effect */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at center, ${item.color}40, transparent 70%)`
                      }}
                    />
                    
                    {/* Animated border glow */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(45deg, transparent, ${item.color}20, transparent)`,
                        animation: 'borderGlow 2s linear infinite'
                      }}
                    />
                    
                    <div className="relative z-10">
                      <motion.div 
                        className="text-cyan-400 mb-4"
                        whileHover={{ 
                          scale: 1.2, 
                          rotate: 360,
                          color: item.color
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {item.icon}
                      </motion.div>
                      <h3 className="text-xl font-mono mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm group-hover:text-gray-300 transition-colors duration-300">
                        {item.desc}
                      </p>
                    </div>
                    
                    {/* Particle effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {[...Array(5)].map((_, particleI) => (
                        <motion.div
                          key={particleI}
                          className="absolute w-1 h-1 rounded-full"
                          style={{
                            backgroundColor: item.color,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                          initial={{ scale: 0, opacity: 0 }}
                          whileInView={{ 
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                            y: [0, -20, -40]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: particleI * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
            
            {/* Connecting lines between cards */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <motion.line
                x1="33%" y1="50%" x2="66%" y2="50%"
                stroke="#00ffff"
                strokeWidth="1"
                opacity="0.3"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
            </svg>
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
      
      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes borderGlow {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(200%) translateY(200%) rotate(45deg); }
        }
        
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
        
        @keyframes matrixRain {
          0% { transform: translateY(-100vh); opacity: 0; }
          10%, 90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
      
      {/* Performance Debugger (development only) */}
      <PerformanceDebugger />
      
      {/* FlowState Widget - Floating Activity Monitor */}
      <FlowStateWidget />
    </div>
  );
}