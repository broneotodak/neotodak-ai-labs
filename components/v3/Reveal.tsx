'use client'

import { useEffect } from 'react'

/** Scroll reveal — brutalist snap tier. Same IO pattern proven on todakstudios.com. */
export function Reveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (els.length === 0) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'))
      return
    }

    els.forEach((el) => {
      if (el.dataset.reveal === 'group') {
        Array.from(el.children).forEach((c, i) => {
          ;(c as HTMLElement).style.transitionDelay = `${Math.min(i, 7) * 60}ms`
        })
      }
    })

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          el.classList.add('in')
          io.unobserve(el)
          if (el.dataset.reveal === 'group') {
            window.setTimeout(() => {
              Array.from(el.children).forEach((c) => {
                ;(c as HTMLElement).style.transitionDelay = ''
              })
            }, 1200)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return null
}
