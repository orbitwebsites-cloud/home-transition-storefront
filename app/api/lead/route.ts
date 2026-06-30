import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Lead capture for the free checklist. Stub-safe:
 * - If SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are set, inserts into a `leads`
 *   table via the Supabase REST API (no extra dependency).
 * - Otherwise it just logs, so the form still works in dev/preview.
 *
 * Expected table:
 *   create table leads (
 *     id bigint generated always as identity primary key,
 *     email text not null unique,
 *     source text,
 *     created_at timestamptz default now()
 *   );
 *
 * TODO(email): actually send the "Before You Say Anything" checklist PDF to the
 * subscriber (needs the checklist file + a transactional email provider).
 */
export async function POST(req: Request) {
  let email = "";
  let source = "checklist";
  try {
    const body = await req.json();
    email = String(body?.email ?? "").trim();
    if (body?.source) source = String(body.source);
  } catch {
    /* ignore malformed body */
  }

  if (!/.+@.+\..+/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (url && key) {
    try {
      const res = await fetch(`${url}/rest/v1/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: key,
          Authorization: `Bearer ${key}`,
          // Upsert on the unique email so re-submits don't error.
          Prefer: "resolution=merge-duplicates,return=minimal",
        },
        body: JSON.stringify({ email, source }),
      });
      if (!res.ok) {
        // Don't fail the user — we captured intent. Log for follow-up.
        console.error(
          "[lead] supabase insert failed:",
          res.status,
          await res.text().catch(() => ""),
        );
      }
    } catch (err) {
      console.error("[lead] supabase error:", err);
    }
  } else {
    console.log(`[lead] captured (no Supabase configured): ${email} (${source})`);
  }

  return NextResponse.json({ ok: true });
}
