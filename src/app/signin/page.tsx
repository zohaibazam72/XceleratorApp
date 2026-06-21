"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { browserSupabase } from "@/lib/supabase/browser";
import AuthLayout from "@/components/AuthLayout";

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
    <AuthLayout>
      <div>
        <h1 className="font-semibold text-ink" style={{ fontSize: "var(--text-h3)" }}>Sign in</h1>
        <p className="text-small text-ink-muted mt-1">Welcome back. Let&apos;s keep moving.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-small font-medium text-ink" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 w-full rounded-md border px-4 text-sm text-ink placeholder:text-ink-muted focus:outline-none"
            style={{
              borderColor: "var(--color-border-neutral)",
              backgroundColor: "var(--color-canvas)",
            }}
            placeholder="you@example.com"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-small font-medium text-ink" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 w-full rounded-md border px-4 text-sm text-ink placeholder:text-ink-muted focus:outline-none"
            style={{
              borderColor: "var(--color-border-neutral)",
              backgroundColor: "var(--color-canvas)",
            }}
            placeholder="••••••••"
          />
        </div>

        {error && (
          <p
            className="text-small rounded-md px-4 py-2"
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
          className="h-11 w-full flex items-center justify-center rounded-md text-sm font-medium text-ink transition-opacity hover:opacity-90 disabled:opacity-50"
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
    </AuthLayout>
  );
}
