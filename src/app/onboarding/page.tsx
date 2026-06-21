"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { browserSupabase } from "@/lib/supabase/browser";
import AuthLayout from "@/components/AuthLayout";

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
  const [examMonth, setExamMonth] = useState(6);
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
    <AuthLayout>
      <div>
        <h1 className="font-semibold text-ink" style={{ fontSize: "var(--text-h3)" }}>Set up your profile</h1>
        <p className="text-small text-ink-muted mt-1">This shapes your entire revision path.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-small font-medium text-ink" htmlFor="name">Your first name</label>
          <input
            id="name"
            type="text"
            autoComplete="given-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 w-full rounded-md border px-4 text-sm text-ink placeholder:text-ink-muted focus:outline-none"
            style={{
              borderColor: "var(--color-border-neutral)",
              backgroundColor: "var(--color-canvas)",
            }}
            placeholder="e.g. Alex"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-small font-medium text-ink" htmlFor="targetGrade">Target grade</label>
          <p className="text-xs text-ink-muted">This determines which patterns are in scope for you.</p>
          <select
            id="targetGrade"
            value={targetGrade}
            onChange={(e) => setTargetGrade(Number(e.target.value))}
            className="h-11 w-full rounded-md border px-4 text-sm text-ink focus:outline-none"
            style={{
              borderColor: "var(--color-border-neutral)",
              backgroundColor: "var(--color-canvas)",
            }}
          >
            {GRADES.map((g) => (
              <option key={g} value={g}>
                Grade {g}{g === 7 ? " (recommended starting point)" : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-small font-medium text-ink">Exam date</label>
          <p className="text-xs text-ink-muted">AQA Higher exams sit in May/June or November.</p>
          <div className="grid grid-cols-2 gap-3">
            <select
              value={examMonth}
              onChange={(e) => setExamMonth(Number(e.target.value))}
              className="h-11 rounded-md border px-4 text-sm text-ink focus:outline-none"
              style={{
                borderColor: "var(--color-border-neutral)",
                backgroundColor: "var(--color-canvas)",
              }}
              aria-label="Exam month"
            >
              {MONTHS.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
            <select
              value={examYear}
              onChange={(e) => setExamYear(Number(e.target.value))}
              className="h-11 rounded-md border px-4 text-sm text-ink focus:outline-none"
              style={{
                borderColor: "var(--color-border-neutral)",
                backgroundColor: "var(--color-canvas)",
              }}
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
          disabled={loading || !userId}
          className="h-11 w-full flex items-center justify-center rounded-md text-sm font-medium text-ink transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: "var(--color-gold-600)" }}
        >
          {loading ? "Saving…" : "Start my revision path"}
        </button>
      </form>
    </AuthLayout>
  );
}
