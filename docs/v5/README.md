# Portfolio v5 — visual review

Built from main `7c21db7` (v4 + the approved cinematic portrait), on isolated branch `codex/portfolio-v5`. **Neo must approve the working preview before any merge. Claude Code verifies and deploys afterward.**

**[Open v5 for visual review](https://deploy-preview-5--loquacious-bublanina-6dc420.netlify.app/en/?ntl-drawer-state=hidden)** · [Draft PR #5](https://github.com/broneotodak/neotodak-ai-labs/pull/5)

## Design

Near-black canvas, blue and amber light, condensed film-title typography and a portrait that blends into the composition. Recent work uses two different treatments: an angled, framed app screen with a warm pool of light, followed by large game artwork that extends beyond the content column. NACA becomes a tilted map window; About, more work and Contact each have their own composition. There is no repeating card grid.

The phone layout is separately composed: portrait-first opening, layered headline, central phone artwork, offset game caption, a closer map window and a compact circular contact action. Chinese uses system CJK sans-serif typography with its own scale. All type remains selectable HTML.

## Content boundary

Approved copy, project catalogue, all four locales, page routes, redirects, hreflang, APIs, legacy routes, production dependencies and every original asset are byte-for-byte unchanged from the base. The new layout uses Space Grotesk and Barlow Condensed, served locally through Next.js. The 1 MB original browser icon is preserved; a 64px-wide delivery derivative at `app/[locale]/icon.png` reduces the icon request to about 18 KB. This is the only additional image asset. The existing portrait, app screenshot, game artwork and city snapshot are unchanged.

The existing portrait alt text still describes the former Bali photograph; it is retained because the brief explicitly freezes `copy.ts`. A copy correction can be reviewed separately.

## Motion

- Sections reveal once as they enter the viewport: 28px upward movement and a 700ms fade. The opening content is visible immediately.
- The portrait moves gently with desktop scrolling (at most 62px). Text stays stationary. Phone layouts have no parallax.
- Hover gently straightens and lifts the app phone, reduces the map window’s tilt, and nudges link arrows and buttons.
- Reduced-motion preference disables all reveals, parallax and animated hover transitions, including when the preference changes while the page is open.
- Content remains visible without JavaScript. No animation library, autoplay, video, canvas, tracking or third-party script is added.

## Screenshots

44 images: 36 full-page/section/menu captures plus eight opening-viewport captures. Start with the opening views:

| Language | Desktop opening | Phone opening |
| --- | --- | --- |
| English | [1440px](screenshots/en-opening-1440.jpg) | [390px](screenshots/en-opening-390.jpg) |
| Bahasa Melayu | [1440px](screenshots/ms-opening-1440.jpg) | [390px](screenshots/ms-opening-390.jpg) |
| Bahasa Indonesia | [1440px](screenshots/id-opening-1440.jpg) | [390px](screenshots/id-opening-390.jpg) |
| 简体中文 | [1440px](screenshots/zh-opening-1440.jpg) | [390px](screenshots/zh-opening-390.jpg) |

Captured from the production build in Chrome at 1440 × 1000 and 390 × 844, with reduced motion for stable full-page evidence. These are browser viewports; Neo/Claude Code still reviews on an actual phone.

| Language | Home desktop / phone | App desktop / phone | Game desktop / phone | NACA desktop / phone | Phone menu |
| --- | --- | --- | --- | --- | --- |
| English | [Desktop](screenshots/en-home-1440.jpg) / [Phone](screenshots/en-home-390.jpg) | [Desktop](screenshots/en-apanakmakan-1440.jpg) / [Phone](screenshots/en-apanakmakan-390.jpg) | [Desktop](screenshots/en-police-sentri-rush-1440.jpg) / [Phone](screenshots/en-police-sentri-rush-390.jpg) | [Desktop](screenshots/en-naca-1440.jpg) / [Phone](screenshots/en-naca-390.jpg) | [Open menu](screenshots/en-menu-390.jpg) |
| Bahasa Melayu | [Desktop](screenshots/ms-home-1440.jpg) / [Phone](screenshots/ms-home-390.jpg) | [Desktop](screenshots/ms-apanakmakan-1440.jpg) / [Phone](screenshots/ms-apanakmakan-390.jpg) | [Desktop](screenshots/ms-police-sentri-rush-1440.jpg) / [Phone](screenshots/ms-police-sentri-rush-390.jpg) | [Desktop](screenshots/ms-naca-1440.jpg) / [Phone](screenshots/ms-naca-390.jpg) | [Open menu](screenshots/ms-menu-390.jpg) |
| Bahasa Indonesia | [Desktop](screenshots/id-home-1440.jpg) / [Phone](screenshots/id-home-390.jpg) | [Desktop](screenshots/id-apanakmakan-1440.jpg) / [Phone](screenshots/id-apanakmakan-390.jpg) | [Desktop](screenshots/id-police-sentri-rush-1440.jpg) / [Phone](screenshots/id-police-sentri-rush-390.jpg) | [Desktop](screenshots/id-naca-1440.jpg) / [Phone](screenshots/id-naca-390.jpg) | [Open menu](screenshots/id-menu-390.jpg) |
| 简体中文 | [Desktop](screenshots/zh-home-1440.jpg) / [Phone](screenshots/zh-home-390.jpg) | [Desktop](screenshots/zh-apanakmakan-1440.jpg) / [Phone](screenshots/zh-apanakmakan-390.jpg) | [Desktop](screenshots/zh-police-sentri-rush-1440.jpg) / [Phone](screenshots/zh-police-sentri-rush-390.jpg) | [Desktop](screenshots/zh-naca-1440.jpg) / [Phone](screenshots/zh-naca-390.jpg) | [Open menu](screenshots/zh-menu-390.jpg) |

## Verification

- `npm run build`: passed.
- Existing 56-check page/viewport suite retained; its output directory is configurable and it also captures opening-viewport views.
- Added motion, no-JS visibility, 320px layout and source-preservation checks.
- [Browser results](browser-checks.json) and [motion/preservation results](motion-and-preservation.json).
- [Every external link and observed HTTP status](LINK-CHECKLIST.md). Both exact RUSH store pages return 200. LinkedIn blocks automated requests (999), as in v4.
- [Mobile Lighthouse reports](LIGHTHOUSE.md): hosted preview 98–99 in all languages with Netlify’s review drawer hidden; local production build 94 in all languages. Lighthouse 12.8.2 default mobile simulation.
- [Hosted page/image/icon/language/redirect checks](preview-checks.json): passed.

```sh
npm ci
npm run build
npm run start -- --hostname 127.0.0.1 --port 4318
# In a second terminal:
PORTFOLIO_URL=http://127.0.0.1:4318 PORTFOLIO_REPORT_DIR=docs/v5 npm run verify:portfolio
node scripts/verify-portfolio-motion.mjs
```

The browser scripts use installed Chrome by default. `PORTFOLIO_BROWSER=chromium` selects installed Playwright Chromium. `PORTFOLIO_URL` can target the Netlify preview; use a different report directory if preserving these screenshots. Do not run Lighthouse alongside other browser suites when measuring performance.

## Review gate

This branch is a preview for Neo’s visual sign-off. No merge or production deployment is authorized by this PR. After Neo approves, Claude Code checks all four languages on desktop and actual phone, links, motion and the existing functionality, then handles the normal git-push deployment. No Netlify CLI, environment or DNS changes.
