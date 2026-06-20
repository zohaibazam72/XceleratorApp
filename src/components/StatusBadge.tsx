import type { PatternStatus } from "@/types/database";

interface Props {
  status: PatternStatus;
}

const config: Record<PatternStatus, { label: string; className: string }> = {
  secured: {
    label: "Secured",
    className: "bg-success-100 text-success-600",
  },
  in_progress: {
    label: "In progress",
    className: "bg-amber-100 text-amber-600",
  },
  needs_practice: {
    label: "Needs practice",
    className: "bg-coral-100 text-coral-600",
  },
  not_started: {
    label: "Not started",
    className: "bg-border-neutral text-ink-muted",
  },
};

export default function StatusBadge({ status }: Props) {
  const { label, className } = config[status];
  return (
    <span
      className={`inline-flex items-center rounded-pill px-sm py-xs text-xs font-medium ${className}`}
    >
      {label}
    </span>
  );
}
