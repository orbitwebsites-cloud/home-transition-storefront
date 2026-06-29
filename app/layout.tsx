import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

// Self-hosted via next/font (no external request at runtime, no FOUT —
// next/font inlines metrics + size-adjust so there is no layout shift).
// These ARE the fonts the imported design specifies: Fraunces + Inter.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "The Home Transition System — move your parent out of the family home, without tearing the family apart",
  description:
    "A step-by-step workbook for the hardest logistics and the harder conversations — from the first “we need to talk” to the first 30 days in the new place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
