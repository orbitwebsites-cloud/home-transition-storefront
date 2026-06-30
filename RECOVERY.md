# RECOVERY — Home Transition Storefront

## Current state (2026-06-29)
Scaffolded a Next.js 15 App Router + TS storefront from the imported design
`Storefront.dc.html` (real import via attached zip; not reconstructed).

Files written:
- `package.json`, `tsconfig.json`, `next.config.mjs`, `next-env.d.ts`, `.gitignore`, `.env.example`
- `app/layout.tsx` (Fraunces + Inter via next/font), `app/globals.css`
- `app/page.tsx` (sales page — faithful port)
- `app/success/page.tsx` (Stripe return target)
- `app/api/checkout/route.ts` (stub-safe Stripe Checkout; no keys)
- `components/checkout-button.tsx`, `components/faq.tsx`, `components/download-button.tsx`
- `README.md`

## NEXT STEP (blocked on approval)
`npm install` has NOT been run (user security rule: no npm without explicit OK).
Once approved:
1. `npm install`
2. `npm run dev` → verify http://localhost:3000 renders the sales page
3. Confirm CTA hits `/api/checkout` (expect 501 "not configured" until keys added)

## Deployment (2026-06-29)
- Pushed to private GitHub repo (main branch):
  https://github.com/orbitwebsites-cloud/home-transition-storefront
- Local production build verified clean (`next build`, 6 routes).
- PENDING (user action): import repo into Vercel, add env vars:
  STRIPE_SECRET_KEY (+ optional STRIPE_PRICE_ID), NEXT_PUBLIC_SITE_URL=<prod url>.
  Future `git push` to main auto-deploys once Vercel is linked.

## Webhook + success gating (2026-06-29)
- Added `app/api/webhooks/stripe/route.ts` — verifies signed
  checkout.session.completed (+ async variants), fulfills on paid. Needs
  STRIPE_WEBHOOK_SECRET; register endpoint in Stripe dashboard.
- Rewrote `app/success/page.tsx` as a server component: retrieves the session
  via STRIPE_SECRET_KEY and only reveals the download when payment_status==='paid'.
  Verified locally: no/invalid session is gated; webhook guard returns 501 unconfigured.
- STILL TODO: durable idempotent fulfillment (persist by session.id, e.g. Supabase)
  + real signed download URL (DownloadButton still simulates).

## Deviations from design (documented)
- Checkout: production goes straight to Stripe-hosted Checkout (per the modal's
  own note); the prototype's explainer modal is intentionally omitted.
- Lead magnet / email screens: not yet built (see README).
