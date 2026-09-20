import { chromium } from '@playwright/test'

// Capture the map's own 2.5D fallback. The WebGL view includes owner-login
// service balloons; the public fallback gives us the islands without them.
const browser = await chromium.launch({ channel: process.env.PORTFOLIO_BROWSER || 'chrome', headless: true, args: ['--disable-webgl'] })
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })
  await page.goto('https://naca.neotodak.com/', { waitUntil: 'networkidle', timeout: 40000 })
  await page.waitForTimeout(1200)
  await page.locator('#city').screenshot({
    path: 'public/portfolio/naca-city.png',
    style: '.map-area > :not(canvas) { visibility: hidden !important; }',
  })
  console.log('Fresh unauthenticated public map capture. Visually check for owner UI before committing.')
} finally { await browser.close() }
