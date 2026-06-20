import type { PatternStatus } from "@/types/database";

interface Props {
  description: string;
  /** ISO timestamp string */
  timestamp: string;
  status?: PatternStatus;
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function ActivityIcon({ status }: { status?: PatternStatus }) {
  if (status === "secured") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="7" stroke="var(--color-success-600)" strokeWidth="1.5" />
        <path d="M5 8l2 2 4-4" stroke="var(--color-success-600)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (status === "in_progress") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="7" stroke="var(--color-amber-600)" strokeWidth="1.5" />
        <path d="M8 5v3.5l2 2" stroke="var(--color-amber-600)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="3" fill="var(--color-border-neutral)" />
    </svg>
  );
}

export default function RecentActivityRow({ description, timestamp, status }: Props) {
  return (
    <div className="flex items-center gap-md py-sm border-b border-border-neutral last:border-b-0">
      <div className="shrink-0">
        <ActivityIcon status={status} />
      </div>
      <p className="flex-1 text-small text-ink leading-snug">{description}</p>
      <time dateTime={timestamp} className="shrink-0 text-xs text-ink-muted">
        {relativeTime(timestamp)}
      </time>
    </div>
  );
}
