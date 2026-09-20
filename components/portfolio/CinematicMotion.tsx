'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Progressive enhancement: all content is visible without JS or with reduced motion.
export function CinematicMotion() {
  const pathname = usePathname()
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let clean = () => {}
    const setup = () => {
      clean()
      if (preference.matches) return
      const elements = [...document.querySelectorAll<HTMLElement>('[data-reveal]')]
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).dataset.revealState = 'visible'
            observer.unobserve(entry.target)
          }
        })
      }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' })
      elements.forEach(element => {
        if (element.getBoundingClientRect().top > innerHeight) element.dataset.revealState = 'pending'
        observer.observe(element)
      })
      const art = document.querySelector<HTMLElement>('.hero-portrait')
      const desktop = window.matchMedia('(min-width: 901px) and (pointer: fine)')
      let frame = 0
      const update = () => {
        frame = 0
        if (art) art.style.setProperty('--parallax', desktop.matches ? `${Math.min(scrollY, 950) * 0.065}px` : '0px')
      }
      const scroll = () => { if (!frame) frame = requestAnimationFrame(update) }
      window.addEventListener('scroll', scroll, { passive: true })
      desktop.addEventListener('change', update)
      update()
      clean = () => {
        observer.disconnect()
        window.removeEventListener('scroll', scroll)
        desktop.removeEventListener('change', update)
        cancelAnimationFrame(frame)
        elements.forEach(element => delete element.dataset.revealState)
        art?.style.removeProperty('--parallax')
      }
    }
    setup()
    preference.addEventListener('change', setup)
    return () => { clean(); preference.removeEventListener('change', setup) }
  }, [pathname])
  return null
}
