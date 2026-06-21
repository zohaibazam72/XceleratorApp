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

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await browserSupabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.session) {
      router.push("/onboarding");
      router.refresh();
    } else {
      setEmailSent(true);
      setLoading(false);
    }
  }

  if (emailSent) {
    return (
      <AuthLayout>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", textAlign: "center", padding: "16px 0" }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
            <circle cx="20" cy="20" r="19" stroke="#0D7377" strokeWidth="1.5" />
            <path d="M12 21l5 5 11-11" stroke="#0D7377" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div>
            <h1 style={{ fontWeight: 600, fontSize: "18px", color: "#1A1A1A", margin: 0 }}>Check your email</h1>
            <p style={{ fontSize: "14px", color: "#6B6455", marginTop: "8px" }}>
              We sent a confirmation link to{" "}
              <span style={{ fontWeight: 500, color: "#1A1A1A" }}>{email}</span>. Click it to activate your account, then come back to sign in.
            </p>
          </div>
          <Link href="/signin" style={{ fontSize: "14px", fontWeight: 500, color: "#0D7377", textDecoration: "none" }}>
            Back to sign in
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div>
        <h1 style={{ fontWeight: 600, fontSize: "18px", color: "#1A1A1A", margin: 0 }}>Create account</h1>
        <p style={{ fontSize: "14px", color: "#6B6455", marginTop: "4px" }}>Start building your grade today.</p>
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
            autoComplete="new-password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            placeholder="At least 6 characters"
          />
        </div>

        {error && (
          <p style={{ fontSize: "14px", borderRadius: "8px", padding: "8px 12px", backgroundColor: "#FDE8E8", color: "#C0392B", margin: 0 }}>
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} style={{ ...buttonStyle, opacity: loading ? 0.6 : 1 }}>
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p style={{ textAlign: "center", fontSize: "14px", color: "#6B6455" }}>
        Already have an account?{" "}
        <Link href="/signin" style={{ fontWeight: 500, color: "#0D7377", textDecoration: "none" }}>
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
