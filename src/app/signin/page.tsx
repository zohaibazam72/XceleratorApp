"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { browserSupabase } from "@/lib/supabase/browser";
import AuthLayout from "@/components/AuthLayout";

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: "44px",
  padding: "0 16px",
  borderRadius: "8px",
  border: "1px solid #E4DFD2",
  fontSize: "15px",
  backgroundColor: "#FAF6EC",
  color: "#1A1A1A",
  boxSizing: "border-box",
  outline: "none",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  height: "44px",
  backgroundColor: "#D9A441",
  color: "#FFFFFF",
  borderRadius: "8px",
  fontWeight: 500,
  fontSize: "14px",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await browserSupabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <AuthLayout>
      <div>
        <h1 style={{ fontWeight: 600, fontSize: "18px", color: "#1A1A1A", margin: 0 }}>Sign in</h1>
        <p style={{ fontSize: "14px", color: "#6B6455", marginTop: "4px" }}>Welcome back. Let&apos;s keep moving.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "14px", fontWeight: 500, color: "#1A1A1A" }} htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            placeholder="you@example.com"
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "14px", fontWeight: 500, color: "#1A1A1A" }} htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            placeholder="••••••••"
          />
        </div>

        {error && (
          <p style={{ fontSize: "14px", borderRadius: "8px", padding: "8px 12px", backgroundColor: "#FDE8E8", color: "#C0392B", margin: 0 }}>
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} style={{ ...buttonStyle, opacity: loading ? 0.6 : 1 }}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p style={{ textAlign: "center", fontSize: "14px", color: "#6B6455" }}>
        No account?{" "}
        <Link href="/signup" style={{ fontWeight: 500, color: "#0D7377", textDecoration: "none" }}>
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}
