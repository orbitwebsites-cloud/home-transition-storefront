"use client";

import { useState } from "react";

const serif = "var(--font-fraunces), Georgia, serif";

export type FaqItem = { q: string; a: string };

/**
 * Accordion FAQ. The imported design used clickable <div>s; this uses real
 * <button> elements with aria-expanded so it's keyboard-operable and
 * screen-reader friendly (WCAG), while matching the visual exactly.
 */
export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      {items.map((f, i) => {
        const isOpen = open === i;
        const panelId = `faq-panel-${i}`;
        const btnId = `faq-button-${i}`;
        return (
          <div
            key={i}
            style={{ borderTop: "1px solid rgba(36,58,94,0.14)" }}
          >
            <button
              id={btnId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : i)}
              style={{
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "24px 0",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 20,
                color: "#243A5E",
              }}
            >
              <span
                style={{
                  fontFamily: serif,
                  fontWeight: 500,
                  fontSize: 20,
                  lineHeight: 1.3,
                }}
              >
                {f.q}
              </span>
              <span
                aria-hidden="true"
                style={{
                  fontFamily: serif,
                  fontSize: 24,
                  color: "#B0673E",
                  lineHeight: 1,
                  flexShrink: 0,
                }}
              >
                {isOpen ? "–" : "+"}
              </span>
            </button>
            {isOpen && (
              <p
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                style={{
                  fontSize: 16,
                  lineHeight: 1.62,
                  color: "#54524C",
                  maxWidth: "62ch",
                  paddingBottom: 24,
                }}
              >
                {f.a}
              </p>
            )}
          </div>
        );
      })}
      <div style={{ borderTop: "1px solid rgba(36,58,94,0.14)" }} />
    </div>
  );
}
