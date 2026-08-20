'use client'

import { useMemo, useState } from 'react'
import { catalog, type CatalogStatus } from '@/lib/catalog'

const FILTERS: { key: CatalogStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'live', label: 'Live' },
  { key: 'evolved', label: 'Evolved' },
  { key: 'parked', label: 'Parked' },
  { key: 'archived', label: 'Archived' },
]

const titleOf = (id: string) => catalog.find((p) => p.id === id)?.title ?? id

export function CatalogGrid() {
  const [filter, setFilter] = useState<CatalogStatus | 'all'>('all')

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: catalog.length }
    catalog.forEach((p) => {
      c[p.status] = (c[p.status] || 0) + 1
    })
    return c
  }, [])

  const items = useMemo(
    () => (filter === 'all' ? catalog : catalog.filter((p) => p.status === filter)),
    [filter],
  )

  return (
    <div>
      <div className="filters" role="tablist" aria-label="Filter projects by status">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            role="tab"
            aria-selected={filter === f.key}
            className={filter === f.key ? 'on' : ''}
            onClick={() => setFilter(f.key)}
          >
            {f.label} <span className="ct">{counts[f.key] || 0}</span>
          </button>
        ))}
      </div>
      <div className="cat-grid" key={filter}>
        {items.map((p) => (
          <article className="cat-card" key={p.id}>
            <div className="c-top">
              <h3>{p.title}</h3>
              <span className={`chip ${p.status}`}>{p.status}</span>
            </div>
            <div className="era">{p.era}</div>
            <p className="one">{p.oneLiner}</p>
            {p.evolvedInto && (
              <div className="evolves">
                <span className="arrow">↳ became</span> {titleOf(p.evolvedInto)}
              </div>
            )}
            <div className="tech-row">
              {p.techStack.slice(0, 4).map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            {p.links && p.links.length > 0 && (
              <div className="links">
                {p.links.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer">
                    {l.label} ↗
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}
