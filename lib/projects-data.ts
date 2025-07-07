// Project metadata with real links and comprehensive information
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: 'ai' | 'automation' | 'saas' | 'tool' | 'integration' | 'research';
  status: 'live' | 'beta' | 'development' | 'archived';
  featured: boolean;
  complexity: 1 | 2 | 3 | 4 | 5; // 1 = simple, 5 = very complex
  techStack: string[];
  links: {
    live?: string;
    github?: string;
    docs?: string;
    demo?: string;
    video?: string;
  };
  metrics?: {
    users?: number;
    uptime?: number;
    apiCalls?: number;
    lastUpdated?: string;
  };
  images: {
    thumbnail: string;
    screenshots?: string[];
  };
  icon?: string; // For placeholder generation
  highlights: string[];
  challenges: string[];
  outcomes: string[];
  relatedProjects?: string[]; // IDs of related projects
  startDate: string;
  endDate?: string;
}

export const projectsData: Project[] = [
  {
    id: 'firasah-ai',
    title: 'Firasah AI',
    description: 'Ancient epistemology meets modern ML - facial analysis using vision models and classical texts',
    longDescription: 'A groundbreaking fusion of ancient epistemology and modern machine learning. Firasah AI analyzes human traits based on facial features using advanced vision models (LLaVA), then interprets character using LLMs trained on classical texts like Kitab Firasat. This project bridges centuries of wisdom with cutting-edge AI technology.',
    category: 'ai',
    status: 'beta',
    featured: true,
    complexity: 5,
    techStack: ['Python', 'LLaVA', 'LangChain', 'Hugging Face', 'FastAPI', 'React', 'TensorFlow'],
    links: {
      live: 'https://firasah.neotodak.com',
      github: 'https://github.com/broneotodak/firasah-ai',
      video: 'https://youtu.be/demo-firasah'
    },
    metrics: {
      users: 1200,
      uptime: 98.5,
      apiCalls: 45000,
      lastUpdated: '2025-01-06'
    },
    images: {
      thumbnail: '/projects/firasah-thumbnail.png',
      screenshots: ['/projects/firasah-1.png', '/projects/firasah-2.png']
    },
    highlights: [
      'Combines ancient wisdom with modern AI',
      'Custom-trained LLMs on classical texts',
      'Advanced vision model integration',
      'Real-time facial analysis'
    ],
    challenges: [
      'Training models on ancient Arabic texts',
      'Balancing accuracy with ethical considerations',
      'Optimizing inference speed for real-time analysis'
    ],
    outcomes: [
      '98.5% uptime with 1200+ active users',
      'Successfully processed 45,000+ analyses',
      'Featured in AI ethics conferences'
    ],
    startDate: '2024-06-15'
  },
  {
    id: 'autorecruit-ai',
    title: 'AutoRecruit.AI',
    description: 'Automated recruitment system with AI phone interviewer and real-time evaluation',
    longDescription: 'A revolutionary recruitment automation system featuring an AI-powered phone interviewer. Candidates are evaluated through real-time voice calls with natural conversation flow, powered by LangChain for complex decision trees and follow-up logic. The system includes automated scheduling, transcript analysis, and candidate scoring.',
    category: 'saas',
    status: 'live',
    featured: true,
    complexity: 5,
    techStack: ['Python', 'LangChain', 'Twilio', 'OpenAI', 'Supabase', 'Next.js', 'n8n'],
    links: {
      live: 'https://autorecruit.neotodak.com',
      docs: 'https://docs.autorecruit.neotodak.com',
      demo: 'https://cal.com/neotodak/autorecruit-demo'
    },
    metrics: {
      users: 45,
      uptime: 99.2,
      apiCalls: 12000,
      lastUpdated: '2025-01-07'
    },
    images: {
      thumbnail: '/projects/autorecruit-thumbnail.png'
    },
    highlights: [
      'AI-powered voice interviews',
      'Real-time candidate evaluation',
      'Automated scheduling and follow-ups',
      'Multi-language support'
    ],
    challenges: [
      'Natural conversation flow in voice AI',
      'Handling various accents and languages',
      'GDPR compliance for voice recordings'
    ],
    outcomes: [
      'Reduced hiring time by 75%',
      'Processed 12,000+ interviews',
      '45 enterprise clients'
    ],
    startDate: '2024-08-20'
  },
  {
    id: 'todak-unified',
    title: 'TODAK Unified AI Agent',
    description: 'Multi-model AI system with local LLM generation and GPT refinement',
    longDescription: 'An advanced internal AI system where Gemma (local LLM) generates raw responses, and GPT refines them. Features contextual memory stored by project with rewrite loops and feedback logs. This creates a powerful AI assistant that learns and improves over time.',
    category: 'ai',
    status: 'live',
    featured: true,
    complexity: 4,
    techStack: ['Python', 'Gemma', 'GPT-4', 'LangChain', 'Supabase', 'pgvector', 'Docker'],
    links: {
      live: 'https://todak.neotodak.com',
      github: 'https://github.com/broneotodak/todak-ai'
    },
    metrics: {
      uptime: 99.8,
      apiCalls: 78000,
      lastUpdated: '2025-01-08'
    },
    images: {
      thumbnail: '/projects/todak-thumbnail.png'
    },
    highlights: [
      'Hybrid local/cloud AI processing',
      'Project-based memory system',
      'Self-improving through feedback loops',
      'WhatsApp integration'
    ],
    challenges: [
      'Balancing local vs cloud processing',
      'Memory optimization for large contexts',
      'Maintaining conversation coherence'
    ],
    outcomes: [
      '99.8% uptime reliability',
      'Processed 78,000+ requests',
      'Reduced AI costs by 60%'
    ],
    relatedProjects: ['claude-tools-kit'],
    startDate: '2024-07-10'
  },
  {
    id: 'flowstate-platform',
    title: 'FlowState AI Dashboard',
    description: 'Real-time AI activity monitoring with predictive analytics',
    longDescription: 'A comprehensive dashboard for monitoring all AI activities across multiple tools and platforms. Features real-time updates, predictive analytics, and beautiful visualizations of AI usage patterns.',
    category: 'saas',
    status: 'live',
    featured: true,
    complexity: 3,
    techStack: ['Next.js', 'Supabase', 'Recharts', 'TailwindCSS', 'PostgreSQL'],
    links: {
      live: 'https://flowstate.neotodak.com',
      github: 'https://github.com/broneotodak/flowstate-ai'
    },
    metrics: {
      uptime: 99.9,
      lastUpdated: '2025-01-08'
    },
    images: {
      thumbnail: '/projects/flowstate-thumbnail.png'
    },
    highlights: [
      'Real-time activity tracking',
      'Beautiful data visualizations',
      'Multi-tool integration',
      'Predictive analytics'
    ],
    challenges: [
      'Real-time data synchronization',
      'Handling high-frequency updates',
      'Creating intuitive visualizations'
    ],
    outcomes: [
      '99.9% uptime achievement',
      'Tracks 10+ AI tools simultaneously',
      'Used daily for productivity insights'
    ],
    relatedProjects: ['claude-tools-kit'],
    startDate: '2024-09-01'
  },
  {
    id: 'claude-tools-kit',
    title: 'Claude Tools Kit (CTK)',
    description: 'Context persistence layer for Claude AI across sessions and machines',
    longDescription: 'A comprehensive toolkit that ensures Claude AI remembers context, projects, and preferences across sessions. Features automatic memory synchronization, multi-machine support, and FlowState integration.',
    category: 'tool',
    status: 'live',
    featured: false,
    complexity: 3,
    techStack: ['Node.js', 'Supabase', 'pgvector', 'Bash', 'JavaScript'],
    links: {
      live: 'https://github.com/broneotodak/claude-tools-kit',
      github: 'https://github.com/broneotodak/claude-tools-kit',
      docs: 'https://github.com/broneotodak/claude-tools-kit#readme'
    },
    metrics: {
      users: 1,
      lastUpdated: '2025-01-08'
    },
    images: {
      thumbnail: '/projects/ctk-thumbnail.png'
    },
    highlights: [
      'Automatic context loading',
      'Multi-machine synchronization',
      'Memory persistence with pgvector',
      'FlowState integration'
    ],
    challenges: [
      'Cross-platform compatibility',
      'Efficient memory retrieval',
      'Automatic trigger setup'
    ],
    outcomes: [
      'Never lose AI context again',
      'Seamless workflow across machines',
      'Integrated with FlowState tracking'
    ],
    relatedProjects: ['flowstate-platform', 'todak-unified'],
    startDate: '2025-01-07'
  },
  {
    id: 'kenal-admin',
    title: 'KENAL Admin Dashboard',
    description: 'AI-enhanced admin system with predictive user analytics',
    longDescription: 'An intelligent administration dashboard that uses AI to predict user behavior, automate routine tasks, and provide actionable insights for business decisions.',
    category: 'saas',
    status: 'development',
    featured: false,
    complexity: 4,
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'OpenAI', 'Recharts', 'Vercel'],
    links: {
      github: 'https://github.com/broneotodak/kenal-admin'
    },
    images: {
      thumbnail: '/projects/kenal-thumbnail.png'
    },
    highlights: [
      'Predictive user analytics',
      'Automated task management',
      'AI-powered insights',
      'Real-time dashboards'
    ],
    challenges: [
      'Accurate prediction models',
      'Real-time data processing',
      'Scalable architecture'
    ],
    outcomes: [
      'In active development',
      'Beta testing with 5 clients',
      'Reducing admin time by 60%'
    ],
    startDate: '2024-11-01'
  },
  {
    id: 'n8n-automation',
    title: 'n8n Automation Hub',
    description: 'Central automation brain connecting AI tools, databases, and services',
    longDescription: 'A sophisticated automation hub built on n8n that orchestrates complex workflows between AI services, databases, and external APIs. Acts as the central nervous system for all automated processes.',
    category: 'automation',
    status: 'live',
    featured: false,
    complexity: 4,
    techStack: ['n8n', 'Node.js', 'PostgreSQL', 'Docker', 'Webhook.site'],
    links: {
      docs: 'https://docs.neotodak.com/n8n-workflows'
    },
    metrics: {
      uptime: 99.5,
      apiCalls: 125000,
      lastUpdated: '2025-01-08'
    },
    images: {
      thumbnail: '/projects/n8n-thumbnail.png'
    },
    highlights: [
      '50+ active workflows',
      'Connects 20+ services',
      'Self-healing workflows',
      'Custom node development'
    ],
    challenges: [
      'Complex workflow debugging',
      'Rate limit management',
      'Error handling at scale'
    ],
    outcomes: [
      'Processed 125,000+ automations',
      'Saved 200+ hours monthly',
      '99.5% reliability'
    ],
    relatedProjects: ['autorecruit-ai', 'todak-unified'],
    startDate: '2024-05-15'
  },
  {
    id: 'llm-finetuning',
    title: 'LLM Fine-tuning Pipeline',
    description: 'Custom model training pipeline using RunPod and Axolotl',
    longDescription: 'A complete pipeline for fine-tuning large language models on custom datasets. Uses RunPod for GPU compute, Axolotl for training orchestration, and Hugging Face for dataset management.',
    category: 'research',
    status: 'live',
    featured: false,
    complexity: 5,
    techStack: ['Python', 'RunPod', 'Axolotl', 'Hugging Face', 'PyTorch', 'CUDA'],
    links: {
      github: 'https://github.com/broneotodak/llm-finetuning'
    },
    images: {
      thumbnail: '/projects/llm-thumbnail.png'
    },
    highlights: [
      'Custom dataset curation',
      'Automated training pipeline',
      'Model evaluation suite',
      'Deployment automation'
    ],
    challenges: [
      'GPU resource optimization',
      'Dataset quality control',
      'Training stability'
    ],
    outcomes: [
      'Trained 15+ custom models',
      'Reduced training costs by 70%',
      'Improved model accuracy by 25%'
    ],
    startDate: '2024-09-15'
  }
];

// Helper functions
export function getProjectById(id: string): Project | undefined {
  return projectsData.find(p => p.id === id);
}

export function getFeaturedProjects(): Project[] {
  return projectsData.filter(p => p.featured).sort((a, b) => {
    // Sort by status (live first) then by complexity
    const statusOrder = { live: 0, beta: 1, development: 2, archived: 3 };
    if (statusOrder[a.status] !== statusOrder[b.status]) {
      return statusOrder[a.status] - statusOrder[b.status];
    }
    return b.complexity - a.complexity;
  });
}

export function getProjectsByCategory(category: Project['category']): Project[] {
  return projectsData.filter(p => p.category === category);
}

export function getRelatedProjects(projectId: string): Project[] {
  const project = getProjectById(projectId);
  if (!project || !project.relatedProjects) return [];
  
  return project.relatedProjects
    .map(id => getProjectById(id))
    .filter(Boolean) as Project[];
}

export function getProjectStats() {
  const total = projectsData.length;
  const live = projectsData.filter(p => p.status === 'live').length;
  const totalUsers = projectsData.reduce((acc, p) => acc + (p.metrics?.users || 0), 0);
  const totalApiCalls = projectsData.reduce((acc, p) => acc + (p.metrics?.apiCalls || 0), 0);
  
  return {
    totalProjects: total,
    liveProjects: live,
    totalUsers,
    totalApiCalls,
    categories: [...new Set(projectsData.map(p => p.category))].length
  };
}