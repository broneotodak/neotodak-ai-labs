'use client';

import React, { Suspense, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { FloatingNav } from '@/components/aceternity/floating-navbar';
import { motion } from 'framer-motion';
import { IconHome, IconMessage, IconUser, IconBriefcase, IconCode, IconRocket, IconBrain, IconSparkles } from '@tabler/icons-react';

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

// Dynamic import for 3D scene
const Homepage3DScene = dynamic(() => import('@/components/homepage-3d-scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-black via-purple-900/20 to-black">
      <div className="text-2xl text-purple-400 animate-pulse">Loading 3D Experience...</div>
    </div>
  )
});

// Interactive Project Card
function ProjectCard({ title, description, icon, delay, link }: any) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={link}>
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
          <div className="relative bg-black/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300">
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-400">{description}</p>
            <div className="mt-4 text-cyan-400 flex items-center gap-2">
              Explore <span className="group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <FloatingNav navItems={navItems} />
      
      {/* Hero Section with 3D Background */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <Homepage3DScene />
        </div>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                NEO TODAK
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Creative Technologist & AI Systems Architect
            </p>
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
        <div className="max-w-7xl mx-auto">
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
              {['Claude', 'n8n', 'Next.js', 'Supabase', 'LangChain', 'Three.js', 'Python', 'Docker'].map((tech, i) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black/50 backdrop-blur-xl border border-gray-800 rounded-xl p-4 hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="text-lg font-semibold text-purple-400">{tech}</div>
                </motion.div>
              ))}
            </div>
            
            <Link href="/tech-stack" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
              Explore full tech stack <span>→</span>
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
    </div>
  );
}