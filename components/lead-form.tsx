"use client";

import { useState } from "react";
import Link from "next/link";

const serif = "var(--font-fraunces), Georgia, serif";
const sans = "var(--font-inter), system-ui, sans-serif";

/**
 * Lead-magnet email capture (right-hand navy panel of /checklist).
 * Posts to /api/lead, which is stub-safe: it stores to Supabase when
 * configured, otherwise just logs — the UX works either way.
 */
export function LeadForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState("");

  async function submit() {
    if (!/.+@.+\..+/.test(email)) {
      setError(true);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "checklist" }),
      });
      if (res.ok) {
        setSubmitted(email);
        setSent(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(true);
        if (data?.error) console.warn(data.error);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div>
        <p style={{ fontFamily: serif, fontSize: 40, color: "#7FA081", marginBottom: 18 }} aria-hidden="true">✓</p>
        <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 30, color: "#F6F1E7", lineHeight: 1.15, marginBottom: 14 }}>
          Check your inbox.
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: "#CBD3E0", maxWidth: "34ch", marginBottom: 30 }}>
          Your checklist is on its way to <strong style={{ color: "#F6F1E7" }}>{submitted}</strong>. If it’s not
          there in a minute, peek in spam.
        </p>
        <Link
          href="/"
          style={{ display: "inline-block", fontFamily: sans, fontSize: 15, fontWeight: 600, color: "#243A5E", background: "#F3EFE7", textDecoration: "none", padding: "14px 26px", borderRadius: 11 }}
        >
          See the full workbook →
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 28, color: "#F6F1E7", lineHeight: 1.18, marginBottom: 10 }}>
        Where should we send it?
      </h2>
      <p style={{ fontSize: 15, lineHeight: 1.55, color: "#9DB0CE", marginBottom: 26 }}>
        One email. The checklist, then occasional notes — unsubscribe anytime.
      </p>
      <label htmlFor="lead-email" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#9DB0CE", letterSpacing: "0.04em", marginBottom: 8 }}>
        Email address
      </label>
      <input
        id="lead-email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit();
        }}
        placeholder="you@example.com"
        aria-invalid={error}
        style={{ width: "100%", fontFamily: sans, fontSize: 16, color: "#1F2A3D", background: "#F6F1E7", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 11, padding: "15px 16px", marginBottom: 8, outline: "none" }}
      />
      {error && (
        <p role="alert" style={{ fontSize: 13, color: "#E7A98A", marginBottom: 8 }}>
          Please enter a valid email address.
        </p>
      )}
      <button
        type="button"
        onClick={submit}
        disabled={loading}
        aria-busy={loading}
        style={{ width: "100%", fontFamily: sans, fontSize: 17, fontWeight: 600, color: "#243A5E", background: "#F3EFE7", border: "none", padding: 16, borderRadius: 11, cursor: "pointer", marginTop: 12 }}
      >
        {loading ? "Sending…" : "Send me the free checklist"}
      </button>
      <p style={{ fontSize: 12.5, lineHeight: 1.5, color: "#7E8DA6", marginTop: 16 }}>
        We store your email to send the checklist and won’t sell it.
      </p>
    </div>
  );
}
