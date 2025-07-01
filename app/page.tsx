import React from "react";
import { FloatingNav } from "@/components/aceternity/floating-navbar";
import { HeroParallax } from "@/components/aceternity/hero-parallax";
import { ParallaxCard } from "@/components/aceternity/parallax-card";
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

// Generate projects with beautiful SVG placeholders
const projectTitles = [
  "AI Chat Assistant",
  "E-commerce Platform", 
  "Machine Learning API",
  "React Dashboard",
  "Python Data Analysis",
  "Mobile App (React Native)",
  "Neural Network Project",
  "Web Scraping Tool",
  "AI Image Recognition",
  "Full Stack SaaS",
  "Blockchain DApp",
  "DevOps Automation",
  "AI Recommendation System",
  "Cloud Infrastructure",
  "Open Source Contribution"
];

const projects = projectTitles.map(title => ({
  title,
  link: "#",
  thumbnail: generateProjectImage(title, projectTypes[title])
}));

export default function Home() {
  return (
    <div className="w-full relative">
      <FloatingNav navItems={navItems} />
      <div className="relative">
        <HeroParallax products={projects} />
      </div>
      
      {/* About & Skills Section */}
      <div id="about" className="min-h-screen bg-black dark:bg-grid-white/[0.05] bg-grid-black/[0.05] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-center mb-8">What I Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="p-8 rounded-lg border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm hover:border-primary-500 transition-colors duration-300">
                <h3 className="text-2xl font-semibold mb-4 text-primary-500">AI Engineering</h3>
                <p className="text-neutral-300 text-base">
                  Building intelligent systems with machine learning, deep learning, and neural networks. 
                  Passionate about creating AI solutions that solve real-world problems.
                </p>
              </div>
              <div className="p-8 rounded-lg border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm hover:border-primary-500 transition-colors duration-300">
                <h3 className="text-2xl font-semibold mb-4 text-primary-500">Full Stack Development</h3>
                <p className="text-neutral-300 text-base">
                  Creating modern web applications with React, Next.js, Node.js, and Python. 
                  From frontend interfaces to backend APIs and database design.
                </p>
              </div>
              <div className="p-8 rounded-lg border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm hover:border-primary-500 transition-colors duration-300">
                <h3 className="text-2xl font-semibold mb-4 text-primary-500">Tech Innovation</h3>
                <p className="text-neutral-300 text-base">
                  Always exploring cutting-edge technologies. From cloud computing to blockchain, 
                  I love experimenting with new tools and frameworks.
                </p>
              </div>
            </div>
            
            {/* Skills Section */}
            <div className="mt-20">
              <h3 className="text-3xl font-bold text-center mb-12">Tech Stack</h3>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4 max-w-4xl mx-auto">
                <div className="text-center p-3 rounded-lg bg-neutral-800/50 hover:bg-neutral-700/50 transition-colors">
                  <div className="text-xl mb-1">🐍</div>
                  <span className="text-neutral-300 text-xs">Python</span>
                </div>
                <div className="text-center p-3 rounded-lg bg-neutral-800/50 hover:bg-neutral-700/50 transition-colors">
                  <div className="text-xl mb-1">⚛️</div>
                  <span className="text-neutral-300 text-xs">React</span>
                </div>
                <div className="text-center p-3 rounded-lg bg-neutral-800/50 hover:bg-neutral-700/50 transition-colors">
                  <div className="text-xl mb-1">🚀</div>
                  <span className="text-neutral-300 text-xs">Next.js</span>
                </div>
                <div className="text-center p-3 rounded-lg bg-neutral-800/50 hover:bg-neutral-700/50 transition-colors">
                  <div className="text-xl mb-1">🧠</div>
                  <span className="text-neutral-300 text-xs">TensorFlow</span>
                </div>
                <div className="text-center p-3 rounded-lg bg-neutral-800/50 hover:bg-neutral-700/50 transition-colors">
                  <div className="text-xl mb-1">🟢</div>
                  <span className="text-neutral-300 text-xs">Node.js</span>
                </div>
                <div className="text-center p-3 rounded-lg bg-neutral-800/50 hover:bg-neutral-700/50 transition-colors">
                  <div className="text-xl mb-1">🗃️</div>
                  <span className="text-neutral-300 text-xs">PostgreSQL</span>
                </div>
                <div className="text-center p-3 rounded-lg bg-neutral-800/50 hover:bg-neutral-700/50 transition-colors">
                  <div className="text-xl mb-1">☁️</div>
                  <span className="text-neutral-300 text-xs">AWS</span>
                </div>
                <div className="text-center p-3 rounded-lg bg-neutral-800/50 hover:bg-neutral-700/50 transition-colors">
                  <div className="text-xl mb-1">🐳</div>
                  <span className="text-neutral-300 text-xs">Docker</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Profile Section with Parallax */}
      <div className="min-h-screen bg-black dark:bg-grid-white/[0.05] bg-grid-black/[0.05] relative flex items-center justify-center py-20">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-20">
          {/* Profile Card with Parallax */}
          <ParallaxCard offset={100} className="mb-20">
            <div className="text-center mb-16">
              {/* Circular Avatar */}
              <div className="relative inline-block mb-8">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-primary-500/50 shadow-2xl shadow-primary-500/20">
                  <img 
                    src="/neo-profile.png" 
                    alt="Neo Todak" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Status Badge */}
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 border-4 border-black">
                  <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                {/* Rocket Badge */}
                <div className="absolute -top-2 -right-2 text-3xl">🚀</div>
              </div>
              
              <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400 mb-6">
                About Neo Todak
              </h2>
              <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
                Passionate AI Engineer & Full Stack Developer with a love for creating 
                innovative solutions. Currently building the future of productivity and 
                workflow automation.
              </p>
            </div>
          </ParallaxCard>

          {/* FlowState Card with Parallax */}
          <ParallaxCard offset={150} className="max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl border border-neutral-800/50 bg-neutral-900/30 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-medium">Currently Working On</span>
              </div>
              
              <h3 className="text-4xl font-bold text-white mb-6">FlowState Platform</h3>
              
              <p className="text-neutral-300 text-lg mb-8 leading-relaxed">
                Building an intelligent productivity platform that adapts to your workflow. Real-time 
                collaboration, AI-powered insights, and seamless automation.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4">
                  <div className="text-3xl mb-2">⚡</div>
                  <div className="text-white font-medium">Real-time Updates</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl mb-2">🤖</div>
                  <div className="text-white font-medium">AI-Powered</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl mb-2">🔄</div>
                  <div className="text-white font-medium">Workflow Automation</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://flowstate.neotodak.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 text-center"
                >
                  Visit FlowState ↗
                </a>
                <a 
                  href="#contact"
                  className="px-8 py-3 border border-primary-500 text-primary-500 font-semibold rounded-lg hover:bg-primary-500 hover:text-white transition-all duration-300 text-center"
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </ParallaxCard>
        </div>
      </div>
    </div>
  );
} 