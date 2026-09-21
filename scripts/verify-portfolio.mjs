import { chromium } from '@playwright/test'
import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'

const origin = process.env.PORTFOLIO_URL || 'http://127.0.0.1:4317'
const reportDirectory = process.env.PORTFOLIO_REPORT_DIR || 'docs/v4'
const output = `${reportDirectory}/screenshots`
await mkdir(output, { recursive: true })
const locales = ['en', 'ms', 'id', 'zh']
const tags = { en: 'en', ms: 'ms', id: 'id', zh: 'zh-Hans' }
const languages = { en: 'English', ms: 'Bahasa Melayu', id: 'Bahasa Indonesia', zh: '简体中文' }
const routes = ['', 'work', 'work/apanakmakan', 'work/police-sentri-rush', 'work/ai', 'about', 'contact']
const errors = [], results = [], externalLinks = new Set(), internalLinks = new Set()
const browser = await chromium.launch({ channel: process.env.PORTFOLIO_BROWSER || 'chrome', headless: true })
try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce' })
    const page = await context.newPage()
    page.on('pageerror', error => errors.push(error.message))
    for (const locale of locales) {
      for (const route of routes) {
        const path = `/${locale}/${route ? `${route}/` : ''}`
        const response = await page.goto(`${origin}${path}`, { waitUntil: 'networkidle' })
        assert.equal(response.status(), 200, path)
        assert.equal(await page.locator('html').getAttribute('lang'), tags[locale], `SSR lang: ${path}`)
        const source = await response.text()
        assert(source.includes(`lang="${tags[locale]}"`), `Language must be in server-rendered HTML: ${path}`)
        assert.equal(await page.locator('h1').count(), 1, `One main heading: ${path}`)
        assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), `https://neotodak.com${path}`)
        for (const other of locales) {
          const expected = `https://neotodak.com/${other}/${route ? `${route}/` : ''}`
          assert.equal(await page.locator(`link[rel="alternate"][hreflang="${tags[other]}"]`).getAttribute('href'), expected)
        }
        await page.evaluate(async () => {
          await document.fonts.ready
          // Wake native lazy images before full-page evidence capture.
          for (const image of document.images) image.loading = 'eager'
          await Promise.all([...document.images].map(image => image.decode().catch(() => {})))
        })
        const layout = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth, broken: [...document.images].filter(i => !i.complete || !i.naturalWidth || !i.alt).map(i => i.src) }))
        assert(layout.scroll <= layout.width, `Horizontal overflow: ${path} at ${width}: ${layout.scroll}`)
        assert.deepEqual(layout.broken, [], `Images with useful localised alt: ${path}`)
        assert.equal(await page.locator('iframe, script[src^="https://"]').count(), 0, `No embeds or new third-party scripts: ${path}`)
        const text = await page.locator('main').innerText()
        assert(!/Owner login|Open live activity|80\.2%|8,800|36\+/.test(text), `No internal panels or retired figures: ${path}`)
        const urls = await page.locator('a[href]').evaluateAll(links => links.map(a => a.href))
        for (const url of urls) {
          if (/^https?:/.test(url) && !url.startsWith(origin)) externalLinks.add(url)
          else if (url.startsWith(origin)) internalLinks.add(new URL(url).pathname)
        }
        if (route === '' || route === 'work/apanakmakan' || route === 'work/police-sentri-rush') {
          const label = route ? route.split('/').at(-1) : 'home'
          if (route === '') await page.screenshot({ path: `${output}/${locale}-opening-${width}.jpg`, type: 'jpeg', quality: 90 })
          await page.screenshot({ path: `${output}/${locale}-${label}-${width}.jpg`, type: 'jpeg', quality: 88, fullPage: true })
        }
        if (route === '') {
          await page.locator('#ai-world').screenshot({ path: `${output}/${locale}-naca-${width}.jpg`, type: 'jpeg', quality: 90 })
          if (width === 390) {
            await page.evaluate(() => window.scrollTo(0, 0))
            const toggle = page.locator('.menu-toggle')
            await toggle.focus(); await page.keyboard.press('Enter')
            assert.equal(await toggle.getAttribute('aria-expanded'), 'true')
            assert(await page.locator('#primary-navigation').isVisible())
            await page.screenshot({ path: `${output}/${locale}-menu-390.jpg`, type: 'jpeg', quality: 90 })
            await page.keyboard.press('Escape')
            assert.equal(await toggle.getAttribute('aria-expanded'), 'false')
            assert.equal(await page.evaluate(() => document.activeElement?.className), 'menu-toggle')
          }
        }
        results.push({ path, width, status: response.status(), lang: tags[locale], overflow: false })
      }
    }
    await context.close()
    console.log(`Verified all four languages and seven pages at ${width}px.`)
  }

  const context = await browser.newContext({ viewport: { width: 390, height: 844 } })
  const page = await context.newPage()
  for (let i = 0; i < locales.length; i++) {
    const from = locales[i], to = locales[(i + 1) % locales.length]
    await page.goto(`${origin}/${from}/work/police-sentri-rush/?ref=review#main`)
    await page.locator('.language-picker summary').click()
    await page.getByRole('link', { name: languages[to], exact: true }).click()
    await page.waitForURL(`**/${to}/work/police-sentri-rush/?ref=review#main`)
    assert.equal((await context.cookies()).find(c => c.name === 'portfolio-language')?.value, to)
    await page.goto(origin)
    assert.equal(new URL(page.url()).pathname, `/${to}/`, 'Saved choice at /')
    await page.goto(`${origin}/${from}/`)
    assert.equal(new URL(page.url()).pathname, `/${from}/`, 'Explicit language overrides saved choice')
  }
  await context.clearCookies()
  let response = await context.request.get(origin, { maxRedirects: 0 })
  assert.equal(response.status(), 302)
  assert(response.headers()['cache-control'].includes('no-store'))
  assert(response.headers().vary.toLowerCase().includes('cookie'))
  assert.equal(response.headers().location, '/en/')
  await context.addCookies([{ name: 'portfolio-language', value: 'invalid', url: origin }])
  response = await context.request.get(origin, { maxRedirects: 0 })
  assert(response.headers().location.endsWith('/en/'))
  for (const path of ['/fr/', '/en/missing/', '/zh/work/missing/']) {
    assert.equal((await context.request.get(`${origin}${path}`)).status(), 404, `Unknown route ${path}`)
  }
  for (const path of internalLinks) {
    assert.equal((await context.request.get(`${origin}${path}`)).status(), 200, `Internal link: ${path}`)
  }
  for (const path of ['/twin/', '/contact/', '/privacy/', '/analytics/']) {
    assert.equal((await context.request.get(`${origin}${path}`)).status(), 200, `Preserved route: ${path}`)
  }
  // No-JS navigation and CJK text must remain readable.
  const noJS = await browser.newContext({ javaScriptEnabled: false })
  const plain = await noJS.newPage()
  await plain.goto(`${origin}/zh/work/apanakmakan/`)
  assert((await plain.locator('h1').innerText()).includes('ApaNakMakan'))
  await noJS.close()
  await context.close()
  assert.deepEqual(errors, [], 'Browser runtime errors')
  await writeFile(`${reportDirectory}/browser-checks.json`, JSON.stringify({ checkedAt: new Date().toISOString(), origin, results, checks: ['SSR language and complete page matrix', 'canonical and hreflang', 'image loading and localised alt', 'no horizontal overflow', 'no embeds or new third-party scripts', 'keyboard mobile menu and Escape focus', 'equivalent-page language switching with query/hash', 'saved preference and explicit URL precedence', 'root 302 and private cache', 'unknown paths 404', 'all discovered internal links', 'legacy route availability', 'Chinese page without JavaScript', 'no browser runtime errors'], externalLinks: [...externalLinks].sort() }, null, 2))
  console.log(`PASS: ${results.length} page/viewport checks, navigation, metadata, preference and legacy routes. Screenshots: ${output}`)
} finally { await browser.close() }
