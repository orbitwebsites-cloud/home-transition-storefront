import { NextResponse } from "next/server";

/**
 * Stripe Checkout session creator.
 *
 * STATUS: TODO / stub-safe. No keys are committed. If STRIPE_SECRET_KEY is not
 * set, this returns 501 with a clear message (the UI surfaces it) so nobody is
 * ever charged against a misconfigured store.
 *
 * When configured, it creates a Stripe-hosted Checkout Session and returns its
 * URL for the client to redirect to. Card data never touches this server.
 *
 * TODO(stripe): add a webhook route (checkout.session.completed, verified with
 * STRIPE_WEBHOOK_SECRET) and grant the download ONLY after that signed event.
 */
export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;

  if (!secret) {
    return NextResponse.json(
      {
        error:
          "Checkout isn’t configured yet. Add STRIPE_SECRET_KEY to .env.local to enable purchases (see README).",
      },
      { status: 501 },
    );
  }

  try {
    // Lazy import so the rest of the app builds/renders even if `stripe`
    // isn't installed yet.
    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(secret);

    const priceId = process.env.STRIPE_PRICE_ID;
    const line_items = priceId
      ? [{ price: priceId, quantity: 1 }]
      : [
          {
            quantity: 1,
            price_data: {
              currency: "usd",
              unit_amount: 4900, // $49.00 — matches the design
              product_data: {
                name: "The Home Transition System (PDF workbook)",
                description:
                  "Six modules, two signature methods, the path finder, and the worked example — one fillable PDF.",
              },
            },
          },
        ];

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/?checkout=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout] failed to create session:", err);
    return NextResponse.json(
      {
        error:
          "Could not start checkout. Verify STRIPE_SECRET_KEY is valid and the `stripe` package is installed.",
      },
      { status: 500 },
    );
  }
}
