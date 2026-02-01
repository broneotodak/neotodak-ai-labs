'use client';

import React from 'react';
import Link from 'next/link';
import { type Project } from '@/lib/projects-data';
import { FloatingNav } from '@/components/aceternity/floating-navbar';
import { 
  IconExternalLink, 
  IconBrandGithub, 
  IconBook, 
  IconVideo, 
  IconUsers, 
  IconChartBar, 
  IconApi, 
  IconClock,
  IconArrowLeft,
  IconCode,
  IconBulb,
  IconTarget,
  IconRocket,
  IconLink,
  IconHome,
  IconMessage,
  IconBriefcase
} from '@tabler/icons-react';

const navItems = [
  { name: "Home", link: "/", icon: <IconHome className="h-4 w-4" /> },
  { name: "Projects", link: "/projects", icon: <IconBriefcase className="h-4 w-4" /> },
  { name: "Tech Stack", link: "/tech-stack", icon: <IconCode className="h-4 w-4" /> },
  { name: "Contact", link: "/contact", icon: <IconMessage className="h-4 w-4" /> },
];

interface ProjectPageClientProps {
  project: Project;
  relatedProjects: Project[];
}

// Status colors for light theme
const getStatusStyles = (status: Project['status']) => {
  switch(status) {
    case 'live': return 'bg-green-100 text-green-700 border-green-200';
    case 'beta': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'development': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'archived': return 'bg-gray-100 text-gray-600 border-gray-200';
  }
};

// Complexity dots
const ComplexityDots = ({ level }: { level: number }) => (
  <div className="flex items-center gap-2">
    <span className="text-gray-500 text-sm">Complexity:</span>
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${
            i <= level ? 'bg-gray-900' : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  </div>
);

export default function ProjectPageClient({ project, relatedProjects }: ProjectPageClientProps) {
  return (
    <div className="min-h-screen bg-white">
      <FloatingNav navItems={navItems} />
      
      {/* Header */}
      <header className="pt-32 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Back link */}
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
          >
            <IconArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
          
          {/* Title Row */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{project.icon || '🚀'}</span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                {project.title}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusStyles(project.status)}`}>
                {project.status.toUpperCase()}
              </span>
              <ComplexityDots level={project.complexity} />
            </div>
          </div>
          
          {/* Description */}
          <p className="text-xl text-gray-600 max-w-3xl mb-8">
            {project.longDescription || project.description}
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn-primary"
              >
                <IconExternalLink className="h-4 w-4" />
                Visit Live Site
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn-secondary"
              >
                <IconBrandGithub className="h-4 w-4" />
                View Code
              </a>
            )}
            {project.links.docs && (
              <a
                href={project.links.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn-secondary"
              >
                <IconBook className="h-4 w-4" />
                Documentation
              </a>
            )}
            {project.links.video && (
              <a
                href={project.links.video}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn-secondary"
              >
                <IconVideo className="h-4 w-4" />
                Watch Demo
              </a>
            )}
          </div>
        </div>
      </header>
      
      {/* Tech Stack */}
      <section className="px-6 pb-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <IconCode className="h-5 w-5 text-gray-600" />
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map(tech => (
              <span
                key={tech}
                className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-lg text-gray-700 text-sm hover:border-gray-400 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features, Challenges, Outcomes */}
      <section className="px-6 pb-12 bg-gray-50">
        <div className="max-w-5xl mx-auto py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Highlights */}
            <div className="neo-project-card">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <IconBulb className="h-5 w-5 text-yellow-600" />
                Key Features
              </h3>
              <ul className="neo-list">
                {project.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
            
            {/* Challenges */}
            <div className="neo-project-card">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <IconTarget className="h-5 w-5 text-orange-600" />
                Challenges Solved
              </h3>
              <ul className="neo-list">
                {project.challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </div>
            
            {/* Outcomes */}
            <div className="neo-project-card">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <IconRocket className="h-5 w-5 text-green-600" />
                Outcomes
              </h3>
              <ul className="neo-list">
                {project.outcomes.map((outcome, index) => (
                  <li key={index}>{outcome}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="px-6 pb-12">
          <div className="max-w-5xl mx-auto py-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <IconLink className="h-5 w-5 text-gray-600" />
              Related Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map(relatedProject => (
                <Link
                  key={relatedProject.id}
                  href={`/projects/${relatedProject.id}`}
                  className="group"
                >
                  <div className="neo-project-card h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{relatedProject.icon || '🚀'}</span>
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {relatedProject.title}
                      </h4>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {relatedProject.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Timeline */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="neo-project-card">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Project Timeline</div>
                <div className="text-gray-900 font-medium">
                  Started: {new Date(project.startDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  {project.endDate && ` — Ended: ${new Date(project.endDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`}
                </div>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Category: </span>
                <span className="text-gray-900 capitalize font-medium">{project.category}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-gray-500 text-sm">© 2025 NEOTODAK AI Labs</span>
          <div className="flex items-center gap-6">
            <Link href="/projects" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              All Projects
            </Link>
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
