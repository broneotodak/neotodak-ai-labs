import { links } from './projects'

// Public destinations from Neo's Linktree, checked 2026-09-21.
// GitHub is retained from the existing portfolio. Keep one list for both views.
export const socialLinks = [
  { name: 'TikTok', href: 'https://www.tiktok.com/@broneotodak', footer: true },
  { name: 'Instagram', href: 'https://www.instagram.com/broneotodak', footer: true },
  { name: 'YouTube', href: 'https://www.youtube.com/@broneotodak', footer: true },
  { name: 'Facebook', href: 'https://www.facebook.com/neo.macho/', footer: false },
  { name: 'LinkedIn', href: links.linkedin, footer: true },
  { name: 'GitHub', href: links.github, footer: true },
  { name: 'Twitch', href: 'https://www.twitch.tv/broneotodak', footer: false },
  { name: 'Reddit', href: 'https://www.reddit.com/user/neotodak/', footer: false },
  { name: 'Discord', href: 'https://discord.gg/neMBzFkFf9', footer: false },
  { name: 'WhatsApp', href: 'https://api.whatsapp.com/send?phone=60177519610', footer: false },
  { name: 'PayPal', href: 'https://paypal.me/neotodak', footer: false },
  { name: 'Linktree', href: 'https://linktr.ee/broneotodak', footer: true },
] as const
