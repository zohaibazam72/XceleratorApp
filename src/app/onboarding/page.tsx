"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { browserSupabase } from "@/lib/supabase/browser";

const GRADES = [4, 5, 6, 7, 8, 9];

const MONTHS = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

const YEARS = [2025, 2026, 2027];

export default function OnboardingPage() {
  const [name, setName] = useState("");
  const [targetGrade, setTargetGrade] = useState(7);
  const [examMonth, setExamMonth] = useState(6); // June default
  const [examYear, setExamYear] = useState(2026);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    browserSupabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/signin");
        return;
      }
      setUserId(user.id);
    });
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return;
    setLoading(true);
    setError(null);

    const { error } = await browserSupabase.from("student_profiles").insert({
      user_id: userId,
      name: name.trim(),
      target_grade: targetGrade,
      exam_month: examMonth,
      exam_year: examYear,
      exam_board: "AQA",
      paper_tier: "Higher",
    });

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
        <div className="flex flex-col items-center gap-sm text-center">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="2" y="2" width="20" height="20" rx="5" fill="var(--color-gold-600)" />
            <path d="M7 12l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div>
            <h1 className="font-semibold text-ink" style={{ fontSize: "var(--text-h3)" }}>Set up your profile</h1>
            <p className="text-small text-ink-muted mt-xs">This shapes your entire revision path.</p>
          </div>
        </div>

        <div className="rounded-lg border border-border-neutral bg-surface p-xl flex flex-col gap-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-md">
            {/* Name */}
            <div className="flex flex-col gap-xs">
              <label className="text-small font-medium text-ink" htmlFor="name">Your first name</label>
              <input
                id="name"
                type="text"
                autoComplete="given-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-border-neutral bg-canvas px-md py-sm text-small text-ink placeholder:text-ink-muted focus:outline-none focus:border-teal-600"
                placeholder="e.g. Alex"
              />
            </div>

            {/* Target grade */}
            <div className="flex flex-col gap-xs">
              <label className="text-small font-medium text-ink" htmlFor="targetGrade">
                Target grade
              </label>
              <p className="text-xs text-ink-muted">This determines which patterns are in scope for you.</p>
              <select
                id="targetGrade"
                value={targetGrade}
                onChange={(e) => setTargetGrade(Number(e.target.value))}
                className="w-full rounded-md border border-border-neutral bg-canvas px-md py-sm text-small text-ink focus:outline-none focus:border-teal-600"
              >
                {GRADES.map((g) => (
                  <option key={g} value={g}>
                    Grade {g}{g === 7 ? " (recommended starting point)" : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Exam date */}
            <div className="flex flex-col gap-xs">
              <label className="text-small font-medium text-ink">Exam date</label>
              <p className="text-xs text-ink-muted">AQA Higher exams sit in May/June or November.</p>
              <div className="grid grid-cols-2 gap-sm">
                <select
                  value={examMonth}
                  onChange={(e) => setExamMonth(Number(e.target.value))}
                  className="rounded-md border border-border-neutral bg-canvas px-md py-sm text-small text-ink focus:outline-none focus:border-teal-600"
                  aria-label="Exam month"
                >
                  {MONTHS.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
                <select
                  value={examYear}
                  onChange={(e) => setExamYear(Number(e.target.value))}
                  className="rounded-md border border-border-neutral bg-canvas px-md py-sm text-small text-ink focus:outline-none focus:border-teal-600"
                  aria-label="Exam year"
                >
                  {YEARS.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
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
              disabled={loading || !userId}
              className="flex w-full items-center justify-center rounded-md py-sm text-small font-medium text-ink transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: "var(--color-gold-600)" }}
            >
              {loading ? "Saving…" : "Start my revision path"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
