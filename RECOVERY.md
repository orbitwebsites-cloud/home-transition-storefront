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

## Deviations from design (documented)
- Checkout: production goes straight to Stripe-hosted Checkout (per the modal's
  own note); the prototype's explainer modal is intentionally omitted.
- Lead magnet / email screens: not yet built (see README).
