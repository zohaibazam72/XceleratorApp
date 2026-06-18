# Xcelerator design system

This is the single source of truth for all styling. Every colour, spacing, and radius value in the app references a token defined here. Never hardcode a hex value in a component. When a screen in the screen inventory names a component, it means one of the named components defined here.

## Overview

Xcelerator's visual language is calm, premium, and trustworthy — closer to a confident tutor than a game. The tone is muted rather than bright, flat rather than glowing, restrained rather than playful. A student opening this app under exam pressure should feel reassured, not entertained. Nothing in the interface should compete for attention with the actual content, which is real exam questions and real mark schemes. The brief from the founder: simple, modern, smooth, pleasing to use.

---

## Colour tokens

### Core
- `ink` (#1B2421): primary text
- `ink-muted` (#5C6B66): secondary and tertiary text
- `teal-900` (#0F3D36): brand colour, navigation surface, primary buttons, primary text-on-light
- `teal-600` (#1F8C72): links, active states
- `teal-100` (#E3F1EC): subtle tinted backgrounds, info-tinted rows, badges
- `cream` (#FAF6EC): page background
- `surface` (#FFFFFF): card surfaces
- `border-neutral` (#E4DFD2): hairline dividers and card borders

### Action
- `gold-600` (#D9A441): reserved exclusively for the primary call-to-action and the streak indicator. Never reused for status, never decorative.
- `gold-100` (#F7E8C9): tint behind gold elements

### Status (each strictly tied to one meaning — never decorative)
- `success-600` (#3F8F5C) / `success-100` (#E2F0E6): **secured** patterns and **correct** answers
- `amber-600` (#C97A2E) / `amber-100` (#F3E4CC): **in progress** only. Deliberately distinct from gold so a clickable action is never confused with a status flag.
- `coral-600` (#C85A3D) / `coral-100` (#F5DDD3): **needs practice** and **alert / marks at risk**. Used sparingly.
- "Remaining / not started" uses `ink-muted` on `border-neutral`, no dedicated colour.

### Topic colours (decorative category markers only — never reused as status)
Each syllabus topic has one fixed colour, used in the topic priority bar, the mark pathway, and the progress bars:
- Algebra: #1D9E75 (text on tint #085041)
- Ratio and proportion: #7F77DD (text on tint #26215C)
- Geometry and measures: #D85A30 (text on tint #4A1B0C)
- Number: #D4537E (text on tint #4B1528)
- Statistics and probability: #888780 (text on tint #2C2C2A)

### Dark mode
The five topic colours are fixed brand values and must be defined to adapt for dark mode explicitly (the rest of the palette should be expressed as semantic tokens that flip automatically). This was flagged during design because hardcoded topic tiles will not adapt on their own. Decide light-only or light+dark at build start; if light+dark, every token above needs a dark counterpart.

## Typography

- **Family**: system sans (-apple-system, Segoe UI, Roboto). A serif is reserved **exclusively** for real exam-question text blocks, to mark "this is lifted from a real paper" as visually distinct from the app's own interface copy. This is a deliberate authenticity signal — apply it to every exam-question and worked-example question block, without exception.
- Display (28px / 500): grade numbers, hero stats
- H1 (22px / 500): screen titles
- H2 (18px / 500): section titles
- H3 (16px / 500): card titles
- Body (15px / 400): primary reading text
- Small (13px / 400): captions, metadata
- XS (12px / 400): tags, timestamps

Two weights only: 400 and 500. No bold or extra-bold anywhere — heavy weights read as energetic and gamified, the opposite of the intended register. Sentence case throughout; no all-caps headlines (small uppercase eyebrow labels with letter-spacing are acceptable for section kickers like "Next pattern").

## Spacing

8px base rhythm: `xs` 4px, `sm` 8px, `md` 16px, `lg` 24px, `xl` 32px.

## Border radius

- `sm` 6px: badges, inputs
- `md` 8px: buttons, small cards
- `lg` 12px: cards, panels
- `pill` 999px: status badges, tags, avatars

## Elevation

Flat. No shadows, no glow, no gradients. Surface separation comes from a 1px `border-neutral` border and the contrast between `cream` (page) and `surface` (cards) only. Glow-based, colour-saturated shadows read as game-like and work against the calm tone — they were deliberately removed from the inherited palette this system descends from.

## Background texture (maths grid)

A subtle GCSE-maths-inspired texture sits behind the UI on decorative surfaces, to make the app feel like a premium maths-strategy product rather than a generic portal. It must feel academic and calm — never busy, childish, or like a worksheet — and must never compete with content.

Composition: faint graph-paper grid lines, occasional low-opacity formula marks, small geometry/construction sketches. Built as layered CSS backgrounds (linear gradients for the grid, optional SVG overlay for formula/geometry marks), exposed as one reusable token/class (e.g. `math-grid-bg`).

Colour: grid lines in `teal-900` or `teal-600` at very low opacity; formula/diagram marks in `teal-600` at very low opacity. No gradients-as-glow and no coral/gold in the texture itself — it stays monochrome-teal and flat, consistent with the elevation rules above. (The inherited source for this idea suggested gold/coral accents and radial glows; both are dropped to keep the texture calm.)

Per-surface opacity — readability always wins:
- Dashboard, mark pathway, progress, empty states, dark sidebar panels: 8–14%
- Onboarding / landing / large decorative areas: 12–18%
- Learn, worked examples, mock intro: light, 4–8%
- Exam-question canvases, answer inputs, mark-scheme panels, dense text cards: none, or 4% maximum — readability of the real exam content is sacred and overrides the texture everywhere it appears.

The texture supports the brand atmosphere in the background; the foreground content stays clean, calm, and readable at all times.

## Motion

Micro-interactions stay under ~400ms and exist only to confirm an action, not to entertain. No bounce, no pulse, no confetti. The one moment that earns a slightly more noticeable (but still restrained) animation is a pattern being marked **secured** — a brief completion-ring fill and a calm fade-in of the result, never a celebration burst.

---

## Named components

These are the reusable building blocks. Every screen is assembled from these; if a screen seems to need something new, check here first.

- **Pattern stepper**: three-segment horizontal bar for the Learn → Worked examples → Exam questions flow. Completed steps show a check in success colour; the current step is filled in `teal-900`; upcoming steps are muted. Appears at the top of all three flow screens and the pattern-secured screen.
- **Metric card**: muted (`teal-100`/secondary) background, small icon-led label, large number beneath. Used for the secured / in progress / needs practice / remaining counts. Icon colour matches the status it represents.
- **Pattern hero card**: the primary daily action on the dashboard. `surface` with `border-neutral`, containing pattern title + grade, category and "high frequency" tags, the frequency stat, marks and question count, a completion ring, and a single gold primary CTA.
- **Mark badge**: small pill showing a real mark code (M1, A1, B1). Method marks (M) use `teal-100`/`teal-600`; accuracy marks (A) and B marks use `success-100`/`success-600`. Only ever shows a real mark-scheme code — never a generic correct/incorrect.
- **Topic priority bar**: single horizontal bar segmented by syllabus weighting (Algebra 30 / Ratio 20 / Geometry 20 / Number 15 / Stats 15), each segment in its fixed topic colour, with a "you are here" marker above the student's current topic. Labels sized to match each segment's width.
- **Pattern list row**: a row in the mark pathway. Status icon + pattern name + frequency line ("Comes up in X% of AQA Higher papers · N marks") + status badge. Rows group under grade-band dividers (Grade 6 / 7 / 8). Not-started rows are reduced opacity; the just-secured row gets a `teal-100` background.
- **Grade band divider**: a small uppercase label ("Grade 7") with a hairline rule, separating pattern groups in the mark pathway by grade.
- **Status badge**: pill using the relevant status colour — Secured (success), In progress (amber), Needs practice (coral), Not started (muted).
- **Exam-conditions notice**: muted, serious-toned callout used only inside mocks, signalling no hints and no pausing. Distinct, more serious register than the calm practice screens.
- **Recent activity row**: status icon + short description + relative timestamp.
- **Grade trajectory chart**: simple bar chart of mock results over time against the target line. Driven by mock data only, never engagement.
- **Completion ring**: circular progress indicator used on the pattern hero card (in-progress %) and the pattern-secured screen (animated fill to 100%).

## Do's and don'ts

1. Do keep gold for the primary CTA and streak only. Reusing it dilutes what "tap this" means.
2. Do apply the serif treatment to every real exam-question text block, without exception.
3. Do use flat surfaces and hairline borders; never shadows or glow.
4. Don't introduce bounce, pulse, or confetti, however satisfying in isolation.
5. Don't add leaderboards, rankings, or any student-vs-student comparison.
6. Do keep status colours strictly tied to meaning; never decorative.
7. Don't use heavy or extra-bold font weights anywhere.
8. Do keep every mark badge tied to a real, specific mark code.
9. Do keep the five topic colours as category markers only; never let them signal status.
10. Do write every frequency stat as "Comes up in X% of AQA Higher papers" — never a bare percentage.
11. Do keep the maths-grid texture subtle and monochrome-teal; drop it to near-zero on any surface showing exam questions or mark schemes, where readability overrides it.
