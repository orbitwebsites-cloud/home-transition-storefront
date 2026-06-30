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
| `/success`       | Post-payment screen (Stripe success_url target).                  |
| `/api/checkout`  | POST → creates a Stripe Checkout Session, returns its URL.         |
| `/checklist`     | **Not built yet** — the design's free lead-magnet screen.         |

## Stripe / checkout status
- `app/api/checkout/route.ts` is **stub-safe**: with no `STRIPE_SECRET_KEY` it
  returns `501` and the UI shows a "not configured" message — nobody is charged.
- To enable real purchases: copy `.env.example` → `.env.local` and set
  `STRIPE_SECRET_KEY` (required) and `STRIPE_PUBLISHABLE_KEY` (reserved for
  client-side Stripe.js; not used by the current hosted-checkout redirect),
  plus optionally `STRIPE_PRICE_ID`.
- **No keys are committed.** Do not commit `.env.local`.
- TODO: add a Stripe webhook route and grant the download only after a signed
  `checkout.session.completed` event (currently the success page is reachable
  directly — fine for the prototype, must be gated for production).

## Not yet implemented (present in the design, intentionally deferred)
- Free-checklist lead magnet (`/checklist`) + lead capture (design note says it
  writes to a Supabase table).
- Transactional email templates (receipt + checklist delivery).

## Reference
The original imported design is kept under `_design_import/` for comparison.
