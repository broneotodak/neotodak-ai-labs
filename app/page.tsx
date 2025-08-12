'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FloatingNav } from '@/components/aceternity/floating-navbar';
import { BackgroundBeams } from '@/components/aceternity/background-beams';
import { TextGenerateEffect } from '@/components/aceternity/text-generate-effect';
import { IconHome, IconMessage, IconBriefcase, IconCode } from '@tabler/icons-react';

const navItems = [
  { name: "Home", link: "/", icon: <IconHome className="h-4 w-4" /> },
  { name: "Projects", link: "/projects", icon: <IconBriefcase className="h-4 w-4" /> },
  { name: "Tech Stack", link: "/tech-stack", icon: <IconCode className="h-4 w-4" /> },
  { name: "Contact", link: "/contact", icon: <IconMessage className="h-4 w-4" /> },
];

export default function SimplePage() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="min-h-screen bg-black text-white">
      <FloatingNav navItems={navItems} />
      
      <main className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">
            NEOTODAK AI Labs
          </h1>
          
          <TextGenerateEffect 
            words="Building systems where AI isn't just a tool — it's a teammate"
            className="text-xl md:text-2xl text-gray-300 text-center max-w-3xl"
          />
          
          <div className="flex gap-4 mt-12">
            <Link 
              href="/projects"
              prefetch={false}
              className="px-8 py-3 bg-cyan-500/20 border border-cyan-500/50 rounded-lg hover:bg-cyan-500/30 transition-colors"
            >
              View Projects
            </Link>
            <Link 
              href="/contact"
              prefetch={false}
              className="px-8 py-3 bg-purple-500/20 border border-purple-500/50 rounded-lg hover:bg-purple-500/30 transition-colors"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </main>
      
      {isClient && <BackgroundBeams />}
    </div>
  );
}