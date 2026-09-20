import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { copy } from '@/lib/portfolio/copy'
import { isLocale, languageTags, locales, localPath, pagePaths, type PagePath } from '@/lib/portfolio/locales'
import { Home, Work, Project, About, Contact, AI } from '@/components/portfolio/Portfolio'

type Params = Promise<{ locale: string; path?: string[] }>
export const dynamicParams = false
export function generateStaticParams() { return pagePaths.map(path => ({ path: path ? path.split('/') : [] })) }

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, path = [] } = await params
  if (!isLocale(locale)) notFound()
  const route = path.join('/') as PagePath
  if (!pagePaths.includes(route)) notFound()
  const c = copy[locale]
  const titles: Record<PagePath, string> = { '': c.headline, work: c.work, 'work/apanakmakan': 'ApaNakMakan', 'work/police-sentri-rush': 'police sentri : RUSH', 'work/ai': c.ai, about: c.about, contact: c.contact }
  const description = route === 'work/apanakmakan' ? `${c.foodSummary} ${c.testing}.` : route === 'work/police-sentri-rush' ? c.rushSummary : c.meta
  const url = localPath(locale, route)
  const image = route === 'work/police-sentri-rush' ? '/portfolio/police-sentri-rush.png' : '/neo.jpg'
  return { title: `${titles[route]} — Neo Todak`, description,
    alternates: { canonical: url, languages: { ...Object.fromEntries(locales.map(l => [languageTags[l], localPath(l, route)])), 'x-default': localPath('en', route) } },
    openGraph: { title: `${titles[route]} — Neo Todak`, description, url, siteName: 'Neo Todak', type: 'website', locale: { en: 'en_MY', ms: 'ms_MY', id: 'id_ID', zh: 'zh_CN' }[locale], images: [{ url: image }] },
    twitter: { card: 'summary_large_image', title: `${titles[route]} — Neo Todak`, description, images: [image] },
  }
}

export default async function Page({ params }: { params: Params }) {
  const { locale, path = [] } = await params
  if (!isLocale(locale)) notFound()
  switch (path.join('/')) {
    case '': return <Home locale={locale} />
    case 'work': return <Work locale={locale} />
    case 'work/apanakmakan': return <Project locale={locale} kind="food" />
    case 'work/police-sentri-rush': return <Project locale={locale} kind="rush" />
    case 'work/ai': return <AI locale={locale} />
    case 'about': return <About locale={locale} />
    case 'contact': return <Contact locale={locale} />
    default: notFound()
  }
}
