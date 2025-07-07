'use client';

import React, { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getProjectById, getRelatedProjects, projectsData, type Project } from '@/lib/projects-data';
import { BackgroundBeams } from '@/components/aceternity/background-beams';
import { Spotlight } from '@/components/aceternity/spotlight';
import { TextGenerateEffect } from '@/components/aceternity/text-generate-effect';
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
  IconLink
} from '@tabler/icons-react';

// Required for static export with dynamic routes
export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.id,
  }));
}

export default function ProjectPage() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const projectData = getProjectById(params.slug as string);
    if (!projectData) {
      notFound();
    }
    setProject(projectData);
    setRelatedProjects(getRelatedProjects(params.slug as string));
    setLoading(false);
  }, [params.slug]);

  if (loading || !project) return null;

  // Status color mapping
  const getStatusColor = (status: Project['status']) => {
    switch(status) {
      case 'live': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'beta': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'development': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'archived': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  // Complexity indicator
  const ComplexityIndicator = ({ level }: { level: number }) => (
    <div className="flex items-center gap-2">
      <span className="text-gray-400">Complexity:</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(i => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i <= level ? 'bg-purple-400' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative bg-black">
      <BackgroundBeams />
      <Spotlight className="absolute top-0 left-0 w-full h-full" fill="cyan" />
      
      {/* Back Button */}
      <div className="relative z-20 pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          <Link 
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300 mb-8"
          >
            <IconArrowLeft className="w-5 h-5" />
            <span>Back to Projects</span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-20 px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Title and Status */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <TextGenerateEffect 
                words={project.title}
                className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500"
              />
              <div className="flex items-center gap-4">
                <span className={`px-4 py-2 rounded-full text-sm border font-semibold ${getStatusColor(project.status)}`}>
                  {project.status.toUpperCase()}
                </span>
                <ComplexityIndicator level={project.complexity} />
              </div>
            </div>

            {/* Description */}
            <p className="text-xl text-gray-300 mb-8 max-w-4xl">
              {project.longDescription || project.description}
            </p>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-4 mb-12">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 text-black font-semibold rounded-xl hover:bg-cyan-400 transition-all duration-300 hover:scale-105"
                >
                  <IconExternalLink className="w-5 h-5" />
                  Visit Live Site
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-700 transition-all duration-300 hover:scale-105"
                >
                  <IconBrandGithub className="w-5 h-5" />
                  View Code
                </a>
              )}
              {project.links.docs && (
                <a
                  href={project.links.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-gray-700 text-gray-300 font-semibold rounded-xl hover:border-cyan-500 hover:text-cyan-400 transition-all duration-300"
                >
                  <IconBook className="w-5 h-5" />
                  Documentation
                </a>
              )}
              {project.links.video && (
                <a
                  href={project.links.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-gray-700 text-gray-300 font-semibold rounded-xl hover:border-purple-500 hover:text-purple-400 transition-all duration-300"
                >
                  <IconVideo className="w-5 h-5" />
                  Watch Demo
                </a>
              )}
            </div>

            {/* Metrics Dashboard */}
            {project.metrics && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
              >
                {project.metrics.users && (
                  <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <IconUsers className="w-6 h-6 text-cyan-400" />
                      <span className="text-gray-400">Active Users</span>
                    </div>
                    <div className="text-3xl font-bold text-white">
                      {project.metrics.users.toLocaleString()}
                    </div>
                  </div>
                )}
                {project.metrics.uptime && (
                  <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <IconChartBar className="w-6 h-6 text-green-400" />
                      <span className="text-gray-400">Uptime</span>
                    </div>
                    <div className="text-3xl font-bold text-white">
                      {project.metrics.uptime}%
                    </div>
                  </div>
                )}
                {project.metrics.apiCalls && (
                  <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <IconApi className="w-6 h-6 text-purple-400" />
                      <span className="text-gray-400">API Calls</span>
                    </div>
                    <div className="text-3xl font-bold text-white">
                      {(project.metrics.apiCalls / 1000).toFixed(0)}K
                    </div>
                  </div>
                )}
                {project.metrics.lastUpdated && (
                  <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <IconClock className="w-6 h-6 text-orange-400" />
                      <span className="text-gray-400">Last Updated</span>
                    </div>
                    <div className="text-xl font-bold text-white">
                      {new Date(project.metrics.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <IconCode className="w-6 h-6 text-cyan-400" />
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.techStack.map(tech => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-300 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Key Features, Challenges, and Outcomes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <IconBulb className="w-6 h-6 text-yellow-400" />
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span className="text-gray-300">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Challenges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <IconTarget className="w-6 h-6 text-orange-400" />
                  Challenges Solved
                </h3>
                <ul className="space-y-2">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      <span className="text-gray-300">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Outcomes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <IconRocket className="w-6 h-6 text-green-400" />
                  Outcomes
                </h3>
                <ul className="space-y-2">
                  {project.outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span className="text-gray-300">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <IconLink className="w-6 h-6 text-purple-400" />
                  Related Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedProjects.map(relatedProject => (
                    <Link
                      key={relatedProject.id}
                      href={`/projects/${relatedProject.id}`}
                      className="group"
                    >
                      <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300">
                        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                          {relatedProject.title}
                        </h4>
                        <p className="text-gray-400 text-sm line-clamp-2">
                          {relatedProject.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-400 mb-1">Project Timeline</div>
                  <div className="text-white">
                    Started: {new Date(project.startDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    {project.endDate && ` - Ended: ${new Date(project.endDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`}
                  </div>
                </div>
                <div className="text-gray-400">
                  Category: <span className="text-white capitalize">{project.category}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}