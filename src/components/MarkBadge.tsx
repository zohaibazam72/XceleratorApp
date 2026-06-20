interface Props {
  /** Real mark-scheme code, e.g. "M1", "A1", "B1". Never a generic label. */
  code: string;
}

function getMarkClass(code: string): string {
  const prefix = code.charAt(0).toUpperCase();
  if (prefix === "M") {
    return "bg-teal-100 text-teal-600";
  }
  return "bg-success-100 text-success-600";
}

export default function MarkBadge({ code }: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-pill px-sm py-xs text-xs font-medium ${getMarkClass(code)}`}
    >
      {code}
    </span>
  );
}
