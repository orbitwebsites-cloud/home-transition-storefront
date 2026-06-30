import Link from "next/link";
import { LeadForm } from "@/components/lead-form";

const serif = "var(--font-fraunces), Georgia, serif";

const leadBullets = [
  "The five things to settle in your own head first",
  "How to pick the moment (and the words) to open with",
  "What not to say in the first five minutes",
];

export const metadata = {
  title: "Free checklist — Before You Say Anything | The Home Transition System",
  description:
    "The five things to have ready before you raise the move with your parent, so the first conversation opens a door instead of slamming one.",
};

export default function ChecklistPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 7vw", borderBottom: "1px solid rgba(36,58,94,0.10)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "baseline", gap: 10, textDecoration: "none" }}>
          <span style={{ fontFamily: serif, fontWeight: 600, fontSize: 22, color: "#243A5E" }}>The Home Transition</span>
          <span style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "#9A887F", fontWeight: 600 }}>System</span>
        </Link>
        <Link href="/" style={{ fontSize: 14, fontWeight: 500, color: "#5C5A55", textDecoration: "none" }}>
          ← Back to the workbook
        </Link>
      </header>

      <div className="lead-grid">
        <div style={{ padding: "clamp(40px,7vw,90px) 7vw", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 640 }}>
          <span style={{ display: "inline-flex", width: "fit-content", alignItems: "center", gap: 9, padding: "7px 15px", borderRadius: 999, background: "rgba(176,103,62,0.10)", border: "1px solid rgba(176,103,62,0.22)", marginBottom: 30, fontSize: 13, fontWeight: 600, color: "#A85F37" }}>
            Free · no credit card
          </span>
          <h1 style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(34px,4.6vw,58px)", lineHeight: 1.04, letterSpacing: "-0.02em", color: "#243A5E", marginBottom: 22, maxWidth: "14ch" }}>
            The first conversation, made easier.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.58, color: "#54524C", maxWidth: "46ch", marginBottom: 30 }}>
            Get the free <strong style={{ color: "#243A5E" }}>“Before You Say Anything” checklist</strong> — the five
            things to have ready before you raise the move with your parent, so the first talk doesn’t go sideways.
          </p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 13, margin: 0, padding: 0 }}>
            {leadBullets.map((b) => (
              <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 16, color: "#3C3A36" }}>
                <span style={{ color: "#5C7A5E", marginTop: 1 }} aria-hidden="true">✓</span> {b}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ background: "#243A5E", padding: "clamp(40px,6vw,80px) 6vw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <LeadForm />
        </div>
      </div>
    </div>
  );
}
