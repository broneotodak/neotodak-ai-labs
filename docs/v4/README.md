# Portfolio v4 review

Built on branch `codex/portfolio-v4` from `17b795b`. This is a PR for review; no production deployment or merge has been performed.

## What changed

The homepage now introduces Neo and shows ApaNakMakan and police sentri : RUSH before the wider work. It includes the approved CEO/researcher roles, a real public NACA City map capture, and the approved portrait. Every new page has English, Bahasa Melayu, Bahasa Indonesia and Simplified Chinese copy.

The latest ApaNakMakan swipe screen is shown in full and labelled “In testing.” RUSH has the exact App Store and Google Play links and team attribution. The complete collection retains all 31 existing catalogue entries, with plain descriptions and without the old statistics or stale live-status claims; studio game work and the new projects are included alongside it.

## Review locally

```sh
npm ci
npm run build
npm run start -- --hostname 127.0.0.1 --port 4317
# In a second terminal (Chrome installed):
npm run verify:portfolio
```

The verification script defaults to local Chrome. Set `PORTFOLIO_BROWSER=chromium` to use an installed Playwright Chromium instead. `PORTFOLIO_URL` can select another review origin. The dev-only Playwright version is pinned to a release compatible with the existing Node 18 hosting configuration. No hosting environment values were changed.

## Page matrix

Each of `/en/`, `/ms/`, `/id/`, `/zh/` contains:

- Home
- `work/` — complete collection
- `work/apanakmakan/`
- `work/police-sentri-rush/`
- `work/ai/` — optional existing twin link
- `about/`
- `contact/`

The unprefixed `/` uses a relative HTTP 302 to the saved language (English by default), with private/no-store caching. Locale URLs remain explicit and statically generated. The language menu remembers an intentional selection and preserves the equivalent page, query and fragment. Every page has an HTML language, canonical URL and hreflang alternatives, and the sitemap includes all language variants.

## Screenshots

Captured from the local production build with Chrome at 1440 × 1000 and 390 × 844. These are browser viewports, not physical-device verification. Images contain the full page unless identified as the NACA section or open menu.

| Language | Home desktop | Home phone | App desktop / phone | Game desktop / phone | NACA desktop / phone | Phone menu |
| --- | --- | --- | --- | --- | --- | --- |
| English | [Desktop](screenshots/en-home-1440.jpg) | [Phone](screenshots/en-home-390.jpg) | [Desktop](screenshots/en-apanakmakan-1440.jpg) / [Phone](screenshots/en-apanakmakan-390.jpg) | [Desktop](screenshots/en-police-sentri-rush-1440.jpg) / [Phone](screenshots/en-police-sentri-rush-390.jpg) | [Desktop](screenshots/en-naca-1440.jpg) / [Phone](screenshots/en-naca-390.jpg) | [Open menu](screenshots/en-menu-390.jpg) |
| Bahasa Melayu | [Desktop](screenshots/ms-home-1440.jpg) | [Phone](screenshots/ms-home-390.jpg) | [Desktop](screenshots/ms-apanakmakan-1440.jpg) / [Phone](screenshots/ms-apanakmakan-390.jpg) | [Desktop](screenshots/ms-police-sentri-rush-1440.jpg) / [Phone](screenshots/ms-police-sentri-rush-390.jpg) | [Desktop](screenshots/ms-naca-1440.jpg) / [Phone](screenshots/ms-naca-390.jpg) | [Open menu](screenshots/ms-menu-390.jpg) |
| Bahasa Indonesia | [Desktop](screenshots/id-home-1440.jpg) | [Phone](screenshots/id-home-390.jpg) | [Desktop](screenshots/id-apanakmakan-1440.jpg) / [Phone](screenshots/id-apanakmakan-390.jpg) | [Desktop](screenshots/id-police-sentri-rush-1440.jpg) / [Phone](screenshots/id-police-sentri-rush-390.jpg) | [Desktop](screenshots/id-naca-1440.jpg) / [Phone](screenshots/id-naca-390.jpg) | [Open menu](screenshots/id-menu-390.jpg) |
| 简体中文 | [Desktop](screenshots/zh-home-1440.jpg) | [Phone](screenshots/zh-home-390.jpg) | [Desktop](screenshots/zh-apanakmakan-1440.jpg) / [Phone](screenshots/zh-apanakmakan-390.jpg) | [Desktop](screenshots/zh-police-sentri-rush-1440.jpg) / [Phone](screenshots/zh-police-sentri-rush-390.jpg) | [Desktop](screenshots/zh-naca-1440.jpg) / [Phone](screenshots/zh-naca-390.jpg) | [Open menu](screenshots/zh-menu-390.jpg) |

## Checks

- Production build, including TypeScript validity: passed.
- 56 page/viewport combinations: passed.
- All four language declarations and page-specific canonical/hreflang URLs: passed.
- No horizontal overflow; every rendered image loaded and has alt text: passed.
- Keyboard mobile menu, Escape focus restoration, language switching and saved preference: passed.
- Root redirect is relative, 302 and private/no-store; unknown pages return 404: passed.
- All discovered internal links and preserved legacy routes: passed.
- Chinese content renders without JavaScript: passed.
- No iframe or external script is included by the new portfolio layout.
- No browser runtime errors during the verification run.
- All 31 original catalogue IDs are retained.
- [Observed external HTTP statuses](LINK-CHECKLIST.md): all checked pages return 200 except LinkedIn (999/authwall; human review pending).

Machine-readable results: [browser checks](browser-checks.json), [external link responses](link-status.json).

## Existing routes and behavior

No existing public route was deleted. The former root layout and `/twin`, `/contact`, `/privacy`, `/analytics` source files moved into a `(legacy)` route group, preserving their URLs and their styling. API routes were left in place. The twin’s navigation now points to working v4 pages. Existing `/projects` and `/tech-stack` aliases now redirect to the relevant English v4 pages with HTTP 302.

The new localized pages use their own root layout to render the correct `<html lang>` directly in the response. Moving between locale root layouts performs a full document navigation. The legacy chat remains its existing English interface and is labelled as such in all four AI pages. The existing chat/backend behavior was not changed or exercised.

Contact uses the approved public email address and existing social profiles. No form submission, outgoing message, new tracking or third-party script was added. The old analytics component is retained only in the existing legacy layout.

## Assets and review limits

See [asset sources and attribution](ASSETS.md). The NACA preview is a snapshot with a link, not an iframe. It was captured from the public map’s native 2.5D fallback to avoid WebGL owner-login service balloons. Owner/login chrome, live activity and events are absent from the delivered image. The page labels it as a snapshot.

The supplied app capture did not visibly include its photo credit, so photographer and licence links appear below each use. The original app screen and portrait are unchanged; the game illustration is captioned as promotional art on its detail page.

Build output retains pre-existing webpack bundle-size warnings, old Browserslist data and the images.domains deprecation. No unrelated dependency upgrades or security-remediation work are included. The existing hosting config and deployment scripts are untouched.

## Deployment boundary

Claude Code reviews the PR, checks desktop and actual phone in every language, verifies all store links, and handles merge/deployment through the existing git-push-to-main Netlify flow. This PR does not run the Netlify CLI, change environment values, update DNS, or intentionally deploy anything.
