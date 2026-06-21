import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getLearnData } from "@/lib/supabase/learn";
import PatternStepper from "@/components/PatternStepper";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ patternId: string }>;
}

export default async function LearnPage({ params }: Props) {
  const { patternId } = await params;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/signin");

  const learnData = await getLearnData(patternId, supabase);
  if (!learnData) notFound();

  const { pattern } = learnData!;

  return (
    <div className="max-w-2xl mx-auto px-md py-lg flex flex-col gap-lg">

      {/* ── Back link ──────────────────────────────────────────────────────── */}
      <Link
        href="/"
        className="flex items-center gap-xs text-small text-ink-muted hover:text-ink transition-colors w-fit"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {pattern.topic} · grade {pattern.grade_level} · appears in {pattern.aqa_frequency_pct}% of papers
      </Link>

      {/* ── Pattern stepper ─────────────────────────────────────────────────── */}
      <PatternStepper current="learn" />

      {/* ── Pattern title ───────────────────────────────────────────────────── */}
      <h1
        className="font-semibold text-ink"
        style={{ fontSize: "var(--text-h1)" }}
      >
        {pattern.subtopic}
      </h1>

      {/* ── Concept explanation ─────────────────────────────────────────────── */}
      {pattern.learn_explanation ? (
        <div
          className="text-body text-ink leading-relaxed"
          style={{ fontSize: "var(--text-body)" }}
        >
          {pattern.learn_explanation}
        </div>
      ) : (
        <div
          className="rounded-lg border border-border-neutral p-md"
          style={{ backgroundColor: "var(--color-surface)" }}
        >
          <p className="text-small text-ink-muted italic">
            Concept explanation coming soon — content is being authored for this pattern.
          </p>
        </div>
      )}

      {/* ── Exam callout ────────────────────────────────────────────────────── */}
      {pattern.learn_exam_callout ? (
        <div
          className="rounded-lg p-md flex flex-col gap-sm"
          style={{ backgroundColor: "var(--color-teal-100)" }}
        >
          <div className="flex items-center gap-sm">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path
                d="M7 1.5L1.5 12.5h11L7 1.5z"
                stroke="var(--color-teal-900)"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
              <path d="M7 6v3M7 10.5v.5" stroke="var(--color-teal-900)" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <span
              className="font-medium tracking-widest uppercase"
              style={{ fontSize: "var(--text-xs)", color: "var(--color-teal-900)" }}
            >
              How this shows up in the exam
            </span>
          </div>
          <p
            className="text-body"
            style={{ fontSize: "var(--text-body)", color: "var(--color-teal-900)" }}
          >
            {pattern.learn_exam_callout}
          </p>
        </div>
      ) : (
        <div
          className="rounded-lg p-md flex flex-col gap-sm"
          style={{ backgroundColor: "var(--color-teal-100)" }}
        >
          <div className="flex items-center gap-sm">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path
                d="M7 1.5L1.5 12.5h11L7 1.5z"
                stroke="var(--color-teal-900)"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
              <path d="M7 6v3M7 10.5v.5" stroke="var(--color-teal-900)" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <span
              className="font-medium tracking-widest uppercase"
              style={{ fontSize: "var(--text-xs)", color: "var(--color-teal-900)" }}
            >
              How this shows up in the exam
            </span>
          </div>
          <p
            className="text-small italic"
            style={{ color: "var(--color-teal-900)", opacity: 0.6 }}
          >
            Exam wording callout coming soon.
          </p>
        </div>
      )}

      {/* ── Common mistake ──────────────────────────────────────────────────── */}
      {pattern.learn_common_mistake ? (
        <div
          className="rounded-lg p-md flex gap-sm items-start"
          style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border-neutral)" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5" aria-hidden>
            <circle cx="8" cy="8" r="6.5" stroke="var(--color-amber-600)" strokeWidth="1.3" />
            <path d="M8 5v4M8 10.5v.5" stroke="var(--color-amber-600)" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <p
            className="text-body"
            style={{ fontSize: "var(--text-body)", color: "var(--color-ink)" }}
          >
            {pattern.learn_common_mistake}
          </p>
        </div>
      ) : (
        <div
          className="rounded-lg p-md flex gap-sm items-start"
          style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border-neutral)" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5" aria-hidden>
            <circle cx="8" cy="8" r="6.5" stroke="var(--color-amber-600)" strokeWidth="1.3" />
            <path d="M8 5v4M8 10.5v.5" stroke="var(--color-amber-600)" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <p
            className="text-small italic"
            style={{ color: "var(--color-ink-muted)" }}
          >
            Common mistake note coming soon.
          </p>
        </div>
      )}

      {/* ── CTAs ────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-sm pt-sm">
        <Link
          href={`/worked-examples/${patternId}`}
          className="w-full flex items-center justify-center gap-sm rounded-md py-md text-body font-medium text-white transition-opacity hover:opacity-90"
          style={{
            backgroundColor: "var(--color-gold-600)",
            fontSize: "var(--text-body)",
          }}
        >
          Continue to worked examples →
        </Link>
        <Link
          href={`/exam-questions/${patternId}`}
          className="text-center text-small text-ink-muted underline underline-offset-2 hover:text-ink transition-colors py-sm"
          style={{ fontSize: "var(--text-small)" }}
        >
          Already confident? Skip to exam questions ↗
        </Link>
      </div>

    </div>
  );
}
