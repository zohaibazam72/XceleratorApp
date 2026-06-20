/**
 * Data-access functions for student_profiles.
 * Used by Dashboard, Profile screen, and anywhere grade context is needed.
 */
import { supabase } from "./client";
import type { StudentProfile } from "@/types/database";

/** Fetch the current user's profile */
export async function getStudentProfile(userId: string): Promise<StudentProfile | null> {
  const { data, error } = await supabase
    .from("student_profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

/**
 * Update editable profile fields.
 * Editing target_grade or current_grade re-derives the pattern path
 * (handled in UI logic, not here).
 */
export async function updateStudentProfile(
  userId: string,
  updates: Partial<Pick<StudentProfile, "name" | "target_grade" | "current_grade" | "exam_month" | "exam_year">>
): Promise<void> {
  const { error } = await supabase
    .from("student_profiles")
    .update(updates)
    .eq("user_id", userId);
  if (error) throw error;
}
