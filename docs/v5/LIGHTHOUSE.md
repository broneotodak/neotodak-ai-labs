# Mobile Lighthouse

Lighthouse 12.8.2, default mobile simulated throttling, Chrome headless, fresh Lighthouse browser profiles. These are lab measurements, not real-user field data. The full JSON reports are included here. Generated HTML reports are included in the local Downloads review bundle; the repository scanner rejects their bundled JavaScript boilerplate. Reports below use the local production build; the PR preview is checked separately.

## Hosted preview

Measured against the Netlify preview of code commit `ff3254e`, using default Lighthouse mobile simulation and `?ntl-drawer-state=hidden`. Performance is **98–99 in all four languages**. No third-party requests were observed in these measurements.

The normal preview URL injects Netlify’s review drawer, including its scripts, analytics and video help. Its first English audit scored 78. The [documented query parameter](https://docs.netlify.com/deploy/review-deploys/netlify-drawer-for-feedback/troubleshoot-the-netlify-drawer/#netlify-drawer-interrupts-automated-tests) disables that optional UI for the browser tab; no hosting settings or website code were changed for the measurement. The deploy permalink also injected the drawer in this project, so the parameter is the verified option used here.

SEO is 66 on the hosted preview because Netlify [adds `X-Robots-Tag: noindex` to previews](https://docs.netlify.com/deploy/deploy-overview/#search-engine-indexing). That protection remains intact. The local production-build SEO score is 100.

| Page | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS | Report |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| /en/ | 98 | 100 | 100 | 66 | 2.2 s | 20 ms | 0 | [JSON](lighthouse/preview-en.report.json) |
| /ms/ | 99 | 100 | 100 | 66 | 2.2 s | 0 ms | 0 | [JSON](lighthouse/preview-ms.report.json) |
| /id/ | 99 | 100 | 100 | 66 | 2.0 s | 10 ms | 0 | [JSON](lighthouse/preview-id.report.json) |
| /zh/ | 98 | 100 | 100 | 66 | 2.4 s | 0 ms | 0 | [JSON](lighthouse/preview-zh.report.json) |

```sh
npx --yes lighthouse@12.8.2 'https://deploy-preview-5--loquacious-bublanina-6dc420.netlify.app/en/?ntl-drawer-state=hidden' --quiet --chrome-flags="--headless" --only-categories=performance,accessibility,best-practices,seo --output=json --output=html --output-path=preview-en
```

## Local production build

| Page | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS | Report |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| /en/ | 94 | 100 | 100 | 100 | 3.0 s | 10 ms | 0 | [JSON](lighthouse/local-en.report.json) |
| /id/ | 94 | 100 | 100 | 100 | 3.1 s | 0 ms | 0 | [JSON](lighthouse/local-id.report.json) |
| /ms/ | 94 | 100 | 100 | 100 | 3.1 s | 0 ms | 0 | [JSON](lighthouse/local-ms.report.json) |
| /zh/ | 94 | 100 | 100 | 100 | 3.1 s | 0 ms | 0 | [JSON](lighthouse/local-zh.report.json) |

```sh
npx --yes lighthouse@12.8.2 http://127.0.0.1:4318/en/ --quiet --chrome-flags="--headless" --only-categories=performance,accessibility,best-practices,seo --output=json --output=html --output-path=docs/v5/lighthouse/local-en
```

Repeat for `/ms/`, `/id/` and `/zh/`, sequentially. The font files are self-hosted. The portrait is responsive and high priority; other imagery uses Next.js optimization. A small variant of the existing browser icon avoids transferring the original 1 MB file. No videos or new production dependencies.
