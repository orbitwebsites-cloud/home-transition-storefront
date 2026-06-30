# The Home Transition System — Storefront

Next.js (App Router) storefront for a $49 fillable PDF workbook, built faithfully
from the imported Claude Design `Storefront.dc.html`.

## Stack
- Next.js 15 (App Router) + React 19 + TypeScript
- Fonts: **Fraunces** (serif headings) + **Inter** (sans body), self-hosted via
  `next/font` (no FOUT). These are the design's own fonts — no substitution.
- Stripe (checkout route — see status below)

## Run locally
```bash
npm install
npm run dev      # http://localhost:3000
```

## Routes
| Path             | What it is                                                        |
|------------------|-------------------------------------------------------------------|
| `/`              | Sales / landing page (the imported design's main screen).         |
| `/success`       | Post-payment screen. **Gated**: only shows the download when Stripe confirms the session is `paid`. |
| `/api/checkout`  | POST → creates a Stripe Checkout Session, returns its URL.         |
| `/api/webhooks/stripe` | POST → verifies the signed `checkout.session.completed` event and fulfills the order. |
| `/checklist`     | **Not built yet** — the design's free lead-magnet screen.         |

## Stripe / checkout status
- `app/api/checkout/route.ts` is **stub-safe**: with no `STRIPE_SECRET_KEY` it
  returns `501` and the UI shows a "not configured" message — nobody is charged.
- To enable real purchases: copy `.env.example` → `.env.local` and set
  `STRIPE_SECRET_KEY` (required) and `STRIPE_PUBLISHABLE_KEY` (reserved for
  client-side Stripe.js; not used by the current hosted-checkout redirect),
  plus optionally `STRIPE_PRICE_ID`.
- **No keys are committed.** Do not commit `.env.local`.
- **Done:** webhook at `/api/webhooks/stripe` verifies the signed
  `checkout.session.completed` event, and `/success` is gated — it retrieves
  the session server-side and only reveals the download when `payment_status`
  is `paid`. Set `STRIPE_WEBHOOK_SECRET` and register the endpoint in Stripe.
- TODO: make fulfillment durable + idempotent — persist the order (e.g. Supabase
  keyed by `session.id`) and email a short-lived **signed download URL**. The
  `DownloadButton` still simulates the download until real file storage exists.

## Not yet implemented (present in the design, intentionally deferred)
- Free-checklist lead magnet (`/checklist`) + lead capture (design note says it
  writes to a Supabase table).
- Transactional email templates (receipt + checklist delivery).

## Reference
The original imported design is kept under `_design_import/` for comparison.
