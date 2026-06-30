import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

// The paid product lives outside /public so it is NEVER directly downloadable.
// It is only ever served through this route, and only for a verified-paid
// Stripe session.
const FILE_NAME = "Aging-Parent-Home-Transition-System.pdf";
const DOWNLOAD_NAME = "The Home Transition System.pdf";

export async function GET(req: Request) {
  const sessionId = new URL(req.url).searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id." }, { status: 400 });
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "Downloads aren’t configured yet (missing STRIPE_SECRET_KEY)." },
      { status: 501 },
    );
  }

  // Entitlement check: re-retrieve the session every time. A session_id alone
  // proves nothing without the secret key, and an unpaid session is rejected.
  try {
    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(secret);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "This purchase isn’t confirmed." },
        { status: 403 },
      );
    }
  } catch (err) {
    console.error("[download] verification failed:", err);
    return NextResponse.json(
      { error: "Could not verify your purchase." },
      { status: 403 },
    );
  }

  try {
    const filePath = path.join(process.cwd(), "private", FILE_NAME);
    const data = await readFile(filePath);
    return new NextResponse(new Uint8Array(data), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${DOWNLOAD_NAME}"`,
        "Content-Length": String(data.length),
        "Cache-Control": "private, no-store",
      },
    });
  } catch (err) {
    console.error("[download] file read failed:", err);
    return NextResponse.json({ error: "File unavailable." }, { status: 500 });
  }
}
