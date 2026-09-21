'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

type Layer = { element: HTMLElement; travel: number; mobileTravel: number; turn: number }
type Scene = { element: HTMLElement; layers: Layer[]; top: number; height: number; active: boolean }
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

// Layout coordinates ignore the reveal/tilt/parallax transforms. Measuring a
// transformed bounding box here would feed the previous frame back into itself.
function layoutTop(element: HTMLElement) {
  let top = 0
  for (let node: HTMLElement | null = element; node; node = node.offsetParent as HTMLElement | null) top += node.offsetTop
  return top
}

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
      const compact = window.matchMedia('(max-width: 900px), (pointer: coarse)')
      const scenes = new Map<HTMLElement, Scene>()
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach(element => {
        const anchor = element.closest<HTMLElement>('[data-parallax-scene]')
        if (!anchor) return
        let scene = scenes.get(anchor)
        if (!scene) {
          scene = { element: anchor, layers: [], top: 0, height: 0, active: false }
          scenes.set(anchor, scene)
        }
        scene.layers.push({ element, travel: Number(element.dataset.parallax), mobileTravel: Number(element.dataset.parallaxMobile || 0), turn: Number(element.dataset.parallaxTurn || 0) })
      })
      let frame = 0
      let dirty = true
      let viewportHeight = innerHeight
      const activate = (scene: Scene, active: boolean) => {
        if (scene.active === active) return
        scene.active = active
        scene.layers.forEach(({ element }) => {
          if (active) element.dataset.parallaxActive = ''
          else delete element.dataset.parallaxActive
        })
      }
      const update = () => {
        frame = 0
        if (dirty) {
          viewportHeight = innerHeight
          // All geometry reads happen together, only after layout changes.
          scenes.forEach(scene => { scene.top = layoutTop(scene.element); scene.height = scene.element.offsetHeight })
          scenes.forEach(scene => activate(scene, scene.top < scrollY + viewportHeight + 200 && scene.top + scene.height > scrollY - 200))
          dirty = false
        }
        const position = Math.max(0, scrollY)
        scenes.forEach(scene => {
          if (!scene.active) return
          const progress = scene.element.dataset.parallaxScene === 'hero'
            ? clamp(position / Math.max(1, scene.top + scene.height), 0, 1)
            : clamp((position + viewportHeight - scene.top) / (viewportHeight + scene.height), 0, 1) - 0.5
          scene.layers.forEach(({ element, travel, mobileTravel, turn }) => {
            element.style.setProperty('--scroll-y', `${(progress * (compact.matches ? mobileTravel : travel)).toFixed(2)}px`)
            element.style.setProperty('--scroll-turn', `${(progress * turn * (compact.matches ? 0.5 : 1)).toFixed(3)}deg`)
          })
        })
      }
      const scroll = () => { if (!frame) frame = requestAnimationFrame(update) }
      const invalidate = () => { dirty = true; scroll() }
      const visibility = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const scene = scenes.get(entry.target as HTMLElement)
          if (scene) activate(scene, entry.isIntersecting)
        })
        scroll()
      }, { rootMargin: '200px 0px' })
      scenes.forEach(scene => visibility.observe(scene.element))
      const resize = new ResizeObserver(invalidate)
      resize.observe(document.body)
      scenes.forEach(scene => resize.observe(scene.element))
      window.addEventListener('scroll', scroll, { passive: true })
      window.addEventListener('resize', invalidate)
      compact.addEventListener('change', invalidate)
      update()
      clean = () => {
        observer.disconnect()
        visibility.disconnect()
        resize.disconnect()
        window.removeEventListener('scroll', scroll)
        window.removeEventListener('resize', invalidate)
        compact.removeEventListener('change', invalidate)
        cancelAnimationFrame(frame)
        elements.forEach(element => delete element.dataset.revealState)
        scenes.forEach(scene => scene.layers.forEach(({ element }) => {
          delete element.dataset.parallaxActive
          element.style.removeProperty('--scroll-y')
          element.style.removeProperty('--scroll-turn')
        }))
      }
    }
    setup()
    preference.addEventListener('change', setup)
    return () => { clean(); preference.removeEventListener('change', setup) }
  }, [pathname])
  return null
}
