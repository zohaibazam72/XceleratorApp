import type { PatternStatus } from "@/types/database";

interface Props {
  status: PatternStatus | "remaining";
  count: number;
}

const config: Record<
  PatternStatus | "remaining",
  { label: string; iconColour: string; icon: React.ReactNode }
> = {
  secured: {
    label: "Secured",
    iconColour: "var(--color-success-600)",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  in_progress: {
    label: "In progress",
    iconColour: "var(--color-amber-600)",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 5v3.5l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  needs_practice: {
    label: "Needs practice",
    iconColour: "var(--color-coral-600)",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 5v4M8 10.5v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  not_started: {
    label: "Not started",
    iconColour: "var(--color-ink-muted)",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
      </svg>
    ),
  },
  remaining: {
    label: "Remaining",
    iconColour: "var(--color-ink-muted)",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
      </svg>
    ),
  },
};

export default function MetricCard({ status, count }: Props) {
  const { label, iconColour, icon } = config[status];

  return (
    <div className="flex flex-col gap-sm rounded-lg bg-teal-100 p-md">
      <div className="flex items-center gap-xs" style={{ color: iconColour }}>
        {icon}
        <span className="text-small text-ink-muted">{label}</span>
      </div>
      <span
        className="font-medium leading-none"
        style={{ fontSize: "var(--text-display)" }}
      >
        {count}
      </span>
    </div>
  );
}
