import { NextResponse } from "next/server";
import type Stripe from "stripe";

// Webhooks need the raw request body (for signature verification) and Node
// crypto — so force the Node.js runtime, not edge.
export const runtime = "nodejs";

/**
 * Stripe webhook receiver. Verifies the signature with STRIPE_WEBHOOK_SECRET,
 * then fulfills the order ONLY on a real, paid event. This is the durable
 * source of truth — it fires even if the buyer closes the success tab.
 *
 * Register the endpoint in Stripe (Dashboard → Developers → Webhooks):
 *   URL:    https://<your-domain>/api/webhooks/stripe
 *   Events: checkout.session.completed
 *           checkout.session.async_payment_succeeded
 *           checkout.session.async_payment_failed
 * Copy the signing secret (whsec_…) into STRIPE_WEBHOOK_SECRET.
 */
export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secret || !webhookSecret) {
    return NextResponse.json(
      {
        error:
          "Webhook not configured (missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET).",
      },
      { status: 501 },
    );
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe-signature header." },
      { status: 400 },
    );
  }

  // Raw body, exactly as received — required for signature verification.
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    const { default: StripeSDK } = await import("stripe");
    const stripe = new StripeSDK(secret);
    event = await stripe.webhooks.constructEventAsync(
      rawBody,
      sig,
      webhookSecret,
    );
  } catch (err) {
    console.error("[webhook] signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        // Card payments are 'paid' immediately; async methods settle later
        // (handled by the async_payment_succeeded case below).
        if (session.payment_status === "paid") {
          await fulfillOrder(session);
        }
        break;
      }
      case "checkout.session.async_payment_succeeded": {
        await fulfillOrder(event.data.object as Stripe.Checkout.Session);
        break;
      }
      case "checkout.session.async_payment_failed": {
        // TODO: email the buyer that their payment didn't go through.
        break;
      }
      default:
        // Unhandled event types are fine — acknowledge so Stripe stops retrying.
        break;
    }
  } catch (err) {
    // A 500 tells Stripe to retry (good for transient failures like a DB blip).
    console.error("[webhook] handler error:", err);
    return NextResponse.json({ error: "Handler failed." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

/**
 * The single place that grants entitlement after verified payment.
 *
 * TODO(fulfillment): make this idempotent and durable. Stripe can deliver the
 * same event more than once, so dedupe on session.id — e.g. upsert the order
 * into Supabase keyed by session.id, then email a short-lived signed download
 * URL. Today it only logs.
 */
async function fulfillOrder(session: Stripe.Checkout.Session) {
  const email = session.customer_details?.email ?? "unknown";
  console.log(
    `[webhook] fulfilling order — session=${session.id} email=${email} amount=${session.amount_total}`,
  );
  // no-op for now; see TODO above.
}
