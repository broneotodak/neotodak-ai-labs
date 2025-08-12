'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { projectsData, getProjectStats, type Project } from '@/lib/projects-data';
import { useAnalytics } from '@/lib/analytics/use-analytics';
import { BackgroundBeams } from '@/components/aceternity/background-beams';
import { TextGenerateEffect } from '@/components/aceternity/text-generate-effect';
import { IconExternalLink, IconBrandGithub, IconBook, IconVideo, IconChartBar, IconClock, IconUsers, IconApi, IconFilter, IconX, IconArrowLeft } from '@tabler/icons-react';

// Filter categories
const categories = ['all', 'ai', 'automation', 'saas', 'tool', 'integration', 'research'] as const;
const statuses = ['all', 'live', 'beta', 'development', 'archived'] as const;
const complexities = ['all', '1', '2', '3', '4', '5'] as const;

export default function ProjectsPage() {
  const analytics = useAnalytics();
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('all');
  const [selectedStatus, setSelectedStatus] = useState<typeof statuses[number]>('all');
  const [selectedComplexity, setSelectedComplexity] = useState<typeof complexities[number]>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(true);

  const stats = getProjectStats();

  // Filter projects based on selections
  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
      const matchesComplexity = selectedComplexity === 'all' || project.complexity.toString() === selectedComplexity;
      const matchesSearch = searchQuery === '' || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesStatus && matchesComplexity && matchesSearch;
    });
  }, [selectedCategory, selectedStatus, selectedComplexity, searchQuery]);

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
  const ComplexityIndicator = ({ level }: { level: number }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(i => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i <= level ? 'bg-purple-400' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen relative bg-black">
      <BackgroundBeams />
      
      {/* Back Button */}
      <div className="fixed top-8 left-8 z-50">
        <Link prefetch={false} href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-lg hover:border-cyan-500 hover:text-cyan-400 transition-all duration-300">
          <IconArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
      
      {/* Header */}
      <div className="relative z-20 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <TextGenerateEffect 
            words="AI Projects Portfolio"
            className="text-5xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-6"
          />
          
          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-cyan-400">{stats.totalProjects}</div>
              <div className="text-gray-400">Total Projects</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-green-400">{stats.liveProjects}</div>
              <div className="text-gray-400">Live Projects</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-purple-400">{filteredProjects.length}</div>
              <div className="text-gray-400">Filtered Results</div>
            </motion.div>
          </div>

          {/* Filter Toggle */}
          <div className="text-center mb-8">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-2 bg-gray-900/50 border border-gray-800 rounded-full text-gray-300 hover:border-cyan-500 transition-all duration-300"
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'} <IconFilter className="inline w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Simple Project Grid - No filters for now */}
      <section className="relative z-20 pb-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link prefetch={false} 
                  href={`/projects/${project.id}`}
                  className="block"
                  onClick={() => analytics.trackProjectClick(project.id, project.title, project.category)}
                >
                  <div className="relative bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 h-full">
                    {/* Status Badge */}
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                      <ComplexityIndicator level={project.complexity} />
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.slice(0, 4).map(tech => (
                        <span key={tech} className="px-2 py-1 bg-gray-800/50 text-gray-300 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="px-2 py-1 bg-gray-800/50 text-gray-400 rounded text-xs">
                          +{project.techStack.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3">
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            analytics.trackProjectLinkClick(project.id, 'live', project.links.live!);
                          }}
                          className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
                        >
                          <IconExternalLink className="w-4 h-4" />
                          <span>Live</span>
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            analytics.trackProjectLinkClick(project.id, 'github', project.links.github!);
                          }}
                          className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm"
                        >
                          <IconBrandGithub className="w-4 h-4" />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
