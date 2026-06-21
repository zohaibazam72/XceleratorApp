"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import NavLinks from "./NavLinks";
import { browserSupabase } from "@/lib/supabase/browser";

// Routes where the sidebar and bottom nav should not appear
const NO_SHELL = ["/signin", "/signup", "/onboarding"];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = NO_SHELL.some((p) => pathname.startsWith(p));

  async function handleSignOut() {
    await browserSupabase.auth.signOut();
    router.push("/signin");
    router.refresh();
  }

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar — desktop */}
      <aside
        className="hidden md:flex flex-col w-56 shrink-0 fixed inset-y-0 left-0 z-30"
        style={{ backgroundColor: "var(--color-teal-900)" }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-sm px-lg py-lg border-b"
          style={{ borderColor: "var(--color-teal-800)" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="2" y="2" width="20" height="20" rx="5" fill="var(--color-gold-600)" />
            <path d="M7 12l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <Link
            href="/"
            className="font-semibold text-white"
            style={{ fontSize: "var(--text-body)" }}
          >
            Xcelerator
          </Link>
        </div>

        {/* Nav links */}
        <div className="flex-1 overflow-y-auto px-sm py-md">
          <NavLinks variant="sidebar" />
        </div>

        {/* Sign out */}
        <div
          className="px-sm py-md border-t"
          style={{ borderColor: "var(--color-teal-800)" }}
        >
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-sm rounded-md px-md py-sm text-small font-medium text-teal-200 hover:bg-teal-800 hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3M11 11l3-3-3-3M14 8H6"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-56 pb-16 md:pb-0 min-w-0">
        {children}
      </main>

      {/* Bottom nav — mobile */}
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-30 flex items-center justify-around border-t"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border-neutral)",
        }}
      >
        <NavLinks variant="bottom" />
      </nav>
    </div>
  );
}
