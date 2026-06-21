"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  /** 0–100 */
  percent: number;
  /** Diameter in px */
  size?: number;
  strokeWidth?: number;
  /** Animate the ring filling from 0 to percent on mount */
  animate?: boolean;
  /** Show the percentage as text in the centre of the ring */
  showLabel?: boolean;
}

export default function CompletionRing({
  percent,
  size = 48,
  strokeWidth = 3,
  animate = false,
  showLabel = false,
}: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const [displayed, setDisplayed] = useState(animate ? 0 : percent);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!animate) {
      setDisplayed(percent);
      return;
    }
    const start = performance.now();
    const duration = 800;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(eased * percent);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [animate, percent]);

  const offset = circumference - (displayed / 100) * circumference;
  const cx = size / 2;
  const cy = size / 2;
  const isComplete = percent === 100;
  const arcColour = isComplete
    ? "var(--color-success-600)"
    : "var(--color-teal-600)";

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-label={`${Math.round(percent)}% complete`}
      role="img"
      className="shrink-0"
    >
      {/* Track */}
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke="var(--color-border-neutral)"
        strokeWidth={strokeWidth}
      />
      {/* Progress arc */}
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke={arcColour}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${cx} ${cy})`}
      />
      {/* Centre label */}
      {showLabel && (
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={size * 0.22}
          fontWeight={500}
          fill={isComplete ? "var(--color-success-600)" : "var(--color-ink)"}
        >
          {Math.round(displayed)}%
        </text>
      )}
    </svg>
  );
}
