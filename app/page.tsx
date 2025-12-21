'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FloatingNav } from '@/components/aceternity/floating-navbar';
import { TextGenerateEffect } from '@/components/aceternity/text-generate-effect';
import { IconHome, IconMessage, IconBriefcase, IconCode, IconArrowRight, IconBrandGithub, IconExternalLink } from '@tabler/icons-react';
import { projectsData, getFeaturedProjects, getProjectStats } from '@/lib/projects-data';

const navItems = [
  { name: "Home", link: "/", icon: <IconHome className="h-4 w-4" /> },
  { name: "Projects", link: "/projects", icon: <IconBriefcase className="h-4 w-4" /> },
  { name: "Tech Stack", link: "/tech-stack", icon: <IconCode className="h-4 w-4" /> },
  { name: "Contact", link: "/contact", icon: <IconMessage className="h-4 w-4" /> },
];

// Featured project card component
function ProjectCard({ project, index }: { project: any; index: number }) {
  return (
    <div 
      className="neo-project-card group opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${0.1 + index * 0.1}s` }}
    >
      {/* Icon */}
      <div className="text-4xl mb-4">{project.icon || '🚀'}</div>
      
      {/* Title & Status */}
      <div className="flex items-center gap-3 mb-3">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-accent-500 transition-colors">
          {project.title}
        </h3>
        <span className={`neo-badge ${project.status === 'live' ? 'neo-badge-primary' : ''}`}>
          {project.status}
        </span>
      </div>
      
      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {project.description}
      </p>
      
      {/* Tech Stack Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.techStack.slice(0, 4).map((tech: string) => (
          <span key={tech} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">
            {tech}
          </span>
        ))}
        {project.techStack.length > 4 && (
          <span className="text-xs px-2 py-1 text-gray-500">
            +{project.techStack.length - 4} more
          </span>
        )}
      </div>
      
      {/* Links */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        {project.links.live && (
          <a 
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white hover:text-accent-500 transition-colors"
          >
            <IconExternalLink className="h-4 w-4" />
            Live Site
          </a>
        )}
        {project.links.github && (
          <a 
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <IconBrandGithub className="h-4 w-4" />
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}

// Stats component
function StatsSection() {
  const stats = getProjectStats();
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 border-y border-gray-200 dark:border-gray-800">
      {[
        { label: 'Live Projects', value: stats.liveProjects },
        { label: 'Total Projects', value: stats.totalProjects },
        { label: 'Active Users', value: `${(stats.totalUsers / 1000).toFixed(1)}K+` },
        { label: 'API Calls/Month', value: `${(stats.totalApiCalls / 1000).toFixed(0)}K+` },
      ].map((stat, i) => (
        <div key={stat.label} className="text-center opacity-0 animate-fade-in-up" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
          <div className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
            {stat.value}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const [isClient, setIsClient] = useState(false);
  const featuredProjects = getFeaturedProjects().slice(0, 6);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white relative transition-colors duration-300">
      <FloatingNav navItems={navItems} />
      
      {/* Hero Section */}
      <section className="neo-hero min-h-[85vh] flex flex-col items-center justify-center text-center px-6">
        {/* Tagline */}
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <span className="neo-tagline-decorated text-gray-600 dark:text-gray-400">
            AI-First Development
          </span>
        </div>
        
        {/* Main Title */}
        <h1 className="neo-hero-title mt-8 mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          NEOTODAK AI Labs
        </h1>
        
        {/* Subtitle */}
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          {isClient ? (
            <TextGenerateEffect 
              words="Building systems where AI isn't just a tool — it's a teammate"
              className="neo-hero-subtitle max-w-2xl"
            />
          ) : (
            <p className="neo-hero-subtitle max-w-2xl">
              Building systems where AI isn&apos;t just a tool — it&apos;s a teammate
            </p>
          )}
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Link href="/projects" className="neo-btn-primary">
            View Projects
            <IconArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/contact" className="neo-btn-secondary">
            Get in Touch
          </Link>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-700 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" />
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-6">
        <StatsSection />
      </section>
      
      {/* Featured Projects Section */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="neo-section-header mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Featured Projects
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/projects" className="neo-btn-secondary inline-flex items-center gap-2">
            View All Projects
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
      
      {/* About/Philosophy Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Philosophy
          </h2>
          <blockquote className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-light italic leading-relaxed">
            &ldquo;The best AI systems don&apos;t replace human thinking — they amplify it. 
            Every project I build is designed to make teams smarter, faster, and more creative.&rdquo;
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-2xl">
              🧠
            </div>
            <div className="text-left">
              <div className="font-bold text-gray-900 dark:text-white">Neo Todak</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">AI Systems Architect</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Ready to build something amazing?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Whether you need an AI-powered system, automation workflows, or custom development — let&apos;s talk.
        </p>
        <Link href="/contact" className="neo-btn-primary">
          Start a Conversation
          <IconArrowRight className="h-4 w-4" />
        </Link>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-gray-600 dark:text-gray-400">
              © 2025 NEOTODAK AI Labs. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <a 
                href="https://github.com/broneotodak" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <IconBrandGithub className="h-5 w-5" />
              </a>
              <Link href="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
