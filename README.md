# Rahul Kulathoor — Portfolio

Next.js 16 (App Router, Cache Components) + Tailwind CSS v4. Every page is prerendered as static HTML. Only three small client components ship JavaScript: the header menu, the scroll-reveal observer and the case-study slider.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the build
```

## Where things live

| Path | What |
|---|---|
| `src/content/site.ts` | Bio, experience, skills, process, tools, contact links |
| `src/content/projects.ts` | The five case studies: copy, verified stack, decisions, slider captions |
| `public/work/<slug>/` | Project screenshots (WebP; desktop 2000×1250, mobile 780×1688) |
| `public/logos/` | Tool logos for the marquee |
| `src/app/globals.css` | Design tokens (`@theme`), animations, reduced-motion rules |
| `design/tokens.json` | The same tokens, for Figma (Tokens Studio / Variables) |
| `design/figma-spec.md` | Figma-ready spec: variables, text styles, grid, components, states, motion |

## Filling the placeholders

Case-study fields that only Rahul can supply are set to `null` in `projects.ts`. They render as dashed "Placeholder · to be provided" blocks:

- `role`: your role, team and timeline (only DIP has one, taken from the previous portfolio)
- `learnings`: an array of strings
- The rationale behind each design decision: the page currently shows only what is observable in the live UI

Replace the `null` with real content and the placeholder disappears. Don't add metrics or outcomes that can't be backed up.

## Adding or replacing screenshots

Drop WebP files into `public/work/<slug>/` and list them in that project's `shots` array. A filename containing `mobile` is shown in a phone frame. Keep desktop captures at a 16:10 ratio.

## Before deploying

Set `SITE_URL` (e.g. `https://rahulk.design`) so Open Graph image URLs resolve correctly.
