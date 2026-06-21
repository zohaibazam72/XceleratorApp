import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-only Supabase client.
 * Uses @supabase/ssr so the session is stored in cookies that the
 * Next.js middleware (createServerClient) can read server-side.
 * Import this only from 'use client' components.
 */
export const browserSupabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
