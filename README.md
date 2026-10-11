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
| `/api/download`  | GET `?session_id=…` → re-verifies the paid session, then streams the workbook PDF. |
| `/checklist`     | Free lead-magnet screen (email capture → `/api/lead`).            |
| `/api/lead`      | POST → captures the checklist signup (Supabase if configured, else logs). |

## How the buyer gets the workbook
1. CTA → `/api/checkout` → Stripe-hosted Checkout.
2. Stripe redirects to `/success?session_id=…`, which **verifies payment** server-side.
3. The download button hits `/api/download?session_id=…`, which **re-verifies the
   paid session** and streams `private/Aging-Parent-Home-Transition-System.pdf`.
   The PDF lives outside `/public`, so it's never directly reachable.

> Note: the PDF is committed to this (private) repo and bundled with the
> `/api/download` function via `outputFileTracingIncludes`. For stronger
> isolation you can move it to private Vercel Blob later — the route is the only
> thing that would change.

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

## x402 bot paywall
Humans browse free. AI crawlers/scrapers (User-Agent match, see `BOT_UA_PATTERNS`
in `lib/x402-bot-paywall.ts`) get **HTTP 402** with x402 v2 payment requirements
(`exact`, $0.001 USDC on Base, JSON body + `PAYMENT-REQUIRED` header). A bot that
pays (`PAYMENT-SIGNATURE` header) is verified + settled via the facilitator and
gets the page with a `PAYMENT-RESPONSE` header.

- Wired in root `middleware.ts` (Node runtime); logic in `lib/x402-bot-paywall.ts`,
  built on `@x402/core` + `@x402/evm` (`@x402/next` needs Next 16).
- Never charged: Googlebot, Bingbot, DuckDuckBot, Slurp, Applebot, social/chat
  link unfurlers, Vercel, uptime monitors.
- Always free: `/api/*` (Stripe checkout/webhook, download, lead), `/_next/*`,
  static files, `/robots.txt`, `/sitemap*.xml`, `/favicon*`, `/llms.txt`, `/.well-known/*`.
- **Fails open**: any error or facilitator outage serves the page normally.
- Config via env (see `.env.example`): `X402_ENABLED=false` kill switch,
  `X402_PAY_TO`, `X402_PRICE`, `X402_NETWORK`, `CDP_API_KEY_ID` +
  `CDP_API_KEY_SECRET` (Coinbase CDP facilitator), `X402_FACILITATOR_URL`.
- **Base mainnet needs CDP keys** (or a mainnet `X402_FACILITATOR_URL`): the
  default `https://x402.org/facilitator` only supports testnets, so with no keys
  the paywall fails open and bots are served free.

Test: `curl -A GPTBot localhost:3000/` → 402; `curl -A Googlebot …` → 200.
