# Mobile Lighthouse

Lighthouse 12.8.2, default mobile simulated throttling, Chrome headless, fresh Lighthouse browser profiles. These are lab measurements, not real-user field data. The full JSON reports are included here. Generated HTML reports are included in the local Downloads review bundle; the repository scanner rejects their bundled JavaScript boilerplate. Reports below use the local production build; the PR preview is checked separately.

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
