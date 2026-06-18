# Xcelerator screen inventory

The complete set of screen templates. There are only nine. Every topic and every pattern reuses these same templates — the template is fixed, the content is data pulled from Supabase (see data-model.md). Never build a per-topic or per-pattern bespoke screen. Component names below refer to named components in design-system.md.

Reference screenshots of each screen accompany this folder; treat them as the visual source of truth alongside this spec.

---

## Global

- **Navigation**: persistent left sidebar (desktop) / bottom nav (narrow viewport) with: Home (dashboard), Mark pathway, Mocks, Progress, Profile. Logo top-left.
- **Header context**: target grade and, where relevant, current grade are shown as small pills. Current grade is always labelled as the last confirmed mock result.
- **Frequency wording**: everywhere a frequency appears it reads "Comes up in X% of AQA Higher papers" — never a bare percentage.
- **Terminology**: topic → pattern → anchor question. Status counts always refer to patterns.

---

## 1. Dashboard (Home)

The "what should I do next" screen. Answers it without the student having to browse.

Contains, top to bottom:
- Greeting + streak indicator (gold) + target/current grade pills. (MVP: gamification was stripped from the database, so the streak indicator is a static placeholder or hidden — no backing data. See data-model.md.)
- A one-line clarifier that current grade is the last confirmed mock result and patterns span the grade band up to target until secured.
- **"Your algebra pattern metrics"** heading over four metric cards: secured / in progress / needs practice / remaining, with a "N patterns in total" line (icon-led, left of the text). Metrics reflect the student's current topic.
- **Pattern hero card** for the next pattern: title, grade, category + high-frequency tags, frequency stat, marks, question count, completion ring, gold "Continue pattern" CTA → opens the Learn screen for that pattern.
- An "Up next" locked card (next pattern, locked until current is secured) and two quick actions: Start a mock, Review weak patterns.
- **Topic priority bar** with the "(why this order?)" affordance.
- Recent activity (three most recent rows).

States: brand-new user (no activity yet — metrics zeroed, hero card shows the first pattern in the path); mid-progress (as in reference); all patterns in current topic secured (hero advances to first pattern of next topic).

Keep this screen calm and scannable — it is seen most often. Detailed rationale (why-this-order, why-it-works) lives behind affordances, not permanently on screen.

## 2. Learn

Step 1 of the pattern flow. Pattern stepper at top (Learn active).

Contains: pattern title; a concise plain-language explanation of the concept; at-a-glance rule cards (e.g. the two proportion formulae); a **"How this shows up in the exam"** callout written in the exact phrasing the real exam uses for this pattern (this is the differentiating content — it is pattern-specific, not generic); a common-mistake note. Primary CTA → Worked examples. Secondary text link → skip to Exam questions (student choice, not an adaptive decision).

## 3. Worked examples

Step 2. Pattern stepper (Learn done, Worked examples active).

Contains: two or more fully worked examples for this pattern. Each shows the question in the **serif exam-question block**, then the solution broken into steps, each step tagged with its real **mark badge** (M1 / A1 / B1) from the mark scheme. A short note drawing attention to the recurring structure across examples (e.g. "find k first, then use it"). Primary CTA → Exam questions.

The mark badges are the credibility payload here — they come from the real mark scheme, not generic step labels.

## 4. Exam questions

Step 3. Pattern stepper (first two done, Exam questions active). This is where the student banks marks.

Contains, per question: progress indicator ("Question N of M") + real paper reference (board, sitting, paper, question number); the question in the **serif block**; mark count; an answer input; a Check answer action. On check:
- The **final answer is auto-marked** (clean numeric / multiple choice / single value) — awarded or not, shown against the correct answer.
- **Method marks are self-checked** against the revealed mark scheme: the student ticks the mark-scheme criteria they met (each shown with its mark badge). Running "marks so far / total" updates.

This split is the MVP marking model: auto-mark what is cleanly auto-markable, self-check method marks against the real scheme. Do not attempt AI handwriting/method grading in MVP.

States: unanswered; answered-correct; answered-incorrect (final answer wrong but method marks may still be self-awarded); last question in set → routes to Pattern secured.

## 5. Pattern secured

The mastery payoff. Reached after the final question in a pattern's set.

Contains: pattern stepper all-complete; an animated completion ring filling to 100% (the one deliberate motion moment); "Pattern secured" + pattern name/grade; a stats row (questions done, marks secured as a fraction, method marks confirmed); a **"What this means for your grade"** callout tying the secured pattern back to its exam-day mark value; an "Algebra progress" bar (N of M patterns secured); an "Up next" preview showing the next pattern with a lock-open icon; gold "Start next pattern" CTA.

Securing a pattern is what flips its status to "secured" everywhere else (dashboard, mark pathway, progress).

## 6. Mark pathway

The full, ordered revision path — the detailed topic view the dashboard summarises.

Contains: target grade pill; **topic tabs** (Algebra / Ratio / Geometry / Number / Stats, each with its syllabus %); a per-topic summary bar (N of M patterns secured + secured/in-progress/remaining counts); the pattern list grouped under **grade band dividers** (Grade 6 / 7 / 8), each row a **pattern list row** with status icon, name, frequency line, and status badge. Not-started patterns are reduced opacity; grade-8 (ahead-of-target-band) patterns fade further but remain visible. Tapping a pattern opens its flow at the appropriate step.

The grade-band grouping makes the cascade logic physically visible: lower grade bands come first, in priority order within each.

## 7. Mocks

Full-paper practice under exam conditions — deliberately a different, more serious register than the practice flow.

Contains: a calibrated-to-grade note; an **exam-conditions notice** (timed, no pausing, no hints); a recommended **full mock** card (all three papers, total marks, duration, and a composition line stating how many questions are real past-paper vs human-written-and-verified); individual **Paper 1 (non-calc)** and **Paper 2 (calc)** cards; **mock history** showing past attempts as score + estimated grade + date, ending with a grade-movement line.

Mocks are assembled by recombining real anchor questions with human-written, human-verified questions (see product-brief.md). The composition line is a trust signal — keep it accurate to the data.

The in-progress mock-taking interface (timer, paper view, question navigation) is a further screen to design before mocks ship; flagged as not-yet-designed.

## 8. Progress

Outcome tracking — measured by grade movement, never engagement.

Contains: target/current pills; a **grade trajectory chart** (mock results over time vs target line) with a movement summary line; **patterns secured by topic** (one bar per topic in its topic colour, N of M); **patterns needing attention** (rows for needs-practice patterns with frequency + marks-at-risk and a Revisit action).

Routing rule: tapping a topic's progress bar opens the **Mark pathway with that topic's tab pre-selected** — it does not open a separate page. Progress is the summary; Mark pathway is the detail. No bespoke per-topic progress screen exists.

## 9. Profile

Account and the two inputs the whole path depends on.

Contains: identity (name, email, avatar initial); **grade goals** (target grade — editable; current grade — editable, labelled "last confirmed mock result"); **exam details** (exam board — read-only "AQA Higher" in MVP; exam date — editable); **subscription** (MVP: billing was stripped from the database, so this section is a static placeholder or hidden — no backing data); **preferences** (notifications toggle, daily reminder time — note the streak this would drive is itself an MVP placeholder); help/support and terms links; sign out.

Editing target grade re-derives the pattern path and grade-band cascade. Editing current grade (after a new mock) shifts which grade bands remain in scope.

---

## Routing summary

- Dashboard "Continue pattern" / any pattern tap → Learn (or the pattern's current step)
- Learn → Worked examples → Exam questions → Pattern secured → next pattern's Learn
- Dashboard "Start a mock" / nav Mocks → Mocks
- Progress topic bar → Mark pathway (topic tab pre-selected)
- Securing a pattern updates its status across dashboard, mark pathway, and progress

## Not yet designed (flagged for later)

- In-progress mock-taking interface (timer / paper / navigation)
- Onboarding/sign-up (the founder has separate mockups for this)
- Any parent or school/admin view (out of MVP scope)
