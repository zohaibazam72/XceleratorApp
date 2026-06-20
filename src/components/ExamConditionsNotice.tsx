export default function ExamConditionsNotice() {
  return (
    <div
      className="flex gap-md rounded-lg border border-border-neutral bg-surface p-md"
      role="note"
      aria-label="Exam conditions"
    >
      <div className="shrink-0 mt-xs">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <circle cx="9" cy="9" r="8" stroke="var(--color-ink-muted)" strokeWidth="1.5" />
          <path d="M9 5v5M9 12v1" stroke="var(--color-ink-muted)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex flex-col gap-xs">
        <p
          className="font-medium text-ink"
          style={{ fontSize: "var(--text-small)" }}
        >
          Exam conditions
        </p>
        <ul className="text-small text-ink-muted space-y-xs list-none">
          <li>Timed — complete the paper in one sitting.</li>
          <li>No pausing once started.</li>
          <li>No hints or worked solutions during the mock.</li>
        </ul>
      </div>
    </div>
  );
}
