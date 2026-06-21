/**
 * Dashboard data-access layer.
 * Aggregates all the data the Dashboard screen needs in a single call.
 */
import { supabase } from "./client";
import type {
  SubtopicGroup,
  StudentProfile,
  StudentPatternProgress,
  PatternStatus,
  Topic,
} from "@/types/database";

const TOPIC_PRIORITY: Topic[] = [
  "Algebra",
  "Ratio and Proportion",
  "Geometry and Measures",
  "Number",
  "Statistics and Probability",
];

export interface RecentActivityItem {
  description: string;
  timestamp: string;
  status: PatternStatus;
}

export interface DashboardData {
  student: StudentProfile | null;
  currentTopic: Topic;
  topicMetrics: {
    secured: number;
    in_progress: number;
    needs_practice: number;
    not_started: number;
    total: number;
  };
  currentPattern: SubtopicGroup | null;
  upNextPattern: SubtopicGroup | null;
  currentPatternCompletionPct: number;
  recentActivity: RecentActivityItem[];
}

export async function getDashboardData(userId: string): Promise<DashboardData> {
  // ── Student profile ───────────────────────────────────────────────────────
  const { data: student } = await supabase
    .from("student_profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  const targetGrade: number = student?.target_grade ?? 7;

  // ── Patterns (in-scope: grade_level ≤ target grade) ──────────────────────
  const { data: rawPatterns } = await supabase
    .from("subtopic_groups")
    .select("*")
    .lte("grade_level", targetGrade)
    .order("display_order");
  const patterns: SubtopicGroup[] = rawPatterns ?? [];

  // ── Student progress ──────────────────────────────────────────────────────
  const { data: rawProgress } = await supabase
    .from("student_pattern_progress")
    .select("*")
    .eq("student_id", userId);
  const progressRows: StudentPatternProgress[] = rawProgress ?? [];
  const progressMap = new Map(progressRows.map((p) => [p.subtopic_group_id, p]));

  function statusOf(patternId: string): PatternStatus {
    return progressMap.get(patternId)?.status ?? "not_started";
  }

  // ── Current topic: first in priority order with unsecured in-scope patterns
  let currentTopic: Topic = TOPIC_PRIORITY[0];
  for (const topic of TOPIC_PRIORITY) {
    const tp = patterns.filter((p) => p.topic === topic);
    if (tp.some((p) => statusOf(p.id) !== "secured")) {
      currentTopic = topic;
      break;
    }
  }

  // ── Topic metrics ─────────────────────────────────────────────────────────
  const topicPatterns = patterns.filter((p) => p.topic === currentTopic);
  const topicMetrics = {
    secured: 0,
    in_progress: 0,
    needs_practice: 0,
    not_started: 0,
    total: topicPatterns.length,
  };
  for (const p of topicPatterns) {
    topicMetrics[statusOf(p.id)]++;
  }

  // ── Next pattern to work on ───────────────────────────────────────────────
  const STATUS_PRIORITY: PatternStatus[] = ["in_progress", "not_started", "needs_practice"];
  let currentPattern: SubtopicGroup | null = null;
  for (const s of STATUS_PRIORITY) {
    const found = topicPatterns.find((p) => statusOf(p.id) === s);
    if (found) { currentPattern = found; break; }
  }

  // ── Up-next pattern ───────────────────────────────────────────────────────
  let upNextPattern: SubtopicGroup | null = null;
  if (currentPattern) {
    const idx = topicPatterns.findIndex((p) => p.id === currentPattern!.id);
    const candidate = topicPatterns[idx + 1] ?? null;
    if (candidate && statusOf(candidate.id) !== "secured") upNextPattern = candidate;
  }

  // ── Completion % for current pattern ─────────────────────────────────────
  let currentPatternCompletionPct = 0;
  if (currentPattern) {
    const progress = progressMap.get(currentPattern.id);
    const total = currentPattern.total_questions;
    if (progress && total > 0) {
      currentPatternCompletionPct = Math.min(100, (progress.questions_completed / total) * 100);
    }
  }

  // ── Recent activity ───────────────────────────────────────────────────────
  const recentActivity: RecentActivityItem[] = progressRows
    .filter((p) => p.status !== "not_started")
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 3)
    .map((p) => {
      const pattern = patterns.find((pat) => pat.id === p.subtopic_group_id);
      const verb =
        p.status === "secured" ? "Secured"
        : p.status === "needs_practice" ? "Needs practice"
        : "Attempted";
      const desc = pattern
        ? `${verb}: ${pattern.subtopic}, grade ${pattern.grade_level}`
        : verb;
      return { description: desc, timestamp: p.updated_at, status: p.status };
    });

  return {
    student,
    currentTopic,
    topicMetrics,
    currentPattern,
    upNextPattern,
    currentPatternCompletionPct,
    recentActivity,
  };
}
