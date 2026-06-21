"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { browserSupabase } from "@/lib/supabase/browser";
import AuthLayout from "@/components/AuthLayout";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await browserSupabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.session) {
      router.push("/onboarding");
      router.refresh();
    } else {
      setEmailSent(true);
      setLoading(false);
    }
  }

  if (emailSent) {
    return (
      <AuthLayout>
        <div className="flex flex-col items-center gap-4 text-center py-4">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
            <circle cx="20" cy="20" r="19" stroke="var(--color-teal-600)" strokeWidth="1.5" />
            <path d="M12 21l5 5 11-11" stroke="var(--color-teal-600)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div>
            <h1 className="font-semibold text-ink" style={{ fontSize: "var(--text-h3)" }}>Check your email</h1>
            <p className="text-small text-ink-muted mt-2">
              We sent a confirmation link to{" "}
              <span className="font-medium text-ink">{email}</span>. Click it to activate your account, then come back to sign in.
            </p>
          </div>
          <Link
            href="/signin"
            className="text-small font-medium text-teal-600 hover:underline underline-offset-2"
          >
            Back to sign in
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div>
        <h1 className="font-semibold text-ink" style={{ fontSize: "var(--text-h3)" }}>Create account</h1>
        <p className="text-small text-ink-muted mt-1">Start building your grade today.</p>
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
            autoComplete="new-password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 w-full rounded-md border px-4 text-sm text-ink placeholder:text-ink-muted focus:outline-none"
            style={{
              borderColor: "var(--color-border-neutral)",
              backgroundColor: "var(--color-canvas)",
            }}
            placeholder="At least 6 characters"
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
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="text-center text-small text-ink-muted">
        Already have an account?{" "}
        <Link href="/signin" className="font-medium text-teal-600 hover:underline underline-offset-2">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
