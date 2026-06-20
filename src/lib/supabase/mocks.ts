/**
 * Data-access functions for mocks and mock_attempts.
 * Used by the Mocks screen and the Progress grade trajectory.
 */
import { supabase } from "./client";
import type { Mock, MockAttempt } from "@/types/database";

/** All active mocks */
export async function getActiveMocks(): Promise<Mock[]> {
  const { data, error } = await supabase
    .from("mocks")
    .select("*")
    .eq("is_active", true)
    .order("created_at");
  if (error) throw error;
  return data;
}

/** Mock attempt history for a student, newest first */
export async function getMockAttempts(studentId: string): Promise<MockAttempt[]> {
  const { data, error } = await supabase
    .from("mock_attempts")
    .select("*")
    .eq("student_id", studentId)
    .order("started_at", { ascending: false });
  if (error) throw error;
  return data;
}

/** Insert a new mock attempt when a student starts a mock */
export async function startMockAttempt(
  attempt: Omit<MockAttempt, "id">
): Promise<MockAttempt> {
  const { data, error } = await supabase
    .from("mock_attempts")
    .insert(attempt)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/** Mark a mock attempt as completed with score */
export async function completeMockAttempt(
  id: string,
  marksScored: number,
  estimatedGrade: number
): Promise<void> {
  const { error } = await supabase
    .from("mock_attempts")
    .update({
      marks_scored: marksScored,
      estimated_grade: estimatedGrade,
      status: "completed",
      completed_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) throw error;
}
