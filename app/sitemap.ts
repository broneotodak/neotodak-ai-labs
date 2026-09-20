import type { MetadataRoute } from 'next'
import { locales, languageTags, pagePaths, localPath } from '@/lib/portfolio/locales'
export default function sitemap(): MetadataRoute.Sitemap {
  return pagePaths.flatMap(path => locales.map(locale => ({
    url: `https://neotodak.com${localPath(locale, path)}`,
    alternates: { languages: Object.fromEntries(locales.map(l => [languageTags[l], `https://neotodak.com${localPath(l, path)}`])) },
  })))
}
