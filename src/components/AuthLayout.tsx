interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4 py-12"
      style={{ backgroundColor: "var(--color-canvas)" }}
    >
      <div
        className="w-full max-w-md rounded-lg border p-8 flex flex-col gap-6"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border-neutral)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="2" y="2" width="20" height="20" rx="5" fill="var(--color-gold-600)" />
            <path d="M7 12l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-semibold text-ink" style={{ fontSize: "var(--text-h3)" }}>
            Xcelerator
          </span>
        </div>

        {children}
      </div>
    </div>
  );
}
