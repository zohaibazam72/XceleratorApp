import type { Metadata } from "next";
import "./globals.css";
import NavLinks from "@/components/NavLinks";

export const metadata: Metadata = {
  title: "Xcelerator",
  description: "GCSE Maths revision — master the patterns that move your grade.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-canvas">
        <div className="flex min-h-screen">
          {/* Sidebar — desktop only */}
          <aside
            className="hidden md:flex flex-col w-56 shrink-0 fixed inset-y-0 left-0 z-30"
            style={{ backgroundColor: "var(--color-teal-900)" }}
          >
            {/* Logo */}
            <div className="flex items-center gap-sm px-lg py-lg border-b" style={{ borderColor: "var(--color-teal-800)" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="2" y="2" width="20" height="20" rx="5" fill="var(--color-gold-600)" />
                <path d="M7 12l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-semibold text-white" style={{ fontSize: "var(--text-body)" }}>
                Xcelerator
              </span>
            </div>

            {/* Nav */}
            <div className="flex-1 overflow-y-auto px-sm py-md">
              <NavLinks variant="sidebar" />
            </div>
          </aside>

          {/* Main content — offset for sidebar on desktop */}
          <main className="flex-1 md:ml-56 pb-16 md:pb-0 min-w-0">
            {children}
          </main>
        </div>

        {/* Bottom nav — mobile only */}
        <nav
          className="md:hidden fixed bottom-0 inset-x-0 z-30 flex items-center justify-around border-t"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border-neutral)",
          }}
        >
          <NavLinks variant="bottom" />
        </nav>
      </body>
    </html>
  );
}
