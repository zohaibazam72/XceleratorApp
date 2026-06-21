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

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: "44px",
  padding: "0 16px",
  borderRadius: "8px",
  border: "1px solid #E4DFD2",
  fontSize: "15px",
  backgroundColor: "#FAF6EC",
  color: "#1A1A1A",
  boxSizing: "border-box",
  outline: "none",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: "auto",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  height: "44px",
  backgroundColor: "#D9A441",
  color: "#FFFFFF",
  borderRadius: "8px",
  fontWeight: 500,
  fontSize: "14px",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

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

    const { error } = await browserSupabase.from("student_profiles").upsert(
      {
        user_id: userId,
        name: name.trim(),
        target_grade: targetGrade,
        exam_month: examMonth,
        exam_year: examYear,
        exam_board: "AQA",
        paper_tier: "Higher",
      },
      { onConflict: "user_id" }
    );

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Allow session cookie to propagate to the server before navigating
    await new Promise((resolve) => setTimeout(resolve, 500));
    router.push("/");
    router.refresh();
  }

  return (
    <AuthLayout>
      <div>
        <h1 style={{ fontWeight: 600, fontSize: "18px", color: "#1A1A1A", margin: 0 }}>Set up your profile</h1>
        <p style={{ fontSize: "14px", color: "#6B6455", marginTop: "4px" }}>This shapes your entire revision path.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "14px", fontWeight: 500, color: "#1A1A1A" }} htmlFor="name">Your first name</label>
          <input
            id="name"
            type="text"
            autoComplete="given-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            placeholder="e.g. Alex"
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "14px", fontWeight: 500, color: "#1A1A1A" }} htmlFor="targetGrade">Target grade</label>
          <p style={{ fontSize: "13px", color: "#6B6455", margin: 0 }}>This determines which patterns are in scope for you.</p>
          <select
            id="targetGrade"
            value={targetGrade}
            onChange={(e) => setTargetGrade(Number(e.target.value))}
            style={selectStyle}
          >
            {GRADES.map((g) => (
              <option key={g} value={g}>
                Grade {g}{g === 7 ? " (recommended starting point)" : ""}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "14px", fontWeight: 500, color: "#1A1A1A" }}>Exam date</label>
          <p style={{ fontSize: "13px", color: "#6B6455", margin: 0 }}>AQA Higher exams sit in May/June or November.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <select
              value={examMonth}
              onChange={(e) => setExamMonth(Number(e.target.value))}
              style={selectStyle}
              aria-label="Exam month"
            >
              {MONTHS.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
            <select
              value={examYear}
              onChange={(e) => setExamYear(Number(e.target.value))}
              style={selectStyle}
              aria-label="Exam year"
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <p style={{ fontSize: "14px", borderRadius: "8px", padding: "8px 12px", backgroundColor: "#FDE8E8", color: "#C0392B", margin: 0 }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !userId}
          style={{ ...buttonStyle, opacity: loading || !userId ? 0.6 : 1 }}
        >
          {loading ? "Saving…" : "Start my revision path"}
        </button>
      </form>
    </AuthLayout>
  );
}
