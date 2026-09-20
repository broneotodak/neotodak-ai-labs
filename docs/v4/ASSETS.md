# Portfolio v4 assets

All delivered artwork is original project material or a real screenshot. No new generated imagery is used in the implementation. Website copy is HTML text; text inside the actual app capture and existing game key art remains part of those original assets.

| Asset | Source | Handling |
| --- | --- | --- |
| `public/neo.jpg` | Existing portrait approved by Neo | Original file unchanged; responsive display. |
| `public/portfolio/apanakmakan-swipe.png` | `broneotodak/apanakmakan`, main commit `becb498a7e79317b9a2699d4c6b4c4f95459c295`, `docs/screenshots/swipe-2026-09-18/ios-home.png` | Complete current swipe screen, unmodified, displayed with `object-fit: contain`. It replaces the old pick screen in the visual proposal. |
| `public/portfolio/police-sentri-rush.png` | Existing `police-sentri-3d/docs/store-listing/artwork/cover-1600x900.png` | Original promotional illustration, unmodified. Full artwork is retained in the card and project page. The project-page caption identifies it as promotional artwork rather than gameplay. |
| `public/portfolio/naca-city.png` | Fresh unauthenticated capture of `https://naca.neotodak.com/`, 20 September 2026 UTC | Browser viewport 1440 × 1000. Captured canvas is 1370 × 860. Uses the site's own 2.5D fallback, with map chrome hidden during the screenshot; no owner login, service balloons, live activity or event feeds are included. No map data is changed. |

The NACA presentation is the approved screenshot-and-link version. There is no iframe, external script, background map request or owner sign-in on the portfolio. The caption makes clear that the embedded image is a snapshot. Reproduce with `node scripts/capture-naca.mjs`, then visually inspect the result.

## Food photograph attribution

The supplied current swipe capture has no visible attribution inside the screenshot. Rather than alter it, the portfolio adds credit immediately below every use of that screen. Credit was checked against the app's `assets/data/photos.json` at the same commit:

- Photographer: **Meandkancil2020**.
- [Original photograph on Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Nasi_Lemak_dengan_Chili_Nasi_Lemak_dan_Sotong_Pedas,_di_Penang_Summer_Restaurant.jpg).
- Licence: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- The app's photograph is visible inside an unchanged app screenshot; the portfolio performs only responsive scaling of that screenshot.

Fonts use Next.js font self-hosting for DM Sans and DM Serif Display. Chinese text uses system CJK serif/sans fallbacks including Songti SC, SimSun, PingFang SC and Microsoft YaHei. No browser request to Google Fonts is introduced.
