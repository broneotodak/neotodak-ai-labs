'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { projectsData, getProjectStats, type Project } from '@/lib/projects-data';
import { BackgroundBeams } from '@/components/aceternity/background-beams';
import { TextGenerateEffect } from '@/components/aceternity/text-generate-effect';
import { IconExternalLink, IconBrandGithub, IconBook, IconVideo, IconChartBar, IconClock, IconUsers, IconApi, IconFilter, IconX, IconArrowLeft } from '@tabler/icons-react';

// Filter categories
const categories = ['all', 'ai', 'automation', 'saas', 'tool', 'integration', 'research'] as const;
const statuses = ['all', 'live', 'beta', 'development', 'archived'] as const;
const complexities = ['all', '1', '2', '3', '4', '5'] as const;

export default function ProjectsPage() {
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
  const ComplexityIndicator = ({ level }: { level: number }) => (
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

  return (
    <div className="min-h-screen relative bg-black">
      <BackgroundBeams />
      
      {/* Back Button */}
      <div className="fixed top-8 left-8 z-50">
        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-lg hover:border-cyan-500 hover:text-cyan-400 transition-all duration-300">
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
              <div className="text-4xl font-bold text-purple-400">{stats.totalUsers.toLocaleString()}</div>
              <div className="text-gray-400">Total Users</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-orange-400">{(stats.totalApiCalls / 1000).toFixed(0)}K</div>
              <div className="text-gray-400">API Calls</div>
            </motion.div>
          </div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects, technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-gray-900/50 border border-gray-800 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-all duration-300 backdrop-blur-sm"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                <IconFilter className="w-5 h-5" />
              </div>
            </div>
          </motion.div>

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

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-20 mb-12 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4">
              <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Category Filter */}
                  <div>
                    <label className="text-gray-400 text-sm mb-3 block">Category</label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                            selectedCategory === cat
                              ? 'bg-cyan-500 text-black font-semibold'
                              : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                          }`}
                        >
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <label className="text-gray-400 text-sm mb-3 block">Status</label>
                    <div className="flex flex-wrap gap-2">
                      {statuses.map(status => (
                        <button
                          key={status}
                          onClick={() => setSelectedStatus(status)}
                          className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                            selectedStatus === status
                              ? 'bg-purple-500 text-white font-semibold'
                              : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                          }`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Complexity Filter */}
                  <div>
                    <label className="text-gray-400 text-sm mb-3 block">Complexity</label>
                    <div className="flex flex-wrap gap-2">
                      {complexities.map(complexity => (
                        <button
                          key={complexity}
                          onClick={() => setSelectedComplexity(complexity)}
                          className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                            selectedComplexity === complexity
                              ? 'bg-orange-500 text-white font-semibold'
                              : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                          }`}
                        >
                          {complexity === 'all' ? 'All' : `Level ${complexity}`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* View Mode Toggle */}
                <div className="mt-6 flex justify-between items-center">
                  <div className="text-gray-400">
                    Showing {filteredProjects.length} of {projectsData.length} projects
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-700' : 'bg-gray-800/50'}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-700' : 'bg-gray-800/50'}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects Grid/List */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`group ${viewMode === 'list' ? 'flex gap-6' : ''}`}
              >
                <Link href={`/projects/${project.id}`} className="block">
                  <div className={`relative bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 ${viewMode === 'list' ? 'flex-1' : 'h-full'}`}>
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

                    {/* Metrics */}
                    {project.metrics && (
                      <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-gray-800">
                        {project.metrics.users && (
                          <div className="flex items-center gap-2 text-sm">
                            <IconUsers className="w-4 h-4 text-cyan-400" />
                            <span className="text-gray-300">{project.metrics.users.toLocaleString()} users</span>
                          </div>
                        )}
                        {project.metrics.uptime && (
                          <div className="flex items-center gap-2 text-sm">
                            <IconChartBar className="w-4 h-4 text-green-400" />
                            <span className="text-gray-300">{project.metrics.uptime}% uptime</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex gap-3">
                      {project.links.live && (
                        <div className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors text-sm">
                          <IconExternalLink className="w-4 h-4" />
                          <span>Live</span>
                        </div>
                      )}
                      {project.links.github && (
                        <div className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm">
                          <IconBrandGithub className="w-4 h-4" />
                          <span>Code</span>
                        </div>
                      )}
                      {project.links.docs && (
                        <div className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm">
                          <IconBook className="w-4 h-4" />
                          <span>Docs</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No projects found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}