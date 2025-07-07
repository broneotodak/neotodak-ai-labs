'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FloatingNav } from '@/components/aceternity/floating-navbar';
import { BackgroundBeams } from '@/components/aceternity/background-beams';
import { Spotlight } from '@/components/aceternity/spotlight';
import { TextGenerateEffect } from '@/components/aceternity/text-generate-effect';
import { motion } from 'framer-motion';
import { IconHome, IconMessage, IconBriefcase, IconCode, IconRocket, IconBrain, IconSparkles, IconApi, IconCloud, IconDatabase } from '@tabler/icons-react';

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

// 3D Floating Shapes Component
function FloatingShapes3D() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20 animate-gradient" />
      
      {/* Floating shapes */}
      <div className="absolute inset-0 perspective-1000">
        {/* Cube */}
        <div className="absolute top-20 left-20 animate-float-slow">
          <div className="w-32 h-32 transform-3d animate-rotate-3d">
            <div className="relative w-full h-full transform-style-3d">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-600/30 backdrop-blur-md border border-cyan-500/50 rounded-lg" />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-600/30 backdrop-blur-md border border-cyan-500/50 rounded-lg transform rotate-y-90 translate-z-16" />
            </div>
          </div>
        </div>
        
        {/* Sphere */}
        <div className="absolute top-40 right-32 animate-float-medium">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500/40 to-pink-600/40 rounded-full backdrop-blur-md border border-purple-500/50 animate-pulse-slow shadow-lg shadow-purple-500/50" />
        </div>
        
        {/* Pyramid */}
        <div className="absolute bottom-32 left-40 animate-float-fast">
          <div className="w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-b-[100px] border-b-yellow-500/40 animate-spin-slow" />
        </div>
        
        {/* Torus */}
        <div className="absolute bottom-20 right-20 animate-float-slow">
          <div className="w-28 h-28 rounded-full border-8 border-green-500/40 backdrop-blur-md animate-rotate-3d" />
        </div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-random"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`
            }}
          >
            <div className={`w-2 h-2 bg-gradient-to-br ${i % 3 === 0 ? 'from-cyan-400 to-blue-500' : i % 3 === 1 ? 'from-purple-400 to-pink-500' : 'from-yellow-400 to-orange-500'} rounded-full opacity-60`} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Interactive Project Card
function ProjectCard({ title, description, icon, delay, link }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -10 }}
    >
      <Link href={link}>
        <div className="relative group h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
          <div className="relative bg-black/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 h-full flex flex-col">
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-400 flex-grow">{description}</p>
            <div className="mt-4 text-cyan-400 flex items-center gap-2">
              Explore <span className="group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Tech Stack Card
function TechCard({ name, category, delay }: any) {
  const categoryColors = {
    ai: 'from-cyan-500 to-blue-500',
    framework: 'from-purple-500 to-pink-500',
    database: 'from-green-500 to-emerald-500',
    tool: 'from-orange-500 to-red-500'
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, rotate: 5 }}
      className="relative group"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[category as keyof typeof categoryColors]} rounded-xl blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300`} />
      <div className="relative bg-black/50 backdrop-blur-xl border border-gray-800 rounded-xl p-4 hover:border-purple-500/50 transition-all duration-300">
        <div className="text-lg font-semibold text-purple-400">{name}</div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <FloatingNav navItems={navItems} />
      
      {/* Hero Section with 3D Background */}
      <section className="relative h-screen">
        <FloatingShapes3D />
        <Spotlight className="absolute top-0 left-0 w-full h-full" fill="cyan" />
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
            style={{
              transform: `translate(${mousePos.x * 0.01}px, ${mousePos.y * 0.01}px)`
            }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-gradient-x">
                NEO TODAK
              </span>
            </h1>
            <TextGenerateEffect 
              words="Creative Technologist & AI Systems Architect"
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            />
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              Building the future where AI isn't just a tool — it's a creative partner
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/projects" className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 inline-block">
                  Explore My Work
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/contact" className="px-8 py-4 border-2 border-cyan-500 rounded-full font-semibold hover:bg-cyan-500 hover:text-black transition-all duration-300 inline-block">
                  Let's Connect
                </Link>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-8"
          >
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* What I Do Section */}
      <section className="relative py-32 px-4">
        <BackgroundBeams />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                What I Build
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From AI-powered automation to creative experiments, every project pushes boundaries
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard
              title="AI Systems"
              description="Custom LLMs, vision models, and intelligent automation that actually understands context"
              icon={<IconBrain className="w-10 h-10 text-cyan-400" />}
              delay={0.1}
              link="/projects"
            />
            <ProjectCard
              title="Creative Tools"
              description="Where ancient wisdom meets modern ML - building tools that augment human creativity"
              icon={<IconSparkles className="w-10 h-10 text-purple-400" />}
              delay={0.2}
              link="/projects"
            />
            <ProjectCard
              title="Automation"
              description="n8n workflows, API integrations, and systems that run themselves"
              icon={<IconRocket className="w-10 h-10 text-pink-400" />}
              delay={0.3}
              link="/projects"
            />
            <ProjectCard
              title="APIs & Integration"
              description="RESTful APIs, webhook systems, and seamless third-party integrations"
              icon={<IconApi className="w-10 h-10 text-green-400" />}
              delay={0.4}
              link="/projects"
            />
            <ProjectCard
              title="Cloud Infrastructure"
              description="Scalable architectures on AWS, Docker containers, and edge deployments"
              icon={<IconCloud className="w-10 h-10 text-blue-400" />}
              delay={0.5}
              link="/projects"
            />
            <ProjectCard
              title="Data Systems"
              description="Vector databases, real-time analytics, and intelligent data pipelines"
              icon={<IconDatabase className="w-10 h-10 text-yellow-400" />}
              delay={0.6}
              link="/projects"
            />
          </div>
        </div>
      </section>
      
      {/* Tech Stack Preview */}
      <section className="relative py-32 px-4 bg-gradient-to-b from-black via-purple-900/10 to-black">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                My Tech Universe
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
              A carefully curated ecosystem where every tool has a purpose
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <TechCard name="Claude" category="ai" delay={0.1} />
              <TechCard name="n8n" category="tool" delay={0.15} />
              <TechCard name="Next.js" category="framework" delay={0.2} />
              <TechCard name="Supabase" category="database" delay={0.25} />
              <TechCard name="LangChain" category="ai" delay={0.3} />
              <TechCard name="Three.js" category="framework" delay={0.35} />
              <TechCard name="Python" category="framework" delay={0.4} />
              <TechCard name="Docker" category="tool" delay={0.45} />
            </div>
            
            <Link href="/tech-stack" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group">
              Explore full tech stack <span className="group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-cyan-900/20 to-purple-900/20 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-12"
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Build Something Amazing?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's create AI systems that don't just work — they inspire
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact" className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 inline-block">
                Start a Conversation
              </Link>
              <a href="https://github.com/broneotodak" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border-2 border-purple-500 rounded-full font-semibold hover:bg-purple-500 hover:text-black transition-all duration-300 inline-block">
                View GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-20px) translateX(10px); }
          66% { transform: translateY(20px) translateX(-10px); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(-20px); }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-15px) translateX(15px); }
          50% { transform: translateY(15px) translateX(-15px); }
          75% { transform: translateY(-15px) translateX(-15px); }
        }
        
        @keyframes float-random {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes rotate-3d {
          0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }
        
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        
        @keyframes gradient {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
        .animate-float-random { animation: float-random 15s ease-in-out infinite; }
        .animate-rotate-3d { animation: rotate-3d 20s linear infinite; }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-gradient { animation: gradient 5s ease-in-out infinite; }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .perspective-1000 { perspective: 1000px; }
        .transform-3d { transform-style: preserve-3d; }
        .transform-style-3d { transform-style: preserve-3d; }
        .rotate-y-90 { transform: rotateY(90deg); }
        .translate-z-16 { transform: translateZ(4rem); }
      `}</style>
    </div>
  );
}