interface DataPoint {
  date: string;
  estimatedGrade: number;
  label?: string;
}

interface Props {
  dataPoints: DataPoint[];
  targetGrade: number;
  height?: number;
}

const GRADE_MIN = 4;
const GRADE_MAX = 9;
const GRADE_RANGE = GRADE_MAX - GRADE_MIN;

function gradeToY(grade: number, chartHeight: number): number {
  return chartHeight - ((grade - GRADE_MIN) / GRADE_RANGE) * chartHeight;
}

export default function GradeTrajectoryChart({
  dataPoints,
  targetGrade,
  height = 160,
}: Props) {
  const paddingLeft = 32;
  const paddingRight = 16;
  const paddingTop = 16;
  const paddingBottom = 24;
  const chartH = height - paddingTop - paddingBottom;

  const grades = [4, 5, 6, 7, 8, 9];
  const barWidth = 24;
  const barGap = 16;
  const totalBars = dataPoints.length;
  const chartW = Math.max(totalBars * (barWidth + barGap) + barGap, 200);
  const totalW = chartW + paddingLeft + paddingRight;

  const targetY = gradeToY(targetGrade, chartH) + paddingTop;

  return (
    <div className="w-full overflow-x-auto">
      <svg
        width={totalW}
        height={height}
        viewBox={`0 0 ${totalW} ${height}`}
        aria-label={`Grade trajectory chart. Target grade ${targetGrade}.`}
        role="img"
      >
        {grades.map((g) => {
          const y = gradeToY(g, chartH) + paddingTop;
          return (
            <g key={g}>
              <text x={paddingLeft - 6} y={y + 4} textAnchor="end" fontSize={10} fill="var(--color-ink-muted)">
                {g}
              </text>
              <line x1={paddingLeft} y1={y} x2={totalW - paddingRight} y2={y} stroke="var(--color-border-neutral)" strokeWidth={0.5} />
            </g>
          );
        })}

        <line
          x1={paddingLeft} y1={targetY}
          x2={totalW - paddingRight} y2={targetY}
          stroke="var(--color-teal-600)" strokeWidth={1.5} strokeDasharray="4 3"
        />
        <text x={totalW - paddingRight - 2} y={targetY - 4} textAnchor="end" fontSize={9} fill="var(--color-teal-600)">
          Target
        </text>

        {dataPoints.map((point, i) => {
          const barX = paddingLeft + barGap + i * (barWidth + barGap);
          const barTopY = gradeToY(point.estimatedGrade, chartH) + paddingTop;
          const barH = Math.max(chartH + paddingTop - barTopY, 2);
          const isAboveTarget = point.estimatedGrade >= targetGrade;
          return (
            <g key={i}>
              <rect x={barX} y={barTopY} width={barWidth} height={barH} rx={3}
                fill={isAboveTarget ? "var(--color-success-600)" : "var(--color-teal-100)"}
              />
              <text x={barX + barWidth / 2} y={barTopY - 4} textAnchor="middle" fontSize={10} fontWeight={500} fill="var(--color-ink)">
                {point.estimatedGrade}
              </text>
              {point.label && (
                <text x={barX + barWidth / 2} y={height - 4} textAnchor="middle" fontSize={9} fill="var(--color-ink-muted)">
                  {point.label}
                </text>
              )}
            </g>
          );
        })}

        {dataPoints.length === 0 && (
          <text x={totalW / 2} y={height / 2} textAnchor="middle" fontSize={12} fill="var(--color-ink-muted)">
            No mock results yet
          </text>
        )}
      </svg>
    </div>
  );
}
