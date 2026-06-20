/**
 * Data-access functions for subtopic_groups (patterns) and
 * student_pattern_progress. Used by Dashboard, Mark Pathway,
 * Pattern Secured, and Progress screens.
 */
import { supabase } from "./client";
import type { SubtopicGroup, StudentPatternProgress, Topic, PatternStatus } from "@/types/database";

/** All patterns for a topic, ordered by display_order */
export async function getPatternsByTopic(topic: Topic): Promise<SubtopicGroup[]> {
  const { data, error } = await supabase
    .from("subtopic_groups")
    .select("*")
    .eq("topic", topic)
    .order("display_order");
  if (error) throw error;
  return data;
}

/** All patterns across all topics, ordered by display_order */
export async function getAllPatterns(): Promise<SubtopicGroup[]> {
  const { data, error } = await supabase
    .from("subtopic_groups")
    .select("*")
    .order("display_order");
  if (error) throw error;
  return data;
}

/** Single pattern by id */
export async function getPattern(id: string): Promise<SubtopicGroup> {
  const { data, error } = await supabase
    .from("subtopic_groups")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

/** All progress rows for a student */
export async function getStudentProgress(
  studentId: string
): Promise<StudentPatternProgress[]> {
  const { data, error } = await supabase
    .from("student_pattern_progress")
    .select("*")
    .eq("student_id", studentId);
  if (error) throw error;
  return data;
}

/** Progress for a specific student + pattern pair */
export async function getPatternProgress(
  studentId: string,
  subtopicGroupId: string
): Promise<StudentPatternProgress | null> {
  const { data, error } = await supabase
    .from("student_pattern_progress")
    .select("*")
    .eq("student_id", studentId)
    .eq("subtopic_group_id", subtopicGroupId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

/** Upsert a progress row */
export async function upsertPatternProgress(
  row: StudentPatternProgress
): Promise<void> {
  const { error } = await supabase
    .from("student_pattern_progress")
    .upsert(row, { onConflict: "student_id,subtopic_group_id" });
  if (error) throw error;
}

/**
 * Count patterns by status for a student + topic.
 * Returns { secured, in_progress, needs_practice, not_started, total }.
 */
export async function getTopicMetrics(
  studentId: string,
  topic: Topic
): Promise<Record<PatternStatus | "total", number>> {
  const [patterns, progress] = await Promise.all([
    getPatternsByTopic(topic),
    getStudentProgress(studentId),
  ]);

  const progressMap = new Map(progress.map((p) => [p.subtopic_group_id, p.status]));

  const counts: Record<PatternStatus | "total", number> = {
    secured: 0,
    in_progress: 0,
    needs_practice: 0,
    not_started: 0,
    total: patterns.length,
  };

  for (const pattern of patterns) {
    const status = progressMap.get(pattern.id) ?? "not_started";
    counts[status]++;
  }

  return counts;
}
