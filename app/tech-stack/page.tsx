'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { BackgroundBeams } from '@/components/aceternity/background-beams';
import { TextGenerateEffect } from '@/components/aceternity/text-generate-effect';
import { HoverEffect } from '@/components/aceternity/card-hover-effect';
import { IconBrain, IconCode, IconDatabase, IconRocket, IconApi, IconCloud } from '@tabler/icons-react';

// Dynamic import for 3D component
const TechStack3D = dynamic(() => import('@/components/tech-stack-3d'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center">
      <div className="text-cyan-400">Loading 3D visualization...</div>
    </div>
  )
});

// Tool categories with detailed descriptions
const toolCategories = [
  {
    title: "AI/ML Models",
    icon: <IconBrain className="w-8 h-8" />,
    color: "from-cyan-500 to-blue-500",
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
    icon: <IconApi className="w-8 h-8" />,
    color: "from-purple-500 to-pink-500",
    description: "Workflow automation and AI chaining",
    tools: [
      { name: "LangChain", role: "Complex AI logic routing and memory flows" },
      { name: "n8n", role: "Visual workflow automation and integrations" }
    ]
  },
  {
    title: "Data & Storage",
    icon: <IconDatabase className="w-8 h-8" />,
    color: "from-green-500 to-emerald-500",
    description: "Scalable databases with vector search",
    tools: [
      { name: "Supabase", role: "Real-time database and authentication" },
      { name: "pgvector", role: "Vector embeddings for semantic search" },
      { name: "PostgreSQL", role: "Reliable relational data storage" }
    ]
  },
  {
    title: "Development",
    icon: <IconCode className="w-8 h-8" />,
    color: "from-orange-500 to-yellow-500",
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
    icon: <IconCloud className="w-8 h-8" />,
    color: "from-indigo-500 to-purple-500",
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
    icon: <IconRocket className="w-8 h-8" />,
    color: "from-pink-500 to-red-500",
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
    <div className="min-h-screen relative bg-black">
      <BackgroundBeams />
      
      {/* Header */}
      <div className="relative z-20 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <TextGenerateEffect 
            words="My Tech Stack Universe"
            className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-6"
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A carefully curated ecosystem of tools and technologies that power my AI projects. 
            Each tool is chosen for its specific strengths and seamless integration capabilities.
          </p>
        </div>
      </div>

      {/* 3D Visualization */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-3xl p-8"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Interactive Tech Stack Visualization
          </h2>
          <Suspense fallback={<div>Loading...</div>}>
            <TechStack3D />
          </Suspense>
        </motion.div>
      </div>

      {/* Tool Categories */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-12 text-center"
        >
          Tools by Category
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {toolCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${category.color} mb-4`}>
                {category.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
              <p className="text-gray-400 mb-4">{category.description}</p>
              <div className="space-y-3">
                {category.tools.map(tool => (
                  <div key={tool.name} className="border-l-2 border-gray-700 pl-4 hover:border-cyan-500 transition-colors duration-300">
                    <div className="font-semibold text-cyan-400">{tool.name}</div>
                    <div className="text-sm text-gray-400">{tool.role}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Integration Flows */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 pb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-12 text-center"
        >
          Real-World Integration Flows
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {integrationFlows.map((flow, index) => (
            <motion.a
              key={flow.title}
              href={flow.link}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="block group"
            >
              <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {flow.title} →
                </h3>
                <p className="text-gray-400 font-mono text-sm">
                  {flow.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-cyan-900/20 to-purple-900/20 backdrop-blur-sm border border-cyan-500/30 rounded-3xl p-8 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">My Tech Philosophy</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            "I believe in choosing tools that not only solve immediate problems but also scale with ambition. 
            Every technology in my stack is battle-tested, purposefully integrated, and constantly evolving. 
            The magic happens not in individual tools, but in how they dance together to create something extraordinary."
          </p>
          <div className="mt-6 text-cyan-400 font-semibold">
            - Neo Todak
          </div>
        </motion.div>
      </div>
    </div>
  );
}