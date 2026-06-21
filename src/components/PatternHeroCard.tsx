import Link from "next/link";
import CompletionRing from "./CompletionRing";

interface Props {
  /** Optional eyebrow label shown at top of card, e.g. "NEXT PATTERN" */
  eyebrow?: string;
  patternName: string;
  gradeLevel: number;
  /** Topic shown as a category tag, e.g. "Algebra" */
  topic: string;
  frequencyPct: number;
  maxMarks?: number | null;
  questionCount: number;
  completionPercent: number;
  /** Where the CTA navigates to */
  href: string;
  ctaLabel?: string;
  highFrequency?: boolean;
}

export default function PatternHeroCard({
  eyebrow,
  patternName,
  gradeLevel,
  topic,
  frequencyPct,
  maxMarks,
  questionCount,
  completionPercent,
  href,
  ctaLabel = "Continue pattern",
  highFrequency = frequencyPct >= 70,
}: Props) {
  return (
    <div className="rounded-lg border border-border-neutral bg-surface p-lg flex flex-col gap-md">
      {/* Eyebrow */}
      {eyebrow && (
        <p className="text-xs font-medium tracking-widest text-ink-muted uppercase">
          {eyebrow}
        </p>
      )}

      {/* Title row + completion ring */}
      <div className="flex items-start justify-between gap-md">
        <div className="flex flex-col gap-sm flex-1 min-w-0">
          {/* Title with inline grade */}
          <h3 className="font-medium text-ink leading-snug" style={{ fontSize: "var(--text-h3)" }}>
            {patternName}
            <span className="font-normal text-ink-muted"> · grade {gradeLevel}</span>
          </h3>

          {/* Category + frequency tags */}
          <div className="flex flex-wrap gap-xs">
            <span className="rounded-pill bg-teal-100 px-sm py-xs text-xs font-medium text-teal-900">
              {topic}
            </span>
            {highFrequency && (
              <span className="rounded-pill bg-gold-100 px-sm py-xs text-xs font-medium text-ink">
                High frequency
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="flex flex-col gap-xs">
            <div className="flex items-center gap-xs text-small text-ink-muted">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
                <path d="M7 4v3.5l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span>Comes up in {frequencyPct}% of AQA Higher papers</span>
            </div>
            <div className="flex items-center gap-md text-small text-ink-muted">
              {maxMarks != null && (
                <div className="flex items-center gap-xs">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <rect x="2" y="3" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M5 6.5h4M5 8.5h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span>{maxMarks} marks</span>
                </div>
              )}
              <div className="flex items-center gap-xs">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <rect x="2" y="2" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M5 5h4M5 7h4M5 9h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <span>{questionCount} questions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Completion ring — top right */}
        <CompletionRing
          percent={completionPercent}
          size={52}
          strokeWidth={3.5}
          showLabel
        />
      </div>

      {/* Full-width CTA */}
      <Link
        href={href}
        className="flex w-full items-center justify-center gap-sm rounded-md py-sm text-small font-medium text-ink transition-opacity hover:opacity-90 active:opacity-80"
        style={{ backgroundColor: "var(--color-gold-600)" }}
      >
        {ctaLabel}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </div>
  );
}
