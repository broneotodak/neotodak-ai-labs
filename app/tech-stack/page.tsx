'use client';

import React from 'react';
import Link from 'next/link';
import { FloatingNav } from '@/components/aceternity/floating-navbar';
import {
  IconBrain,
  IconCode,
  IconDatabase,
  IconRocket,
  IconApi,
  IconCloud,
  IconArrowLeft,
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

// Tool categories with dark mode colors
const toolCategories = [
  {
    title: "AI/ML Models",
    icon: <IconBrain className="w-6 h-6" />,
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    description: "Cutting-edge language models and vision AI",
    tools: [
      { name: "Claude", role: "Planning & memory-enhanced conversations" },
      { name: "GPT-4", role: "Advanced reasoning and code generation" },
      { name: "Gemma", role: "Local LLM for privacy-focused processing" },
      { name: "LLaVA", role: "Vision-language model for image analysis" }
    ]
  },
  {
    title: "Orchestration",
    icon: <IconApi className="w-6 h-6" />,
    color: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
    description: "Workflow automation and AI chaining",
    tools: [
      { name: "LangChain", role: "Complex AI logic routing and memory flows" },
      { name: "n8n", role: "Visual workflow automation and integrations" }
    ]
  },
  {
    title: "Data & Storage",
    icon: <IconDatabase className="w-6 h-6" />,
    color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    description: "Scalable databases with vector search",
    tools: [
      { name: "Supabase", role: "Real-time database and authentication" },
      { name: "pgvector", role: "Vector embeddings for semantic search" },
      { name: "PostgreSQL", role: "Reliable relational data storage" }
    ]
  },
  {
    title: "Development",
    icon: <IconCode className="w-6 h-6" />,
    color: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400",
    description: "Modern frameworks for rapid development",
    tools: [
      { name: "Next.js", role: "Full-stack React framework" },
      { name: "Python", role: "AI/ML development and scripting" },
      { name: "TypeScript", role: "Type-safe JavaScript development" },
      { name: "Tailwind CSS", role: "Utility-first styling" }
    ]
  },
  {
    title: "Infrastructure",
    icon: <IconCloud className="w-6 h-6" />,
    color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400",
    description: "Cloud platforms and deployment tools",
    tools: [
      { name: "Vercel", role: "Edge deployment and serverless functions" },
      { name: "Docker", role: "Containerization and consistent environments" },
      { name: "RunPod", role: "GPU compute for model training" },
      { name: "GitHub Actions", role: "CI/CD automation" }
    ]
  },
  {
    title: "Specialized Tools",
    icon: <IconRocket className="w-6 h-6" />,
    color: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400",
    description: "Purpose-built tools for specific needs",
    tools: [
      { name: "Hugging Face", role: "Model hub and dataset hosting" },
      { name: "Axolotl", role: "LLM fine-tuning framework" },
      { name: "Cursor AI", role: "AI-powered code editor" },
      { name: "Claude Desktop", role: "Enhanced AI assistant with memory" }
    ]
  }
];

// Integration flows
const integrationFlows = [
  {
    title: "AI Memory Pipeline",
    description: "Claude Desktop → pgvector → Supabase → FlowState Dashboard",
    link: "/projects/claude-tools-kit"
  },
  {
    title: "Recruitment Automation",
    description: "n8n → Twilio → GPT-4 → LangChain → Supabase",
    link: "/projects/autorecruit-ai"
  },
  {
    title: "Vision Analysis Flow",
    description: "User Upload → LLaVA → Python Processing → FastAPI → React Frontend",
    link: "/projects/firasah-ai"
  },
  {
    title: "Model Training Pipeline",
    description: "Dataset → Hugging Face → RunPod GPU → Axolotl → Model Deployment",
    link: "/projects/llm-finetuning"
  }
];

export default function TechStackPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <FloatingNav navItems={navItems} />

      {/* Header */}
      <header className="pt-32 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
          >
            <IconArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          {/* Title */}
          <div className="neo-section-header mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Tech Stack
            </h1>
          </div>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            A carefully curated ecosystem of tools and technologies that power my AI projects.
            Each tool is chosen for its specific strengths and seamless integration capabilities.
          </p>
        </div>
      </header>

      {/* All Tools Overview */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Technology Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {toolCategories.flatMap(cat => cat.tools).map((tool, index) => (
              <div
                key={tool.name}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 opacity-0 animate-fade-in-up hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                <div className="font-semibold text-gray-900 dark:text-white text-sm">{tool.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{tool.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 pb-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto py-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-12">Tools by Category</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolCategories.map((category, index) => (
              <div
                key={category.title}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`inline-flex p-3 rounded-lg ${category.color} mb-4`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{category.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{category.description}</p>
                <div className="space-y-3">
                  {category.tools.map(tool => (
                    <div key={tool.name} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 hover:border-gray-900 dark:hover:border-white transition-colors">
                      <div className="font-semibold text-gray-900 dark:text-white">{tool.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{tool.role}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Flows */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto py-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-12">Real-World Integration Flows</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {integrationFlows.map((flow, index) => (
              <Link
                key={flow.title}
                href={flow.link}
                className="group"
              >
                <div
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 opacity-0 animate-fade-in-up hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {flow.title} →
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-mono text-sm">
                    {flow.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-center p-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Tech Philosophy</h2>
            <blockquote className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed italic">
              "I believe in choosing tools that not only solve immediate problems but also scale with ambition.
              Every technology in my stack is battle-tested, purposefully integrated, and constantly evolving.
              The magic happens not in individual tools, but in how they dance together to create something extraordinary."
            </blockquote>
            <div className="mt-6 font-semibold text-gray-900 dark:text-white">
              — Neo Todak
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-gray-500 text-sm">© 2025 NEOTODAK AI Labs</span>
          <Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
