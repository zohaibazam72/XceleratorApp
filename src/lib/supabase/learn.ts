import type { SupabaseClient } from "@supabase/supabase-js";
import type { SubtopicGroup } from "@/types/database";

export interface LearnData {
  pattern: SubtopicGroup;
}

export async function getLearnData(
  patternId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client: SupabaseClient<any, any, any>
): Promise<LearnData | null> {
  const { data } = await client
    .from("subtopic_groups")
    .select("*")
    .eq("id", patternId)
    .maybeSingle();

  if (!data) return null;
  return { pattern: data as SubtopicGroup };
}
