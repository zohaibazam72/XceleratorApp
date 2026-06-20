"use client";

import type { PatternStatus } from "@/types/database";
import StatusBadge from "./StatusBadge";

interface Props {
  patternName: string;
  frequencyPct: number;
  maxMarks: number | null;
  status: PatternStatus;
  justSecured?: boolean;
  onClick?: () => void;
}

function StatusIcon({ status }: { status: PatternStatus }) {
  if (status === "secured") {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <circle cx="9" cy="9" r="8" stroke="var(--color-success-600)" strokeWidth="1.5" />
        <path d="M6 9l2 2 4-4" stroke="var(--color-success-600)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (status === "in_progress") {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <circle cx="9" cy="9" r="8" stroke="var(--color-amber-600)" strokeWidth="1.5" />
        <path d="M9 6v3.5l2 2" stroke="var(--color-amber-600)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (status === "needs_practice") {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <circle cx="9" cy="9" r="8" stroke="var(--color-coral-600)" strokeWidth="1.5" />
        <path d="M9 6v4M9 11.5v1" stroke="var(--color-coral-600)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="8" stroke="var(--color-border-neutral)" strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
  );
}

export default function PatternListRow({
  patternName,
  frequencyPct,
  maxMarks,
  status,
  justSecured = false,
  onClick,
}: Props) {
  const isNotStarted = status === "not_started";

  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-md rounded-md px-md py-sm text-left transition-colors hover:bg-teal-100
        ${justSecured ? "bg-teal-100" : ""}
        ${isNotStarted ? "opacity-50" : ""}
      `}
    >
      <div className="shrink-0">
        <StatusIcon status={status} />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="font-medium text-ink leading-snug truncate"
          style={{ fontSize: "var(--text-body)" }}
        >
          {patternName}
        </p>
        <p className="text-xs text-ink-muted mt-xs">
          Comes up in {frequencyPct}% of AQA Higher papers
          {maxMarks !== null && ` · ${maxMarks} marks`}
        </p>
      </div>
      <div className="shrink-0">
        <StatusBadge status={status} />
      </div>
    </button>
  );
}
