import React from 'react'
import { catalog, catalogStats } from '@/lib/catalog'
import { CatalogGrid } from '@/components/v3/CatalogGrid'
import { Reveal } from '@/components/v3/Reveal'

const SOCIALS = [
  { label: 'GitHub', url: 'https://github.com/broneotodak' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/broneotodak/' },
  { label: 'X', url: 'https://x.com/broneotodak' },
  { label: 'TikTok', url: 'https://www.tiktok.com/@broneotodak' },
  { label: 'Instagram', url: 'https://www.instagram.com/broneotodak/' },
  { label: 'YouTube', url: 'https://www.youtube.com/@broneotodak' },
]

export default function HomePage() {
  const flagships = catalog.filter((p) => p.flagship)

  return (
    <>
      <Reveal />
      <header className="masthead">
        <div className="container">
          <a className="wordmark" href="/">
            <span className="block" aria-hidden="true" />
            Neo Todak <span style={{ color: 'var(--accent)' }}>Labs</span>
          </a>
          <nav className="nav" aria-label="Sections">
            <a href="#operator">The Operator</a>
            <a href="#lab">The Lab</a>
            <a href="#shipped">Shipped</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="btn btn-primary btn-sm" href="/twin">
            Talk to my twin
          </a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <div className="eyebrow">
              <span className="tick">▮</span> NEO TODAK LABS — CYBERJAYA, MALAYSIA
            </div>
            <h1>
              My AI <span className="outline">works</span>
              <br />
              while I <span className="accent">sleep.</span>
            </h1>
            <p className="hero-sub">
              I&rsquo;m Ahmad Fadli — <strong>Neo Todak</strong>. CEO of Todak Studios by day. The rest
              of the time I build an autonomous AI workforce: agents that answer, remember, trade,
              train and ship code around the clock.
            </p>
            <div className="hero-ctas">
              <a className="btn btn-primary" href="/twin">
                Talk to my twin →
              </a>
              <a className="btn btn-ghost" href="#lab">
                See the lab ↓
              </a>
            </div>
            <div className="statgrid">
              <div className="stat">
                <div className="num">
                  36<span className="u">+</span>
                </div>
                <div className="lbl">Agents on the fleet</div>
              </div>
              <div className="stat">
                <div className="num">
                  8,800<span className="u">+</span>
                </div>
                <div className="lbl">Shared memories</div>
              </div>
              <div className="stat">
                <div className="num">
                  80.2<span className="u">%</span>
                </div>
                <div className="lbl">Twin voice-likeness</div>
              </div>
              <div className="stat">
                <div className="num">{catalogStats.total}</div>
                <div className="lbl">Projects, honest statuses</div>
              </div>
            </div>
            <div className="stat-note">FIGURES VERIFIED {catalogStats.verifiedOn} — NOT MARKETING ROUNDING.</div>
          </div>
        </section>

        <section className="chapter" id="operator">
          <div className="container">
            <div className="ch-head" data-reveal>
              <span className="ch-no">CH.01</span>
              <h2>The Operator</h2>
            </div>
            <div className="about-grid">
              <div data-reveal>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="portrait" src="/neo.jpg" alt="Neo Todak" />
                <div className="roles">
                  <div>CEO — Todak Studios</div>
                  <div>VP — Todak Gaming</div>
                  <div>Operator — Neo Todak Labs</div>
                </div>
              </div>
              <div className="about-text" data-reveal>
                <p>
                  By day I run <strong>Todak Studios</strong> — the Malaysian game studio behind
                  Mastra, Police Sentri and ToGather: Island — inside the TODAK ecosystem, from
                  Cyberjaya.
                </p>
                <p>
                  In 2026, running a company and building software stopped being separate jobs. When
                  the studio downsized, I didn&rsquo;t hire a bigger team — I built one out of
                  agents. Today an AI chief-of-staff answers my company&rsquo;s WhatsApp, a shared
                  memory system remembers every decision, a rig in Bandung re-trains my digital twin
                  from my own conversations, and coding agents ship production systems daily —
                  including the site you&rsquo;re reading.
                </p>
                <p>
                  This page is the lab notebook: everything shipped, working, evolved or honestly
                  archived. No &ldquo;coming soon&rdquo;, no vaporware — statuses are verified
                  against the systems themselves.
                </p>
                <div className="socials">
                  {SOCIALS.map((s) => (
                    <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="chapter" id="lab">
          <div className="container">
            <div className="ch-head" data-reveal>
              <span className="ch-no">CH.02</span>
              <h2>The Lab — five systems that run my life</h2>
            </div>
            <p className="ch-lede" data-reveal>
              The flagships. They talk to each other, share one memory, and work whether I&rsquo;m
              awake or not.
            </p>
            <div className="fleet" data-reveal="group">
              {flagships.map((p) => (
                <article className="flagship" key={p.id}>
                  <div className="f-top">
                    <h3>{p.title}</h3>
                    <span className={`chip ${p.status}`}>{p.status}</span>
                  </div>
                  <div className="one">{p.oneLiner}</div>
                  <p className="story">{p.story}</p>
                  <ul>
                    {p.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  <div className="tech-row">
                    {p.techStack.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="chapter" id="shipped">
          <div className="container">
            <div className="ch-head" data-reveal>
              <span className="ch-no">CH.03</span>
              <h2>Everything shipped</h2>
            </div>
            <p className="ch-lede" data-reveal>
              {catalogStats.total} projects since 2024, statuses worn honestly — live means live,
              parked means parked, and dead things stay on the shelf with their lessons. Evolved
              projects point at what they became.
            </p>
            <CatalogGrid />
          </div>
        </section>

        <section className="chapter twin-cta" id="twin">
          <div className="container">
            <div className="twin-box" data-reveal>
              <h2>
                Don&rsquo;t take my word for it. <span className="accent">Interrogate the twin.</span>
              </h2>
              <p>
                My digital twin answers from my real memories — projects, decisions, opinions —
                retrieved semantically per question, restricted to what I&rsquo;ve made public. Its
                voice model is fine-tuned on 31,788 of my own messages by a training rig that feeds
                itself.
              </p>
              <p className="mono-note">PRIVACY-GATED · MEMORY-BACKED · NOT A SCRIPT</p>
              <a className="btn btn-primary" href="/twin">
                Open the twin →
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div className="container">
          <div className="fm">
            NEO TODAK LABS
            <br />
            <a href="mailto:neo@todak.com">neo@todak.com</a>
            <br />
            <a href="https://todakstudios.com" target="_blank" rel="noopener noreferrer">
              Todak Studios ↗
            </a>
          </div>
          <div className="fm" style={{ textAlign: 'right' }}>
            © {new Date().getFullYear()} Neo Todak — built by the fleet it describes.
            <br />
            Statuses verified {catalogStats.verifiedOn}.
          </div>
        </div>
      </footer>
    </>
  )
}
