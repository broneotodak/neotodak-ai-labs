# Scroll parallax

The v5 portfolio now has visible scroll depth throughout the homepage and shared artwork sections. The portrait and background ring travel at different speeds; ApaNakMakan's phone floats against its background lettering; the RUSH artwork and NACA map shift as their sections pass through the viewport. The About portrait moves too. Phone layouts use smaller travel, including touch devices. Text and actions retain their natural document positions.

Motion uses native scrolling, passive events and one scheduled animation frame per update. Scene geometry is cached until resize; offscreen scenes stop updating. Independent CSS translate/rotate preserve the existing artwork tilts. No dependency, asset, copy, contact, route or hosting changes. Reduced-motion preferences disable the effects immediately, and pages remain visible without JavaScript.

## Review

- [Desktop scroll recording](desktop-scroll.webm)
- [Phone scroll recording](phone-scroll.webm)
- [Eight artwork screenshots](screenshots/)
- [Motion, accessibility and preservation checks](motion-and-preservation.json)
- [56 page/viewport regression assertions](portfolio-checks.json)
- Mobile Lighthouse: [English](lighthouse-en.json), [Simplified Chinese](lighthouse-zh.json)

Chrome desktop (1440px), touch-phone emulation (390px), and narrow-phone layouts (320px) were checked in English, Bahasa Melayu, Indonesian and Simplified Chinese. Checks cover visible/bounded movement, steady headings, opposite phone/background movement, live reduced-motion changes, client navigation, resize, no-JS visibility and browser errors. This is browser emulation, not a physical-device test.

Mobile Lighthouse scored 95 in English and 94 in Simplified Chinese; accessibility, best practices and SEO scored 100 for both. Cumulative layout shift was zero. Production build and TypeScript passed. The motion suite completed successfully. All 56 existing regression assertions and the additional navigation/metadata/legacy checks passed and their report was saved. The regression runner stalled while closing Chrome after PASS; its completed process was stopped manually. No application error was reported.

To repeat against a production build or hosted preview:

```sh
PORTFOLIO_URL=http://127.0.0.1:4322 node scripts/verify-portfolio-motion.mjs
PORTFOLIO_URL=http://127.0.0.1:4322 PORTFOLIO_REPORT_DIR=docs/parallax/regression npm run verify:portfolio
```

`PORTFOLIO_REPORT_DIR` can move evidence outside the repository. The motion suite's preservation baseline is the contacts release (`fc13e782ea803f268ce650c6280c07be87eaf47b`); it can be overridden with `PORTFOLIO_BASE` when a later content release changes that baseline.
