"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { browserSupabase } from "@/lib/supabase/browser";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await browserSupabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-md py-xl"
      style={{ backgroundColor: "var(--color-canvas)" }}
    >
      <div className="w-full max-w-sm flex flex-col gap-xl">
        {/* Logo */}
        <div className="flex items-center justify-center gap-sm">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="2" y="2" width="20" height="20" rx="5" fill="var(--color-gold-600)" />
            <path d="M7 12l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-semibold text-ink" style={{ fontSize: "var(--text-h3)" }}>Xcelerator</span>
        </div>

        <div className="rounded-lg border border-border-neutral bg-surface p-xl flex flex-col gap-lg">
          <div>
            <h1 className="font-semibold text-ink" style={{ fontSize: "var(--text-h3)" }}>Sign in</h1>
            <p className="text-small text-ink-muted mt-xs">Welcome back. Let’s keep moving.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-md">
            <div className="flex flex-col gap-xs">
              <label className="text-small font-medium text-ink" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-border-neutral bg-canvas px-md py-sm text-small text-ink placeholder:text-ink-muted focus:outline-none focus:border-teal-600"
                placeholder="you@example.com"
              />
            </div>

            <div className="flex flex-col gap-xs">
              <label className="text-small font-medium text-ink" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-border-neutral bg-canvas px-md py-sm text-small text-ink placeholder:text-ink-muted focus:outline-none focus:border-teal-600"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p
                className="text-small rounded-md px-md py-sm"
                style={{
                  backgroundColor: "var(--color-coral-100)",
                  color: "var(--color-coral-600)",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-md py-sm text-small font-medium text-ink transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: "var(--color-gold-600)" }}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="text-center text-small text-ink-muted">
            No account?{" "}
            <Link href="/signup" className="font-medium text-teal-600 hover:underline underline-offset-2">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
