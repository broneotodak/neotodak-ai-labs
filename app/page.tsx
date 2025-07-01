import React from "react";
import Link from "next/link";
import { FloatingNav } from "@/components/aceternity/floating-navbar";
import { HeroParallax } from "@/components/aceternity/hero-parallax";
import { Spotlight } from "@/components/aceternity/spotlight";
import { TextGenerateEffect } from "@/components/aceternity/text-generate-effect";
import { TypewriterEffect } from "@/components/aceternity/typewriter-effect";
import { HoverEffect } from "@/components/aceternity/card-hover-effect";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { IconHome, IconMessage, IconUser, IconBriefcase } from "@tabler/icons-react";
import { generateProjectImage, projectTypes } from "@/lib/project-images";

const navItems = [
  {
    name: "Home",
    link: "/",
    icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "About",
    link: "#about",
    icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Projects",
    link: "#projects",
    icon: <IconBriefcase className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Contact",
    link: "#contact",
    icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];

// Neo's real projects
const realProjects = [
  "Firasah AI",
  "AutoRecruit.AI", 
  "TODAK Unified AI Agent",
  "Mastra IP Development",
  "FlowState Platform",
  "Legal Framework Automation",
  "LLM Fine-tuning Pipeline",
  "n8n Automation Systems",
  "Supabase Integration Layer",
  "Claude Desktop Memory System",
  "LangChain Logic Router",
  "RunPod Training Infrastructure",
  "Hugging Face Dataset Pipeline",
  "AI Phone Interviewer",
  "Master Control Panel"
];

const projects = realProjects.map(title => ({
  title,
  link: "#",
  thumbnail: generateProjectImage(title, projectTypes[title] || 'ai')
}));

// AI Tools for hover effect
const aiTools = [
  {
    title: "Claude Desktop",
    description: "For planning, with custom long-term memory via pgvector. The thinking brain of my AI ecosystem.",
    icon: "🧠",
    tags: ["Planning", "Memory", "pgvector"]
  },
  {
    title: "n8n Automation",
    description: "Central automation brain, linked to Supabase, Gmail, filesystem, and webhook actions.",
    icon: "⚙️",
    tags: ["Automation", "Supabase", "Webhooks"]
  },
  {
    title: "LangChain",
    description: "For chaining logic, routing models, and controlling memory flows with precision.",
    icon: "🛠",
    tags: ["Logic", "Routing", "Memory"]
  },
  {
    title: "Cursor AI + VS Code",
    description: "High-precision dev work where code meets creativity and intelligence.",
    icon: "🖥",
    tags: ["Development", "AI", "Precision"]
  },
  {
    title: "LLM Fine-tuning",
    description: "Via RunPod.io using Axolotl, with datasets hosted on Hugging Face for controlled knowledge.",
    icon: "🧪",
    tags: ["RunPod", "Axolotl", "HuggingFace"]
  },
  {
    title: "Dataset Pipeline",
    description: "Training, formatting, and deploying structured datasets for reusable knowledge systems.",
    icon: "📦",
    tags: ["Training", "Datasets", "Knowledge"]
  }
];

// Signature projects for detailed showcase
const signatureProjects = [
  {
    title: "Firasah AI",
    description: "A fusion of ancient epistemology and modern machine learning. Analyzes human traits based on facial features using vision models (LLaVA), then interprets character using LLMs trained on classical texts like Kitab Firasat.",
    icon: "🔮",
    tags: ["Vision Models", "Classical Texts", "Character Analysis"],
    gradient: "from-purple-900/20 to-blue-900/20"
  },
  {
    title: "AutoRecruit.AI",
    description: "Automated recruitment system with A.I. phone interviewer. Candidates evaluated through real-time voice calls and follow-up logic handled by LangChain-powered flows.",
    icon: "🤖",
    tags: ["Voice AI", "LangChain", "Automation"],
    gradient: "from-green-900/20 to-emerald-900/20"
  },
  {
    title: "TODAK Unified AI Agent",
    description: "Internal AI system where Gemma (local LLM) generates raw responses, and GPT refines them. Memory is contextual, stored by project with rewrite loops and feedback logs.",
    icon: "🧠",
    tags: ["Local LLM", "Memory Systems", "Feedback Loops"],
    gradient: "from-orange-900/20 to-red-900/20"
  }
];

const typewriterWords = [
  {
    text: "Hey,",
  },
  {
    text: "I'm",
  },
  {
    text: "Neo",
    className: "text-blue-500 dark:text-blue-500",
  },
];

export default function Home() {
  return (
    <div className="w-full relative bg-black">
      <FloatingNav navItems={navItems} />
      
      {/* Hero Section with Spotlight */}
      <div className="h-screen w-full relative flex items-center justify-center">
        <Spotlight className="absolute top-0 left-0 w-full h-full" fill="blue" />
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
          <TypewriterEffect words={typewriterWords} className="mb-8" />
          <TextGenerateEffect 
            words="Founder of Todak Studios, creative technologist, and builder of systems where A.I. isn't just a tool — it's a teammate."
            className="text-xl md:text-2xl text-neutral-300 max-w-4xl mx-auto mb-12"
          />
          
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-6 py-3 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm backdrop-blur-sm">
              🔮 Creative Technologist
            </div>
            <div className="px-6 py-3 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm backdrop-blur-sm">
              🧠 A.I. Systems Builder
            </div>
            <div className="px-6 py-3 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm backdrop-blur-sm">
              ⚡ Fast & Smart
            </div>
          </div>
        </div>
      </div>

      {/* Projects Parallax Section */}
      <div className="relative">
        <HeroParallax products={projects} />
      </div>
      
      {/* AI Playground Section with Spotlight */}
      <div id="about" className="min-h-screen relative">
        <Spotlight className="absolute top-0 right-0 w-1/2 h-full" fill="purple" />
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-20">
            <TextGenerateEffect 
              words="My A.I. Playground"
              className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 mb-8"
            />
            <p className="text-xl text-neutral-300 max-w-4xl mx-auto">
              My workflow lives across powerful tools and orchestration layers where A.I. isn't just a tool — it's a teammate.
            </p>
          </div>

          <HoverEffect items={aiTools} className="mt-16" />
        </div>
      </div>

      {/* Signature Projects Section with Background Beams */}
      <div id="projects" className="min-h-screen relative">
        <BackgroundBeams />
        <div className="relative z-20 max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-20">
            <TextGenerateEffect 
              words="Signature Projects"
              className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-6"
            />
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Built, broken, rebuilt, and deployed by me — with my machines. Welcome to my playground.
            </p>
          </div>

          <div className="space-y-16">
            {signatureProjects.map((project, index) => (
              <div
                key={project.title}
                className={`p-8 rounded-3xl border border-neutral-800/50 bg-gradient-to-br ${project.gradient} backdrop-blur-xl hover:border-neutral-700/50 transition-all duration-500 group`}
              >
                <div className="flex items-center gap-6 mb-6">
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                    {project.icon}
                  </div>
                  <h3 className="text-4xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>
                <p className="text-neutral-300 text-lg mb-8 leading-relaxed group-hover:text-neutral-200 transition-colors duration-300">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-4 py-2 bg-neutral-800/50 text-neutral-300 rounded-full text-sm backdrop-blur-sm border border-neutral-700/50 hover:border-neutral-600/50 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Personal Profile Section with Spotlight */}
      <div className="min-h-screen relative flex items-center justify-center">
        <Spotlight className="absolute top-0 left-0 w-full h-full" fill="cyan" />
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        
        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
          {/* Enhanced Avatar */}
          <div className="relative inline-block mb-12">
            <div className="w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-cyan-500/50 shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-500">
              <img 
                src="/neo-profile.png" 
                alt="Neo Todak" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            {/* Animated Status Badge */}
            <div className="absolute -bottom-4 -right-4 bg-green-500 rounded-full p-4 border-4 border-black animate-pulse">
              <div className="w-6 h-6 bg-green-400 rounded-full"></div>
            </div>
            {/* Creative Badge */}
            <div className="absolute -top-4 -right-4 text-5xl animate-bounce">🚀</div>
          </div>
          
          <TextGenerateEffect 
            words="Creative Technologist & A.I. Systems Builder"
            className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-8"
          />
          
          <p className="text-xl text-neutral-300 max-w-4xl mx-auto leading-relaxed mb-8">
            I've spent the past few years shaping the edge between creativity and computation. 
            I build things fast, smart, and with soul.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 rounded-2xl bg-neutral-800/30 backdrop-blur-sm border border-neutral-700/50 hover:border-cyan-500/50 transition-all duration-300 group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🎯</div>
              <div className="text-white font-semibold text-xl mb-2">Creative Technologist</div>
              <div className="text-neutral-400">Building with soul</div>
            </div>
            <div className="p-6 rounded-2xl bg-neutral-800/30 backdrop-blur-sm border border-neutral-700/50 hover:border-purple-500/50 transition-all duration-300 group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">⚡</div>
              <div className="text-white font-semibold text-xl mb-2">Fast & Smart Systems</div>
              <div className="text-neutral-400">Rapid deployment</div>
            </div>
            <div className="p-6 rounded-2xl bg-neutral-800/30 backdrop-blur-sm border border-neutral-700/50 hover:border-green-500/50 transition-all duration-300 group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🤝</div>
              <div className="text-white font-semibold text-xl mb-2">A.I. Teammate</div>
              <div className="text-neutral-400">Not just a tool</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="https://flowstate.neotodak.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 text-center text-lg hover:scale-105 transform"
            >
              Explore My Playground ↗
            </a>
            <Link 
              href="/contact"
              className="px-12 py-4 border-2 border-cyan-500 text-cyan-500 font-semibold rounded-2xl hover:bg-cyan-500 hover:text-black transition-all duration-300 text-center text-lg hover:scale-105 transform inline-block"
            >
              Let's Build Together
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 