# Figma-ready design specification

No Figma file has been created yet. The Figma connector wasn't authorised in the build session. This document and `tokens.json` describe the implemented design, so it can be rebuilt in Figma as an editable file. The live Next.js build is the reference: run `npm run dev` and inspect any screen.

## 1. Set up the file

Pages: `Cover`, `Foundations`, `Components`, `Desktop 1440`, `Tablet 834`, `Mobile 390`.

### Variables (Figma → Local variables)

Create a collection called `Color` with one mode, `Dark`. Use the values in `tokens.json → color`:

| Variable | Hex | Use |
|---|---|---|
| paper | #131312 | Page ground (the site is dark throughout) |
| surface | #1B1B19 | Raised bands: tools, About, Process; placeholder fill |
| surface-2 | #252522 | Reserve |
| line | #2C2C29 | 1px dividers |
| line-strong | #43423D | Outline buttons, dashed placeholders |
| ink | #F3F2EC | Text, filled buttons |
| ink-soft | #BDBCB4 | Body copy |
| muted | #8F8E87 | Labels, metadata |
| accent | #F0784C | Accent text, button hover fill, hero glow |
| accent-bright | #F0784C | Hero selection frame, contact arrow |
| status | #22A05A | Availability dot |
| project/* | see tokens | Deep brand-tinted preview cards |

Create a second collection called `Space`:
- `gutter`: 16 / 32 / 48 (Mobile / Tablet / Desktop modes)
- `section`: 112 / 112 / 160
- `container-max`: 1408

### Text styles

Fonts: **Inter Tight** (variable, Google Fonts) and **Instrument Serif** (regular + italic). Fluid sizes are pinned at each breakpoint:

| Style | Weight | 390 | 834 | 1440 | Line height | Tracking |
|---|---|---|---|---|---|---|
| Display | Medium 500 | 44 | 72 | 112 | 98% | −4.5% |
| Headline | Medium 500 | 32 | 46 | 64 | 102% | −3.5% |
| Title | Medium 500 | 24 | 28 | 36 | 110% | −2.5% |
| Lead | Regular 400 | 18 | 20 | 22 | 150% | −1% |
| Body | Regular 400 | 16 | 16 | 16 | 150% | 0 |
| Label | Medium 500, UPPERCASE | 12 | 12 | 12 | 100% | +8% |
| Accent italic | Instrument Serif Italic | inherits | | | inherits | −2% |

The pattern used across headings: one key phrase per heading is set in **Accent italic**. For example, "Five products, from *lottery counters* to AI voice."

### Grid

- Desktop 1440: 12 columns, 48 margin, 32 gutter, max content width 1408.
- Tablet 834: 8 columns, 32 margin, 24 gutter.
- Mobile 390: 4 columns, 16 margin, 16 gutter.

Section headings are split 3 / 9. A label sits in columns 1–3 and the heading in columns 4–12. On tablet and mobile they stack.

### Effects

- `Shadow/Screen`: 0 30 60 −20 rgba(20,20,18,.35), plus 0 8 20 −10 rgba(20,20,18,.20)
- `Shadow/Phone`: 0 30 50 −18 rgba(20,20,18,.45)
- `Shadow/Float`: 0 6 20 −8 rgba(20,20,18,.35) for the slider arrow buttons

## 2. Components

Build each one as a component set with the listed variants and properties.

| Component | Variants / properties | Notes |
|---|---|---|
| **Button** | `Style` = Filled, Outline, Ghost-on-dark · `State` = Default, Hover, Focus, Pressed · `Icon` = boolean | Height 48, pill radius, 24 horizontal padding. Filled hover → accent fill. Focus → 2px accent ring with 3px offset. Pressed → scale 95%. |
| **Nav / Header** | `Breakpoint` = Desktop, Mobile · `Scrolled` = true/false · `Menu` = Closed, Open | Height 72 desktop, 64 mobile. Scrolled adds paper 90% + blur + bottom line. |
| **Status pill** | — | Green dot with a pulse ring, 13px text, line-strong border. |
| **Hero selection frame** | `Stage` = Hidden, Drawn | 1.5px accent-bright stroke, four 9×9 handles, "Outcome" label above, "Fill × Hug" label below, "Rahul" cursor tag. |
| **Tool logo** | `Tool` = 8 options | 36px logo + 20px Medium label. Logos are in `public/logos/`. |
| **Marquee** | — | Horizontal auto layout of Tool logo ×8, duplicated. Edge fade mask is 8%. |
| **Section heading** | `Aside` = boolean | Index + label (Label style), Headline, optional Lead. |
| **Project preview** | `Size` = Wide (16:10), Compact (4:3) · `Ink` = Light, Dark · `Hover` = true/false | Tint fill, browser frame (dots + host), desktop screen at 76% width, phone at 19% width overlapping on the right. On hover, the screen moves up 8px, the phone moves up 16px and a "View case study" chip appears. |
| **Project row** | `Layout` = Wide, Compact | Preview + number, name (Title), summary, category (Label). |
| **Experience row** | — | Period / Role + company / Summary in a 3 / 5 / 4 split. |
| **Skill column** | — | Label + list with 12px dash bullets. |
| **Process step** | `Hover` = true/false | Title + serif index number (turns accent on hover) + body. |
| **Case meta** | — | Label + value; "To be confirmed" in accent. |
| **Placeholder** | — | Dashed line-strong border, surface 60%, accent label "PLACEHOLDER · TO BE PROVIDED". |
| **Decision card** | — | Serif index in accent, Title 20, body. Sits in a 2-up grid with 1px gaps. |
| **Slider** | `Slide` = Desktop, Mobile · `Breakpoint` = Desktop, Mobile | Tint stage (16:10 desktop, 4:3 mobile). Inactive neighbours show at 35% opacity and 96% scale. Desktop arrows overlay the bottom corners; mobile arrows sit beside the caption. |
| **Slider arrow** | `Direction` = Prev, Next · `State` = Default, Hover, Pressed · `Size` = 48, 44 | Hover → ink fill, paper icon. |
| **Thumbnail** | `Shape` = Desktop, Mobile · `State` = Default, Hover, Active | Default 50% opacity. Active → full opacity + 2px ink ring with 2px offset. |
| **Next project** | `Hover` = true/false | Display name + circular arrow (rotates 45° on hover), plus a cover image. |

## 3. Screens

Build each page at three frame widths (1440 / 834 / 390):

1. **Home**: Header → Hero → Tools marquee → 01 Selected work (1 wide + 4 compact, staggered 2-up on desktop) → 02 About (surface band, bio, facts, experience) → 03 Skills → 04 Process → 05 Contact (ink band) → Footer.
2. **Case study**, one per project: Back link → index + category → Display name → serif tagline → Visit button → meta row (Role, Platform, Category, Stack) → Preview → 01 Overview → 02 My role → 03 Problem → 04 Design decisions → 05 Final UI slider → 06 Key learnings → Next project → Footer.
3. **404**.

Screenshots for every slide are in `public/work/<project>/`. Desktop captures are 2000×1250 and mobile captures are 780×1688.

## 4. Prototype and motion

| Interaction | Spec |
|---|---|
| Hero lines | Rise from 105% inside a mask, 1100ms ease-out-expo, staggered 110ms |
| Selection frame | Wipe left→right 900ms ease-in-out-quart at 900ms; handles and labels pop in at 1500ms |
| Cursor | Glides in from (+120, +90), 1400ms at 1300ms |
| Scroll reveal | Fade + 24px rise, 900ms ease-out-expo, staggered 50–90ms |
| Hover (links) | Underline grows from the left, 500ms |
| Slider | Translate 750ms ease-out-expo. Swipe threshold 48px, with rubber-band resistance at the ends |
| Marquee | 38s per loop, pauses on hover or focus |
| Reduced motion | All of the above become instant. The marquee becomes a static, wrapped row |

In a Figma prototype, use Smart Animate with the custom bezier `0.16, 1, 0.3, 1`.
