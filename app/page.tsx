import Link from "next/link";
import { CheckoutButton } from "@/components/checkout-button";
import { Faq, type FaqItem } from "@/components/faq";

const serif = "var(--font-fraunces), Georgia, serif";
const sans = "var(--font-inter), system-ui, sans-serif";

/* ---- Content (copied verbatim from the imported Storefront.dc.html) ---- */

const pains = [
  { mark: "—", text: "Every conversation about the house turns into a conversation about everything else." },
  { mark: "—", text: "“The whole house” feels impossible, so nothing gets sorted and the date keeps slipping." },
  { mark: "—", text: "Your siblings mean well, but somehow it’s all landed on you." },
  { mark: "—", text: "And underneath the logistics, you’re grieving a place that raised you." },
];

const paths = [
  { tag: "Urgent trigger", title: "A fall, a diagnosis, a deadline", desc: "Something just forced the issue and you need a move plan fast — start with logistics and the first-night essentials." },
  { tag: "Declining upkeep", title: "The house is getting to be too much", desc: "No crisis yet, but the signs are adding up. Begin gently, with the conversation and a low-stakes first room." },
  { tag: "Resistant parent", title: "“I’m not going anywhere”", desc: "The hardest start. Open with the Conversation Module and the scripts for the answers you’re dreading." },
  { tag: "Family conflict", title: "Siblings aren’t on the same page", desc: "Before you touch a single box, set roles and a shared board so the work doesn’t fall on one person." },
];

const modules = [
  { num: "01", title: "The Conversation Module", benefit: "Scripts for raising the topic without your parent feeling ambushed — including word-for-word responses to “I’m not ready” and “You just want me out.”" },
  { num: "02", title: "Room-by-Room Inventory & Triage", benefit: "A first-pass system that turns “the whole house” into one small, doable decision at a time, with seven clear keep / sell / donate / gift categories." },
  { num: "03", title: "The Sibling Coordination Board", benefit: "Roles, a task board, and a weekly family-update template that stops one person from silently becoming the project manager." },
  { num: "04", title: "Move Logistics Timeline", benefit: "A flexible 8-week countdown that works even with no fixed move date, plus a first-night box list and move-day contact sheet." },
  { num: "05", title: "Donation & Sell Tracker", benefit: "Keeps piles from becoming permanent: donate, sell, and family-gift trackers with deadlines and fallbacks." },
  { num: "06", title: "First 30 Days After the Move", benefit: "A week-by-week settle-in plan for the part everyone forgets — when the boxes are moved but your parent hasn’t actually landed yet." },
];

const features = [
  { glyph: "P", title: "The High-Emotion Parking Lot Method", desc: "How to keep one heirloom from derailing the entire project — a place to set the hard feelings down so the work can keep moving." },
  { glyph: "4", title: "The “Start Here” Path Finder", desc: "Four entry points — urgent trigger, declining upkeep, resistant parent, family conflict — so you know exactly where to begin." },
];

const exampleRows = [
  { item: "Grandmother’s quilt", tag: "Gift → Mom" },
  { item: "Spare flat sheets ×6", tag: "Donate" },
  { item: "Worn bath towels", tag: "Recycle" },
  { item: "Linen tablecloth set", tag: "Keep" },
];

const faqs: FaqItem[] = [
  { q: "Is this legal, medical, or financial advice?", a: "No. This is a planning and coordination workbook. It does not provide legal, tax, financial, medical, or real-estate advice — it helps your family organize the decisions and bring the right professionals in when needed." },
  { q: "What format is it, and how do I use it?", a: "A fillable PDF workbook. You can type directly into it on a screen or print it and write by hand — whatever works for your family. It’s yours forever, on any device." },
  { q: "We don’t have a move date yet. Is it still useful?", a: "Yes — that’s exactly who it’s built for. The Move Logistics Timeline works as a flexible countdown even with no fixed date, so you can start organizing before the calendar forces your hand." },
  { q: "My parent is resistant. Will this help?", a: "It’s where many people start. The Conversation Module gives you scripts for the hardest replies, and the Path Finder has a dedicated “resistant parent” entry point so you’re not improvising." },
  { q: "What’s your refund policy?", a: "14-Day Satisfaction Guarantee. If this workbook isn’t a genuine help with your family’s transition, email us within 14 days of purchase and we’ll refund you in full — no forms, no hassle. We’d rather you feel good about the purchase than hold onto $49." },
  { q: "How do I get it after I buy?", a: "Instantly. After checkout you’ll land on a download page, and we’ll also email a private link to your receipt address. The link is short-lived for security — if it expires, just reload your success page for a fresh one." },
];

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#F3EFE7" }}>
      {/* ---------------- top bar ---------------- */}
      <header
        className="site-header"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 7vw",
          background: "rgba(243,239,231,0.86)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(36,58,94,0.10)",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span style={{ fontFamily: serif, fontWeight: 600, fontSize: 22, color: "#243A5E", letterSpacing: "-0.01em" }}>
            The Home Transition
          </span>
          <span style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "#9A887F", fontWeight: 600 }}>
            System
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <Link
            href="/checklist"
            className="header-secondary-link"
            style={{ fontSize: 14, fontWeight: 500, color: "#5C5A55", textDecoration: "none" }}
          >
            Free checklist
          </Link>
          <CheckoutButton
            style={{
              fontFamily: sans,
              fontSize: 14,
              fontWeight: 600,
              color: "#F8F5EF",
              background: "#243A5E",
              border: "none",
              padding: "11px 20px",
              borderRadius: 10,
              cursor: "pointer",
            }}
          >
            Get the workbook
          </CheckoutButton>
        </div>
      </header>

      {/* ---------------- hero ---------------- */}
      <section style={{ padding: "7vh 7vw 9vh", maxWidth: 1180, margin: "0 auto" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 9,
            padding: "7px 15px",
            borderRadius: 999,
            background: "rgba(36,58,94,0.06)",
            border: "1px solid rgba(36,58,94,0.12)",
            marginBottom: 34,
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#B0673E" }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: "#3C4B63", letterSpacing: "0.01em" }}>
            For the adult child who’s suddenly in charge
          </span>
        </div>
        <h1
          style={{
            fontFamily: serif,
            fontWeight: 400,
            fontSize: "clamp(40px,6.4vw,82px)",
            lineHeight: 1.02,
            letterSpacing: "-0.022em",
            color: "#243A5E",
            maxWidth: "16ch",
            marginBottom: 30,
          }}
        >
          Move your parent out of the family home{" "}
          <span style={{ fontStyle: "italic", color: "#B0673E" }}>without</span> tearing the family apart.
        </h1>
        <p style={{ fontSize: "clamp(18px,2vw,22px)", lineHeight: 1.55, color: "#54524C", maxWidth: "54ch", marginBottom: 40 }}>
          A step-by-step workbook for the hardest logistics and the harder conversations — from the first
          “we need to talk” to the first 30 days in the new place.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px 22px" }}>
          <CheckoutButton
            style={{
              fontFamily: sans,
              fontSize: 17,
              fontWeight: 600,
              color: "#F8F5EF",
              background: "#243A5E",
              border: "none",
              padding: "17px 30px",
              borderRadius: 12,
              cursor: "pointer",
              boxShadow: "0 10px 26px rgba(36,58,94,0.24)",
            }}
          >
            Get the workbook — $49
          </CheckoutButton>
          <Link
            href="/checklist"
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#243A5E",
              textDecoration: "underline",
              textUnderlineOffset: 4,
              textDecorationColor: "rgba(36,58,94,0.3)",
            }}
          >
            Start with the free checklist
          </Link>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 28px", marginTop: 34 }}>
          {[
            "Instant PDF download",
            "14-day money-back guarantee",
            "Fillable — works on paper or screen",
          ].map((t) => (
            <span key={t} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 14, color: "#6B6962", fontWeight: 500 }}>
              <span style={{ color: "#5C7A5E" }} aria-hidden="true">✓</span> {t}
            </span>
          ))}
        </div>
      </section>

      {/* ---------------- pain ---------------- */}
      <section style={{ background: "#243A5E", color: "#EDE7DC", padding: "9vh 7vw" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <p style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9DB0CE", fontWeight: 600, marginBottom: 22 }}>
            If you’re the one holding this together
          </p>
          <h2
            style={{
              fontFamily: serif,
              fontWeight: 400,
              fontSize: "clamp(28px,3.6vw,46px)",
              lineHeight: 1.12,
              letterSpacing: "-0.015em",
              maxWidth: "20ch",
              marginBottom: 48,
              color: "#F6F1E7",
            }}
          >
            You didn’t sign up to be a project manager, a therapist, and a moving company at once.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "30px 40px" }}>
            {pains.map((p, i) => (
              <div key={i} style={{ borderTop: "1px solid rgba(237,231,220,0.22)", paddingTop: 18 }}>
                <p style={{ fontFamily: serif, fontSize: 30, color: "#B0673E", marginBottom: 12 }} aria-hidden="true">
                  {p.mark}
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.55, color: "#CBD3E0" }}>{p.text}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "clamp(17px,1.9vw,20px)", lineHeight: 1.55, color: "#EDE7DC", maxWidth: "50ch", marginTop: 52 }}>
            You don’t need more willpower. You need a plan that already knows what comes next.
          </p>
        </div>
      </section>

      {/* ---------------- start here path finder ---------------- */}
      <section style={{ padding: "9vh 7vw", maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap", marginBottom: 14 }}>
          <span style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B0673E", fontWeight: 600 }}>
            The “Start Here” path finder
          </span>
        </div>
        <h2
          style={{
            fontFamily: serif,
            fontWeight: 400,
            fontSize: "clamp(28px,3.6vw,46px)",
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
            color: "#243A5E",
            maxWidth: "18ch",
            marginBottom: 16,
          }}
        >
          Tell us where you are, and we’ll tell you where to begin.
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.55, color: "#54524C", maxWidth: "52ch", marginBottom: 44 }}>
          Four entry points, so you never open the workbook to a blank page wondering what to do first.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 18 }}>
          {paths.map((pa, i) => (
            <div key={i} style={{ background: "#FBF8F2", border: "1px solid rgba(36,58,94,0.10)", borderRadius: 16, padding: "26px 24px" }}>
              <span style={{ display: "inline-block", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, color: "#B0673E", marginBottom: 14 }}>
                {pa.tag}
              </span>
              <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: 21, color: "#243A5E", lineHeight: 1.18, marginBottom: 9 }}>
                {pa.title}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.5, color: "#5C5A55" }}>{pa.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- whats inside ---------------- */}
      <section style={{ background: "#FBF8F2", borderTop: "1px solid rgba(36,58,94,0.08)", borderBottom: "1px solid rgba(36,58,94,0.08)", padding: "9vh 7vw" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <p style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B0673E", fontWeight: 600, marginBottom: 16 }}>
            What’s inside
          </p>
          <h2
            style={{
              fontFamily: serif,
              fontWeight: 400,
              fontSize: "clamp(28px,3.6vw,46px)",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              color: "#243A5E",
              maxWidth: "16ch",
              marginBottom: 52,
            }}
          >
            Six modules. One calm path through the whole thing.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(310px,1fr))", gap: "4px 56px" }}>
            {modules.map((m, i) => (
              <div key={i} style={{ display: "flex", gap: 22, padding: "26px 0", borderTop: "1px solid rgba(36,58,94,0.12)" }}>
                <span style={{ fontFamily: serif, fontSize: 26, fontWeight: 500, color: "#B0673E", lineHeight: 1, minWidth: 34 }}>
                  {m.num}
                </span>
                <div>
                  <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: 22, color: "#243A5E", lineHeight: 1.16, marginBottom: 10 }}>
                    {m.title}
                  </h3>
                  <p style={{ fontSize: 15.5, lineHeight: 1.58, color: "#54524C" }}>{m.benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- featured methods ---------------- */}
      <section style={{ padding: "9vh 7vw", maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
          {features.map((f, i) => (
            <div key={i} style={{ position: "relative", background: "#243A5E", color: "#EDE7DC", borderRadius: 20, padding: "38px 34px", overflow: "hidden" }}>
              <span style={{ position: "absolute", right: 24, top: 18, fontFamily: serif, fontSize: 64, color: "rgba(176,103,62,0.28)", lineHeight: 1 }} aria-hidden="true">
                {f.glyph}
              </span>
              <span style={{ display: "inline-block", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, color: "#D89A6F", marginBottom: 16 }}>
                Signature method
              </span>
              <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 26, lineHeight: 1.16, color: "#F6F1E7", maxWidth: "18ch", marginBottom: 12 }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 16, lineHeight: 1.55, color: "#C6CFDD", maxWidth: "34ch" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- worked example ---------------- */}
      <section style={{ padding: "2vh 7vw 9vh", maxWidth: 1180, margin: "0 auto" }}>
        <div
          className="we-grid"
          style={{
            background: "#FBF8F2",
            border: "1px solid rgba(36,58,94,0.12)",
            borderRadius: 24,
            padding: "clamp(34px,5vw,64px)",
          }}
        >
          <div>
            <p style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B0673E", fontWeight: 600, marginBottom: 18 }}>
              See it before you buy
            </p>
            <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(26px,3.2vw,40px)", lineHeight: 1.12, letterSpacing: "-0.012em", color: "#243A5E", maxWidth: "20ch", marginBottom: 20 }}>
              A complete worked example, right at the front.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.62, color: "#54524C", maxWidth: "48ch", marginBottom: 18 }}>
              Watch Denise help her 78-year-old mother sort a single linen closet in 30 minutes — a filled-in
              inventory sheet and sibling board showing exactly what a good first pass looks like.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.62, color: "#243A5E", fontWeight: 600, maxWidth: "46ch" }}>
              You’re never staring at a blank template wondering if you’re doing it right.
            </p>
          </div>
          <div style={{ background: "#fff", border: "1px solid rgba(36,58,94,0.14)", borderRadius: 14, padding: 24, boxShadow: "0 18px 40px rgba(36,58,94,0.10)" }}>
            <p style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#9A887F", fontWeight: 700, marginBottom: 14 }}>
              Linen closet — first pass
            </p>
            {exampleRows.map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "11px 0", borderBottom: "1px solid rgba(36,58,94,0.08)" }}>
                <span style={{ fontSize: 14, color: "#3C3A36" }}>{r.item}</span>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#5C7A5E", background: "rgba(92,122,94,0.12)", padding: "4px 10px", borderRadius: 6 }}>
                  {r.tag}
                </span>
              </div>
            ))}
            <p style={{ fontSize: 13, color: "#9A887F", marginTop: 14, fontStyle: "italic" }}>
              30 minutes. One closet. One decision at a time.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- price / offer ---------------- */}
      <section style={{ padding: "2vh 7vw 9vh", maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
        <div style={{ background: "#243A5E", borderRadius: 26, padding: "clamp(38px,5vw,60px)", color: "#EDE7DC" }}>
          <p style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9DB0CE", fontWeight: 600, marginBottom: 22 }}>
            The complete system
          </p>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ fontFamily: serif, fontSize: "clamp(56px,9vw,88px)", fontWeight: 500, color: "#F6F1E7", lineHeight: 1 }}>$49</span>
            <span style={{ fontSize: 16, color: "#9DB0CE", fontWeight: 500 }}>one-time · yours forever</span>
          </div>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: "#CBD3E0", maxWidth: "40ch", margin: "18px auto 32px" }}>
            Six modules, two signature methods, the path finder, and the worked example — in one fillable PDF.
          </p>
          <CheckoutButton
            style={{
              fontFamily: sans,
              fontSize: 18,
              fontWeight: 600,
              color: "#243A5E",
              background: "#F3EFE7",
              border: "none",
              padding: "18px 38px",
              borderRadius: 13,
              cursor: "pointer",
              boxShadow: "0 12px 30px rgba(0,0,0,0.22)",
            }}
          >
            Get the workbook — $49
          </CheckoutButton>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 9, marginTop: 24 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#7FA081" }} aria-hidden="true" />
            <p style={{ fontSize: 14, color: "#BFD0C0", fontWeight: 500 }}>
              14-Day Satisfaction Guarantee — full refund, no forms, no hassle.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section style={{ padding: "2vh 7vw 9vh", maxWidth: 880, margin: "0 auto" }}>
        <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(28px,3.6vw,44px)", lineHeight: 1.1, color: "#243A5E", marginBottom: 8 }}>
          Questions, answered.
        </h2>
        <p style={{ fontSize: 16, color: "#6B6962", marginBottom: 40 }}>The things people ask before they buy.</p>
        <Faq items={faqs} />
      </section>

      {/* ---------------- footer + disclaimer ---------------- */}
      <footer style={{ background: "#1F3252", color: "#AEB9CC", padding: "7vh 7vw 8vh" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <p style={{ fontFamily: serif, fontSize: 26, color: "#F6F1E7", marginBottom: 28, maxWidth: "18ch" }}>
            It’s a hard season. You don’t have to wing it.
          </p>
          <CheckoutButton
            style={{
              fontFamily: sans,
              fontSize: 16,
              fontWeight: 600,
              color: "#243A5E",
              background: "#F3EFE7",
              border: "none",
              padding: "15px 30px",
              borderRadius: 11,
              cursor: "pointer",
              marginBottom: 46,
            }}
          >
            Get the workbook — $49
          </CheckoutButton>
          <p style={{ fontSize: 13.5, lineHeight: 1.65, color: "#8E9AB0", maxWidth: "78ch", borderTop: "1px solid rgba(255,255,255,0.10)", paddingTop: 26 }}>
            This is a planning and coordination workbook. It does not provide legal, tax, financial, medical,
            or real-estate advice — it helps your family organize the decisions and bring the right
            professionals in when needed.
          </p>
          <p style={{ fontSize: 13, color: "#6F7C92", marginTop: 20 }}>
            © 2026 The Home Transition System ·{" "}
            <Link href="/checklist" style={{ textDecoration: "underline" }}>Free checklist</Link> · Refund policy · Privacy
          </p>
        </div>
      </footer>
    </div>
  );
}
