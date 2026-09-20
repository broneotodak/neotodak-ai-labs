import type { Metadata, Viewport } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import { notFound } from 'next/navigation'
import { isLocale, languageTags, locales } from '@/lib/portfolio/locales'
import { copy } from '@/lib/portfolio/copy'
import { Header } from '@/components/portfolio/Header'
import { Footer } from '@/components/portfolio/Portfolio'
import './portfolio.css'

const sans = DM_Sans({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const serif = DM_Serif_Display({ subsets: ['latin'], weight: '400', variable: '--font-serif', display: 'swap' })
export const metadata: Metadata = { metadataBase: new URL('https://neotodak.com'), authors: [{ name: 'Neo Todak' }] }
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#f6f5f0' }
export function generateStaticParams() { return locales.map(locale => ({ locale })) }

export default async function PortfolioLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const c = copy[locale]
  return <html lang={languageTags[locale]}><body className={`portfolio ${sans.variable} ${serif.variable}`}>
    <a className="skip-link" href="#main">{c.skip}</a>
    <Header locale={locale} />
    <main id="main" tabIndex={-1}>{children}</main>
    <Footer locale={locale} />
  </body></html>
}
