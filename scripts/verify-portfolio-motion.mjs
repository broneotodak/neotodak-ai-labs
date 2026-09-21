import { chromium } from '@playwright/test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'

const origin = process.env.PORTFOLIO_URL || 'http://127.0.0.1:4322'
const output = process.env.PORTFOLIO_REPORT_DIR || 'docs/parallax'
const base = process.env.PORTFOLIO_BASE || 'fc13e782ea803f268ce650c6280c07be87eaf47b'
const preserved = ['lib/portfolio', 'public', 'app/(legacy)', 'app/api', 'app/route.ts', 'app/sitemap.ts', 'app/[locale]/[[...path]]/page.tsx', 'next.config.js', 'netlify.toml', 'package.json', 'package-lock.json', 'app/icon.png']
execFileSync('git', ['diff', '--exit-code', base, '--', ...preserved], { stdio: 'pipe' })
await mkdir(output, { recursive: true })
const browser = await chromium.launch({ channel: process.env.PORTFOLIO_BROWSER || 'chrome', headless: true })
const results = [], errors = []
const pause = page => page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
const scrollTo = async (page, y) => { await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), y); await pause(page) }
const value = locator => locator.evaluate(e => parseFloat(getComputedStyle(e).translate.split(' ').at(-1)) || 0)
const documentTop = locator => locator.evaluate(e => e.getBoundingClientRect().top + scrollY)
const ready = async (page, path) => {
  await page.goto(`${origin}${path}${origin.includes('deploy-preview-') ? '?ntl-drawer-state=hidden' : ''}`, { waitUntil: 'networkidle' })
  await page.evaluate(async () => {
    await document.fonts.ready
    for (const image of document.images) image.loading = 'eager'
    await Promise.all([...document.images].map(image => image.decode().catch(() => {})))
  })
  await pause(page)
}
try {
  for (const mobile of [false, true]) {
    const width = mobile ? 390 : 1440
    const context = await browser.newContext({ viewport: { width, height: mobile ? 844 : 1000 }, isMobile: mobile, hasTouch: mobile, reducedMotion: 'no-preference' })
    const page = await context.newPage()
    page.on('pageerror', error => errors.push(error.message))
    for (const locale of ['en', 'ms', 'id', 'zh']) {
      await ready(page, `/${locale}/`)
      const hero = page.locator('.hero-portrait'), heading = page.locator('h1')
      assert.equal(await page.locator('[data-parallax]').count(), 6)
      const headingTop = await documentTop(heading)
      await scrollTo(page, 0)
      const first = await value(hero)
      await scrollTo(page, 320)
      assert(await value(hero) - first > (mobile ? 12 : 30), `${locale}/${width}: visible portrait movement`)
      assert(Math.abs(await documentTop(heading) - headingTop) < 1, 'Heading remains in its natural layout')
      const samples = []
      for (const selector of ['.phone-mock', '.rush-visual', '.city-figure']) {
        const art = page.locator(selector)
        const target = await art.evaluate(e => {
          const scene = e.closest('[data-parallax-scene]')
          let top = 0
          for (let node = scene; node; node = node.offsetParent) top += node.offsetTop
          return top + scene.offsetHeight / 2 - innerHeight / 2
        })
        await scrollTo(page, target - 140)
        // Allow the existing one-time section reveal to finish before comparing geometry.
        await page.waitForTimeout(750)
        const before = await value(art)
        await scrollTo(page, target + 140)
        const after = await value(art)
        assert(Math.abs(after - before) > (mobile ? 8 : 15), `${locale}/${width}: ${selector} moves with scroll`)
        assert(Math.abs(after) <= Math.abs(Number(await art.getAttribute(mobile ? 'data-parallax-mobile' : 'data-parallax'))) / 2 + 1, 'Travel stays bounded')
        if (selector === '.phone-mock') {
          const background = await value(page.locator('.food-art-copy'))
          assert(after * background < 0, 'Phone and background lettering move at different depths')
        }
        samples.push({ selector, before, after })
      }
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'No horizontal overflow while animated')
      // CSS and JS must both respond to a live accessibility preference change.
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.waitForFunction(() => !document.querySelector('[data-parallax-active], [data-reveal-state]'))
      for (const art of await page.locator('[data-parallax]').all()) {
        assert.equal(await art.evaluate(e => getComputedStyle(e).translate), 'none')
        assert.equal(await art.evaluate(e => getComputedStyle(e).rotate), 'none')
        assert.equal(await art.evaluate(e => e.style.getPropertyValue('--scroll-y')), '')
      }
      await scrollTo(page, 0)
      assert.equal(await hero.evaluate(e => getComputedStyle(e).translate), 'none')
      await page.emulateMedia({ reducedMotion: 'no-preference' })
      await scrollTo(page, 250)
      await page.waitForFunction(() => parseFloat(document.querySelector('.hero-portrait').style.getPropertyValue('--scroll-y')) > 0)
      results.push({ locale, width, touch: mobile, samples, textStable: true, reducedMotion: true })
      console.log(`Verified ${locale} parallax at ${width}px${mobile ? ' with touch input' : ''}.`)
    }
    // Cleanup and reinitialization on actual client-side navigation, not only reloads.
    await ready(page, '/en/')
    await scrollTo(page, 0)
    await page.locator('.hero .text-link').click()
    await page.waitForURL('**/en/about/')
    await page.waitForFunction(() => document.querySelector('.about-page [data-parallax]')?.style.getPropertyValue('--scroll-y'))
    await page.locator('.site-header .wordmark').click()
    await page.waitForURL('**/en/')
    await scrollTo(page, 300)
    await page.waitForFunction(() => parseFloat(document.querySelector('.hero-portrait')?.style.getPropertyValue('--scroll-y')) > 0)
    // Resizing must recalculate the scene positions and the lighter phone profile.
    await page.setViewportSize({ width: 320, height: 740 })
    for (const locale of ['en', 'ms', 'id', 'zh']) {
      await ready(page, `/${locale}/`)
      await scrollTo(page, 240)
      assert(await value(page.locator('.hero-portrait')) > 0, 'Motion remains enabled on narrow phones')
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `320px overflow: ${locale}`)
      assert(await page.locator('.hero-headline').evaluate(e => e.scrollWidth <= e.clientWidth), `320px headline clipping: ${locale}`)
    }
    await context.close()
  }
  const noJS = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } })
  const plain = await noJS.newPage()
  await plain.goto(`${origin}/zh/`)
  for (const element of await plain.locator('[data-reveal]').all()) assert.equal(await element.evaluate(e => getComputedStyle(e).opacity), '1')
  for (const element of await plain.locator('[data-parallax]').all()) assert.equal(await element.evaluate(e => e.style.getPropertyValue('--scroll-y')), '')
  await noJS.close()
  assert.deepEqual(errors, [], 'No browser runtime errors')
  await writeFile(`${output}/motion-and-preservation.json`, JSON.stringify({ checkedAt: new Date().toISOString(), origin, base, preserved, results, checks: ['Visible scene-relative parallax on desktop and touch phones', 'Headings retain natural document position', 'Bounded travel and opposing phone/background depth', 'Runtime reduced-motion changes clear effects and restore cleanly', 'Client navigation cleans up and reinitializes scenes', 'Resize and 320px layout', 'No-JS content visible', 'All existing copy, contacts, assets, routes and dependencies preserved'], errors }, null, 2))
  console.log(`PASS: parallax in all four languages on desktop/touch phone; accessibility, navigation, resize, no-JS and source preservation.`)
} finally { await browser.close() }
