import type { Locale } from './locales'

// Historical catalogue, rewritten without old live-state or impact claims.
// Decommissioned projects (Sep 2026 clean-up) are not listed; public links are curated separately.
type Words = readonly [string, string, string, string]
type Entry = { id: string; name: string | Words; description: Words; earlier?: boolean }
export const words = (value: Words, locale: Locale) => value[(['en', 'ms', 'id', 'zh'] as const).indexOf(locale)]
export const projects: Entry[] = [
  { id: 'siti', name: 'Siti', description: ['An AI assistant for questions, memory and everyday work.', 'Pembantu AI untuk pertanyaan, ingatan dan kerja harian.', 'Asisten AI untuk pertanyaan, ingatan, dan pekerjaan sehari-hari.', '协助回答问题、记忆信息和处理日常工作的 AI 助手。'] },
  { id: 'naca-fleet', name: 'NACA', description: ['A shared system for coordinating AI agents and their work.', 'Sistem bersama untuk menyelaraskan ejen AI dan kerja mereka.', 'Sistem bersama untuk mengoordinasikan agen AI dan pekerjaannya.', '协调 AI 智能体及其工作的共享系统。'] },
  { id: 'neo-brain', name: 'neo-brain', description: ['Shared memory that helps AI tools keep useful context.', 'Ingatan bersama yang membantu alat AI mengekalkan konteks berguna.', 'Memori bersama yang membantu alat AI menyimpan konteks penting.', '帮助 AI 工具保留有用上下文的共享记忆。'] },
  { id: 'the-forge', name: 'The Forge', description: ['Research into training an AI to reflect my way of communicating.', 'Penyelidikan melatih AI untuk mencerminkan cara saya berkomunikasi.', 'Riset melatih AI agar mencerminkan cara saya berkomunikasi.', '研究如何训练 AI，使其贴近我的表达方式。'] },
  { id: 'digital-twin', name: ['Neo Digital Twin', 'Kembar Digital Neo', 'Kembaran Digital Neo', 'Neo 数字分身'], description: ['An AI representation of me, with an optional public chat.', 'Versi AI yang mewakili saya, dengan sembang awam sebagai pilihan.', 'Versi AI yang mewakili saya, dengan obrolan publik opsional.', '代表我的 AI 分身，提供可选的公开聊天体验。'] },
  { id: 'face-pipeline', name: ['Face Recognition Pipeline', 'Sistem Pengecaman Wajah', 'Sistem Pengenalan Wajah', '人脸识别系统'], description: ['Experiments in organising and searching image collections.', 'Eksperimen menyusun dan mencari koleksi imej.', 'Eksperimen mengatur dan menelusuri koleksi gambar.', '整理和检索图像集合的实验。'] },
  { id: 'email-automation', name: ['Workspace Email Automation', 'Automasi E-mel Workspace', 'Otomatisasi Email Workspace', 'Workspace 邮件自动化'], description: ['Tools for managing workplace email account setup.', 'Alat untuk mengurus penyediaan akaun e-mel tempat kerja.', 'Alat untuk mengelola pembuatan akun email kerja.', '协助管理工作邮件账户创建的工具。'] },
  { id: 'trading-lab', name: 'Trading Lab', description: ['A research project exploring trading tools and simulations.', 'Projek penyelidikan alat dan simulasi dagangan.', 'Proyek riset tentang alat dan simulasi perdagangan.', '探索交易工具与模拟的研究项目。'] },
  { id: 'todakstudios-rebuild', name: 'todakstudios.com', description: ['The studio website, with a home for its work and team.', 'Laman studio untuk memaparkan hasil kerja dan pasukannya.', 'Situs studio untuk memperkenalkan karya dan timnya.', '展示工作室作品与团队的网站。'] },
  { id: 'hermes', name: 'Hermes', description: ['Exploring a different approach to a personal AI assistant.', 'Meneroka pendekatan lain untuk pembantu AI peribadi.', 'Mengeksplorasi pendekatan lain untuk asisten AI pribadi.', '探索个人 AI 助手的另一种实现方式。'] },
  { id: 'meeting-memory', name: ['Meeting Memory Sync', 'Ingatan Mesyuarat', 'Memori Rapat', '会议记忆'], description: ['Making meeting notes easier to find and recall.', 'Memudahkan pencarian dan ingatan semula nota mesyuarat.', 'Memudahkan pencarian dan pengingatan catatan rapat.', '让会议笔记更容易查找和回顾。'] },
  { id: 'personal-monitor', name: 'Personal Monitor', description: ['A personal experiment with Apple Watch health data.', 'Eksperimen peribadi dengan data kesihatan Apple Watch.', 'Eksperimen pribadi dengan data kesehatan Apple Watch.', '使用 Apple Watch 健康数据的个人实验。'] },
  { id: 'claude-tools-kit', name: 'Claude Tools Kit (CTK)', description: ['Memory and workflow tools for working with coding agents.', 'Alat ingatan dan aliran kerja untuk ejen pengekodan.', 'Alat memori dan alur kerja untuk agen pemrograman.', '与编程智能体协作的记忆和工作流程工具。'] },
  { id: 'thr-intelligence', name: 'THR', description: ['Internal software for human resources and people operations.', 'Perisian dalaman untuk sumber manusia dan pengurusan pekerja.', 'Perangkat lunak internal untuk SDM dan pengelolaan karyawan.', '用于人力资源与员工事务的内部软件。'] },
  { id: 'openclaw', name: 'OpenClaw', description: ['An early agent system that informed NACA and Siti.', 'Sistem ejen awal yang menjadi asas pembelajaran NACA dan Siti.', 'Sistem agen awal yang menjadi pembelajaran untuk NACA dan Siti.', '为 NACA 和 Siti 提供经验的早期智能体系统。'], earlier: true },
  { id: 'llm-dataset', name: 'TODAK LLM Dataset', description: ['Early experiments in preparing data to train a personal AI.', 'Eksperimen awal menyediakan data untuk melatih AI peribadi.', 'Eksperimen awal menyiapkan data untuk melatih AI pribadi.', '为训练个人 AI 准备数据的早期实验。'], earlier: true },
  { id: 'todak-academy-v2', name: 'Todak Academy Portal V2', description: ['Work on a student portal for the academy.', 'Pembangunan portal pelajar untuk akademi.', 'Pengembangan portal siswa untuk akademi.', '为学院开发的学生门户。'], earlier: true },
  { id: 'tad-event-system', name: 'TAD Event System', description: ['Event tools for check-in, trivia and lucky draws.', 'Alat acara untuk daftar masuk, kuiz dan cabutan bertuah.', 'Alat acara untuk registrasi, kuis, dan undian berhadiah.', '用于活动签到、问答和抽奖的工具。'], earlier: true },
  { id: 'classroom-neo', name: 'ClassroomNeo', description: ['Experiments in tools for classroom management.', 'Eksperimen alat pengurusan bilik darjah.', 'Eksperimen alat pengelolaan kelas.', '课堂管理工具的实验。'], earlier: true },
  { id: 'flipper-ai', name: 'Flipper Zero AI', description: ['A hardware and AI security-research experiment.', 'Eksperimen penyelidikan keselamatan perkakasan dan AI.', 'Eksperimen riset keamanan perangkat keras dan AI.', '结合硬件与 AI 的安全研究实验。'], earlier: true },
  { id: 'n8n-hub', name: 'n8n Integration Hub', description: ['Workflow experiments connecting tools and services.', 'Eksperimen aliran kerja yang menghubungkan alat dan perkhidmatan.', 'Eksperimen alur kerja yang menghubungkan alat dan layanan.', '连接工具与服务的工作流程实验。'], earlier: true },
  { id: 'progress-bridge', name: 'Neo Progress Bridge', description: ['An early experiment in sharing progress between tools.', 'Eksperimen awal berkongsi kemajuan antara alat.', 'Eksperimen awal berbagi kemajuan antaralat.', '在不同工具之间共享进度的早期实验。'], earlier: true },
]

export const studioGames = [
  { name: 'Mastra', description: ['A mobile battle arena inspired by Nusantara legends.', 'Arena pertempuran mudah alih berinspirasikan legenda Nusantara.', 'Arena pertempuran seluler yang terinspirasi legenda Nusantara.', '以 Nusantara 传说为灵感的移动端竞技游戏。'] as Words },
  { name: 'Police Sentri', description: ['The studio’s police-and-robbers game series.', 'Siri permainan polis dan pencuri daripada studio.', 'Seri game polisi dan pencuri dari studio.', '工作室的警察与小偷游戏系列。'] as Words },
  { name: 'ToGather: Island', description: ['A survival and crafting game set on an island.', 'Permainan kelangsungan hidup dan pertukangan di sebuah pulau.', 'Game bertahan hidup dan merakit di sebuah pulau.', '以岛屿为背景的生存制作游戏。'] as Words },
]

export const links = {
  app: 'https://apanakmakan.com/', city: '', // naca.neotodak.com retired 2026-09-25 (no public NACA door until decided)
  apple: 'https://apps.apple.com/my/app/police-sentri-rush/id6812404214',
  google: 'https://play.google.com/store/apps/details?id=com.todakstudios.policesentrirush',
  studio: 'https://todakstudios.com/', github: 'https://github.com/broneotodak',
  linkedin: 'https://www.linkedin.com/in/broneotodak/', email: 'mailto:neo@todak.com',
}
