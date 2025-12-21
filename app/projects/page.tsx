'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { projectsData, getProjectStats, type Project } from '@/lib/projects-data';
import { useAnalytics } from '@/lib/analytics/use-analytics';
import { FloatingNav } from '@/components/aceternity/floating-navbar';
import { 
  IconExternalLink, 
  IconBrandGithub, 
  IconArrowLeft,
  IconHome,
  IconMessage,
  IconBriefcase,
  IconCode,
  IconSearch,
  IconFilter,
  IconX
} from '@tabler/icons-react';

const navItems = [
  { name: "Home", link: "/", icon: <IconHome className="h-4 w-4" /> },
  { name: "Projects", link: "/projects", icon: <IconBriefcase className="h-4 w-4" /> },
  { name: "Tech Stack", link: "/tech-stack", icon: <IconCode className="h-4 w-4" /> },
  { name: "Contact", link: "/contact", icon: <IconMessage className="h-4 w-4" /> },
];

// Filter categories
const categories = ['all', 'ai', 'automation', 'saas', 'tool', 'integration', 'research', 'education'] as const;
const statuses = ['all', 'live', 'beta', 'development'] as const;

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
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map(i => (
      <div
        key={i}
        className={`w-1.5 h-1.5 rounded-full ${
          i <= level ? 'bg-gray-900' : 'bg-gray-300'
        }`}
      />
    ))}
  </div>
);

// Project Card Component
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const analytics = useAnalytics();
  
  return (
    <div 
      className="neo-project-card group opacity-0 animate-fade-in-up h-full flex flex-col"
      style={{ animationDelay: `${0.05 + index * 0.05}s` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl">{project.icon || '🚀'}</span>
        <div className="flex items-center gap-2">
          <ComplexityDots level={project.complexity} />
          <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusStyles(project.status)}`}>
            {project.status}
          </span>
        </div>
      </div>
      
      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {project.title}
      </h3>
      
      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
        {project.description}
      </p>
      
      {/* Tech Stack */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.techStack.slice(0, 4).map(tech => (
          <span key={tech} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
            {tech}
          </span>
        ))}
        {project.techStack.length > 4 && (
          <span className="px-2 py-0.5 text-gray-400 text-xs">
            +{project.techStack.length - 4}
          </span>
        )}
      </div>
      
      {/* Metrics */}
      {project.metrics && (
        <div className="flex gap-4 text-xs text-gray-500 mb-4">
          {project.metrics.users && (
            <span>{project.metrics.users.toLocaleString()} users</span>
          )}
          {project.metrics.uptime && (
            <span>{project.metrics.uptime}% uptime</span>
          )}
        </div>
      )}
      
      {/* Links */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-200 mt-auto">
        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => analytics.trackProjectLinkClick(project.id, 'live', project.links.live!)}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
          >
            <IconExternalLink className="h-4 w-4" />
            Live
          </a>
        )}
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => analytics.trackProjectLinkClick(project.id, 'github', project.links.github!)}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <IconBrandGithub className="h-4 w-4" />
            Code
          </a>
        )}
        <Link
          href={`/projects/${project.id}`}
          className="ml-auto text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          Details →
        </Link>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('all');
  const [selectedStatus, setSelectedStatus] = useState<typeof statuses[number]>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const stats = getProjectStats();

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
      const matchesSearch = searchQuery === '' || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [selectedCategory, selectedStatus, searchQuery]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedStatus !== 'all' || searchQuery !== '';

  return (
    <div className="min-h-screen bg-white">
      <FloatingNav navItems={navItems} />
      
      {/* Header */}
      <header className="pt-32 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Back link */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
          >
            <IconArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          
          {/* Title */}
          <div className="neo-section-header mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Projects
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 max-w-2xl mb-12">
            A collection of AI-powered systems, automation tools, and SaaS products built to make teams smarter and more efficient.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-8 pb-8 border-b border-gray-200">
            <div>
              <div className="text-3xl font-bold text-gray-900">{stats.totalProjects}</div>
              <div className="text-sm text-gray-500">Total Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">{stats.liveProjects}</div>
              <div className="text-sm text-gray-500">Live</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">{filteredProjects.length}</div>
              <div className="text-sm text-gray-500">Showing</div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Search & Filters */}
      <section className="px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors ${
                showFilters || hasActiveFilters
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              <IconFilter className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="ml-1 px-1.5 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                  {(selectedCategory !== 'all' ? 1 : 0) + (selectedStatus !== 'all' ? 1 : 0)}
                </span>
              )}
            </button>
            
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
              >
                <IconX className="h-4 w-4" />
                Clear
              </button>
            )}
          </div>
          
          {/* Filter options */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-fade-in-up">
              <div className="flex flex-wrap gap-6">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                          selectedCategory === cat
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <div className="flex flex-wrap gap-2">
                    {statuses.map(status => (
                      <button
                        key={status}
                        onClick={() => setSelectedStatus(status)}
                        className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                          selectedStatus === status
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Projects Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
              <button
                onClick={clearFilters}
                className="neo-btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-gray-500 text-sm">© 2025 NEOTODAK AI Labs</span>
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
