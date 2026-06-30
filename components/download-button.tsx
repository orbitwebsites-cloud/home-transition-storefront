const sans = "var(--font-inter), system-ui, sans-serif";

/**
 * Real download. Links to /api/download, which re-verifies the paid Stripe
 * session and streams the PDF (Content-Disposition: attachment). No client JS
 * needed — the gated route does the work.
 */
export function DownloadButton({ sessionId }: { sessionId: string }) {
  const href = `/api/download?session_id=${encodeURIComponent(sessionId)}`;
  return (
    <>
      <a
        href={href}
        style={{
          display: "block",
          textAlign: "center",
          textDecoration: "none",
          width: "100%",
          fontFamily: sans,
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
        Download your workbook (PDF)
      </a>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14 }}>
        <span style={{ fontSize: 13, color: "#8A887F" }} aria-hidden="true">🔒</span>
        <p style={{ fontSize: 12.5, lineHeight: 1.5, color: "#8A887F" }}>
          Private download — re-checked against your verified purchase each time.
        </p>
      </div>
    </>
  );
}
