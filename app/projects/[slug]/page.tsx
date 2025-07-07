import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProjectById, getRelatedProjects, projectsData, type Project } from '@/lib/projects-data';
import ProjectPageClient from './project-page-client';

// Generate static params for all projects at build time
export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.id,
  }));
}

// Server component that fetches data
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectById(slug);
  
  if (!project) {
    notFound();
  }
  
  const relatedProjects = getRelatedProjects(slug);
  
  // Pass data to client component
  return <ProjectPageClient project={project} relatedProjects={relatedProjects} />;
}