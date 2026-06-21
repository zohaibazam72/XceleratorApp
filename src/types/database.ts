/**
 * TypeScript types for the Xcelerator Supabase schema.
 * Mirrors the eight live tables described in docs/data-model.md.
 * Keep in sync with the schema; use Supabase type-gen to refresh when schema changes.
 */

// ── Enums ────────────────────────────────────────────────────────────────────────────

export type PatternStatus =
  | "not_started"
  | "in_progress"
  | "needs_practice"
  | "secured";

export type MockPaper = "paper_1" | "paper_2" | "paper_3" | "full";

export type MockStatus = "in_progress" | "completed" | "abandoned";

// ── Topic literal ─────────────────────────────────────────────────────────────────

export type Topic =
  | "Algebra"
  | "Ratio and Proportion"
  | "Geometry and Measures"
  | "Number"
  | "Statistics and Probability";

// ── Source-of-truth tables ────────────────────────────────────────────────────────

/** subtopic_groups — one row per pattern (70 rows) */
export interface SubtopicGroup {
  id: string;
  grade_level: number;
  topic: Topic;
  subtopic: string;
  aqa_frequency_pct: number;
  total_questions: number;
  display_order: number;
  created_at: string;
  learn_explanation: string | null;
  learn_exam_callout: string | null;
  learn_common_mistake: string | null;
}

export interface MarkSchemeStep {
  mark_code: string;
  description: string;
  marks: number;
}

/** question_bank — one row per anchor question (646 rows) */
export interface Question {
  id: string;
  row_id: number;
  subtopic_group_id: string;
  grade_level: number;
  aqa_frequency_percent: number;
  topic: Topic;
  subtopic: string;
  anchor_paper_reference: string | null;
  question_image_url: string | null;
  mark_scheme_image_urls: string[];
  final_answer: string | null;
  accepted_answers: string[] | null;
  answer_type: string | null;
  auto_markable: boolean;
  max_marks: number | null;
  has_diagram: boolean;
  is_active: boolean;
  mark_scheme_steps: MarkSchemeStep[] | null;
  m_marks: number | null;
  a_marks: number | null;
  b_marks: number | null;
}

// ── Student tables ────────────────────────────────────────────────────────────────

/** student_profiles — one row per student */
export interface StudentProfile {
  user_id: string;
  name: string;
  current_grade: number | null;
  target_grade: number;
  mock_grade: number | null;
  exam_month: number | null;
  exam_year: number | null;
  exam_board: string;
  paper_tier: string;
  year_group: number | null;
  created_at: string;
  updated_at: string;
}

/** student_pattern_progress — one row per (student, pattern) pair */
export interface StudentPatternProgress {
  student_id: string;
  subtopic_group_id: string;
  status: PatternStatus;
  questions_completed: number;
  marks_secured: number;
  updated_at: string;
}

/** student_question_attempts — one row per question attempt */
export interface StudentQuestionAttempt {
  id: string;
  user_id: string;
  question_id: string;
  submitted_answer: string | null;
  final_answer_correct: boolean | null;
  self_marked_marks: number | null;
  max_marks: number | null;
  mark_scheme_revealed: boolean;
  attempt_status: string;
  time_spent_seconds: number | null;
  created_at: string;
  updated_at: string;
}

/** student_question_bookmarks — optional saved questions */
export interface StudentQuestionBookmark {
  student_id: string;
  question_id: string;
  note: string | null;
  created_at: string;
}

// ── Mock tables ───────────────────────────────────────────────────────────────────

/** mocks — a fixed assembled paper */
export interface Mock {
  id: string;
  title: string;
  paper: MockPaper;
  calculator_allowed: boolean;
  total_marks: number;
  duration_minutes: number;
  grade_calibration: number;
  real_question_count: number;
  written_question_count: number;
  question_ids: string[];
  is_active: boolean;
  created_at: string;
}

/** mock_attempts — one row per student mock sitting */
export interface MockAttempt {
  id: string;
  student_id: string;
  mock_id: string;
  marks_scored: number | null;
  marks_available: number;
  estimated_grade: number | null;
  status: MockStatus;
  started_at: string;
  completed_at: string | null;
}
