"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

/**
 * Primary CTA. Wires to the existing /api/checkout flow:
 * POST -> get a Stripe-hosted Checkout URL -> redirect.
 * We do NOT rebuild checkout here and never touch card data.
 *
 * When Stripe isn't configured yet, /api/checkout returns 501 with a message,
 * which we surface to the buyer instead of failing silently.
 */
export function CheckoutButton({
  style,
  children,
}: {
  style?: CSSProperties;
  children: ReactNode;
}) {
  const [loading, setLoading] = useState(false);

  async function startCheckout() {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: "home-transition-system" }),
      });
      const data: { url?: string; error?: string } = await res
        .json()
        .catch(() => ({}));

      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      window.alert(
        data.error ??
          "Checkout isn’t available right now. Please try again in a moment.",
      );
    } catch {
      window.alert(
        "We couldn’t start secure checkout. Please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={startCheckout}
      disabled={loading}
      aria-busy={loading}
      style={style}
    >
      {loading ? "Starting secure checkout…" : children}
    </button>
  );
}
