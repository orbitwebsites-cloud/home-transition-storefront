"use client";

import { useState } from "react";

/**
 * Success-page download button. Mirrors the design's loading copy.
 * TODO(fulfillment): replace the simulated delay with a real, short-lived
 * signed download URL issued only after a webhook-confirmed payment.
 */
export function DownloadButton() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 1600);
        }}
        disabled={loading}
        aria-busy={loading}
        style={{
          width: "100%",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: 17,
          fontWeight: 600,
          color: "#F8F5EF",
          background: "#243A5E",
          border: "none",
          padding: 17,
          borderRadius: 12,
          cursor: "pointer",
        }}
      >
        {loading
          ? "Preparing your secure link…"
          : "Download your workbook (PDF)"}
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14 }}>
        <span style={{ fontSize: 13, color: "#8A887F" }} aria-hidden="true">
          🔒
        </span>
        <p style={{ fontSize: 12.5, lineHeight: 1.5, color: "#8A887F" }}>
          {loading
            ? "Generating a one-time signed URL that expires in 15 minutes."
            : "Private, signed link — expires 15 minutes after you click, tied to your verified purchase."}
        </p>
      </div>
    </>
  );
}
