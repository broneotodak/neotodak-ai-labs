export const locales = ['en', 'ms', 'id', 'zh'] as const
export type Locale = (typeof locales)[number]
export const languageNames: Record<Locale, string> = { en: 'English', ms: 'Bahasa Melayu', id: 'Bahasa Indonesia', zh: '简体中文' }
export const languageTags: Record<Locale, string> = { en: 'en', ms: 'ms', id: 'id', zh: 'zh-Hans' }
export function isLocale(value: string): value is Locale { return locales.includes(value as Locale) }
export const pagePaths = ['', 'work', 'work/apanakmakan', 'work/police-sentri-rush', 'work/ai', 'about', 'contact'] as const
export type PagePath = (typeof pagePaths)[number]
export function localPath(locale: Locale, path = '') { return `/${locale}/${path ? `${path.replace(/^\/|\/$/g, '')}/` : ''}` }
