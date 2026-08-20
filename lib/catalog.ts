// Neo Todak Labs — verified project catalog (Phase 1 of the 2026 revamp)
// Truth-pass rules: statuses verified against reality on 2026-08-20, not aspiration.
// Public-safe: no infrastructure addresses, credential names, internal URLs, or client-sensitive data.
// 'evolved' = the work lives on inside a successor project (see evolvedInto).

export type CatalogStatus = 'live' | 'development' | 'parked' | 'archived' | 'evolved'

export interface CatalogProject {
  id: string
  title: string
  oneLiner: string
  story: string
  category: 'fleet' | 'ai' | 'saas' | 'tool' | 'game' | 'research' | 'education'
  status: CatalogStatus
  flagship?: boolean
  era: string // year span the work happened
  evolvedInto?: string // id of successor
  techStack: string[]
  highlights: string[]
  links?: { label: string; url: string }[]
}

export const catalog: CatalogProject[] = [
  // ───────────────────────── 2026 FLAGSHIPS — the fleet ─────────────────────────
  {
    id: 'siti',
    title: 'Siti — AI Chief of Staff',
    oneLiner: 'A WhatsApp-native AI employee that answers, remembers, escalates — and ships code.',
    story:
      "Siti runs the day-to-day of the TODAK group over WhatsApp: staff ask her questions, she recalls company memory, files receipts, runs background jobs, and when a task needs real work she dispatches it to \"hands\" — live coding-agent sessions on actual machines. She has a standing rule to escalate rather than surrender: \"I can't access that\" is not an acceptable answer. The owner's messages run on a full agentic engine; everyone else gets a fast lane.",
    category: 'fleet',
    status: 'live',
    flagship: true,
    era: '2025–2026',
    techStack: ['Node.js', 'WhatsApp (Baileys)', 'Claude Agent SDK', 'Gemini', 'Supabase', 'pgVector', 'pm2', 'Tailscale'],
    highlights: [
      'Three brains: chat lane, background-task lane, and dev-task lane with real machine access',
      'Dispatches work to Claude Code sessions on fleet machines and reports back with receipts',
      'Escalation doctrine — blocked tasks route to a stronger lane instead of failing politely',
      'Speaks Malay and English, knows the whole company through shared memory',
    ],
  },
  {
    id: 'naca-fleet',
    title: 'NACA — The Autonomous Fleet',
    oneLiner: 'Dozens of agents across servers, edge GPU boxes and Macs — one registry, one heartbeat.',
    story:
      'NACA is the platform under everything: an agent registry with heartbeats, command and intent queues, scheduled actions, and monitors that watch the monitors. Agents plug in declaratively — no hardcoded rosters — and satellite machines join the fleet the same way. When something dies, the fleet notices before Neo does.',
    category: 'fleet',
    status: 'live',
    flagship: true,
    era: '2025–2026',
    techStack: ['Node.js', 'Supabase', 'Tailscale', 'pm2', 'MCP', 'Claude Agent SDK'],
    highlights: [
      '36+ registered agents across VPS boxes, an edge GPU workstation, a Raspberry Pi and Macs',
      'Plug-and-play agent architecture — the registry is the single source of truth',
      'Fleet command center with live status, plus watchdog monitors validated end-to-end',
      'Multi-machine job routing: the right task lands on the right hardware',
    ],
  },
  {
    id: 'neo-brain',
    title: 'neo-brain — Persistent Memory',
    oneLiner: "The memory system every agent shares — 8,800+ memories and counting.",
    story:
      "Agents without memory are goldfish. neo-brain is the fix: a central semantic memory where every conversation, decision, deploy and meeting gets embedded and becomes recallable by any agent in the fleet — Siti quotes decisions made months ago, coding sessions inherit context from each other, and meeting minutes sync in minutes after the meeting ends. It also holds an encrypted credential vault so secrets never live in code or chat.",
    category: 'fleet',
    status: 'live',
    flagship: true,
    era: '2025–2026',
    techStack: ['Supabase', 'pgVector', 'Gemini embeddings', 'TypeScript SDK', 'Python SDK', 'RPC vault'],
    highlights: [
      '8,800+ embedded memories with hybrid semantic + keyword retrieval',
      'One SDK for every agent — JavaScript and Python, with an audit trail per agent',
      'Encrypted credential vault: secrets stored once, referenced by name everywhere',
      'Knowledge-graph layer and meeting-minutes auto-sync feeding recall',
    ],
  },
  {
    id: 'the-forge',
    title: 'The Forge — Self-Training Twin',
    oneLiner: 'A local GPU rig that re-trains an AI to sound like Neo — from his own chats, automatically.',
    story:
      "Every day, The Forge checks how many new messages Neo has written. When enough accumulate, it builds a training set, scrubs anything secret, fine-tunes a local model on an RTX 5070, and scores the result for \"Neo-likeness\" against a held-out benchmark. Promotion is human-gated — the machine proposes, Neo approves. Feeding it requires nothing: just using WhatsApp. Current baseline: 80.2% Neo-likeness from 31,788 conversation pairs.",
    category: 'ai',
    status: 'live',
    flagship: true,
    era: '2026',
    techStack: ['PyTorch', 'QLoRA', 'Hugging Face', 'CUDA (RTX 5070)', 'Node.js pipeline'],
    highlights: [
      'Fully automatic loop: dataset build → secret scrub → train → eval → report',
      'Neo-likeness scoring gate — no silent regressions, no ungated promotions',
      'The trained model is served locally and powers a live agent today',
      'Zero manual data work: the training set grows by living normally',
    ],
  },
  {
    id: 'digital-twin',
    title: 'Neo Digital Twin',
    oneLiner: 'A public AI version of Neo you can actually talk to — soon powered by his fine-tuned model.',
    story:
      "The twin answers as Neo, from Neo's real (public) memories — personality, facts, and history retrieved semantically per question. It has drafted WhatsApp replies in shadow mode, scored by the real Neo for authenticity, and its next upgrade — part of this site's rebuild — connects the public chat to the actual fine-tuned voice model The Forge trains, with live memory instead of an archive.",
    category: 'ai',
    status: 'live',
    flagship: true,
    era: '2025–2026',
    techStack: ['Next.js', 'Supabase', 'pgVector', 'Gemini', 'Fine-tuned local LLM', 'Privacy-gated retrieval'],
    highlights: [
      'Public chat that only sees memories explicitly marked public — privacy by architecture',
      'WhatsApp shadow-drafting with human scoring loop feeding future training',
      'Being rewired to the real fine-tuned twin model with cloud fallback',
    ],
    links: [{ label: 'Talk to the twin', url: 'https://neotodak.com/twin' }],
  },
  {
    id: 'face-pipeline',
    title: 'Face Recognition Pipeline',
    oneLiner: '7,000+ faces indexed and searchable — on our own hardware, nobody else’s cloud.',
    story:
      'A self-hosted face recognition service running on the fleet’s edge GPU box: company photos get detected, embedded and indexed, so HR records can be verified against real faces and photos become searchable by person. Strict match thresholds are treated as policy — accuracy bars never get lowered to make a demo look good. Everything stays on owned infrastructure.',
    category: 'ai',
    status: 'live',
    era: '2026',
    techStack: ['InsightFace', 'Python', 'GPU inference', 'Supabase', 'pgVector'],
    highlights: [
      '7,153 faces indexed from company archives',
      'Runs entirely on owned hardware — no third-party face APIs',
      'Verification workflow caught and fixed a mis-enrolled identity in HR records',
    ],
  },
  {
    id: 'email-automation',
    title: 'Workspace Email Automation',
    oneLiner: 'New-staff email accounts created by an agent — behind a human APPROVE gate.',
    story:
      'HR requests a new staff email; an agent reads the request, prepares the account, and asks for a one-word approval on WhatsApp before anything is created. Daily digests keep inboxes summarized. The pattern — automate everything, gate the irreversible on a human — repeats across the whole fleet.',
    category: 'fleet',
    status: 'live',
    era: '2026',
    techStack: ['Google Workspace (GAM)', 'Node.js', 'WhatsApp', 'Supabase'],
    highlights: [
      'End-to-end account creation with WhatsApp APPROVE gate',
      'Daily inbox digest agent for the exec lane',
      'Threaded replies done properly — agents reply into conversations, not over them',
    ],
  },
  {
    id: 'trading-lab',
    title: 'Trading Lab',
    oneLiner: 'Auto-traders, coach agents and live dashboards — a lab for AI-managed money.',
    story:
      "A crypto paper-trading engine scores signals with multi-timeframe indicators, news sentiment and pattern matching, with an LLM as tiebreaker for borderline calls. On top of it sit coach agents that run pre-mortems and health checks on the strategy itself — the coach's job is to stop bad trades before the market does. A forex signal pipeline auto-executes paper trades from incoming signals. Everything reports to live dashboards and WhatsApp.",
    category: 'ai',
    status: 'live',
    era: '2025–2026',
    techStack: ['JavaScript', 'Luno API', 'Lightweight Charts', 'Supabase', 'GPT-4o-mini', 'Netlify Functions'],
    highlights: [
      'V2 scoring engine: sentiment + KNN patterns + multi-timeframe + Kelly criterion',
      'Coach agents with a pre-mortem health framework watching the strategy, not just the trades',
      'Forex signals parsed from chat and auto-executed as paper trades',
      'Live dashboards with real-time charts and WhatsApp alerts',
    ],
  },
  {
    id: 'todakstudios-rebuild',
    title: 'todakstudios.com — The One-Day Rebuild',
    oneLiner: 'Dead server at breakfast, launched CMS website by night — a case study in AI-speed ops.',
    story:
      'The game studio’s website died with an unpaid legacy server. In a single day: backups verified, DNS control confirmed, a holding page deployed within hours, then a complete new site — content verified against HR and company records, a modern CMS with Google sign-in for staff, three languages — built, seeded and launched on company infrastructure. Scroll animations shipped the next morning.',
    category: 'saas',
    status: 'live',
    era: '2026',
    techStack: ['Payload CMS', 'Next.js', 'SQLite', 'Caddy', 'Cloudflare', 'Google OAuth'],
    highlights: [
      'Incident to launched replacement in one working day',
      'Trilingual content (EN/MY/ID) editable by staff with Google sign-in',
      'Every fact on the site verified against source systems before publishing',
    ],
    links: [{ label: 'todakstudios.com', url: 'https://todakstudios.com' }],
  },
  {
    id: 'hermes',
    title: 'Hermes — The Second Agent',
    oneLiner: 'A second autonomous agent on a different model family — running on the twin fine-tune.',
    story:
      "Monocultures are fragile, so the fleet runs a second agent built on a different LLM stack. Hermes owns the \"nags\" lane — recurring nudges and check-ins — and its language model is the twin fine-tune itself, served from the lab's own GPU. One part redundancy experiment, one part proving ground for local-model agents.",
    category: 'fleet',
    status: 'live',
    era: '2026',
    techStack: ['Nous Hermes', 'Local LLM serving', 'Node.js', 'WhatsApp relay'],
    highlights: [
      'Cross-model redundancy: not everything depends on one AI vendor',
      'Serves the Forge-trained twin model as its brain',
      'Owns the recurring-reminders lane for daily life ops',
    ],
  },
  {
    id: 'meeting-memory',
    title: 'Meeting Memory Sync',
    oneLiner: 'Meetings become searchable memory minutes after they end.',
    story:
      'Meeting minutes from the team workspace mirror automatically into neo-brain shortly after each meeting closes — so within minutes, any agent can answer "what did we decide this morning?" No note-taking, no uploading, no asking anyone to remember.',
    category: 'fleet',
    status: 'live',
    era: '2026',
    techStack: ['Node.js', 'Cron', 'Supabase', 'Gemini embeddings'],
    highlights: [
      'Minutes land in shared memory ~5 minutes after meetings end',
      'Decisions become quotable by every agent immediately',
    ],
  },
  {
    id: 'personal-monitor',
    title: 'Personal Monitor',
    oneLiner: 'Apple Watch health data on a private dashboard.',
    story:
      'Health metrics from an Apple Watch flow to a personal dashboard — sleep, activity and heart data in one place, on infrastructure Neo owns. The quantified-self corner of the lab.',
    category: 'tool',
    status: 'live',
    era: '2026',
    techStack: ['HealthKit', 'JavaScript', 'Netlify', 'Supabase'],
    highlights: ['Continuous Apple Watch ingestion', 'Private-by-default dashboards'],
  },

  // ───────────────────────── The proven stack (still running) ─────────────────────────
  {
    id: 'claude-tools-kit',
    title: 'Claude Tools Kit (CTK)',
    oneLiner: 'The discipline layer for a multi-agent life: memory, workflow, enforcement.',
    story:
      "When dozens of AI sessions work in parallel, chaos is the default. CTK is the rulebook and toolbox that prevents it: session workflows, an enforcement doc every agent must honour, memory-save tooling, credential routing, and coordination rules so two sessions never trample one repo. It's the reason the fleet behaves like a team instead of a mob.",
    category: 'tool',
    status: 'live',
    era: '2024–2026',
    techStack: ['Node.js', 'TypeScript', 'PostgreSQL', 'pgVector', 'MCP'],
    highlights: [
      'Shared workflow + enforcement rules loaded by every coding session',
      'Memory SDK and save-tooling wired to neo-brain',
      'Multi-session coordination: pre-flight checks and change logs on shared infrastructure',
    ],
    links: [{ label: 'GitHub', url: 'https://github.com/broneotodak/claude-tools-kit' }],
  },
  {
    id: 'clauden',
    title: 'ClaudeN Dashboard',
    oneLiner: 'The admin cockpit and API behind the digital twin.',
    story:
      'ClaudeN is the ops surface for the twin: an admin dashboard plus the API layer that serves twin conversations, with origin-aware privacy so public callers only ever reach public memories.',
    category: 'tool',
    status: 'live',
    era: '2025–2026',
    techStack: ['Next.js', 'Netlify', 'Supabase', 'OpenAI', 'Gemini'],
    highlights: [
      'Serves the public twin chat with privacy-gated retrieval',
      'Admin view over conversations and memory',
    ],
  },
  {
    id: 'presentai',
    title: 'PresentAI Hub',
    oneLiner: 'The AI SaaS shopfront — MeetingMind and TwinAI as products.',
    story:
      'The lab’s productization corner: a hub site offering AI services built from the same stack the fleet runs on — meeting intelligence and personal-twin products, packaged for subscription.',
    category: 'saas',
    status: 'live',
    era: '2025–2026',
    techStack: ['Next.js', 'Netlify', 'Supabase'],
    highlights: ['MeetingMind and TwinAI product lines', 'Runs on the same infrastructure as the internal fleet'],
    links: [{ label: 'presentation.neotodak.com', url: 'https://presentation.neotodak.com' }],
  },
  {
    id: 'thr-intelligence',
    title: 'THR — Group HRMS',
    oneLiner: 'The HR system running a 250-person group — built in-house, run in production.',
    story:
      "THR manages the TODAK group's employee lifecycle: payroll with Malaysian statutory calculations, attendance, documents, memos and org structure across eleven entities. Built by the family, for the family — and now maintained day-to-day by a non-developer using AI coding tools, which might be the most 2026 sentence in this catalog.",
    category: 'saas',
    status: 'live',
    era: '2024–2026',
    techStack: ['React', 'TypeScript', 'Supabase', 'pgVector', 'Netlify'],
    highlights: [
      'Full payroll with PCB/EPF/SOCSO for Malaysian compliance',
      'Serves ~250 staff across 11 group entities in production',
      'Handed to a non-developer owner who maintains it with AI tooling',
    ],
  },

  // ───────────────────────── Evolved — the work lives on ─────────────────────────
  {
    id: 'openclaw',
    title: 'OpenClaw',
    oneLiner: 'The original agent fleet — WhatsApp routing, scrapers, reminders on one brave machine.',
    story:
      'OpenClaw was the first take on an always-on agent fleet: gateway, router, reminder agent, voice-note ingestion and scrapers, all on one dedicated machine. Everything it pioneered — and everything it got wrong — became the blueprint for NACA and Siti.',
    category: 'fleet',
    status: 'evolved',
    evolvedInto: 'naca-fleet',
    era: '2025',
    techStack: ['Node.js', 'Baileys', 'Puppeteer', 'Tailscale', 'Supabase'],
    highlights: [
      'First 24/7 multi-service agent machine',
      'Voice notes auto-transcribed into memory',
      'Lessons learned became the NACA fleet architecture',
    ],
  },
  {
    id: 'todak-ai-bot',
    title: 'TODAK AI Bot (Sofia)',
    oneLiner: 'The first company WhatsApp assistant — Siti’s ancestor.',
    story:
      'Sofia answered company WhatsApp queries with n8n workflows and GPT-4 — the proof that staff would happily talk to an AI colleague. Her descendants got memory, hands and a work ethic.',
    category: 'ai',
    status: 'evolved',
    evolvedInto: 'siti',
    era: '2024–2025',
    techStack: ['n8n', 'OpenAI', 'WhatsApp API', 'Supabase'],
    highlights: ['First company-facing WhatsApp AI', 'HR self-service via chat', 'Multi-language from day one'],
  },
  {
    id: 'llm-dataset',
    title: 'TODAK LLM Dataset',
    oneLiner: 'The first personal-corpus fine-tune experiments — The Forge’s origin story.',
    story:
      'Manual dataset extractions, a first LoRA cook on rented GPUs, honest scoring that said "60% — not good enough to deploy." The toolchain proved out, the lessons compounded, and the manual pipeline grew into the fully automatic Forge.',
    category: 'research',
    status: 'evolved',
    evolvedInto: 'the-forge',
    era: '2025–2026',
    techStack: ['PyTorch', 'LoRA', 'RunPod', 'MLX'],
    highlights: ['End-to-end fine-tune toolchain proven for under RM1 of compute', 'Honest eval culture: 60% Neo-likeness meant no deploy'],
  },
  {
    id: 'flowstate-ai',
    title: 'FlowState AI',
    oneLiner: 'The first cross-tool AI memory — replaced by neo-brain.',
    story:
      'FlowState tracked activity across every AI tool in the workflow and stored it as shared memory — the proof-of-concept that a unified memory layer changes everything. neo-brain is its production-grade successor.',
    category: 'ai',
    status: 'archived',
    evolvedInto: 'neo-brain',
    era: '2024–2025',
    techStack: ['JavaScript', 'Supabase', 'pgVector', 'Edge Functions'],
    highlights: ['Unified activity memory across 4+ AI tools', 'Direct ancestor of the neo-brain architecture'],
  },

  // ───────────────────────── Delivered / parked ─────────────────────────
  {
    id: 'todak-academy-v2',
    title: 'Todak Academy Portal V2',
    oneLiner: 'Laravel-to-modern-stack rewrite of a 3,000-student portal — delivered, cutover parked.',
    story:
      'A full rewrite of the academy student portal: 3,141 students and 59 courses migrated with integrity checks, monthly running costs cut by ~94%. Phase one shipped; the production cutover waits on business timing, not code.',
    category: 'education',
    status: 'parked',
    era: '2026',
    techStack: ['React', 'TypeScript', 'Supabase', 'MUI', 'Netlify'],
    highlights: ['3,141 students / 59 courses migrated with verification', 'Monthly cost cut from ~RM400 to ~RM25'],
  },
  {
    id: 'ars-intelligence',
    title: 'ARS Intelligence',
    oneLiner: 'AI voice interviews for recruitment screening.',
    story:
      'Automated first-round interviews: an AI voice calls candidates, holds a natural conversation, and produces transcripts and scores. Delivered as a working system; parked pending a hiring push worth pointing it at.',
    category: 'saas',
    status: 'parked',
    era: '2024–2025',
    techStack: ['Python', 'ElevenLabs', 'OpenAI', 'Twilio', 'n8n', 'Supabase'],
    highlights: ['AI-voiced interviews available 24/7', 'Transcripts, sentiment and scoring per candidate'],
  },
  {
    id: 'tad-event-system',
    title: 'TAD Event System',
    oneLiner: 'QR check-in, live trivia and dramatic lucky draws for corporate events.',
    story:
      'Built for company annual dinners: AI-powered participant import from messy spreadsheets, QR check-in at the door, live trivia leaderboards, and a lucky draw with proper suspense. Delivered and used in production events.',
    category: 'saas',
    status: 'parked',
    era: '2024–2025',
    techStack: ['JavaScript', 'Supabase', 'WebSockets', 'Netlify Functions'],
    highlights: ['AI import from PDF/Excel participant lists', 'Real-time trivia and animated draws for hundreds of guests'],
  },
  {
    id: 'firasah-ai',
    title: 'Firasah AI',
    oneLiner: 'Classical Islamic physiognomy texts meet computer vision.',
    story:
      'A cultural-heritage experiment: facial analysis interpreted through digitized classical Firasah texts, bilingual output, zero data retention. A genuinely unusual corner of the lab.',
    category: 'ai',
    status: 'parked',
    era: '2024–2025',
    techStack: ['Next.js', 'Replicate', 'LLaVA', 'OpenAI'],
    highlights: ['Classical Kitab Firasat texts integrated into AI analysis', 'Privacy-first: nothing retained'],
  },
  {
    id: 'venture-canvas',
    title: 'VentureCanvas',
    oneLiner: 'AI-assisted business-model canvassing.',
    story: 'A tool for sketching and stress-testing business models with AI assistance. Functional, parked.',
    category: 'saas',
    status: 'parked',
    era: '2025',
    techStack: ['React', 'Supabase', 'OpenAI'],
    highlights: ['AI-guided canvas building'],
  },
  {
    id: 'classroom-neo',
    title: 'ClassroomNeo',
    oneLiner: 'Classroom management experiments for the academy.',
    story: 'Teaching-side tooling built alongside the academy portal work. Parked with the academy program.',
    category: 'education',
    status: 'parked',
    era: '2025',
    techStack: ['React', 'Supabase', 'Netlify'],
    highlights: ['Companion tooling to the academy portal'],
  },
  {
    id: 'flipper-ai',
    title: 'Flipper Zero AI',
    oneLiner: 'Security research sidearm — signal recon with an AI analyst.',
    story:
      'Pentest-adjacent tinkering: Flipper Zero captures paired with AI analysis for authorized security assessments — the same curiosity that produced formal pentest reports for family businesses.',
    category: 'research',
    status: 'parked',
    era: '2025–2026',
    techStack: ['Flipper Zero', 'Python', 'LLM analysis'],
    highlights: ['Authorized-only security research', 'Feeds the security-agent experiments'],
  },

  // ───────────────────────── Archived — honest shelf ─────────────────────────
  {
    id: 'atlas-ai',
    title: 'ATLAS AI',
    oneLiner: 'Enterprise asset management — superseded by its successor, TAM.',
    story:
      'ATLAS tracked company assets and maintenance. It was retired when TAM replaced it — notably built and run by a non-developer colleague using AI coding tools, exactly the future this lab keeps betting on.',
    category: 'saas',
    status: 'archived',
    era: '2024–2025',
    techStack: ['React', 'Supabase', 'Material-UI'],
    highlights: ['Full asset lifecycle tracking in production', 'Succeeded by TAM, built by a non-developer with AI'],
  },
  {
    id: 'kenal-admin',
    title: 'KENAL Admin',
    oneLiner: 'User management and role-based access console.',
    story: 'Admin console for a user platform — served its purpose, archived cleanly.',
    category: 'saas',
    status: 'archived',
    era: '2024–2025',
    techStack: ['React', 'Supabase'],
    highlights: ['Role-based access control in production'],
  },
  {
    id: 'n8n-hub',
    title: 'n8n Integration Hub',
    oneLiner: 'The workflow-automation era — replaced by agents that write their own glue.',
    story:
      'Before the fleet, automation meant visual workflows. The n8n era wired WhatsApp, HR and AI together and taught a key lesson: at sufficient AI capability, agents replace workflow builders. The fleet is that lesson, running.',
    category: 'tool',
    status: 'archived',
    era: '2024–2025',
    techStack: ['n8n', 'Node.js', 'Webhooks'],
    highlights: ['Dozens of production workflows in its day', 'Consciously replaced by direct agent architecture'],
  },
  {
    id: 'progress-bridge',
    title: 'Neo Progress Bridge',
    oneLiner: 'Early progress-sync experiment between tools.',
    story: 'An early bridge for syncing work status between systems — absorbed into the fleet’s memory layer.',
    category: 'tool',
    status: 'archived',
    era: '2025',
    techStack: ['Node.js', 'Supabase'],
    highlights: ['Groundwork for fleet status reporting'],
  },
]

export const catalogStats = {
  verifiedOn: '2026-08-20',
  total: catalog.length,
  live: catalog.filter((p) => p.status === 'live').length,
  flagship: catalog.filter((p) => p.flagship).length,
}
