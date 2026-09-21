# Public contact and social links

Neo asked to add the contacts missing from the current portfolio and supplied [his Linktree](https://linktr.ee/broneotodak). The public page's hydrated profile data contains more accounts than its initial HTML anchors. The update uses those exact account destinations, plus the GitHub profile already on the portfolio.

The four translated contact pages show TikTok, Instagram, YouTube, Facebook, LinkedIn, GitHub, Twitch, Reddit, Discord, WhatsApp, PayPal and Linktree. The footer shows six compact links: TikTok, Instagram, YouTube, LinkedIn, GitHub and Linktree. Existing email and studio contacts remain. Brand names stay the same in each language; headings and navigation labels use the existing translations.

Links are plain server-rendered anchors, with no embeds, social SDKs or additional client JavaScript. The existing cinematic design remains. Contact links use two columns, and the phone footer uses two rows of three. The email size adapts to 320px screens.

Neo explicitly approved including both the public WhatsApp contact and PayPal link on 2026-09-21. The WhatsApp destination matches Linktree; PayPal uses the same account without the optional country/language query parameters, so it does not force English for visitors using other languages.

## Source and destination checklist

Checked 2026-09-21 MYT using public HTTP GET requests. A successful HTTP response does not guarantee a signed-in profile experience. No messages were sent, communities joined or payment actions taken.

| Destination | Published URL | Check |
| --- | --- | --- |
| Email | `mailto:neo@todak.com` | Matches the existing portfolio and Linktree; no email sent |
| TikTok | <https://www.tiktok.com/@broneotodak> | Linktree account match; HTTP 200 app shell; manual signed-in check recommended |
| Instagram | <https://www.instagram.com/broneotodak> | Linktree account match; redirects to Instagram login, HTTP 200; signed-in check pending |
| YouTube | <https://www.youtube.com/@broneotodak> | Linktree account match; HTTP 200; removed the optional subscription-confirmation query |
| Facebook | <https://www.facebook.com/neo.macho/> | Linktree account match; HTTP 200, title “Neo Todak” |
| LinkedIn | <https://www.linkedin.com/in/broneotodak/> | Existing URL also confirmed by Linktree; HTTP 999 restriction; signed-in check pending |
| GitHub | <https://github.com/broneotodak> | Existing URL retained; HTTP 200, matching profile title |
| Twitch | <https://www.twitch.tv/broneotodak> | Linktree account match; HTTP 200 app shell; manual channel check recommended |
| Reddit | <https://www.reddit.com/user/neotodak/> | Linktree account match; HTTP 403 restriction; manual profile check pending |
| Discord | <https://discord.gg/neMBzFkFf9> | HTTP 200; public invite API confirms “TODAK® COMMUNITY”, no expiration. This is a community invitation, not a personal DM link |
| WhatsApp | <https://api.whatsapp.com/send?phone=60177519610> | Neo approved publication; matches Linktree; HTTP 200, title “Share on WhatsApp”; no message sent |
| PayPal | <https://paypal.me/neotodak> | Neo approved publication; matches Linktree account; redirects to `https://www.paypal.com/paypalme/neotodak`, HTTP 200; no payment initiated |
| Linktree | <https://linktr.ee/broneotodak> | HTTP 200, matching public profile |

## Review evidence

- Production build and TypeScript passed; existing bundle-size/Browserslist warnings remain.
- The unchanged `verify:portfolio` suite passed all 56 page/viewport checks, including four languages, navigation, language persistence, metadata, internal and legacy routes, images and no new third-party scripts.
- Additional browser checks cover contact/footer visibility, keyboard focus, minimum 44px touch height, and layout at 1440, 768, 390 and 320px in each language. Results: [browser-checks.json](browser-checks.json).
- Screenshots capture the contact page and footer in all four languages on desktop and phone.

| Language | Desktop contact | Phone contact | Desktop footer | Phone footer |
| --- | --- | --- | --- | --- |
| English | [1440px](screenshots/en-contact-1440.jpg) | [390px](screenshots/en-contact-390.jpg) | [1440px](screenshots/en-footer-1440.jpg) | [390px](screenshots/en-footer-390.jpg) |
| Bahasa Melayu | [1440px](screenshots/ms-contact-1440.jpg) | [390px](screenshots/ms-contact-390.jpg) | [1440px](screenshots/ms-footer-1440.jpg) | [390px](screenshots/ms-footer-390.jpg) |
| Indonesian | [1440px](screenshots/id-contact-1440.jpg) | [390px](screenshots/id-contact-390.jpg) | [1440px](screenshots/id-footer-1440.jpg) | [390px](screenshots/id-footer-390.jpg) |
| Simplified Chinese | [1440px](screenshots/zh-contact-1440.jpg) | [390px](screenshots/zh-contact-390.jpg) | [1440px](screenshots/zh-footer-1440.jpg) | [390px](screenshots/zh-footer-390.jpg) |

This change is prepared from main `13aa3c5` on `codex/portfolio-social-links` for a PR deploy preview. Neo reviews the preview; Claude Code verifies and handles merging/deployment. The current production site is not changed by this branch.

After verified production deployment, Claude Code/Neo can update `neo-kb/Projects/Sites.md` with the new public contact destinations and deployment record. Codex has not edited or published the canonical KB.
