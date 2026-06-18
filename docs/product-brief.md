# Xcelerator product brief

This is the product logic Claude Code needs to build Xcelerator correctly. It is the "why" behind the rules in CLAUDE.md and the screens in the screen inventory. It is deliberately short — the full business validation lives elsewhere; this is only what shapes the build.

## What Xcelerator is

A GCSE Maths revision web app that productises a proven in-person tutoring method from Xcelerate Academy. The method: focus a student's revision on the highest-frequency exam-question patterns for their target grade, drill the real exam questions for those patterns, and that moves the grade. In person, students following this improved by around three grades on average. Xcelerator delivers the same method without a tutor in the room.

## The one-line promise

Show a student exactly which exam-question patterns they need to master to hit their target grade, then train them to bank those marks through real exam questions, faithful worked examples, and verified mocks.

## Why it exists (the problem)

GCSE students have unlimited content (Corbett Maths, Dr Frost, Maths Genie, past papers) and increasingly free AI marking. What none of them provide is strategy: which of it actually moves the grade, and in what order. Revision time is finite; most of it is spent randomly. Every competitor answers "what is this topic" or "what's wrong with this answer." None answers "what should I do next, given my target grade." That gap is the product.

## The mechanism (three layers)

1. **Topic weighting** — the syllabus weighting (Algebra 30%, Ratio 20%, Geometry 20%, Number 15%, Probability & Statistics 15%) establishes the "big 3" priority. Fixed; Ofqual-prescribed.
2. **Grade-band cascade** — a target grade pulls in every grade band beneath it. A target-8 student works grade 6, 7, and 8 patterns within the priority topics until each is secured — not grade 8 alone.
3. **Sequential mastery loop** — within that set, the student works one pattern at a time through a fixed sequence: **Learn -> Worked Examples -> Exam Questions**, until the pattern is secured, then moves to the next. Mastery-gated, not browsable.

The "intelligence" is in this curriculum logic and the underlying dataset — not in any real-time adaptive engine.

## The proprietary asset

The defensible IP is the dataset: a taxonomy of recurring exam-question **patterns** (70 to date), each tagged to a grade and a pattern-specific frequency, each backed by real historical exam questions with images and mark schemes. This is pattern-level, not topic-level — "which exact question types within Algebra recur and at what frequency for which grade," not "Algebra is important." Topic-level frequency is free and public elsewhere; pattern-level, grade-calibrated, mark-scheme-decomposed data is not, and it took years of teaching plus manual extraction to build. Protecting and completing this dataset matters more than any feature.

## The differentiator, stated plainly

Other apps tell students which topics are high-frequency. Xcelerator tells them which exact question patterns recur, calibrated to their target grade, and gives them the genuine exam questions for that pattern — in the real exam's wording and structure — so revision converts directly into winnable marks. The credibility rests on authenticity: real questions, real mark schemes, human-verified supplementary content, and a real four-year track record.

## Non-negotiables (these protect the product's integrity)

- **Authenticity.** Every question is a real historical exam question or a human-written question verified against a real mark scheme. Never AI-generated practice content. Never invented questions, answers, or marks.
- **No live AI marking of student working.** It reopens the exact credibility weakness the product is positioned against. AI may assist *offline* in authoring (drafting answers/marks from mark-scheme images for human verification), never in live grading.
- **Deterministic path.** Topic weighting -> grade-band cascade -> sequential, mastery-gated patterns. No adaptive real-time "next question" engine, no AI tutor/chatbot.
- **Outcome over engagement.** Success is grade movement, measured via mocks. No leaderboards, no student-vs-student comparison, no XP/gamification as a primary mechanic.
- **Terminology.** topic -> pattern -> anchor question. Status counts always refer to patterns.
- **Frequency wording.** Always "Comes up in X% of AQA Higher papers" — never a bare percentage.
- **Tone.** Calm, premium, reassuring — a confident tutor, not a game. A stressed teenager should feel steadied, not entertained.

## What it must not become

Not a broad multi-subject AI tutor (a competitor's documented weakness). Not a static content library (free incumbents own that). Not an adaptive ML personalisation engine. Not a homework-compliance tool. Not a feature-parity race against free platforms adding AI marking. Depth in one subject, done exceptionally, is the entire strategy.

## MVP boundaries

- AQA Higher tier only. Schema retains board/tier fields so others are addable later; do not build multi-board logic now.
- Nine screen templates (see screen inventory), each rendering unlimited topics/patterns from data. No bespoke per-topic or per-pattern screens.
- Billing, parent portal, gamification, and adaptive diagnostics are out — removed from the database, shown as placeholders where a screen references them.
- The interactive marking experience is built for the populated data state and degrades gracefully while answer/mark data is still being populated (see data-model.md).

## How success is validated

The core claim — that this method moves grades — is testable with Xcelerate Academy's own students before scaling spend. The product instruments grade movement (via mocks) as the primary metric, not time-in-app. Build with that measurement in mind: the data needed to show "patterns secured -> grade moved" should be first-class, not an afterthought.
