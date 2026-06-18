# Xcelerator data model

This describes the actual structure of the "Xcelerator SaaS" Supabase database as it now stands, after the MVP cleanse. It is the schema reference Claude Code builds the app against. It also maps each screen to the data it reads, and flags the remaining content gaps.

> Status: the cleanse described in earlier drafts has been **executed**. The database below is the live, current state. An offline backup of the pre-cleanse database exists. Earlier broader-vision tables (gamified XP, adaptive diagnostics/missions, AI photo-marking, parent portal, Stripe billing) have been removed.

---

## Domain model

The conceptual hierarchy the whole app rests on:

**Topic** (Algebra, Ratio and Proportion, Geometry and Measures, Number, Statistics and Probability) → contains **Patterns** (the named recurring subtopics, e.g. "Direct and inverse proportion") → each pattern contains **Anchor questions** (the real historical exam-question instances, with images and mark schemes).

Per student, layered on top: a **target grade** and **current grade** (last confirmed mock), a **progress status per pattern** (secured / in progress / needs practice / not started), and a record of **question attempts** (answer submitted, self-marked against the mark scheme).

---

## The eight live tables

### Source of truth (content)

#### `subtopic_groups` — the pattern definitions (70 rows)
The canonical list of patterns. One row per pattern. Columns: `id` (text PK), `grade_level`, `topic`, `subtopic` (the pattern name), `aqa_frequency_pct`, `total_questions`, `display_order`, `created_at`. Drives mark-pathway ordering, dashboard metrics, frequency stats, topic-priority logic. This table was already clean and was left untouched.

#### `question_bank` — the anchor questions (646 rows)
The source of truth for questions. Columns the app uses: `id` (uuid PK), `row_id`, `subtopic_group_id` (now a **foreign key** to `subtopic_groups.id`), `grade_level`, `aqa_frequency_percent`, `topic`, `subtopic`, `anchor_paper_reference`, `question_image_url` (Supabase-hosted), `mark_scheme_image_urls` (text array, Supabase-hosted), `final_answer`, `accepted_answers`, `answer_type`, `auto_markable`, `max_marks`, `has_diagram`, `is_active`, plus the new structured-mark fields `mark_scheme_steps` (jsonb), `m_marks`, `a_marks`, `b_marks`. Automation-status and `source_row` columns remain but are not used by the app.

Cleanse already applied: foreign key to `subtopic_groups` added; diagnostic columns and the redundant Google-Drive URL columns dropped; structured mark columns added.

**Data state (important):** the question and mark-scheme **images** are present for all rows. The **answer and mark data is empty** — `final_answer`, `answer_type`, `mark_scheme_steps`, `m/a/b_marks` are unpopulated, and `auto_markable` is false everywhere (only `max_marks` is partially filled). `source_row` was found empty, so this data is not recoverable from the database; it is populated later from the offline spreadsheet or by team authoring. See "Graceful degradation" below — the app is built to read these fields and fall back cleanly while they are empty.

### Student data

#### `student_profiles` — (1 row)
Reshaped to MVP. Kept: `user_id`, `name`, `current_grade` (the last confirmed mock result — label it that way in the UI), `target_grade` (constraint widened to 4–9), `mock_grade`, `exam_month`, `exam_year`, `exam_board`, `paper_tier`, `year_group`, timestamps. Dropped: `total_xp`, `current_territory`, `streak_days`, `longest_streak`, `last_active_date`, `diagnostic_completed`, `diagnostic_completed_at`.

#### `student_pattern_progress` — net-new (0 rows)
Drives "secured / in progress / needs practice / not started" everywhere (dashboard metrics, mark-pathway badges, progress bars, pattern-secured). One row per student per pattern. Columns: `student_id` (FK auth.users), `subtopic_group_id` (FK subtopic_groups), `status` (enum: not_started / in_progress / needs_practice / secured), `questions_completed`, `marks_secured`, `updated_at`. PK is (student_id, subtopic_group_id). A pattern flips to "secured" when its anchor-question set is completed. RLS: students see only their own rows.

#### `student_question_attempts` — reshaped (0 rows)
Drives the Exam questions screen and feeds progress. Columns: `id`, `user_id`, `question_id` (FK question_bank), `submitted_answer`, `final_answer_correct` (bool, auto-marked; null when the question has no final answer yet), `self_marked_marks` (numeric, from the mark-scheme tick list), `max_marks`, `mark_scheme_revealed`, `attempt_status`, `time_spent_seconds`, timestamps. Diagnostic-session linkage removed.

#### `student_question_bookmarks` — (0 rows)
A simple "save a question" table (student_id, question_id, note). Not wired to any of the nine designed screens; harmless to keep, optional to use. Flag if it should be dropped.

### Mocks (net-new)

#### `mocks` — (0 rows)
A mock definition: a fixed set of questions assembled into a paper. Columns: `id`, `title`, `paper` (paper_1 / paper_2 / paper_3 / full), `calculator_allowed`, `total_marks`, `duration_minutes`, `grade_calibration`, `real_question_count`, `written_question_count` (the real-vs-written composition shown on the Mocks screen), `question_ids` (uuid array), `is_active`, `created_at`. RLS: any authenticated user can read active mocks.

#### `mock_attempts` — (0 rows)
Drives mock history and the Progress grade trajectory. Columns: `id`, `student_id`, `mock_id`, `marks_scored`, `marks_available`, `estimated_grade`, `status`, `started_at`, `completed_at`. RLS: students see only their own.

---

## Graceful degradation (the marking model)

The Exam questions screen is built fully for the populated state and shows the richest experience the data supports per question — it is never a fake placeholder, and no rebuild is needed when data lands:

- **Final answer present** → show the answer input and auto-mark it. **Absent** → hide the input, show the mark-scheme image, let the student self-assess against it.
- **`mark_scheme_steps` present** → show the tickable M1/A1/B1 self-check. **Absent** → show the mark-scheme image with a simpler "did you get this step?" self-check.

Today all 646 questions are in the fallback (image self-assessment) state. As `final_answer` and `mark_scheme_steps` are populated, individual questions upgrade automatically to full auto-mark + tick-list, with zero code change.

Do **not** add live AI marking of student working to the app — it reopens the credibility risk the product is positioned against. AI may be used *offline* as an authoring aid to draft candidate answers/marks from the mark-scheme images, which the team verifies before they enter `question_bank`.

---

## Screen → data mapping

- **Dashboard**: `subtopic_groups` + `student_pattern_progress` + `student_profiles`.
- **Learn / Worked examples**: `subtopic_groups` + `question_bank`. Pattern-level Learn content (explanation, exam-wording callout, common mistake) has no column yet — add a content column on `subtopic_groups` or a small `pattern_content` table, and author per pattern.
- **Exam questions**: `question_bank` + `student_question_attempts` (auto-mark + self-mark, per graceful degradation).
- **Pattern secured**: `student_pattern_progress` + the pattern's attempt records.
- **Mark pathway**: `subtopic_groups` grouped by topic and grade band + `student_pattern_progress`.
- **Mocks**: `mocks` + `mock_attempts`.
- **Progress**: `mock_attempts` (trajectory) + `student_pattern_progress` (per-topic bars, needs-attention).
- **Profile**: `student_profiles`.

---

## Open content tasks (not schema work)

- **Answer + structured mark data** for the 646 questions — the critical path to full interactive marking. Source: offline spreadsheet / team authoring (optionally AI-drafted, human-verified).
- **Pattern-level Learn content** — needs a home in the schema and authoring per pattern.
- **Mock assembly** — `mocks` rows need building by recombining anchor questions with human-written verified questions.
- **Topic coverage** — dataset is AQA Higher, weighted toward Algebra/Geometry; Ratio and Statistics are thinner. Templates render any pattern; genuine full coverage depends on populating the thinner areas.

## MVP scope reminders

- AQA Higher only. `exam_board` / `paper_tier` columns are retained so other boards/tiers are addable later; do not implement multi-board logic now.
- Streak and subscription are out of MVP: the dashboard streak indicator and the Profile subscription section are shown as static placeholders or hidden (no backing tables exist). Reflected in the screen inventory.
