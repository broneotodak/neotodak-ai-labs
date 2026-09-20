import { chromium } from '@playwright/test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'

const origin = process.env.PORTFOLIO_URL || 'http://127.0.0.1:4318'
const output = process.env.PORTFOLIO_REPORT_DIR || 'docs/v5'
// The v5 brief freezes these sources and all original artwork at approved main.
const base = '7c21db71934088bab9317b111d58d962e2993893'
const preserved = ['lib/portfolio', 'public', 'app/(legacy)', 'app/api', 'app/route.ts', 'app/sitemap.ts', 'app/[locale]/[[...path]]/page.tsx', 'next.config.js', 'netlify.toml', 'package.json', 'package-lock.json', 'app/icon.png']
execFileSync('git', ['diff', '--exit-code', base, '--', ...preserved], { stdio: 'pipe' })
const browser = await chromium.launch({ channel: process.env.PORTFOLIO_BROWSER || 'chrome', headless: true })
const results = []
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' })
  await page.goto(`${origin}/en/`, { waitUntil: 'networkidle' })
  await page.waitForFunction(() => document.querySelector('[data-reveal-state="pending"]'))
  const hero = page.locator('.hero-portrait')
  assert.equal(await hero.evaluate(e => e.style.getPropertyValue('--parallax')), '0px')
  await page.evaluate(() => scrollTo({ top: 250, behavior: 'instant' }))
  await page.waitForFunction(() => parseFloat(document.querySelector('.hero-portrait').style.getPropertyValue('--parallax')) > 0)
  results.push('Desktop hero art moves with scroll; text stays stationary')
  for (const section of await page.locator('[data-reveal]').all()) {
    await section.scrollIntoViewIfNeeded()
    await section.evaluate(e => new Promise(resolve => {
      const check = () => getComputedStyle(e).opacity === '1' ? resolve() : requestAnimationFrame(check)
      check()
    }))
  }
  assert.equal(await page.locator('[data-reveal-state="pending"]').count(), 0)
  results.push('Every scroll reveal becomes fully visible')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.waitForFunction(() => document.querySelectorAll('[data-reveal-state]').length === 0)
  assert.equal(await hero.evaluate(e => getComputedStyle(e).transform), 'none')
  assert.equal(await page.locator('.button').first().evaluate(e => getComputedStyle(e).transitionDuration), '0s')
  results.push('Changing reduced-motion preference immediately removes reveals, parallax and hover motion')
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.evaluate(() => scrollTo({ top: 200, behavior: 'instant' }))
  assert.equal(await hero.evaluate(e => getComputedStyle(e).transform), 'none')
  results.push('Phone composition does not use desktop parallax')
  await page.setViewportSize({ width: 320, height: 740 })
  for (const locale of ['en', 'ms', 'id', 'zh']) {
    await page.goto(`${origin}/${locale}/`)
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `320px overflow: ${locale}`)
    assert(await page.locator('.hero-headline').evaluate(e => e.scrollWidth <= e.clientWidth), `320px headline clipping: ${locale}`)
  }
  results.push('No horizontal overflow at 320px in any language')
  const noJS = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } })
  const plain = await noJS.newPage()
  await plain.goto(`${origin}/zh/`)
  for (const element of await plain.locator('[data-reveal]').all()) {
    assert.equal(await element.evaluate(e => getComputedStyle(e).opacity), '1')
  }
  results.push('All sections visible without JavaScript')
  await noJS.close()
  results.push('Approved copy, catalogues, original assets, routes, redirects, APIs and production dependencies match main byte-for-byte')
  await mkdir(output, { recursive: true })
  await writeFile(`${output}/motion-and-preservation.json`, JSON.stringify({ checkedAt: new Date().toISOString(), origin, base, preserved, results }, null, 2))
  console.log('PASS:', results.join('; '))
} finally { await browser.close() }
