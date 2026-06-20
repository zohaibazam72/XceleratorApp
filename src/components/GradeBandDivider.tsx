interface Props {
  grade: number;
}

export default function GradeBandDivider({ grade }: Props) {
  return (
    <div className="flex items-center gap-md py-sm">
      <span className="text-xs font-medium tracking-widest text-ink-muted uppercase whitespace-nowrap">
        Grade {grade}
      </span>
      <div className="flex-1 h-px bg-border-neutral" />
    </div>
  );
}
