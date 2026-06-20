"use client";

import CompletionRing from "./CompletionRing";

interface Props {
  patternName: string;
  gradeLevel: number;
  topic: string;
  frequencyPct: number;
  maxMarks: number | null;
  questionCount: number;
  completionPercent: number;
  ctaLabel?: string;
  onCta: () => void;
  highFrequency?: boolean;
}

export default function PatternHeroCard({
  patternName,
  gradeLevel,
  topic,
  frequencyPct,
  maxMarks,
  questionCount,
  completionPercent,
  ctaLabel = "Continue pattern",
  onCta,
  highFrequency = frequencyPct >= 70,
}: Props) {
  return (
    <div className="rounded-lg border border-border-neutral bg-surface p-lg flex flex-col gap-md">
      <div className="flex items-start justify-between gap-md">
        <div className="flex flex-col gap-xs">
          <h3
            className="font-medium text-ink leading-snug"
            style={{ fontSize: "var(--text-h3)" }}
          >
            {patternName}
          </h3>
          <span className="text-small text-ink-muted">{topic}</span>
        </div>
        <span className="shrink-0 rounded-pill bg-teal-100 px-sm py-xs text-xs font-medium text-teal-900">
          Grade {gradeLevel}
        </span>
      </div>

      <div className="flex flex-wrap gap-xs">
        {highFrequency && (
          <span className="rounded-pill bg-gold-100 px-sm py-xs text-xs font-medium text-ink">
            High frequency
          </span>
        )}
        <span className="rounded-pill bg-teal-100 px-sm py-xs text-xs text-ink-muted">
          Comes up in {frequencyPct}% of AQA Higher papers
        </span>
      </div>

      <div className="flex items-center gap-md text-small text-ink-muted">
        {maxMarks !== null && <span>{maxMarks} marks available</span>}
        <span>{questionCount} questions</span>
      </div>

      <div className="flex items-center justify-between gap-md pt-xs border-t border-border-neutral">
        <div className="flex items-center gap-sm">
          <CompletionRing percent={completionPercent} size={40} strokeWidth={3} />
          <span className="text-small text-ink-muted">
            {Math.round(completionPercent)}% complete
          </span>
        </div>
        <button
          onClick={onCta}
          className="rounded-md px-lg py-sm text-small font-medium text-ink transition-opacity hover:opacity-90 active:opacity-80"
          style={{ backgroundColor: "var(--color-gold-600)" }}
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}
