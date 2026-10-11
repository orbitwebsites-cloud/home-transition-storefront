/**
 * x402 bot paywall.
 *
 * Humans browse free. AI crawlers / scrapers (matched by User-Agent) get an
 * HTTP 402 with x402 v2 payment requirements; if they pay (PAYMENT-SIGNATURE /
 * X-PAYMENT header), the payment is verified + settled via the facilitator and
 * the page is served normally with a PAYMENT-RESPONSE header.
 *
 * FAIL OPEN: any error (bad config, facilitator outage, ...) serves the page.
 *
 * Built on the official @x402/core + @x402/evm packages. @x402/next is not used
 * because every v2 release peer-requires next >= 16 and this repo is on Next 15;
 * the adapter below mirrors @x402/next's paymentProxy flow.
 */
import { NextResponse, type NextRequest } from "next/server";
import {
  HTTPFacilitatorClient,
  x402HTTPResourceServer,
  x402ResourceServer,
  type FacilitatorConfig,
  type HTTPAdapter,
  type HTTPRequestContext,
  type HTTPResponseInstructions,
} from "@x402/core/server";
import { decodePaymentRequiredHeader } from "@x402/core/http";
import { ExactEvmScheme } from "@x402/evm/exact/server";

// ---------------------------------------------------------------------------
// Config (all env-overridable)
// ---------------------------------------------------------------------------

const DEFAULT_PAY_TO = "0x0ba3b8796ce61ef8Cbd11A7F33Be31F1Fd4A03B3";
const DEFAULT_PRICE = "$0.001";
const DEFAULT_NETWORK = "eip155:8453"; // Base mainnet (USDC)
const DEFAULT_FACILITATOR_URL = "https://x402.org/facilitator";
const DESCRIPTION = "Paid access for automated agents";

export function isPaywallEnabled(): boolean {
  return (process.env.X402_ENABLED ?? "").trim().toLowerCase() !== "false";
}

// ---------------------------------------------------------------------------
// Bot detection (case-insensitive substring match on User-Agent)
// ---------------------------------------------------------------------------

/** Never charged — checked first. */
export const BOT_UA_ALLOW_PATTERNS = [
  "Googlebot",
  "Bingbot",
  "DuckDuckBot",
  "Slurp",
  "Applebot", // plain Applebot only; Applebot-Extended is handled below
  "Twitterbot",
  "facebookexternalhit",
  "LinkedInBot",
  "Slackbot",
  "Discordbot",
  "WhatsApp",
  "TelegramBot",
  "Vercel",
  // uptime monitors
  "UptimeRobot",
  "Pingdom",
  "StatusCake",
  "BetterUptime",
  "Better Uptime",
  "Uptime-Kuma",
  "Site24x7",
  "Checkly",
  "Datadog",
  "NewRelicPinger",
] as const;

/** Charged via x402. */
export const BOT_UA_PATTERNS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "CCBot",
  "PerplexityBot",
  "Perplexity-User",
  "Bytespider",
  "Amazonbot",
  "Applebot-Extended",
  "Google-Extended",
  "Meta-ExternalAgent",
  "meta-externalfetcher",
  "FacebookBot",
  "Diffbot",
  "cohere-ai",
  "cohere-training-data-crawler",
  "YouBot",
  "AI2Bot",
  "Ai2Bot-Dolma",
  "Timpibot",
  "ImagesiftBot",
  "omgili",
  "PetalBot",
  "Scrapy",
  "python-requests",
  "aiohttp",
  "Go-http-client",
  "curl",
  "wget",
  "HeadlessChrome",
  "PhantomJS",
] as const;

const ALLOW_LC = BOT_UA_ALLOW_PATTERNS.map((p) => p.toLowerCase());
const CHARGE_LC = BOT_UA_PATTERNS.map((p) => p.toLowerCase());

function isAllowlisted(ua: string): boolean {
  return ALLOW_LC.some((p) => {
    if (!ua.includes(p)) return false;
    // "Applebot" must not whitelist "Applebot-Extended".
    if (p === "applebot") return ua.replace(/applebot-extended/g, "").includes("applebot");
    return true;
  });
}

/** True if this User-Agent should be charged. */
export function isChargeableBot(userAgent: string | null | undefined): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  if (isAllowlisted(ua)) return false;
  return CHARGE_LC.some((p) => ua.includes(p));
}

// ---------------------------------------------------------------------------
// Always-free paths
// ---------------------------------------------------------------------------

const STATIC_EXT =
  /\.(?:css|js|mjs|map|json|txt|xml|ico|png|jpe?g|gif|webp|avif|svg|bmp|woff2?|ttf|otf|eot|mp4|webm|mp3|wav|pdf)$/i;

export function isFreePath(pathname: string): boolean {
  return (
    pathname === "/robots.txt" ||
    pathname === "/llms.txt" ||
    /^\/sitemap[^/]*\.xml$/i.test(pathname) ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/.well-known/") ||
    pathname.startsWith("/_next/") || // static assets, image optimizer, data
    pathname.startsWith("/api/") || // checkout, Stripe webhook, download, lead
    pathname.startsWith("/images/") ||
    pathname.startsWith("/fonts/") ||
    STATIC_EXT.test(pathname)
  );
}

// ---------------------------------------------------------------------------
// x402 server (built lazily, once)
// ---------------------------------------------------------------------------

async function buildFacilitatorConfig(): Promise<FacilitatorConfig> {
  const id = process.env.CDP_API_KEY_ID;
  const secret = process.env.CDP_API_KEY_SECRET;
  if (id && secret) {
    // Coinbase CDP facilitator (https://api.cdp.coinbase.com/platform/v2/x402), authenticated.
    const { createFacilitatorConfig } = await import("@coinbase/x402");
    return createFacilitatorConfig(id, secret);
  }
  return { url: process.env.X402_FACILITATOR_URL || DEFAULT_FACILITATOR_URL };
}

let serverPromise: Promise<x402HTTPResourceServer> | null = null;
let lastInitFailure = 0;
const INIT_RETRY_MS = 60_000; // after a failed init, fail open without re-hitting the facilitator

async function createServer(): Promise<x402HTTPResourceServer> {
  const network = (process.env.X402_NETWORK || DEFAULT_NETWORK) as `${string}:${string}`;
  const facilitator = new HTTPFacilitatorClient(await buildFacilitatorConfig());
  const resourceServer = new x402ResourceServer(facilitator).register(
    network,
    new ExactEvmScheme(),
  );
  // A single RouteConfig applies to every request we hand it (we only hand it
  // chargeable-bot requests on non-free paths).
  const httpServer = new x402HTTPResourceServer(resourceServer, {
    accepts: {
      scheme: "exact",
      price: process.env.X402_PRICE || DEFAULT_PRICE,
      network,
      payTo: process.env.X402_PAY_TO || DEFAULT_PAY_TO,
    },
    description: DESCRIPTION,
    mimeType: "text/html",
  });
  await httpServer.initialize(); // fetches facilitator /supported
  return httpServer;
}

function getServer(): Promise<x402HTTPResourceServer> | null {
  if (!serverPromise) {
    if (Date.now() - lastInitFailure < INIT_RETRY_MS) return null;
    serverPromise = createServer().catch((err) => {
      serverPromise = null; // allow retry after INIT_RETRY_MS
      lastInitFailure = Date.now();
      throw err;
    });
  }
  return serverPromise;
}

// ---------------------------------------------------------------------------
// Next.js adapter (mirrors @x402/next's NextAdapter)
// ---------------------------------------------------------------------------

class NextAdapter implements HTTPAdapter {
  constructor(private readonly req: NextRequest) {}
  getHeader(name: string) {
    return this.req.headers.get(name) || undefined;
  }
  getMethod() {
    return this.req.method;
  }
  getPath() {
    return this.req.nextUrl.pathname;
  }
  getUrl() {
    return this.req.url;
  }
  getAcceptHeader() {
    return this.req.headers.get("accept") || "";
  }
  getUserAgent() {
    return this.req.headers.get("user-agent") || "";
  }
  getQueryParams() {
    const params: Record<string, string | string[]> = {};
    this.req.nextUrl.searchParams.forEach((value, key) => {
      const existing = params[key];
      if (existing === undefined) params[key] = value;
      else if (Array.isArray(existing)) existing.push(value);
      else params[key] = [existing, value];
    });
    return params;
  }
  getQueryParam(name: string) {
    const all = this.req.nextUrl.searchParams.getAll(name);
    if (all.length === 0) return undefined;
    return all.length === 1 ? all[0] : all;
  }
}

function createContext(req: NextRequest): HTTPRequestContext {
  const adapter = new NextAdapter(req);
  const path = req.nextUrl.pathname;
  let decodedPath = path;
  try {
    decodedPath = decodeURIComponent(path);
  } catch {
    /* keep raw */
  }
  return {
    adapter,
    path,
    decodedPath,
    method: req.method,
    paymentHeader: adapter.getHeader("payment-signature") || adapter.getHeader("x-payment"),
  };
}

/**
 * Turn x402 response instructions into a NextResponse. For 402s we always
 * return JSON (bots, not browsers): the standard x402 v2 PaymentRequired
 * object, which is also carried base64-encoded in the PAYMENT-REQUIRED header.
 */
function toNextResponse(res: HTTPResponseInstructions, method: string): NextResponse {
  const headers = new Headers(res.headers);
  let body: unknown = res.body ?? {};
  const encoded = headers.get("payment-required");
  if (encoded) {
    try {
      body = decodePaymentRequiredHeader(encoded);
    } catch {
      /* keep body */
    }
  }
  headers.set("Content-Type", "application/json");
  const payload = method === "HEAD" ? null : JSON.stringify(body);
  return new NextResponse(payload, { status: res.status, headers });
}

// ---------------------------------------------------------------------------
// Public entry point for middleware.ts
// ---------------------------------------------------------------------------

/**
 * Returns a Response to short-circuit with (402, or `next()` with settlement
 * headers), or `null` to let the request continue untouched.
 */
export async function x402BotPaywall(req: NextRequest): Promise<NextResponse | null> {
  try {
    if (!isPaywallEnabled()) return null;
    if (!isChargeableBot(req.headers.get("user-agent"))) return null; // humans: UA check only
    if (isFreePath(req.nextUrl.pathname)) return null;

    const pending = getServer();
    if (!pending) return null; // recent init failure: fail open
    const httpServer = await pending;
    const context = createContext(req);
    const result = await httpServer.processHTTPRequest(context);

    switch (result.type) {
      case "no-payment-required":
        return null;
      case "payment-error":
        return toNextResponse(result.response, req.method);
      case "payment-verified": {
        // Middleware can't see the rendered page body, so settle now (same as
        // @x402/next's paymentProxy), then let the page render.
        const settle = await httpServer.processSettlement(
          result.paymentPayload,
          result.paymentRequirements,
          result.declaredExtensions,
          { request: context },
          undefined,
          result.beforeHandlerSettlement,
        );
        if (!settle.success) return toNextResponse(settle.response, req.method);
        const res = NextResponse.next();
        for (const [k, v] of Object.entries(settle.headers)) res.headers.set(k, v);
        res.headers.set("Cache-Control", "private, no-store");
        return res;
      }
    }
  } catch (err) {
    // FAIL OPEN — never break the site.
    console.error("[x402-bot-paywall] failing open:", err);
  }
  return null;
}
