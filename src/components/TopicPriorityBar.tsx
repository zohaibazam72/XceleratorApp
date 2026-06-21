import type { Topic } from "@/types/database";

interface Props {
  currentTopic: Topic;
  onWhyClick?: () => void;
}

const SEGMENTS: { topic: Topic; label: string; pct: number; colour: string }[] = [
  { topic: "Algebra", label: "Algebra", pct: 30, colour: "var(--color-topic-algebra)" },
  { topic: "Ratio and Proportion", label: "Ratio", pct: 20, colour: "var(--color-topic-ratio)" },
  { topic: "Geometry and Measures", label: "Geometry", pct: 20, colour: "var(--color-topic-geometry)" },
  { topic: "Number", label: "Number", pct: 15, colour: "var(--color-topic-number)" },
  { topic: "Statistics and Probability", label: "Stats", pct: 15, colour: "var(--color-topic-stats)" },
];

export default function TopicPriorityBar({ currentTopic, onWhyClick }: Props) {
  return (
    <div className="flex flex-col gap-sm">
      <div className="flex items-center justify-between">
        <span className="text-small font-medium text-ink">Topic priority</span>
        {onWhyClick && (
          <button
            onClick={onWhyClick}
            className="text-xs text-teal-600 underline-offset-2 hover:underline"
          >
            (why this order?)
          </button>
        )}
      </div>

      {/* pt-6 reserves space above the bar for the "You are here" label */}
      <div className="relative pt-6">
        {SEGMENTS.map((seg, i) => {
          if (seg.topic !== currentTopic) return null;
          const leftPct = SEGMENTS.slice(0, i).reduce((acc, s) => acc + s.pct, 0);
          const midPct = leftPct + seg.pct / 2;
          return (
            <div
              key="marker"
              className="absolute top-0 flex flex-col items-center gap-px"
              style={{ left: `${midPct}%`, transform: "translateX(-50%)" }}
            >
              <span className="text-xs text-ink-muted whitespace-nowrap leading-none">You are here</span>
              <svg width="8" height="5" viewBox="0 0 8 5" fill="none" aria-hidden>
                <path d="M4 5L0 0h8L4 5z" fill="var(--color-ink-muted)" />
              </svg>
            </div>
          );
        })}

        {/* Segmented bar */}
        <div className="flex h-3 w-full overflow-hidden rounded-pill gap-px">
          {SEGMENTS.map((seg) => (
            <div
              key={seg.topic}
              title={`${seg.label} ${seg.pct}%`}
              className={`h-full transition-opacity ${
                seg.topic === currentTopic ? "opacity-100" : "opacity-50"
              }`}
              style={{ width: `${seg.pct}%`, backgroundColor: seg.colour }}
            />
          ))}
        </div>

        {/* Labels */}
        <div className="flex w-full mt-xs">
          {SEGMENTS.map((seg) => (
            <div
              key={seg.topic}
              className="flex justify-center overflow-hidden"
              style={{ width: `${seg.pct}%` }}
            >
              <span
                className={`text-xs truncate ${
                  seg.topic === currentTopic ? "text-ink font-medium" : "text-ink-muted"
                }`}
              >
                {seg.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
