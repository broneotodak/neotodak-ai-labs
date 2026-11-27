# neotodak.com: round 2 (brief for Codex)

Round 1 (commit 7739168 on this branch) is reviewed. A second AI agent re-checked it in a real browser at 1280x757 and 390x844. Same rules as round 1: smallest change that works, keep the identity, fonts, colours and copy, touch only `app/[locale]/portfolio.css` and `components/portfolio/Portfolio.tsx`, no new dependencies, do not commit or push.

## Fix
1. **Portrait spills into the next section (laptop 1280x757).** The seam is gone, but the portrait's shoulders and necklace still sit behind the heading "A few things I've been building.", and the caption "AHMAD FADLI · NEO TODAK" lands under the "All projects" link, detached from the hero. Make the portrait AND its caption end inside the hero so the next section starts clean. Keep the soft fade; do not make the portrait smaller than needed.
2. **NACA City caption contrast.** "A snapshot of the public map." is much dimmer than other small captions. Raise it to the same readable grey as the other captions (WCAG AA against the background).
3. **NACA City map clipped on phone (390 wide).** The tilted map frame runs about 3 px past the right edge and its top-right corner is cut off. Keep it inside the viewport with an even margin both sides. No horizontal scroll.
4. **Hero eyebrow on phone (390 wide).** "BUILDER · GAMING · MALAYSIA" runs across the top of Neo's hairline. Move or space it so the text sits on clean background, not on the face or hair.
5. **Leave alone:** the big decorative "ApaNakMakan?" watermark clipping at the right edge (cosmetic, intended bleed) as long as there is no horizontal scroll; and the tiny labels baked into the NACA map image.

## Done means
- `npm run build` passes.
- Look at it yourself at 1280x757, 768 and 390 wide, scrolling the whole page, and confirm each fix. Round-1 fixes must still hold: hero buttons above the fold at 1280x757 and 390x844, no stray colon, header not see-through.
- Reply with what you changed per fix (file + one line), what you could not fix and why, and what you are unsure about. Do not claim something is fixed that you did not look at.
