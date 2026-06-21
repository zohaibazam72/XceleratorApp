import { getDashboardData } from "@/lib/supabase/dashboard";
import {
  MetricCard,
  PatternHeroCard,
  PatternListRow,
  TopicPriorityBar,
  RecentActivityRow,
} from "@/components";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const {
    student,
    currentTopic,
    topicMetrics,
    currentPattern,
    upNextPattern,
    currentPatternCompletionPct,
    recentActivity,
  } = await getDashboardData();

  const firstName = student?.name?.split(" ")[0] ?? "there";
  const targetGrade = student?.target_grade ?? 7;
  const currentGrade = student?.current_grade ?? null;

  return (
    <div className="max-w-2xl mx-auto px-md py-lg flex flex-col gap-xl">

      {/* ── Greeting + streak ───────────────────────────────────────────── */}
      <section className="flex items-start justify-between gap-md">
        <div className="flex flex-col gap-xs">
          <h1 className="font-semibold text-ink" style={{ fontSize: "var(--text-h2)" }}>
            Hey, {firstName} 👋
          </h1>
          <p className="text-small text-ink-muted">Keep going — every pattern counts.</p>

          {/* Grade pills */}
          <div className="flex items-center gap-sm mt-sm flex-wrap">
            <span
              className="rounded-pill px-sm py-xs text-xs font-medium"
              style={{
                backgroundColor: "var(--color-teal-100)",
                color: "var(--color-teal-900)",
              }}
            >
              Target grade {targetGrade}
            </span>
            {currentGrade !== null && (
              <span
                className="rounded-pill px-sm py-xs text-xs font-medium"
                style={{
                  backgroundColor: "var(--color-surface-alt)",
                  color: "var(--color-ink-muted)",
                }}
              >
                Grade {currentGrade} · last confirmed mock result
              </span>
            )}
          </div>
        </div>

        {/* Streak placeholder */}
        <div
          className="shrink-0 flex flex-col items-center gap-xs rounded-lg p-md"
          style={{ backgroundColor: "var(--color-gold-100)" }}
        >
          <span className="text-2xl leading-none">🔥</span>
          <span className="text-xs font-medium text-ink-muted">Streak</span>
          <span className="font-semibold text-ink" style={{ fontSize: "var(--text-h3)" }}>
            —
          </span>
        </div>
      </section>

      {/* ── Topic clarifier ─────────────────────────────────────────────── */}
      <p className="text-small text-ink-muted -mt-sm">
        Focusing on <span className="font-medium text-ink">{currentTopic}</span> — highest mark-weight topic with patterns remaining.
      </p>

      {/* ── Topic metrics ────────────────────────────────────────────────── */}
      <section className="flex flex-col gap-md">
        <h2 className="font-semibold text-ink" style={{ fontSize: "var(--text-h3)" }}>
          Your {currentTopic} pattern metrics
        </h2>
        <div className="grid grid-cols-2 gap-sm sm:grid-cols-4">
          <MetricCard status="secured" count={topicMetrics.secured} />
          <MetricCard status="in_progress" count={topicMetrics.in_progress} />
          <MetricCard status="needs_practice" count={topicMetrics.needs_practice} />
          <MetricCard status="not_started" count={topicMetrics.not_started} />
        </div>
        <p className="text-xs text-ink-muted">
          {topicMetrics.total} {currentTopic} patterns in total
        </p>
      </section>

      {/* ── Current pattern hero card ────────────────────────────────────── */}
      {currentPattern ? (
        <PatternHeroCard
          eyebrow="NEXT PATTERN"
          patternName={currentPattern.subtopic}
          gradeLevel={currentPattern.grade_level}
          topic={currentTopic}
          frequencyPct={currentPattern.frequency_pct}
          maxMarks={currentPattern.max_marks}
          questionCount={currentPattern.total_questions}
          completionPercent={currentPatternCompletionPct}
          href={`/learn/${currentPattern.id}`}
          ctaLabel="Continue pattern"
        />
      ) : (
        <div className="rounded-lg border border-border-neutral p-lg text-center text-small text-ink-muted">
          All {currentTopic} patterns secured 🎉
        </div>
      )}

      {/* ── Up-next + quick actions ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
        {/* Up-next locked card */}
        <div className="flex flex-col gap-sm">
          <p className="text-xs font-medium tracking-widest text-ink-muted uppercase">Up next</p>
          {upNextPattern ? (
            <PatternListRow
              patternName={upNextPattern.subtopic}
              frequencyPct={upNextPattern.frequency_pct}
              maxMarks={upNextPattern.max_marks}
              status="not_started"
            />
          ) : (
            <p className="text-small text-ink-muted">No further patterns queued.</p>
          )}
        </div>

        {/* Quick actions */}
        <div className="flex flex-col gap-sm">
          <p className="text-xs font-medium tracking-widest text-ink-muted uppercase">Quick actions</p>
          <div className="flex flex-col gap-xs">
            <a
              href="/mocks"
              className="flex items-center gap-sm rounded-md border border-border-neutral px-md py-sm text-small text-ink hover:bg-surface-alt transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" />
                <path d="M5 6h6M5 8.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Take a mock paper
            </a>
            <a
              href="/pathway"
              className="flex items-center gap-sm rounded-md border border-border-neutral px-md py-sm text-small text-ink hover:bg-surface-alt transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h10M3 5h7M3 11h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              View mark pathway
            </a>
          </div>
        </div>
      </div>

      {/* ── Topic priority bar ───────────────────────────────────────────── */}
      <section className="rounded-lg border border-border-neutral bg-surface p-md">
        <TopicPriorityBar currentTopic={currentTopic} />
      </section>

      {/* ── Recent activity ──────────────────────────────────────────────── */}
      {recentActivity.length > 0 && (
        <section className="flex flex-col gap-sm">
          <h2 className="font-semibold text-ink" style={{ fontSize: "var(--text-h3)" }}>
            Recent activity
          </h2>
          <div className="rounded-lg border border-border-neutral bg-surface px-md">
            {recentActivity.map((item, i) => (
              <RecentActivityRow
                key={i}
                description={item.description}
                timestamp={item.timestamp}
                status={item.status}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
