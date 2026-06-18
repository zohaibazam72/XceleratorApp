# Xcelerator

GCSE Maths revision web app. Productises a proven in-person tutoring method: show a student the highest-frequency exam-question patterns for their target grade, then train them to bank those marks through real exam questions, faithful worked examples, and verified mocks.

This file is the entry point. The detailed references below are imported and loaded every session.

See @docs/product-brief.md for what this product is and the non-negotiables that must never be violated.
See @docs/design-system.md for all styling: colours, typography, spacing, components, tone.
See @docs/screen-inventory.md for every screen, its content, states, and routing.
See @docs/data-model.md for the Supabase schema and how each screen pulls from it.

## Stack

- Next.js (React) web app, TypeScript.
- Supabase for database, auth, and storage (exam-question and mark-scheme images live in Supabase storage).
- Tailwind CSS for styling, with design tokens from the design system encoded as CSS variables / Tailwind theme config.
- Deployed as a web app first; a React Native mobile app comes later, so keep logic and presentation separable where reasonable to ease that future port.

## Commands

<!-- Update these once the project is scaffolded. -->
- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`

## Architecture

- `src/app/` — Next.js routes, one per screen in the screen inventory.
- `src/components/` — shared UI components. The design system's named components (pattern stepper, metric card, pattern hero card, mark badge, topic priority bar) each map to one reusable component.
- `src/lib/supabase/` — Supabase client and typed data-access functions. All dataset reads go through here, never inline in components.
- `src/types/` — shared TypeScript types, generated from the Supabase schema where possible.

## How the product is built

- There are only a small number of screen templates. Every topic (Algebra, Ratio, Geometry, Number, Statistics) and every pattern within it reuses the same templates. The template is fixed; the content is data pulled from Supabase. Never build a per-topic or per-pattern bespoke screen.
- Adding a new topic or pattern must be purely a data task (a new row in Supabase), requiring no new screens or components.

## Hard rules (do not violate)

- Every question shown to a student is either a real historical exam question or a human-written question verified against a real mark scheme. Never generate practice questions with AI. Never invent questions, answers, or mark schemes.
- Frequency stats always read as "Comes up in X% of AQA Higher papers" — never a bare percentage with no context.
- The two numbers "30%" (Algebra's syllabus weighting) and "30 patterns" (count of Algebra patterns in the dataset) are unrelated. Never place them together or imply a link.
- Use the terms precisely: a **topic** contains **patterns** (the named subtopics); a pattern contains **anchor questions**. "Secured / in progress / needs practice / remaining" counts always refer to patterns, never questions or topics.
- "Current grade" is always the student's last confirmed mock result, never a self-assessment. Label it that way wherever shown.
- Success is measured by grade movement (from mocks), not engagement. Do not add streaks-as-primary-metric, leaderboards, or any student-vs-student comparison.
- No AI tutor / chatbot, no adaptive real-time "next question" engine. The path is deterministic: topic weighting → grade-band cascade → sequential, mastery-gated patterns.
- MVP is AQA Higher only. Do not build multi-board or Foundation-tier logic; design the schema so it could be added later, but do not implement it now.

## Build sequencing

1. The Supabase database has already been cleansed and aligned to @docs/data-model.md (older broader-vision tables removed; source-of-truth and MVP tables in place). Treat that doc as the current schema reference, not a to-do list. Confirm the live schema matches it before building.
2. Build the shared components from the design system.
3. Build the screen templates from the screen inventory, wired to a typed data-access layer.

Any further schema changes must be made as reviewable Supabase migrations, never ad-hoc destructive drops against production. An offline backup of the pre-cleanse database exists; do not assume one exists for future changes.

## Workflow preferences

- Before writing a component, check the design system for an existing named component that covers it. Reuse, don't reinvent.
- Keep all colours, spacing, and radius values referencing the design tokens. Never hardcode a hex value in a component.
- Ask before introducing a new dependency, a new top-level route, or any screen not in the screen inventory.
- Do not commit secrets. Supabase keys go in environment variables.
