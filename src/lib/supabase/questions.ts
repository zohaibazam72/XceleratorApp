/**
 * Data-access functions for question_bank and student_question_attempts.
 * Used by Worked Examples, Exam Questions, and Pattern Secured screens.
 */
import { supabase } from "./client";
import type { Question, StudentQuestionAttempt } from "@/types/database";

/** All active questions for a pattern, ordered by row_id */
export async function getQuestionsByPattern(
  subtopicGroupId: string
): Promise<Question[]> {
  const { data, error } = await supabase
    .from("question_bank")
    .select("*")
    .eq("subtopic_group_id", subtopicGroupId)
    .eq("is_active", true)
    .order("row_id");
  if (error) throw error;
  return data;
}

/** Single question by id */
export async function getQuestion(id: string): Promise<Question> {
  const { data, error } = await supabase
    .from("question_bank")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

/** All attempts by a student for questions in a pattern */
export async function getAttemptsForPattern(
  userId: string,
  subtopicGroupId: string
): Promise<StudentQuestionAttempt[]> {
  const { data, error } = await supabase
    .from("student_question_attempts")
    .select("*, question_bank!inner(subtopic_group_id)")
    .eq("user_id", userId)
    .eq("question_bank.subtopic_group_id", subtopicGroupId);
  if (error) throw error;
  return data as StudentQuestionAttempt[];
}

/** Insert a new question attempt */
export async function upsertAttempt(
  attempt: Omit<StudentQuestionAttempt, "id" | "created_at" | "updated_at">
): Promise<StudentQuestionAttempt> {
  const { data, error } = await supabase
    .from("student_question_attempts")
    .insert(attempt)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/** Update an existing attempt (e.g. reveal mark scheme, record self-mark) */
export async function updateAttempt(
  id: string,
  updates: Partial<Omit<StudentQuestionAttempt, "id">>
): Promise<void> {
  const { error } = await supabase
    .from("student_question_attempts")
    .update(updates)
    .eq("id", id);
  if (error) throw error;
}
