export type PatternStep = "learn" | "worked_examples" | "exam_questions";

interface Props {
  current: PatternStep;
  /** Pass allComplete when all steps are done (Pattern Secured screen) */
  allComplete?: boolean;
}

const STEPS: { key: PatternStep; label: string }[] = [
  { key: "learn", label: "Learn" },
  { key: "worked_examples", label: "Worked examples" },
  { key: "exam_questions", label: "Exam questions" },
];

const ORDER: Record<PatternStep, number> = {
  learn: 0,
  worked_examples: 1,
  exam_questions: 2,
};

export default function PatternStepper({ current, allComplete = false }: Props) {
  const currentIndex = ORDER[current];

  return (
    <div className="flex items-center gap-0 w-full">
      {STEPS.map((step, i) => {
        const isDone = allComplete || i < currentIndex;
        const isActive = !allComplete && i === currentIndex;
        const isUpcoming = !allComplete && i > currentIndex;

        return (
          <div key={step.key} className="flex items-center flex-1 min-w-0">
            <div className="flex-1 flex flex-col items-center gap-xs">
              <div
                className={`h-1 w-full rounded-pill transition-colors ${
                  isDone
                    ? "bg-success-600"
                    : isActive
                    ? "bg-teal-900"
                    : "bg-border-neutral"
                }`}
              />
              <div className="flex items-center gap-xs">
                {isDone && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="shrink-0"
                    aria-hidden
                  >
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="var(--color-success-600)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                <span
                  className={`text-xs whitespace-nowrap ${
                    isDone
                      ? "text-success-600 font-medium"
                      : isActive
                      ? "text-teal-900 font-medium"
                      : isUpcoming
                      ? "text-ink-muted"
                      : "text-ink-muted"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            </div>
            {i < STEPS.length - 1 && (
              <div className="w-md shrink-0 flex items-start pt-0.5">
                <div className="w-full h-px bg-border-neutral" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
