import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Barlow_Condensed } from 'next/font/google'
import { notFound } from 'next/navigation'
import { isLocale, languageTags, locales } from '@/lib/portfolio/locales'
import { copy } from '@/lib/portfolio/copy'
import { Header } from '@/components/portfolio/Header'
import { Footer } from '@/components/portfolio/Portfolio'
import { CinematicMotion } from '@/components/portfolio/CinematicMotion'
import './portfolio.css'

const sans = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-sans', display: 'swap' })
const display = Barlow_Condensed({ subsets: ['latin'], weight: '600', variable: '--font-display', display: 'swap' })
export const metadata: Metadata = { metadataBase: new URL('https://neotodak.com'), authors: [{ name: 'Neo Todak' }] }
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#090b10' }
export function generateStaticParams() { return locales.map(locale => ({ locale })) }

export default async function PortfolioLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const c = copy[locale]
  return <html lang={languageTags[locale]}><body className={`portfolio ${sans.variable} ${display.variable}`}>
    <a className="skip-link" href="#main">{c.skip}</a>
    <Header locale={locale} />
    <main id="main" tabIndex={-1}>{children}</main>
    <Footer locale={locale} />
    <CinematicMotion />
  </body></html>
}
