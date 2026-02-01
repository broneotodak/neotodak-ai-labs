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

// Status colors with dark mode support
const getStatusStyles = (status: Project['status']) => {
  switch(status) {
    case 'live': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800';
    case 'beta': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
    case 'development': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800';
    case 'archived': return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700';
  }
};

// Complexity dots with dark mode
const ComplexityDots = ({ level }: { level: number }) => (
  <div className="flex items-center gap-2">
    <span className="text-gray-500 dark:text-gray-400 text-sm">Complexity:</span>
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${
            i <= level ? 'bg-gray-900 dark:bg-white' : 'bg-gray-300 dark:bg-gray-600'
          }`}
        />
      ))}
    </div>
  </div>
);

export default function ProjectPageClient({ project, relatedProjects }: ProjectPageClientProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <FloatingNav navItems={navItems} />

      {/* Header */}
      <header className="pt-32 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Back link */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
          >
            <IconArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          {/* Title Row */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{project.icon || '🚀'}</span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
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
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mb-8">
            {project.longDescription || project.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
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
                className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-medium rounded-lg border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
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
                className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-medium rounded-lg border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
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
                className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-medium rounded-lg border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
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
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <IconCode className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map(tech => (
              <span
                key={tech}
                className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 text-sm hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features, Challenges, Outcomes */}
      <section className="px-6 pb-12 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-5xl mx-auto py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Highlights */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <IconBulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                Key Features
              </h3>
              <ul className="space-y-2">
                {project.highlights.map((highlight, index) => (
                  <li key={index} className="text-gray-600 dark:text-gray-400 text-sm flex items-start gap-2">
                    <span className="text-gray-400 dark:text-gray-500">•</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenges */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <IconTarget className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                Challenges Solved
              </h3>
              <ul className="space-y-2">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="text-gray-600 dark:text-gray-400 text-sm flex items-start gap-2">
                    <span className="text-gray-400 dark:text-gray-500">•</span>
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>

            {/* Outcomes */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <IconRocket className="h-5 w-5 text-green-600 dark:text-green-400" />
                Outcomes
              </h3>
              <ul className="space-y-2">
                {project.outcomes.map((outcome, index) => (
                  <li key={index} className="text-gray-600 dark:text-gray-400 text-sm flex items-start gap-2">
                    <span className="text-gray-400 dark:text-gray-500">•</span>
                    {outcome}
                  </li>
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
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <IconLink className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              Related Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map(relatedProject => (
                <Link
                  key={relatedProject.id}
                  href={`/projects/${relatedProject.id}`}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 h-full hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{relatedProject.icon || '🚀'}</span>
                      <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {relatedProject.title}
                      </h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
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
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-500 mb-1">Project Timeline</div>
                <div className="text-gray-900 dark:text-white font-medium">
                  Started: {new Date(project.startDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  {project.endDate && ` — Ended: ${new Date(project.endDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`}
                </div>
              </div>
              <div className="text-sm">
                <span className="text-gray-500 dark:text-gray-500">Category: </span>
                <span className="text-gray-900 dark:text-white capitalize font-medium">{project.category}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-500 text-sm">© 2025 NEOTODAK AI Labs</span>
          <div className="flex items-center gap-6">
            <Link href="/projects" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              All Projects
            </Link>
            <Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
