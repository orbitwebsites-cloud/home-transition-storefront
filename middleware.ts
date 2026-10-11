import { NextResponse, type NextRequest } from "next/server";
import { x402BotPaywall } from "./lib/x402-bot-paywall";

// x402 bot paywall: AI crawlers/scrapers get HTTP 402 + x402 payment
// requirements; humans and search/social bots pass through untouched.
export async function middleware(req: NextRequest) {
  return (await x402BotPaywall(req)) ?? NextResponse.next();
}

export const config = {
  // Node runtime: the CDP facilitator auth helper needs Node crypto.
  runtime: "nodejs",
  // Skip API routes (Stripe checkout/webhook etc.), static assets and
  // well-known/crawler files entirely. lib/x402-bot-paywall.ts re-checks these.
  matcher: [
    "/((?!api/|_next/static|_next/image|favicon|robots\\.txt|sitemap.*\\.xml|llms\\.txt|\\.well-known/).*)",
  ],
};
