import Link from "next/link";
import { DownloadButton } from "@/components/download-button";

const serif = "var(--font-fraunces), Georgia, serif";

const nextSteps = [
  { n: "1", text: "Open the worked example first — see what a good first pass actually looks like." },
  { n: "2", text: "Use the Path Finder to pick your one starting point. Just one." },
  { n: "3", text: "Set a 30-minute timer and do a single closet. That’s the whole job tonight." },
];

export default function SuccessPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 7vw", borderBottom: "1px solid rgba(36,58,94,0.10)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "baseline", gap: 10, textDecoration: "none" }}>
          <span style={{ fontFamily: serif, fontWeight: 600, fontSize: 22, color: "#243A5E" }}>The Home Transition</span>
          <span style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "#9A887F", fontWeight: 600 }}>System</span>
        </Link>
      </header>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "6vh 7vw" }}>
        <div style={{ maxWidth: 600, width: "100%", textAlign: "center" }}>
          <div style={{ width: 70, height: 70, borderRadius: "50%", background: "rgba(92,122,94,0.14)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}>
            <span style={{ fontFamily: serif, fontSize: 38, color: "#5C7A5E", lineHeight: 1 }} aria-hidden="true">✓</span>
          </div>
          <p style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B0673E", fontWeight: 600, marginBottom: 16 }}>
            Payment confirmed
          </p>
          <h1 style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(34px,5vw,56px)", lineHeight: 1.06, letterSpacing: "-0.02em", color: "#243A5E", marginBottom: 18 }}>
            You’re all set. Take a breath.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "#54524C", maxWidth: "46ch", margin: "0 auto 38px" }}>
            Your copy of the Home Transition System is ready. We’ve also emailed a download link to your
            receipt address.
          </p>

          <div style={{ background: "#FBF8F2", border: "1px solid rgba(36,58,94,0.14)", borderRadius: 18, padding: "30px 28px", textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 20 }}>
              <div>
                <p style={{ fontFamily: serif, fontSize: 20, color: "#243A5E", fontWeight: 500 }}>Home Transition System</p>
                <p style={{ fontSize: 13.5, color: "#8A887F" }}>PDF workbook · 64 pages · fillable</p>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#5C7A5E", background: "rgba(92,122,94,0.12)", padding: "5px 11px", borderRadius: 6 }}>
                Unlocked
              </span>
            </div>
            <DownloadButton />
          </div>

          <div style={{ marginTop: 36, textAlign: "left", background: "#fff", border: "1px solid rgba(36,58,94,0.10)", borderRadius: 16, padding: 26 }}>
            <p style={{ fontFamily: serif, fontSize: 19, color: "#243A5E", marginBottom: 16 }}>Where to start tonight</p>
            <ol style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 13, padding: 0 }}>
              {nextSteps.map((s) => (
                <li key={s.n} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ fontFamily: serif, fontSize: 16, color: "#B0673E", fontWeight: 600, minWidth: 18 }}>{s.n}</span>
                  <span style={{ fontSize: 15.5, lineHeight: 1.5, color: "#54524C" }}>{s.text}</span>
                </li>
              ))}
            </ol>
          </div>
          <p style={{ fontSize: 13.5, color: "#8A887F", marginTop: 28 }}>
            Trouble downloading? Reply to your receipt email and a human will help. 14-day guarantee applies.
          </p>
        </div>
      </div>
    </div>
  );
}
