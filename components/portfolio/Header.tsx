'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { copy } from '@/lib/portfolio/copy'
import { languageNames, languageTags, locales, localPath, type Locale } from '@/lib/portfolio/locales'

export function Header({ locale }: { locale: Locale }) {
  const c = copy[locale]
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const language = useRef<HTMLDetailsElement>(null)
  const header = useRef<HTMLElement>(null)
  const remainingPath = pathname.split('/').slice(2).filter(Boolean).join('/')
  useEffect(() => { setOpen(false); if (language.current) language.current.open = false }, [pathname])
  useEffect(() => {
    if (open) document.querySelector<HTMLAnchorElement>('#primary-navigation a')?.focus()
  }, [open])
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (language.current?.open) { language.current.open = false; language.current.querySelector('summary')?.focus() }
      else if (open) { setOpen(false); toggle.current?.focus() }
    }
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) { setOpen(false); if (language.current) language.current.open = false }
    }
    document.addEventListener('keydown', escape)
    document.addEventListener('pointerdown', outside)
    return () => { document.removeEventListener('keydown', escape); document.removeEventListener('pointerdown', outside) }
  }, [open])
  function chooseLanguage(value: Locale) {
    document.cookie = `portfolio-language=${value}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`
  }
  return <header className="site-header" ref={header}>
    <div className="shell header-inner">
      <Link href={localPath(locale)} className="wordmark" aria-label={`Neo Todak — ${c.home}`}>Neo Todak<span>.</span></Link>
      <nav id="primary-navigation" className={`primary-nav ${open ? 'is-open' : ''}`} aria-label={c.menu}>
        {[['work', c.work], ['about', c.about], ['contact', c.contact]].map(([path, label]) => <Link key={path} href={localPath(locale, path)} onClick={() => setOpen(false)} aria-current={remainingPath === path || remainingPath.startsWith(`${path}/`) ? 'page' : undefined}>{label}</Link>)}
      </nav>
      <details className="language-picker" ref={language}>
        <summary aria-label={`${c.language}: ${languageNames[locale]}`}><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-5 5-5 13 0 18M12 3c5 5 5 13 0 18"/></svg><span>{languageNames[locale]}</span><span aria-hidden="true" className="chevron">⌄</span></summary>
        <ul>{locales.map(value => <li key={value}><a href={localPath(value, remainingPath)} lang={languageTags[value]} hrefLang={languageTags[value]} aria-current={locale === value ? 'true' : undefined}
          onClick={event => { chooseLanguage(value); const target = new URL(event.currentTarget.href); target.search = location.search; target.hash = location.hash; event.currentTarget.href = target.href }}>{languageNames[value]}{locale === value && <span aria-hidden="true">✓</span>}</a></li>)}</ul>
      </details>
      <button className="menu-toggle" ref={toggle} aria-expanded={open} aria-controls="primary-navigation" aria-label={open ? c.close : c.menu} onClick={() => setOpen(!open)}><span>{open ? '×' : '☰'}</span></button>
    </div>
  </header>
}
