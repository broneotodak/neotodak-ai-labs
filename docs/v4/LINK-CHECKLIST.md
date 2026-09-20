# External link checklist

Checked 2026-09-20T16:00:58.192Z. Unauthenticated GET requests; redirects followed. These are observed statuses, not a claim that every service is publicly accessible without signing in.

| Checked | Link | HTTP status | Result |
| --- | --- | --- | --- |
| [x] | [ApaNakMakan](https://apanakmakan.com/) | 200 | Page reachable. |
| [x] | [NACA City](https://naca.neotodak.com/) | 200 | Page reachable. |
| [x] | [RUSH — App Store](https://apps.apple.com/my/app/police-sentri-rush/id6812404214) | 200 | Public product page; exact RUSH title matched. |
| [x] | [RUSH — Google Play](https://play.google.com/store/apps/details?id=com.todakstudios.policesentrirush) | 200 | Public product page; exact RUSH title matched. |
| [x] | [Todak Studios](https://todakstudios.com/) | 200 | Page reachable. |
| [x] | [GitHub](https://github.com/broneotodak) | 200 | Page reachable. |
| [ ] | [LinkedIn](https://www.linkedin.com/in/broneotodak/) | 999 | Automated request blocked. Browser follows to LinkedIn sign-up/authwall (200); profile contents still need a signed-in human check. |
| [x] | [Food photograph credit](https://commons.wikimedia.org/wiki/File:Nasi_Lemak_dengan_Chili_Nasi_Lemak_dan_Sotong_Pedas,_di_Penang_Summer_Restaurant.jpg) | 200 | Page reachable. |
| [x] | [Food photograph licence](https://creativecommons.org/licenses/by-sa/4.0/) | 200 | Page reachable. |
| [x] | `mailto:neo@todak.com` | Not HTTP | Address and mailto syntax checked; no message sent. |

All external links discovered across the four-language site are covered above. No ApaNakMakan store links are published while the app is in testing. Both RUSH store buttons lead to the exact supplied title.

## Preserved local routes

`/twin/`, `/contact/`, `/privacy/` and `/analytics/` returned HTTP 200 in the local production build. This checks route availability, not the authenticated backend behavior of those existing features. The twin is reachable through each language’s AI experiments page. No chat request or contact-form submission was made.

## Manual review still required

- [ ] Open LinkedIn while signed in and confirm the intended profile.
- [ ] Claude Code / Neo to verify all four languages on desktop and an actual phone. Automated phone checks use a 390px browser viewport.
- [ ] Recheck store links immediately before the separately authorized production deployment.
