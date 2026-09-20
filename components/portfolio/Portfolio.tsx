import Link from 'next/link'
import Image from 'next/image'
import { copy } from '@/lib/portfolio/copy'
import { localPath, type Locale } from '@/lib/portfolio/locales'
import { links, projects, studioGames, words } from '@/lib/portfolio/projects'

export function Arrow({ diagonal = false }: { diagonal?: boolean }) { return <span className="arrow" aria-hidden="true">{diagonal ? '↗' : '↘'}</span> }
function External({ href, children, className = 'text-link' }: { href: string; children: React.ReactNode; className?: string }) {
  return <a className={className} href={href}>{children}<Arrow diagonal /></a>
}

function FoodCredit({ locale }: { locale: Locale }) {
  return <span className="photo-credit">{copy[locale].photoCredit}: <a href="https://commons.wikimedia.org/wiki/File:Nasi_Lemak_dengan_Chili_Nasi_Lemak_dan_Sotong_Pedas,_di_Penang_Summer_Restaurant.jpg">Meandkancil2020</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a></span>
}
function FoodScreen({ locale, priority = false }: { locale: Locale; priority?: boolean }) {
  return <Image src="/portfolio/apanakmakan-swipe.png" alt={copy[locale].foodAlt} width={590} height={1280} sizes="(max-width: 700px) 260px, 310px" className="food-screen" priority={priority} />
}

export function Recent({ locale }: { locale: Locale }) {
  const c = copy[locale]
  return <div className="project-grid">
    <article className="project-card">
      <div className="project-visual food-visual"><div className="food-art-copy" aria-hidden="true">Apa<br/>Nak<br/>Makan<span>?</span></div><FoodScreen locale={locale} /></div>
      <div className="project-meta"><span>{c.app}</span><span className="status"><i/>{c.testing}</span></div>
      <h3><Link href={localPath(locale, 'work/apanakmakan')}>ApaNakMakan</Link></h3>
      <p>{c.foodTagline}</p>
      <External href={links.app}>{c.exploreApp}</External>
      <FoodCredit locale={locale} />
    </article>
    <article className="project-card">
      <div className="project-visual rush-visual"><Image src="/portfolio/police-sentri-rush.png" alt={c.rushAlt} width={1600} height={900} sizes="(max-width: 700px) 100vw, 600px" /></div>
      <div className="project-meta"><span>{c.game}</span><span>{c.released}</span></div>
      <h3><Link href={localPath(locale, 'work/police-sentri-rush')}>police sentri : RUSH</Link></h3>
      <p>{c.rushTagline}</p>
      <Link className="text-link" href={localPath(locale, 'work/police-sentri-rush')}>{c.seeGame}<Arrow diagonal /></Link>
    </article>
  </div>
}

export function City({ locale }: { locale: Locale }) {
  const c = copy[locale]
  return <section className="city-section section" id="ai-world" aria-labelledby="city-title">
    <div className="section-heading"><div><p className="eyebrow">NACA City</p><h2 id="city-title">{c.peek}</h2><p className="lede">{c.citySummary}</p></div><External href={links.city}>{c.openCity}</External></div>
    <figure className="city-figure"><Image src="/portfolio/naca-city.png" alt={c.cityAlt} width={1370} height={860} sizes="(max-width: 1200px) 100vw, 1180px" /><figcaption>{c.cityCaption}</figcaption></figure>
  </section>
}

export function Home({ locale }: { locale: Locale }) {
  const c = copy[locale]
  return <div className="shell">
    <section className="hero" aria-labelledby="intro-title">
      <div className="hero-copy"><p className="eyebrow">{c.eyebrow}</p><h1 id="intro-title"><span>{c.hello}</span>{c.headline}</h1><p className="intro">{c.intro}</p><p className="roles">{c.roles}</p><div className="actions"><Link className="button" href={localPath(locale, 'work')}>{c.explore}<Arrow /></Link><Link className="text-link" href={localPath(locale, 'about')}>{c.moreAbout}</Link></div></div>
      <figure className="hero-portrait"><Image src="/neo.jpg" alt={c.portraitAlt} width={800} height={800} sizes="(max-width: 700px) 200px, (max-width: 1000px) 42vw, 480px" priority /><figcaption>Ahmad Fadli · Neo Todak</figcaption></figure>
    </section>
    <section className="section recent-section" id="recent-work"><div className="section-heading"><h2>{c.recent}</h2><Link className="text-link" href={localPath(locale, 'work')}>{c.allProjects}<Arrow diagonal /></Link></div><Recent locale={locale}/></section>
    <City locale={locale}/>
    <section className="section about-summary" id="about"><h2>{c.aboutTitle}</h2><div><p className="lede">{c.aboutSummary}</p><p className="roles">{c.roles}</p><Link className="text-link" href={localPath(locale, 'about')}>{c.moreAbout}<Arrow diagonal /></Link></div></section>
    <nav className="more-work" aria-label={c.moreWork}><h2>{c.moreWork}</h2><Link href={localPath(locale, 'work/ai')}>{c.ai}<Arrow diagonal /></Link><Link href={`${localPath(locale, 'work')}#studio`}>{c.studio}<Arrow diagonal /></Link><Link href={localPath(locale, 'about')}>{c.story}<Arrow diagonal /></Link></nav>
  </div>
}

function Intro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <header className="page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lede">{description}</p></header>
}
function ProjectList({ locale, earlier = false }: { locale: Locale; earlier?: boolean }) {
  return <div className="project-list">{projects.filter(p => Boolean(p.earlier) === earlier).map(p => <article key={p.id} id={p.id}>
    <h3>{typeof p.name === 'string' ? p.name : words(p.name, locale)}</h3><p>{words(p.description, locale)}</p>
    {p.id === 'digital-twin' && <Link className="text-link" href={localPath(locale, 'work/ai')}>{copy[locale].twinTitle}<Arrow diagonal/></Link>}
  </article>)}</div>
}
export function Work({ locale }: { locale: Locale }) {
  const c = copy[locale]
  return <div className="shell"><Intro eyebrow={c.work} title={c.workTitle} description={c.workIntro}/>
    <nav className="collection-nav" aria-label={c.work}><a href="#latest">{c.latest}</a><a href="#studio">{c.studio}</a><a href="#lab">{c.lab}</a><a href="#earlier">{c.earlier}</a></nav>
    <section className="section" id="latest"><h2 className="section-title">{c.latest}</h2><Recent locale={locale}/></section>
    <section className="section" id="studio"><div className="section-heading"><div><h2>{c.studio}</h2><p className="lede">{c.studioIntro}</p></div><External href={links.studio}>{c.visitStudio}</External></div><div className="studio-games">{studioGames.map(g => <article key={g.name}><h3>{g.name}</h3><p>{words(g.description, locale)}</p></article>)}</div></section>
    <section className="section" id="lab"><div className="section-heading"><h2>{c.lab}</h2><Link className="text-link" href={localPath(locale, 'work/ai')}>{c.ai}<Arrow diagonal/></Link></div><div className="city-collection"><h3>NACA City</h3><p>{c.citySummary}</p><External href={links.city}>{c.openCity}</External></div><ProjectList locale={locale}/></section>
    <section className="section" id="earlier"><h2>{c.earlier}</h2><p className="lede">{c.earlierIntro}</p><ProjectList locale={locale} earlier /></section>
  </div>
}

export function Project({ locale, kind }: { locale: Locale; kind: 'food' | 'rush' }) {
  const c = copy[locale], food = kind === 'food'
  const title = food ? 'ApaNakMakan' : 'police sentri : RUSH'
  const paragraphs = food ? [c.foodWhat, c.foodWhy, c.foodRole, c.foodToday] : [c.rushWhat, c.rushWhy, c.rushRole, c.rushToday]
  return <div className="shell detail-page">
    <Link className="back-link" href={localPath(locale, 'work')}><span aria-hidden="true">←</span> {c.back}</Link>
    <div className={`detail-hero ${food ? 'detail-food' : 'detail-rush'}`}>
      <div><p className="eyebrow">{food ? c.app : c.game} · {food ? c.testing : c.released}</p><h1>{title}</h1><p className="detail-tagline">{food ? c.foodTagline : c.rushTagline}</p><p className="lede">{food ? c.foodSummary : c.rushSummary}</p><div className="actions">{food ? <External href={links.app} className="button">{c.exploreApp}</External> : <><External href={links.apple} className="button">{c.apple}</External><External href={links.google} className="button button-outline">{c.google}</External></>}</div></div>
      {food && <figure className="detail-phone"><FoodScreen locale={locale} priority /><figcaption>{c.foodScreen}<FoodCredit locale={locale}/></figcaption></figure>}
    </div>
    {!food && <figure className="detail-game-art"><Image src="/portfolio/police-sentri-rush.png" alt={c.rushAlt} width={1600} height={900} sizes="(max-width: 1200px) 100vw, 1180px" priority/><figcaption>{c.promo}</figcaption></figure>}
    <div className="story-sections">{[c.what, c.why, c.role, c.today].map((heading, i) => <section key={heading}><h2>{heading}</h2><p>{paragraphs[i]}</p></section>)}</div>
  </div>
}

export function AI({ locale }: { locale: Locale }) {
  const c = copy[locale]
  return <div className="shell"><Intro eyebrow={c.ai} title={c.aiTitle} description={c.aiIntro}/><City locale={locale}/><section className="section"><h2 className="section-title">{c.lab}</h2><ProjectList locale={locale}/></section><section className="twin-invitation section"><div><p className="eyebrow">AI</p><h2>{c.twinTitle}</h2><p className="lede">{c.twinText}</p></div><a href="/twin/" className="button">{c.twinAction}<Arrow diagonal/></a></section></div>
}

export function About({ locale }: { locale: Locale }) {
  const c = copy[locale]
  return <div className="shell"><Intro eyebrow={c.about} title={c.aboutTitle} description={c.aboutIntro}/><section className="about-page"><figure><Image src="/neo.jpg" alt={c.portraitAlt} width={800} height={800} sizes="(max-width: 700px) 100vw, 450px" priority/><figcaption>Ahmad Fadli · Neo Todak</figcaption></figure><div className="about-prose"><p className="roles">{c.roles}</p><p>{c.aboutBody}</p><p>{c.aboutBody2}</p><Link className="button" href={localPath(locale, 'work')}>{c.aboutLink}<Arrow/></Link></div></section></div>
}

export function Contact({ locale }: { locale: Locale }) {
  const c = copy[locale]
  return <div className="shell"><Intro eyebrow={c.contact} title={c.contactTitle} description={c.contactIntro}/><div className="contact-grid"><section className="email-card"><p className="eyebrow">{c.email}</p><a href={links.email}>neo@todak.com<Arrow diagonal/></a></section><section className="contact-socials"><h2>{c.elsewhere}</h2><External href={links.linkedin}>LinkedIn</External><External href={links.github}>GitHub</External></section></div><section className="section studio-contact"><h2>{c.studioContact}</h2><p className="lede">{c.studioContactText}</p><External href={links.studio}>{c.visitStudio}</External></section></div>
}

export function Footer({ locale }: { locale: Locale }) {
  const c = copy[locale]
  return <footer className="shell site-footer"><div className="footer-invite"><h2>{c.contactTitle}</h2><Link className="button button-warm" href={localPath(locale, 'contact')}>{c.talk}<Arrow diagonal/></Link></div><div className="footer-bottom"><Link className="wordmark" href={localPath(locale)}>Neo Todak<span>.</span></Link><p>{c.footerLine}</p><div><a href={links.linkedin}>LinkedIn</a><a href={links.github}>GitHub</a></div></div></footer>
}
